from posts.views import ContentUploadView, CourseView, PostView
from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'courses', CourseView)
router.register(r'posts', PostView)

urlpatterns = [
    #url(r'courses/', Courses.as_view(), name='courses'),
    #url(r'posts/', posts.as_view(), name='post'),
    url(r'^', include(router.urls)),
    url(r'upload/', ContentUploadView.as_view(), name='content_upload'),
]
