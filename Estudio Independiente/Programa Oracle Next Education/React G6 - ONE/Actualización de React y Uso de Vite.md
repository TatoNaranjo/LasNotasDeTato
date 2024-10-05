 Normalmente cuando creamos aplicaciones en React, solíamos usar `npm create-react-app`, pero actualmente la documentación de React cambió. Con estos cambios, ahora también recomiendan crear una aplicación de react junto con un framework como Next.js o Gatsby. Sin embargo... ¿Qué pasa si yo no quiero usar un framework?.
## La Diferencia entre CRA y Vite

Cuando tenemos una aplicación de React creada con `create-react-app`, debemos de tener en cuenta que tenemos un lienzo con todas las herramientas que ofrece React. Como la librería suele tener bastantes herramientas, el proceso de carga puede ser lento en algunas ocasiones. **Vite** es precisamente una forma de crear una aplicación en React pero que no carga todos los aspectos de React sino los más importantes, y por lo tanto nos ahorramos bastante tiempo y optimizamos la aplicación incluso desde el momento en el que la estamos creando.

### Crear un proyecto con Vite

Podemos crear un proyecto con Vite usando diferentes gestores de paquetes como npm o yarn.
#### NPM
`npm create vite`
#### Yarn
`yarn create vite`

Acto seguido debemos asignarle un nombre a nuestro proyecto para pasar a escoger una plantilla predefinida y una variante de Vite. Cuando nos referimos a plantilla predefinida estamos determinando qué librería vamos a usar en nuestro proyecto (llámese `React`, `Vue`, `Preact,` `Lit`, `Svelte` u otras), y cuando nos referimos a una variante estamos hablando de si vamos a usar `JavaScript` o `TypeScript`.

Para ejecutar la aplicación creando un servidor de forma local, podemos escribir los siguientes comandos:
#### NPM
`npm run dev`
#### Yarn
`yarn run dev`