Cuando tenemos una aplicación y esta necesita enviar dato, hace uso de los puertos de red. Primera clase de [[Redes y Comunicación]].
## ¿Qué es el Modelo OSI?

Es el camino que tienen que seguir los datos para llegar de un lado al otro. Se representa bajo 7 capas que son las siguientes:

![[ModeloOSI.png]]

SSL/TLS funcionan por medio del protocolo de transporte, y son las encargadas de crear un túnel de seguridad entre un emisor y receptor.

#### Tipos de Ataque según la capa en el modelo OSI
##### La capa Física y el Sniffing
El Sniffing es un ataque de interceptación de paquetes utilizado por ciberdelincuentes para capturar datos que se transmiten a través de una red. La forma más fácil de representar esta analogía es decir que funciona de manera similar a cuando alguien pone un dispositivo de escucha en una línea telefónica, pero dentro del mundo digital.

Cuando nosotros enviamos datos a través de internet, estos son comprimidos y enviados en pequeños paquetes a través de la red. Por medio de unas herramientas conocidas como Sniffers, los atacantes se encargan de interceptar y capturar el contenido, obteniendo así información sensible.

Algunos ejemplos populares de ataques de Sniffing pueden ser:

- **Ataques a redes Wi-Fi públicas:** Los atacantes suelen configurar redes Wi-Fi falsas con nombres atractivos para atraer a usuarios desprevenidos. Una vez conectados, el atacante puede interceptar todo el tráfico que se genera en esa red.
- **Ataques a redes corporativas:** Los hackers pueden infiltrarse en redes corporativas para robar información confidencial de la empresa, como secretos comerciales, datos de clientes o información financiera.
- **Ataques a usuarios de banca en línea:** Los atacantes pueden interceptar las credenciales de acceso de los usuarios de banca en línea mientras se conectan a sus cuentas, permitiéndoles realizar transacciones fraudulentas.
##### El enlace de datos y el Spoofing
El ataque de tipo Spoofing se produce cuando un estafador suplanta la identidad de un remitente para acceder a datos e información importante. El spoofing puede producirse a través de sitios web, llamadas telefónicas, textos, direcciones IP y servidores.

Normalmente, el objetivo del Spoofing y la suplantación de identidad es acceder a datos sensible o información personal, robar dinero, saltarse controles de acceso a una red o propagar software malicioso a través de archivos adjuntos o enlaces infectados. Para que este tipo de ataque funcione, debe haber un cierto nivel de ingeniería social. Los métodos que utilizan los estafadores involucran ingeniería social que juega con las características humanas sensibles, como la codicia, el miedo o la ingenuidad.

Un ejemplo de este tipo de ingeniería social se produce cuando el estafador se basa en los sentimientos de miedo de la víctima para intentar obtener información o dinero. La estafa de los nietos, por ejemplo, se produce cuando un estafador se hace pasar por un miembro de la familia y afirma que está en apuros y necesita dinero lo antes posible. En estos casos, los estafadores suelen dirigirse a los ancianos debido a la idea preconcebida de que tienen menos conocimientos sobre tecnología.

Algunos tipos de ataque de tipo Spoofing comunes son:

- **Spoofing de correo electrónico:** Es el tipo más común. Los atacantes envían correos electrónicos que parecen provenir de bancos, empresas o personas conocidas, solicitando información personal o pidiendo que se haga clic en enlaces maliciosos.
- **Spoofing de DNS:** Al modificar los servidores DNS, los atacantes pueden redirigir el tráfico web a sitios falsos, donde los usuarios pueden ser engañados para ingresar sus credenciales.
- **Spoofing de IP:** Consiste en falsificar la dirección IP de origen de un paquete de datos para ocultar la identidad del atacante y hacer que parezca que el tráfico proviene de una fuente confiable.
- **Spoofing de ARP:** Este tipo de ataque se lleva a cabo en redes locales y permite al atacante interceptar el tráfico de red entre dispositivos.
##### La capa de red y el Man in The Middle

El ataque de tipo Man In The Middle permite al delincuente informático interceptar la comunicación entre dos dispositivos conectados a una red. El atacante puede manipular el tráfico interceptado de cualquier forma, ya sea para escuchar la comunicación u obtener información sensible como credenciales de acceso, información financiera, etc. Para que un ataque mitm funcione, el atacante debe de estar en la misma red que los dos dispositivos que quiere interceptar, luego de ello cambiará las tablas de enrutamiento para cada uno de los mismos.

Otra forma de orquestar el ataque puede ser modificando las tablas de enrutamiento de los routers, secuestrándolos y alterando sus tablas de enrutamiento de forma arbitraria, sin embargo cabe aclarar que la dificultad de este método alternativo en cuestión es obviamente mayor. Una herramienta muy conocida para realizar ataques de este tipo se llama **Ettercap**.

Si un ataque de Man in The Middle se realiza de forma correcta, puede tener las siguientes consecuencias:

- Realizar capturas de pantalla de lo que observa la víctima cada cierto tiempo;

- Insertar en la página a la que se accede código en JavaScript creado por el atacante;

- Ejecutar procesos que intentan abrir tráfico encriptado HTTPS;

- Insertar un [keylogger](https://www.welivesecurity.com/la-es/2021/03/04/que-es-keylogger-herramienta-para-espiar/) que capture todo lo que escribe la víctima.
##### La capa de transporte y el DOS
Un ataque de Denegación de Servicio (Denial of Service) es un tipo de ciberataque en el que un agente malicioso tiene como objetivo que un ordenador o un dispositivo no esté disponible para los usuarios hacia los que va dirigido el servicio, interrumpiendo el funcionamiento normal del mismo. De forma habitual, los ataques de tipo DoS suelen consistir en sobrecargar o inundar una máquina objetivo con solicitudes hasta que el tráfico de red no sea capaz de procesar la información, haciendo que se provoque una denegación de servicio a los usuarios que deseen entrar. Un ataque DoS se caracteriza por utilizar un único ordenador para lanzar el ataque.

**Los ataques DoS suelen ser de dos categorías:**
###### Ataques de desbordamiento de búfer

Un tipo de ataque en el que se produce un [desbordamiento del búfer](https://www.cloudflare.com/learning/security/threats/buffer-overflow/) de la memoria puede hacer que una máquina consuma todo el espacio disponible en el disco duro, la memoria o el tiempo de la CPU. Esto suele provocar un comportamiento lento, caídas del sistema u otros comportamientos perjudiciales para el servidor, que acaba provocando una denegación de servicio.
###### Ataques de inundación

Al saturar un servidor objetivo con una cantidad abrumadora de paquetes, un actor malicioso es capaz de sobrecargar la capacidad del servidor, lo que provoca una denegación de servicio. Para que la mayoría de los ataques de inundación DoS tengan éxito, el actor malicioso debe tener más ancho de banda disponible que el objetivo.

La diferencia entre un ataque de tipo DoS y un ataque de tipo DDoS se enfoca en la simplicidad del primero, mientras que para el primer ataque se necesita de un solo dispositivo, en el ataque de tipo DDoS se utiliza un número de conexiones elevado y los requisitos necesarios para llevarlo a cabo son mucho mayores.
##### La capa de sesión y el Hijacking

El Hijacking es un tipo de ataque en el que los agentes maliciosos modifican las redirecciones de los servidores DNS. Esto significa que cuando el usuario quiera ingresar a una dirección de dominio determinado, el DNS le devolverá una dirección IP diferente. Las páginas que realizan este tipo de ataque suelen ser páginas que contienen anuncios y malware, y son controladas por los hijackers.

Un problema de este tipo de ataque es que los atacantes también serán capaces de instalar spyware y otros elementos que pueden poner en riesgo la vida del dispositivo en cuestión. Algunos de los ataques que puede realizar este spyware consisten en modificar características y configuraciones del navegador, e incluso desactivar el antivirus del dispositivo para generar una brecha de seguridad.

Uno de los ataques más famosos de este tipo ocurrió en 2015, cuando un grupo de hackers secuestraron los dominios de Google Vietnam y Lenovo para redirigirlos a webs controladas por ellos.
##### La capa de presentación y el phishing

El phishing es una forma de ciberdelincuencia en la que una persona intenta obtener información confidencial por medio del correo electrónico, enviando mensajes fraudulentos que incitan a rellenar formularios con información personal identificable.

El phishing puede producirse a través de correos electrónicos, llamadas telefónicas o mensajes de texto. Los estafadores envían mensajes que parecen reales y urgentes, pidiendo a la persona que actúe. Por ejemplo, un correo electrónico puede parecer procedente de un banco de confianza y pedir a la persona que actualice la información de su cuenta para evitar problemas. Como el mensaje parece urgente y real, la gente puede compartir información confidencial, como contraseñas y números de tarjetas de crédito, que los estafadores pueden utilizar indebidamente.

Haciéndose pasar por una entidad legítima, el atacante atrae a las víctimas a un sitio web falso donde se les convence para que introduzcan información confidencial. Esta fachada bien elaborada, unida a una sensación de urgencia, permite a la estafa de phishing obtener con éxito valiosos datos personales, dejando a la víctima desprevenida vulnerable al robo de identidad y a pérdidas financieras.
##### La capa de aplicación y el exploit

Un exploit es un software, un fragmento de datos o una secuencia de comandos que aprovecha una vulnerabilidad de una aplicación para provocar un comportamiento imprevisto o involuntario. Su nombre deriva del significado en inglés de la palabra exploit, el cual consiste en "utilizar algo en beneficio propio". Normalmente, un motivo por el cual suceden bastantes ataques de exploits es por no actualizar las aplicaciones. Cuando un sistema no es actualizado de forma común, los hackers pueden aprovechar diferentes brechas de seguridad que existen dentro de la aplicación para encontrar alguna debilidad que no ha sido detectada aún. La forma más conocida de evitar este tipo de ataques es mantener las aplicaciones actualizadas de forma común.

## La diferencia entre Hashear, Cifrar y Encriptar

Aunque sean tres términos relativamente similares en significado, debemos tener en cuenta sus diferencias para evitar caer en errores que puedan crear alguna brecha de seguridad que dé paso a vulnerabilidades.
### Hasheo
Tiene como objetivo principal el garantizar la integridad de los datos mediante la transformación de un conjunto de datos de cualquier tamaño en una cadena de caracteres de longitud fija (también llamados hash o resumen). Hashear los datos, hace que los datos originales no se puedan recuperar de ninguna forma a partir del hash. Así mismo, hay que tener en cuenta de que incluso el mas mínimo cambio dentro de los datos originales puede alterar el hasheo generando caracteres completamente diferentes cada vez.

Buscamos realizar un hashing de datos cuando se tiene como prioridad verificar la integridad de los datos sin preocuparnos por restaurarlos a su forma original. Distintos ejemplos de esto pueden ser:

- La verificación de contraseñas
- La detección de modificaciones en archivos.
- La creación de estructuras de datos eficientes para indexar y buscar información de forma rápida.

### Cifrado y Encriptación

Tiene como objetivo principal proteger la confidencialidad de los datos dentro de cualquier contexto, transformando los datos que sean legibles (es decir, que estén en un texto plano), en un texto de formato ilegible (también conocido como texto cifrado) utilizando un algoritmo y una clave de encriptación.

A diferencia de un hasheo, con la clave correcta se puede recuperar un texto plano a partir de un texto cifrado. Además, la seguridad de los elementos cifrados depende de qué tan fuerte es el algoritmo y la complejidad de la clave.

Utilizamos un método de cifrado cuando necesitamos proteger los datos pero a su vez necesitamos recuperar los datos originales. Algunos ejemplos de esto pueden ser:

- Proteger la información que se envía a través de las redes mediante correos electrónicos, mensajes instantáneos y transacciones en línea.
- Proteger datos sensibles almacenados dentro de dispositivos o servidores, como contraseñas, información financiera o registros médicos.
## ¿Cómo funcionan los puertos?  

Los puertos informáticos han existido desde los albores de la informática. La Red de Agencias de Proyectos de Investigación Avanzados (ARPANET) originó el concepto de números de puerto.

Los puertos se utilizan para identificar un terminal de conexión y dirigir datos a un servicio. Hay puertos virtuales y físicos: Un puerto USB es un ejemplo de un puerto físico y, a menudo, el que viene a la mente cuando se piensa en puertos de ordenador. Sin embargo, los puertos virtuales son mucho más comunes y aquí es donde los puertos entran en nuestra historia de cómo funciona Internet. Los puertos forman parte de la Capa 4, la capa de transporte, del modelo OSI de Internet.

Para explicar cómo funcionan los puertos, necesitamos volver a la analogía de una carta dirigida a "Lucille Ball, 1000 Roxbury Drive, Beverly Hills, CA 90210", en nuestro post sobre direcciones IP, esta analogía ayuda a explicar cómo en la dirección virtual equivalente a la carta, una dirección IP enruta la carta al destino. En la analogía postal, una vez que una carta llega a la dirección final, el nombre de la carta identifica específicamente a quién va dirigida la carta; a este respecto, un puerto es el equivalente del nombre Lucille Ball.

Hay muchos puertos virtuales, con números de puerto que van del 0 al 65535. Los protocolos de Internet TCP y UDP deciden a qué proceso se envía el paquete de datos, esto se basa en un esquema servidor-cliente, como se ve en nuestras otras páginas sobre [HTTP (Protocolo de transferencia de hipertexto)](https://www.akamai.com/es/glossary/what-is-http "HTTP") y [HTTPS](https://www.akamai.com/es/glossary/what-is-https "HTTPS").

La siguiente es una lista de **números de [puerto](https://es.wikipedia.org/wiki/Puerto_de_red "Puerto de red")** usados por los protocolos [TCP](https://es.wikipedia.org/wiki/Transmission_Control_Protocol "Transmission Control Protocol") y [UDP](https://es.wikipedia.org/wiki/User_Datagram_Protocol "User Datagram Protocol").​

## Puertos bien conocidos

Los números de puerto en el rango de 0 a 1023 son los llamados _puertos bien conocidos_ (en [inglés](https://es.wikipedia.org/wiki/Idioma_ingl%C3%A9s "Idioma inglés"): _well-known port_) o también denominados _puertos de sistema_ ([sistema binario](https://es.wikipedia.org/wiki/Sistema_binario "Sistema binario"): de 0 a 210 − 1 según [RFC 6335](https://tools.ietf.org/html/rfc6335)).

|Puerto/protocolo|Nombre|Descripción|
|---|---|---|
|n/d / GRE|gre|GRE (protocolo IP 47) Enrutamiento y acceso remoto|
|n/d / ESP||IPSec ESP (protocolo IP 50) Enrutamiento y acceso remoto|
|n/d / AH||IPSec AH (protocolo IP 51) Enrutamiento y acceso remoto|
|1/tcp|tcpmux|Multiplexor TCP|
|5/tcp|rje|Entrada de trabajo remota|
|7/tcp|echo|Protocolo [Echo](https://es.wikipedia.org/wiki/Echo_(inform%C3%A1tica) "Echo (informática)") (Eco) Responde con eco a llamadas remotas|
|9/tcp|discard|Protocolo [Discard](https://es.wikipedia.org/w/index.php?title=Discard&action=edit&redlink=1 "Discard (aún no redactado)"), elimina cualquier dato que recibe, sirve para la evaluación de conexiones|
|11/tcp|systat|Servicio del sistema para listar los puertos conectados|
|13/tcp|daytime|Protocolo [Daytime](https://es.wikipedia.org/wiki/Daytime "Daytime"), envía la fecha y hora actuales|
|17/tcp|qotd|[Quote of the Day](https://es.wikipedia.org/wiki/QOTD "QOTD"), envía la cita del día|
|18/tcp|msp|Protocolo de envío de mensajes|
|19/tcp|chargen|Protocolo [Chargen](https://es.wikipedia.org/wiki/Chargen "Chargen") o **Generador de caracteres**, envía flujos infinitos de caracteres|
|20/tcp|ftpS-data|[FTPS](https://es.wikipedia.org/w/index.php?title=File_Transfer_Protocol_Shield&action=edit&redlink=1 "File Transfer Protocol Shield (aún no redactado)") File Transfer Protocol (Protocolo de Transferencia de Ficheros) - datos|
|21/tcp|ftp-control|[FTP](https://es.wikipedia.org/wiki/File_Transfer_Protocol "File Transfer Protocol") File Transfer Protocol (Protocolo de Transferencia de Ficheros) - control|
|22/tcp|ssh|[SSH](https://es.wikipedia.org/wiki/SSH "SSH"), [scp](https://es.wikipedia.org/wiki/Secure_Copy "Secure Copy"), [SFTP](https://es.wikipedia.org/wiki/SFTP "SFTP")|
|23/tcp|telnet|[Telnet](https://es.wikipedia.org/wiki/Telnet "Telnet") manejo remoto de equipo, inseguro|
|25/tcp|smtp|[SMTP](https://es.wikipedia.org/wiki/SMTP "SMTP") Simple Mail Transfer Protocol (Protocolo Simple de Transferencia de Correo)|
|37/tcp|time|[Time Protocol](https://es.wikipedia.org/wiki/Time_Protocol "Time Protocol"). Sincroniza hora y fecha|
|39/tcp|rlp|Protocolo de ubicación de recursos|
|42/tcp|nameserver|Servicio de nombres de Internet|
|43/tcp|nickname|Servicio de directorio [WHOIS](https://es.wikipedia.org/wiki/WHOIS "WHOIS")|
|49/tcp|tacacs|Terminal Access Controller Access Control System  <br>para el acceso y autenticación basado en TCP/IP|
|50/tcp|re-mail-ck|Protocolo de verificación de correo remoto|
|53/tcp and udp|domain|[DNS](https://es.wikipedia.org/wiki/DNS "DNS") Domain Name System (Sistema de Nombres de Dominio), por ejemplo [BIND](https://es.wikipedia.org/wiki/BIND "BIND")|
|53/udp||[FaceTime](https://es.wikipedia.org/wiki/FaceTime "FaceTime")|
|63/tcp|whois++|Servicios extendidos de [WHOIS](https://es.wikipedia.org/wiki/WHOIS "WHOIS") (WHOIS++)|
|66/tcp and udp|Oracle SQLNet|Software de red que permite acceso remoto  <br>entre los programas y la [base de datos Oracle](https://es.wikipedia.org/wiki/Oracle_Database "Oracle Database").|
|67/udp|bootps|[BOOTP](https://es.wikipedia.org/wiki/BOOTP "BOOTP") BootStrap Protocol (servidor), también usado por [DHCP](https://es.wikipedia.org/wiki/DHCP "DHCP")|
|68/udp|bootpc|[BOOTP](https://es.wikipedia.org/wiki/BOOTP "BOOTP") BootStrap Protocol (cliente), también usado por [DHCP](https://es.wikipedia.org/wiki/DHCP "DHCP")|
|69/udp|tftp|[TFTP](https://es.wikipedia.org/wiki/TFTP "TFTP") Trivial File Transfer Protocol (Protocolo Trivial de Transferencia de Ficheros)|
|70/tcp|gopher|[Gopher](https://es.wikipedia.org/wiki/Gopher "Gopher")|
|79/tcp|finger|[Finger](https://es.wikipedia.org/wiki/Finger_(protocolo) "Finger (protocolo)")|
|80/tcp|http|[HTTP](https://es.wikipedia.org/wiki/HTTP "HTTP") HyperText Transfer Protocol (Protocolo de Transferencia de HiperTexto) ([WWW](https://es.wikipedia.org/wiki/WWW "WWW"))|
|88/tcp|kerberos|[Kerberos](https://es.wikipedia.org/wiki/Kerberos "Kerberos") Agente de autenticación|
|95/tcp|supdup|Extensión del protocolo [Telnet](https://es.wikipedia.org/wiki/Telnet "Telnet")|
|101/tcp|hostname|Servicios de nombres de host en máquinas SRI-NIC|
|107/tcp|rtelnet|Telnet remoto|
|109/tcp|pop2|[POP](https://es.wikipedia.org/wiki/Post_Office_Protocol "Post Office Protocol")2 Post Office Protocol ([Correo electrónico](https://es.wikipedia.org/wiki/Correo_electr%C3%B3nico "Correo electrónico"))|
|110/tcp|pop3|[POP3](https://es.wikipedia.org/wiki/POP3 "POP3") Post Office Protocol ([Correo electrónico](https://es.wikipedia.org/wiki/Correo_electr%C3%B3nico "Correo electrónico"))|
|111/tcp|sunrpc|[sunrpc](https://es.wikipedia.org/wiki/Sunrpc "Sunrpc")|
|113/tcp|auth|[ident](https://es.wikipedia.org/w/index.php?title=Ident&action=edit&redlink=1 "Ident (aún no redactado)") (auth) antiguo sistema de identificación|
|115/tcp|sftp|[SFTP (Simple FTP)](https://en.wikipedia.org/wiki/File_Transfer_Protocol#Simple_File_Transfer_Protocol) Protocolo de transferencia de archivos simple|
|117/tcp|uupc-path|Servicios de rutas de Unix-to-Unix Copy Protocol (UUCP)|
|119/tcp|nntp|[NNTP](https://es.wikipedia.org/wiki/NNTP "NNTP") usado en los grupos de noticias de [usenet](https://es.wikipedia.org/wiki/Usenet "Usenet")|
|123/udp|ntp|[NTP](https://es.wikipedia.org/wiki/NTP "NTP") Protocolo de sincronización de tiempo|
|135/tcp|epmap|[epmap](https://es.wikipedia.org/w/index.php?title=Epmap&action=edit&redlink=1 "Epmap (aún no redactado)")|
|137/udp|netbios-ns|[NetBIOS](https://es.wikipedia.org/wiki/NetBIOS "NetBIOS") Servicio de nombres|
|138/udp|netbios-dgm|[NetBIOS](https://es.wikipedia.org/wiki/NetBIOS "NetBIOS") Servicio de envío de datagramas|
|139/tcp|netbios-ssn|[NetBIOS](https://es.wikipedia.org/wiki/NetBIOS "NetBIOS") Servicio de sesiones|
|143/tcp|imap|[IMAP](https://es.wikipedia.org/wiki/IMAP "IMAP")4 Internet Message Access Protocol ([Correo electrónico](https://es.wikipedia.org/wiki/Correo_electr%C3%B3nico "Correo electrónico"))|
|161/udp|snmp|[SNMP](https://es.wikipedia.org/wiki/SNMP "SNMP") Simple Network Management Protocol|
|162/udp|snmptrap|[SNMP-trap](https://es.wikipedia.org/wiki/SNMP#Trap "SNMP")|
|174/tcp|mailq|Cola de transporte de correos electrónicon MAILQ|
|177/tcp|xdmcp|[XDMCP](https://es.wikipedia.org/wiki/XDMCP "XDMCP") Protocolo de gestión de displays en [X11](https://es.wikipedia.org/wiki/X11 "X11")|
|178/tcp|nextstep|Servidor de ventanas [NeXTStep](https://es.wikipedia.org/wiki/NeXTStep "NeXTStep")|
|179/tcp|bgp|[Border Gateway Protocol](https://es.wikipedia.org/wiki/Border_Gateway_Protocol "Border Gateway Protocol")|
|194/tcp|irc|[Internet Relay Chat](https://es.wikipedia.org/wiki/Internet_Relay_Chat "Internet Relay Chat")|
|199/tcp|smux|SNMP UNIX Multiplexer|
|201/tcp|at-rtmp|Enrutamiento [AppleTalk](https://es.wikipedia.org/wiki/AppleTalk "AppleTalk")|
|202/tcp|at-nbp|Enlace de nembres AppleTalk|
|204/tcp|at-echo|Echo AppleTalk|
|206/tcp|at-zis|Zona de información AppleTalk|
|209/tcp|qmtp|Protocolo de transferencia rápida de correo (QMTP)|
|210/tcp|z39.50|Base de datos NISO Z39.50|
|213/tcp|ipx|El protocolo de intercambio de paquetes entre redes (IPX)|
|220/tcp|imap3|[IMAP](https://es.wikipedia.org/wiki/IMAP "IMAP") versión 3|
|245/tcp|link|Servicio LINK / 3-DNS iQuery|
|347/tcp|fatserv|Servicio de administración de cintas y archivos FATMEN|
|363/tcp|rsvp_tunnel|Túnel RSVP|
|369/tcp|rpc2portmap|Portmapper del sistema de archivos Coda|
|370/tcp|codaauth2|Servicios de autenticación del sistema de archivos Coda|
|372/tcp|ulistproc|UNIX LISTSERV|
|389/tcp|ldap|[LDAP](https://es.wikipedia.org/wiki/LDAP "LDAP") Protocolo de acceso ligero a Directorios|
|427/tcp|svrloc|Protocolo de ubicación de servicios (SLP)|
|434/tcp|mobileip-agent|Agente móvil del Protocolo Internet|
|435/tcp|mobilip-mn|Gestor móvil del Protocolo Internet|
|443/tcp|https|[HTTPS](https://es.wikipedia.org/wiki/HTTPS "HTTPS")/[SSL](https://es.wikipedia.org/wiki/Transport_Layer_Security "Transport Layer Security") usado para la transferencia segura de páginas web|
|444/tcp|snpp|Protocolo simple de Network Pagging|
|445/tcp|microsoft-ds|Microsoft-DS ([Active Directory](https://es.wikipedia.org/wiki/Active_Directory "Active Directory"),  <br>compartición en [Windows](https://es.wikipedia.org/wiki/Windows "Windows"), gusano [Sasser](https://es.wikipedia.org/w/index.php?title=Sasser&action=edit&redlink=1 "Sasser (aún no redactado)"), Agobot)  <br>o también es usado por Microsoft-DS compartición de ficheros|
|465/tcp|smtps|[SMTP](https://es.wikipedia.org/wiki/SMTP "SMTP") Sobre [SSL](https://es.wikipedia.org/wiki/Transport_Layer_Security "Transport Layer Security"). Utilizado para el envío de correo electrónico ([Correo electrónico](https://es.wikipedia.org/wiki/Correo_electr%C3%B3nico "Correo electrónico"))|
|500/udp||[IPSec](https://es.wikipedia.org/wiki/IPSec "IPSec") ISAKMP, Autoridad de Seguridad Local|
|512/tcp||[exec](https://es.wikipedia.org/w/index.php?title=Exec&action=edit&redlink=1 "Exec (aún no redactado)")|
|513/tcp||[Rlogin](https://es.wikipedia.org/wiki/Rlogin "Rlogin")|
|514/udp||[syslog](https://es.wikipedia.org/wiki/Syslog "Syslog") usado para logs del sistema|
|515/tcp||usado para la impresión en windows|
|520/udp|rip|[RIP](https://es.wikipedia.org/wiki/Routing_Information_Protocol "Routing Information Protocol") Routing Information Protocol (Protocolo de Información de Enrutamiento)|
|521/udp|ripng|[RIP](https://es.wikipedia.org/wiki/Routing_Information_Protocol "Routing Information Protocol") Routing Information Protocol IPv6 (Protocolo de Información de Enrutamiento Internet v6)[2](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-2)​|
|587/tcp|smtp|[SMTP](https://es.wikipedia.org/wiki/SMTP "SMTP") Sobre [TLS](https://es.wikipedia.org/wiki/Transport_Layer_Security "Transport Layer Security")|
|591/tcp||[FileMaker](https://es.wikipedia.org/wiki/FileMaker "FileMaker") 6.0 _(alternativa para HTTP, ver puerto 80)_|
|631/tcp||[CUPS](https://es.wikipedia.org/wiki/Common_Unix_Printing_System "Common Unix Printing System") sistema de impresión de Unix|
|666/tcp||identificación de [Doom](https://es.wikipedia.org/wiki/Doom_(videojuego_de_1993) "Doom (videojuego de 1993)") para jugar sobre TCP|
|690/tcp||VATP ([Velneo Application Transfer Protocol](https://es.wikipedia.org/wiki/Velneo_Application_Transfer_Protocol "Velneo Application Transfer Protocol")) Protocolo de comunicaciones de Velneo|
|993/tcp|imaps|[IMAP](https://es.wikipedia.org/wiki/IMAP "IMAP")4 sobre [SSL](https://es.wikipedia.org/wiki/Transport_Layer_Security "Transport Layer Security") ([Correo electrónico](https://es.wikipedia.org/wiki/Correo_electr%C3%B3nico "Correo electrónico"))|
|995/tcp||POP3 sobre [SSL](https://es.wikipedia.org/wiki/Transport_Layer_Security "Transport Layer Security") ([Correo electrónico](https://es.wikipedia.org/wiki/Correo_electr%C3%B3nico "Correo electrónico"))|

## Puertos desde 1024 hasta 49151

|Puerto/protocolo|Nombre|Descripción|
|---|---|---|
|1001/tcp||[SOCKS](https://es.wikipedia.org/wiki/SOCKS "SOCKS") Proxy|
|1194/udp||[OpenVPN](https://es.wikipedia.org/wiki/OpenVPN "OpenVPN") Puerto por defecto en NAS Synology y QNAP|
|1337/tcp||suele usarse en máquinas comprometidas o infectadas|
|1352/tcp||IBM Lotus Notes/Domino RCP|
|1433/tcp||[Microsoft-SQL-Server](https://es.wikipedia.org/wiki/Microsoft_SQL_Server "Microsoft SQL Server")|
|1434/tcp||Microsoft-SQL-Monitor|
|1494/tcp||[Citrix MetaFrame](https://es.wikipedia.org/w/index.php?title=Citrix_MetaFrame&action=edit&redlink=1 "Citrix MetaFrame (aún no redactado)") Cliente IC|
|1512/tcp||[WINS](https://es.wikipedia.org/wiki/Windows_Internet_Naming_Service "Windows Internet Naming Service") Windows Internet Naming Service|
|1521/tcp||[Oracle](https://es.wikipedia.org/wiki/Oracle "Oracle") puerto de escucha por defecto|
|1701/udp||Enrutamiento y Acceso Remoto para VPN con L2TP.|
|1720/udp||[H.323](https://es.wikipedia.org/wiki/H.323 "H.323")|
|1723/tcp||Enrutamiento y Acceso Remoto para VPN con PPTP.|
|1761/tcp||[Novell](https://es.wikipedia.org/wiki/Novell "Novell") Zenworks Remote Control utility|
|1812/udp y tcp||[RADIUS](https://es.wikipedia.org/wiki/RADIUS "RADIUS") authentication protocol, `radius`|
|1813/udp y tcp||[RADIUS](https://es.wikipedia.org/wiki/RADIUS "RADIUS") accounting protocol, `radius-acct`|
|1883 tcp||MQTT protocol|
|1863/tcp||[MSN Messenger](https://es.wikipedia.org/wiki/MSN_Messenger "MSN Messenger")|
|1935/tcp||[FMS](https://es.wikipedia.org/wiki/FMS "FMS") Flash Media Server|
|2049/tcp||[NFS](https://es.wikipedia.org/wiki/Network_File_System "Network File System") Archivos del sistema de red|
|2082/tcp||[cPanel](https://es.wikipedia.org/wiki/CPanel "CPanel") puerto por defecto|
|2083/tcp||[CPanel](https://es.wikipedia.org/wiki/CPanel "CPanel") puerto por defecto sobre [SSL](https://es.wikipedia.org/wiki/Transport_Layer_Security "Transport Layer Security")|
|2086/tcp||[Web Host Manager](https://es.wikipedia.org/w/index.php?title=Web_Host_Manager&action=edit&redlink=1 "Web Host Manager (aún no redactado)") puerto por defecto|
|2427/udp||Cisco [MGCP](https://es.wikipedia.org/wiki/MGCP "MGCP")|
|3000/tcp||[React](https://es.wikipedia.org/wiki/React "React")|
|3030/tcp and udp||[NetPanzer](https://es.wikipedia.org/w/index.php?title=NetPanzer&action=edit&redlink=1 "NetPanzer (aún no redactado)")|
|3074/tcp||[Xbox Live](https://es.wikipedia.org/wiki/Xbox_Live "Xbox Live")|
|3074/udp||[Xbox Live](https://es.wikipedia.org/wiki/Xbox_Live "Xbox Live")|
|3128/tcp||[HTTP](https://es.wikipedia.org/wiki/HTTP "HTTP") usado por [web caches](https://es.wikipedia.org/w/index.php?title=Web_cache&action=edit&redlink=1 "Web cache (aún no redactado)") y por defecto en [Squid cache](https://es.wikipedia.org/w/index.php?title=Squid_cache&action=edit&redlink=1 "Squid cache (aún no redactado)")|
|3128/tcp||[NDL-AAS](https://es.wikipedia.org/w/index.php?title=NDL-AAS&action=edit&redlink=1 "NDL-AAS (aún no redactado)")|
|3306/tcp||[MySQL](https://es.wikipedia.org/wiki/MySQL "MySQL") sistema de gestión de bases de datos|
|3389/tcp||RDP ([Remote Desktop Protocol](https://es.wikipedia.org/wiki/Remote_Desktop_Protocol "Remote Desktop Protocol")) Terminal Server|
|3396/tcp||[Novell](https://es.wikipedia.org/wiki/Novell "Novell") agente de impresión NDPS|
|3690/tcp||[Subversion](https://es.wikipedia.org/wiki/Subversion "Subversion") (sistema de control de versiones)|
|3799/udp||[RADIUS](https://es.wikipedia.org/wiki/RADIUS "RADIUS") CoA -change of authorization|
|4200/tcp||Angular, puerto por defecto|
|4443/tcp and udp||[AOL Instant Messenger](https://es.wikipedia.org/wiki/AOL_Instant_Messenger "AOL Instant Messenger") (sistema de mensajería)[3](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-3)​|
|4662/tcp||[eMule](https://es.wikipedia.org/wiki/EMule "EMule") (aplicación de compartición de ficheros)|
|4672/udp||[eMule](https://es.wikipedia.org/wiki/EMule "EMule") (aplicación de compartición de ficheros)|
|4899/tcp||RAdmin (Remote Administrator),  <br>herramienta de administración remota (normalmente [troyanos](https://es.wikipedia.org/wiki/Troyano_(inform%C3%A1tica) "Troyano (informática)"))|
|5000/tcp||[Universal plug-and-play](https://es.wikipedia.org/wiki/UPnP "UPnP")|
|5001/tcp||Agente v6 [Datadog](https://es.wikipedia.org/wiki/Datadog "Datadog")[4](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-4)​|
|5060/udp||[Session Initiation Protocol](https://es.wikipedia.org/wiki/Session_Initiation_Protocol "Session Initiation Protocol") (SIP)|
|5190/tcp||[AOL](https://es.wikipedia.org/wiki/AOL "AOL") y [AOL Instant Messenger](https://es.wikipedia.org/wiki/AOL_Instant_Messenger "AOL Instant Messenger")|
|5222/tcp||[Jabber/XMPP](https://es.wikipedia.org/wiki/Extensible_Messaging_and_Presence_Protocol "Extensible Messaging and Presence Protocol") conexión de cliente|
|5223/tcp||[Jabber/XMPP](https://es.wikipedia.org/wiki/Extensible_Messaging_and_Presence_Protocol "Extensible Messaging and Presence Protocol") puerto por defecto para conexiones de cliente SSL|
|5269/tcp||[Jabber/XMPP](https://es.wikipedia.org/wiki/Extensible_Messaging_and_Presence_Protocol "Extensible Messaging and Presence Protocol") conexión de servidor|
|5432/tcp||[PostgreSQL](https://es.wikipedia.org/wiki/PostgreSQL "PostgreSQL") sistema de gestión de bases de datos|
|5517/tcp||[Setiqueue](https://es.wikipedia.org/w/index.php?title=Setiqueue&action=edit&redlink=1 "Setiqueue (aún no redactado)") proyecto SETI@Home|
|5631/tcp||[PC-Anywhere](https://es.wikipedia.org/w/index.php?title=PC-Anywhere&action=edit&redlink=1 "PC-Anywhere (aún no redactado)") protocolo de escritorio remoto|
|5632/udp||[PC-Anywhere](https://es.wikipedia.org/w/index.php?title=PC-Anywhere&action=edit&redlink=1 "PC-Anywhere (aún no redactado)") protocolo de escritorio remoto|
|5400/tcp||[VNC](https://es.wikipedia.org/wiki/VNC "VNC") protocolo de escritorio remoto (usado sobre [HTTP](https://es.wikipedia.org/wiki/HTTP "HTTP"))|
|5500/tcp||[VNC](https://es.wikipedia.org/wiki/VNC "VNC") protocolo de escritorio remoto (usado sobre [HTTP](https://es.wikipedia.org/wiki/HTTP "HTTP"))|
|5600/tcp||[VNC](https://es.wikipedia.org/wiki/VNC "VNC") protocolo de escritorio remoto (usado sobre [HTTP](https://es.wikipedia.org/wiki/HTTP "HTTP"))|
|5700/tcp||[VNC](https://es.wikipedia.org/wiki/VNC "VNC") protocolo de escritorio remoto (usado sobre [HTTP](https://es.wikipedia.org/wiki/HTTP "HTTP"))|
|5800/tcp||[VNC](https://es.wikipedia.org/wiki/VNC "VNC") protocolo de escritorio remoto (usado sobre [HTTP](https://es.wikipedia.org/wiki/HTTP "HTTP"))|
|5900/tcp||[VNC](https://es.wikipedia.org/wiki/VNC "VNC") protocolo de escritorio remoto (conexión normal)|
|6000/tcp||[X11](https://es.wikipedia.org/wiki/X11 "X11") usado para X-windows|
|6112/udp||[Blizzard](https://es.wikipedia.org/wiki/Blizzard_Entertainment "Blizzard Entertainment")|
|6129/tcp||[Dameware](https://es.wikipedia.org/w/index.php?title=Dameware&action=edit&redlink=1 "Dameware (aún no redactado)") Software conexión remota|
|6346/tcp||[Gnutella](https://es.wikipedia.org/wiki/Gnutella "Gnutella") compartición de ficheros (Limewire, etc.)|
|6347/udp||[Gnutella](https://es.wikipedia.org/wiki/Gnutella "Gnutella")|
|6348/udp||[Gnutella](https://es.wikipedia.org/wiki/Gnutella "Gnutella")|
|6349/udp||[Gnutella](https://es.wikipedia.org/wiki/Gnutella "Gnutella")|
|6350/udp||[Gnutella](https://es.wikipedia.org/wiki/Gnutella "Gnutella")|
|6355/udp||[Gnutella](https://es.wikipedia.org/wiki/Gnutella "Gnutella")|
|6667/tcp||[IRC](https://es.wikipedia.org/wiki/IRC "IRC") [IRCU](https://es.wikipedia.org/w/index.php?title=IRCU&action=edit&redlink=1 "IRCU (aún no redactado)") Internet Relay Chat|
|6881/tcp||[BitTorrent](https://es.wikipedia.org/wiki/BitTorrent "BitTorrent") puerto por defecto|
|6969/tcp||[BitTorrent](https://es.wikipedia.org/wiki/BitTorrent "BitTorrent") puerto de tracker|
|7100/tcp||Servidor de Fuentes [X11](https://es.wikipedia.org/wiki/X11 "X11")|
|7100/udp||Servidor de Fuentes [X11](https://es.wikipedia.org/wiki/X11 "X11")|
|7659/tcp y udp||[Polypheny](https://es.wikipedia.org/w/index.php?title=Polypheny&action=edit&redlink=1 "Polypheny (aún no redactado)") interfaz de usuario (sistema de gestión de bases de datos)|
|8000/tcp||[iRDMI](https://es.wikipedia.org/w/index.php?title=IRDMI&action=edit&redlink=1 "IRDMI (aún no redactado)") por lo general, usado erróneamente en sustitución de 8080.  <br>También utilizado en el servidor de streaming ShoutCast.|
|8080/tcp||[HTTP](https://es.wikipedia.org/wiki/HTTP "HTTP") [HTTP-ALT](https://es.wikipedia.org/w/index.php?title=HTTP-ALT&action=edit&redlink=1 "HTTP-ALT (aún no redactado)") ver puerto 80. [Tomcat](https://es.wikipedia.org/wiki/Tomcat "Tomcat") lo usa como puerto por defecto.|
|8118/tcp||[privoxy](https://es.wikipedia.org/wiki/Privoxy "Privoxy")|
|9009/tcp||[Pichat](https://es.wikipedia.org/w/index.php?title=Pichat&action=edit&redlink=1 "Pichat (aún no redactado)") peer-to-peer chat server|
|9898/tcp||Gusano Dabber (troyano/virus)|
|10000/tcp||[Webmin](https://es.wikipedia.org/wiki/Webmin "Webmin") (Administración remota web)|
|19226/tcp||[Panda Security](https://es.wikipedia.org/wiki/Panda_Security "Panda Security") Puerto de comunicaciones de Panda Agent.|
|12345/tcp||[NetBus](https://es.wikipedia.org/wiki/NetBus "NetBus") [en:NetBus](https://en.wikipedia.org/wiki/NetBus "en:NetBus") (troyano/virus)|
|25565/tcp||[Minecraft](https://es.wikipedia.org/wiki/Minecraft "Minecraft") Puerto por defecto usado por servidores del juego.|
|31337/tcp||[Back Orifice](https://es.wikipedia.org/wiki/Back_Orifice "Back Orifice") herramienta de administración remota (por lo general troyanos)|
|41121/tcp|tentacle|Protocolo de transferencia utilizado por [Pandora FMS](https://es.wikipedia.org/wiki/Pandora_FMS "Pandora FMS").[5](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-5)​|
|42000/tcp||Utilizado por [_Percona Monitoring Management_](https://es.wikipedia.org/wiki/Percona#Productos "Percona") para recoger [métricas generales](https://es.wikipedia.org/wiki/M%C3%A9trica_del_software "Métrica del software").[6](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-Percona-Monitoring-Managament-6)​|
|42001/tcp||Utilizado por _Percona Monitoring Management_ para recabar datos de desempeño.[6](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-Percona-Monitoring-Managament-6)​|
|42002/tcp||Utilizado por _Percona Monitoring Management_ para recabar métricas de [MySQL](https://es.wikipedia.org/wiki/MySQL "MySQL").[6](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-Percona-Monitoring-Managament-6)​|
|27017/tcp||Utilizado por _Percona Monitoring Management_ para recabar métricas de [MongoDB](https://es.wikipedia.org/wiki/MongoDB "MongoDB").[6](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-Percona-Monitoring-Managament-6)​|
|42004/tcp||Utilizado por _Percona Monitoring Management_ para recabar métricas de [ProxySQL](https://es.wikipedia.org/w/index.php?title=ProxySQL&action=edit&redlink=1 "ProxySQL (aún no redactado)").[6](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-Percona-Monitoring-Managament-6)​|
|45003/tcp||[Calivent](https://es.wikipedia.org/w/index.php?title=Calivent&action=edit&redlink=1 "Calivent (aún no redactado)") herramienta de administración remota SSH con análisis de paquetes.<br><br>smb /tcp/udp 137-19,445|
​
## Puertos efímeros

Artículo principal: _[Puertos efímeros](https://es.wikipedia.org/wiki/Puertos_ef%C3%ADmeros "Puertos efímeros")_

El rango 49152–65535 (desde 215 + 214 hasta 216 − 1) aloja los puertos dinámicos o puertos privados que no son registrados por la IANA.[8](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red#cite_note-IANA,_2019-8)​ Este rango es utilizado para servicios privados o personalizados, con propósitos temporales y con asignación automática bajo los preceptos de _puertos efímeros_.


### Referencias
- [Definición de Puertos](https://www.akamai.com/es/glossary/what-are-ports#:~:text=Los%20n%C3%BAmeros%20de%20puerto%20est%C3%A1n,IANA%20como%20%22reservado%22.)
- [Listado de Puertos de Red](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red)
- [Qué es el Sniffing?](https://www.ctxdetectives.com/que-es-el-sniffing/)
- [Qué es el Spoofing?](https://www.pandasecurity.com/es/mediacenter/que-es-el-spoofing/)
- [Qué es el ataque Man In The Middle?](https://www.welivesecurity.com/la-es/2021/12/28/que-es-ataque-man-in-the-middle-como-funciona/)
- [Qué es el ataque DOS?](https://www.cloudflare.com/es-es/learning/ddos/glossary/denial-of-service/)
- [Qué es el Hijacking?](https://www.iebschool.com/blog/hijacking-serp-google-que-es-como-protegernos-seo-sem/)
- [Qué es el phishing?](https://www.malwarebytes.com/es/phishing)
- [Qué es un Exploit?](https://www.bitdefender.es/consumer/support/answer/22884/)