from rest_framework import serializers
from posts.serializers import JoinOrLeaveCourseSerializer
from .models import User, UserProfile
from django.core import exceptions
import django.contrib.auth.password_validation as validators
from django.urls import resolve
from urllib.parse import urlparse
from django.contrib.auth import login
from django.shortcuts import redirect


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('avatar', 'university', 'program',
                  'gradYear', 'affiliation', 'bio')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile = UserProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'email', 'first_name',
                  'last_name', 'password', 'clout', 'courses', 'posts', 'comments', 'profile', 'isTutor')
        read_only_fields = ('url', 'id', 'clout', 'comments')
        extra_kwargs = {'password': {'write_only': True},
                        'courses': {'many': True, 'required': True}}
        courses = JoinOrLeaveCourseSerializer(many=True)

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except exceptions.ValidationError as exc:
            raise exceptions.ValidationError(str(exc))
        return value

    def create(self, validated_data):
        loginData = {key: validated_data[key] for key in validated_data.keys() & {
            'email', 'password'}}
        courses = validated_data.pop('courses')
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        for course in courses:
            user.courses.add(course)
            user.save()
            course.members.add(user)
        return redirect('knox_login')
        # return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.isTutor = validated_data.get('isTutor', instance.isTutor)
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.save()

        profile.avatar = profile_data.get('avatar', profile.avatar)
        profile.university = profile_data.get('university', profile.university)
        profile.program = profile_data.get('program', profile.program)
        profile.gradYear = profile_data.get('gradYear', profile.gradYear)
        profile.bio = profile_data.get('bio', profile.bio)
        profile.affiliation = profile_data.get(
            'affiliation', profile.affiliation)
        profile.save()

        return instance


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        try:
            validators.validate_password(value)
        except exceptions.ValidationError as exc:
            raise exceptions.ValidationError(str(exc))
        return value
