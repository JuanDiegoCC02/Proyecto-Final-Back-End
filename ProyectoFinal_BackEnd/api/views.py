from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Roles, Usuarios, TipoPublicaciones, Publicaciones, Comentarios
from .serializers import RolesSerializer, UsuariosSerializer, TipoPublicacionesSerializer, PublicacionesSerializer, ComentariosSerializer
from rest_framework.views import APIView
from .models import Usuarios
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login
from rest_framework import status





#ListCreateView
class RolesListCreateView(ListCreateAPIView):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

#
class UsuariosListCreateView(ListCreateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

class AggUsuarioView(APIView):
#    datos completos del request
 def post(self,request):
        username = request.data.get("username") 
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        password = request.data.get("password")
        email = request.data.get("email")
        fecha_nacimiento = request.data.get("fecha_nacimiento")
        telefono = request.data.get("telefono")

        if not username or not password or not email or not  fecha_nacimiento or not telefono:
            return Response(
                {"error": "Complete todos los campos"}, status=400 #Solicitud Invalidad //400
            )

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email ya Registrado"})

        if User.objects.filter(username=username).exists():
            return Response({"error":"Usuario ya Registrado"}, status=400)#Solicitud Invalidad //400


        #   datos propios de django
        usuario = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email
        )
        # grupo = Group.objects.get(name="User")
        # usuario.groups.add(grupo)

        #   datos agregados
        Usuarios.objects.create(
            usuario = usuario,
            fecha_nacimiento = fecha_nacimiento,
            telefono = telefono
        )

        return Response({"exito": "Usuario creado"},status=201)



#  Validacion de Usuarios en el Inicio de Sesion
class LoginView(APIView):
     def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Usuario y Contraseña obligatorios"}, status=400) #Solicitud Invalida // 400

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"mensaje": "Inicio de sesion exitoso"}, status=200) #Solicitud  Validada // 200

        return Response({"error": "Credenciales ingresadas inválidas"}, status=400) # Solicitud Invalida // 400





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



