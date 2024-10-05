La expresión “manipular el DOM” es muy común y muy escuchada cuando empezamos a estudiar desarrollo web. Este artículo abordará el concepto de lo qué és el Virtual DOM, sus diferencias con el DOM real y cuándo debemos usarlos. Si aún tienes dudas sobre cuál es el DOM real, tenemos un artículo que explica el tema en detalle: “[¿**_Qué és DOM?_**](https://www.aluracursos.com/blog/[https://www.aluracursos.com/blog/que-es-dom](https://www.aluracursos.com/blog/que-es-dom))”.

![IMG-CAPA](https://www.aluracursos.com/blog/assets/que-es-dom/capa.jpg)

### ¿Qué es Virtual DOM?

Ahora bien, vamos directo al punto. ¿Qué es Virtual DOM? ¿Y cuándo debemos utilizarlo? Si considerarmos su nombre, podemos inferir que se trata de un documento virtual. Pero ¿qué queremos decir con eso?

El Virtual DOM es una representación visual del DOM, así que no es el DOM real. Esta representación se almacena en la memoria del navegador y se sincroniza con el DOM real através de una biblioteca como el React DOM, por ejemplo. En el Virtual DOM, tenemos un estado intermediario entre lo que vemos en pantalla y lo que tenemos en el DOM real.

Cuando se aplica una alteración através de una biblioteca, el Virtual DOM guarda esta nueva versión del DOM en la memoria del navegador, solo con los componentes modificados, independientemente de su posición en el árbol DOM.

Imagina, por ejemplo, que nuestra página y sus componentes se parezcan exactamente como un árbol real y que, a cada cambio de estación, este árbol sufra cambios en su estructura. Recuerdas que en un árbol tenemos las raíces, el tronco, las ramas y las hojas, así como los componentes de nuestra página.

Si el comportamiento de nuestro árbol fuera como el comportamiento del DOM real, cada vez que la estación del año se cambia de verano a otoño, por ejemplo, en lugar de solo caer las hojas, todo el árbol cambie por completo, incluso las partes que no sufrieron cambios, como el tronco y las ramas, por ejemplo. La situación es como se muestra en la siguiente imagen.

![Alt text: En la imagen, presentamos un árbol de componentes baseado en el DOM real, donde dos componentes han sufrido cambios (componente cambiado) fueron actualizados, pero sus componentes hijos que no han sufrido cambio (componente actualizado) tambien se han actualizado.](https://www.aluracursos.com/blog/assets/que-es-dom/virtual-dom-1.png)

En la imagen, presentamos un árbol de componentes basado en el DOM real, donde dos componentes han sufrido cambios (componente cambiado) fueron actualizados, pero sus componentes hijos que no han sufrido cambio (componente actualizado) también se han actualizado.

Por otro lado, si el comportamiento de este árbol fuera como el comportamiento del Virtual DOM, tendríamos algo mucho más parecido a lo que ocurre en la vida real. Con el inicio de una nueva estación, solo se ven afectados los componentes que cambian, así que, el tronco, las raíces y las ramas quedarian con el estado actual y solo las hojas sufrirían esta alteración, como podemos ver en la imagen de abajo.

![Alt text: El imagen, solo se actualizaron los componentes que sufrieron cambios (componente cambiado), sin que sus hijos sean afectados.](https://www.aluracursos.com/blog/assets/que-es-dom/virtual-dom-2.png)

En la imagen solo se actualizaron los componentes que sufrieron cambios (componente cambiado), sin que sus hijos sean afectados.

Sin embargo, es necesario recordar que el DOM virtual es solo una representación visual y que el DOM real todavía existe y ahí es donde necesitamos tener la información al final. Aquí es donde entra el trabajo más importante de nuestra biblioteca, que es sincronizar lo que vemos en el DOM virtual con lo que tenemos en el DOM real.

Cuando la aplicación está sincronizada, lo que sucede automáticamente en la biblioteca en uso, la versión que el DOM virtual tiene en memoria se replicará en el DOM real, que a su vez funciona para actualizar también cualquier componente hijo que pueda existir en la estructura de la aplicación.

### ¿Cuáles son las ventajas y diferencias del Virtual DOM con el DOM real?

Cambiar cualquier componente o elemento directamente en el DOM real puede resultar muy costoso para el proceso de desarrollo. Sin embargo, es inevitable cambiar el DOM cuando necesitamos que se muestre alguna modificación en la aplicación que estamos utilizando. Así, Virtual DOM viene a cubrir esa necesidad de realizar cambios que parecen casi instantáneos pero que no comprometen el rendimiento de la aplicación.

Al cambiar el DOM real, el navegador debe reprocesar su contenido para que se apliquen los cambios, y lo hace recargando la página de la aplicación. Mientras que con Virtual DOM, esta necesidad no existe, porque lo que vemos en pantalla no es el DOM real, sino su representación visual.

O sea, volviendo a nuestra analogía del árbol, si hiciéramos cambios directamente en el DOM real, nuestro árbol cambiaría (o se actualizaría) por completo y este proceso, en comparación con el proceso del Virtual DOM, es mucho más laborioso que cambiar solo lo que debe cambiar.

Esta tecnología nos permite, entonces, crear y ejecutar con mayor facilidad aplicaciones denominadas [**SPA (o _Single Page Application_)**](https://www.aluracursos.com/blog/[https://www.aluracursos.com/blog/single-page-application?utm_source=gnarus&utm_medium=timeline](https://www.aluracursos.com/blog/single-page-application?utm_source=gnarus&utm_medium=timeline)), donde tenemos numerosos componentes que se actualizan simultáneamente sin necesidad de que la página se renderice con cada alteración, ya que solo los componentes que fueron cambiados se actualizarán.

Además, para utilizar el DOM Virtual es necesario utilizar alguna biblioteca que intermedia nuestro DOM real con el virtual. También es necesario entender que, aunque estemos utilizando el DOM Virtual en nuestra aplicación, el DOM real no dejará de existir, sino que la comunicación con él se realizará de forma automatizada y cualquier interacción que realice el usuario no tiene un efecto inmediato en el DOM real, solo en el virtual.

### Conclusión

En el desarrollo Front-End, es inevitable trabajar con manipulación DOM y esta tarea puede ser bastante costosa a veces. Sin embargo, el Virtual DOM viene a ayudar de varias formas en el desarrollo Front-End, permitiendo la creación de arquitecturas más complejas permitiendo la creación de arquitecturas más complejas así como una mejor gestión del estado por parte de la aplicación.