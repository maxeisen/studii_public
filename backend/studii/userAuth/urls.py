from django.conf.urls import url, include
from rest_framework import routers
from userAuth.views import UserViewSet, LoginView, UpdatePassword
from django.urls import path
from knox import views as knox_views
from userAuth.views import LoginView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'login/', LoginView.as_view(), name='knox_login'),
    url(r'logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    url(r'logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    url(r'updatepass/', UpdatePassword.as_view(), name='update_password'),
]
