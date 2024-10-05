Para depurar las peticiones de nuestro navegador debemos inspeccionar la página web, e ir a la sección de network en la barra lateral superior. Aquí, podremos ver todo el tráfico de red y las peticiones que está realizando nuestro navegador.

Desde nuestro navegador accedemos a una página mediante el protocolo GET y el servidor nos devuelve una respuesta con un código numérico y un destino que será al que nos tenemos que dirigir después. Si todo el proceso de conexión fue exitoso, el código que nos debería de aparecer sería el código 200.

## Códigos de Estado

Estos códigos son unos indicadores del estado en el que se encuentra nuestra petición. Pueden ser nuestra referencia para conocer si los paquetes se han enviado bien o el proceso se ha interrumpido por algún motivo.

Uno de los códigos de estado más populares y de los que más hemos oído hablar es el mítico ***error 404*** que nos indica que el recurso que estamos buscando dentro de la página no existe.

Otro código de estado que nos puede aparecer es el ***301 - Moved Permanently***, que nos indica que el recurso que estábamos buscando ya no se encuentra en esa dirección URL. Dentro del encabezado de la respuesta podemos ver hacia donde se ha movido el recurso, es decir, su nueva dirección.

Cada código de estado pertenece a una familia que diferencia al tipo de código de estado, a continuación te dejaré su respectiva clasificación:

- 1XX - INFORMATIVOS
- 2XX - RESPUESTA SATISFACTORIA
- 3XX - REDIRECCIONES
- 4XX - ERROR DEL CLIENTE
- 5XX - ERROR DEL SERVIDOR

### Algunos códigos de estado

- 100 - CONTINUE
- 200 - OK
- 301 - MOVED PERMANENTLY
- 404 - NOT FOUND
- 500 - INTERNAL SERVER ERROR

## Parámetros de las peticiones

Cuando necesitamos buscar cualquier cosa a través de internet, podemos ver que nuestra URL se modifica. Esto pasa porque podemos enviar ciertos parámetros a través de la URL, como lo puede indicar este ejemplo: `https://www.youtube.com/results?search_query=lofi`.

Aunque HTTPS mantiene un envío de datos seguro a través de nuestra conexión con el servidor, es importante destacar que los links con consultas como la mencionada anteriormente, son accesibles para cualquier empresa que se encargue de interceptar nuestros datos.

Como bien mencionamos anteriormente, cada vez que queremos obtener una dirección o recurso específico dentro de una página web utilizamos una petición ***GET***, sin embargo, cuando se trata de enviar nuestros datos a través de un formulario estamos haciendo uso de una petición ***POST***. Normalmente, el estado de esta petición suele ser una petición de tipo 300, que indica un redireccionamiento. Utilizamos el método GET para mandar los parámetros en la URL, cosa que no sería segura en la UR, mientras que el método POST manda los parámetros en el cuerpo de la petición.

Cuando enviamos parámetros en la URL, debemos iniciar con ?, el nombre del parámetro y un =, para separar el nombre del parámetro de su valor:

```ruby
?nombre_del_parámetro=valor
```

Cuando queremos enviar más parámetros utilizamos & para separarlos.

```ruby
?nombre_del_parámetro=valor&nombre_del_parámetro&valor
```