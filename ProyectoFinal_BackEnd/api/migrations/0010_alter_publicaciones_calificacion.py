# Generated by Django 5.1.2 on 2025-06-16 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_publicaciones_calificacion_usuarios_foto_perfil_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publicaciones',
            name='calificacion',
            field=models.FloatField(default=0),
        ),
    ]
