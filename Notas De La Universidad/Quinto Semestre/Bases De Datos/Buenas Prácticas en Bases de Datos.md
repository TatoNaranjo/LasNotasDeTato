---
date: 2024-10-13
tags:
  - BaseDeDatos
---
Son estrategias, técnicas u opciones que permiten optimizar nuestra base de datos, software... etc.

### Buenas Prácticas Para La Gestión de Bases de Datos

- Para conectar un sistema, debemos crear un usuario funcional que solo tenga privilegios de CRUD para el esquema que va a utilizar. Normalmente, cuando trabajamos con otras personas debemos denegarles los privilegios de `DROP` en una base de datos para evitar que pasen errores no deseados.
- Hay que limitar el privilegio al mínimo necesario para el acceso y funciones de los usuarios en una Base de Datos.
- Para todo cambio que se haga en una Base de Datos, debe de haber una actualización en el diagrama de la Base de Datos.
- Debemos deshabilitar el usuario Super Administrador, sa, root o toor. Así como también cambiar la contraseña por defecto.
- Para almacenar las contraseñas, debemos utilizar métodos de hashing a nivel de aplicación (Por medio de un lenguaje de programación) en vez de los algoritmos que traen las bases de datos por defecto.
- Debemos revisar periódicamente el espacio en disco y los logs de la base de datos en búsqueda de errores y controles frecuentes.
- Antes de hacer un cambio en una Base de Datos debemos realizar un Backup.

### Buenas Prácticas Para La Nomenclatura Del Esquema De La Base de Datos

- **Definir un idioma general para nombrar el esquema de la base de datos, como los campos, las tablas... Etc.**: Esto se hace con la finalidad de no generar confusiones dentro de las nomenclaturas por alternar entre idiomas para definir diferentes partes de un esquema de bases de datos.
- **El nombre de la base de datos debe ir en mayúscula**: Por nomenclatura general, cuando creamos una base de datos su nombre debe de ir en mayúscula y en snake case. Por ejemplo: **MI_BASE_DE_DATOS**.
- **El Nombre de las tablas debe ir en Mayúscula o en Pascal Case y sin utilizar espacios**: Así mismo, el nombre de las tablas debe de ser descriptivo.
- **Si la relación entre las tablas es de muchos a muchos, se deben mostrar las relaciones**: Un ejemplo puede ser: **VENDEDOR_CLIENTE**.
- **Todas Las Tablas Deben Tener una Primary Key**: Esto se debe a que cada tabla debe de tener un identificador único, que normalmente es el campo denominado como `id` dentro de la tabla.
- **La Primary Key de Todas Las Tablas Debe de Ser un INT o un BIG-INT**: Esto debido a que normalmente, es mucho más sencillo hacer identificadores únicos con números porque se tiene la certeza de que no se van a repetir. Por el contrario, si la Primary Key de una Tabla fuese un campo de tipo cadena, se corre el riesgo de que hayan 2 identificadores iguales.

### Buenas Prácticas Para Las Definiciones De Campos

- **Para Fechas**: Un campo de tipo `varchar(10)` que haga referencia al formato `AA-MM-DD`.
- **Para Horas**: Un campo de tipo `varchar(5)` que haga referencia al formato `HH:MM`
- **Para Timestamp**: Un campo de tipo `varchar(8)`que haga referencia al formato `HH.MM.SS` o un campo de tipo `BigInteger`.
- **Para Booleanos**: Un campo de tipo `bit`.
- **Para Textos Largos**: Un campo de tipo `varchar(MAX)`que equivale a 26B de información en SQL SERVER.
- **Para Decimal**: Un campo de tipo `float` con precisión habilitada o por defecto.
- **Para Cualquier Numero Menor a 127**: Un campo de tipo `tinyint`. Sin embargo, si se requiere cambiar en un futuro, podemos optar por un `int` o un `bigint`.

