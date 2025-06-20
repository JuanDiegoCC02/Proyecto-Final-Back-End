from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from .models import Usuarios, TipoPublicaciones, Publicaciones, EmailsContactos, Comentarios, RespuestaComentarios, Calificaciones
from .models import Usuarios
from .serializers import UsuariosSerializer,UsuariosEditarSerializer, TipoPublicacionesSerializer, PublicacionesSerializer, EmailContactosSerializer, ComentariosSerializer,RespuestaComentariosSerializer, UsersSerializer, CalificacionesSerializer
from rest_framework.views import APIView
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

#View Comentarios
class ComentariosListCreateView(ListCreateAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = Comentarios.objects.all()
    serializer_class = ComentariosSerializer

#View Respuesta Comentarios
class RespuestaComentariosListCreateView(ListCreateAPIView):
    queryset = RespuestaComentarios.objects.all()
    serializer_class = RespuestaComentariosSerializer

#View  Emails Contactos
class EmailContactoListCreateView(ListCreateAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = EmailsContactos.objects.all()
    serializer_class = EmailContactosSerializer

#View Usuarios
class UsuariosListCreateView(ListCreateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer


#View AggUsuarios solo realiza un Post
class AggUsuarioView(APIView):
    permission_classes = [AllowAny]
        # <---todos los tados del request--->
    def post(self,request):
        username = request.data.get("username") 
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        password = request.data.get("password")
        email = request.data.get("email")
        fecha_nacimiento = request.data.get("fecha_nacimiento")
        telefono = request.data.get("telefono")
        foto_perfil = request.data.get("foto_perfil")

        if not username or not password or not email or not  fecha_nacimiento or not telefono:
            return Response(    
                {"error": "Complete todos los campos"}, status=400 
            )
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email ya Registrado"}, status=400)
        if User.objects.filter(username=username).exists():
            return Response({"error":"Usuario ya Registrado"}, status=400)

        #  <---Datos unicos de la tabla de django--->
        usuario = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email
        )
        grupo = Group.objects.get(name="Usuario")
        usuario.groups.add(grupo)

        #  <---Datos unicos de la tabla creada por nosotros--->
        Usuarios.objects.create(
            usuario = usuario,
            fecha_nacimiento = fecha_nacimiento,
            telefono = telefono,
            foto_perfil = foto_perfil
        )
        return Response({"exito": "Usuario creado"},status=201)




#View para tabla django y usuarios solo realiza Get
class GetUsuarioView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        usuarios = []

        for user in User.objects.all():
            try:
                extra = Usuarios.objects.get(usuario=user)
                usuarios.append({
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "fecha_nacimiento": extra.fecha_nacimiento,
                    "telefono": extra.telefono,
                    "foto_perfil" : extra.foto_perfil
                })
            except Usuarios.DoesNotExist:
                pass  

        return Response(usuarios)



# View del Inicio de Sesion
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


#View Tipo Publicaciones
class TipoPublicacionesListCreateView(ListCreateAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = TipoPublicaciones.objects.all()
    serializer_class = TipoPublicacionesSerializer

#View Publicaciones
class PublicacionesListCreateView(ListCreateAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer
    def perform_create(self, serializer):
        user = self.request.user

        serializer.save(usuario=user)
    



#View Calificaciones
class CalificacionesListCreateView(ListCreateAPIView):
    queryset = Calificaciones.objects.all()
    serializer_class = CalificacionesSerializer


#View User tabla django
class UsersSerializerLiscreateView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer

#Confg View Usuarios
class UsuarioActualizar(APIView):
    def patch(self,request):
        pass
 

#View Edit Users
class UsuarioEditarView(APIView):
    def patch(self,request,id):
        username = request.data.get("username")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        email = request.data.get("email")
        password = request.data.get("password")
        fecha_nacimiento = request.data.get("fecha_nacimiento")
        telefono = request.data.get("telefono")
        img = request.data.get("foto_perfil")

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
        
        usuario_ext = Usuarios.objects.get(usuario=user)

        if fecha_nacimiento:
            usuario_ext.fecha_nacimiento = fecha_nacimiento
        if telefono:
            usuario_ext.telefono = telefono
        if img:
            usuario_ext.foto_perfil = img
        user.save()
        usuario_ext.save()
        return Response({"mensaje": "Usuario actualizado"}, status=200)




#DetailView

#DetailView Comentarios
class ComentariosDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = Comentarios.objects.all()
    serializer_class = ComentariosSerializer

#DetailView Email Contactos
class EmailsContactosDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = EmailsContactos.objects.all()
    serializer_class = EmailContactosSerializer


#DetailView Users
class UsuariosDetailView(RetrieveUpdateDestroyAPIView):
     queryset = User.objects.all()
     serializer_class = UsuariosEditarSerializer

#DetailView Tipo Publicaciones
class TipoPublicacionesDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = TipoPublicaciones.objects.all()
    serializer_class = TipoPublicacionesSerializer

#DetailView Publicaciones
class PublicacionesDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [Permisos, IsAuthenticated]
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer


