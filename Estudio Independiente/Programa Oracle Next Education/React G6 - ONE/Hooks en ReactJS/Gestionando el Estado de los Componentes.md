Empecemos por definir y entender que son los Hooks, expresemos la definición en los términos más simples, un hook es una función, partiendo de esa premisa entonces podemos indicar que no es cualquier función, está claro ello, en ese caso podemos decir:

Un hook es una función especial con un objetivo específico, simplificar algún proceso que hasta el momento se realizaba de otra forma.

Con este concepto más amplio, podemos decir que los hooks, son funciones que simplifican procesos relacionados al ciclo de vida de componente funcionales, porque hasta la versión 16.7 de React, los componentes funcionales sólo recibían props y no era posible gestionar su estado, solo los componentes de clases (antigua forma de construir componentes, basada en POO ) soportaban está gestión.

Un detalle interesante, es que dada la usabilidad y potencia de los Hooks, no solo la librería base React actualmente tiene hooks, ahora otros paquetes de amplio uso también implementan hooks, tal como es el caso de react-router-dom por ejemplo.

¿Para qué sirven?

Los hooks buscan reutilizar la lógica de estado de un componente, para que luego sea posible reutilizarlo de forma independiente. Otro punto interesante, es que los hooks llegan a ser transversales o independientes de la jerarquía del componente. Esto facilita el compartir Hooks entre muchos componentes o incluso con la comunidad.

Por su facilidad de uso y por la forma en que simplifican tareas críticas como la gestión de estado o la gestión del ciclo de vida, los hooks se han convertido en elementos de uso cotidiano dentro de las aplicaciones ReactJS.

## useState

Como su nombre lo indica, este hook está relacionado al state o al estado del componente, es importante recordar que las aplicaciones hechas en React, son reactivas, es decir reaccionan a estímulos o eventos, de tal forma que cuando hablamos de estado, nos referimos a la situación de la aplicación.

Lo interesante de useState es que React queda digamos en forma simple, escuchando o verificando si el estado cambia, al existir un cambio en el estado, el componente donde se encuentre este estado será actualizado, es decir la aplicación sólo va a actualizar este componente, lo cual hace que el performance de las aplicaciones hechas en React sea notablemente bueno. Sobre todo si comparamos con la forma tradicional de desarrollo web (HTML + CSS + JavaScript), donde para poder actualizar debemos reescribir la página entera o usar JavaScript complejo para obtener un mejor performance.

## useRef

El Hook useRef tiene dos propósitos principales: almacenar valores mutables (valores que cambian en el tiempo) que no deben generar una nueva renderización cuando se actualizan y almacenar referencias a elementos del DOM.

Cuando un componente se renderiza o se dibuja en React, normalmente se restablecen su estado y otras variables. Sin embargo, podemos tener casos en los que debemos mantener ciertos valores incluso cuando el componente se vuelve a renderizar. Para esta tarea tenemos a disposición a Hook useRef. Este hook permite crear una referencia a un valor que persistirá entre renderizaciones.

Además, el Hook useRef es fundamental para trabajar con elementos DOM. En React, acceder a los elementos del DOM y modificarlos directamente puede resultar complicado, especialmente sin el Hook useRef. Con useRef, puedes obtener una referencia a un elemento DOM concreto y realizar operaciones sobre él. Esto elimina la necesidad de bibliotecas externas o de complicadas soluciones.

Cuando nosotros queremos acceder a un elemento usando JavaScript, hacemos uso del DOM (Document Object Model) del navegador, sin embargo, como ya sabemos, react no se rige bajo las mismas reglas debido a que el crea un DOM virtual. Es por eso que cuando queremos acceder a un objeto en particular, debemos hacer referencia a el usando el hook `useRef`.

#### Ejemplo:

```jsx
const cajaConsulta = useRef(null)

return (
<input ref = {cajaConsulta} type="text" placeholder="¿Qué estás Buscando?" onChange={handleValue} value = {search}/>
)
```

En este caso, si hacemos referencia a el input, lo que nos retorna la variable `cajaConsulta` es un objeto llamado `current`. Sin embargo, si hacemos un `console.log(cajaConsulta.current)` lo que obtendremos de vuelta será todo el elemento input al que hacemos referencia.