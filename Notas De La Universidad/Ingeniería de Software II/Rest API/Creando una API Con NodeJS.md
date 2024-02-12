Documentando el proceso de creación de una [[Rest API]]
**Escrito Por:** *Santiago Naranjo Herrera*
```table-of-contents
```
# Herramientas a Utilizar
## Aplicaciones
- Postman
- Visual Studio Code
- NodeJS
## Dependencias
- Express
- Morgan
- Nodemon (Dependencia de Desarrollo)


# Procedimiento
## Inicializa el Proyecto
Crea una carpeta y ábrela en Visual Studio Code, acto seguido, abre una terminal integrada y ejecuta el siguiente comando:

```shell
npm init --yes
```

Este código crea una archivo `package.json` que permite definir el contenido de tu proyecto.

## Instala las dependencias

Luego, procede a instalar las dependencias que utilizaremos para la creación de un servidor.

```shell
npm i express morgan
```

> ***Express*** es un framework de Node que nos permite escribir código del servidor de una forma sencilla.

>***Morgan*** es un modelo que permite ver por consola las diferentes peticiones que van llegando.

## Organiza tus carpetas y crea el núcleo de tu aplicación utilizando express.

Acto seguido, procede a crear una carpeta llamada `src`. Esta carpeta contendrá todos los recursos de tu proyecto, y servirá para llevar una organización en la que no crearemos archivos que se mezclen con el `package.json`. Dentro de esta carpeta crea un archivo `index.js` y pega el siguiente contenido:

```js
const express = require("express");
const app = express();
app.listen(3000, ()=>{
    console.log(`Server on Port ${3000}`);
})
```

Con este código, lo que estamos haciendo es llamar a la librería de express para luego guardarla en una constante. Luego, procedemos a ejecutar el framework de express y guardarlo en una constante llamada ``app`` que nos permitirá ejecutar la aplicación. Acto seguido, procedemos a inicializar la aplicación en el puerto *3000* y enviar un mensaje por consola que nos demuestre que la función está ejecutándose correctamente.

Para ejecutar el proyecto, basta con escribir en la terminal:

```shell
node src/index.js
```

Y luego escribir en tu navegador la ruta `http://localhost:3000/`. 

Al ingresar verás este mensaje `Cannot GET /` , el cual es una respuesta por defecto que utiliza express.

## Familiarizate con Morgan
Luego, procederemos a requerir a *Morgan* en nuestro proyecto.

```js
const morgan = require("morgan");
```

y procedemos a ejecutarlo, pero no como una aplicación sino como un middleware que recibe un parámetro que especifica de qué manera queremos recibir los datos en el terminal .

> ***Morgan*** es un middleware, es decir, es una función que procesa los datos antes de que nuestro servidor los reciba.

```js
//Middlewares
app.use(morgan('dev'));
```

*Morgan* me permite ver por consola lo que va llegando al servidor. Por ejemplo, si inicializamos de nuevo el proyecto e intentamos recargar la página nos aparecerá el siguiente mensaje en la consola.

```shell
GET / 404 11.839 ms - 139
```

- *GET* nos indica que acabamos de hacer una solicitud para obtener datos del servidor al refrescar la pantalla.
- *404* es el error que nos dice que no se ha encontrado el dato que se debe procesar.
- *11.839 ms* es el tiempo en milisegundos que tomó hacer la petición.
- *139* es el espacio en bytes que ocupó hacer la solicitud.

## Ejecutando Otros Métodos de Express
Ahora estamos creando una aplicación web que no renderiza archivos en *HTML*, esto debido a que cuando estemos enviando y recibiendo datos desde el servidor vamos a dejar de enviar *HTML* y pasaremos a enviar archivos en formato *JSON*. Para soportar estos formatos, agregaremos el siguiente middleware:

```js
app.use(express.json());
```

Este método JSON permite que nuestro servidor reciba los datos en *JSON* y pueda entenderlos.

Además, por si queremos recibir datos de inputs un formulario de otra aplicación hecha con *HTML*, *CSS* y *JavaScript*, también necesitaremos que el servidor comprenda a qué datos se refiere, por lo que agregaremos un método de express llamado `urlencoded`, con una propiedad `extended:false`.

```js
app.use(express.urlencoded({extended: false}));
```

Esta propiedad trabaja con datos no tan pesados, es decir, información que viene desde inputs que no manejan imágenes o algo por el estilo.

Gracias a estas tres líneas de código, podremos soportar los diferentes tipos de datos que vamos a recibir:

```js
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
```

## Crea las configuraciones de tu proyecto
Al igual que declarando variables, podrías adaptar tu `index.js` para crear diferentes configuraciones en el servidor. En este caso, con la sintaxis:

```js
//configurations
app.set("port", 3000);
```

podemos reemplazar estas dos líneas de código:

```js
app.listen(3000,()=>{
console.log(`Server on Port ${3000}`);
})
```

por:

```js
app.listen(app.get("port"), ()=>{
    console.log(`Server on Port ${app.get("port")}`);
})
```

## Automatiza la ejecución del código.
Antes, para comprobar que cada cambio que estuvieras haciendo fuera correcto, tenías que detener la ejecución del servidor y volverlo a ejecutar. Sin embargo, vamos a utilizar un módulo llamado *Nodemon*, que nos facilitará la tarea. Ejecuta el siguiente comando.

```shell
npm i nodemon -D
```

La directiva `-D` hace que pueda ejecutar *nodemon* como una dependencia de desarrollo dentro de mi proyecto, lo que significa que la dependencia se ejecutará cuando esté desarrollando mi proyecto pero no cuando esté subida a producción.

Ahora con *nodemon* instalado, dirígete al archivo `package.json` y crea un script que ejecute nodemon:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/index.js"
  },
```

Para ejecutar la aplicación, ahora solo basta con escribir el siguiente comando:

```shell
npm run dev
```

## Verifica el puerto del servidor
Algunas aplicaciones de despliegue como *Heroku* o *Azure* te dan un puerto ya definido a la hora de querer subir la aplicación a la nube, por lo que lo mejor en estos casos es adaptarse a el puerto asignado validando la posibilidad. Modifica la función de configuración de tu puerto a:

```js
//configurations
app.set("port",process.env.PORT || 3000);
```

Lo que estamos haciendo acá es decirle a la aplicación que si existe un puerto ya definido por el sistema o el servicio en la nube, que lo tome, de lo contrario tome el puerto 3000 por defecto.

## Escribe tus propias rutas
Es en este punto donde empezamos a aplicar los conceptos previamente vistos sobre una *REST API*.  Abajo de los Middlewares, escribe lo siguiente:

```js
//Routes
app.get("/",(req,res)=>{
    res.send("Hello World")
})
```

En este caso, estamos creando un nuevo espacio dentro de nuestro `index.js`, en donde creamos una ruta que indica que cuando ejecutemos el parámetro *GET* en nuestra ruta principal, enviaremos un mensaje que diga **Hello World**.  Ahora, en vez de mostrar el mensaje ``Cannot GET /``, se mostrará el mensaje `Hello World`.

Anteriormente lo que enviaríamos a través de ese método `.send()` sería un *HTML* estilado con *CSS* y *JavaScript* , sin embargo ahora lo que queremos enviar es un formato de texto de estilo *JSON*. 

Entonces, modificaremos la ruta de la siguiente manera para enviar un objeto de tipo *Clave/Valor* a través de un archivo *JSON*.

```js
//Routes
app.get("/",(req,res)=>{
    res.json({"Title":"Hello World"})
})
```

Para ordenar la legibilidad de nuestro *JSON*, vamos a añadir una configuración más:

```js
app.set("json spaces",2);
```

Ahora, lo que veremos que el servidor nos responde con un archivo de tipo *JSON* en vez de un archivo de *HTML*.

```JSON
// http://localhost:3000/
{
  "Title": "Hello World"
}
```


***TODO: Crear una nueva carpeta para separar las rutas y continuar el curso de API REST en NodeJS, minuto 28:40 del video***

# Referencias
- [Tu primer REST API usando Node.js - Fazt Code](https://www.youtube.com/watch?v=bK3AJfs7qNY)