Parte del [[Refuerzo de JavaScript]].

Es una función que nos permite traer los datos alojados en una API.
## Con Promises
Para traer los datos de una API, primero tenemos que definir la URL de donde se van a extraer los datos, luego procederemos a usar una función nativa de JavaScript llamada `fetch`.

### Sintaxis de las Promises
Los promises son objetos que van a estar disponible a futuro, o no. 

Estos se manejan por medio de una serie de pasos que se representan con la sintaxis `then` y se pueden leer de la siguiente forma:

```js
const url = 'https://mydirection.com'

// Quiero traer los datos de esta url
fetch (url)
	// Entonces, pediré que se pase una respuesta
	.then((response)=>{
		// Con esta linea de código aparecerán todas las propiedades de la llamada a los datos de la API
		console.log(response)
	})

```

> En este ejemplo, utilizamos promises por medio de los pasos `.then` porque no podemos saber si vamos a obtener los datos de la URL o no.


### Retornando valores en formato JSON
En una API, podemos declarar como queremos que se retorne una información. Podemos retornarla como un `.txt` o como un `.json` gracias a la siguiente sintaxis:


```js
const url = 'https://mydirection.com'

fetch (url)
	.then((response)=>{
		return response.json()
	})
	.then (data =>{
	console.log(data)
	})
```

### Capturando un error

Para *capturar un error* al momento de que la información no se haya podido recibir correctamente, podemos usar la siguiente sintaxis:

```js
const url = 'https://mydirection.com'

fetch (url)
	.then((response)=>{
		if(response.ok){
			return response.json()
		}
		throw new Error ('Hubo un Error');
	})
	.then (data =>{
	console.log(data)
	})
	.catch (error =>{
		console.log(error.message)
	})
```


## Con Async/Await

Traer los datos de una API con un Async/Await sigue una estructura muy similar a la de las promises, sin embargo tiene que hacerse por medio de una declaración de variables, como en la siguiente sintaxis.

```js
const url = 'https://mydirection.com'

fetch (url)
	.then((response)=>{
		if(response.ok){
			return response.json()
		}
		throw new Error ('Hubo un Error');
	})
	.then (data =>{
	console.log(data)
	})
	.catch (error =>{
		console.log(error.message)
	})

const consultarAPI = async () => {
	const response = await fetch(url)
	const data = await response.json()
	console.log(data);
}

consultarAPI();
```

> En este código, somos conscientes de que traer muchos datos puede ser un proceso lento, por lo que le decimos al intérprete que traiga los cambios mientras el código se ejecuta, y luego, cuando los datos estén disponibles, los traiga.


Sin embargo, cuando estamos haciendo uso de un Async/Await no podemos controlar un error de la misma manera con la que controlábamos un error con `promises`. Es por esto que hacemos uso de un `try/catch`.

```js
...
const consultarAPI = async () => {
	try{
		const response = await fetch(url)
		if(!response.ok){
			throw new Error('Hubo un Error')
		}
		const data = await response.json()
		console.log(data);
	} catch (error) {
		console.log(error.message)
	}
}
```


***Traer los datos de una API con Promises sigue un proceso en el que se completan una serie de pasos para luego tener los datos, mientras que hacer el proceso por medio de Async/Await hace que primero pase por un paso y luego verifique si los datos se mandaron correctamente, para luego ir al siguiente paso y repetir***