from django.contrib import admin
from manga_rest_api import views as manga_views
from django.urls import include, path
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register(r'manga', manga_views.MangaViewSet, basename='manga_list')
router.register(r'authors', manga_views.AuthorViewSet, basename='authors_list')
router.register(r'genres', manga_views.GenreViewSet, basename='genres_list')
router.register(r'manga_genres', manga_views.GenreMangaViewSet)
router.register(r'manga_authors', manga_views.MangaAuthorViewSet)
router.register(r'manga_media_type', manga_views.MangaMediaTypeViewSet)
router.register(r'titles', manga_views.TitleViewSet)
router.register(r'users', manga_views.UsersViewSet, basename='users')
router.register(r'order_status', manga_views.OrderStatusViewSet)
router.register(r'orders', manga_views.OrderViewSet, basename='order')
router.register(r'cart', manga_views.CartViewSet, basename='cart')
router.register(r'current_cart', manga_views.CurrentCart, basename='manga_in_cart')

authors_router = routers.NestedDefaultRouter(router, r'manga', lookup='manga')
authors_router.register(r'authors', manga_views.AuthorsOfMangaViewSet, basename='authors_of_manga')

genres_router = routers.NestedDefaultRouter(router, r'manga', lookup='manga')
authors_router.register(r'genres', manga_views.GenresOfMangaViewSet, basename='genres_of_manga')

# orders_router = routers.NestedDefaultRouter(router, r'orders', lookup="order")
# orders_router.register(r'cart', manga_views.OrdersCartViewSet, basename='cart_of_order')


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('', include(authors_router.urls)),
    path('', include(genres_router.urls)),
    # path('', include(orders_router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('admin/', admin.site.urls),
    path(r'mangaPricing/', manga_views.get_manga_pricing),  # ok
    path(r'reg_new_user/', manga_views.reg_new_user),  # ok
    path(r'login/', manga_views.login_user),  # ok
    path(r'logout/', manga_views.logout_user),  # ok
]
