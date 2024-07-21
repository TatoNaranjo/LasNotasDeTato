Debemos tener en cuenta de que hay dos tipos de componentes: los componentes con estado y los componentes sin estado. Todo va a depender del escenario en el que nos encontremos.

Nosotros trabajamos previamente con inputs dentro del formulario, sin embargo necesitamos que esos valores se almacenen dentro de un estado para que puedan ser recopilados en un futuro.

Si nosotros agregamos el atributo `value` a un input en html, lo que va a pasar es que no vamos a poder hacer ninguna modificación al texto, es por eso que necesitamos utilizar un evento de react conocido como `onChange`.

Entonces... siguiendo con el concepto de las `props`, lo que podemos hacer para actualizar el valor del formulario conforme el usuario escriba la información sería crear una función que se encargue del proceso y lo almacene dentro de nuestro `useState`. 

Aquí un ejemplo dentro de un componente:

```js
const [value,setValue] = useState("")
const handleChange = (event) =>{
setValue(event.target.value)
}

return(
	<div className="textInput">
		<label >
		{props.title}

		</label>

		<input type="text" placeholder={props.placeholder} required={props.required} value = {value} onChange={handleChange}/>

	</div>

	)


```


**La idea es centralizar toda esta información dentro de un componente general de formulario para recibirla y procesarla posteriormente, por lo tanto hacemos uso de los props**

Ejemplo:

`Form.js`

```javascript
const [name, setName] = useState("");
const [position, setPosition] = useState("");
const [photo, setPhoto] = useState("");

const handleSubmit = (event) => {

event.preventDefault();
let datosAEnviar = {
name,
position,
photo
}
console.log(datosAEnviar)
};


return(
<TextInput
title="Nombre"
placeholder="Ingresa tu nombre aquí"
required={true}
value={name}
updateValue = {setName}
setName
/>

<TextInput
title="Puesto"
placeholder="Ingresa tu puesto aquí"
required
value={position}
updateValue={setPosition}
/>

<TextInput
title="Foto"
placeholder="Ingresar link de la foto"
required
value = {photo}
updateValue = {setPhoto}
/>
)
```

`TextInput.js`

```js
function TextInput(props){
const handleChange = (event) =>{
props.updateValue(event.target.value)
}
return(
	<div className="textInput">
		<label >
		{props.title}
		</label>
		<input type="text" placeholder={props.placeholder} required={props.required} value = {props.value} onChange={handleChange} />
</div>
)
}
```