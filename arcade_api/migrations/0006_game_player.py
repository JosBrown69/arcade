# Generated by Django 5.0.6 on 2024-10-08 17:17

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('arcade_api', '0005_rename_played_game_record'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='player',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player', to=settings.AUTH_USER_MODEL),
        ),
    ]
