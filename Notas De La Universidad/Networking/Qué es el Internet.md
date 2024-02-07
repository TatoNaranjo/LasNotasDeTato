Un concepto que hay que tener claro cuando hablamos de [[Networking]].

Hay dos formas de definir este concepto, la primera es hablando de la capa de hardware y software que compone al sistema en su totalidad. La segunda es hablando de una infraestructura de red que distribuye un servicio a aplicaciones distribuidas.
## Descripción de los componentes esenciales

El Internet es una red de computadores que interconecta a millones de dispositivos informáticos a través del mundo. Al inicio, estos dispositivos se limitaban a ser computadoras de escritorio, estaciones de trabajo de Linux y los servidores cuyo trabajo radica en almacenar y transmitir información como páginas web y correos electrónicos. Sin embargo hoy en día podemos decir que cada vez hay más dispositivos no tradicionales conectándose, como electrodomésticos, gafas, vehículos, relojes, etc. Todo dispositivo que se conecte a internet, acuña el término de **Host** o **Sistema Terminal**.

Un **Sistema Terminal** se conecta con otro por medio de una red de **Enlaces de Comunicaciones** y **conmutadores de paquetes**. Los enlaces de comunicaciones se componen de diferentes medios físicos como lo pueden ser el cable coaxial, el hilo de cobre, la fibra óptica o el espectro de radio. Estos enlaces pueden transmitir datos a diferentes velocidades, y la **Velocidad de Transmisión** de un enlace se mide en bits/segundo. Cuando un sistema terminal tiene que enviar datos a otro sistema terminal, el emisor segmenta la información y añade bytes de cabecera a cada segmento. Los paquetes de información resultante, conocidos como **paquetes** se envían a través de la red hasta que llegan al sistema terminal receptor, en donde este último realiza un proceso de conversión para volver a ensamblar los datos y obtener los datos originales.

Los encargados de recibir y enviar esta información son los **conmutadores de paquetes**, cuyo proceso consiste en tomar un paquete que recibe por medio de uno de sus enlaces de comunicaciones de entrada, y reenviarlo a través de uno de sus enlaces de comunicaciones de salida. Normalmente los conmutadores de paquetes suelen venir en muchos modelos, pero los más conocidos suelen ser los **Routers** y los **Switches de Capa de Enlace**.

![[componentesDeInternet.png]]

