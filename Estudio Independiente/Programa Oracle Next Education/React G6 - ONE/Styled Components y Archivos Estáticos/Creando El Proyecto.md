---
date: 2024-08-05
---

Para crear la base inicial de la formación sobre [[Styled Components y Archivos Estáticos]] debemos crear un proyecto de vite e instalar la librería clave del proyecto, Styled Components.

Styled Components es una librería popular de JavaScript para React y React Native que permite escribir estilos CSS directamente dentro del código JavaScript utilizando una técnica conocida como "CSS-in-JS". Fue creada para resolver problemas comunes en la gestión de estilos en aplicaciones modernas de front-end, tales como el alcance global de los estilos y la dificultad de mantener CSS en grandes proyectos.

Un ejemplo de como podemos utilizar los styled components en un archivo `.jsx o .js` es:

```javascript
import styled from 'styled-components'
const GradientBackground = styled.div`
background:
linear-gradient(175deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
width:100%;
min-height:100vh;`
```

### Normalizar el CSS

Los navegadores le añaden unos atributos adicionales a nuestros proyectos a la hora de crearse. Esto puede causar problemas a la hora de crear varios componentes con estilos ya que los elementos no ocuparán el espacio que necesitan debido a el padding y las márgenes que ya han sido configuradas previamente por el navegador. Por esto, es que necesitamos resetear nuestros estilos predeterminados de CSS con una librería llamada [Normalize.css](https://necolas.github.io/normalize.css/).

Así como existe normalize, hay muchas otras librerías que nos ayudan a resetear nuestros estilos de CSS dentro de [CSSBed](https://www.cssbed.com/).