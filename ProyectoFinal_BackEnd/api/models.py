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

    def __str__(self):
        return self.nombre

class Publicaciones(models.Model):
    OPCIONES_ESTADO = (
        ("publicada", "Publicada"),
        ("pendiente", "Pendiente"),
        ("rechazada", "Rechazada"),
    )

    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    latitud = models.CharField(max_length=50)
    longitud = models.CharField(max_length=50)
    img = models.CharField(max_length=100)
    estado_publicacion = models.CharField(max_length=100,choices=OPCIONES_ESTADO, default="pendiente")
    tipopublicacion = models.ForeignKey(TipoPublicaciones, on_delete = models.CASCADE, related_name= 'publicaciones' )   
    usuario = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'publicaciones')    




#crea el modelo para peticiones de contacto
class EmailsContactos(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    telefono = models.CharField(max_length=80)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
