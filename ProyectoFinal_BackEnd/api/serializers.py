from .models import Roles, Usuarios, TipoPublicaciones, Publicaciones, Comentarios
from rest_framework import serializers

#Serializers 
class RolesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Roles
        fields = '__all__'


class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'


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

        