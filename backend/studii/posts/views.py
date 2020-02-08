from rest_framework.parsers import FileUploadParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions, viewsets
from .models import Course, Post, Comment
from .serializers import ContentSerializer, CourseSerializer, PostSerializer, JoinOrLeaveCourseSerializer, CommentSerializer, VoteSerializer
from studii.permissions import IsLoggedInUserOrAdmin, IsAdminUser
from django.shortcuts import get_object_or_404
from django.urls import resolve
from urllib.parse import urlparse

# FIXME: Deleting post should delete content from S3 bucket (Does deleting post automatically cascade to course post list?)


class ContentUploadView(APIView):
    parser_class = (FileUploadParser,)
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        content_serializer = ContentSerializer(data=request.data)
        if content_serializer.is_valid():
            content_serializer.save()
            return Response(content_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(content_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_class = (FileUploadParser, JSONParser)
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        post_serializer = PostSerializer(
            data=request.data, context={'request': request})
        if post_serializer.is_valid():
            post_serializer.save(author=request.user)
            return Response(post_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # TODO: Check if deletion cascades to user's posts and course's posts
    def destroy(self, request, pk=None):
        post = self.get_object()
        if post.author == request.user:
            try:
                self.perform_destroy(post)
            except Http404:
                pass
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None):
        post = self.get_object()
        if post.author == request.user:
            post_serializer = PostSerializer(
                post, data=request.data, context={'request': request})
            if post_serializer.is_valid():
                post_serializer.save()
                return Response(post_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

# TODO: Use IsLoggedInUserOrAdmin to simplify


class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    parser_class = (FileUploadParser, JSONParser)
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        comment_serializer = CommentSerializer(
            data=request.data, context={'request': request})
        if comment_serializer.is_valid():
            comment_serializer.save(author=request.user)
            return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # TODO: Check if deletion cascades to user's comments and course's comments
    def destroy(self, request, pk=None):
        comment = self.get_object()
        if comment.author == request.user:
            try:
                self.perform_destroy(comment)
            except Http404:
                pass
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None):
        comment = self.get_object()
        if comment.author == request.user:
            comment_serializer = CommentSerializer(
                comment, data=request.data, context={'request': request})
            if comment_serializer.is_valid():
                comment_serializer.save()
                return Response(comment_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class VoteView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = VoteSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            op = serializer.data.get('opperation')
            id = serializer.data.get('id')
            try:
                content = Comment.objects.get(id=id)
            except Comment.DoesNotExist:
                try:
                    content = Post.objects.get(id=id)
                except Post.DoesNotExist:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return getattr(self, op)(content, self.object)

    def like(self, content, user):
        if not content.likers.filter(id=user.id).exists() and not content.dislikers.filter(id=user.id).exists():
            content.likers.add(user)
            content.points = content.points + 1
            content.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif not content.likers.filter(id=user.id).exists() and content.dislikers.filter(id=user.id).exists():
            content.likers.add(user)
            content.dislikers.remove(user)
            content.points = content.points + 2
            content.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def dislike(self, content, user):
        if not content.likers.filter(id=user.id).exists() and not content.dislikers.filter(id=user.id).exists():
            content.dislikers.add(user)
            content.points = content.points - 1
            content.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif content.likers.filter(id=user.id).exists() and not content.dislikers.filter(id=user.id).exists():
            content.dislikers.add(user)
            content.likers.remove(user)
            content.points = content.points - 2
            content.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def neutral(self, content, user):
        if content.likers.filter(id=user.id).exists():
            content.likers.remove(user)
            content.points = content.points - 1
            content.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        if content.dislikers.filter(id=user.id).exists():
            content.dislikers.remove(user)
            content.points = content.points + 1
            content.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


class JoinCourseView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = JoinOrLeaveCourseSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            url = serializer.data.get("course")
            parsedUrl = urlparse(url).path
            course = resolve(parsedUrl).func.cls.serializer_class.Meta.model.objects.get(
                **resolve(parsedUrl).kwargs)
            course.members.add(self.object)
            course.save()
            self.object.courses.add(course)
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LeaveCourseView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = JoinOrLeaveCourseSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            url = serializer.data.get("course")
            parsedUrl = urlparse(url).path
            course = resolve(parsedUrl).func.cls.serializer_class.Meta.model.objects.get(
                **resolve(parsedUrl).kwargs)
            course.members.remove(self.object)
            course.save()
            self.object.courses.remove(course)
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseView(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (IsLoggedInUserOrAdmin,)

    def get_permissions(self):
        permission_classes = []
        if self.action == 'retrieve':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'update' or self.action == 'partial_update' or self.action == 'create' or self.action == 'destroy':
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'list':
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def create(self, request):
        course_serializer = CourseSerializer(
            data=request.data, context={'request': request})
        if course_serializer.is_valid():
            course_serializer.save(creator=request.user)
            return Response(course_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        course = self.get_object()
        if course.creator == request.user:
            try:
                self.perform_destroy(course)
            except Http404:
                pass
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None):
        course = self.get_object()
        if course.creator == request.user:
            course_serializer = CourseSerializer(
                course, data=request.data, context={'request': request})
            if course_serializer.is_valid():
                course_serializer.save()
                return Response(course_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def partial_update(self, request, pk=None):
        course = self.get_object()
        if course.creator == request.user:
            course_serializer = CourseSerializer(
                course, data=request.data, partial=True, context={'request': request})
            if course_serializer.is_valid():
                course_serializer.save()
                return Response(course_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

# TODO: Add pagination


class ListPostsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, pk, format=None):
        lookup = {'pk': pk}
        course = get_object_or_404(Course, **lookup)
        posts = course.posts
        serializer = PostSerializer(
            posts, many=True, context={'request': request})
        return Response(serializer.data)
