Ahora necesitamos solucionar la parte técnica sobre los problemas de prop drilling (Explicados de manera teórica en el documento sobre [[Qué es Prop Drilling]]) dentro de nuestras aplicaciones. Como sabemos, el problema reside en que entre tantas referencias y parámetros que se pasan dentro de nuestra aplicación, podemos confundirnos en saber cuál es el componente padre que ha enviado esos parámetros originalmente.

Para solucionar el problema del prop drilling, podemos usar el hook de `contextAPI`

## Context API

Este hook que nos proporciona react crea un punto de encuentro dentro de la aplicación al cual se le llama contexto. Gracias a el, podemos pasar parámetros a través de los componentes sin tener que abordar múltiples componentes para llegar a un resultado final.

Debido a que ya no estamos hablando de componentes, su estructura de creación se basa en crear una carpeta aparte, dentro de la carpeta `src`, con el nombre de `context`.

Para utilizar el hook de contextAPI de forma correcta, debemos seguir 3 pasos.

1. Crear el contexto
2. Compartir lo que queremos dentro del contexto.
3. Consumir las cosas que se encuentran dentro del contexto (normalmente funciones o variables).

### Creando el contexto y compartiendo lo que queremos:

Aquí hay un ejemplo de implementación para crear un contexto usando el hook de ContextAPI y agregándole cosas para compartir a través del mismo.

```jsx
import { createContext } from "react";

// Paso 1: creamos el contexto
export const globalContext = createContext();


// Paso 2: Creamos un componente para pasar cosas a través del contexto
const GlobalContextProvider = ({children})=>{
	const [searchText, setSearchText] = useState("");
	return (
		<globalContext.Provider value = {{searchText,setSearchText}}>
			{children}
		</globalContext.Provider>
	)
}

export default GlobalContextProvider
```

### Consumiendo las cosas que se encuentran dentro del contexto

Dentro de nuestro componente padre, debemos llamar al proveedor del contexto y encerrar a los componentes que vamos a llamar usando el useContext(), de la siguiente manera:

#### Ejemplo:

`app.jsx`

```jsx
function App() {
return (
	<>
		<GradientBackground>
		<GlobalContextProvider>
		<GlobalStyles />
		<AppContainer>
		<Header />
		<MainContainer>
		<SideBar />
		<GalleryContent>
		<Banner/>
		<Gallery />
		</GalleryContent>
		</MainContainer>
		</AppContainer>
		<ModalZoom />
		</GlobalContextProvider>
		</GradientBackground>
</>
);
}
```

Y dentro del componente en el que queramos utilizar el contexto, simplemente aplicamos destructuring a los valores que necesitamos:

`componente.jsx`

```jsx
const context = useContext(globalContext);

const {
searchText,
} = context;
```