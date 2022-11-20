from rest_framework import viewsets
from django.db.models import Max, Min, Avg, Count
from manga_rest_api.serializers import *
from manga_rest_api.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def get_manga_pricing(request):
    return Response(Manga.objects.aggregate(max_price=Max('cost'), min_price=Min('cost'), average_cost=Avg('cost')))


class MangaViewSet(viewsets.ModelViewSet):
    serializer_class = MangaSerializer

    def get_queryset(self):
        queryset = Manga.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(manga_name__icontains=params['name'])
            except:
                pass
            try:
                queryset = queryset.filter(cost__lte=params['max_cost'])
            except:
                pass
            try:
                queryset = queryset.filter(cost__gte=params['min_cost'])
            except:
                pass
        return queryset.order_by("release_date")


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all().order_by("author_name")
    serializer_class = AuthorSerializer


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class GenreMangaViewSet(viewsets.ModelViewSet):
    queryset = GenreManga.objects.all()
    serializer_class = GenreMangaSerializer


class MangaAuthorViewSet(viewsets.ModelViewSet):
    queryset = MangaAuthor.objects.all()
    serializer_class = MangaAuthorSerializer


class MangaMediaTypeViewSet(viewsets.ModelViewSet):
    queryset = MangaMediaType.objects.all()
    serializer_class = MangaMediaTypeSerializer


class TitleViewSet(viewsets.ModelViewSet):
    queryset = Title.objects.all()
    serializer_class = TitleSerializer


class MangaFullInfoViewSet(viewsets.ModelViewSet):
    serializer_class = MangaSerializer

    def get_queryset(self):
        queryset = Manga.objects.select_related('')
        return queryset


class AuthorsOfMangaViewSet(viewsets.ModelViewSet):
    serializer_class = AuthorsOfMangaSerializer

    def get_queryset(self):
        queryset = MangaAuthor.objects.filter(id_manga=self.kwargs['manga_pk'])
        return queryset


class GenresOfMangaViewSet(viewsets.ModelViewSet):
    serializer_class = GenresOfMangaSerializer

    def get_queryset(self):
        queryset = GenreManga.objects.filter(id_manga=self.kwargs['manga_pk'])
        return queryset

