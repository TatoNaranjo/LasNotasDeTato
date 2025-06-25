---
date: 2024-07-24
---

## Props

Imagina que tenemos un componente en el que queremos pasar el input en formato texto de cualquier cosa, pero no queremos repetir las mismas lineas de código para no extender demasiado el archivo en cuestión. Como la labor de react es dividir el trabajo en componentes, hemos decidido crear un componente que contiene tanto el label como el input de nuestro formulario y se ve así:

```js
import "./TextInput.css"
function TextInput(){
	return(
		<div className="textInput">

		<label >
		Campo Texto
		</label>

		<input type="text" placeholder="Ingresa Tu Nombre"/>

		</div>

	)

}
export default TextInput
```

Si copiásemos y pegásemos el componente, siempre seguiría mostrándonos el texto de ingresa tu nombre... entonces... como hacemos para personalizar la información del componente según se requiera? Pues para eso podemos utilizar una herramienta de react que permite que el componente tenga sus propias características o propiedades... de ahí su nombre, `props`. Lo ideal cuando se trabaja con un componente es utilizar las props para sacar el mayor provecho a su re-utilización.

Podemos crear las propiedades de un componente teniendo en cuenta de que lo que pasamos a través de un componente es una función, y que las funciones pueden recibir y enviar parámetros.

Al momento de llamar al componente, podemos pasar el parámetro con el nombre que nosotros queramos.

```javascript
<TextInput title = "Nombre" placeholder="Ingresa tu nombre aquí"/>
```

Y dentro del componente, a la hora de pasar las propiedades las podemos usar con normalidad:

```javascript
import "./TextInput.css"
function TextInput(props){
	return(
		<div className="textInput">
		<label >
		{props.title}
		</label>
		<input type="text" placeholder={props.placeholder}/>
		</div>
	)
}
export default TextInput
```

> Podemos usar cualquier propiedad con cualquier valor, sin embargo hay que tener en cuenta de que no nos va a marcar ningún error en caso de escribirlo mal, así como tampoco nos va a aparecer en pantalla. Hay que tener cuidado con eso.


###  Como trabajar con un arreglo en React

Cuando tenemos que llenar un componente con múltiples opciones, como por ejemplo un input de tipo `select`, podemos hacer un arreglo de JavaScript y recorrer todos los elementos para renderizar los elementos de dicho arreglo. Para recorrer el arreglo vamos a utilizar la función `.map`, como en el siguiente ejemplo:

```js
import "./OptionList.css"

export default function OptionList(){
	const options = ["Programación", "Front-End", "Data Science", "Devops", "UX y Diseño", "Móvil", "Innovación y Gestión"];

return(
<div className="OptionList">
<label>Equipos</label>
<select>
{options.map((option,index) => {
return (<option key = {}>{option}</option>)
})}
</select>
</div>

)

}
```

### Single Page Application (SPA)

Una aplicación de tipo Single Page Application es una aplicación que carga una única página HTML y todos los componentes necesarios (tales como JavaScript y CSS) para que se ejecute la aplicación. Cualquier interacción con la página o las páginas que se deriven de la misma no requiere hacer solicitudes al servidor, lo que implica que la página no es recargada. Podemos utilizar React para construir páginas de tipo SPA.