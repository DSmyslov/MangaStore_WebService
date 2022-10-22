from manga_rest_api.models import *
from rest_framework import serializers


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ["pk", "author_name", "author_age", "author_info", "author_image"]


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "genre_name"]


class GenreMangaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenreManga
        fields = ["id", "id_genre", "id_manga"]


class GenresOfMangaSerializer(serializers.ModelSerializer):
    id_genre = GenreSerializer()

    class Meta:
        model = GenreManga
        fields = ["id_genre"]


class MangaAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MangaAuthor
        fields = ["id", "id_manga", "id_author"]


class AuthorsOfMangaSerializer(serializers.ModelSerializer):
    id_author = AuthorSerializer()

    class Meta:
        model = MangaAuthor
        fields = ["id_author"]


class MangaMediaTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MangaMediaType
        fields = ["id", "type_name"]


class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = ["id", "title_name_eng", "title_name_jp", "title_name_rus", "description"]


class MangaSerializer(serializers.ModelSerializer):
    title = TitleSerializer()
    type = MangaMediaTypeSerializer()

    class Meta:
        model = Manga
        fields = ["id", "manga_name", "title", "type", "release_date", "synopsis", "manga_image",
                  "quantity_in_stock", "cost"]
