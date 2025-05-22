from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Roles, Usuarios, TipoPublicaciones, Publicaciones, Comentarios
from .serializers import RolesSerializer, UsuariosSerializer, TipoPublicacionesSerializer, PublicacionesSerializer, ComentariosSerializer
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Usuarios
from rest_framework.response import Response
#ListCreateView
class RolesListCreateView(ListCreateAPIView):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

#
class UsuariosListCreateView(ListCreateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

class AggUsuarioView(APIView):
    # todos los datos
    def post(self,request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        fecha_nacimiento = request.data.get("fecha_nacimiento")
        telefono = request.data.get("telefono")

    #datos propios de django
        usuario = User.objects.create_user(
            username=username,
            password=password,
            email=email
        )

    #datos agregados
        Usuarios.objects.create(
            usuario = usuario,
            fecha_nacimiento = fecha_nacimiento,
            telefono = telefono

        )

        return Response({"exito":"Usuario Creado"})



class TipoPublicacionesListCreateView(ListCreateAPIView):
    queryset = TipoPublicaciones.objects.all()
    serializer_class = TipoPublicacionesSerializer

class PublicacionesListCreateView(ListCreateAPIView):
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer

class ComentariosListCreateView(ListCreateAPIView):
    queryset = Comentarios.objects.all()
    serializer_class = ComentariosSerializer


#DetailView
class RolesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

class UsuariosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

class TipoPublicacionesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = TipoPublicaciones.objects.all()
    serializer_class = TipoPublicacionesSerializer

class PublicacionesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer

class ComentariosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Comentarios.objects.all()
    serializer_class = ComentariosSerializer



