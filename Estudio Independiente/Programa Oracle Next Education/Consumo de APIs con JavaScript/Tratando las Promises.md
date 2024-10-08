---
date: 2024-07-20
tags:
  - JavaScript
---

## Then Y Catch

Son dos métodos utilizados para manejar correctamente las respuestas dentro de una promise. El método `then` es utilizado cuando una solicitud dentro de una promise es resuelta y queremos que haga cierta acción, mientras que por el contrario, el método `catch` es utilizado cuando una solicitud dentro de una promise es rechazada y queremos que se tomen ciertas acciones al respecto.

```javascript

const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5"

fetch (url)
.then()
.catch()
```

### Then

Cuando la solicitud se resuelve correctamente, la información suele llegar en formato JSON. Por lo tanto, tenemos que almacenar estos datos dentro de un objeto que coincida con los parámetros que nos están llegando. Un ejemplo sobre la forma de recibir los datos de una API mediante el método then es el siguiente:

```javascript

const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5"

fetch(url)
.then (response => response.json())
	.then( datosImagenes =>{
		console.log(datosImagenes)

		const card = document.querySelector("[data-ul]")

		datosImagenes.forEach( elemento =>{
		const contenido = `<li class="card">
		<img class = "card_image" src=${elemento.url} alt = "alt"/>
		<h3 class = "card_title">${elemento.title}</h3>
		</li>
		`

		card.innerHTML = card.innerHTML + contenido
		
		
		})
	})
.catch(error => console.log(error))
```


## Async y Await

Lo primero que necesitamos pensar es que la función que vamos a crear para hacer la solicitud debe ser asíncrona porque esta acción de hacer la solicitud, esperar que se devuelva la promesa y saber si es rechazada o resuelta, lleva tiempo.

Necesitamos que nuestra función espere. Entonces, es una función asíncrona. Por eso, empezamos a escribirla utilizando la palabra reservada `async` y, luego, escribimos `function ejemplo()`. Como tenemos que esperar a que los datos sean recibidos para luego poder tratar con ellos colocamos la palabra reservada `await` antes de la función `fetch`.

```javascript

async function listaImagenes (){
	try {
		let traerImagen = await fetch (url)
		let datosImagenes = await fetchImagen.json()

		const card = document.querySelector("[data-ul]")

		datosImagenes.forEach( elemento =>{
		const contenido = `<li class="card">
		<img class = "card_image" src=${elemento.url} alt = "alt"/>
		<h3 class = "card_title">${elemento.title}</h3>
		</li>
		`

		card.innerHTML = card.innerHTML + contenido
	
	}

	catch(error){
		console.log(error)
	}

}
```

## Cosas a tener en cuenta

Cuando producimos código asíncrono utilizando .then, estamos haciendo uso de devoluciones de llamada dentro de ellos. El mayor problema con las devoluciones de llamada es que no están bien dimensionadas incluso para códigos asincrónicos moderadamente complejos, donde tenemos varios .then uno después del otro. El código resultante a menudo se vuelve difícil de leer, fácil de romper y difícil de depurar. A esto lo llamamos "callback hell".

Para resolver esto, se desarrolló otra forma de construir código asíncrono: el async/await, que funciona de manera similar al then, pero el código se ve más "limpio". Este "embellecimiento" en el código es lo que llamamos "syntax sugar".

En informática, el "syntax sugar" o "azúcar sintáctico" (en traducción literal) es la sintaxis dentro de un lenguaje de programación que se ha diseñado para que las cosas sean más fáciles de leer o expresar. Esto hace que el lenguaje sea "más dulce" para el uso humano: las cosas se pueden expresar de manera más clara, de manera más concisa o en un estilo alternativo que algunos pueden preferir.

A pesar de que el async/await es una opción más "legible" que el `.then()`, es importante destacar que no son lógicamente equivalentes: el async/await realiza el procesamiento de forma secuencial, mientras que las Promises con `.then()` se procesan en paralelo, lo que hace que este último método sea más rápido. El async/await simplifica la escritura y la interpretación del código, pero no es tan flexible y solo funciona con una Promise a la vez.