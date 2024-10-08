---
date: 2024-07-20
---

## Modularización con CSS

Durante la creación de los archivos del proyecto, te habrás encontrado con archivos con nombres como CabeceraLink.module.css y Cabecera.module.css. Pero, ¿qué significa este "module"?

Un módulo CSS es un archivo CSS en el cual todos los nombres de clase tienen un ámbito local de manera predeterminada. De esta forma, puedes reutilizar nombres de clase en diferentes archivos sin que se produzcan conflictos. Por ejemplo, puedo usar la clase container en varios componentes y darle un estilo diferente a cada uno.

React, por defecto, admite este tipo de CSS sin necesidad de instalar nada, utilizando el estándar de nomenclatura de archivos [nombre].module.css. Ahora, imagina que queremos cambiar el color de un botón de confirmación a verde. Irías al archivo Pie.module.css y definirías el color como verde:

```css
.confirmar {
    background-color: green;
}
```

Luego, en el archivo que contiene el botón, necesitarías importar el archivo CSS dándole un nombre:

```javascript
import styles from "./Pie.module.css";
```

Después, para usar estos estilos, seguirías el patrón styles.[nombreDeLaClase], de esta manera:

```xml
<button className={styles.confirmar}>
```

¿Genial, verdad? De esta manera, tenemos un problema menos en lo que respecta a la gestión del CSS.