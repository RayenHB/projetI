# Generated by Django 5.1.1 on 2024-11-08 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ersi', '0003_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
    ]
