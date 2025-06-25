---
date: 2024-07-26
---

Parte del curso de [[Lógica de programación - Explorar funciones y Listas]].

```table-of-contents
```

JavaScript es un lenguaje interpretado, y el navegador actúa como un intérprete, para lo cual hacemos uso del DOM.
##### DOM
- Document
- Object
- Model

#### Selectores

Es la forma con la que JavaScript selecciona una etiqueta en el documento HTML.

##### `document.QuerySelector('selector')`

Nos permite seleccionar cualquier elemento del DOM en HTML.

```JS
let titulo = document.querySelector('h1');
```

##### `.innerHTML` 

Permite insertar cualquier elemento de JavaScript a el DOM de HTML.

```JS
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Hola Mundo';
```

##### `document.getElementById`

Nos permite seleccionar un elemento que tiene un id ya establecido.

```HTML
<button onclick="verificarIntento();" id = "intento" class="container__boton">Intentar</button>
```

```JS
let numeroUsuario = document.getElementById('intento');
```

Si queremos capturar el valor del elemento podemos hacer lo siguiente:

```JS
let numeroUsuario = document.getElementById('intento').value;
```