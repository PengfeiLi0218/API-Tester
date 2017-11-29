# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-29 09:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('runtests', '0003_testconfiguration_api_version'),
    ]

    operations = [
        migrations.AddField(
            model_name='testconfiguration',
            name='counterparty_id',
            field=models.CharField(blank=True, help_text='Counterparty identifier', max_length=255, null=True, verbose_name='Counterparty Id'),
        ),
    ]
