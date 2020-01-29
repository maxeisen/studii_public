from djongo import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

import uuid
import datetime

# TODO: Consider using embedded models to improve efficiency


class User(AbstractUser):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    username = models.CharField(blank=True, null=True, max_length=50)
    email = models.EmailField(('email address'), unique=True)
    first_name = models.CharField(blank=False, max_length=50)
    last_name = models.CharField(blank=False,  max_length=50)
    clout = models.IntegerField(default=0)
    courses = models.ArrayReferenceField(
        to='posts.Course', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')
    posts = models.ArrayReferenceField(
        to='posts.Post', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')
    comments = models.ArrayReferenceField(
        to='posts.Comment', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')

    # Overwriting default username field in Django's AbstractUser class. Allows for unique check for email and prevents usernames from being required.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


def CurrentYear():
    return datetime.date.today().year


def MaxVal(val):
    # Wrapped in function to prevent new migration every year
    return MaxValueValidator(CurrentYear()+6)(val)


def MinVal(val):
    return MinValueValidator(CurrentYear())(val)


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='profileAvatar', blank=True)
    university = models.CharField(max_length=70, blank=True)
    program = models.CharField(max_length=70, blank=True)
    gradYear = models.PositiveIntegerField(
        validators=[MinVal, MaxVal], blank=True)
