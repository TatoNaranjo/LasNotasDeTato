El proceso detrás de una petición y una respuesta dentro de un modelo Cliente-Servidor usando el protocolo HTTP 1.1 enfatiza el recibimiento de los datos por medio de un formato de texto, sin embargo, uno de los muchos problemas que se presentan con esto, es que los datos que se tienen que enviar son demasiados y con la llegada de nuevos dispositivos y nuevas conexiones de internet lo que se desea es que se envíe la menor cantidad de datos pero obteniendo los mismos resultados.

Gracias a esto, una de las primeras implementaciones en el protocolo HTTP versión 2 es el algoritmo ***GZIP***, el cual comprime el cuerpo de la respuesta para que la cantidad de información que tiene que recibir el usuario sea menor. Otra de las mejoras es que los encabezados de la petición y de la respuesta ya no se mandan como un texto plano sino como un formato binario, y se implementa un nuevo algoritmo llamado ***HPACK*** que lo que busca es comprimir dichos encabezados para que pesen menos de lo que ya pesaban en el formato binario. Además, TLS se implementa por defecto en la versión 2.

## Encabezados Stateful

Cuando mandamos un encabezado al navegador y este lo interpreta para mandar a llamar a un recurso, trae otro encabezado y es probable que este tenga la misma información que el anterior. Por lo tanto, el protocolo HTTP versión hace que nuestro navegador llame únicamente a los encabezados que cambien con respecto a la petición anterior.

## Server Push

En el protocolo HTTP versión 1, los recursos que necesitaba el cliente para cargar el recurso eran enviados de uno en uno luego de hacer la petición, sin embargo con la llegada de la versión 2 de HTTP, esto cambió. Ahora, luego de que el cliente haga la petición, el servidor envía todos los archivos que necesita el cliente de una vez. El servidor puede enviar ciertos recursos al cliente antes si quiera sean solicitados, pues consigue analizar el código HTML y saber la mejor manera de cargar la página web, haciendo que no sea necesario gastar tiempo pidiendo todos los recursos.


