---
date: 2024-07-02
tags:
  - CSS
  - Diseño
  - Front-End
---

#### **¿Qué es Styled Components?**

[Styled Components](https://styled-components.com/) es una biblioteca de JavaScript frecuentemente usada en React con la que puedes crear componentes de estilización personalizados, te permite escribir código CSS dentro de una función Javascript, en lugar de escribir CSS en un archivo separado. De esta manera, los estilos se aplican exclusivamente al componente que los utiliza. Esto hace que sea más fácil de entender y mantener, ya que los estilos están directamente asociados con el componente.

Styled Components es open source, esto quiere decir que los desarrolladores pueden contribuir con mejoras, nuevas funcionalidades y utilizarla en sus propios proyectos sin ningún costo. Cuenta con una comunidad activa, amplia documentación, ejemplos para ayudarte a comenzar y utilizarla de manera efectiva.

#### **¿Cómo funciona Styled Components?**

Styled Components utiliza [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) para estilizar sus componentes, esto significa que los estilos se definen en código JavaScript. Ya que estos estilos están vinculados a un componente específico pueden ser fácilmente manejados y mantenidos.

Estos son algunos de los **beneficios** de utilizar Styles components:

- Genera nombres de clases únicos, lo que evita problemas como la duplicación de estilos.
    
- Ajusta los estilos más fácil y dinámicamente en función de las props o de un tema global.
    
- Realiza un seguimiento de los componentes que se renderizan en una página y solo inyecta sus estilos, cargando la menor cantidad de código posible.
    
- Se encarga de agregar los [prefijos de vendor](https://developer.mozilla.org/es/docs/Glossary/Vendor_Prefix) para las reglas CSS, necesarios para el navegador. Lo que significa que puedes escribir CSS con los estándares actuales y no tener que preocuparte por los problemas de compatibilidad con diferentes navegadores.
    

#### **¿Cómo usar Styled Components?**

Para usar Styled Components en tu proyecto de React, primero debes instalar la dependencia en tu proyecto con el siguiente comando de npm:

​ `npm install styled-components`

Luego, en tu archivo de JavaScript debes importar Styled Components de la siguiente manera:

​ `import styled from 'styled-components';`

Una vez que tienes Styled Components importado, puedes crear un componente estilizado usando la función styled, pasar cualquier elemento de React como primer argumento y escribir tu estilo CSS como una cadena literal de plantilla:

```
const Button = styled.button` 
    background-color: blue; 
    color: white; 
    padding: 10px 20px; 
    border-radius: 5px; 
    font-size: 18px; 
        &:hover {  background-color: darkblue; }
`;
```

Luego, utiliza este componente estilizado como cualquier otro componente de React en tu aplicación. Por ejemplo:

```
function App() { 
    return (  
        <div>   
            <Button>Hola mundo</Button>  
        </div> 
    );
}
```