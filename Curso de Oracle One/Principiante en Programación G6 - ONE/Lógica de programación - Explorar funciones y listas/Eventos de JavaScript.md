
Incorporando la [[Lógica de programación - Explorar funciones y Listas]]
Cuando hablamos de acciones que puede realizar el usuario, también hablamos de acciones. 

Es decir que, cuando presiono una tecla, pulso un botón o muevo el cursor y me posiciono encima de un elemento, estoy realizando un evento.

El **Hoisting** es aquella mecanización que hace JavaScript para que todas nuestras funciones independientemente de donde estén situadas, se trasladen arriba de nuestro documento a la hora de interpretar el código para que se puedan ejecutar correctamente.

**Todos los eventos en JavaScript comienzan con el prefijo 'on'**

#### `onclick = 'funciónJS'`

Evento que funciona en la etiqueta `<button/>` y hace referencia a que cuando se pulse el elemento de la etiqueta, se ejecutará la función o el código de JavaScript, la cual puede o no, retornar un valor.

```JS

<button onclick="tuFunción();" class="container__boton">Intentar</button>

function tuFunción(){
//Ingresa el contenido aquí.
}
```

#### `.removeAttribute`

Evento que remueve un atributo de un elemento en HTML.

```HTML
<button class="container__boton" id="reiniciar" disabled>Nuevo juego</button>
```

```JS

document.getElementById('reiniciar').removeAttribute('disabled');
```

#### `.setAttribute`

Evento que añade un atributo a un elemento en HTML.

```HTML
<button class="container__boton" id="reiniciar" disabled>Nuevo juego</button>
```

```JS
document.getElementById('reiniciar').setAttribute('disabled',true);
```
