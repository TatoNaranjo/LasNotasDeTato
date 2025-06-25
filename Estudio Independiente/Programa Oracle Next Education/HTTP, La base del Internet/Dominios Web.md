---
date: 2024-07-20
tags:
  - Redes
---

Para poder ver un contenido en una página web, muy probablemente accedimos a través de la ruta `https://www.paginaweb.com`, la cual se conoce como una dirección o dominio web que especifica una dirección única con la que podremos acceder a una plataforma.

## Estructura de un dominio

Estos dominios tienen una estructura que se define de la siguiente manera:

- `https:` : Es el protocolo que estamos utilizando para acceder a esta página web.
- `www.`: Es el subdominio de la página web, que hace referencia a ***worldwide web***.
- `paginaweb`: Es el nombre del dominio, que se puede llamar de cualquier forma.
- `.com`: Es la extensión de la página, en este caso es .com porque hace referencia a comercial, pero pueden existir muchas formas de nombrar a una extensión.

## Para qué sirven estos dominios?

Los computadores no tienen en cuenta cuál es el nombre del dominio web debido a que se comunican a través de números, que en este caso conforman una ***dirección IP*** que permite acceder a un lugar específico de internet.

Si escribimos una dirección IP válida en nuestro navegador vamos a lograr acceder a una página web, y esto se logra mediante un DNS (o Domain Name Service), el cual es el que recibe la petición del cliente y verifica la dirección IP que tiene asignado el dominio que acabamos de escribir. 

Hay que tener en cuenta que estas direcciones IP pueden cambiar, pero en este caso, lo único que le interesa a un DNS para funcionar es saber cual es el nombre del dominio.

## URI O URL?

Muchas veces los desarrolladores utilizan las siglas URI (Uniform Resource Identifier) para hacer referencia a las direcciones web. Algunos otros prefieren las siglas URL (Uniform Resource Locator), y algunos otros hacen una mezcla de ambas definiciones. Hay una confusión en el mercado al respecto que inclusive desarrolladores con más experiencia aún no saben responder y es cómo explicar la diferencia. ¿Cuál es la correcta?

De forma generalizada, podemos decir que una ***URI*** y una ***URL*** en el contexto del desarrollo web son prácticamente lo mismo, podemos utilizarlas para hacer referencia sobre las direcciones web. Sin embargo, si nos queremos ir más hacia los detalles, podemos decir que una URL es una URI, sin embargo no todas las URIs son URLs. Existen URIs que identifican un recurso sin tener que definir la dirección o algún protocolo, en otras palabras, *una URL representa una identificación* de un recurso (***URI***) a través de una dirección, mas no todas las identificaciones son URLs.