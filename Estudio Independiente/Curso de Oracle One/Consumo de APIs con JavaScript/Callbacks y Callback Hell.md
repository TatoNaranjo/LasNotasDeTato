Callback, que literalmente significa "llamada de vuelta", es una función que se pasa como argumento a otra función y se espera que sea "llamada de vuelta" en algún momento. Básicamente, cuando usas una función de retorno, estás diciendo: "Oye, no ejecutes esto ahora, espérame, y cuando termine mi trabajo, puedes continuar con el tuyo".
## ¿Por qué usar Callbacks?

Un beneficio importante de usar callbacks es que hace que tu código sea más eficiente. Por ejemplo, en lugar de hacer que tu código espere hasta que se complete una tarea, puedes usar un callback para permitir que tu código continúe con otras tareas, y regresar a la tarea anterior solo cuando sea necesario.

Además, los callbacks se utilizan en eventos, temporizadores y en solicitudes asíncronas en JavaScript. También se utilizan en operaciones que llevan mucho tiempo para ejecutarse y aún así necesitamos asegurarnos de que ciertas acciones solo ocurran después de que estas operaciones se completen.

### Puntos a recordar

- Un callback es una función que se pasa como argumento a otra función.
- Los callbacks ofrecen una forma de personalizar una función según tus necesidades.
- Pueden hacer que el programa sea más eficiente y también mejoran la estructura del código.

## Callback Hell

En varias ocasiones debemos tener en cuenta si utilizar un callback es lo más conveniente o no, esto debido a que su uso no tan adecuado puede llevar a ocasionar un Callback Hell.

Si queremos que un intervalo de tiempo definido se ejecute en múltiples funciones usando un `setTimeout()` vamos a tener una estructura en la que muchas funciones se repiten de manera innecesaria y se produce una mala legibilidad del código, es a esto a lo que se le conoce como un Callback Hell. Generalmente, lo mejor es no pasar más de un _callback_, porque procederá a crear unas estructura en el código para la cual será difícil de hacer un mantenimiento. 

Para solucionar este tipo de problemas es que JavaScript creó un concepto conocido como Promises, el cual se abarca en el documento: [[Tratando las Promises]].