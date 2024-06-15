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