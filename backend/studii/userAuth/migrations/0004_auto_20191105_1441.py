# Generated by Django 2.2.6 on 2019-11-05 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuth', '0003_auto_20191029_1731'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(blank=True, upload_to='profileAvatar'),
        ),
    ]
