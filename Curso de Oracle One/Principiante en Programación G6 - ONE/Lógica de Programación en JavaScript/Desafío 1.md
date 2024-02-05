
Desafio para desarrollar la [[Lógica de Programación en JavaScript]]

1. Muestra una alerta con el mensaje "¡Bienvenida y bievenido a nuestro sitio web!".
2. Declara una variable llamada nombre y asígnale el valor "Luna".
3. Crea una variable llamada `edad`y asígnale el valor 25.
4. Establece una variable numeroDeVentas y asígnale el valor 50.
5. Establece una variable saldoDisponible y asígnale el valor 1000.
6. Muestra una alerta con el texto "¡Error! Completa todos los campos".
7. Declara una variable llamada mensajeDeError y asígnale el valor "¡Error! Completa todos los campos". Ahora muestra una alerta con el valor de la variable mensajeDeError .
8. Utiliza un prompt para preguntar el nombre del usuario y almacénalo en la variable nombre .
9. Pide al usuario que ingrese su edad usando un prompt y almacénala en la variable `edad`.
10. Ahora, si la edad es mayor o igual a 18, muestra una alerta con el mensaje "¡Puedes obtener tu licencia de conducir!".

#### Resolución del Desafío.

1.Muestra una alerta con el mensaje "¡Bienvenido a nuestro sitio web!".

```js
alert('¡Bienvenido a nuestro sitio web!');
```

2.Declara una variable llamada nombre y asígnale el valor "Lua".

```js
let nombre = "Luna";
```

3.Crea una variable llamada edad y asígnale el valor 25.

```js
let edad = 25;
```

4.Define una variable numeroDeVentas y asígnale el valor 50.

```js
let numeroDeVentas = 50;
```

5.Define una variable saldoDisponible y asígnale el valor 1000.

```js
let saldoDisponible = 1000;
```

6.Muestra una alerta con el texto "¡Error! Completa todos los campos."

```js
alert('¡Error! Completa todos los campos');
```

7.Declara una variable llamada mensajeDeError y asígnale el valor "¡Error! Preencha todos los campos." Ahora muestra una alerta con el valor de la variable mensajeDeError.

```js
let mensajeDeError = '¡Error! Preencha todos los campos';
alert(mensajeDeError);
```

8.Utiliza un prompt para preguntar el nombre del usuario y almacénalo en la variable nombre.

```js
let nombre = prompt('¿Cuál es tu nombre?');
```

9.Pide al usuario que ingrese su edad usando un prompt y almacénala en la variable edad.

```js
let edad = prompt('¿Cuál es tu edad?');
```

10.Ahora, si la edad es mayor o igual a 18, muestra una alerta con el mensaje "¡Puede obtener su licencia de conducir!".

```js
let edad = prompt('¿Cuál es tu edad?');
if (edad >= 18) {
    alert('¡Puede obtener su licencia de conducir!');
}
```