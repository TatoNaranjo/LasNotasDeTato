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

## Qué es el Destructuring?
Antes para acceder al valor de una clave en un objeto teníamos que hacer lo siguiente:

```js
const nombre = producto.nombre
```

Sin embargo, desde la versión ES6 de JavaScript, se agregó un concepto llamado *destructuring*, que permite extraer una variable y generarla en una sola línea de código. Esta es la forma moderna de JavaScript para extraer un valor, y nos permite ahorrarnos varias líneas de código al extraer muchas variables.

```js
const {nombre, precio,disponible} = producto
```