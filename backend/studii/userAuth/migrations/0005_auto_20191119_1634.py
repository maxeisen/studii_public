# Generated by Django 2.2.6 on 2019-11-19 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuth', '0004_auto_20191105_1441'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=50),
        ),
    ]
