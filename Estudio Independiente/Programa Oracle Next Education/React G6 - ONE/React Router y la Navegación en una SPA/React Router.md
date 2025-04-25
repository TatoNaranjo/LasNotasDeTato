---
date: 2024-07-20
---

Al momento de acceder a una página nosotros estamos posicionados sobre una URL específica. Si queremos controlar en qué página estamos utilizando únicamente JavaScript, podemos hacerlo utilizando la función `window.location`. la finalidad de esto es controlar lo que nos aparece en función de las interacciones que vayamos haciendo en pantalla como presionar un botón y que nos redirija a una ruta nueva.

Sin embargo, entre más rutas se vayan haciendo, la labor de controlar cada una de las rutas usando JavaScript Vanilla se hace cada vez más difícil, es por esto que llega React Router como una solución ofrecida por React.

### React Router DOM

Es una de las librerías más usadas y dicho por muchas personas, la mejor para trabajar con rutas en JavaScript usando React. Podemos instalar este paquete usando npm mediante el comando `npm i react react-router-dom`. Debemos ser conscientes de qué versión de esta librería estamos usando debido a que hay diferentes documentaciones entre versiones.


#### ¿Cómo Usarlo?
La forma de usar esta librería es importarla dentro de nuestro componente padre absoluto, que en todos los proyectos de react siempre será `App.js`.  Primero, debemos asignarlo como el componente que se va a retornar en el archivo y que va a estar encargándose de gestionar todo el sistema de rutas mediante la herramienta `BrowserRouter`. Luego, para saber qué rutas tiene que vigilar `BrowserRouter`  también vamos a importar una función llamada `Routes`, de la siguiente manera:

```javascript
import Home from './pages/Home';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
function App() {
	return (
		<Router>
			<Routes>
			{// Path Indica la ruta a la que debemos acceder para ver el componente element
			}
				
				<Route path="/" element={<Home/>}/>
				// Entonces... la dirección para esta ruta será:http://localhost:3000/sobre
				<Route path="/sobre" element={<Sobre/>}/>
			</Routes>
		</Router>
	);
}
```

> Esto puede ser útil para controlar los accesos a las páginas para diferentes usuarios, o para controlar aquellas rutas que no existan con una página de 404.

La ruta comodín es aquella que se asigna a las direcciones que no existen, normalmente se pone en el último lugar de las asignaciones de rutas. Un ejemplo de una ruta comodín puede ser el siguiente:

```javascript
<Route path = "*" element = {<h1>No Existe </h1>}/>
```

Sin embargo, debemos de tener en cuenta de que en este punto si utilizamos las etiquetas de `html: <a></a>` para realizar las redirecciones, nuestra aplicación sigue siendo una Multiple Page Application debido a que redirecciona a las páginas y recarga la información cada que se hace una nueva consulta. Puedes consultarlo si inspeccionas la página y la recargas mientras miras en el apartado de `network` de tu inspeccionador de elementos del navegador.

### Componente Link

Para convertir nuestra aplicación en una SPA, es necesario cambiar el uso de las etiquetas de redirección que usamos en html, por un componente de React Router llamado `Link`. Este componente funciona con los mismos atributos que la etiqueta `a`, excepto por el hecho de que ya no redireccionamos con la palabra `href`, sino con la palabra `to`.

Ejemplo:

```jsx
<li><Link className="menu-item" to="/">Blog</Link></li>
```