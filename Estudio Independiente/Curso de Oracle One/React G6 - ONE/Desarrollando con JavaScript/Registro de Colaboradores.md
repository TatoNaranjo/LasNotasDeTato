Imagina que tenemos un componente de inputs y necesitamos que uno de ellos tenga el atributo de `required`. Agregar el atributo a todo el componente no es óptimo ni una buena opción, debido a que todos los inputs del componente se modificarían, es por eso que también podemos pasar atributos a través de props. En caso de que no enviemos el atributo por medio de props, el componente lo tomará como no requerido.

`componente.js`

```javascript
<input type="text" placeholder={props.placeholder} required={props.required}/>
```

`Form.js`

```javascript
<section className="formulario">
	<form onSubmit={handleSubmit}>
		<h2>Rellena el formulario para crear el colaborador.</h2>
		<TextInput title = "Nombre" placeholder="Ingresa tu nombre aquí" required={true}/>
		<TextInput title = "Puesto" placeholder="Ingresa tu puesto aquí"/>
		<TextInput title = "Foto" placeholder="Ingresar link de la foto"/>
		<OptionList/>
		<Button content="Crear"/>
	</form>
</section>
```

## Manejo de Estados con React

Así como en HTML teníamos el evento `onclick`, en react podemos usar el mismo elemento, solo que con la diferencia de una nomenclatura en camel-case. Entonces, la función que utilizamos pasa a llamarse `onClick`.

Los estados en react se manejan con una funcionalidad que apareció en la versión 16 de react, los `Hooks`. 


### useState
Los hooks son funcionalidades que nos ayudan a trabajar con el comportamiento de react, uno de los mas usados es el hook `useState`.

`useState` es una función que recibe un parámetro inicial y nos regresa un arreglo de dos elementos en donde el primer elemento es el valor y el segundo elemento es una función que nos permite modificar el estado de dicho valor. Esto permite que una función que va a cambiar dentro de un futuro tenga un estado.

Ejemplo:

```javascript
//const [nombreVariable,funciónActualiza] = useState(valorInicial)
const [nombre,actualizarNombre] = useState("Tato")

// Un ejemplo de como funciona un useState usado a modo de switch

const [mostrar,actualizarMostrar] = useState(true)
const handleClick = (()=>{
	actualizarMostrar(!mostrar)
})
```


Podemos pasar estas funciones a través de un `useState` para que sean utilizadas en otros componentes.

`myCallingComponent.js`

```javascript
const [showForm,formUpdate] = useState(true)
const changeShow = (()=>{
	formUpdate(!showForm)
})

return (
<div className="App">
	<Header />
	{showForm=== true ? <Form/> :<div/>}
	<MyOrg changeShow={changeShow}/>
</div>
);
}
```

`myComponent.js`

```javascript
<img src = "/img/add.png" alt = "add" onClick={props.changeShow}/>
```
### Renderizado condicional

A partir de los estados de nuestros componentes podemos llevar diferentes acciones a cabo en base a la lógica, podemos verlo como si fuese una especie de `if` en cualquier lenguaje de programación a partir del lenguaje de operadores ternarios.

```js
return (
	<div className="App">
		<Header />
		{showForm== true ? <Form/> :<div/>}
		<MyOrg/>
	</div>

);
```