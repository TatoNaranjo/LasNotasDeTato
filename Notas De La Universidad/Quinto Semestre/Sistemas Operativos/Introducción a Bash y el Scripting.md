---
date: 2024-10-21
tags:
  - Scripting
  - Automatización
  - Herramientas
  - Productividad
  - Linux
---

> **Por:** Santiago Naranjo Herrera (Aka: TatoNaranjo)
# Índice
```table-of-contents
```
## Introducción a Shell y Bash
### ¿Qué es Shell?

Shell es una interfaz de línea de comandos que actúa como intermediario entre el usuario y el sistema operativo. Permite a los usuarios interactuar con el sistema mediante comandos de texto, facilitando la ejecución de tareas y la gestión del sistema.

### ¿Qué es Bash?

Bash (Bourne Again Shell) es una versión mejorada del shell original de Unix (Bourne Shell). Es el shell predeterminado en la mayoría de las distribuciones de Linux y macOS. Bash ofrece características avanzadas como completado de comandos, historial de comandos y scripting.

### Uso Básico de la Terminal

La terminal es la interfaz donde interactuamos con el shell. Aquí hay algunos comandos comunes para empezar:

- `ls`: Lista los archivos y directorios en el directorio actual.
- `pwd`: Muestra el directorio de trabajo actual (Present Working Directory).
- `cd`: Cambia el directorio actual.
- `echo`: Muestra un mensaje en la pantalla.
- `man`: Muestra el manual de un comando.

Aquí un ejemplo de su uso:

```bash
ls
pwd
cd Documents
echo "Hola Mundo"
man ls
```


## Estructura Básica de un Script en Bash

### ¿Qué es un Script?
Un script es un archivo de texto que contiene una serie de comandos que se ejecutan de manera secuencial. Los scripts de Bash permiten automatizar tareas y crear programas más complejos utilizando los comandos del shell.

### ¿Cómo Crear un Script Básico?

Para crear un script de Bash puedes seguir las siguientes indicaciones:

1. Crea un archivo con extensión `.sh`, por ejemplo, `mi_script.sh`.
2. Añade la línea shebang al principio del archivo: `#!/bin/bash`
3. Escribe los comandos que deseas ejecutar. Aquí un ejemplo:

```bash
#!/bin/bash
#Este es un comentario
echo "Hola, mundo!"
```

4. Guarda el archivo y dale permisos de ejecución con `chmod +x mi_script.sh`.

>[!TLDR] ¿Qué es una Línea SheBang?
>La línea shebang, también conocida como hash-bang o sharp-bang, es una secuencia de caracteres especial (`#!`) que se encuentra al inicio de un script. Inmediatamente después de esta secuencia, se especifica la ruta completa del intérprete que se utilizará para ejecutar las instrucciones contenidas en el script.
>
>En este ejemplo, `#!/bin/bash` indica que el script debe ser ejecutado utilizando el intérprete de comandos Bash.

### ¿Cómo Ejecutar Un Script?

Hay dos formas principales de ejecutar un script:

1. Usando `bash`:

```bash
bash mi_script.sh
```

1. Ejecutándolo directamente (requiere permisos de ejecución):

```bash
./mi_script.sh
```


La diferencia principal es que `bash mi_script.sh` ejecuta el script en un nuevo subshell, mientras que `./mi_script.sh` lo ejecuta en el shell actual si tiene permisos de ejecución.

## Variables en Bash

### Declaración y Uso de Variables

En Bash, las variables se declaran simplemente asignándoles un valor (Sip, Así Como en Python!). No es necesario especificar un tipo de datos. Aquí tienes un ejemplo:

```bash
nombre="Juan"
edad=25
echo "Hola, $nombre. Tienes $edad años."
```

### Variables de Entorno vs Variables Locales

Las variables de entorno que crees estarán disponibles para todos los procesos, sin embargo las **Variables Locales** solo estarán disponibles dentro del Script Actual. Puedes crear una variable de entorno mediante el siguiente comando:

```shell
export MI_VARIABLE="valor"
```

### Ejemplos de Variables

Aquí puedes ver un ejemplo sencillo sobre la creación de una variable y cómo puedes usarla dentro de un script.

```bash
#!/bin/bash

color="azul"
echo "Mi color favorito es $color"
```

Así mismo, puedes utilizar el comando `read` para capturar la entrada de un usuario:

```bash
#!/bin/bash

echo "¿Cuál es tu nombre?"
read nombre
echo "Hola, $nombre!"
```

## Comandos y Redirección

### El Uso de Comandos Dentro de Scripts

Es importante que tengas en cuenta que los scripts de bash pueden utilizar cualquier comando disponible en el sistema, es por ello que a medida de que vayas instalando aplicaciones y las vayas agregando a las variables de entorno de tu sistema operativo, podrás ir creando Scripts que involucren no solo los comandos básicos de Shell, sino también de otras herramientas que hayas creado.

#### Ejemplo: Crear un Archivo y Descomprimirlo

Supongamos que queremos descargar un archivo comprimido (por ejemplo, un archivo .zip) desde una URL específica y luego descomprimirlo en un directorio determinado. A continuación puedes tener un ejemplo de cómo podría crearse ese Script:

```bash
#!/bin/bash

# URL del archivo a descargar
URL="https://example.com/archivo.zip"

# Directorio donde se guardará el archivo descargado y se extraerá
DIRECTORIO_DESTINO="descargas"

# Crear el directorio de destino si no existe
mkdir -p "$DIRECTORIO_DESTINO"

# Descargar el archivo
curl -L "$URL" -o "$DIRECTORIO_DESTINO/archivo.zip"

# Descomprimir el archivo (asumiendo que es un archivo .zip)
unzip "$DIRECTORIO_DESTINO/archivo.zip" -d "$DIRECTORIO_DESTINO"
```

### Redirección de Entrada y Salida

Resulta, que los comandos que ejecutes dentro de un Script, no solo pueden derivar en un efecto inmediato, sino que también puedes guardar el registro de los mismos por medio de archivos dentro de tu sistema. 

>[!FAQ] Un Poquito de Ciberseguridad
>Alguna vez te has preguntado, **¿Cómo es que los hackers crean archivos maliciosos dentro de un dispositivo y los ejecutan después?** 
>
>Bueno, ahora sabes cuál es el comando que hace aparecer esos archivos que ni siquiera tú sabías que estaban dentro de tu PC.

Hay dos formas para generar una redirección de la salida de los comandos dentro de un script.

- El caracter `>` sobreescribe el archivo al que estés haciendo referencia.
- El caracter `>>` añade la salida al final del archivo al que estés haciendo referencia.

Aquí tienes un ejemplo:

```bash
echo "Hola" > saludo.txt
echo "Mundo" >> saludo.txt
```

#### Ejemplo: Listar un conjunto de Archivos y Redirigir la Salida a un Archivo de Texto

```bash
#!/bin/bash

ls -l > lista_archivos.txt
echo "Lista de archivos guardada en lista_archivos.txt"
```


## Estructuras de Control en Bash
### Estructuras Condicionales: `If`, `Else`, `Elif`

Aquí te muestro un ejemplo de cómo puedes implementar condicionales en tus scripts de Bash:

```bash
if [ condición ]; then
    # código
elif [ otra_condición ]; then
    # código
else
    # código
fi
```

### Operadores de Comparación:

Al momento de comparar dentro de las estructuras condicionales, debes tener en cuenta los siguientes operadores de comparación:

- `-eq`: igual
- `-ne`: no igual
- `-lt`: menor que
- `-le`: menor o igual que
- `-gt`: mayor que
- `-ge`: mayor o igual que
- `==`: igual (para strings)
- `!=`: no igual (para strings)

### Bucles: `for`, `while`, `until`

Cuando hablamos de bucles, debemos tener en cuenta el hecho de que siempre hay que buscar una manera de cerrarlos. El hecho de no cerrar un bucle cuando hacemos Scripts en Bash puede conducir a una cadena de ejecución infinita de procesos en memoria (En caso de que trabajes con procesos) y un posterior pantallazo azul en el caso de windows.

#### El Bucle `For`:

```bash
for i in 1 2 3 4 5
do
    echo "Número: $i"
done
```

#### El Bucle `While`:

```bash
count=1
while [ $count -le 5 ]
do
    echo "Iteración: $count"
    ((count++))
done
```

### Ejemplos Prácticos
#### Un Script Que Revise Si un Directorio o Un Archivo Existe:

```bash
#!/bin/bash

if [ -e "/ruta/al/archivo" ]; then
    echo "El archivo existe"
else
    echo "El archivo no existe"
fi
```

#### Un Script Que Itere sobre una Lista de Archivos

```bash
#!/bin/bash

for archivo in *.txt
do
    echo "Procesando: $archivo"
    # Aquí puedes añadir más comandos para procesar cada archivo
done
```

## Manejo de Procesos con Bash

Bash no solo se remonta a la ejecución de aplicaciones, sino que a su vez puede manejar procesos de las aplicaciones que se encuentran corriendo dentro de tu dispositivo. Aquí te presento algunos:
### Comandos Para Procesos `ps`, `kill`, `top`

- `ps`: Muestra todos los procesos que se encuentran en ejecución dentro de tu máquina.
- `kill`: Termina un proceso que se encuentre en ejecución dentro de tu máquina
- `top`: Muestra los procesos en tiempo real.

### Uso de `sleep` y El Control De Procesos Con Scripts

Puedes utilizar el comando `sleep` para pausar la ejecución del script por un número específico de segundos. Esto es útil cuando deseas repetir una acción o simplemente esperar a que se complete para iniciar otra justamente después, como por ejemplo:

```bash
echo "Esperando 5 segundos..."
sleep 5
echo "¡Listo!"
```

### Ejemplo Práctico: Un Script Que Ejecuta Un proceso Para Matarlo Después

```bash
#!/bin/bash

# Inicia un proceso en segundo plano
sleep 30 &

# Guarda el PID del proceso
PID=$!

echo "Proceso iniciado con PID: $PID"
echo "Esperando 5 segundos..."
sleep 5

echo "Terminando el proceso..."
kill $PID

echo "Proceso terminado"
```

## Automatización de Tareas con Bash

### ¿Qué es la automatización en Bash?

**La automatización en Bash** es el proceso de crear scripts (pequeños programas) que ejecutan una serie de comandos de forma secuencial o condicional. Estos scripts, escritos en el lenguaje de scripting Bash, permiten automatizar tareas repetitivas en sistemas operativos tipo Unix, como Linux y macOS, ahorrando tiempo y reduciendo errores humanos.

### ¿Por qué usar Bash para automatizar?

- **Versatilidad:** Bash te permite combinar una amplia gama de comandos y herramientas del sistema operativo, desde operaciones básicas de archivos hasta tareas más complejas de administración de sistemas.
- **Eficiencia:** Al automatizar tareas, puedes ejecutar múltiples comandos con un solo script, reduciendo el tiempo que dedicarías a realizar cada tarea individualmente.
- **Flexibilidad:** Los scripts de Bash pueden ser personalizados para adaptarse a diferentes escenarios y necesidades.
- **Portabilidad:** Los scripts de Bash son generalmente portables entre diferentes sistemas Unix-like, lo que significa que puedes crear scripts que funcionen en múltiples sistemas.

### Ejemplos de Tareas que se Pueden Automatizar con Bash

- **Administración de archivos:** Copiar, mover, renombrar, buscar y eliminar archivos.
- **Backup de datos:** Crear copias de seguridad de archivos y directorios de forma regular.
- **Gestión de usuarios:** Crear, eliminar y modificar cuentas de usuario.
- **Instalación de software:** Descargar e instalar paquetes de software.
- **Monitoreo del sistema:** Comprobar el estado del sistema, el uso del disco, la carga de la CPU, etc.
- **Envío de notificaciones:** Enviar correos electrónicos o notificaciones por SMS cuando ocurran ciertos eventos.
### Algunos Scripts Para Automatizar Tareas Repetitivas

El siguiente script, realiza una copia de seguridad de los archivos dentro de un directorio:

```bash
#!/bin/bash

# Directorio a respaldar
SOURCE_DIR="/ruta/al/directorio"

# Directorio donde se guardará el backup
BACKUP_DIR="/ruta/al/backup"

# Crear nombre de archivo con la fecha actual
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).tar.gz"

# Crear el archivo de backup
tar -czf "$BACKUP_DIR/$BACKUP_FILE" "$SOURCE_DIR"

echo "Backup creado: $BACKUP_FILE"
```

### Uso Básico de `cron` Para Programar Scripts

`cron` es un servicio que permite programar tareas para que se ejecuten automáticamente. Para poder editar la crontab puedes utilizar el siguiente comando:

```bash
crontab -e
```

Por ejemplo, puedes generar una entrada dentro de la tabla de cron para ejecutar un script diario a las 2 AM:

```shell
0 2 * * * /ruta/al/script.sh
```
## Consejos y Buenas Prácticas
### Maneja Comentarios En Los Scripts

Puedes usar `#` para añadir comentarios en tus Scripts. Esto es realmente útil para cuando decidas reutilizar tus scripts luego de mucho tiempo o tengas que subirlo a un repositorio para que alguien más lo vea.

```bash
# Este es un comentario
echo "Hola mundo" # Esto también es un comentario
```

### Realiza Una Depuración Básica Del Código

Puedes usar `set -x` para imprimir cada comando antes de ejecutarlo, gracias a esto puedes evitar resultados inesperados como una sobrecarga en la memoria por una ejecución repetida de procesos o un fallo en la salida del script correspondiente. Adicionalmente puedes usar `set -e` para que el script se detenga si cualquier comando falla.

```bash
#!/bin/bash
set -x # Activa el modo de depuración
set -e # Se detiene si hay un error

# Tu código aquí
```

### Cuida La Legibilidad y La Organización De Tu Código

Para garantizar que otra persona pueda entender el código que has escrito (o tu puedas entenderlo luego de un rato sin utilizarlo), es necesario contar con 3 reglas básicas que te ayudarán a entender cómo mejorar la legibilidad y la organización de tu código:

- Utiliza algunos nombres descriptivos para variables y funciones.
- Organiza tu código en funciones para mejorar la legibilidad y su probable reutilización.
- Mantén un estilo consistente en todo tu script.

A continuación te presento un ejemplo de un script que aplica estas tres reglas de legibilidad:

```bash
#!/bin/bash

# Función para saludar
saludar() {
    local nombre="$1"
    echo "Hola, $nombre!"
}

# Función principal
main() {
    echo "Bienvenido al script"
    saludar "Usuario"
    echo "Fin del script"
}

# Llamada a la función principal
main
```