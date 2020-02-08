# Generated by Django 2.2.6 on 2020-02-08 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuth', '0008_user_comments'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='isTutor',
            field=models.BooleanField(default=False, editable=False),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='affiliation',
            field=models.CharField(blank=True, max_length=70),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='bio',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
