---
date: 2024-07-20
tags:
  - JavaScript
---

## APIs y CRUD

El Término API es una abreviación de Application Programming Interface, y permite la comunicación entre un cliente y un servidor. Esto significa que para comunicar un cliente con un servidor, normalmente las solicitudes y las respuestas deben pasar a través de la API. Una API es esencial debido a que ayuda a comunicar a dos herramientas que no están escritas en el mismo lenguaje, estandarizando el proceso en el que se recibe la información.

> Una analogía muy utilizada para entender como funciona una API hace referencia al proceso que se sigue dentro de un restaurante. Imagina que tu (el cliente), decides ordenar un platillo para comer, pero para que lo que quieres pueda ser cocinado por el chef (el servidor) primero debe de pasar por un mesero (una API).
> 
   El mesero es el encargado de llevarle tu pedido al chef y a su misma vez devolverte el plato que solicitaste.

Cuando nosotros como clientes queremos modificar algún dato, lo hacemos mediante instrucciones como `GET`, `PUT`, `POST`, y `DELETE`. Sin embargo, no es preciso ni correcto enviar estas peticiones así como así. Por esto, es que la labor de una API es convertir estas solicitudes en peticiones HTTP que el servidor pueda entender, para que luego el servidor le devuelva una respuesta HTTP a la API y la misma devuelva los datos en el formato que se necesite, como HTML, XML o JSON.

## Utilizando una API en JavaScript

Un ***Endpoint*** es una dirección que vamos a tener para conectarnos a una API, siendo comúnmente denominada de la forma `/api/resource`.


Sabemos que para traer un tipo de información necesitaremos utilizar una URL, por lo tanto, para manejar una API en JavaScript lo primero que tenemos que hacer es crear una variable que nos permita alojar esa URL.

Además, necesitaremos usar una función nativa de JavaScript llamada `fetch`. Fetch va a recibir dos parámetros en donde uno de ellos siempre será una URL y el otro puede ser un objeto con la query de la petición.

Debemos de utilizar este segundo parámetro cuando no vayamos a hacer uso de un método `GET` por defecto.

La implementación del método fetch para obtener datos de una API en JavaScript se ilustra de la siguiente manera:

### Método GET

```javascript

const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5"

fetch (url,{
method:"POST",
})

// Si no necesitamos usar algún parámetro diferente a GET simplemente podemos pasar una solicitud de un solo parámetro: fetch(url).
```


### Método POST
Cuando hacemos uso de una API pero con un método `POST`, podemos escribir el siguiente código como se muestra en el ejemplo:

```javascript
async function createThing (title,description,url, image){
	const conexion = await fetch ("http://localhost:3001/videos",{
	//El método que utilizaremos en fetch
	method:"POST",
	//El encabezado/header que pasaremos con esa API
	headers:{"Content-type":"application/json"},
	body:JSON.stringify(
	{
		titulo:title,
		descripcion:description,
		url:url,
		imagen:image
	})
	})

	const conexionConvertida = conexion.json();

	return conexionConvertida;

}
```

El método fetch API nos devuelve una promise.

### Método DELETE

Al momento de utilizar el método `DELETE` para eliminar algún elemento de una lista de elementos, debemos tener en cuenta dos cosas:

- La primera es que la URL que utilizamos para acceder a un elemento en específico puede representarse de la siguiente manera `http://localhost:3000/productos/1`.

- La segunda, es que debemos hacer uso de un atributo en HTML que contenga el ID del producto en cuestión.

La forma en la que aprendí a utilizar el método `DELETE` fue la siguiente:

- Primero, al momento de traer todos los datos de una API mediante el método `GET`, debemos asignar un atributo a el contenedor principal, que nos permita traer el identificador del objeto, así como debemos agregar un botón que permita al usuario eliminar dicho elemento, posteriormente, dentro de la misma petición `GET` debemos tener asignar un `eventListener` que permita identificar cuando el usuario pulse el botón de eliminar para pasar el parámetro a una función:
  
  ```js
// En el Parámetro GET

bringProducts.forEach((product)=>{

const producto = `

<div class="card" data-product-id="${product.id}">
<div class="card-image"><img src = ${product.imagen} alt=${product.titulo} class="imagen"></div>
<div class="category"><p>${product.categoria}</p></div>
<div class="heading">${product.titulo}</div>
<div class="price">${product.precio} $</div>

<button class = "delete-button button" data-id = "${product.id}" ><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg></button>

</div>

`
card.innerHTML += producto;
})

const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button)=>{
button.addEventListener("click",handleDelete);
})

```

Posteriormente podemos crear una función que nos permita eliminar el elemento si es que existe. Primero, obtenemos el atributo del botón que pulsamos y que contiene el ID del producto a eliminar, luego accedemos a esa dirección y la guardamos en la variable `url`.  Luego, con un `try - catch` manejamos la solicitud de fetch. Si el producto se encuentra, entonces se selecciona el atributo que representa el elemento que encierra a todo el elemento para posteriormente eliminarlo. Si el producto no se encuentra, entonces imprimimos el mensaje de error.

```js
async function handleDelete(event){
const productID = event.target.getAttribute("data-id");
const url = `http://localhost:3000/productos/${productID}`;

try{
const response = await fetch(url,{
method: "DELETE"
})
if(response.ok){
const productElement = document.querySelector(`[data-product-id = "${productID}]`);
productElement.remove();
}
}

catch(error){

console.error("Error:",error);

}

}
```


## ¿Qué es una promise?

El término de promise en español se refiere a una promesa, la cual es una herramienta encargada de verificar si la solicitud se recibe de forma correcta para considerarla como resuelta, o de lo contrario, luego de un tiempo de no recibir nada de información rechazar la solicitud.

Aunque normalmente no vamos a construir promises sino simplemente hacer uso de ellas,es necesario comprender en qué consiste. Por lo tanto, la estructura de una promise se puede ejemplificar de la siguiente manera:

```javascript

	const solicitud = new Promise ((resolve,reject) =>{
		const response = "resolve"

		if(response == "resolve"){
		resolve("La Promesa se cumplió")
		}
		
		else {
			reject("la promesa no se cumplió")
		}
	})

	console.log(solicitud)
```

Como no queremos que nuestro programa deje de funcionar en caso de que una promise no pueda cumplirse, debemos aprender a manejar las promises por medio de dos métodos `.then()` y `.catch()`. Estos dos métodos se cubren dentro del documento [[Tratando las Promises]].

