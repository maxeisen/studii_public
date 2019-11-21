from rest_framework import serializers
from .models import Content, Course, Post
from posts.posts_validators import validate_content as content_validator
from django.core import exceptions


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = ('fileContent', 'textContent')


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ("__all__")


class PostSerializer(serializers.HyperlinkedModelSerializer):
    content = ContentSerializer(required=True)

    class Meta:
        model = Post
        fields = ('url', 'id', 'dateTimePosted', 'dateTimeEdited', 'contentType', 'title',
                  'description', 'author', 'course', 'content')

    def validate_content(self, value):
        try:
            content_validator(value)
        except exceptions.ValidationError as exc:
            raise exceptions.ValidationError(str(exc))
        return value

    def create(self, validated_data):
        content_data = validated_data.pop('content')
        contentInstance = Content.objects.create(**content_data)
        post = Post(content=contentInstance, **validated_data)
        post.save()
        return post

    def update(self, instance, validated_data):
        content_data = validated_data.pop('content')
        content = instance.content
        content.fileContent = content_data.get(
            'fileContent', content.fileContent)
        content.textContent = content_data.get(
            'textContent', content.textContent)

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description', instance.description)

        content.save()
        instance.save()
        return instance
