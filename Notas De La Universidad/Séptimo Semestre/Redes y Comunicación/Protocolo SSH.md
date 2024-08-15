SSH son las siglas para Secure Shell, y es un protocolo de red destinado a la conexión con máquinas a las que se accede mediante linea de comandos. Esto funciona principalmente como un método de acceso a servidores remotos mediante una conexión a internet como vía de comunicación. Una de las características más importantes es que su conexión siempre se realiza de manera segura debido a que los datos viajan a través de un túnel de forma encriptada, por lo tanto no puede ser legible por terceros.

**Puerto predeterminado para las conexiones SSH: *22***

## ¿Cómo Funciona?
El protocolo SSH utiliza una arquitectura de tipo cliente-servidor para establecer una conexión segura. Para esto, debemos tener en cuenta que una comunicación mediante el protocolo SSH consta de 3 actores clave:

- **El Cliente SSH:** Es la aplicación que se usa para conectarse a un servidor remoto. Se pueden usar diferentes clientes SSH como por ejemplo, OpenSSH en sistemas Linux o PuTTY en sistemas Windows.
- **El Servidor SSH:** Se ejecuta en el servidor remoto al que intentamos acceder. Este está configurado para aceptar conexiones de tipo SSH y autenticar a los usuarios.
- **Autenticación:** Cuando nos intentamos conectar a un servidor remoto, el cliente SSH y el servidor SSH inician un proceso de autenticación. Normalmente esto implica un nombre de usuario y una contraseña (O una clave SSH). La clave SSH es una forma aún más segura de autenticación, por lo que siempre se recomienda su uso.

## ¿Para qué se utiliza?
Normalmente, gracias a su seguridad podemos utilizar una conexión de tipo SSH con los servidores que necesitamos administrar. La diferencia respecto a otros protocolos como el telnet, es que el protocolo SSH siempre es más seguro.

Sin embargo, aprovechando la seguridad de las comunicaciones, también se utiliza para otros objetivos como:

- **Transferencia de Archivos Segura**: Permite transferir archivos de forma segura entre sistemas locales y remotos utilizando herramientas como el [comando SCP](https://www.arsys.es/blog/utilizar-comando-scp) o [SFTP](https://www.arsys.es/blog/sftp).
- **Creación de Túneles de Red**: SSH se utiliza para crear túneles de datos seguros que redirigen el tráfico de red a través de conexiones SSH, lo que puede ayudar a proteger la comunicación en redes no seguras. Se usan en sistemas como Ngrok, un software que permite a los desarrolladores exponer de manera remota los trabajos, tal como los tienen funcionando en su servidor de desarrollo local.

## Técnicas de cifrado SSH
El protocolo SSH utiliza diferentes técnicas de seguridad para proteger sus conexiones.
### Cifrado Simétrico
El cifrado simétrico es una técnica en la que se utiliza la misma clave tanto para cifrar como para descifrar los datos entre el cliente y el servidor, lo que garantiza su seguridad y confidencialidad.
### Cifrado Asimétrico
En cambio, el cifrado asimétrico utiliza **dos claves**: una **pública** y otra **privada**; en otras palabras, se hace uso de una clave para el cifrado y otra para el descifrado, verificando así la identidad tanto del cliente como la del servidor.

Cuando un cliente se conecta a un servidor, utiliza la clave pública del servidor para cifrar un mensaje que sólo puede descifrarse con la clave privada correspondiente.
### Hashing
El hashing es una técnica que se utiliza para verificar la integridad de los datos transmitidos. El algoritmo toma un conjunto de datos y genera un **valor hash único**, que es una representación de los datos originales.

Este valor se envía junto con los datos a través de la conexión SSH. En el extremo receptor, los datos se vuelven a calcular y se genera un **nuevo valor hash**.

- Si **coincide** con el recibido, se confirma que los datos no se han modificado.
- Si **no coincide**, los datos podrían haber sido alterados y se considera una posible amenaza de seguridad.