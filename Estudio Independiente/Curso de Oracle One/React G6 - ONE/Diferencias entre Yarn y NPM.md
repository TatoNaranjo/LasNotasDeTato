¿Sabes cuándo necesitas desarrollar un proyecto con JavaScript y reutilizar código listo para usar de paquetes y dependencias?, como esos archivos en la famosa carpeta de módulos de nodos. Entonces, NPM y Yarn son dos tecnologías encargadas de administrar y ejecutar estos paquetes y dependencias. Pero, ¿cuál será la diferencia entre cada uno de estos gerentes? ¿Hay uno mejor que el otro?

##### **¿Para qué sirven?**

Como se mencionó anteriormente, ambos son administradores de paquetes y dependencias en proyectos de JavaScript. Pero, ¿cómo y por qué exactamente sucede esto? en muchos proyectos es común utilizar algunos paquetes y dependencias existentes para facilitar nuestro desarrollo, ya sea en JavaScript o en cualquier otro lenguaje. Un ejemplo es el propio React, una famosa biblioteca que se utiliza cuando queremos desarrollar páginas web creando componentes de aplicación.

Aún usando React como ejemplo, si tuviéramos que actualizarlo manualmente cada vez que aparece algo nuevo, o incluso instalar cada una de las dependencias necesarias que van surgiendo a lo largo del desarrollo del proyecto, nos daría mucho trabajo y posibilidades para cometer errores y olvidar algo sería muy probable. Precisamente por eso han surgido los gestores de paquetes y dependencias, que con un solo comando pueden hacerlo todo por nosotros.

##### **¿Cómo se gestiona?**

Tanto NPM como Yarn utilizan un archivo llamado package.json, donde se describen los paquetes y las dependencias necesarias para el proyecto, con sus versiones. Para crear este archivo, solo se usa el comando `npm init` o `yarn init`. Así, cuando ejecutamos el comando `npm install`, en el caso de NPM, el hilo en el caso de Yarn, todo lo necesario para que el proyecto funcione correctamente ya está actualizado e instalado. Además, siempre que necesitemos instalar un nuevo paquete o dependencia durante el desarrollo del proyecto, también podemos hacerlo con solo una línea de comando, con `npm install` o `yarn add` . Genial, ahora entiendo para qué sirven estas dos tecnologías y cómo funcionan, pero entonces, ¿cuál sería la diferencia en usar cada una de ellas de todos modos?

###### **NPM**

Siendo actualmente el administrador de paquetes predeterminado para Node.js, NPM (Node Package Manager) es un proyecto de código abierto creado con el objetivo de facilitar el intercambio de códigos escritos en JavaScript. Al día de hoy sigue siendo el que más se utiliza, precisamente porque cuando instalas Node en la máquina, ya está instalado en tu sistema. Pero NPM no solo tiene una CLI (interfaz de línea de comandos) para que solo pueda ejecutar comandos y administrar paquetes y dependencias. También tiene un sitio web donde puede encontrar su documentación y toda la información sobre los paquetes que desee, así como un repositorio donde se almacena una base de datos pública gigante de JavaScript. Sin embargo, este administrador comenzó a presentar algunos problemas, como retraso en el tiempo de instalación o actualización, diferentes versiones de dependencias en las máquinas e incluso seguridad. Entonces, Yarn apareció para solucionar todo eso.

###### **YARN**

Creado por Facebook en colaboración con Google, Exponent y Tilde, Yarn también es de código abierto y se creó con el objetivo de ser más rápido y seguro que NPM. Además, algo interesante de esta herramienta es que te permite instalar paquetes sin conexión, creando un caché en tu máquina, lo que significa que en el futuro ni siquiera necesitarás estar conectado a Internet para instalar paquetes.

##### **Diferencias en la línea de comandos**

Aquí puedes ver la similitud entre las dos herramientas en la práctica, cambiando solo una o dos palabras para realizar la mayor parte de la configuración necesaria entre paquetes y dependencias.

| NPM                   | YARN                   | UTILIZACIÓN                        |
| --------------------- | ---------------------- | ---------------------------------- |
| npm init              | yarn init              | Administrador de inicialización    |
| npm install -paquete- | yarn add -paquete-     | Instalar un paquete en el proyecto |
| npm update -paquete-  | yarn upgrade -paquete- | Actualizar un paquete de proyecto  |
| npm remove -paquete-  | yarn remove -paquete-  | Eliminar un paquete del proyecto   |

##### **Después de todo, ¿cuál es mejor?**

Por mucho que Yarn haya surgido con el objetivo de solucionar todos los problemas encontrados con NPM, este último se ha ido actualizando cada día más, hasta el punto en que su diferencia en rendimiento y seguridad con Yarn es cada vez menor. Además, NPM ya se instala automáticamente con Node.js, lo que lo hace muy fácil de usar. Por lo tanto, ambas tecnologías son muy utilizadas por toda la comunidad de JavaScript, por lo que debes analizar cuál es prioritaria en tu proyecto y cuáles son tus preferencias. Recordando que (hasta ahora) ambas son compatibles, lo que significa que puedes, durante el desarrollo de un proyecto, cambiar entre estas dos herramientas con la configuración adecuada, si es necesario.