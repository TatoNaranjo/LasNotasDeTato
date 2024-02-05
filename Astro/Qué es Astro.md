```table-of-contents
```

## Concepto

Es un framework para la creación de páginas web centrado en el contenido. Su arquitectura se basa principalmente en generar contenido HTML, esto debido a que su estructura principal no tiene JavaScript inicialmente, sino que va generando la que necesita, impactando positivamente en el rendimiento.

[[Astro]] tiene compatibilidad con bastantes librerías de JS que se pueden usar libremente, por lo tanto es beneficioso consultar la documentación.

## ¿Cuándo es recomendable usar Astro?

Su uso está pensado en el contenido frente a la interacción por parte del usuario, como lo pueden ser diferentes páginas como Portafolios, Landing Pages, E-Commerce o Blogs. 

## Arquitectura Astro Islands

La arquitectura de Astro Islands es una arquitectura de front-end basada en componentes. Mejora el rendimiento del front-end de la página ya que busca evitar patrones monolíticos de JavaScript (Es decir, que busca evitar que toda la funcionalidad de una página se centre en un solo archivo de JavaScript).
#### Qué es una Isla?

Una isla es cualquier componente interactivo de UI de la página. Es decir, que una Isla es aquel componente dinámico con el que el usuario puede generar interacción, dentro de una página estática. Al momento de querer generar interacción con el usuario, simplemente se activará esa isla dentro de la página, a esta técnica en la que se basa este patrón de arquitectura se le conoce como hidratación parcial o selectiva. Astro aprovecha dicha técnica para hidratar las islas automáticamente.

#### Cómo se crea una isla?

Inicialmente tienes un componente en el que Astro solo cargará el HTML y el CSS, dejando a el código JavaScript de lado del cliente de manera automática:

```jsx
<MyReactComponent/>
```

Este proceso es lo que optimiza las páginas en Astro y hacer que el rendimiento aumente en buena parte. Sin embargo, si deseas construir un componente interactivo, solo bastará con agregar una directiva `client:*`. Luego de eso, Astro construye y empaqueta el JavaScript del lado del cliente para un rendimiento optimizado.

La interacción es configurada a nivel del componente, es por eso que se pueden manejar diferentes prioridades de carga para cada componente según su uso. Por ejemplo, `client:idle` le dice a un componente que se cargue cuando el navegador se vuelve inactivo, y ``client:visible`` le dice a un componente que se cargue solamente cuando ingrese a un viewport (es decir, el area visible de una página web en el navegador).
