from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Roles, Usuarios, TipoPublicaciones, Publicaciones, EmailsContactos, Comentarios
from .serializers import RolesSerializer, UsuariosSerializer,UsuariosEditarSerializer, TipoPublicacionesSerializer, PublicacionesSerializer, EmailContactosSerializer, ComentariosSerializer
from rest_framework.views import APIView
from .models import Usuarios
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAuthenticated

from rest_framework.permissions import AllowAny


#Permisos admin
class Permisos(BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        if not usuario.is_authenticated:
            return False
        metodo = request.method
        grupos_usuarios = usuario.groups.values_list('name', flat=True)


        if metodo in SAFE_METHODS:
            return True
        
        if "Usuario" in grupos_usuarios:
            if metodo in ["POST", "GET"]:
                return True
            
        if "Moderador" in grupos_usuarios:
            if metodo in ["POST", "GET", "PATCH", "DELETE"]:
                return True

        if "Administrador" in grupos_usuarios:
            if metodo in ["POST", "GET", "PATCH", "DELETE"]:
                return True  
        return False

        
#Permiso usuario
class PermisosUser(BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        if not usuario.is_authenticated:
            return False
        metodo = request.method
        grupos_usuarios = usuario.groups.values_list('name', flat=True)


        if metodo in SAFE_METHODS:
            return True
        
        if "Usuario" in grupos_usuarios:
            if metodo in ["POST", "GET"]:
                return True
        return False
        




#ListCreateView

class ComentariosListCreateView(ListCreateAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = Comentarios.objects.all()
    serializer_class = ComentariosSerializer


# vista para contacto
class EmailContactoListCreateView(ListCreateAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = EmailsContactos.objects.all()
    serializer_class = EmailContactosSerializer


class RolesListCreateView(ListCreateAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

#
class UsuariosListCreateView(ListCreateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

class AggUsuarioView(APIView):
    permission_classes = [AllowAny]
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
                {"error": "Complete todos los campos"}, status=400 
            )

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email ya Registrado"}, status=400)
        
        if User.objects.filter(username=username).exists():
            return Response({"error":"Usuario ya Registrado"}, status=400)


        #   datos propios de django
        usuario = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email
        )
        #Funcion de grupo COMENTADA para pruebas
        grupo = Group.objects.get(name="Usuario")
        usuario.groups.add(grupo)

        #   datos agregados
        Usuarios.objects.create(
            usuario = usuario,
            fecha_nacimiento = fecha_nacimiento,
            telefono = telefono
        )

        return Response({"exito": "Usuario creado"},status=201)



# inicio de sesion
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Credenciales obligatorias"}, status=400)

        user = authenticate(username=username, password=password)
        if user is not None:
            grupo_usuario = user.groups.first()
            token_ref = RefreshToken.for_user(user)
            token_acc = AccessToken.for_user(user)

            login(request, user)
            print("Access Token:", token_acc)
            print("Refresh Token:", token_ref)

            print("Grupo del usuario:", grupo_usuario)


            return Response({
                "mensaje": "Inicio de sesión exitoso",
                "access": str(token_acc),
                "refresh": str(token_ref),
                "id": user.id,
                "grupo": str(grupo_usuario)
            }, status=200)

        return Response({"error": "Credenciales inválidas"}, status=400)




#Prueba De Tipo Publicaciones
class TipoPublicacionesListCreateView(ListCreateAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = TipoPublicaciones.objects.all()
    serializer_class = TipoPublicacionesSerializer



class PublicacionesListCreateView(ListCreateAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer


#DetailView
class ComentariosDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = Comentarios.objects.all()
    serializer_class = ComentariosSerializer


class EmailsContactosDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = EmailsContactos.objects.all()
    serializer_class = EmailContactosSerializer

class RolesDetailView(RetrieveUpdateDestroyAPIView):
    
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

class UsuariosDetailView(RetrieveUpdateDestroyAPIView):
    
     queryset = User.objects.all()
     serializer_class = UsuariosEditarSerializer

#Configuracion del view para actualizar Usuario
class UsuarioActualizar(APIView):
    
    def patch(self,request):
        pass

class TipoPublicacionesDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = TipoPublicaciones.objects.all()
    serializer_class = TipoPublicacionesSerializer

class PublicacionesDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer



class UsuarioEditarView(APIView):
   
    def patch(self,request,id):
        username = request.data.get("username")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        email = request.data.get("email")
        password = request.data.get("password")
        fecha_nacimiento = request.data.get("fecha_nacimiento")
        telefono = request.data.get("telefono")

        user = User.objects.get(id=id)
                
        if username:
            user.username = username
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if email:
            user.email = email
        if password:
            user.set_password(password)
        
        usuario_ext = user.usuarios

        if fecha_nacimiento:
            usuario_ext.fecha_nacimiento = fecha_nacimiento
        if telefono:
            usuario_ext.telefono = telefono
        
        user.save()

        usuario_ext.save()

        return Response({"mensaje": "Usuario actualizado"}, status=200)
