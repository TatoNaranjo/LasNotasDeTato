---
date: 2024-02-05
tags:
  - CSharp
  - Back-End
  - Diseño
---

El tipo de Software que construiremos en la materia de [[Ingeniería de Software I]].

ASP.NET es un framework que es utilizado a la hora de construir aplicaciones de software enfocadas a la web con C#, el cual es un lenguaje de programación multiparadigma. Esto quiere decir que dicha herramienta para construir software se puede adaptar a diferentes arquitecturas como un Modelo Vista Controlador, una arquitectura de Web Services... Etc. C# es un lenguaje basado en clases, lo que quiere decir que cada acción que desarrollemos va a estar estructurada dentro de un objeto que podremos llamar cuantas veces necesitemos.

Normalmente, todos los sistemas que solían hacer uso de .NET usaron este framework hasta la versión 4.8. Actualmente, esta se considera una versión vieja debido a que existe .NET Core, que empezó desde su versión .NET Core 3 y actualmente va en la versión .NET Core 5. Si nos preguntamos la razón por la cual se utiliza este framework hoy en día, podemos decir que algunas de sus características más útiles son su sistema de ruteo para clasificar los permisos de un usuario, la capacidad de inyectar dependencias dentro del mismo framework y el hecho de que con cada actualización surgen mejoras dentro de su infraestructura; esto último te garantiza tener una aplicación que se puede mantener con el paso del tiempo por medio de mejoras automáticas en la seguridad.

En este semestre, vamos a estar haciendo referencia a el uso de este framework mediante una arquitectura de tipo MVC (Modelo Vista Controlador), que hace referencia a un proceso de transformación de los datos en el que la vista se separa de la parte lógica que se encarga de modificar a los mismos; desglosando las siglas de la arquitectura, podemos ver que cada parte hace referencia a:

- **Modelo:** Es la parte que contiene los datos de la aplicación.
- **Vista:** Es una plantilla que muestra un modelo (es decir, los datos de la aplicación)
- **Controlador:** Es aquel componente que se encarga de actualizar los modelos y pasar los datos a la vista.
## Tipos de Aplicaciones con .NET
### Razor Pages
En este tipo de aplicación, hay varios controladores que se encargan de una página a la vez. Así mismo es importante aclarar que todo lo que se puede hacer con el MVC, también se puede hacer con Razor.
### Web APIs
Es una aplicación que solo puede tener un único modelo y un único controlador. Es ampliamente utilizada cuando no se quiere tener una sola interfaz de usuario, sino, trasladar los datos a diferentes frameworks a la vez, independientemente de la plataforma
### gRPC
Es un framework que permite hacer llamadas de procedimiento remoto, esto quiere decir que establece una comunicación rápida entre diferentes aplicaciones, lo cual es muy conveniente cuando queremos utilizar microservicios.

## Cómo crear una App con .NET CLI?

>[!IMPORTANT] Cabe Aclarar que los comandos aquí establecidos son usados dentro de un ambiente con sistema operativo Windows.
>

Dentro de la terminal de la carpeta específica, lo primero que podemos hacer es listar todas las opciones que nos ofrece .NET para crear una aplicación. Esto podemos hacerlo mediante el comando:

```bash
dotnet new --list
```

Como nosotros queremos crear un proyecto que se conforme de una arquitectura tipo Modelo Vista Controlador, procedemos a ingresar el siguiente comando.

```bash
dotnet new mvc -o nombreDelProyecto
```

Luego, para ejecutar el proyecto mientras nos cercioramos de que se actualicen las vistas cada vez que hacemos un cambio, podemos utilizar el comando.

```bash
dotnet watch run
```

## Comprendiendo la estructura de las carpetas
### Controladores
Siempre es una buena práctica llamar a la página controladora con el sufijo `controller`. Por ejemplo, si nuestra página Home tiene un controlador, debemos llamarlo `HomeController.cs`. Además de tener como motivo el uso de buenas prácticas, esto se hace porque de esta forma, las clases pueden heredar la librería de C# `controller`.
### Vistas
Los archivos de aquí son una combinación entre HTML y C#, he de ahí que su nombre de extensión sea `.cshtml`.

Los cambios entre páginas se hacen gracias a una función llamada `@renderbody()`, que se encarga de mostrar un código de HTML que puede cambiar dependiendo de en qué página nos encontremos. Esta función se encuentra en la página layout y sirve para poner los componentes que queremos que se muestren en diferentes páginas. Debido a que la página `layout`es un recurso compartido, podemos encontrarla dentro de la carpeta `shared`.
### Ruteo
Es aquella herramienta que define cuál ruta se relaciona con una acción específica como oprimir un botón o redirigir a una página. Por defecto, es configurada en la clase `Program`, y administra una página y un controlador.

`TagHelper`es una herramienta bastante util que añade algunas funcionalidades útiles a las etiquetas de HTML.

## Pasar Información Del Control A La Vista
Para pasar información del control a la vista podemos utilizar un objeto llamado `viewBag`, sin embargo tiene un problema y es que no es un objeto fuertemente tipado (Es decir, no se casa con una sola variable).
### Objeto Fuertemente Tipado
Para hacer uso de un objeto fuertemente tipado, normalmente podemos poner `@model tipodeDato;`dentro del archivo de la página que se quiera poner (Ejemplo: `index.cshtml`). Así mismo, en la parte en la que queramos mostrar el cambio solamente escribimos `@model`.

## Explorando Razor
El sufijo `@`es una forma de cambiar entre código HTML y código de C#, un ejemplo de cómo podemos utilizar esto puede ser el ya mencionado `@model`.
### Vistas Parciales
Permiten organizar el código por partes, tal y como lo hacen por ejemplo, los componentes de React. Su estructura es la siguiente:

```cs
<partial name = "nombre"/>
```









