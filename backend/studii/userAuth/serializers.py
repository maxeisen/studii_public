from rest_framework import serializers
from .models import User, UserProfile
from django.core import exceptions
import django.contrib.auth.password_validation as validators


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('avatar', 'university', 'program', 'gradYear')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile = UserProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'email', 'first_name',
                  'last_name', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except exceptions.ValidationError as exc:
            raise exceptions.ValidationError(str(exc))
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile.avatar = profile_data.get('avatar', profile.avatar)
        profile.university = profile_data.get('university', profile.university)
        profile.program = profile_data.get('program', profile.program)
        profile.gradYear = profile_data.get('gradYear', profile.gradYear)
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
