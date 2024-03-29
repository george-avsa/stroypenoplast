# Generated by Django 4.0.6 on 2022-08-09 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_products_size'),
    ]

    operations = [
        migrations.RenameField(
            model_name='products',
            old_name='size',
            new_name='density',
        ),
        migrations.AddField(
            model_name='products',
            name='height',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='products',
            name='length',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='products',
            name='width',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
