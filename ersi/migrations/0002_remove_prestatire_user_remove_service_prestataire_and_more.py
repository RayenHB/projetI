# Generated by Django 5.1.1 on 2024-11-08 16:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ersi', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prestatire',
            name='user',
        ),
        migrations.RemoveField(
            model_name='service',
            name='prestataire',
        ),
        migrations.DeleteModel(
            name='Client',
        ),
        migrations.DeleteModel(
            name='User',
        ),
        migrations.DeleteModel(
            name='Prestatire',
        ),
        migrations.DeleteModel(
            name='Service',
        ),
    ]
