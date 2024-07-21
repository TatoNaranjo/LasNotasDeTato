
## Síncrono

El funcionamiento de JavaScript se basa en la sincronía, es decir que una función va a ocurrir después de que otra termine de ejecutarse por lo que todo sucede de forma secuencial. Esto es posible gracias a dos herramientas del lenguaje llamadas Call Stack y Event Loop.

```javascript
function cuatro(){
	console.log("cuatro")
}

function tres(){
	console.log("tres")
	cuatro() // Primero se ejecuta la función cuatro y luego cuando termine, la tres
}

function dos(){
	console.log("dos") // Primero se ejecuta la función tres y luego cuando termine, la dos
	tres()
}

function uno(){
	console.log("uno") // Primero se ejecuta la función dos y luego cuando termine, la uno
	dos()
}

uno()
```
## Call Stack y Event Loop

Un Call Stack es el que se encarga de realizar el ciclo de ejecución de las funciones en JavaScript, y el Event Loop es aquel agente regulador que verifica que los ciclos dentro de un Call Stack se estén cumpliendo correctamente. Para entender como funcionan estos ciclos puedes usar la herramienta de  [JavaScript Visualizer](https://www.jsv9000.app/).

Sin embargo, qué pasa cuando necesitamos que las funciones en JavaScript se ejecuten de manera asíncrona?

## Asíncrono y Task Queue

Imaginemos que dentro de una página tenemos un formulario con el que esperamos que el cliente interactúe. Entonces debemos preguntarnos `¿Sabemos el momento en el que el usuario llenará el formulario?` la respuesta es: no. Es por esto que, podríamos necesitar una función que esté esperando a ser llamada.

Así como tenemos un ciclo que se cumple dentro de una Call Stack, también tenemos una lista para controlar el flujo de las funciones asíncronas, la `Task Queue`.

El código síncrono se ejecuta inmediatamente y bloquea otras operaciones, mientras que el asíncrono se coloca en la Task Queue y se ejecuta después de que las operaciones síncronas se completen.

## Resumen

**Por defecto, JavaScript funciona de manera sincrónica**, ejecutando las tareas línea por línea. Funciones como las descritas anteriormente pueden retrasar esta ejecución por tener un tiempo de espera relativo a factores externos (como el usuario o la API). Para que esto no afecte nuestro proyecto, tenemos lo que se llama **programación asíncrona**.

La asincronía en programación es el acto de ejecutar una tarea en "segundo plano", para que la ejecución de las otras tareas más pequeñas ocurra mientras se carga la tarea más grande, sin interrumpir el código. JavaScript tiene el comportamiento de ejecutar una cosa a la vez, incluso si convertimos fragmentos de código en asíncronos. ¿Pero cómo funciona esto?

Podemos desglosar el flujo de ejecución de tareas en JavaScript en tres partes: Event Loop, Call Stack y Task Queue. El **Event Loop** es un ciclo que monitorea y ejecuta las acciones que enviamos a JavaScript. El proceso de lectura del código solo se finaliza cuando no hay más acciones que ejecutar. La **call stack** es un mecanismo que organiza cómo funcionará el script cuando existen muchas funciones: qué función se está ejecutando, cuáles se están llamando dentro de alguna función, etc. Por último, **la task queue** es la cola de tareas asíncronas. Si algo necesita ocurrir en segundo plano o más tarde, es en esta cola donde se agregará y ejecutará más tarde.