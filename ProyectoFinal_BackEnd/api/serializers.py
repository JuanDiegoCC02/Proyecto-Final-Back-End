from .models import Roles, Usuarios, TipoPublicaciones, Publicaciones, EmailsContactos
from rest_framework import serializers
from django.contrib.auth.models import User

#Serializers 
class RolesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Roles
        fields = '__all__'


class UsuariosSerializer(serializers.ModelSerializer):
    usuario_alias = serializers.CharField(source="usuario.username",read_only=True)
    usuario_nombre = serializers.CharField(source="usuario.first_name",read_only=True)
    usuario_apellido = serializers.CharField(source="usuario.last_name",read_only=True)
    usuario_email = serializers.CharField(source="usuario.email",read_only=True)
    class Meta:
        model = Usuarios
        fields = ["id","fecha_nacimiento","telefono","usuario","usuario_alias","usuario_nombre","usuario_apellido","usuario_email"]

class UsuariosEditarSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class EmailContactosSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailsContactos
        fields =  '__all__'



class TipoPublicacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPublicaciones
        fields = '__all__'


class PublicacionesSerializer(serializers.ModelSerializer):
    nombre_tipo_publicacion = serializers.CharField(source="tipopublicacion.nombre", read_only=True)
    class Meta:
        model = Publicaciones  
        fields = [
            "id", "titulo", "descripcion", "latitud", "longitud", "img", 
            "estado_publicacion", "tipopublicacion", "usuario", 
            "nombre_tipo_publicacion"
        ]




