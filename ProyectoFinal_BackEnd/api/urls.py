from django.urls import path
from .views import RolesListCreateView, UsuariosListCreateView, TipoPublicacionesListCreateView, PublicacionesListCreateView, ComentariosListCreateView, RolesDetailView, UsuariosDetailView, TipoPublicacionesDetailView, PublicacionesDetailView, ComentariosDetailView
from .views import AggUsuarioView
urlpatterns = [
    path ('roles/', RolesListCreateView.as_view(), name = 'roles-list-create'),
    path ('usuarios/', AggUsuarioView.as_view(), name = 'usuarios-list-create'),
    path ('tipopublicaciones/', TipoPublicacionesListCreateView.as_view(), name = 'tipopublicaciones-list-create'),
    path ('publicaciones/', PublicacionesListCreateView.as_view(), name = 'publicaciones-list-create'),
    path ('comentarios/', ComentariosListCreateView.as_view(), name = 'comentarios-list-create'),

    path ('roles/<int:pk>/', RolesDetailView.as_view(), name = 'roles-editar-actualizar'),
    path ('usuarios/<int:pk>/', UsuariosDetailView.as_view(), name = 'usuarios-editar-actualizar'),
    path ('tipopublicaciones/<int:pk>/', TipoPublicacionesDetailView.as_view(), name = 'tipopublicaciones-editar-actualizar'),
    path ('publicaciones/<int:pk>/', PublicacionesDetailView.as_view(), name = 'publicaciones-editar-actualizar'),
    path ('comentarios/<int:pk>/', ComentariosDetailView.as_view(), name = 'comentarios-editar-actualizar'),

]