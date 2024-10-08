---
tags:
  - Redes
  - Aplicaciones
  - APIs
date: 2024-07-20
---

Ya conocemos el flujo tradicional de cómo funciona un modelo cliente-servidor cuando se trabajan con distintos datos, y sabemos que este cliente es ajeno a la plataforma que se utilice. Sin embargo, debemos de tener en cuenta de que cuando realizamos una petición como lo puede ser una petición `GET`, no siempre nos arrojará los datos dentro de un HTML debido a que hay múltiples formas de manejar y devolver esta información. 

Uno de estos formatos es el XML (Extended Markup Language), el cual se parece demasiado a HTML debido a que funciona con el mismo sistema de etiquetas.

```xml
<?xml version="1.0" encoding="UTF-8"?>  
- <note>  
  <to>Tove</to>  
  <from>Jani</from>  
  <heading>Reminder</heading>  
  <body>Don't forget me this weekend!</body>  
</note>
```


Otro formato que es muy utilizado es el formato JSON (JavaScript Object Notation), que es otra forma en la que podemos recibir la información y procesarla.

```json
1. {  
2.     "employee": {  
3.         "name":       "sonoo",   
4.         "salary":      56000,   
5.         "married":    true  
6.     }  
7. }
```

## ¿Qué es REST?

Cuando trabajamos con URLs podemos tener diferentes maneras de traer los datos mediante las peticiones hechas en las direcciones web, sin embargo debemos considerar el hecho de que las peticiones son independientes a la dirección. 

Por ejemplo, podemos tener esta URL para manejar un dato en específico:
`http://alurafood.com/api/foods`

Sin embargo, lo que vayamos a hacer con esta URL dependerá de qué método utilicemos, si utilizamos un método `GET`, traeremos todas las comidas que hayan, pero si utilizamos un método `POST` lo que haremos es crear una nueva comida.

De igual forma, si modificásemos ese link por:
`http://alurafood.com/api/foods/1`

Estaríamos trabajando con un único elemento, y lo que vayamos a hacer con el depende de la consulta. Si utilizamos el método `PUT` actualizaremos la comida que seleccionamos, mientras que si utilizamos el método `DELETE` estaríamos eliminando la comida seleccionada. 

***REST (REpresentational State Transfer)*** es una arquitectura que nos ayuda a trabajar nuestros servicios web de una forma eficaz y consta de tres partes:

- Recurso (URI)
- Operaciones (GET, POST, PUT, DELETE)
- Representación (JSON / XML / HTML)

## Tipos de datos

En algunos encabezados de **HTTP** debemos especificar algún formato. Los formatos los conocemos como **MIME TYPES**. En la definición de los encabezados podemos usar la siguiente estructura: **Tipo/Subtipo**.

Los tipos de datos que podemos usar son:

- Text
- Image
- Application
- Audio
- Video

Y los subtipos:

text -> text/plain, text/html, text/css, text/javascript

image -> image/gif, image/png, image/jpeg

audio -> audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav

video -> video/mp4

application -> application/xml, application/pdf

Puedes encontrar una lista más completa en el siguiente enlace: [MIME types (IANA media types)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

