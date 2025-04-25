---
tags:
  - Redes
date: 2024-07-20
---

Tenemos constancia de que un cliente puede mandar información o un cierto tipo de peticiones a un servidor y este debe otorgar una respuesta al cliente para que una comunicación mediante el protocolo de HTTP se cumpla.

Sin embargo, existe a algún problema por ejemplo, a la hora de enviar datos sensibles como un nombre de usuario y una contraseña a través de un formulario dentro de una página web, debido a que estos datos se envían en un archivo texto plano y estos mismos datos pueden ser interceptados durante el trayecto que siguen para llegar al cliente o al servidor.

***Por esto no es recomendable acceder a una red pública e ingresar datos dentro de un formulario.***

Gracias a esto nace HTTPS y con el, un nuevo protocolo criptográfico llamado TLS (de Transport Layer security o Seguridad de Capa de transporte).

## Cómo Funciona?

Para garantizar la integridad de los datos primero se necesita de una ***entidad***, que es la que permite saber si somos realmente quienes decimos ser; en el mundo de internet a esto se le conoce como un ***certificado digital***. Dentro de este certificado digital se encuentra una ***llave pública***, que es la encargada de cifrar y mantener encriptados esos datos desde que parten de nuestra computadora hasta que llegan al servidor. Así mismo, también debemos saber que el servidor también tiene algo conocido como una ***llave privada***, que es aquella que se encarga de descifrar la información que nosotros enviamos a través de la ruta establecida y que se encuentra protegida por la llave pública.

Las llaves están relacionadas matemáticamente, es decir, lo que fue cifrado por la llave pública sólo podrá ser descifrado por la llave privada. Esto garantiza que los datos cifrados por el navegador(llave pública) sólo podrán ser leídos por el servidor(llave privada). Como tenemos dos diferentes llaves, el método utilizado para cifrar los datos es llamado de **criptografía asimétrica**. Sin embargo, la criptografía asimétrica tiene un problema, es **lenta**.

Por otro lado, tenemos la **criptografía simétrica**, la cual usa la misma llave para cifrar y descifrar los datos, como en la vida real, donde usamos la misma llave tanto para abrir como para cerrar la puerta. La criptografía simétrica es mucho más **rápida** pero no es tan segura. Como existe solamente una llave, ésta será distribuida por los clientes(navegadores) y cualquiera que tenga acceso a esa llave podrá descifrar los datos.

Sin embargo, un aspecto interesante es que ***HTTPS utiliza ambos métodos, tanto el de la criptografía simétrica como el de la asimétrica***.

En el certificado viene una llave pública que pueden usar los clientes, el servidor continúa con la llave privada. Esto es seguro pero lento, es por eso que el cliente genera una llave simétrica “en vivo”, es decir, una llave que solo el navegador y el servidor conocen. Esa llave es **simétrica** y es enviada al servidor utilizando la criptografía asimétrica y es utilizada para el resto de la comunicación.

Entonces, HTTPS **comienza** con criptografía **asimétrica** para **después** cambiar a criptografía **simétrica**. Esa llave simétrica será generada al inicio de la comunicación y será reutilizada en las peticiones siguientes.