from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

import datetime


class User(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=50)
    email = models.EmailField(('email address'), unique=True)

    # Overwriting default username fied in Django's AbstractUser class. Allows for unique check for email and prevents usernames from being required.
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
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user')
    avatar = models.ImageField(upload_to='uploads', blank=True)
    uni = models.CharField(max_length=70, blank=True)
    program = models.CharField(max_length=70, blank=True)
    gradYear = models.PositiveIntegerField(
        validators=[MinVal, MaxVal], blank=True)