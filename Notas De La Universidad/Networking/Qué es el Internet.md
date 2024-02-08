Un concepto que hay que tener claro cuando hablamos de [[Networking]].

Hay dos formas de definir este concepto, la primera es hablando de la capa de hardware y software que compone al sistema en su totalidad. La segunda es hablando de una infraestructura de red que distribuye un servicio a aplicaciones distribuidas.
## Descripción de los componentes esenciales

El Internet es una red de computadores que interconecta a millones de dispositivos informáticos a través del mundo. Al inicio, estos dispositivos se limitaban a ser computadoras de escritorio, estaciones de trabajo de Linux y los servidores cuyo trabajo radica en almacenar y transmitir información como páginas web y correos electrónicos. Sin embargo hoy en día podemos decir que cada vez hay más dispositivos no tradicionales conectándose, como electrodomésticos, gafas, vehículos, relojes, etc. Todo dispositivo que se conecte a internet, acuña el término de **Host** o **Sistema Terminal**.

### ¿Cómo se conectan los Sistemas Terminales entre sí?

Un **Sistema Terminal** se conecta con otro por medio de una red de **Enlaces de Comunicaciones** y **conmutadores de paquetes**. Los enlaces de comunicaciones se componen de diferentes medios físicos como lo pueden ser el cable coaxial, el hilo de cobre, la fibra óptica o el espectro de radio. Estos enlaces pueden transmitir datos a diferentes velocidades, y la **Velocidad de Transmisión** de un enlace se mide en bits/segundo. Cuando un sistema terminal tiene que enviar datos a otro sistema terminal, el emisor segmenta la información y añade bytes de cabecera a cada segmento. Los paquetes de información resultante, conocidos como **paquetes** se envían a través de la red hasta que llegan al sistema terminal receptor, en donde este último realiza un proceso de conversión para volver a ensamblar los datos y obtener los datos originales.

Los encargados de recibir y enviar esta información son los **conmutadores de paquetes**, cuyo proceso consiste en tomar un paquete que recibe por medio de uno de sus enlaces de comunicaciones de entrada, y reenviarlo a través de uno de sus enlaces de comunicaciones de salida. Normalmente los conmutadores de paquetes suelen venir en muchos modelos, pero los más conocidos suelen ser los **Routers** y los **Switches de Capa de Enlace**.

![[componentesDeInternet.png]]

La secuencia de enlaces de comunicaciones y conmutadores de paquetes que atraviesa una red desde un sistema terminal emisor hasta un sistema terminal receptor se conoce como **ruta** a través de la red.

### Las redes son un sistema de mensajería

Las redes de comunicación de paquetes (que transforman paquetes) se puede definir como una analogía de una red de transporte formada por autopistas, intersecciones y camiones que deben enviar un elemento hacia algún lado.

Imagina que una empresa/fábrica necesita transportar un cargamento de mercancía a un almacén de destino que se encuentra a miles de kilómetros. En esta fábrica, cada cargamento se divide y se carga en flotas de camiones. Cada camión lleva la información de forma independiente a través de las autopistas y las intersecciones siguiendo su propia ruta. Cuando todos llegan al almacén de destino, la mercancía se vuelve a juntar con el resto del cargamento correspondiente al lote de envío. De cierta forma, los paquetes son como los camiones, los enlaces de comunicaciones son como las autopistas o las carreteras, los dispositivos de conmutación son como las intersecciones y los sistemas terminales son el equivalente de las empresas/fábricas. Al igual que un camion sigue una ruta a través de una carretera, un paquete sigue una ruta a través de una red de computadores

### ¿Cómo accede un Sistema Terminal a Internet?

Los sistemas terminales acceden a por medio de un **Proveedor de Servicios de Internet**, o **ISP** (***Internet Service Provider***). Los ISP se pueden dividir en diferentes categorías según el medio al cual le prestan un servicio. Por ejemplo, están los ISP residenciales, ISP corporativos, ISP universitarios, ISP que proporcionan acceso inalámbrico en lugares públicos como aeropuertos, cafeterías, hoteles, o los ISP de datos móviles, que proporcionan acceso móvil a nuestros teléfonos inteligentes y otros dispositivos.

Cada ISP es en sí mismo una red de conmutadores de paquetes y enlaces de comunicaciones. Los ISP ofrecen una amplia variedad de tipos de acceso a la red, como pueden ser algunos: El acceso de ancho de banda residencial mediante modem o cable DSL, el acceso LAN (***Local Area Network***, o ***Red de Area Local***) de alta velocidad, y el acceso inalámbrico para dispositivos móviles. 

> Los ISP también proporcionan una conexión a internet a los proveedores de contenido que ofrecen un servicio, permitiendo conectar su sitio web y sus servidores de video directamente a la internet. 

El objetivo de Internet es conectar a los diferentes Sistemas Terminales entre sí, y debido a que los ISP son en sí un sistema terminal, necesitan interconectarse los unos a los otros entre sí. Todos estos ISP mencionados anteriormente son de un nivel inferior, por lo que se conectan a una ISP de nivel superior a escala nacional e internacional, como Level 3 Communications AT&T, Sprint y NTT. Los ISP de niveles superiores están conformados por routers de alta velocidad interconectados a través de enlaces de fibra óptica de alta velocidad. La red de cada ISP, ya sea de nivel inferior o superior, se administra de forma independiente, ejecuta el protocolo **IP** y se ajusta a determinados convenios de denominación y asignación de direcciones.

### ¿Cuál es el estándar que sigue un Sistema Terminal para la transmisión de datos?

Los sistemas terminales, los conmutadores de paquetes y otros dispositivos ejecutan **protocolos** que controlan el envío y la recepción de información dentro de internet. El protocolo **TCP** (***cTransmission Control Protocol***,  o ***Protocolo de Control de transmisión***) y el protocolo **IP** (***Internet Protocol***, o ***Protocolo de Internet***) son dos de los más importantes protocolos de internet.

> *El protocolo **IP** especifica el formato en el que los paquetes se envían y se reciben entre los routers y los sistemas terminales. Los principales protocolos de internet se conocen de manera colectiva como **TCP/IP**.*

Gracias a la importancia de los protocolos, es necesario que todo el mundo se ponga de acuerdo respecto a la forma en la que funcionan, para que la gente pueda crear productos y sistemas capaces de interoperar. Es aquí donde entran en juego los **Estándares**. Los **Estándares** de internet son desarrollados por el IETF (***Internet Engineering Task Force,*** o ***Grupo De Trabajo de Ingeniería de Internet***). Los documentos designados para estos estándares se conocen como documentos **RFC** (***Requests for Comments***, o ***Solicitud de Comentarios***). Los RFC nacieron como solicitudes de comentarios para solucionar los problemas de diseño de la red y de los protocolos a los que se enfrentó el precursor de internet.

## Descripción de los servicios

También se puede describir a la Internet como ***Una Infraestructura que proporciona servicios a las aplicaciones***. Además de aplicaciones tradicionales como el correo electrónico y la navegación web, las aplicaciones de internet abarcan aplicaciones para tabletas, y teléfonos móviles inteligentes, incluyendo la mensajería por Internet, mapas con información de Tráfico en tiempo real, reproducción de música desde la nube, reproducción de películas y programas de televisión a través de internet por medio del streaming, redes sociales en línea, videoconferencias, juegos en línea y sistemas de recomendación basados en la ubicación del dispositivo. 

Se dice que estas aplicaciones son **Aplicaciones Distribuidas** porque implican a varios sistemas terminales que envían datos entre sí. También es relevante aclarar que las aplicaciones distribuidas se ejecutan en los sistemas terminales, no en los conmutadores de paquetes que forman el núcleo de la red. Aunque los conmutadores de paquetes faciliten la transmisión de información entre sistemas terminales, no se preocupan por la aplicación o sistema que esté actuando como origen o destino de dicha información.

### La relación entre una Aplicación Distribuida y el Envío de Datos a Internet

Al momento de crear una aplicación distribuida de internet, tenemos una finalidad que nos llevará por el camino de construir la herramienta. Sin embargo, si pensamos compartir datos entre diferentes sistemas terminales tenemos que hacer que nuestra aplicación se comunique por medio de algún método, ¿no?. Es aquí donde llegamos a la forma alternativa de describir a la internet como una infraestructura que proporciona servicios a nuestra aplicación, una plataforma de aplicaciones.

#### ¿Cómo hace un programa que se ejecuta en un sistema terminal para ordenar a Internet que entregue datos a otro programa que se ejecuta en otro sistema terminal?

Los sistemas terminales conectados a internet proporcionan una **Interfaz de Sockets** que especifica la manera en la que un programa de software que se ejecuta en un sistema terminal, pide a la infraestructura de internet que suministre datos a un programa de destino específico que se está ejecutando en otra terminal. La interfaz de sockets es un conjunto de reglas que el programa debe de cumplir para que Internet pueda entregar esos datos al programa de destino.

#### Es como enviar una carta

Supongamos que quieres enviar una carta a otra persona o usando el servicio postal. No puedes simplemente escribir la carta (los datos) y lanzarla por la ventana. En lugar de eso, el servicio postal exige que introduzcas la carta en un sobre, introduzcas el nombre completo del receptor y pegues un sello en la esquina superior del sobre. por último, deberás introducir ese sobre en un buzón oficial del servicio postal. Por lo tanto, esa oficina tiene un conjunto de reglas, o *"Interfaz de Servicio Postal"* que debes de seguir si es que quieres enviar la información de manera correcta, y que llegue de manera correcta.

Así mismo, Internet tiene una interfaz de sockets que el programa que envía los datos debe seguir, para que Internet entregue los datos al programa que debe recibirlos.

## ¿Qué es un protocolo?
### Explicación usando una Analogía Humana

Es sencillo explicar la definición de un protocolo usando una analogía humana, ya que nosotros usamos analogías todo el tiempo para comunicarnos. Pensemos en lo que debemos hacer para por ejemplo, preguntarle la hora a alguien. El protocolo entre personas dicta que para iniciar un proceso de comunicación con alguien lo primero que se debe hacer es saludar. La respuesta típica a este saludo también será *"hola"*. Implícitamente, el saludo se toma como señal de si se debe continuar la conversación o no.
![[protocolo Humano y de Red.png]]

Una respuesta diferente a un *"Hola"*, como por ejemplo un "*No me moleste*" *o un "No Hablo su Idioma"* puede indicar una falta de disposición o una incapacidad para comunicarse. En ese caso, el protocolo de comunicaciones indica que no debe preguntarse la hora. O a veces, simplemente no tendremos respuesta alguna, por lo que a simple vista podemos optar por renunciar a preguntar a esa persona qué hora es. En los protocolos entre personas *existen ciertos mensajes específicos que enviamos y acciones específicas que recibimos como respuesta a los mensajes de contestación recibidos o a otros sucesos.* Esta idea es aplicable a las redes de un igual modo, para que una tarea se lleve a cabo hacen falta dos entidades comunicándose bajo un mismo protocolo.

### Protocolos de Red

Un protocolo de red es similar a un protocolo humano, excepto porque las entidades que intercambian mensajes y llevan a cabo las acciones son componentes de hardware o software de cierto dispositivo. Cualquier actividad de internet que implique a dos o más entidades remotas que se comunican está gobernada por un protocolo. Por ejemplo, los protocolos implementados por el hardware en las tarjetas de interfaz de red de dos computadoras conectadas físicamente controlan el flujo de bits a través del "cable" conectado entre las dos tarjetas de interfaz de red. Los protocolos de control de congestión de los sistemas terminales controlan la velocidad de transmisión de los paquetes entre el emisor y el receptor; los protocolos de los routers determinan la ruta que seguirá un paquete desde el origen hasta el destino.

>***Un protocolo define el formato y el orden de los mensajes intercambiados entre dos o más entidades que se comunican, así como las acciones tomadas al producirse la transmisión y/o recepción de un mensaje u otro suceso.***


### Tablas de envío y protocolos de enrutamiento

En internet, cada sistema terminal tiene asignada una dirección denominada dirección IP. Cuando un sistema terminal de origen quiere enviar un paquete a un sistema terminal de envío, el origen incluye la dirección IP de destino en la cabecera del paquete. Cuando un paquete llega a un router de la red, el router examina una examina una parte de la dirección de destino de ese paquete y lo envía a un router adyacente. Cada router procede una tabla de reenvío, encargada de examinar la dirección de destino y asignarla a las entradas salientes de ese router. Al  determinar un enlace de salida, el router dirige el paquete a ese enlace de salida.

#### Como llegar a un lugar preguntando

El proceso de enrutamiento terminal a terminal es análogo al que sigue el conductor de un automóvil que no utiliza un mapa, sino que prefiere preguntar cómo llegar hasta una determinada dirección. Por ejemplo, supongamos que Juan sale de Filadelfia y tiene que llegar al 156 de la calle Lakeside Drive en Orlando, Florida. Lo primero que hace Juan es dirigirse a la estación de servicio más próxima y preguntar cómo llegar a su destino. El empleado se queda con el nombre del estado, Florida, y le dice que debe tomar la autopista interestatal I-95 Sur y que existe una entrada a la misma nada más salir de la estación de servicio. También le dice a Juan que una vez que haya entrado en Florida, pregunte a alguien cómo llegar a su destino. Así, Juan toma la I-95 Sur hasta Jacksonville, Florida, lugar donde vuelve a preguntar en otra estación de servicio. El dependiente extrae de la dirección la información que hace referencia a Orlando y le dice que debe continuar por la I-95 hasta Daytona Beach y que luego pregunte. En otra estación de servicio de Daytona Beach, el empleado extrae de nuevo la información referente a Orlando y le dice que tomando la I-4 llegará directamente a Orlando. Juan toma la I-4 y la abandona en la salida correspondiente a Orlando. De nuevo se detiene en otra gasolinera y esta vez el dependiente extrae la parte de la información de la dirección referente a Lakeside Drive, y le indica la carretera que debe seguir para llegar allí. Una vez que Juan se encuentra en Lakeside Drive, pregunta a un niño que va en bicicleta cómo llegar a su destino. El niño extrae el dato 156 de la dirección y le señala una casa. Por fin, Juan ha llegado a su destino. En esta analogía, los dependientes de las estaciones de servicio y el niño de la bicicleta son los routers.
