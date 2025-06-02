from .models import Roles, Usuarios, TipoPublicaciones, Publicaciones, Comentarios, EmailsContacto
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

class EmailContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailsContacto
        fields =  '__all__'



class TipoPublicacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPublicaciones
        fields = '__all__'


class PublicacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicaciones  
        fields = '__all__'



class ComentariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentarios
        fields = '__all__'

        