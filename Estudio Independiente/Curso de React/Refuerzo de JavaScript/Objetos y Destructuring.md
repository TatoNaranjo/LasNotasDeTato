Parte del [[Refuerzo de JavaScript]]
```table-of-contents
```

## Definición
Un objeto es una colección de propiedades que tienen una clave y un valor. La sintaxis para generar un objeto en JavaScript es la siguiente:

```js
const producto = {
	//Clave : Valor
	nombre : "Tablet",
	precio : 300,
	disponible: false
}
```

Para formatear el objeto y mostrarlo como una tabla utilizamos la función `console.table(producto)`. Puede ser util para arreglos y objetos.
## Manipulación de Objetos

Para *modificar* el valor de un elemento, tan solo basta con tratarlo como si fuera una variable, de la siguiente forma/
```js
producto.nombre = "LG"
```

> Si utilizamos esta sintaxis con una propiedad que no existe, JavaScript la añadirá automáticamente.

Para *eliminar* una propiedad de un objeto, podemos hacer lo siguiente:

```js
delete producto.nombre
```

Si queremos que el objeto no pueda modificarse una vez creado, podemos utilizar el método `Object.freeze` de la siguiente manera.

```js
Object.freeze(producto)
```


Existe otra propiedad llamada `seal`, que si permite modificar los atributos existentes de un objeto, pero no eliminar propiedades o crear nuevas.

```js
Object.seal(producto)
```

## Qué es el Destructuring?
Antes para acceder al valor de una clave en un objeto teníamos que hacer lo siguiente:

```js
const nombre = producto.nombre
```

Sin embargo, desde la versión ES6 de JavaScript, se agregó un concepto llamado *destructuring*, que permite extraer una variable y generarla en una sola línea de código. Esta es la forma moderna de JavaScript para extraer un valor, y nos permite ahorrarnos varias líneas de código al extraer muchas variables.

```js
const {nombre, precio,disponible} = producto
```

## Destructuring de Dos o Más Objetos

Cuando tenemos un código que tiene dos o más objetos como el siguiente

```js
const producto = {
	//Clave : Valor
	nombre : "Tablet",
	precio : 300,
	disponible: false
}

const cliente = {
	nombre: "Santiago",
	premium: true
}
```

e intentamos hacer el siguiente destructuring, nos va a marcar un error debido a que se crea un conflicto:

```js
const {nombre} = producto;
const {nombre} = cliente;
```

Para solucionar esto, podemos cambiar el nombre que saldrá en el restructuring re-nombrándolo como uno nuevo de esta manera.

```js
const {nombre:nombreCliente} = cliente
```

## Unir 2 o Más Objetos

Supongamos que queremos crear un objeto y traer la información de otro, podemos hacerlo mediante algo conocido como el *spread operator*.

```js
const producto = {
	//Clave : Valor
	nombre : "Tablet",
	precio : 300,
	disponible: false
}

const carrito = {
	cantidad = 1;
	...producto // Spread Operator

}

```

Ahora, si quiero crear un objeto que contenga más objetos, puedo hacer la siguiente declaración:

```js
const producto = {
	//Clave : Valor
	nombre : "Tablet",
	precio : 300,
	disponible: false
}

const cliente = {
	nombre: "Santiago",
	premium: true
}

const nuevoObjeto = {
	producto: {...producto}
}
```


La línea `producto: {...producto}` nos indica que hay una clave dentro del nuevo objeto, que va a contener todas las propiedades de nuestro objeto `producto`.

## Destructuring de Arreglos
El destructuring de Arreglos funciona exactamente igual al destructuring de objetos, solo que su sintaxis cambia.

```js
const tecnologias = ['HTML','CSS','JavaScript'];

const [] = tecnologias;
```