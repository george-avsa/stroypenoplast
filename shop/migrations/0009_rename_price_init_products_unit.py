# Generated by Django 4.0.6 on 2022-09-01 15:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_rename_density_products_character1_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='products',
            old_name='price_init',
            new_name='unit',
        ),
    ]