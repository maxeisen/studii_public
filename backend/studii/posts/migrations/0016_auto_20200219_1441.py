# Generated by Django 2.2.6 on 2020-02-19 19:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0015_auto_20200208_1242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='creator',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='course', to=settings.AUTH_USER_MODEL),
        ),
    ]
