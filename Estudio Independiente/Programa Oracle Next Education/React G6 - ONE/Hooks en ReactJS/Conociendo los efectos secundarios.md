---
date: 2024-07-02
tags:
  - React
  - JavaScript
---

## useEffect

Normalmente, el ciclo de vida de un componente se resume en su creación, su renderizado, un posible cambio dentro del mismo y la destrucción del componente. Cuando nosotros creamos cualquier tipo de lógica inicialmente dentro de un componente, esta lógica se ejecuta cuando el componente se está cargando todavía, y no cuando este se muestra totalmente en pantalla. Es por esto, que, si queremos seguir el ciclo de vida de los componentes de manera correcta podemos usar el hook de react llamado `useEffect`, el cual ejecuta nuestra lógica cuando el componente ya se encuentra cargado en su totalidad.

La estructura de un useEffect es la siguiente:

```jsx
useEffect(() => {

// Este primer ciclo hace referencia a lo que quere

return () => {

//Este segundo ciclo representa la destrucción del componente, es decir, lo que se va a ejecutar cuando se cierra el componente.

}

}, [{/*Este es un arreglo de dependencias que define si queremos que el código se ejecute para todos los cambios de estado y su creación, o para ciertos tipos de estado*/}])
```

Por ejemplo, en este caso en el que utilizo el useEffect, quiero imprimir un mensaje en pantalla cada vez que el estado galleryPhotos se modifique:

```jsx
useEffect(() => {
console.log("Gallery Photos State, Changed")
}, [galleryPhotos])
```


## Consumir una API con useEffect

A la hora de consumir una API usando el hook de `useEffect`, debemos de saber que el hook ya es asíncrono de por sí, entonces... el siguiente puede ser un ejemplo de como consumir una API y controlar lo que suceda con ella usando hooks.

```jsx

useEffect(()=>{

// Según el equipo de React, Si la función va a utilizarse solamente en el useEffect, es muy recomendable dejarla dentro del useEffect.

const getData = async () =>{
	const res = await fetch ('http://localhost:3000/photos');
	const data = await res.json();
	console.log(data)
	setGalleryPhotos([...data]);
}

	getData();
},[])
```
