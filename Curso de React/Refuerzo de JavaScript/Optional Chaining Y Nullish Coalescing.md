Parte del [[Refuerzo de JavaScript]]

## Optional Chaining
Se define con el carácter `?` y permite acceder a las propiedades de un objeto o llamar a métodos de propiedades sin tener que verificar si existen o no.

```js
const alumno = {
	nombre: "Santiago",
	aprobado: true
}

console.log(alumno.examen.examen1);
console.log("Luego del Alumno")

```

> A la hora de ejecutar este código, no podríamos ver el mensaje `Luego del Alumno` debido a que tenemos un error en el primer `console.log` y la aplicación va a dejar de funcionar.

Utilizando el *Optional Chaining* de la siguiente manera, podemos decirle al programa que si existe dicho valor para una clave, lo muestre, de lo contrario no muestre más que un `undefined`, y así nuestro código funcionará sin errores

```js
console.log(alumno.examen?.examen1);
```
## Nullish Coalescing Operator
Se define con el carácter `??` y sirve para retornar el valor del lado derecho en la sintaxis en caso de que no exista el valor del lado izquierdo. El siguiente ejemplo lo muestra de forma más clara.

```js
const pagina = null ?? 1;
```

> Lo que hará este código es verificar si el valor tiene la variable es nulo, y si la condición se cumple, se le asignará el valor de 1.
