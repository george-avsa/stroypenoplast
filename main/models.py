from distutils.text_file import TextFile
from django.db import models
from django.forms import CharField

# Create your models here.
class FormText(models.Model):
    text = models.CharField(max_length=200)