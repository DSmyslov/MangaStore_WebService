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


class MangaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manga
        fields = ["id", "manga_name", "title", "type", "release_date", "synopsis", "manga_image",
                  "quantity_in_stock", "cost"]


class MangaSerializer(serializers.ModelSerializer):
    title = TitleSerializer()
    type = MangaMediaTypeSerializer()

    class Meta:
        model = Manga
        fields = ["id", "manga_name", "title", "type", "release_date", "synopsis", "manga_image",
                  "quantity_in_stock", "cost"]


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "login", "password", "username", "address", "email"]


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ["id", "order_status_name", "order_status_description"]


# Остальные запросы к списку заказов
class POSTOrderSerializer(serializers.ModelSerializer):
    # order_statusid = OrderStatusSerializer()

    class Meta:
        model = Order
        fields = ["id", "userid", "order_statusid", "order_price_sum", "order_date"]


# for non-GET methods
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["id", "order_id", "manga_id"]



class MangaInCartSerializer(serializers.ModelSerializer):
    manga_id = MangaSerializer()

    class Meta:
        model = Cart
        fields = ["manga_id", "id", "order_id"]


# GET запросы к спику заказов
class GETOrderSerializer(serializers.ModelSerializer):
    order_statusid = OrderStatusSerializer()
    ordered_manga = MangaInCartSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "userid", "order_statusid", "order_price_sum", "order_date", "ordered_manga"]
