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

## Ordena Tus Rutas

Debido a que vamos a añadir muchas más rutas en nuestros proyectos, es conveniente juntarlas a todas dentro de una carpeta por términos de organización. Para esto, crearemos una carpeta `routes` dentro del directorio `src`. Luego, dentro de la carpeta `routes` creamos un archivo `index.js` que será el que va a contener todas las rutas y las exportará para que otros archivos las puedan usar.

Además, dentro del archivo `index.js` del directorio routes, modificaremos el código para llamar directamente al método `routes` de *Express*. El método permite crear nuevas rutas para el servidor. Con todos los cambios nuestro nuevo archivo quedaría de la Siguiente manera:

```js
const {Router} = require ('express');
const Router = Router();
router.get("/",(req,res)=>{
    res.json({"Title":"Hello World"})
})
module.exports = router;
```

Ahora, en el `index.js` anterior, tendremos que llamar al documento que acabamos de crear...

```js
//Routes
app.use(require('./routes/index'));
```

## Simulando el funcionamiento de una API para una página de Películas

Debido a que el ejemplo a seguir no tiene una base de datos, la simularemos a partir de un archivo JSON que crearemos en la carpeta `src`. En este caso le pondremos el nombre `sample.json` debido a que es un archivo de prueba, y lo rellenaremos con información.

```json
[
    {
      "id":1,
      "name": "Tenet",
      "Director": "Christopher Nolan",
      "Cast": "John David Washington, Robert Pattinson, Elizabeth Debicki"
    },
    {
      "id":2,
      "name": "The Trial of the Chicago 7",
      "Director": "Aaron Sorkin",
      "Cast": "Eddie Redmayne, Sacha Baron Cohen, Mark Rylance"
    },
    ]
```

Dentro de `routes` crearemos un archivo llamado `movies.js`, que será el encargado de acceder a la información del archivo *JSON* creado anteriormente, y que contendrá el mismo sistema de rutas que usamos en el archivo `index.js` de routes:

```js
const {Router} = require ("express");
const router = Router();
router.get("/movies",(req,res)=>{
    res.send("Movies")
})
module.exports = router;
```

Luego, procederemos a importar la ruta en el archivo `index.js` de la carpeta `src`

```js
...
//Routes
app.use(require('./routes/index'));
app.use(require("./routes/movies"));
```

### Siguiendo las prácticas REST

Como queremos que la creación de nuestra API siga los principios REST, no podemos dejar una ruta tipo `http://localhost:3000/movies` debido a que el patrón que se suele seguir, es que antes de acceder a la información haya un directorio que indique que se está accediendo a una API. Por lo tanto, el directorio debe quedar de la forma `http://localhost:3000/api/movies`.

Para esto, tenemos que acceder al archivo `.js` de nuestra ruta y modificar la siguiente linea:

```js
router.get("/movies",(req,res)=>{
```

por:

```js
router.get("/",(req,res)=>{
```

Posteriormente, en el `index.js` donde se importan todas las rutas tenemos que indicar que nuestra ruta comienza con la dirección `/api/nombredelarchivo`.

```js
//Routes
// Forma sin prácticas REST
app.use(require('./routes/index'));
//Forma con Prácticas REST
app.use('/api/movies',require("./routes/movies"));
```

### Obteniendo los datos del archivo .JSON
 Para obtener los datos de nuestro *JSON* simplemente modificamos el archivo `movies.js` de la siguiente forma:

```js
const {Router} = require ("express");
const router = Router();
const movies = require("../sample.json");
router.get("/",(req,res)=>
    res.json(movies);
})
module.exports = router;
```

Si vamos a la dirección `http://localhost:3000/api/movies` veremos un arreglo con todos los datos de nuestro `sample.json`.

### Agregando Contenido al JSON con Peticiones mediante Postman

Debido a que no utilizamos una interfaz con HTML y JavaScript, tenemos que solventar las peticiones del proyecto usando Postman.

En Postman podemos crear diferentes peticiones como *GET*, *PUT* o *POST* para administrar nuestra API REST, y nos daremos cuenta de que al momento de que el navegador ingresa a la ruta `http://localhost:3000/api/movies` hace una petición *GET* automáticamente.

Para ingresar datos mediante una petición *POST* por medio de Postman, debemos de configurar las propiedades de nuestro archivo `movies.js` para otorgar la posibilidad de realizar ese tipo de peticiones.

```js
router.post("/",(req,res)=>{
    console.log(req.body);  
    res.send("Received");
});
```

En este caso, estamos pidiendo que renderice todo el contenido del JSON a través de una propiedad llamada `req.body`, y para que la petición no se quede estancada imprimimos un mensaje que confirma que la información fue recibida por el servidor.

![[postManHeaders.png]]

A través de la key `Content-Type` definimos el tipo de contenido que vamos a enviar a través de la petición *POST*, y a través de la casilla `Value` definimos `application/json` para darle a entender al servidor que vamos a enviar un archivo en formato *JSON*.

Para enviar la información, nos vamos a la opción `Body` y definimos el *JSON* que queremos enviar. Posteriormente, si ejecutamos la petición veremos el mensaje por consola que indica que la información se recibió correctamente, y si miramos la consola de nuestro VSCode notaremos que la información del *JSON* que enviamos a través de Postman se encuentra allí.

![[postmanBody.png]]

Si estuviéramos trabajando con una base de datos, estas peticiones tendrían que crear una inserción dentro de la base de datos. Sin embargo, como estamos trabajando con un archivo *JSON* para simular el proceso, vamos a crear un objeto nuevo que almacene los datos correspondientes.

Como podemos notar, los datos se encuentran almacenados dentro de `req.body`, por lo que podemos crear constantes que almacenen cada uno de los valores que estamos recibiendo.

```js
const {name,Director,Cast} = req.body;
```

Para validar que si están llegando todos los tipos de datos basta con hacer una comprobación del tipo if, de la siguiente forma:

```js
router.post("/",(req,res)=>{
    const {name,Director,Cast} = req.body;
    if(name&&Director&&Cast){
        res.json("saved");
    } else{
        res.send("Wrong Request");
    }
});
```

Ahora, si te diriges a postman e intentas quitar alguna de estas 4 claves para luego mandar una petición, el servidor te responderá con un mensaje tipo `Wrong Request`.

En vez de enviar un mensaje `saved` cuando la validación es correcta, trataremos de guardar la información en el archivo *JSON* que tenemos. Para esto, debemos crear un objeto que almacene los datos de `req.body` de la siguiente manera:

```js
router.post("/",(req,res)=>{
    const {name,Director,Cast} = req.body;
    if(name&&Director&&Cast){
    // Asignamos una ID automáticamente basándonos en el numero de objetos que tenemos.
        const id = movies.length+1;

// Creamos el objeto que tiene el contenido del JSON que mandamos por PostMan
        const newMovie = {id,...req.body};
// Enviamos los elementos al JSON que ya tenemos
        movies.push(newMovie);
// Mostramos la lista de Películas actualizada.
        res.json(movies);
    } else{
        res.send("Wrong Request");
    }
});
```

> Recuerda que hasta este punto y por medio de esta simulación, solo estamos alterando el contenido del archivo en memoria, mas no estamos alterando el contenido del archivo original. Al momento en el que apaguemos el servidor, esta información agregada se perderá, a no ser que alteremos el archivo JSON de alguna forma.

**TODO: Seguir con el video en el minuto 56:11. Petición DELETE**
# Referencias
- [Tu primer REST API usando Node.js - Fazt Code](https://www.youtube.com/watch?v=bK3AJfs7qNY)