Es un modelo de aplicación que ha sido muy utilizado en el mercado. Fue creado como una solución al modelo de construcción de Software Front-End Convencional que se denomina MPA (Multi Page Application).

## Procesamiento y Solicitud de Información

Para comprender los conceptos de SPA o MPA hay que conocer los conceptos básicos de como funciona el ***flujo de información*** cuando se usa cualquier aplicación web. 

Al abrir cualquier página web, la información que se presenta en pantalla, ya sea una imagen, un video o incluso un JSON, no aparece del más allá, todo viene de alguna parte y todo llega al usuario a través de una solicitud. 

Básicamente, cada elemento de esta sección es una solicitud que fue procesada y solicitada por su navegador.

### ¿Cómo funciona este flujo en la Multiple Page Application?

Cuando hablamos de procesamiento, también nos referimos al consumo de tiempo y dinero. Pero, ¿Qué tiene que ver con esto? Imaginemos que estamos usando una aplicación basada en MPA. Mostrará los datos del usuario que tiene acceso activo a todas las páginas.

Se producirá el siguiente flujo:

1. Se accede a la página.
2. Se activa la solicitud.
3. Se consulta la base de datos.
4. El resultado está formateado.
5. Devuelve la respuesta de visualización al usuario.

Entonces, después navegamos a otra página y se ejecuta el mismo flujo, y así sucesivamente por cada página que se carga. Esto termina siendo **malo** tanto del lado del servidor como del lado del cliente, debido precisamente al flujo repetido de información.

Todos los datos serán **recargados con cada operación realizada**, si el usuario accede a este software usando los datos de internet de su celular, por ejemplo, estará consumiendo mucho más tiempo y datos de su paquete, aunque podrían ser recargados solo si es necesario.

En resumen, dentro de un MPA, cada vista o página de la aplicación es un archivo HTML separado que se carga desde el servidor cuando el usuario navega hasta él.

Esto da como resultado una **navegación más lenta** y una **experiencia de usuario menos fluida**, ya que el usuario tiene que esperar a que se vuelva a cargar la página completa cada vez que navega a una página diferente.

### La Single Page Application es la solución!

Uno de los problemas que tiene el enfoque tradicional (y que la SPA resuelve fácilmente) es que **redirecciona a los usuarios a una nueva página** cada vez que se realiza un cambio en sus datos. Lo que puede hacer que la experiencia sea frustrante cuando se quiere editar información en diferentes lugares, precisamente porque consume más tiempo y datos.

Las aplicaciones basadas en SPA, por otro lado, están totalmente enfocadas en una cosa a la vez. Cuando tenemos una Single Page Application, estamos hablando de aplicaciones cuya funcionalidad se concentra en una sola página, como su nombre lo indica.

En palabras más prácticas, solo se actualiza una parte de la pantalla, sin necesidad de recargar todo el navegador o redirigir al usuario a una nueva página. Por lo tanto, de forma asíncrona, solo se actualiza el contenido principal, manteniendo estática toda la página.

De esta forma, envía y recibe menos datos, lo que resulta en una operación mucho más eficiente. Con una interfaz más rápida y la optimización del rendimiento de las aplicaciones. Logrando mejorar la experiencia del usuario, precisamente subiendo su información bajo demanda, enfocándose en las necesidades del consumidor.

Es interesante notar que, incluso si nunca has oído hablar de SPA, probablemente ya haya utilizado varias aplicaciones que lo implementan. Un gran ejemplo de esto son las plataformas de correo electrónico como Outlook o Gmail. Dentro de ellos es posible abrir un mensaje, borrarlo, responder y solo se recargará la estructura central, manteniéndose el resto de la página estática.

Otros ejemplos de aplicaciones SPA son:

- Google Maps
- Trello
- Facebook
- Twitter
- Netflix
- YouTube

En resumen, en un SPA, todo el código necesario se carga en un solo archivo HTML y la navegación entre diferentes vistas o páginas se maneja dinámicamente en el lado del cliente sin recargar la página completa. Esto da como resultado una experiencia de usuario más rápida y fluida, ya que el usuario solo tiene que esperar la carga inicial y las actualizaciones posteriores en partes específicas de la página.

La elección entre un SPA y un MPA dependerá de los requisitos y objetivos específicos de su aplicación. SPA es adecuado para aplicaciones que requieren actualizaciones rápidas y dinámicas, mientras que los MPA son mejores para aplicaciones con una estructura más sencilla y directa.

## Principales ventajas de la Single Page Application

Ya que entendemos cómo funciona SPA y en qué se diferencia de su modelo tradicional. ¡Ahora es el momento de comenzar a comprender más sobre por qué es ventajoso y precisamente cuáles son los mejores casos para aplicar este modelo!

### Almacenamiento en caché de datos (Data Caching)

Una de las características más interesantes al usar SPA es precisamente el almacenamiento en caché de datos.

Cuando hablamos de este evento, automáticamente tenemos que relacionarlo con la memoria caché del navegador. Pero después de todo, ¿qué es la memoria caché del navegador? Pues... no es solo un lugar mágico que necesitemos visitar de vez en cuando y limpiar con frecuencia, pues va mucho más allá.

La caché del navegador es un espacio donde se almacenan los archivos estáticos de los sitios web visitados. De esta forma, cuando volvemos a la misma página, esta carga es mucho más rápida y permite una mayor agilidad en la navegación.

Cuando intentamos aplicar este concepto dentro del SPA, vemos que la página se puede almacenar en este caché. Pudimos acelerar la carga de la aplicación, ya que terminamos solicitando el contenido actualizado del servidor.

Otra de las ventajas que nos da, es que en base a los datos ya recibidos y al caché de estas páginas, pueden funcionar Offline.

### Performance

Cuando se busca reducir el tráfico de datos entre el servidor y el usuario, es interesante observar cuanto se reduce después de la carga inicial.

¡Este comportamiento ocurre porque la página ya tendrá toda la información necesaria para mostrar los datos enviados en paquetes estandarizados y simplificados! Ayudando a garantizar tiempos de respuesta bajos precisamente por el tamaño reducido de los datos transferidos.


### Pasos para crear una SPA

La creación de una aplicación de página única generalmente implica los siguientes pasos, estos son los pasos generales involucrados en la creación de una SPA, pero el proceso exacto varía según el framework que se elija y los requisitos específicos de su aplicación.

#### Elegir una estructura Front-End

Hay varias estructuras Front-End populares como React, Angular y Vue que son adecuadas para crear SPA. Elige aquel que mejor se adapte a tus necesidades.

#### Configurar la estructura del proyecto

Según el framework que elijas, debes configurar la estructura del archivo, incluidos los archivos index.html, CSS y JavaScript.

#### Implementar Enrutamiento

SPA usa el enrutamiento del lado del cliente para navegar entre diferentes vistas o páginas en la aplicación sin recargar la página completa. Podemos usar una biblioteca de enrutamiento como React Router o Angular Router para implementar el enrutamiento en nuestra SPA.

#### Buscar y Mostrar Datos

Normalmente la SPA se comunica con una API de back-end para recuperar y mostrar datos. Debemos usar las API proporcionadas por el framework, como obtener React o HttpClient de Angular, para obtener datos y mostrarlos en la página.

#### Manejar las interacciones del Usuario

Debemos implementar lógica para administrar las interacciones de los usuarios, como envíos de formularios y clics de botones, y actualizar de forma dinámica la página con datos apropiados.

#### Probar y Depurar

Debemos probar nuestra SPA a fondo para asegurarnos de que funciona como se espera y corrija cualquier error que encontremos.

#### Implementar

Finalmente, podemos implementar nuestra SPA en un servidor web o plataforma de hosting para que los usuarios puedan acceder a ella.

## Conclusión

¡En este artículo vimos que es una aplicación de página única o SPA! Esta en lugar de cargar cada pagina cada vez que se hace clic en un enlace, solo cargara la información relevante, devolviendo una experiencia de usuario mas rápida y fluida.

Todo esto se logra mediante el uso de JavaScript y otras tecnologías web. La idea detrás de un SPA es crear una experiencia web más dinámica y atractiva sin la necesidad de recargar páginas constantemente.

En resumen, hay varias razones por las que alguien podría optar por utilizar una sola página de Solicitud:

1. **Experiencia de usuario mejorada:**

SPA brinda una experiencia de usuario fluida, rápida y receptiva al actualizar dinámicamente el contenido de la página sin necesidad de recargar la página.

2. **Mayor rendimiento:**

Debido a que SPA solo carga los datos que necesitan, pueden reducir significativamente la cantidad de datos transferidos entre el servidor y el cliente, lo que resulta en tiempos de carga más rápidos y un mejor rendimiento.

3. **Mejor soporte fuera de línea:**

SPA puede almacenar datos en caché y seguir funcionando incluso cuando no hay conexión a Internet, lo que brinda una mejor experiencia para los usuarios en áreas con conectividad deficiente o inconsistente.

4. **Código reutilizable:**

Al usar un framework del lado del cliente como React o Angular, los desarrolladores pueden escribir componentes reutilizables que se pueden compartir en varias páginas de la aplicación, lo que reduce la cantidad de código necesario para escribirla.

5. **Fácil mantenimiento:**

Como SPA tiene una base de código centralizada, es más fácil mantener y actualizar la aplicación en comparación con las aplicaciones tradicionales de varias páginas donde el código se distribuye en varias páginas y solicitudes del servidor.

En general, SPA puede brindar una experiencia web más dinámica y atractiva para los usuarios y simplificar el desarrollo y el mantenimiento para los desarrolladores.