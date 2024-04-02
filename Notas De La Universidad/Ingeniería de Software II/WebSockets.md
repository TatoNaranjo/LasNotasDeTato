Herramienta primordial para crear el proyecto de [[Ingeniería de Software II]].

Redactado Por: `TatoNaranjo`
# Definición
Es un protocolo que define las reglas de comunicación entre diferentes hosts de la capa de aplicación.

Normalmente, el proceso de comunicación mediante el protocolo de *HTTP* dicta que el cliente manda una solicitud a un servidor, y este arroja una respuesta al cliente de nuevo. Sin embargo, un servidor no puede enviarle una respuesta al cliente por si mismo debido a que el cliente debe de enviar una solicitud primero. Esto, puede ser una desventaja para el cliente debido a que si no realiza múltiples solicitudes, estará trabajando con información mayormente desactualizada.  

![[protocoloHTTP.png]]

Los WebSockets nos dan la posibilidad de que el servidor envíe información al cliente sin necesidad de una petición.

# Ejemplos
### Necesidades en Chat
El chat es un ejemplo interesante para aplicar WebSockets debido a que nosotros al enviar un mensaje siempre estaremos esperando una respuesta, sin embargo es poco óptimo el hecho de tener que estar recargando la aplicación para recibir datos nuevos.

En este ejemplo, hay varios clientes que están conectados a un servidor, entonces, y uno de estos clientes decide enviar un mensaje. Inmediatamente, después de que el mensaje llega al servidor, el mismo es el encargado de transmitir el mensaje a todos los demás clientes.

![[explicaciónWebSockets.png]]

> Al momento de hacer una conexión entre clientes para alguna aplicación (Llámese Videojuegos, Chats, Etc ) No queremos hacer una conexión directa entre cliente y cliente. 
> 
> ***Toda conexión pasa primero por un servidor*** debido a que si uno de los hosts pierde conectividad, queremos que recupere los datos del servidor apenas se reconecte.

# Concepto y Uso
A diferencia del protocolo HTTP, los WebSockets están diseñados específicamente para mantener una conexión bidireccional persistente entre el cliente y el servidor. A través de esta herramienta el cliente puede enviar peticiones al servidor con normalidad en cualquier momento, y el servidor puede enviar datos al cliente por iniciativa propia en cualquier momento.

## Tipos de Solicitudes
### Solicitud de Ping
Cuando estemos creando algunas aplicaciones vamos a estar trabajando como algo que se conoce como *Ping Pong* o solicitud de ping. Esto significa que el cliente hará una conexión de *ping* para comprobar si hay una conexión existente con otra computadora, y luego el servidor responderá con un *pong* que determinará la latencia que existe entre en la conexión.

### Cierre de conexión
Una conexión se termina con una trama de control especial del tipo cierre. Esto quiere decir que cualquiera de las dos partes puede terminar una conexión por iniciativa propia. 

Por ejemplo, si un cliente envía un mensaje de cierre `close` a un servidor, éste va a responder con una trama de control de cierre `close` para terminar la conexión.

A su vez, este sistema está diseñado para que una conexión pueda terminar si un cliente decide irse (Cerrando la página web o Desinstalando la aplicación), por lo que no necesariamente se recurre a una petición por parte del cliente para crear un cierre de conexión. 

> Los **IDs*** de los WebSockets son efímeros y volátiles. Esto quiere decir que cada vez que un cliente recarga un navegador, se genera elimina el anterior token y se genera uno nuevo. Por lo tanto, querer almacenar un ID de un WebSocket no es conveniente.


> Consejo de Fernando: Si queremos trabajar WebSockets, es mejor hacerlo con la implementación nativa del navegador, es decir, sin descargar más librerías.


**Actualmente, todos los navegadores soportan el uso de WebSockets, incluso hasta las versiones más viejas!!!**
# Fuentes
[# DevTalles PodCast - 134: WebSockets | ¿Qué son y para qué me sirven?](https://www.youtube.com/watch?v=q2kdLki8wRY)


