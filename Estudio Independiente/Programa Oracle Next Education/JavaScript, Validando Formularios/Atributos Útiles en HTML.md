## Tipos de Input

`<input name="nombre" id="nombre" class="campo__completo" />`

### Type
El atributo `type` nos permite cambiar el tipo de input que queremos mostrar dentro de un formulario, esto se hace para evitar que por ejemplo, el usuario escriba letras cuando se le soliciten solo números, o para verificar que el campo de correo electrónico si contenga realmente una dirección de correo electrónico.

```html
<input name="nombre" id="nombre" class="campo__completo" type="text"/>
```

| Tipo     | Descripción                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------- |
| text     | Define un campo de una sola línea de texto.                                                    |
| email    | Para contener direcciones de correo electrónico.                                               |
| password | Define un campo para contraseñas.                                                              |
| button   | Define un botón.                                                                               |
| checkbox | Permite seleccionar varias opciones o ninguna.                                                 |
| radio    | Permite seleccionar una opción entre varias.                                                   |
| file     | Define un campo para subir ficheros.                                                           |
| date     | Permite seleccionar fechas.                                                                    |
| submit   | Define un botón para enviar los datos del formulario.                                          |
| reset    | Define un botón para resetear todos los valores del formulario a los valores por defecto.      |
| number   | Permite valores numéricos. Se puede restringir los números aceptados usando algunos atributos. |
| tel      | Permite el ingreso de números telefónicos.                                                     |

### MaxLength/MinLength
Los atributos `minlength` y `maxlength` nos permiten controlar cuántos caracteres queremos que el usuario escriba en nuestros formularios. 

```html
<input name="nombre" id="nombre" class="campo__completo" type="text" minlength="3"/>
```

### Required
Tal y como su nombre lo indica, este atributo hace referencia a que es requerido llenar el campo para poder enviar el formulario.

```html
<input name="nombre" id="nombre" class="campo__completo" type="text" minlength="3" required/>
```

## Patrones con Regex

Dentro de la etiqueta de input en HTML vamos a añadir un atributo llamado `pattern`, el cual indica la forma en la que un usuario puede escribir el texto. Esto nos sirve por ejemplo, cuando queremos que el usuario escriba una identificación que puede estar conformada únicamente por letras y puntos.

En el siguiente ejemplo, estamos indicando que primero el usuario tiene que escribir dos dígitos `d{2}` , luego un guión o una barra `[-\/]`, luego tiene que escribir 8 dígitos `d{8}`, luego otro guión o una barra `[-\/]` y finalmente otro dígito verificador `d{2}`:
```html
<input
name="cuil"
id="cuil"
class="campo__completo campo__completo--menor"
type="text"
minlength="10" maxlength="20"
pattern = "\d{2}[-\/]?\d{8}[-\/]?\d{1}"
/>
```

### Desglosando el regex

- `\d{2}` -> Vamos a agregar dos dígitos que pueden ir del 0 al 9.
- `[-\/]?` -> Guión o barra opcional (que es permitida por el signo de interrogación).
- `\d{8}` -> Vamos a agregar ocho dígitos que pueden ir del 0 al 9.
- `\d{1}` -> Vamos a agregar un dígito que puede ir del 0 al 9.