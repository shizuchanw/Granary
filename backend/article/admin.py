from django.contrib import admin
from .models import *

admin.site.register([Article,Fandom,CP,Character,Grading,OtherTag])