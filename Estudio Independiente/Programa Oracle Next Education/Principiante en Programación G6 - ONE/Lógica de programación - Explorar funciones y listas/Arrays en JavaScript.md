---
date: 2024-07-20
---

Una parte importante del curso de [[Lógica de programación - Explorar funciones y Listas]]
# Array

El objeto **`Array`** de JavaScript es un objeto global que es usado en la construcción de _arrays_, que son objetos tipo lista de alto nivel.

## [Descripción](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array#descripci%C3%B3n)

Los _arrays_ son objetos similares a una lista cuyo prototipo proporciona métodos para efectuar operaciones de recorrido y de mutación. Tanto la longitud como el tipo de los elementos de un _array_ son variables. Dado que la longitud de un _array_ puede cambiar en cualquier momento, y los datos se pueden almacenar en ubicaciones no contiguas, no hay garantía de que los _arrays_ de JavaScript sean densos; esto depende de cómo el programador elija usarlos. En general estas características son cómodas, pero si, en su caso particular, no resultan deseables, puede considerar el uso de _arrays_ con tipo.

### [Operaciones habituales](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array#operaciones_habituales)

#### Crear un Array

JSCopy to Clipboard

```
let frutas = ["Manzana", "Banana"];

console.log(frutas.length);
// 2
```

#### Acceder a un elemento de Array mediante su índice

JSCopy to Clipboard

```
let primero = frutas[0];
// Manzana

let ultimo = frutas[frutas.length - 1];
// Banana
```

#### Recorrer un Array

JSCopy to Clipboard

```
frutas.forEach(function (elemento, indice, array) {
  console.log(elemento, indice);
});
// Manzana 0
// Banana 1
```

#### Añadir un elemento al final de un Array

JSCopy to Clipboard

```
let nuevaLongitud = frutas.push("Naranja"); // Añade "Naranja" al final
// ["Manzana", "Banana", "Naranja"]
```

#### Eliminar el último elemento de un Array

JSCopy to Clipboard

```
let ultimo = frutas.pop(); // Elimina "Naranja" del final
// ["Manzana", "Banana"]
```

#### Añadir un elemento al principio de un Array

JSCopy to Clipboard

```
let nuevaLongitud = frutas.unshift("Fresa"); // Añade "Fresa" al inicio
// ["Fresa" ,"Manzana", "Banana"]
```

#### Eliminar el primer elemento de un Array

JSCopy to Clipboard

```
let primero = frutas.shift(); // Elimina "Fresa" del inicio
// ["Manzana", "Banana"]
```

#### Encontrar el índice de un elemento del Array

JSCopy to Clipboard

```
frutas.push("Fresa");
// ["Manzana", "Banana", "Fresa"]

let pos = frutas.indexOf("Banana"); // (pos) es la posición para abreviar
// 1
```

#### Eliminar un único elemento mediante su posición

[Ejemplo:](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array#ejemplo)

Eliminamos "Banana" del _array_ pasándole dos parámetros: la posición del primer elemento que se elimina y el número de elementos que queremos eliminar. De esta forma, `.splice(pos, 1)` empieza en la posición que nos indica el valor de la variable `pos` y elimina 1 elemento. En este caso, como `pos` vale 1, elimina un elemento comenzando en la posición 1 del _array,_ es decir "Banana".

JSCopy to Clipboard

```
let elementoEliminado = frutas.splice(pos, 1);
// ["Manzana", "Fresa"]
```

#### Eliminar varios elementos a partir de una posición

[Nota:](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array#nota)

Con `.splice()` no solo se puede eliminar elementos del array, si no que también podemos extraerlos guardándolo en un nuevo array. ¡Ojo! que al hacer esto estaríamos modificando el array de origen.

JSCopy to Clipboard

```
let vegetales = ["Repollo", "Nabo", "Rábano", "Zanahoria"];
console.log(vegetales);
// ["Repollo", "Nabo", "Rábano", "Zanahoria"]

let pos = 1,
  numElementos = 2;

let elementosEliminados = vegetales.splice(pos, numElementos);
// ["Nabo", "Rábano"] ==> Lo que se ha guardado en "elementosEliminados"

console.log(vegetales);
// ["Repollo", "Zanahoria"] ==> Lo que actualmente tiene "vegetales"
```

#### Copiar un Array

JSCopy to Clipboard

```
let copiaArray = vegetales.slice();
// ["Repollo", "Zanahoria"]; ==> Copiado en "copiaArray"
```

### [Acceso a elementos de un array](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array#acceso_a_elementos_de_un_array)

Los índices de los _arrays_ de JavaScript comienzan en cero, es decir, el índice del primer elemento de un _array_ es `0`, y el del último elemento es igual al valor de la propiedad `length` del _array_ restándole 1.

Si se utiliza un número de índice no válido, se obtendrá `undefined`.

JSCopy to Clipboard

```
let arr = [
  "este es el primer elemento",
  "este es el segundo elemento",
  "este es el último elemento",
];
console.log(arr[0]); // escribe en consola 'este es el primer elemento'
console.log(arr[1]); // escribe en consola 'este es el segundo elemento'
console.log(arr[arr.length - 1]); // escribe en consola 'este es el último elemento'
```