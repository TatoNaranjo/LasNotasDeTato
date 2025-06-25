---
date: 2024-05-12
tags:
  - APIs
  - Aplicaciones
  - DesarrolloDeSoftware
  - Redes
  - Back-End
---

Entendiendo el concepto y como funciona una [[Rest API]]

Para entender como funciona primero tenemos que partir del concepto de una  *aplicación tipo Servidor/Cliente*.

# ¿Para qué podríamos utilizar una REST API?

Supongamos que tenemos un servidor escrito con un lenguaje de programación x. La única cosa que está haciendo nuestro servidor es escuchar las peticiones de un cliente.

Imaginemos el ejemplo de tener una página web que consiste en una tienda virtual a la que una persona entra. Cuando una persona desea entrar a nuestra página a traves de su navegador hace que el mismo cree una petición a un servidor, que interpreta la petición y suele devolver una respuesta. El servidor por lo suele devolver archivos de tipo HTML, CSS y JavaScript para que el navegador tome los archivos y empiece a crear el contenido en pantalla. Normalmente los datos no se guardan en un servidor sino en una base de datos.

Ahora, ya teniendo una aplicación web se supone que queremos crear la misma aplicación pero para teléfonos móviles, sin embargo nos encontraremos con un problema enorme y es que al momento de querer escalar una aplicación ya hecha, ya teníamos datos y operaciones almacenados en nuestra base de datos por lo que crear una base de datos nueva no es una opción. Lo que deberíamos hacer es buscar una forma de que la aplicación móvil tenga los datos que tenemos almacenados en el momento.

Para acceder a una interfaz que tenga un cierto tipo de información en una página web deberíamos crear algo conocido como *Rutas del Servidor*. Las rutas del servidor son aquella sintaxis que siguiendo el ejemplo de nuestra tienda se puede ver representada como `\products` o `\cart`, y que al momento de acceder a cada una de ellas se renderiza una interfaz con un tipo de información en concreto.

Sin embargo, el problema viene cuando tenemos una interfaz ya creada para nuestra aplicación móvil, que se desliga totalmente del diseño de la página web y solo deseamos obtener los datos de la base de datos sin recurrir a una *Ruta del Servidor*, y es ahí cuando necesitaremos crear una *REST API*. Una *REST API* es una tecnología que nos permite crear más rutas pero basadas en una *API*.

Una *API* es un software que permite comunicarse con otro software, y tiene la función de conectar a un servidor con una *aplicación tipo Servidor/Cliente* de tipo externa. Siguiendo con el ejemplo de crear una aplicación móvil, pasamos de crear una ruta tipo `\products` o `\cart`, a crear una ruta tipo `\api\products` o `\api\cart`, en donde lo que encontraremos ya no será una página renderizada, sino datos específicos que estarán muy posiblemente almacenados en un arreglo. Gracias a esto, la aplicación móvil puede visitar la ruta asignada y por medio del lenguaje de programación utilizado mostrar la información de los productos en su interfaz. O, si el cliente necesita comprar un producto, la aplicación crea una petición a la ruta del servidor tipo `\api` para poder aplicar otro tipo de operaciones.

# ¿Por qué se llama REST API?
La *REST API* es un conjunto de reglas que determinan la manera de diseñar las rutas de una *API*, y definen un conjunto de buenas prácticas que ayudan a mantener la aplicación a medida que va creciendo.

# Tipos de Peticiones
Las diferentes palabras que vamos a tener que usar si queremos realizar cualquier acción en un servidor: 

- Cuando deseamos obtener algún tipo de información utilizamos la palabra *GET*
- Cuando deseamos crear un tipo de información utilizamos la palabra *POST*
- Cuando deseamos actualizar el valor de la información utilizamos la palabra *PUT*
- Cuando deseamos eliminar algún tipo de valor de una API REST utilizamos la palabra *DELETE*.

Todas estas acciones se utilizan por medio de la integración por rutas, en donde cada palabra nos indica la acción que deseamos realizar y en qué tipo de dato.

- `/get/api/product`
- `/post/api/product`
- `/put/api/product`
- `/delete/api/product`

# Referencias
- [¿Que es una REST API? - Fazt Code](https://www.youtube.com/watch?v=bK3AJfs7qNY)


