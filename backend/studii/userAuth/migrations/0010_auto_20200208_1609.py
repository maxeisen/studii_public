# Generated by Django 2.2.6 on 2020-02-08 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuth', '0009_auto_20200208_1458'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='isTutor',
            field=models.BooleanField(default=False),
        ),
    ]