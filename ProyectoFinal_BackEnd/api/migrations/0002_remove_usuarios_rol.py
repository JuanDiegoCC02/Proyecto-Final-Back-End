# Generated by Django 5.1.2 on 2025-05-22 16:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuarios',
            name='rol',
        ),
    ]
