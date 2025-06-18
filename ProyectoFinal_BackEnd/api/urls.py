from django.urls import path
from .views import  UsuariosListCreateView, TipoPublicacionesListCreateView, PublicacionesListCreateView, EmailContactoListCreateView
from .views import  RolesDetailView, UsuariosDetailView, TipoPublicacionesDetailView, PublicacionesDetailView, EmailsContactosDetailView
from .views import  AggUsuarioView,LoginView,UsuarioEditarView, ComentariosListCreateView, ComentariosDetailView, UsuarioRetrieveView, UsersSerializerLiscreateView

urlpatterns = [

    path ('users/', UsersSerializerLiscreateView.as_view()),
    path('usuario/<int:id>/', UsuarioRetrieveView.as_view(), name='usuario-detail'),

    path ('usuarios/', AggUsuarioView.as_view(), name = 'usuarios-list-create'),
    path ('usuarios-editar/<int:id>/', UsuarioEditarView.as_view(), name = 'usuarios-editar'),
    path ('usuarios-mostrar/', UsuariosListCreateView.as_view()),
    path ('login/', LoginView.as_view(), name = 'usuarios-list-create'),
    
     # url de la vista de contacto
    path ('emails-contacto/', EmailContactoListCreateView.as_view()),
   
   
    path ('tipopublicaciones/', TipoPublicacionesListCreateView.as_view(), name = 'tipopublicaciones-list-create'),
    path ('publicaciones/', PublicacionesListCreateView.as_view(), name = 'publicaciones-list-create'),
    path ('comentarios/', ComentariosListCreateView.as_view()),
  


    path ('roles/<int:pk>/', RolesDetailView.as_view(), name = 'roles-editar-actualizar'),
    path ('usuarios ', UsuariosDetailView.as_view(), name = 'usuarios-editar-actualizar'),
    
    path ('tipopublicaciones/<int:pk>/', TipoPublicacionesDetailView.as_view(), name = 'tipopublicaciones-editar-actualizar'),
    path ('publicaciones/<int:pk>/', PublicacionesDetailView.as_view()),
    path ('emailscontacto/<int:pk>/', EmailsContactosDetailView.as_view()),
    path ('comentarios/<int:pk>/', ComentariosDetailView.as_view()),
   
]
