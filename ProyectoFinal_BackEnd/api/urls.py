from django.urls import path
from .views import  UsuariosListCreateView, TipoPublicacionesListCreateView, PublicacionesListCreateView, ComentariosListCreateView, EmailsContactoListCreateView
from .views import  RolesDetailView, UsuariosDetailView, TipoPublicacionesDetailView, PublicacionesDetailView, ComentariosDetailView
from .views import  AggUsuarioView,LoginView,UsuarioEditarView

urlpatterns = [

    path ('usuarios/', AggUsuarioView.as_view(), name = 'usuarios-list-create'),
    path ('usuarios-editar/<int:id>/', UsuarioEditarView.as_view(), name = 'usuarios-editar'),
    path ('usuarios-mostrar/', UsuariosListCreateView.as_view()),
    path ('login/', LoginView.as_view(), name = 'usuarios-list-create'),
    
     # url de la vista de contacto
    path ('emails-contacto/', EmailsContactoListCreateView.as_view()),
   
   
    path ('tipopublicaciones/', TipoPublicacionesListCreateView.as_view(), name = 'tipopublicaciones-list-create'),
    path ('publicaciones/', PublicacionesListCreateView.as_view(), name = 'publicaciones-list-create'),
    path ('comentarios/', ComentariosListCreateView.as_view(), name = 'comentarios-list-create'),


    path ('roles/<int:pk>/', RolesDetailView.as_view(), name = 'roles-editar-actualizar'),
    path ('usuarios/<int:pk>/', UsuariosDetailView.as_view(), name = 'usuarios-editar-actualizar'),
    path ('tipopublicaciones/<int:pk>/', TipoPublicacionesDetailView.as_view(), name = 'tipopublicaciones-editar-actualizar'),
    path ('publicaciones/<int:pk>/', PublicacionesDetailView.as_view(), name = 'publicaciones-editar-actualizar'),
    path ('comentarios/<int:pk>/', ComentariosDetailView.as_view(), name = 'comentarios-editar-actualizar'),

   
]
