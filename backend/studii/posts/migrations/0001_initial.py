# Generated by Django 2.2.6 on 2019-11-05 19:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fileContent', models.FileField(blank=True, upload_to='uploadContent/')),
                ('textContent', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courseCode', models.CharField(max_length=7)),
                ('name', models.CharField(max_length=75)),
                ('university', models.CharField(max_length=70)),
                ('description', models.CharField(blank=True, max_length=255)),
            ],
            options={
                'unique_together': {('courseCode', 'university')},
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('contentType', models.CharField(max_length=20)),
                ('title', models.CharField(max_length=70)),
                ('description', models.CharField(blank=True, max_length=500)),
                ('dateTimePosted', models.DateTimeField(auto_now_add=True)),
                ('dateTimeEdited', models.DateTimeField(auto_now=True)),
                ('author', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='post', to=settings.AUTH_USER_MODEL)),
                ('content', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='post', to='posts.Content')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.Course')),
            ],
        ),
    ]
