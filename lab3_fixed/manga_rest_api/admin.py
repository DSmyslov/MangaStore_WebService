from django.contrib import admin
from manga_rest_api import models

admin.site.register(models.GenreManga)
admin.site.register(models.Manga)
admin.site.register(models.Genre)
admin.site.register(models.Author)
admin.site.register(models.MangaAuthor)
admin.site.register(models.Title)
admin.site.register(models.MangaMediaType)
