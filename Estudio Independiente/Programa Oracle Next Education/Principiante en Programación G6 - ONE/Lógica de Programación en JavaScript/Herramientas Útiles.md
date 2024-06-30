
```table-of-contents
```
#### **Nociones Básicas de la [[Lógica de Programación en JavaScript]]**

#### Recursos Útiles:
- [La documentación del Framework de JavaScript](https://developer.mozilla.org/es/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
- [Guía de JavaScript: qué es y cómo aprender el lenguaje más popular del mundo.](https://www.aluracursos.com/blog/guia-de-javascript)
#### Cómo puedo comentar el código?

``` JS
// Esto es un comentario
/*
Esto
Es
Un
Comentario
Múltiple
*/
```
#### ``alert``
- Para mostrar un mensaje al usuario por medio de una ventana emergente.
- **Anotación: Cuando un pop up aparece y estás usando live server, si el pop up se encuentra en pantalla al momento de actualizar, la página no guarda los cambios, tienes que cerrar el pop up**

``` JS
alert("Hello World");
```
#### ``prompt``
- Para pedirle un input al usuario por medio de una ventana emergente.
``` JS
prompt("¿Me indicas un número, por favor?");
```

#### `console.log` 
- Para mostrar mensajes en la consola del navegador.

``` JS
console.log("Hello World");
```

#### Template Strings
- Para usarlo, se utiliza la comilla invertida, y es un string que permite combinar caracteres con variables o código JavaScript

``` JS
 numeroUsuario = prompt("Escribe un número del 1 al 10 por favor");

console.log(numeroUsuario);

if (numeroUsuario == numeroSecreto) {
    alert(`Acertaste, es el numero ${numeroUsuario}`);
    
}
```

#### Operadores ternarios.
Una forma más rápida de hacer comprobaciones, se representa de la siguiente manera: 
Condición a cumplir?"Imprime lo que quieres imprimir si se cumple": "Si no, haces esto".

 ``` JS
        alert(`Te costó ${intentos} ${intentos!=1 ?' intento':'intentos'}`);
```


#### `Math.Random()`

Devuelve un numero que va entre 0 a 1, sin embargo si queremos generar un numero aleatorio en un rango, de 0 a un numero máximo, podemos hacer lo siguiente:

```JS
function randomNum (maximo){
    return Math.floor(Math.random()*max);
}
```

#### `typeof()`

Devuelve el nombre del tipo de la variable, se puede hacer de la siguiente forma:

```JS
console.log(typeof 42);
// Expected output: "number"

console.log(typeof 'palabra');
// Expected output: "string"

console.log(typeof true);
// Expected output: "boolean"

console.log(typeof undeclaredVariable);
// Expected output: "undefined"
```

#### ``toLowerCase();``

Permite convertir todas las palabras de un string a minúsculas.

```JS
let text = "Hello World!";  
let result = text.toLowerCase();
// Expected output: "hello world!"

```

#### ``toUpperCase();``

Permite convertir todas las palabras de un string a mayúsculas.

```JS
let text = "Hello World!";  
let result = text.toUpperCase();
// Expected output: "HELLO WORLD!"

```

#### `parseInt();`

Fuerza a una variable a ser de tipo entero.

```JS
parseInt(string, base);
```
