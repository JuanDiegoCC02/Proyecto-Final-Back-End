from django.db import models
# from para una conexion entre la tabla de django y la tabla propia
from django.contrib.auth.models import User


class Roles(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion =  models.CharField(max_length=100)

class Usuarios(models.Model):
    #relacion entre tablas
    usuario = models.OneToOneField(User,on_delete=models.CASCADE)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=50)

class TipoPublicaciones(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()

class Publicaciones(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    ubicacion = models.CharField(max_length=50)
    img = models.CharField(max_length=100)
    estado_publicacion = models.CharField(max_length=100)
    tipopublicacion = models.ForeignKey(TipoPublicaciones, on_delete = models.CASCADE, related_name= 'publicaciones' )   
    usuario = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'publicaciones')    

class Comentarios(models.Model):
    comentario = models.TextField()
    usuario = models.ForeignKey(Usuarios, on_delete = models.CASCADE, related_name = 'comentarios')    
    publicacion = models.ForeignKey(Publicaciones, on_delete= models.CASCADE, related_name = 'comentarios')


#crea el modelo para peticiones de contacto
class EmailsContacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    telefono = models.CharField(max_length=80)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
