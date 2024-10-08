---
date: 2024-07-03
tags:
  - React
  - Diseño
---

Comparemos las características de los componentes de clases (forma antigua de trabajar en React) contra las características de los componentes funcionales y veamos algunas ventajas al trabajar con estos últimos.

Componentes de Clase:

1. Sintaxis:
    
    - Los componentes de clase se definen como clases de JavaScript que extienden la clase base `React.Component`.
    - Declaras un componente de clase utilizando la palabra reservsada `class` y luego defines sus métodos, como `constructor`, `render`, `componentDidMount`, etc.
2. Estado del componente:
    
    - En los componentes de clase, el estado se maneja mediante la propiedad `this.state`.
    - Para actualizar el estado, utilizas `this.setState({ newState })`.
3. Ciclo de Vida:
    
    - Los componentes de clase tienen un ciclo de vida más complejo como comentamos en clase.
    - Métodos como `componentDidMount`, `componentDidUpdate`, y `componentWillUnmount` te permiten controlar el comportamiento del componente en diferentes etapas del ciclo de vida.
4. Eventos:
    
    - Para gestionar eventos (como hacer clic en un botón), debes usar `this` para hacer referencia al componente.
    - Por ejemplo: `onClick={() => this.handleClick()}`.

Componentes Funcionales

1. Sintaxis:
    
    - Los componentes funcionales son simplemente funciones de JavaScript que reciben `props` como argumento y devuelven elementos JSX.
    - Se definen como funciones flecha o funciones regulares.
2. Estado del componente:
    
    - Antes de los hooks, los componentes funcionales no podían manejar su propio estado.
    - Con los hooks, puedes usar el estado local utilizando `useState`.
3. Ciclo de Vida:
    
    - Los componentes funcionales no tienen un ciclo de vida tan complejo como los componentes de clase.
    - En su lugar, utilizan el hook `useEffect` para manejar efectos secundarios y replicar el comportamiento de `componentDidMount`, `componentDidUpdate` y `componentWillUnmount`.
4. Eventos:
    
    - En los componentes funcionales, puedes enlazar eventos directamente sin necesidad de usar `this`.
    - Por ejemplo: `onClick={handleClick}`.

¿Cuál es la ventaja de usar componentes funcionales con hooks?

Enumeremos algunas de las ventajas que tenemos al usar componentes funcionales en lugar de componentes de clases.

1. Simplicidad y Legibilidad:
    
    - Los componentes funcionales son más sencillos y fáciles de entender que los componentes de clase.
    - La sintaxis es más simple, lo que facilita la lectura y el mantenimiento del código.
2. Menos Boilerplate:
    
    - Los hooks eliminan la necesidad de escribir mucho código repetitivo en los componentes de clase.
    - Por ejemplo, no necesitas definir un constructor o llamar a `super(props)`.
3. Reutilización de Lógica:
    
    - Los hooks te permiten reutilizar lógica entre componentes.
    - Puedes crear tus propios hooks personalizados para compartir funcionalidad común en diferentes partes de tu aplicación (Más adelante revisaremos esto en detalle)
4. Manejo del Estado Simplificado:
    
    - Antes de los hooks, el manejo del estado en componentes funcionales era limitado.
    - Con `useState`, puedes manejar el estado local de manera más sencilla.
5. Efectos Secundarios:
    
    - El hook `useEffect` reemplaza varios métodos del ciclo de vida de los componentes de clase.
    - Puedes realizar efectos secundarios (como llamadas a APIs o suscripciones) dentro de un componente funcional.
6. Mejor Rendimiento:
    
    - Los componentes funcionales con hooks pueden ser más eficientes en términos de rendimiento debido a su menor sobrecarga.

En resumen, los componentes funcionales con hooks son la elección más común hoy en día debido a su simplicidad, legibilidad y capacidad para manejar el estado y los efectos secundarios de manera más eficiente.