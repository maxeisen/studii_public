from posts.views import ContentUpload, Courses
from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'courses', Courses)

urlpatterns = [
    #url(r'courses/', Courses.as_view(), name='courses'),
    url(r'^', include(router.urls)),
    url(r'upload/', ContentUpload.as_view(), name='content_upload'),
]
