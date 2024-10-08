---
date: 2024-07-02
tags:
  - React
---

Entre más cosas tengamos que compartir a través de los contextos de react, más complicado será administrar la gestión de los estados debido a que nuestra aplicación pasa a ser una aplicación compleja.

Por lo tanto, debemos encargarnos de analizar el contextAPI que estamos implementando y evaluar posibles mejoras que se puedan hacer utilizando un hook llamado `useReduce`.

Cuando trabajamos con `useReduce`, debemos tener la idea de que trabajaremos con un estado inicial, y que su lógica coincide mayormente con la de un `useState` pero que nos garantiza una mejor escalabilidad.

Un reducer es el encargado de definir las acciones que se van a ejecutar cuando se llamen los eventos. Consta de un estado inicial (que es aquel valor que toman los estados cuando se carga la aplicación), y un estado que se encarga de actualizar el valor cada vez que se llamen los eventos correspondientes.

#### Ejemplo:

```jsx
const initialState = {
	consulta: '',
	fotosDeGalería:[],
	fotoSeleccionada: null
}

const reducer = (state,action) =>{
	 // Con action.type sabemos a qué evento se llamó exactamente
	 switch(action.type){
	case `SET_CONSULTA`:
		// La información extra que llega desde el evento
		return {...state, consulta: action.payload};
	case `SET_FOTOS_DE_GALERIA`:
		return{...state, fotosDeGaleria: action.payload};
		
	// Si es una función, retornamos 
	case `SET_FOTO_SELECCIONADA`:
		return {...state, fotosDeGaleria.map(fotoDeGaleria =>{
		
		return {
		...fotoDeGaleria,
		favorita: fotoDeGaleria.id === foto.id ? !foto.galeria : fotoDeGaleria.favorita
		}
		})
		fotoSeleccionada:{
			...state.fotoSeleccionada, favorita:!fotoSeleccionada.favorita
		}
	default:
		return state;
	}
	
}

const [state, dispatch] = useReducer(reducer,initialState)
```