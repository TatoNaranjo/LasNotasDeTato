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

