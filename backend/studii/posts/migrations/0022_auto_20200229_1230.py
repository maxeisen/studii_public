# Generated by Django 2.2.6 on 2020-02-29 17:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0021_auto_20200221_2238'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='parentPost',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='posts.Post'),
        ),
    ]
