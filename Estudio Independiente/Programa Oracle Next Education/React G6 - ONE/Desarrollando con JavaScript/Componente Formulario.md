---
date: 2024-07-20
---

A la hora de hacer un componente de un formulario, no nos damos cuenta de que hay varias cosas que podemos reutilizar, por ejemplo unos inputs de texto, algunos iconos o botones. La idea es reutilizar los componentes lo más que se pueda.

Al momento de crear un componente, podemos crearlo dándole el nombre al archivo (Por ejemplo: `Header.js`) o simplemente nombrando el archivo de JavaScript como `index.js`. La diferencia entre ambos es que cuando llamemos al componente dentro de otros archivos, si no se encuentra el componente por defecto, react siempre va a apuntar a algún archivo que se llame `index` dentro de la carpeta del componente.

Por lo tanto, hay 2 formas de importar el componente

```js
//Si se llama el componente cuyo archivo tiene un nombre como: TextInput.js
import TextInput from "../TextInput/TextInput"
```

```js
//Si tenemos un componente y su archivo tiene el nombre: index.js
import TextInput from "../TextInput/"
```

## Trabajando con etiquetas internas

Otra cosa que hay que tener en cuenta es que al trabajar con etiquetas internas, en `html` no requerían de un cierre (como por ejemplo la etiqueta `<input>`), sin embargo en React siempre será necesario cerrarlas de la forma: `<input/>`.


