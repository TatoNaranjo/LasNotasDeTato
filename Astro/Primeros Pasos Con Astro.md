```table-of-contents
```

Para empezar, es necesario tener NodeJS para recurrir a su gestor de paquetes, node package manager (npm). Luego de eso podremos proceder a ejecutar el comando de creación del proyecto.


```shell
npm create astro@latest
```

Para ejecutar el Proyecto, tan solo es necesario el comando:

```shell
npm run dev
```


## Qué hay en un proyecto inicial?

El contenido del proyecto estará en la página `src`, y se dividirá en tres páginas principales.

`pages` : Es donde se encuentra el índice principal del proyecto.
`layout` : Representa la distribución gráfica de la página.
`components` : En donde se encuentran todas las partes que conforman a los componentes de la página.

> Un componente es una parte de la página que cumple una función específica y puede ser reutilizable. Se componen de HTML, CSS y JavaScript, que pueden ser desarrollados usando diferentes frameworks. 



Afuera de la carpeta `src` se encuentra también una carpeta llamada `public`, que servirá para guardar los recursos estáticos, es decir, imágenes o videos del proyecto.

## Entendiendo el Index.

En la parte superior del archivo nos encontraremos con una estructura parecida a esta:

```astro
---
En esta parte se puede ejecutar código JavaScript
	---
```

En esta parte podremos importar los diferentes componentes de nuestra página, así como también crear **props**. En general, para escribir código en JavaScript o TypeScript

>***Props** es la abreviatura de propiedades, y son una forma de pasar dichas propiedades de un componente padre a un componente hijo. Utilizadas generalmente en bibliotecas de JavaScript.*
>
>*Cuando se crea un **componente** en React, se pueden pasar datos a ese componente mediante props. Estas props son simplemente atributos que se añaden a la etiqueta del componente cuando se utiliza en otro componente.*


Inicialmente, vemos que tenemos un componente Layout ya inicializado, y generado en la página.
Mediante esto podemos ver como es que se genera todo el cuerpo de la página web, es decir, lo que la página va a renderizar. 

### Entendiendo El Layout

Sabiendo que un Layout es la estructura básica que debe tener nuestra página, podremos dejar en claro que con cada página creada hay que importar un layout.

#### Slots

Dentro de este componente se puede encontrar un fragmento de código como el siguiente:

```HTML
<slot/>
```

El componente slot, dentro del layout es aquello que se ve envuelto en el componente. Es decir, que si creamos una página, y añadimos contenido dentro de un Layout importado, toda la información se pasará al componente slot.

A su vez podemos asignarles un nombre y referenciarlos al momento de crear componentes, por lo que como su nombre lo indica, son huecos que nos indican en donde tiene que ir la información exactamente.

En el siguiente ejemplo, imagina que tenemos un componente de un botón:

```HTML
<!-- Componente botón -->
<a>
<slot name = "before" />
<slot/>
<slot name = "after" />
</a>
```

```HTML
	<Boton slot = "before"></Boton><!-- El contenido dentro de este componente se asigna al slot before -->
	<Boton></Boton> <!-- El contenido se asigna al slot del medio-->
		<Boton slot = "after"></Boton><!-- El contenido dentro de este componente se asigna al slot after -->

```

A su vez, si queremos dejar una información por defecto y no queremos pasar nada dentro de un slot, podemos hacer lo siguiente:

```HTML
<!-- Componente botón -->
<a>
<slot>Este es un Texto Por Defecto</slot>
</a>
```

```HTML

	<Boton></Boton> <!-- Como no hay nada dentro del componente, el mensaje por defecto es "Este es un Texto Por Defecto" -->
```

### Estilizar Páginas con CSS en un archivo .astro


Más abajo de nuestro archivo .[[Astro]] tendremos un fragmento de código de estilizado, que cabe resaltar, tiene **scope**.

> *El Scope es aquel fragmento de código estilizado que solo funciona para esa página, es decir que si por ejemplo, estilizamos un main y el proyecto tiene muchas etiquetas mains el estilizado se mantendrá únicamente para la página en cuestión.*

Si queremos que los estilos se apliquen en toda la página, omitiendo el scope, podemos agregar la siguiente directiva a la etiqueta:

```HTML
<style is:global><style/>
```

## Integraciones con Astro

Ejecutando el comando:

```shell
npm astro add --help
```

Podremos ver una lista de todas las herramientas que se pueden agregar a astro con solo un comando. 

## Markdown

Astro es compatible con los archivos markdown, por lo que se puede perfectamente crear una página web basada en el lenguaje de marcado. Al momento de querer usar un componente, se utiliza una herramienta llamada front matter, que funciona de manera similar a la estructura usada para escribir código en JavaScript de los archivos .astro.

```markdown
--
title: 'contenido de la pagina'
layout: '../layouts/layout.astro'
--
```

## 404 en Astro.

Astro tiene una página de 404 por defecto, pero si deseamos le podemos añadir nuestra propia página que maneje la excepción. Esto se hace simplemente creando un archivo en la carpeta pages con el nombre de `404.astro`.

## Transiciones entre páginas con ViewTransitions.

ViewTransitions es un componente de Astro que actualiza el contenido de una página web sin la animación y el cambio entre páginas que trae el navegador por defecto, lo cual permite una mejor UX, le añade dinamismo a la página y simula una estructura de Single Page Aplication aunque no lo sea. 

### Cómo se añade?

ViewTransitions se puede añadir a cualquier página, aunque lo recomendado sería añadirla en los Layouts. Para integrar el componente a la página, lo único que debemos hacer es importar el componente y añadirlo a la etiqueta head del sitio.

```html
---
import { ViewTransitions } from 'astro:transitions';
---
<html lang="en">
  <head>
    <title>My Homepage</title>
    <ViewTransitions />
  </head>
  <body>
    <h1>Welcome to my website!</h1>
  </body>
</html>

```


## Persistencia de Información

Si tenemos un componente interactivo, que queremos conservar entre un cambio de páginas, podemos solucionarlo fácilmente haciendo que el componente tenga una directiva llamada `transition:persist`.

```HTML

<header transition:persist>
```

