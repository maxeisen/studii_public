from rest_framework import serializers
from .models import Content, Course, Post, Comment
from userAuth.models import User
from django.core import exceptions
from django.urls import resolve
from urllib.parse import urlparse
from django.http import Http404


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = ("__all__")


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'url', 'courseCode', 'name', 'university',
                  'description', 'creator', 'posts', 'members')
        read_only_fields = ('url', 'id', 'posts', 'members')


class JoinOrLeaveCourseSerializer(serializers.Serializer):
    course = serializers.HyperlinkedRelatedField(
        required=True, view_name='course-detail', queryset=Course.objects.all())


class VoteSerializer(serializers.Serializer):

    id = serializers.UUIDField(format='hex_verbose')
    opperation = serializers.ChoiceField(
        choices=('like', 'dislike', 'neutral'))


class PostSerializer(serializers.HyperlinkedModelSerializer):
    content = ContentSerializer(required=True)

    class Meta:
        model = Post
        fields = ('url', 'id', 'dateTimePosted', 'dateTimeEdited', 'title',
                  'author', 'course', 'content', 'comments', 'points', 'likers', 'dislikers')
        read_only_fields = ('url', 'id', 'dateTimePosted',
                            'dateTimeEdited', 'comments', 'points', 'likers', 'dislikers')

    def create(self, validated_data):
        content_data = validated_data.pop('content')
        contentInstance = Content.objects.create(**content_data)
        post = Post(content=contentInstance, **validated_data)
        post.save()
        course = post.course
        course.posts.add(post)
        author = post.author
        author.posts.add(post)
        return post

    def update(self, instance, validated_data):
        content_data = validated_data.pop('content')
        content = instance.content
        content.fileContent = content_data.get(
            'attachment', content.fileContent)
        content.textContent = content_data.get(
            'textContent', content.textContent)

        instance.title = validated_data.get('title', instance.title)
        content.save()
        instance.save()
        return instance


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    content = ContentSerializer(required=True)

    class Meta:
        model = Comment
        fields = ('url', 'id', 'author', 'dateTimePosted', 'dateTimeEdited', 'parentPost',
                  'content', 'points', 'likers', 'dislikers')
        read_only_fields = ('url', 'id', 'dateTimePosted',
                            'dateTImeEdited', 'points', 'likers', 'dislikers')

    def validate(self, data):
        postURL = data['parentPost']
        parsedUrl = urlparse(url).path
        try:
            course = resolve(parsedUrl).func.cls.serializer_class.Meta.model.objects.get(
                **resolve(parsedUrl).kwargs)
        except Http404:
            raise serializers.ValidationError("Invalid parent post URL")
        return data

    def create(self, validated_data):
        content_data = validated_data.pop('content')
        contentInstance = Content.objects.create(**content_data)
        comment = Comment(content=contentInstance, **validated_data)
        comment.save()
        parentPost = comment.parentPost
        parentPost.comments.add(comment)
        author = comment.author
        author.comments.add(comment)
        return comment

    def update(self, instance, validated_data):
        content_data = validated_data.pop('content')
        content = instance.content
        content.fileContent = content_data.get(
            'attachment', content.fileContent)
        content.textContent = content_data.get(
            'textContent', content.textContent)

        instance.title = validated_data.get('title', instance.title)
        content.save()
        instance.save()
        return instance
