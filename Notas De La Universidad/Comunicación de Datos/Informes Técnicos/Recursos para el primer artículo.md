Recursos de investigación para la maquetación del primer trabajo que usa [[Informes Técnicos]]

>Informe técnico de no menos de 4 paginas en las cuales se establezca las diferencias entre la transmisión de señales análogas y digitales de acuerdo al medio que se emplee, además de cual es el recomendado para tal fin de acuerdo  los requerimientos, debe ser sustentado tiempo empleado para tal fin 5 minutos

# Desarrollo del Documento
- ¿Qué es la comunicación de datos? :FiCheck:
- ¿Qué tipo de dispositivos pueden comunicar un dato? :FiCheck:
- ¿Qué es una señal? :FiCheck:
- ¿Cuáles son los diferentes tipos de señales? :FiCheck:
- ¿Cómo funciona la transmisión de datos entre dispositivos? :FiCheck:
- ¿En qué difiere la seguridad de la transmisión de un dato digital vs un dato análogo?
- ¿De qué formas se puede perder la calidad de una señal?
- ¿Cómo se puede regenerar una señal?
- ¿Cuáles son las ventajas de un tipo de señal con respecto a la otra? (No Lo Generalices, todos los dispositivos funcionan de acuerdo a la necesidad de una señal digital o análoga)
- Comparaciones entre diferentes sistemas que usan señales digitales o analógicas.
- Tendencias y futuras aplicaciones de las señales digitales y analógicas.

# ¿Qué es la comunicación de datos?

Una comunicación de datos se refiere al proceso de intercambiar datos entre dos participantes a través de un medio de transmisión como cables o señales inalámbricas, con el fin de recibir información que puede representarse a través de texto, voz, imágenes, etcétera... y así mismo posiblemente generar una respuesta ante la misma. Para que haya un proceso de comunicación deben haber como mínimo dos entidades, en donde una entidad realiza la acción de comunicar un dato mientras la otra entidad toma el papel de recibir ese dato (A este modelo básico de comunicación se le conoce como una comunicación entre un emisor y un receptor). 

El proceso que conlleva tener una comunicación consiste en las siguientes etapas:
1. El emisor tiene una intención de comunicar un mensaje.
2. El emisor construye el mensaje.
3. El emisor codifica el mensaje.
4. Se transmite una señal con el mensaje.
5. El receptor recibe la señal con el mensaje.
6. El receptor decodifica el mensaje.
7. El receptor interpreta el mensaje.
8. El receptor retroalimenta el mensaje.

En un ejemplo práctico, imagine que usted ve pasar a un conocido y desea saludarlo. 
Cuando piensa en querer saludarlo está construyendo una intención para comunicar un mensaje, luego, procede a construir el mensaje pensando en su mente la forma en la que desea saludar a esa persona. Cuando las palabras salen de su boca se transmite una señal que recorre el espacio y puede o no, llegar hacia donde está la persona que desea saludar. Si la persona escuchó las palabras dirigidas hacia usted significa que recibió una señal, y cuando entiende lo que usted quiso decir está decodificando un mensaje. Dependiendo del receptor, puede interpretar el mensaje de una forma u otra para desarrollar una retroalimentación, es decir, para generar una respuesta.

 La información es el bien más preciado que existe, es por ello que se debe garantizar que la información llegue al receptor de la mejor manera posible, y que sea confiable. No debe de ser corrompida, destruida o alterada en el transcurso de un punto A a un punto B. En la actualidad existen diferentes medios para transmitir información, y se han implementado diferentes mecanismos para asegurar la disponibilidad y la integridad de la información a través de cualquier punto del proceso de comunicación.
 
  Basándose el término de una red, uno de los mecanismos implementados conlleva un respaldo de la información que puede ser de utilidad para utilizarse en cualquier momento en el que sea necesaria debido a una brecha en el proceso de comunicación de un dato. Este proceso de respaldo conlleva cuatro fases que se pueden explicar tomando como referencia una práctica de seguridad utilizada por una empresa de servicios de informática en la nube, AWS.

 1. Definir una estrategia de respaldo:
 
 En la primera fase del respaldo de la información se definen los diferentes factores que implican llevar el proceso a cabo. Es decir, se contemplan:
 
- El tipo de información que se necesita respaldar
- La frecuencia con la que se deben realizar los respaldos.
- El lugar en donde se almacenarán las copias de seguridad
- Cómo se transmitirán los datos al destino de almacenamiento.

2. Implementar el proceso de respaldo:

En la segunda fase del respaldo de la información se lleva a cabo la implementación de la estrategia de respaldo planeada con anterioridad. Algunos factores a considerar son:
- El uso de software especializado en crear y gestionar las copias de seguridad.
- La configuración del software para automatizar el proceso de respaldo siguiendo la estrategia definida anteriormente.
- La ejecución del programa, que crea una copia de los datos seleccionados y los envía al destino de almacenamiento.

3. Validar y verificar el proceso de respaldo.

En la tercera fase del respaldo de la información se comprueba que la información ha sido respaldada correctamente y que está completa. Así mismo, opcionalmente se puede restaurar una pequeña parte de la información para verificar que la información se respaldó completamente.

4. Monitoreo y Mantenimiento del proceso de respaldo

En la cuarta y última fase del respaldo de la información se monitoriza el proceso de respaldo para detectar y corregir errores en el mismo.

# ¿Qué tipo de dispositivos pueden comunicar un dato?

Para que un dispositivo pueda transmitir un dato, debe tener las siguientes características:

1. Hardware

El hardware del dispositivo debe contener:
- Una unidad de procesamiento que procese los datos y convertirlos en un formato que pueda ser transmitido.
- Una memoria que almacene los datos que se van a transmitir y que se pueden llegar a recibir.
- Una interfaz de red que permita que un dispositivo se conecte a una red para transmitir o recibir los datos.

2. Software

El software de un dispositivo debe contener:

- Un sistema operativo que controle el funcionamiento del dispositivo y proporcione los servicios necesarios para la transmisión de datos.
- Un controlador de dispositivos que permita al sistema operativo interactuar con el hardware del dispositivo.
- Los protocolos de red que definan unas reglas para transmitir los datos entre dos dispositivos.

3. Conexión a una red

El dispositivo debe tener una conexión a una red de cualquier tipo para poder enviar un dato. Estos tipos de redes pueden ser inalámbricas o cableadas.

Dada la definición de los componentes básicos que necesita un dispositivo para transmitir cualquier tipo de información, hoy en día se puede resumir al conjunto de dispositivos como el internet de las cosas, por sus siglas (IoT, Internet Of Things).

El internet de las cosas es un proceso que permite al usuario conectar diversos elementos físicos cotidianos al internet para transmitir una señal y/o un dato. Algunos de los ejemplos de elementos físicos pueden ser los dispositivos médicos, las prendas, los accesorios personales inteligentes o los sistemas de entornos inteligentes. Por lo general, los dispositivos IoT pertenecen a cualquiera de las dos características: Son interruptores que envían la información a un objeto, o son sensores que recopilan datos y los envían a otro lugar.

El funcionamiento de los elementos IoT tradicionales consiste en enviar, recibir y analizar los datos de forma permanente en un ciclo constante de retroalimentación. Un ejemplo práctico puede ser un termostato inteligente, que consiste en un sensor que recibe información sobre la temperatura en el ambiente, la analiza y la utiliza de una forma recurrente para controlar los diferentes niveles de temperatura en un hogar inteligente.

# ¿Qué es una Señal?

Para poder enviar y recibir la información necesitamos de un medio de energía que pueda portar estos datos y codificarlos mediante un proceso llamado modulación, a esta energía que viaja a través de un espacio determinado por sus medios de transmisión se le conoce como una señal. La energía que porta los datos puede venir en diferentes medios, ya sea por medio de la electricidad o por medio de la luminosidad, debido a que depende del medio de transmisión que se utilice para generar una señal. Las señales que se reciben, procesan y transmiten en un dispositivo pueden variar en su tipo para ser una digital o analógica, sin embargo la constante es que una señal siempre transmite algún tipo de información.

# ¿Cuáles son los diferentes tipos de señales?

- Señales Analógicas

Es aquel tipo de señal que al medirse en el momento exacto pero con diferentes dispositivos, presenta una variación en sus respuestas sin efectuar cambios bruscos en su valor. Así mismo, se puede decir que cuando se habla de una representación de una magnitud física también se está hablando de una señal análoga.

Para ejemplificar el concepto, imagine la implementación en el uso de un fluviómetro o un medidor de voltaje. Al momento de medir la energía o el nivel del mar no se puede definir un numero exacto y estático en un margen de tiempo para representar una magnitud. Así mismo, las mediciones no cambian de una manera abrupta debido a que oscilan dentro de un rango específico a diferencia de una señal digital.

- Características de las señales análogas

1. Son susceptibles al ruido y la interferencia electromagnética.

La interferencia electromagnética es la alteración de una señal por la presencia de otra señal no deseada.

2. Presentan grandes atenuaciones en grandes distancias

Si no se cuenta con la presencia de unos repetidores que aumenten el alcance de una señal análoga, tiende a perderse cuanto mayor sea la distancia.

3. No es posible regenerar una señal analógica.

Debido a que el proceso de regeneración de una señal se hace cuando está procesada, solo se puede hablar de regeneración de una señal si una señal analógica fue convertida previamente a una señal digital.

4. No conviven con los sistemas digitales de forma natural. 

Se tiene que instalar equipo adicional para lograr la comunicación con un sistema digital debido a que no existe una interacción directa entre una señal digital y una señal analógica.

- Señales Digitales

Son señales análogas que entregan sus resultados basados en unos o ceros. Es decir, que lo que en un principio se concibe como una señal análoga, se transforma a partir de una necesidad de entregar un resultado preciso, exacto y medible.

Para ejemplificar el ejemplo, imagine el proceso de una grabación de audio. Al principio cuando una voz o un instrumento producen el sonido que va a ser grabado se genera una señal analógica ya que el sonido depende de una frecuencia y una amplitud que varía con el tiempo. Sin embargo, al momento de almacenar ese sonido se hace una conversión a una señal digital representada por bits de estados conformados por uno y ceros.

- Características de las señales digitales

1. Tienen inmunidad al ruido electromagnético.
2. Tienen convergencia con otros sistemas digitales.

Un sistema que hace uso de una señal digital puede intercambiar información entre diversos componentes que manejen los datos por medio de señales digitales.

3. Es posible regenerar una señal digital.

Debido a que la información contenida en una señal digital ya está procesada, puede aplicar diferentes métodos de detección de errores para corregir posibles degradaciones en la señal por medio de métodos como la amplificación, la ecualización y el filtrado.

4. El procesamiento de una señal digital requiere menos potencia eléctrica, tiene componentes más pequeños y puede llegar a tener un precio menos costoso.
5. Son sensibles a la sincronía entre elementos conectados.

Todos los elementos conectados deben estar funcionando en un mismo tiempo. Es decir que por ejemplo, cuando hablamos de un sistema de transferencias interconectado por medio de computadoras todas las computadoras deben tener sincronizado su reloj interno, pues de lo contrario los datos pueden llegar en el momento equivocado y provocar errores.


# ¿Cómo funciona la transmisión de datos entre dispositivos?

Para definir el funcionamiento de la transmisión de datos entre dispositivos se tiene que pasar por un proceso que consta de cuatro puntos claves similares a el proceso de la comunicación, dichos puntos claves serán mencionados a continuación.

1. Codificación

Al inicio de una comunicación de datos entre dispositivos la información se convierte en un formato que puede ser transmitido. Por lo general, la conversión hace que los datos pasen de un dispositivo a otro por medio de señales que pueden ser digitales o analógicas.

2. Transmisión

Los datos ya codificados se envían a través de un medio físico.  Profundizando en los diferentes medios de transmisión de datos según su necesidad de utilizar o no un soporte físico, se pueden clasificar en los siguientes dos grupos:

- Medios de Transmisión Guiados (o Alámbricos)

Están constituidos por cables que se encargan de conducir las señales que contienen información desde un punto A hasta un punto B. Dentro de las diferentes herramientas que se utilizan como medios de transmisión guiados están:

- El cable de par trenzado y el Cable Coaxial: Permiten la transmisión de señales eléctricas.
- La Fibra Óptica: Utiliza pulsos de luz para transmitir la información.



- Medios de Transmisión no Guiados (o Inalámbricos)

En este medio, las señales se propagan a través del espacio sin un medio físico que las contenga. La transmisión y recepción de información se realiza a través de antenas. A la hora de transmitir información la antena irradia energía electromagnética en el medio, mientras que al momento de recibir la información se captan las ondas electromagnéticas del medio que las rodea. Debido a que los medios de transmisión no guiados no tienen un medio físico que contenga las señales, se establece una comunicación basada en la forma en la que la información viajará a través del espacio:

- Configuración Direccional: La antena emisora transmite energía electromagnética concentrándola en un haz, y las antenas emisora y receptora deben estar alineadas para recibir la información.

- Configuración Omnidireccional: La radiación de energía electromagnética se dispersa por el espacio dando la posibilidad de recibir los datos por varias antenas a la vez.


3. Recepción

El dispositivo que recibe los datos pasa por un proceso en el que decodifica los datos (Es decir, convierte una señal análoga a una señal digital que pueda ser interpretada por los componentes del dispositivo) y los convierte a el formato original en el que fueron enviados.

4. Entrega

Los datos ya decodificados se transfieren a la aplicación o servicio que hace uso de los mismos dentro del dispositivo.
# Referencias
- [¿Qué es el Internet de las Cosas?](https://www.redhat.com/es/topics/internet-of-things/what-is-iot#:~:text=El%20Internet%20de%20las%20cosas%20(IoT)%20es%20el%20proceso%20que,sistemas%20de%20las%20ciudades%20inteligentes.)
- [¿Qué es una Señal?](https://programas.cuaed.unam.mx/repositorio/moodle/pluginfile.php/824/mod_resource/content/5/contenido/index.html)
- [Medio de Transmisión](https://es.wikipedia.org/wiki/Medio_de_transmisi%C3%B3n#:~:text=Los%20medios%20de%20transmisi%C3%B3n%20son,transmisi%C3%B3n%20no%20guiados%20o%20inal%C3%A1mbricos.)
- [Las 10 prácticas de seguridad recomendadas para proteger las copias de seguridad en AWS](https://docs.aws.amazon.com/es_es/prescriptive-guidance/latest/security-best-practices/welcome.html)
- [Análogo vs digital ¿cuál para transmisión inalámbrica?](https://www.avilatinoamerica.com/202012053484/articulos/integracion-comercial/analogo-vs-digital-cual-para-transmision-inalambrica.html "Análogo vs digital ¿cuál para transmisión inalámbrica?")
- [Sistemas y componentes de transmisión por Fibra Óptica](https://www.thefoa.org/ESP/Sistemas.htm)
- [Fundamentos de la señal analógica vs Digital](https://solectroshop.com/es/blog/fundamentos-de-la-senal-analogica-vs-la-digital-n22)
- [Diferencias entre señal analógica y digital](https://www.universidadviu.com/es/actualidad/nuestros-expertos/diferencias-entre-senal-analogica-y-digital)
