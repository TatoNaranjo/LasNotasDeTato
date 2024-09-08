# ¿Qué es VIM?

>Recuerdo que una vez, mientras veía un Screen Cast de un programador competitivo, me di cuenta de que en ningún momento utilizaba su mouse para escribir código y lo único que hacía era recurrir a comandos para cambiar ocurrencias en su código en cuestión de segundos. Acto seguido, descubrí el mejor editor de texto que he probado nunca.

Vim (Vi Improved) es un editor de texto gratis y **Open-Source**, que surgió como un clon de un editor anterior llamado Vi. En 2015 la plataforma de Stack Overflow por medio de una encuesta indicó que Vim se había posicionado como el tercer editor de texto más popular del mundo, además, en 2018 fue uno de los editores más populares en la página de Linux Journal.

VIM es un editor de texto basado en modo, lo que significa que utiliza diferentes modos para realizar distintas operaciones como insertar texto, navegar, o ejecutar comandos. A diferencia de otros editores de texto, VIM no depende de menús o clics del ratón, sino de comandos rápidos que el usuario puede teclear directamente, lo que permite una edición más rápida y eficiente. Lanzado en 1991 por Bram Moolenaar, VIM es una mejora de VI, un editor de texto para sistemas Unix.

El enfoque minimalista de VIM hace que sea extremadamente rápido y liviano, ideal para entornos donde los recursos son limitados o la eficiencia es primordial. Es ampliamente utilizado por desarrolladores, administradores de sistemas y cualquier persona que trabaje con grandes cantidades de texto. VIM se encuentra disponible en casi todos los sistemas operativos, desde Linux y macOS hasta Windows, y es conocido por su alto nivel de personalización.

>Suelo utilizarlo como mi editor de texto principal incluso por encima de Visual Studio Code por lo rápido que funciona y los atajos de teclado que me ayudan a evitar el uso del ratón (Ya hablaremos de ello más tarde).
# ¿Por qué Usar VIM?

Aprender a usar VIM puede mejorar tu eficiencia de trabajo significativamente. Como editor basado en teclado, VIM te permite realizar tareas de edición sin necesidad de levantar las manos del teclado, lo que ahorra tiempo y reduce el esfuerzo físico. Además, con su potente sistema de comandos, puedes realizar acciones complejas de edición que en otros editores requerirían múltiples pasos o complementos adicionales.

Además, VIM está presente en casi todos los sistemas operativos y entornos de desarrollo, lo que lo hace una herramienta universal para cualquier programador o administrador de sistemas. Su personalización casi infinita y el amplio soporte de la comunidad también lo hacen ideal para quienes buscan una herramienta que se adapte perfectamente a su flujo de trabajo. Aprender VIM no solo es aprender un editor de texto, sino dominar una herramienta que te acompañará en cualquier entorno de desarrollo.

# Primeros Pasos Con VIM

Para comenzar con VIM, primero necesitarás instalarlo. En la mayoría de las distribuciones de Linux, VIM ya viene preinstalado. Si no es así, puedes instalarlo fácilmente usando el gestor de paquetes de tu sistema, como `apt-get install vim` en Debian/Ubuntu o `yum install vim` en Red Hat/CentOS. En macOS, puedes usar Homebrew con `brew install vim`, y en Windows puedes optar por versiones como GVim que añaden una interfaz gráfica.

Una vez instalado, es esencial comprender los modos básicos de VIM: Normal, Inserción y Comando. El **modo Normal** es donde VIM comienza por defecto, permitiendo movimientos del cursor y ejecución de comandos. El **modo de Inserción** es donde puedes escribir y editar texto, y se accede a él presionando `i`. El modo Comando, al cual se accede con `:` desde el modo Normal, permite ejecutar órdenes más avanzadas como guardar archivos o buscar texto.

# Navegación básica

Una de las habilidades clave para ser eficiente en VIM es aprender a navegar rápidamente por un documento. A diferencia de otros editores que utilizan las teclas de flecha, VIM emplea las teclas `h`, `j`, `k` y `l` para moverse a la izquierda, abajo, arriba y derecha, respectivamente. Esto te permite mantener las manos en la fila de inicio del teclado, ahorrando tiempo. También puedes usar comandos como `gg` para ir al inicio del archivo o `G` para ir al final.

Para una navegación más avanzada, puedes saltar entre palabras usando `w` para ir al principio de la siguiente palabra o `b` para retroceder al inicio de la palabra anterior. Utilizando `0` te posicionas al inicio de la línea y `$` al final. Estas combinaciones te permiten moverte de manera rápida y eficiente dentro del archivo sin necesidad de cambiar al ratón.

# Edición de texto

Editar texto en VIM es bastante intuitivo una vez que entiendes los comandos básicos. Para insertar texto, simplemente presiona `i` para entrar en el modo de inserción, donde puedes comenzar a escribir directamente. Para eliminar caracteres, usa `x` para borrar un carácter bajo el cursor o `dw` para borrar una palabra. Puedes eliminar líneas enteras con `dd` y restaurarlas con `u` si cometes un error.

Copiar, cortar y pegar texto en VIM se hace utilizando los comandos `y` (yank) para copiar y `p` para pegar. Para cortar texto, utiliza `d` combinado con el movimiento deseado, por ejemplo, `dd` para cortar una línea o `d$` para cortar hasta el final de la línea. Estos comandos pueden parecer extraños al principio, pero permiten una edición extremadamente rápida y precisa una vez que te acostumbras.

> La clave de aprender los comandos de navegación está en mirarlos y utilizarlos hasta que se te haga normal. Para ello te recomiendo revisar la [Página de Atajos de VIM](https://vim.rtorr.com/)

# Búsqueda y reemplazo

Buscar texto en VIM es una habilidad esencial para trabajar con archivos grandes o complejos. Para buscar una palabra o frase, simplemente entra en el modo Comando presionando `:` y utiliza `/palabra` para buscar hacia adelante o `?palabra` para buscar hacia atrás. Navegar entre los resultados de búsqueda se hace con `n` para siguiente y `N` para el anterior.

Reemplazar texto también es sencillo con VIM. Usa el comando `:s` para sustituir texto en la línea actual, como `:s/viejo/nuevo/`, o añade el sufijo `g` para realizar la sustitución en toda la línea. Para realizar un reemplazo global en todo el documento, utiliza `:%s/viejo/nuevo/g`. Con estas herramientas, podrás buscar y reemplazar texto rápidamente sin necesidad de abrir un cuadro de diálogo o menú adicional.

# Trabajando con archivos

Abrir y guardar archivos en VIM es directo y eficiente. Para abrir un archivo, puedes usar `vim nombre_del_archivo` desde la terminal, o desde VIM puedes utilizar `:e nombre_del_archivo` para abrir un archivo específico. Para guardar los cambios realizados en el archivo actual, simplemente escribe `:w`. Si deseas salir de VIM, usa `:q`, y si necesitas guardar y salir al mismo tiempo, utiliza `:wq`.

Cuando trabajas con múltiples archivos, puedes usar el comando `:n` para navegar al siguiente archivo o `:prev` para ir al anterior. También puedes abrir múltiples archivos al mismo tiempo usando `:e nombre_del_archivo`. El uso de buffers y pestañas también facilita la edición simultánea de varios documentos, mejorando tu flujo de trabajo.
# Personalización de VIM
## .vimrc

La personalización de VIM comienza con el archivo `.vimrc`, donde puedes definir configuraciones personalizadas que se cargan cada vez que inicias VIM. Aquí, puedes establecer opciones como el tamaño de tabulación, el número de líneas, el esquema de color y más. Por ejemplo, agregar `set number` al `.vimrc` mostrará números de línea en cada archivo que abras.
## Plugins
Los plugins son otra forma excelente de extender la funcionalidad de VIM. Para principiantes, algunos plugins recomendados incluyen 'nerdtree' para navegación de archivos, 'vim-airline' para una barra de estado más atractiva, y 'fugitive' para integración con Git. Utilizar un gestor de plugins como `vim-plug` o `Vundle` facilita la instalación y actualización de plugins.

# Atajos de teclado imprescindibles

Conocer los atajos de teclado más utilizados en VIM es fundamental para ser eficiente. Comandos como `:w` para guardar, `:q` para salir, `dd` para eliminar una línea, o `yy` para copiar una línea son esenciales en el día a día. También puedes usar combinaciones como `ciw` para cambiar una palabra o `yyp` para duplicar una línea.

Una vez que te sientas cómodo con los comandos predeterminados, puedes crear tus propios atajos de teclado para personalizar aún más tu experiencia. Por ejemplo, puedes mapear `Ctrl + s` para guardar el archivo rápidamente añadiendo `map <C-s> :w<CR>` a tu archivo `.vimrc`. Esto permite que el editor se ajuste a tu flujo de trabajo.

# Técnicas avanzadas

Las macros son una herramienta avanzada en VIM que te permite grabar y reproducir secuencias de comandos, ahorrando tiempo en tareas repetitivas. Para grabar una macro, presiona `q` seguido de una letra (como `a`), realiza las acciones que deseas grabar y presiona `q` nuevamente para detener la grabación. Luego, puedes reproducir la macro con `@a`.

Los registros son áreas de almacenamiento en VIM donde se guarda el texto que copias o cortas. Puedes acceder a diferentes registros utilizando `"` seguido de la letra del registro, como `"ayy` para copiar una línea en el registro "a". Las marcas (`m`) te permiten guardar posiciones específicas en el archivo para volver rápidamente a ellas, utilizando letras para nombrar las marcas, como `ma` para marcar la posición actual como 'a'.

# Consejos para aumentar la productividad

La práctica regular es fundamental para dominar VIM. Trata de utilizar VIM como tu editor principal para editar todo tipo de texto, desde código hasta documentos, para familiarizarte con sus comandos. Cuanto más lo uses, más rápido y cómodo te sentirás. Además, mantener una lista de comandos que desees aprender o practicar puede ayudarte a enfocarte en habilidades específicas.

Además de la práctica, aprovecha los numerosos recursos disponibles para aprender VIM, como tutoriales en línea, libros y cursos. Puedes comenzar con el tutorial interno de VIM (`vimtutor` en la terminal) para aprender los comandos básicos. Luego, expande tu conocimiento explorando recursos avanzados como "Practical Vim" de Drew Neil o tutoriales en YouTube.

# Conclusión

Dominar VIM puede parecer desafiante al principio, pero los beneficios son invaluables. Una vez que comprendas sus comandos y flujos de trabajo, descubrirás que es una de las herramientas de edición más rápidas y poderosas disponibles. Desde una edición de texto más eficiente hasta una personalización profunda, VIM puede revolucionar tu flujo de trabajo diario.

Como próximos pasos, te animamos a seguir practicando y explorando las capacidades de VIM. Experimenta con nuevas configuraciones, explora plugins útiles, y sumérgete en la documentación para aprovechar al máximo esta increíble herramienta. ¡Recuerda, cuanto más practiques, más natural será tu experiencia con VIM!