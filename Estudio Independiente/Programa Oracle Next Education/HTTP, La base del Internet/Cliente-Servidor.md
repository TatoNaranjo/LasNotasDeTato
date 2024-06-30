El protocolo HTTP no guarda ningún estado o información sobre nuestros datos o aquellos paquetes que viajan a través de la red, es por esto que entonces nos debemos preguntar: ¿Cómo es que las páginas web retienen nuestra información luego de iniciar sesión a un sitio?.

HTTP es stateless, esto significa que cada petición que el cliente haga al servidor es única, por lo que no revisa la información que mandaste anteriormente. Es por esto que en cada paquete se debe especificar otra vez la información de quienes somos y hacia donde estamos apuntando.

El flujo que se sigue después de enviar nuestro paquete con la información de login a un sitio, consiste en que el servidor verifique si somos un usuario activo, y en base a eso si lo somos, genere un identificador y lo regrese al navegador. Una vez que ese identificador esté en el navegador, se enviará hacia el servidor cada que hagamos una nueva consulta como si fuera un pase de entrada. Esto quiere decir que el hecho de iniciar sesión dentro de una página tiene la finalidad de obtener un identificador único que nos haga ser reconocidos dentro de la página para obtener un acceso específico.

## Cookies

Cuando hablamos de **Cookies** nos referimos a **Cookies HTTP** o **Cookies web**. Una cookie en un pequeño archivo de texto, normalmente creado por la aplicación web la cual guarda información sobre el usuario en el navegador.

La información que se guarda depende de la aplicación, puede ser las preferencias del usuario, artículos guardados en el carrito de compras o en el identificador del usuario.

Una cookie puede ser manipulada y hasta borrada por el navegador y cuando se guarda en el navegador queda asociado a un dominio, es decir podemos tener una cookie para aluracursos.com y otra para facebook.com, cabe resaltar que una aplicación web puede tener diferentes cookies asociadas.

Las cookies son identificadores de tipo clave-valor, por lo que dentro de nuestros navegadores podemos tener múltiples identificadores o llaves, a las cuales el servidor les asignará un valor. En el ejemplo que estamos usando, si eliminásemos las cookies de nuestras credenciales de acceso y recargásemos la página web, tendríamos que volver a iniciar sesión dentro de la página o la plataforma porque el servidor no encuentra nuestro identificador único.


### ¿Por qué debemos tener cuidado al aceptar cookies?

> Las cookies van más allá de una simple credencial de acceso, pueden definir tus hábitos de consumo, tus gustos y demás aspectos dentro de una página para crear una experiencia personalizada. Es por esto que en algunas páginas encontrarás un aviso que preguntará si quieres permitir todas las cookies o no dentro del sitio web. 
> 
> ***ES IMPORTANTE SABER QUÉ ESTAMOS ACEPTANDO ANTES DE INGRESAR A UN SITIO WEB.***

El peligro de aceptar cookies sin pensarlo radica en la recolección de nuestros datos por parte de diferentes páginas. Hay tres puntos importantes por los que se nos pide estar conscientes de las cookies: La privacidad de los datos, la transparencia de los mismos y el control de las cookies.

Muchas cookies, especialmente las de terceros (también llamadas cookies de seguimiento o tracking cookies), pueden rastrear nuestra actividad a través de diferentes sitios web. Esto permite a las empresas de publicidad crear un perfil detallado de nosotros y mostrarnos anuncios dirigidos. La recopilación masiva de datos puede comprometer nuestra privacidad. Los datos pueden ser utilizados no solo para publicidad, sino también para otros fines menos trasparentes o éticos. también, aunque es menos común, las cookies también pueden ser explotadas por ciberdelincuentes para acceder a nuestras sesiones en línea si no se manejan correctamente, lo que podría llevar a ataques de secuestro de sesión (session hijacking).

### Cómo protegerse

- **Configurando nuestro Navegador**: Muchos navegadores permiten gestionar las cookies, bloqueando las de terceros o borrándolas automáticamente después de cada sesión.
    
- **Extensiones de Privacidad**: Utilizar extensiones de navegador que bloquean rastreadores y cookies, como uBlock Origin o Privacy Badger.
    
- **Aceptar solo las Necesarias**: Cuando un sitio web nos pida aceptar cookies, podemos optar por aceptar solo las cookies esenciales y rechazar las de seguimiento.