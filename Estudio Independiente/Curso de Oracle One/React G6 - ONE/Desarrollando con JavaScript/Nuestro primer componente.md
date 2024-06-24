Normalmente, cuando tenemos que agregar imágenes información a nuestra página lo hacemos insertando el contenido dentro de nuestro archivo `index.html`, sin embargo, esta vez toda la responsabilidad del desarrollo va a recaer en React. Esto significa que aunque podamos tener toda la información dentro de un archivo `.html`, ya no lo vamos a hacer porque precisamente, la intención de react es ayudarnos a dividir esa información en diferentes elementos llamados componentes para juntar todo y dejar que react lo renderice en un solo lugar.

## Creando el Componente

La estructura de carpetas que se debe seguir para crear un componente se basa en primero crear una carpeta llamada `components` dentro de la carpeta `src`, resultando en el directorio: `src/components`.

Normalmente, dentro de esta carpeta se recomienda crear una carpeta en específico para cada componente, debido a que podemos tener la necesidad de alojar diferentes archivos para crear el componente en específico. 

Para empezar a crear un componente podemos crear un archivo `.js` o `.jsx` dentro de la carpeta de nuestro componente.
### .jsx Vs .js

Dentro de la carpeta de nuestro componente, debemos crear un archivo con la extensión `.js`, debido a que react siempre va a esperar un archivo de tipo JavaScript. Sin embargo, ¿Cuál es la diferencia entre la extensión `.jsx` y la extensión `.js`?

`.jsx` es una sintaxis utilizada específicamente para representar componentes dentro de React. Podemos definir a esta extensión como una combinación entre `HTML` y `JavaScript`.

### ¿Cómo se estructura un componente?

Para trabajar con el archivo de un componente, debemos crear una función que retorne código  `html`.  Luego podemos exportar dicha función por defecto, haciendo referencia a que cuando se llame el archivo que contiene el componente, se llamará a la función que retorna el `html`.

Por ejemplo:

```js
// Archivo Header.js
function Header (){
return <img src='/img/header.png' alt = "Main Header"/>
}

export default Header
```

Luego, podemos importarlo en otros lugares de nuestra aplicación, así:

```js
//Archivo App.js

import logo from './logo.svg';
import './App.css';

//Importamos el Componente Header
import Header from './components/Header/Header';

function App() {
return (
<div className="App">
// Utilizamos el Componente Header
<Header />
</div>

);

}

  

export default App;
```