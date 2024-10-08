---
date: 2024-07-26
tags:
  - React
  - Front-End
---

Cuando pasamos propiedades de CSS por medio de props, podemos escribir estilos dentro de las etiquetas de la siguiente manera: `style={{backgroundColor:props.background}}`.

En react las convenciones de CSS que tienen un guión como por ejemplo `background-color` se cambian por una convención de Camel Case, es decir que en el ejemplo, pasa a ser `backgroundColor`.

Ejemplo:

```javascript

export default function Team(props){
return (
	<section className="team" style={{backgroundColor:props.background}}>
		<h3 style={{ borderBottom:`4px solid ${props.secondaryColor}`}}>{props.teamName}</h3>
		<div className = "collaborators"></div>
	</section>
)
}
```

## Destructuring de objetos

Para evitar repetir la nomenclatura `props.` cuando llamamos muchas veces a un valor dentro de una propiedad, podemos primero tomarla como una constante y luego aplicarla a nuestro código. Por ejemplo, la función anterior quedaría de la siguiente forma:

```javascript
export default function Team(props){

//Destructuring de objetos
const {primaryColor, background, teamName} = props;

return (
	<section className="team" style={{backgroundColor:background}}>
		<h3 style={{ borderBottom:`4px solid ${primaryColor}`}}>{teamName}</h3>
		<div className = "collaborators"></div>
	</section>
)
}
```

### Centralizar las opciones de los componentes

Cuando trabajemos con componentes lo ideal siempre será centralizar las opciones a solo una para que cuando tengamos que hacer alguna modificación después, tengamos que hacer el menor número de cambios posible.

### Spread Operator

Cuando tengamos alguna lista que tengamos que rellenar, lo mejor siempre va a ser iniciar el `useState` con un arreglo vacío.

Ejemplo:

```javascript
const [collaborators,setCollaborators] = useState([]);
```

Por lo tanto, ¿cómo hacemos para ingresar elementos a el arreglo vacío del `useState`? Pues utilizamos spread operators. De lo que se encarga la primera parte de la función es de copiar todos los valores que existen actualmente en el arreglo, para luego agregar el elemento que se encuentra en la segunda parte de la función.


```javascript
setCollaborators([...collaborators,collaborator])
```
