El **Prop Drilling** es una paso del desarrollo que ocurre cuando necesitamos obtener datos que están en varias capas en el **árbol de componentes React**. Veamos este concepto en funcionamiento en la práctica, pasando **props** de un componente a otro.

### Pasando props

Pasamos **información entre componentes** a través de props, en el siguiente ejemplo tenemos un archivo que recibe un componente `<Panel />` que a su vez recibe un nombre de usuario:

```jsx
//código omitido
const username = “maria”

<Panel username={ username }/>
//código omitido 
```

Para que este nombre se muestre en la pantalla, debemos pasar esta información al componente `<Panel />`.

En el archivo donde creamos el componente `<Panel />`, podemos recibir la información del nombre en el **objeto prop** . Y para mostrar el nombre en la página, hacemos la interpolación `props.username`.

```jsx
export default function Panel(props) { 
   return <div>{props.username}</div>
}
```

Ahora, si el componente `<Panel />` devuelve otro componente y este componente necesitara la información del nombre de usuario, ¿cómo lo haría?

### Prop Drilling

Para resolver este caso, tendríamos que pasar esta información a un nivel más bajo.

```jsx
export default function Panel({ username }) { 
   return <div><Articulo username={username} /></div>
}
```

Este patrón de pasar una props a otro componente que está más abajo en el árbol de componentes se llama prop drilling.

En este caso, estamos pasando el nombre de usuario al componente `<Articulo />`, pero no lo estamos utilizando directamente en el componente `<Panel />`. Lidiar con el prop drilling puede ser un desafío, en poco tiempo se vuelve difícil para cualquier persona descubrir dónde se inician los datos, dónde se actualizan y dónde se utilizan.

##### Entonces, ¿cómo evitamos el prop drilling?

### React Context

Una de las formas en las que podemos evitar el prop drilling en React es a través del [React Context](https://react.dev/reference/react/useContext), la cual es una forma de pasar datos entre el árbol de componentes sin tener que pasar las props en cada nivel de forma manual.

Para pasar el nombre al componente `<Panel />`  primero debemos crear un contexto con ***React.createContext()***. En nuestro caso, la referencia para ese contexto es `UserContext`.

```jsx
export const UserContx = React.createContext
```
y para pasar los valores del componente padre al componente hijo debemos crear un proveedor o un **Provider**.

```jsx
<UserContext.Provider>
	<Panel />
<UserContext.Provider/>
```

Ahora lo que debemos hacer es decir qué valores vamos a pasar al componente `<Panel />` a través del Provider, para eso utilizamos el atributo value:

```jsx
<UserContext.Provider value = {username}>
	<Panel>
<UserContext.Provider/>
```

##### **Y ahora, ¿cómo recibimos ese valor?**

La llamada a createContext devuelve un **objeto con dos valores**, utilizamos el primer Provider, y para obtener el valor del contexto, necesitamos un consumidor o **Consumer** y para obtener el nombre de usuario que estamos pasando, usamos la sintaxis de **render prop**:

```jsx
export default function Panel(){

	return <div>
				<UserContext.Consumer>
					{value => <div> Buenos días, {value}</div>}
				<UserContext.Consumer/>
			</div>
}
```

Esta es una forma de pasar props del componente padre al componente hijo evitando el prop drilling.

### Para saber más

Con la adición del **hook** [**useContext**](https://es.reactjs.org/docs/hooks-reference.html#usecontext), podemos simplificar nuestro código, pasando el `UserContext` como contexto y usando solo el `value` dentro del retorno:

```jsx
export default function Panel() { 
const value = useContext(UserContext)
   return <div>
                 Buenos días, { value } 
              </div>
}
```