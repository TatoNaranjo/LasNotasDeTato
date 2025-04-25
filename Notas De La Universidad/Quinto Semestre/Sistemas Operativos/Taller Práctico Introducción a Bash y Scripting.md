---
date: 2024-11-09
tags:
  - Scripting
  - Automatización
  - OS
---


**Objetivo**: Familiarizarse con los conceptos básicos de Bash scripting y aplicarlos en situaciones prácticas.

## Parte 1: Comandos Básicos

1. Abre la terminal y realiza las siguientes tareas:
    - Crea un directorio llamado `practica_bash`
    - Dentro de ese directorio, crea tres archivos vacíos llamados `archivo1.txt`, `archivo2.txt` y `archivo3.txt`
    - Muestra el contenido del directorio
    - Muestra la ruta actual donde te encuentras
2. ¿Qué comando utilizarías para:
    - Ver el manual del comando `ls`?
    - Listar archivos incluyendo los ocultos?
    - Cambiar al directorio padre? Escribe la respuesta para cada uno.

## Parte 2: Creación de Scripts

1. Crea un script llamado `saludo.sh` que:
    - Use la línea shebang correcta
    - Solicite el nombre del usuario usando `read`
    - Solicite la edad del usuario
    - Muestre un mensaje personalizado usando ambos datos
2. Crea un script llamado `calculadora.sh` que:
    - Reciba dos números como entrada
    - Muestre un menú con las operaciones: suma, resta, multiplicación y división
    - Realice la operación seleccionada y muestre el resultado

## Parte 3: Estructuras de Control

1. Crea un script llamado `verificador.sh` que:
    - Reciba una ruta de archivo o directorio como argumento
    - Verifique si existe
    - Si existe, indique si es un archivo o un directorio
    - Si es un archivo, muestre su tamaño
    - Si es un directorio, muestre cuántos archivos contiene
2. Crea un script llamado `contador.sh` que:
    - Reciba un número como argumento
    - Use un bucle while para contar desde 1 hasta ese número
    - Por cada número, indique si es par o impar

## Parte 4: Automatización

1. Crea un script llamado `backup.sh` que:
    - Reciba como argumento el nombre de un directorio
    - Cree una copia de seguridad de ese directorio con la fecha actual en el nombre
    - Comprima la copia en un archivo .tar.gz
    - Muestre un mensaje de éxito o error según corresponda
2. Crea un script llamado `monitor.sh` que:
    - Muestre cada 5 segundos:
        - El uso de CPU
        - La memoria disponible
        - El espacio en disco
    - Se ejecute hasta que el usuario presione Ctrl+C

## Entrega

- Todos los scripts deben incluir comentarios explicando su funcionamiento
- Cada script debe tener permisos de ejecución apropiados
- Entregar en un archivo comprimido que incluya:
    - Todos los scripts creados
    - Un archivo README.md explicando cómo ejecutar cada script
    - Capturas de pantalla mostrando la ejecución exitosa de cada script

## Criterios de Evaluación

- Funcionalidad (50%)
- Comentarios y documentación (20%)
- Manejo de errores (15%)
- Buenas prácticas de programación (15%)

## Nota Importante

Recuerda seguir las buenas prácticas vistas en clase:

- Usar nombres descriptivos para variables y funciones
- Incluir comentarios explicativos
- Manejar errores apropiadamente
- Mantener un estilo consistente en el código