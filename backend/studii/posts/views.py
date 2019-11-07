from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions, viewsets
from .models import Course
from .serializers import ContentSerializer, CourseSerializer
from studii.permissions import IsLoggedInUserOrAdmin, IsAdminUser


class ContentUpload(APIView):
    parser_class = (FileUploadParser,)
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        content_serializer = ContentSerializer(data=request.data)
        if content_serializer.is_valid():
            content_serializer.save()
            return Response(content_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(content_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Courses(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'retrieve':
            permission_classes = [permissions.AllowAny, ]
        elif self.action == 'update' or self.action == 'partial_update' or self.action == 'create' or self.action == 'destroy':
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'list':
            permission_classes = [IsAdminUser]
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
