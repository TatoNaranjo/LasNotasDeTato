---
tags:
  - Documentacion
date: 2024-04-26
---

Recursos de investigación para la maquetación del primer trabajo que usa [[Informes Técnicos]]

>Informe técnico de no menos de 4 paginas en las cuales se establezca las diferencias entre la transmisión de señales análogas y digitales de acuerdo al medio que se emplee, además de cual es el recomendado para tal fin de acuerdo los requerimientos, debe ser sustentado como tiempo empleado para tal fin 5 minutos

# Desarrollo del Documento
- ¿Qué es la comunicación de datos? :FiCheck:
- ¿Qué tipo de dispositivos pueden comunicar un dato? :FiCheck:
- ¿Qué es una señal? :FiCheck:
- ¿Cuáles son los diferentes tipos de señales? :FiCheck:
- ¿En qué difiere la seguridad de la transmisión de un dato digital vs un dato análogo? :FiCheck:
- ¿De qué forma se puede perder la calidad de transmisión en una señal? :FiCheck:
- ¿Cómo se puede detectar una señal? :FiCheck:
- ¿Cómo se puede regenerar una señal? :FiCheck:
- ¿Cómo funciona la transmisión de datos entre dispositivos? :FiCheck:
- Comparación entre señales en un sistema que usa señales digitales y analógicas a la vez. :FiCheck:
- Tendencias y futuras aplicaciones de las señales digitales y analógicas. :FiCheck:

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

# ¿Cómo se clasifica una señal?

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

# ¿En qué difiere la seguridad de la transmisión de un dato digital vs un dato análogo?

1. Inmunidad al ruido

Las señales digitales suelen tener mayor inmunidad al ruido y las interferencias del ambiente, esto debido a que el bit del ruido solo puede tener dos estados, 0 o 1, que cambian entre si sin afectar de una forma significativa a la información general.

Por el contrario, en una señal analógica se puede notar una mayor distorsión, que degrada la calidad de la información y por lo tanto la hace más susceptible a presentar errores.

2. Corrección de Errores

En una señal digital los datos se pueden identificar fácilmente para corregir posibles errores al momento de la transmisión, sin embargo, cuando se trata de corregir errores en una señal de tipo analógica se evidencia un proceso más complejo y menos efectivo.

3. Encriptación de datos

Una señal de tipo digital permite encriptar los datos de una forma más sencilla para enviarlos por un medio más seguro como lo pueden ser los cables de fibra óptica o redes privadas, lo que los hace más difíciles de interceptar y descifrar. En una señal analógica el proceso de encriptación se vuelve más complejo y no tiene la misma efectividad debido a que como las señales se transmiten por el espacio tienden a interceptarse con mucha más facilidad.


# ¿Cómo se puede detectar una señal?
La detección de una señal consiste en identificar la presencia de una señal en un medio de transmisión, teniendo en cuenta la distinción del ruido de fondo en la señal y otros tipos de interferencias. Hay diferentes formas de detectar una señal, entre las cuales se encuentran:

- La detección por umbral

En este método de detección de señales se establece un umbral o mínimo de comparación. Si la energía o radiación de la señal supera el umbral se considera presente.

Un ejemplo puede ser la detección de un pulso cardiaco en un electrocardiograma. El umbral se define como un valor mínimo de voltaje que representa la actividad eléctrica del corazón.

- La detección por Correlación

En este método de detección de señales se compara la señal con una plantilla que representa a una señal conocida. Si la señal coincide con la plantilla se considera presente.

Un ejemplo puede ser el método utilizado por un reconocimiento facial. Una plantilla se genera a partir de una imagen del rostro del usuario y se compara con imágenes capturadas en tiempo real.

- La detección de Energía

En este método de detección de señales se calcula la energía de una señal en un intervalo de tiempo y se compara con un umbral.

Un ejemplo puede ser el sistema de supresión de diferentes sistemas de comunicación en una aplicación. La energía de la señal aumenta cuando hay una presencia de voz, de lo contrario el micrófono reduce su sensibilidad suprimiendo todo el ruido de fondo.

- Detección por Análisis Espectral

En este método de detección de señales una señal se descompone por sus componentes de frecuencia y se analiza la distribución de energía en el espectro.

Un ejemplo puede ser la detección de interferencias en una señal de radio. El análisis espectral permite identificar las frecuencias afectadas por la interferencia.

# ¿De qué forma se puede perder la calidad de transmisión en una señal?

Una pérdida de calidad en una señal se debe a las perturbaciones en la transmisión de una señal eléctrica que puede desembocar en la perdida de información en el trayecto de la señal desde el emisor hasta el receptor. Normalmente los diferentes factores que hacen que la calidad de la transmisión en una señal se pierda son inevitables debido a las variables establecidas dentro de un espacio de transmisión. Para contrarrestar la pérdida de información se pueden detectar los errores que puede presentar una señal para tratar de devolverla a un estado inicial puro.

Los diferentes factores que pueden perturbar una señal se definen como:

- Ruido

Se conoce como ruido a toda señal no deseada que interfiera con una señal que se desea transmitir. El ruido se debe a múltiples causas en las que se pueden encontrar los componentes eléctricos, el ruido térmico de un resistor, una interferencia con una señal externa... etcétera.

- Atenuación

Se conoce como atenuación de una señal a la pérdida de potencia sufrida por la misma al pasar por cualquier medio de comunicación. Normalmente el concepto de atenuación depende de las condiciones del entorno en el que se transmite una señal, un ejemplo pueden ser las condiciones atmosféricas. Para que una señal se pueda transmitir de un punto A a un punto B, debe contar con un nivel de energía suficiente.

- Distorsión de Retardo

Es un fenómeno que ocurre cuando diferentes componentes de una frecuencia de una señal se propagan a diferentes velocidades a través de un medio de transmisión, causando que la forma original de la señal se vea afectada debido a que las diferentes frecuencias llegan en diferentes instantes de tiempo al destinatario.

# ¿Cómo se puede regenerar una señal?

Cuando una señal es degradada por medio de una interferencia por ruido o una distorsión se puede intentar restaurar a su forma original. El proceso que se debe seguir para regenerar una señal consta de tres fases:

- La detección

La fase de detección consiste en identificar la presencia de una señal en el medio de transmisión. Se analiza la energía presente en un medio diferenciar por medio de las ondas a la señal del ruido.

- El Procesamiento

Cuando se detecta la señal, se extrae la información que contiene. El procesamiento de una señal conlleva eliminar el ruido y la distorsión que se haya colado en la transmisión. Existen diferentes técnicas de procesamiento de una señal y cada una de ellas se enfoca en corregir un tipo de error diferente:

1. Amplificación: Consiste en aumentar la amplitud de la señal sin alterar su forma original.
2. Ecualización: Consiste en corregir la distorsiones de frecuencia en una señal.
3. Filtrado: Consiste en reducir el ruido en una señal.

- Reconstrucción

La fase de reconstrucción consiste en recrear la señal original a partir de las correcciones hechas en la fase de procesamiento. Frecuentemente se utilizan técnicas de interpolación para rellenar los huecos o brechas que pueden existir en la señal debido al proceso de muestreo y a la distorsión del canal. Lo que se busca en la fase de reconstrucción es obtener una señal lo más similar posible a la transmitida originalmente.

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

# Comparación entre señales en un sistema que usa señales digitales y analógicas a la vez.

Un amplificador de audio puede ser un sistema que usa señales digitales y analógicas a la vez. Este dispositivo puede recibir una señal de audio (Que puede ser una señal analógica o digital) y amplificarla para ser escuchada a través de un altavoz. Para analizar la diferencia de procesamiento y las ventajas de una señal sobre otra, se procederá a hacer una comparación entre las señales analógicas y digitales en un amplificador de audio.

- Usando una señal analógica

1. Es continua, es decir que varía en el tiempo real de una forma suave y constante, lo que permite imitar la forma del sonido original.
2. Puede tomar un valor cualquiera dentro de un rango determinado.
3. La señal es más susceptible al ruido o interferencias en el espacio que pueden afectar la calidad del sonido.
4. Requiere más ancho de banda para transmitir la misma información que una señal digital.

- Usando una señal digital

1. Es discontinua debido a que representa el sonido en valores discretos definidos como Unos o Ceros.
2. Solo puede tomar dos valores (0 o 1).
3. Las interferencias no afectan la calidad del sonido, debido a la invulnerabilidad que ofrecen las señales digitales.
4. Requiere menos ancho de banda para transmitir la misma información que una señal analógica.

**Comparación:**

|Característica|Señal analógica|Señal digital|
|---|---|---|
|Tipo de señal|Continua|Discontinua|
|Rango de valores|Infinito|Finito|
|Susceptibilidad al ruido|Alta|Baja|
|Eficiencia en la transmisión|Baja|Alta|
|Ejemplos|Vinilos, cintas de cassette, radio AM/FM|CDs, MP3, streaming de audio|

- ¿Qué tipo de señal es mejor?

La respuesta depende del usuario y sus necesidades. Cuando se busca una reproducción de sonido mas fiel a la original se usan señales analógicas debido a el reducido proceso de procesamiento por el que tienen que pasar para llegar a el producto final. Así mismo, cuando se busca cierta estabilidad en la calidad del audio mientras se transmite en vivo o se almacena en un dispositivo, es preferible usar señales analógicas que faciliten y hagan más cómodo el uso del amplificador de audio.

# Tendencias y Aplicaciones Futuras de las Señales Digitales y Analógicas

Ahora que conocemos un nuevo concepto sobre como se transmite la información a través de un medio, podemos entender una de las razones que facilitan el crecimiento del sector tecnológico en la actualidad. Aunque es importante analizar el entorno que nos rodea para determinar qué dispositivos pueden hacer uso de una señal digital o analógica, también se deben conocer las nuevas tendencias que surgen en la actualidad para proyectar un futuro en donde la humanidad en su totalidad esté conectada al alcance de un click. Algunas de las tendencias que permiten el mejoramiento de la comunicación de datos son:

- Inteligencia Artificial: La IA se integrará cada vez más en los sistemas de procesamiento de señales para mejorar la detección y detección de errores, la eficiencia y la adaptabilidad de una señal digital.

- Internet de las Cosas: Aunque el concepto como herramienta existe, es importante recalcar que cada día se busca automatizar un sector bajo el concepto de Sector Inteligente, por lo que el constante mejoramiento en la transmisión de señales se volverá un pilar importante la conexión global mediante el internet de las cosas.

- Redes 5G: La mayor velocidad y capacidad de las redes 5G permitirá la transmisión de señales digitales de alta calidad en tiempo real, y gracias a ello se abren nuevas posibilidades para la implementación de aplicaciones como la realidad virtual y la realidad aumentada.

- Blockchain: Hoy en día, la seguridad de la transmisión de información por medio de señales digitales es un pilar fundamental para la tecnología blockchain debido a que asegura la autenticidad y la integridad de su información. Algunas aplicaciones de esta tecnología son las cadenas de suministro de diferentes empresas así como también las finanzas.

- Vehículos Autónomos: El sistema de un vehículo autónomo hace uso de las señales digitales para comunicarse con otros sistemas y con la infraestructura vial por lo que el constante mejoramiento de la transmisión de información será un factor clave en la búsqueda de una conducción automática segura y eficiente.


# Referencias
- [¿Qué es el Internet de las Cosas?](https://www.redhat.com/es/topics/internet-of-things/what-is-iot#:~:text=El%20Internet%20de%20las%20cosas%20(IoT)%20es%20el%20proceso%20que,sistemas%20de%20las%20ciudades%20inteligentes.)
- [¿Qué es una Señal?](https://programas.cuaed.unam.mx/repositorio/moodle/pluginfile.php/824/mod_resource/content/5/contenido/index.html)
- [Medio de Transmisión](https://es.wikipedia.org/wiki/Medio_de_transmisi%C3%B3n#:~:text=Los%20medios%20de%20transmisi%C3%B3n%20son,transmisi%C3%B3n%20no%20guiados%20o%20inal%C3%A1mbricos.)
- [Conversión Analógica Digital](https://es.wikipedia.org/wiki/Conversi%C3%B3n_anal%C3%B3gica-digital#:~:text=La%20conversi%C3%B3n%20anal%C3%B3gico%2Ddigital%20consiste,m%C3%A1s%20sensibles%20las%20se%C3%B1ales%20anal%C3%B3gicas.)
- [¿Qué es el ruido en comunicación?](https://es.wikipedia.org/wiki/Ruido_(comunicaci%C3%B3n)#:~:text=Cuando%20el%20ruido%20se%20a%C3%B1ade,naturaleza%20de%20informaci%C3%B3n%20que%20transporta.)
- [¿Qué es atenuación?](https://es.wikipedia.org/wiki/Atenuaci%C3%B3n)
- [Perturbaciones en la Red](https://microinstalaciones.com.ar/perturbaciones-en-la-red/#:~:text=La%20distorsi%C3%B3n%20de%20retardo%20es,los%20extremos%20de%20la%20banda.)
- [Detección y Corrección de Errores](https://es.wikipedia.org/wiki/Detecci%C3%B3n_y_correcci%C3%B3n_de_errores#:~:text=Si%20se%20requiere%20detecci%C3%B3n%20de,alg%C3%BAn%20momento%20durante%20la%20transmisi%C3%B3n.)
- [Detección de la Energía Por Medio de Señales de Voz](https://es.wikipedia.org/wiki/Se%C3%B1al_de_voz#:~:text=La%20variaci%C3%B3n%20de%20energ%C3%ADa%20en,sonoros%20respecto%20a%20los%20sordos.)
- [Matlab: Análisis del Espectro Básico](https://la.mathworks.com/help/matlab/math/basic-spectral-analysis.html)
- [Señales](https://programas.cuaed.unam.mx/repositorio/moodle/pluginfile.php/824/mod_resource/content/5/contenido/index.html)
- [¿Qué es un Regenerador?](https://es.wikipedia.org/wiki/Regenerador#:~:text=Cuando%20una%20se%C3%B1al%20digital%20atraviesa,mediante%20el%20uso%20del%20regenerador.)
- [Las 10 prácticas de seguridad recomendadas para proteger las copias de seguridad en AWS](https://docs.aws.amazon.com/es_es/prescriptive-guidance/latest/security-best-practices/welcome.html)
- [Análogo vs digital ¿cuál para transmisión inalámbrica?](https://www.avilatinoamerica.com/202012053484/articulos/integracion-comercial/analogo-vs-digital-cual-para-transmision-inalambrica.html "Análogo vs digital ¿cuál para transmisión inalámbrica?")
- [Sistemas y componentes de transmisión por Fibra Óptica](https://www.thefoa.org/ESP/Sistemas.htm)
- [Fundamentos de la señal analógica vs Digital](https://solectroshop.com/es/blog/fundamentos-de-la-senal-analogica-vs-la-digital-n22)
- [Diferencias entre señal analógica y digital](https://www.universidadviu.com/es/actualidad/nuestros-expertos/diferencias-entre-senal-analogica-y-digital)
