from posts.views import (ContentUploadView, CourseView, PostView, ListPostsView, JoinCourseView,
                         LeaveCourseView, CommentView, VoteView, EnrolledCoursesView, GetUserFeedView)
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
    url(r'^show/(?P<pk>\S+)/$', ListPostsView.as_view(), name='Posts'),
    url(r'^enrolled/(?P<pk>\S+)/$',
        EnrolledCoursesView.as_view(), name='Enrolled_courses'),
    url(r'joincourse/', JoinCourseView.as_view(), name='join_course'),
    url(r'leavecourse/', LeaveCourseView.as_view(), name='leave_course'),
    url(r'getfeed/', GetUserFeedView.as_view(), name='get_feed'),
    url(r'vote/', VoteView.as_view(), name='vote'),
]
