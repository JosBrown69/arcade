# Generated by Django 5.0.6 on 2024-10-08 17:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('arcade_api', '0004_clan_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='game',
            old_name='played',
            new_name='record',
        ),
    ]