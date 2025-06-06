from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Roles, Usuarios, TipoPublicaciones, Publicaciones, Comentarios, EmailsContactos
from .serializers import RolesSerializer, UsuariosSerializer,UsuariosEditarSerializer, TipoPublicacionesSerializer, PublicacionesSerializer, ComentariosSerializer, EmailContactosSerializer
from rest_framework.views import APIView
from .models import Usuarios
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login
from rest_framework import status

#ListCreateView

# vista para contacto
class EmailContactoListCreateView(ListCreateAPIView):
    queryset = EmailsContactos.objects.all()
    serializer_class = EmailContactosSerializer


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
        #Funcion de grupo COMENTADA para pruebas
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
            return Response({"error": "Credenciales obligatorias"}, status=400) #Solicitud Invalida // 400

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"mensaje": "Inicio de sesión exitoso","id":user.id}, status=200) #Solicitud  Validada // 200

        return Response({"error": "Credenciales inválidas"}, status=400) # Solicitud Invalida // 400




#Prueba De Tipo Publicaciones
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
class EmailsContactosDetailView(RetrieveUpdateDestroyAPIView):
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
    queryset = TipoPublicaciones.objects.all()
    serializer_class = TipoPublicacionesSerializer

class PublicacionesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer

class ComentariosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Comentarios.objects.all()
    serializer_class = ComentariosSerializer


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
