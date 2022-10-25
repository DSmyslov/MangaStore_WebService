from django.db import models


class Author(models.Model):
    author_name = models.CharField(unique=True, max_length=256)
    author_age = models.IntegerField(blank=True, null=True)
    author_info = models.TextField(blank=True, null=True)
    author_image = models.CharField(max_length=512)

    class Meta:
        managed = False
        db_table = 'author'


class Genre(models.Model):
    genre_name = models.CharField(unique=True, max_length=64)

    class Meta:
        managed = False
        db_table = 'genre'


class GenreManga(models.Model):
    id_genre = models.ForeignKey(Genre, models.DO_NOTHING, db_column='id_genre')
    id_manga = models.ForeignKey('Manga', models.DO_NOTHING, db_column='id_manga')

    class Meta:
        managed = False
        db_table = 'genre_manga'


class Manga(models.Model):
    manga_name = models.CharField(max_length=256)
    title = models.ForeignKey('Title', models.DO_NOTHING, db_column='title', blank=True, null=True)
    type = models.ForeignKey('MangaMediaType', models.DO_NOTHING, db_column='type', blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    synopsis = models.TextField(blank=True, null=True)
    manga_image = models.CharField(max_length=512)
    publisher = models.ForeignKey('Publisher', models.DO_NOTHING, db_column='publisher', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'manga'


class MangaAuthor(models.Model):
    id_manga = models.ForeignKey(Manga, models.DO_NOTHING, db_column='id_manga')
    id_author = models.ForeignKey(Author, models.DO_NOTHING, db_column='id_author')

    class Meta:
        managed = False
        db_table = 'manga_author'


class MangaMediaType(models.Model):
    type_name = models.CharField(unique=True, max_length=128)

    class Meta:
        managed = False
        db_table = 'manga_media_type'


class Publisher(models.Model):
    publisher_name = models.CharField(unique=True, max_length=256)

    class Meta:
        managed = False
        db_table = 'publisher'


class Stock(models.Model):
    id_manga = models.ForeignKey(Manga, models.DO_NOTHING, db_column='id_manga')
    qty = models.IntegerField(blank=True, null=True)
    cost = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stock'


class Title(models.Model):
    title_name_eng = models.CharField(unique=True, max_length=256)
    title_name_jp = models.CharField(unique=True, max_length=256, blank=True, null=True)
    title_name_rus = models.CharField(unique=True, max_length=256, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'title'