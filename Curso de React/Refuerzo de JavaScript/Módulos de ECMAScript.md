Parte del [[Refuerzo de JavaScript]]

Es una característica que llegó con JavaScript ES6, que es muy utilizada cuando vamos a instalar dependencias en algún proyecto.

A la hora de crear muchas funciones, teníamos que crear varios archivos de JavaScript diferentes para separarlas, pero esa labor podía hacer que nos llenásemos de muchos archivos. Sin embargo, esta problemática ha sido solucionada gracias a los módulos de ES6. 

```js
//Archivo Funciones
export function sumar (n1,n2){
	return n1+n2;
}
```

Esta sintaxis para declarar la función nos permite poder importar esa función en otros archivos de la siguiente forma

```js
//Archivo Nuevo
import {sumar} from './funciones.js'

const suma = sumar(20,30);
console.log(suma);
```

> Utilizando esta sintaxis de importación, debes nombrar a las variables que creas con el mismo nombre de la función original.

Para evitar el desbordamiento de nombres y evitar una confusión con nombres similares al aplicar el destructuring, puedes asignarle un nuevo nombre a la variable de la siguiente manera

```js
import {sumar as metodoSumar} from './funciones.js'
```

## Export Default en Modules
Es una forma diferente de enviar funciones a través de archivos de JavaScript, su característica radica en que solo es puede hacer un `export default` por archivo, sin embargo lo puedes nombrar como tu desees