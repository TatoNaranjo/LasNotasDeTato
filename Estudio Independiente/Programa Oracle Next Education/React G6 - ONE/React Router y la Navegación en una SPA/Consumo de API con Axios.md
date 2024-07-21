Para consumir una API usando JavaScript podemos usar el método fetch, tal y como he estudiado en varias ocasiones como por ejemplo en: [[Consumo de APIs con JavaScript]]. Sin embargo, hay otra forma de consumirlas y es usando una librería llamada axios.

```table-of-contents
```


Por definiciones de estándar, para consumir una API en react debemos crear una nueva carpeta dentro de `src` llamada `api`. Allí es donde se realizará el intento de conexión por primera vez con un archivo que comúnmente llamaremos `api.js`. Se instala usando npm con el siguiente comando: `npm install axios`

### Obtener una URL

 Podemos obtener una URL usando Axios de la siguiente manera:

```javascript
import axios from "axios";
const api = axios.create({
	baseURL: "http://localhost:3000/",
})
```

También dentro del mismo archivo podemos crear y exportar una función que nos permita obtener los datos requeridos cuando le pasamos una URL por parámetros,, de la siguiente manera:

```javascript
export const search = async (url,setData) =>{
	const answer = await api.get(url)
	setData(answer.data)
}
```

Un ejemplo de como podemos obtener datos de un link definido usando un componente de React puede ser el siguiente:

***Componente Padre***

```javascript
// Pasamos el endpoint por parámetros
<ListPost url={'/posts'} />
```

***Componente que usa la API***

```javascript
import { useState, useEffect } from "react"
import { search } from "../../api/api"
import "../../assets/css/components/card.css"
const ListPosts = ({ url }) => {
	const [posts, setPosts] = useState([])
	useEffect(()=>{
		search(url,setPosts)
	},[url])
	return (
		<section className="posts containers"></section>
	)
}
export default ListPosts
```

### Controlar la ruta de los elementos individuales

Al momento de acceder a una ruta de un archivo como puede ser un post dentro de un blog, podemos tener una URL con endpoints como estos: `http://localhost:3001/posts/1`.

Como no es óptimo estar asignando rutas por cada endpoint, al momento de configurar el enrutamiento con react lo que podemos hacer es realizar una llamada por parámetros de la siguiente manera.

***En el componente enrutador***

```javascript
<Route path='/posts/:id' element={<Post/>}/>
```

De igual forma, dentro del componente (que en este caso sería `Post`), lo que hacemos es usar un hook de react llamado `setParams`, que retorna un objeto al que podemos aplicar destructuring para acceder a la ID del elemento al que queremos acceder.

***En el componente que accede al elemento ***

```javascript
import { useEffect, useState } from "react"
import { search } from "../../api/api"
import { useParams } from "react-router-dom"
import "../../assets/css/components/card.css"

const Post = ({url}) => {
	const [post,setPost] = useState({})
	const {id} = useParams()
	useEffect(()=>{
		search(`/posts/${id}`,setPost)
	})
	return(
		<main className = "container flex flex--center">
			<article className = "card post">
			<h2 className = "post-card__title">{post.title}</h2>
			<p className = "text__card">{post.body}</p>
			</article>
		</main>
	)
}
export default Post
```

#### En Caso de Que el Elemento Individual No Exista

En Caso de Que el Elemento Individual No Exista podemos utilizar un Hook de React Router DOM llamado `useNavigation` que redirige al usuario a una página en específico.

Ejemplo:

```javascript
import { useEffect, useState } from "react"
import { search } from "../../api/api"
import { useParams, useNavigation, useNavigate} from "react-router-dom"
import "../../assets/css/components/card.css"

const Post = ({url}) => {
	const [post,setPost] = useState({})
	const {id} = useParams()
	const navigate = useNavigate()
	useEffect(()=>{
		search(`/posts/${id}`,setPost).catch(()=>{
			navigate("/not-found")
		})
	})
}
```

#### Creando Categorías para los Elementos

En caso de que nuestro elemento tenga diferentes categorías, podemos crear un nuevo componente que nos muestre únicamente los elementos con las características definidas. Debes tener en cuenta de que puedes crear una nueva página-componente para mostrar las categorías filtradas. 

Sin embargo, para manejar el tema de las rutas debemos tener claro un concepto conocido como ***rutas anidadas***.