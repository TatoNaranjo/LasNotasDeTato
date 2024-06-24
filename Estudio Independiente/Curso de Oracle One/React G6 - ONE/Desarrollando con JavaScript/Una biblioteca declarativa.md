## Inspeccionar los elementos

Muchas veces, la labor de un desarrollador Front-End no se basa en diseñar, sino en recibir un diseño y adaptarlo a una página web. Por lo tanto, en nuestro trabajo de desarrolladores Front-End, lo único que debemos de saber si o si, es como interpretar aquellos gráficos que se nos pasan para poder convertirlos a una página web o una aplicación.

## ¿Qué es react?

Es una biblioteca de JavaScript para construir interfaces de usuarios, es decir, darle colores, formas, o mostrar ciertos elementos en pantalla. Es un lenguaje declarativo en el que diseñamos una vista simple para cada estado de la aplicación y react se encarga de actualizar y renderizar de manera eficiente los componentes correctos cuando los datos cambien.

Es un **lenguaje basado en componentes**, lo que significa que cada ítem dentro de la página puede ser un componente reutilizable en cualquier parte de la página. Un componente se basa en el hecho de crear un diseño al cual se le pasen datos para que sean representados en pantalla.

React es una biblioteca enfocada en el desarrollo web, sin embargo, los conceptos que se pueden aprender con este lenguaje sirven para ser implementados en otra tecnología llamada **React Native**, la cual sirve para desarrollar aplicaciones web.

Para aprender como funciona react, se recomienda visitar este [Playground](https://es.react.dev/learn) dentro de su página oficial.

## Creando nuestra primera aplicación

Para crear nuestra primera aplicación de react, debemos escoger un directorio en el cual almacenaremos nuestros datos. Debemos tener instalado [Node.JS](https://nodejs.org/en), y desde la terminal debemos escribir el siguiente comando:

```bash
npx create-react-app [nombre del proyecto]
```

Posteriormente, cuando todos los paquetes correspondientes se instalen, puedes acceder a la carpeta con `cd [nombre del proyecto]` e iniciar el proyecto con `npm start`.

### Comprendiendo el directorio

Dentro del directorio `src/app.js` se encontrará el núcleo de nuestra aplicación y por lo tanto lo primero que veremos al iniciar el proyecto, sin embargo... si nuestro navegador se encarga de renderizar un HTML, ¿en donde está el nuestro?.  Dentro de la carpeta `public` se encuentra el archivo `index.html` con sus configuraciones iniciales. 

Dentro del archivo `ìndex.html` se encuentra un contenedor div que contiene el id `root`. Cuando nosotros ejecutamos el comando `npm start`, node se encarga de renderizar en tiempo real todo lo que se encuentre dentro de la carpeta `src`.