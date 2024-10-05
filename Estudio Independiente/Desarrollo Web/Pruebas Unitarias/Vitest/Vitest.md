---
tags:
---
Una herramienta nativa de Vite para realizar [[Pruebas Unitarias]] en proyectos de Front-End (En este ejemplo, usaré React). La idea es escribir funciones dentro de archivos para capturar los resultados que esperamos obtener, realizando así pruebas de calidad a nivel de componentes dentro del framework de React. Está basado en el entorno de desarrollo de Vite, ya que es un plugin para el mismo.

```table-of-contents
```


## ¿Cómo Instalar Vitest?

Para poder instalar este plugin, necesitaremos instalar dos librerías que nos ayudarán a cumplir la labor de realizar pruebas unitarias.

La primera librería es la misma `vitest`, que puedes descargar ejecutando el siguiente comando:

```npm
npm install vitest
```

La segunda librería que debemos instalar, nos permitirá interactuar con el DOM de forma directa mediante JavaScript. La librería se llama `jsdom` y puedes descargarla mediante el siguiente comando:

```npm
npm install jsdom
```

Posteriormente, tendremos que hacer algunos ajustes al archivo de configuración de vite: `vite.config.js`. Este archivo quedaría de la siguiente forma:

```js
/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test:{
		environment:"jsdom"
	}
})
```

## Cómo Configurar Vitest
Imaginemos que tenemos un componente que queremos utilizar y al que queremos otorgarle la funcionalidad de un Acordeón, es decir, cuando se dé click en el componente, este podrá desplegar o comprimir información.

`Accordion.tsx`

```tsx
type AccordionProps = {
	title: string,
	children:React.ReactNode
}

export default function Accordion(props:AccordionProps){
	return (
		<div>
			<h3>{props.title}</h3>
			<div>{props.children}</div>
		</div>
	)
}
```

Para realizar las pruebas, debemos crear un archivo que normalmente se estructura como `nombredelComponente.test.tsx`.

### Manejando un archivo `.test`

Dentro del archivo normalmente debemos importar las funciones llamadas `describe` y `test`. La función `describe` me permite poder agrupar distintos tests. Por otro lado, la función `test` describe en sí, el test unitario que queremos realizar para saber, por ejemplo, si un componente si se muestra correctamente en pantalla, se renderiza o en general, el estado con el que se inicia por primera vez.

Así mismo, también debemos importar la función `expect`, que cumple la labor de verificar si nuestra condición se cumple o no.

Entonces, nuestro código de nuestro archivo `Accordeon.test.jsx` se vería así:

```tsx
import {describe,test,expect} from 'vitest'

describe('Accordion', () =>{
	test('Shoud Sum Two Numbers', () =>{
		expect(1+1).toBe(2);
	})
})
```

### Configurar el comando para hacer pruebas con Vitest

Ahora, para poder ejecutar nuestro entorno de pruebas, lo que debemos hacer es añadir un nuevo script dentro de nuestro proyecto de Node. En este caso, debemos modificar esta parte del archivo `package.json` de la siguiente manera:

```json
"scripts": {
	"dev": "vite",
	"build": "tsc -b && vite build",
	"lint": "eslint .",
	"preview": "vite preview",
	"test": "vitest"
},
```

> Ahora, podemos realizar pruebas ejecutando el comando `npm test`

Si lo ejecutamos, podremos ver que nuestra única prueba unitaria, pasó.
```shell
     ✓ Shoud Sum Two Numbers
 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  19:41:15
   Duration  902ms (transform 44ms, setup 0ms, collect 34ms, tests 4ms, environment 514ms, prepare 109ms)
```

### Usar la Interfaz Gráfica de Vitest

También, podemos realizar un debugging por medio de un servidor dedicado para vitest que nos muestra una interfaz gráfica. Es algo similar a cuando corremos nuestra aplicación de react de manera local, sin embargo, esta interfaz está diseñada única y exclusivamente para realizar tests unitarios.

Para esto, debemos instalar el módulo de npm mediante el siguiente comando:

```npm
npm i -D @vitest/ui
```

Luego, podremos ejecutar esta interfaz gráfica desde consola mediante el siguiente comando

```npm
vitest --ui
```

Si lo ejecutamos con el proyecto que venimos haciendo, se verá así:

![[Pasted image 20240926195300.png]]

## Realizando el Primer Testing

Como Vitest por si solo no puede interpretar el DOM de JavaScript, debemos hacer uso de una librería de React llamada `React Testing Library`, la cual nos permitirá realizar pruebas como simulaciones de funciones `onClick`, comprobaciones sobre si el elemento está siendo renderizado... etc.

Podemos instalar la librería mediante el siguiente comando:

```bash
npm install --save-dev @testing-library/react @testing-library/dom
```

### Comprobar si el elemento se renderiza

Ahora que tenemos instalada la librería para pruebas de react, lo que procederemos a hacer es verificar si el componente está siendo renderizado. Para ello, vamos a hacer uso de un módulo de la biblioteca `Testing Library` llamado `render`.

Además, puede que el componente se haya renderizado correctamente, pero de igual forma necesitamos saber si el mismo está apareciendo en pantalla. Es por ello que Testing Library también nos ofrece un módulo llamado `screen`. 

Por último, hacemos uso de la función `expect` para buscar un texto dentro de toda nuestra pantalla. Si el elemento nos aparece, nos devolverá un booleano positivo, de lo contrario, nos devolverá un dato de tipo `null`.

Por lo tanto, ahora nuestro código de testing se ve de la siguiente manera:

```tsx
import Accordion from './Accordion'
import {describe,test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

describe('Accordion', () =>{
test('Our Component Is Rendering?', () =>{
	render(<Accordion title = "hello">
		<h3>Content</h3>
		<p>My Content</p>
		</Accordion>
	);
	expect(screen.getByText('hello')).toBeDefined()
	})
})
```

### Comprobar si la información se muestra correctamente

En la mayoría de nuestros tests debemos de renderizar nuestro componente antes de probar la funcionalidad en cuestión, es por ello que a veces sale más rentable hacer que un componente se renderice una sola vez antes de pasar a las pruebas unitarias.  Para solucionar esto podemos hacer uso de un hook de Testing Library llamado `beforeAll`, el cual le indicará a vitest que antes de hacer cualquier test, lleve a cabo la acción correspondiente. En este caso, nuestro componente `Accordion`se renderiza antes de realizar cualquier prueba.

> [!CONSEJO]
> Algunas veces, al usar el hook `beforeEach`, nuestro componente se renderizará más de una vez, lo que puede generar problemas al momento de buscar un texto debido a que aparecerá más de una vez. Es por esto que en este caso hacemos uso del hook `beforeAll`, que renderiza todo antes de hacer cualquier prueba. Como siempre, el uso de estos dos depende del contexto en el que los utilices

Ahora... podemos trasladar nuestra función para buscar el título "Hello" a su propio test. Además, crearemos un test para verificar si nuestro contenido dentro del acordeón no se renderiza cuando se inicia el componente. Para ello, utilizamos un módulo de Testing Library llamado `queryByText`, el cual busca el contenido dentro de toda la página y retorna un resultado. En este caso como estamos esperando un tipo de dato `null`, hacemos uso de la función `toBeNull`.

Ahora, nuestro código se ve así:

```tsx
import Accordion from './Accordion'
import {describe,test, expect, beforeAll} from 'vitest'
import {render, screen} from '@testing-library/react'

describe('Accordion', () =>{
	beforeAll(()=>{
		render(<Accordion title = "hello">
			<h3>Content</h3>
				<p>My Content</p>
			</Accordion>
		);
})

	test('Should show title all the time',()=>{
		expect(screen.getByText('hello')).toBeDefined()
	})
  
	test('Should not show the content at the start',()=>{
		expect(screen.queryByText(/content/i)).toBeNull()
	})

})
```

### Comprobar si un contenido ha sido clickeado alguna vez

Para esto, debemos hacer uso de un módulo que nos ofrece la librería de Testing Library llamada `fireEvent`, el cual puede hacer uso de diferentes funciones para verificar el funcionamiento de algún botón acorde a nuestras necesidades, en este caso, viendo si ha sido presionado alguna vez para mostrar una información.

La importación de `fireEvent`se puede hacer de la siguiente forma:

```tsx
import {render, screen, fireEvent} from '@testing-library/react'
```

Y en este caso, nuestra prueba unitaria quedaría de la siguiente forma:

```tsx

test('Should show the content when the button is clicked',()=>{
	const button = screen.getByText(/open/i);
	fireEvent.click(button);
	expect(screen.queryByText(/content/i)).toBeDefined();
})
```

## Conclusión
Con esta herramienta de testeo, el desarrollador puede comprobar si los aspectos fundamentales de su aplicación funcionan correctamente sin la necesidad de hacer una comprobación manual. La idea es automatizar tantas de estas comprobaciones como se consideren necesarias para mejorar la calidad de un producto.