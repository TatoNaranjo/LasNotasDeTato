HTTP (Hypertext Transfer Protocol) es un protocolo de internet que permite la transferencia de información.

## Evolución
- En 1991 surge el protocolo HTTP 0.9
- En 1996 pasa ser un protocolo HTTP 1.0
- en 1999 se crea el protocolo HTTP 1.1 (El cual es el más utilizado en la actualidad).
- En 2015 aparece la versión HTTP 2.0 (La cual es una mejora en términos de transferencia de información).
- En 2018 aparece la versión HTTP 3.0 (Esto debido a un cambio en el protocolo respecto a la forma en la que se realiza la transferencia.)

## De qué nos sirve saber como funciona HTTP?

Para poder visitar cualquier página web necesitamos de un navegador. El navegador por medio del internet se conecta con una máquina remota, a la cual se le solicita una dirección que contiene la página web que queremos visitar. 

**A Este modelo se le conoce como Cliente-Servidor**. El cliente sería nuestro navegador y el servidor, aquella computadora que nos va a entregar lo que queremos ver. Sin embargo, para que esta conexión pueda llevarse a cabo necesitamos saber que existen unas reglas de comunicación. El protocolo HTTP serían estas reglas de comunicación que nos permiten saber de qué manera nos estamos comunicando desde un cliente hacia un servidor y qué datos se tienen que recibir a cambio.

HTTP es independiente de la plataforma, por lo que no importa qué lenguaje de programación o de diseño se use, debido a que es el lenguaje común que usan todas las herramientas para conectarse en la internet. Lo que hay que tener en cuenta es que tenemos a un cliente y un servidor, y logramos que ambos se conecten a través del protocolo HTTP.

## Peer To Peer

Peer to peer es otro modelo de comunicación que pudimos haber utilizado si alguna vez llegamos a descargar algún *torrent*. El modelo ***Cliente-Servidor*** no es el único modelo de comunicación en red, y tampoco es siempre el más adecuado. Por ejemplo, imaginemos que necesitamos contar las letras de 20 palabras. En el caso del modelo cliente servidor, ¿el que hará ese trabajo será el servidor, verdad? Si necesitamos contar las letras de un millón de palabras puede llegar a ser mucho trabajo para el servidor.

El modelo ***Cliente-Servidor*** intenta centralizar el trabajo en el servidor, aunque esto puede generar sobrecargas. Si cada cliente pudiera ayudar en el trabajo, es decir, asumir un poco de responsabilidad del servidor, podría ser mucho más rápido. Esa es la idea de P2P, en donde ya no hay una división entre *Cliente-Servidor*, porque cada cliente también es un servidor y viceversa. 

Esto es útil cuando queremos distribuir un trabajo o necesitamos bajar algo de varios lugares diferentes. Usando alguna aplicación de Torrent, el protocolo utilizado no es el HTTP, pero sí el protocolo P2P como *BitTorrent* o *Gnutella*.