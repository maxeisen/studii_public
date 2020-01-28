from posts.views import ContentUploadView, CourseView, PostView, ListPostsView, JoinCourseView, LeaveCourseView, CommentView
from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'courses', CourseView)
router.register(r'content', PostView)
router.register(r'comment', CommentView)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'upload/', ContentUploadView.as_view(), name='content_upload'),
    url(r'^show/(?P<pk>\d+)/$', ListPostsView.as_view(), name='Posts'),
    url(r'joincourse/', JoinCourseView.as_view(), name='join_course'),
    url(r'leavecourse/', LeaveCourseView.as_view(), name='leave_course'),
]
