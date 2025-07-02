# -Página Web Noticias Ambientales C.R.   /Proyecto Final Back-End/ 
Estudiantes: Joseph Monge y J.Diego Corella

En este Proyecto decidimos desarrollar una Página Web de Noticias Ambientales en Costa Rica, con el objetivo de permitir a los ciudadanos mantenerse informados sobre los sucesos ecológicos y
 ambientales en el país, además de la creación de campañas en busca de la colaboración activa en iniciativas de mitigación fomentando la interacción y el compromiso de los ciudadanos, no solo 
 informandolos si no tambien permitiendo a los ciudadanos informar sobre los sucesos que estén pasando en el territorio de Costa Rica y de los cuales quieran brindar información. 


#Tecnologias (Back-End)
Python
Django
Django Rest Framework
JWT (Simple JWT)
Base de Datos My SQL
Django Admin
Cludinary


#Autenticación y grupos
La autenticación se maneja con JWT (access y refresh token).
Grupos principales:
-Usuario: Puede publicar, comentar, calificar y ver publicaciones, ademas de poder editar datos de su entorno como su perfil y datos personales.
-Administrador: Acceso completo en toda la pagina y permisos CRUD para datos e información de la página. 


#Funcionalidades
Registro e Inicio de Sesión de Usuarios con verificación de los datos.
JWT para autenticación segura.
Panel de administración con Django Admin.
Permisos personalizados según el grupo (Usuario / Administrador).
Publicaciones con contenido de tipos de publicaciones, con estado de la publicación, ubicación de geolocalización  (latitud/longitud) y con almacenamiento de imagenes.
Sistema de comentarios y respuestas a comentarios.
Calificación de publicaciones.
Formulario de Contacto.
Gestion del perfil de usuario. (Fecha de Nacimiento, Foto de Perfil y Teléfono).


#Estructura del Back-End

>ProyectoFinal_BackEnd
├──> api
│ ├──> __pycache__
│ ├──> migrations 
│ ├── _init_.py
│ ├── admin.py
│ ├── apps.py
│ ├── models.py
│ ├── serializers.py
│ ├── tests.py
│ ├── urls.py
│ ├── views.py
│
│──── > ProyectoFinal_BackEnd
└── manage.py



