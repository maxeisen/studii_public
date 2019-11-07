from django.db import models
from django.conf import settings
import uuid


class Content(models.Model):
    fileContent = models.FileField(
        upload_to='uploadContent/', blank=True, null=False)
    textContent = models.TextField(blank=True)

    def __str__(self):
        if self.fileContent is not None:
            return self.fileContent.name
        elif self.textContent is not None:
            return self.response_content[:20]


class Post(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    contentType = models.CharField(max_length=20)
    title = models.CharField(max_length=70)
    description = models.CharField(max_length=500, blank=True)
    author = models.OneToOneField(
        settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name='post')
    dateTimePosted = models.DateTimeField(auto_now_add=True)
    dateTimeEdited = models.DateTimeField(auto_now=True)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    content = models.OneToOneField(
        Content, on_delete=models.CASCADE, related_name='post')

    def __str__(self):
        return "{}: {}".format(self.title, self.contentType)


# Expand this list before deployment
UNIVERISTY_CHOICES = (
    ('QU', "Queen's University"),
    ('UT', "University of Toronto"),
    ('UW', "University of Waterloo"),
    ('UWO', "University of Western Ontario"),
    ('UG', "Unviersity of Guelph"),
)


class Course(models.Model):
    class Meta:
        unique_together = [['courseCode', 'university']]

    courseCode = models.CharField(max_length=7)
    name = models.CharField(max_length=75)
    university = models.CharField(max_length=4, choices=UNIVERISTY_CHOICES)
    description = models.CharField(max_length=255, blank=True)
    creator = models.ForeignKey(
        'userAuth.User', on_delete=models.SET_NULL, null=True, related_name='course')

    def __str__(self):
        return "{}: {}".format(self.university, self.courseCode)
