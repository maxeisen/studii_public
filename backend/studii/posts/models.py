from djongo import models
import uuid


# TODO: Add likes
# TODO: Add tags
# TODO: Enable MongoDB Access control

class Content(models.Model):
    attachment = models.FileField(
        upload_to='uploadContent/', blank=True, null=False)
    textContent = models.TextField(blank=False)

    # FIXME: Consider changing content string representation
    def __str__(self):
        if self.fileContent is not None:
            return self.fileContent.name
        elif self.textContent is not None:
            return self.response_content[:20]


class Post(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length=70)
    author = models.ForeignKey(
        'userAuth.User', null=True, on_delete=models.SET_NULL, related_name='post')
    dateTimePosted = models.DateTimeField(auto_now_add=True, editable=False)
    dateTimeEdited = models.DateTimeField(auto_now=True, null=True)
    course = models.ForeignKey(
        'Course', on_delete=models.CASCADE, related_name='post')
    content = models.OneToOneField(
        Content, on_delete=models.CASCADE, related_name='post')
    comments = models.ArrayReferenceField(
        to='Comment', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')
    likesCount = models.IntegerField(default=0)
    likes = models.ArrayReferenceField(
        to='userAuth.User', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')

    def __str__(self):
        return "{}: {}".format(self.title, self.contentType)


# NOTE: Expand university list before deployment
UNIVERSITY_CHOICES = (
    ('QU', "Queen's University"),
    ('UT', "University of Toronto"),
    ('UW', "University of Waterloo"),
    ('UWO', "University of Western Ontario"),
    ('UG', "University of Guelph"),
)


class Course(models.Model):
    class Meta:
        unique_together = [['courseCode', 'university']]
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    courseCode = models.CharField(max_length=7)
    name = models.CharField(max_length=75)
    university = models.CharField(max_length=4, choices=UNIVERSITY_CHOICES)
    description = models.CharField(max_length=255, blank=True)
    creator = models.ForeignKey(
        'userAuth.User', on_delete=models.SET_NULL, null=True, related_name='course')
    posts = models.ArrayReferenceField(
        to='Post', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')
    members = models.ArrayReferenceField(
        to='userAuth.User', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')

    def __str__(self):
        return "{}: {}".format(self.university, self.courseCode)


class Comment(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    author = models.ForeignKey(
        'userAuth.User', null=True, on_delete=models.SET_NULL, related_name='comment')
    dateTimePosted = models.DateTimeField(auto_now_add=True, editable=False)
    dateTimeEdited = models.DateTimeField(auto_now=True, null=True)
    parentPost = models.ForeignKey(
        'Post', null=True, on_delete=models.CASCADE, related_name='comment')
    content = models.OneToOneField(
        Content, on_delete=models.CASCADE, related_name='comment')
    likesCount = models.IntegerField(default=0)
    likes = models.ArrayReferenceField(
        to='userAuth.User', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')

    def __str__(self):
        return "Reply to: {}".format(self.post.title)
