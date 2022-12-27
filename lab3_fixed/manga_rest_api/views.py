import this
from datetime import datetime

from django.utils.dateparse import parse_datetime
from django.http import HttpResponse
from rest_framework import viewsets
from django.db.models import Max, Min, Avg
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny, BasePermission, \
    SAFE_METHODS
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group


# Наш собственный пермишн для менеджера
class IsManagerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            # У всех есть доступ к безопасным методам GET, OPTIONS, ...
            return True
        print(request.user)
        print(User.objects.filter(pk=request.user.id, groups__name='Manager').exists())
        # К небезопасным методам есть доступ только у менеджера
        # Это методы POST, PUT, DELETE, PATCH, ...
        return bool(request.user and User.objects.filter(username=request.user, groups__name='Managers').exists())


# проверка на менеджера
def is_manager(user):
    return user.groups.filter(name='Managers').exists()


# информации о стоимости манги
@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_manga_pricing(request):
    return Response(Manga.objects.filter(shown=1).aggregate(max_price=Max('cost'), min_price=Min('cost'), average_cost=Avg('cost')))


# выход пользователя
@api_view(['GET'])
def logout_user(request):
    logout(request)
    response = Response({"result": "U_ARE_NO_LONGER_AUTHORIZED"})
    response.set_cookie("is_logged_in",
                        value=False)
    response.set_cookie("is_manager", value=False)
    return response


# авторизация
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data['login']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        response = Response({'success': 'U_HAVE_BEEN_AUTHORIZED'})
        response.set_cookie("is_logged_in",
                            value=True,
                            expires=request.session.get_expiry_date())
        if is_manager(user):
            response.set_cookie("is_manager",
                                value=True,
                                expires=request.session.get_expiry_date())
        return response
    else:
        return Response({'error': 'U_ARE_NOT_AUTHORIZED'})


# регистрация нового пользователя
@api_view(['POST'])
@permission_classes([AllowAny])
def reg_new_user(request):
    try:
        User.objects.create_user(username=request.data['login'],
                                 password=request.data['password'])
        Users.objects.create(login=request.data['login'],
                             username=request.data['username'],
                             password=request.data['password']).save()
        return Response({'success': 'NEW_USER_CREATED'})
    except Exception as e:
        return Response({'error': 'LOGIN_IS_USED'})


# список манги, в т.ч. с поиском и сортировкой
class MangaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MangaSerializer
        else:
            return MangaSimpleSerializer

    def get_queryset(self):
        queryset = Manga.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            queryset = queryset.filter(shown=1)
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
            queryset.filter(quantity_in_stock__gt=0)
        return queryset.order_by("release_date")


# список заказов
class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GETOrderSerializer
        else:
            return POSTOrderSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            params = self.request.query_params.dict()
            queryset = Order.objects.all().order_by('-order_date')
            try:
                queryset = queryset.filter(order_date__gte=params['start_date'])
            except:
                pass
            try:
                queryset = queryset.filter(order_date__lte=params['end_date'])
            except:
                pass
            try:
                queryset = queryset.filter(order_statusid__in=params['statuses'].split(','))
            except:
                pass
            try:
                if params['all'] == 'true' and is_manager(User.objects.get(username=self.request.user)):
                    return queryset
            except:
                pass
            user_id = Users.objects.get(login=self.request.user).id
            return Order.objects.filter(userid=user_id).order_by('-order_date')
        else:
            return Order.objects.all()


# корзины
class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user_id = Users.objects.get(login=self.request.user).id
            order_id = Order.objects.filter(userid=user_id, order_statusid=6).first().id
            queryset = Cart.objects.filter(order_id=order_id)
            return queryset
        else:
            queryset = Cart.objects.all()
            return queryset


# ???
class OrdersCartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = None

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user_id = Users.objects.get(login=self.request.user).id
            print(user_id)
            queryset = Cart.objects.filter()
            return queryset
        else:
            queryset = Cart.objects.all()
            return queryset


# получение текущей корзины пользователя
class CurrentCart(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MangaInCartSerializer

    def get_queryset(self):
        user = Users.objects.get(login=self.request.user)
        user_id = user.id
        order = Order.objects.filter(userid=user_id, order_statusid=6)
        if order.count() != 0:
            self.serializer_class = MangaInCartSerializer
            cart = Cart.objects.filter(order_id=order.first().id)
            if cart.count() > 0:
                return cart
            else:
                self.serializer_class = POSTOrderSerializer
                queryset = Order.objects.filter(id=order.first().id)
                return queryset
        else:
            # у пользователя нет корзины
            # либо все корзины подтверждены и нет новой
            new_order = Order.objects.create(userid=user)
            new_order_id = new_order.id
            new_order.save()
            self.serializer_class = POSTOrderSerializer
            queryset = Order.objects.filter(id=new_order_id)
            return queryset


class AuthorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Author.objects.all().order_by("author_name")
    serializer_class = AuthorSerializer


class GenreViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class GenreMangaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = GenreManga.objects.all()
    serializer_class = GenreMangaSerializer


class MangaAuthorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = MangaAuthor.objects.all()
    serializer_class = MangaAuthorSerializer


class MangaMediaTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, IsManagerOrReadOnly]
    queryset = MangaMediaType.objects.all()
    serializer_class = MangaMediaTypeSerializer


class TitleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Title.objects.all()
    serializer_class = TitleSerializer


class MangaFullInfoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = MangaSerializer

    def get_queryset(self):
        queryset = Manga.objects.filter(shown=1).select_related('')
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


class UsersViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]  # только менеджерам или админам!
    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class OrderStatusViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer
