---
date: 2024-02-09
tags:
  - Redes
---

	Por: Santiago Naranjo Herrera


La [[Comunicación de Datos]] es una forma de pasar información a través de un medio (Transferir Datos). No solo se remonta al ámbito tecnológico, pues los datos se transfieren en todo el mundo partiendo desde una escala natural.

**Tabla de Contenido**

```table-of-contents
```


Los sonidos **graves** con frecuencias altas tienden a llegar más lejos porque pueden esquivar los obstáculos. A diferencia de los **agudos**, que tratan de atravesar el objeto a toda costa.
# ¿Cómo se transfiere la información ahora?

La comunicación de datos se basa en la intencionalidad de la transmisión. ¿Cuál es el sentido de lo que queremos comunicar? Debido a esta pregunta se genera una necesidad que debe de ser contestada. Antes, el hecho de comunicarse o adquirir un conocimiento se remontaba a un ámbito global en el que las personas debían viajar si querían descubrir nuevas cosas, pero con el paso del tiempo, ese concepto se fue transformando hasta lo que en la actualidad se conocen como una Aldea Global. 

## ¿Qué es una Aldea Global?

Una aldea global es el concepto de un espacio social en donde se rompe la barrera del espacio y el tiempo, pues para saber más información sobre el mundo que nos rodea ya no es necesario viajar debido a que existe el internet. El concepto se remonta a la idea de que en la antigüedad las personas solían leer sobre diferentes lugares y tiempos lejanos, sin embargo, en la actualidad es posible cruzarse permanentemente con todos los espacios y todos los tiempos predominando sobre las personas o los lugares con los que convivimos normalmente.
[Aldea Global](https://es.wikipedia.org/wiki/Aldea_global)

Sin embargo gracias a la llegada masiva de diferentes herramientas y los recursos que tenemos hoy en día al alcance de un click, la comunicación se ha vuelto uno de los eslabones más fáciles de crearse así como también de destruirse.

> ***Con la llegada de los íconos o emojis en las redes sociales, estamos creando una nueva forma de comunicar una expresión, pero a su vez hemos destruido una forma de comunicar esa misma expresión.***

### Automatización 

La información es el bien más importante que existe en la actualidad, y la automatización es la parte más esencial en cualquier tipo de proceso.

## Tipos de Señales

![[tiposDeSeñales.png]]
### Señales Análogas

Es aquel tipo de señal que al medirse en el momento exacto pero con diferentes dispositivos, presenta una variación en sus respuestas sin efectuar cambios bruscos en su valor. Así mismo, podemos decir que cuando se representa una magnitud física estamos hablando de una señal análoga. 

>Imagina el ejemplo de un fluviómetro o un medidor de voltaje, pues al momento de medir la energía o el nivel del mar no podemos definir un número exacto y estático en el margen del tiempo, así mismo estas mediciones no cambian de manera abrupta debido a que oscilan dentro de un rango específico a diferencia de las señales digitales.

#### Características

- Son susceptibles al ruido y la interferencia electromagnética.
	- La interferencia electromagnética es la alteración de una señal por la presencia de otra señal no deseada.
- Presentan grandes atenuaciones en grandes distancias.
- No es posible regenerar esas señales.
- No conviven con los sistemas digitales de forma natural. Hay que instalar equipo adicional para lograr la comunicación con un sistema digital.
### Señales Digitales

Son señales análogas que entregan sus resultados basados en unos o ceros. Es decir, que lo que en un principio se concibe como una señal análoga, se transforma a partir de una necesidad de entregar un resultado preciso, exacto y medible.

> Imagina el ejemplo de una grabación de audio: al principio cuando una voz o un instrumento producen el sonido que va a ser grabado, se genera una señal análoga ya que el sonido depende de una frecuencia y una amplitud que varía con el tiempo; sin embargo al momento de almacenar ese sonido se hace una conversión a una señal analógica representada por bits de estados conformados por unos y ceros.

#### Características

- Tienen Inmunidad al ruido electromagnético.
- Tienen convivencia con otros sistemas digitales.
- Es posible regenerar una señal digital. 
- Es posible detectar y corregir errores en una señal digital.
- El procesamiento de una señal digital requiere menos potencia eléctrica, componentes más pequeños y puede llegar a tener un precio menos costoso comparado con el procesamiento de una señal análoga.
- Son sensibles a la sincronía entre elementos conectados.
	- Todos los elementos conectados deben estar funcionando en un mismo tiempo. Es decir que por ejemplo, cuando hablamos de un sistema de transferencias interconectado por medio de computadoras todas las computadoras deben tener sincronizado su reloj interno, pues de lo contrario los datos pueden llegar en el momento equivocado y provocar errores.

### Detección de Errores en una Señal

La detección de una señal consiste en identificar la presencia de una señal en un medio de transmisión, teniendo en cuenta la distinción del ruido de fondo en la señal y otros tipos de interferencias.

#### Técnicas para la detección de errores en una señal.

##### Detección Por Umbral
Se establece un umbral de comparación. Si la señal supera el umbral, se considera presente.

> La detección de un pulso cardiaco en un electrocardiograma. El umbral es definido como un valor mínimo de voltaje que representa la actividad eléctrica del corazón.

##### Detección por Correlación
Se compara la señal con una plantilla que representa a una señal conocida. Si la señal coincide con la plantilla se considera presente.

> El reconocimiento facial. Una plantilla se genera a partir de una imagen del rostro del usuario, y se compara con imágenes capturadas en tiempo real.

##### Detección por Energia
Se calcula la energía de una señal en un intervalo de tiempo, y se compara con un umbral.

> Las grabaciones de voz en una grabación de audio. La energía de la señal aumenta cuando hay una presencia de voz.

###### Recursos
[Detección de la Energía Por Medio de Señales de Voz](https://es.wikipedia.org/wiki/Se%C3%B1al_de_voz#:~:text=La%20variaci%C3%B3n%20de%20energ%C3%ADa%20en,sonoros%20respecto%20a%20los%20sordos.)
##### Detección por Análisis Espectral

La señal se descompone por sus componentes de frecuencia y se analiza la distribución de energía en el espectro.

> La detección de interferencias en una señal de radio. El análisis espectral permite identificar las frecuencias afectadas por la interferencia.

###### Recursos
[Matlab: Análisis del Espectro Básico](https://la.mathworks.com/help/matlab/math/basic-spectral-analysis.html)

### Regeneración de una Señal.

Cuando una señal es degradada por medio de una interferencia de ruido y distorsión, se puede llegar a restaurar a su forma original. 

#### Proceso de regeneración de una señal.

- **Detección:** La señal original se detecta y se convierte en una señal digital.
- **Procesamiento:** La señal se procesa para eliminar el ruido y la distorsión. 
- **Reconstrucción:** La señal digital procesada se convierte de nuevo a su formato original.

#### Técnicas para la regeneración de señales

- **Amplificación:** Utilizada para aumentar la amplitud de la señal sin alterar su forma.
- **Ecualización:** Utilizada para corregir las distorsiones de frecuencia en una señal.
- **Filtrado:** Utilizado para reducir el ruido en una señal.

##### Ejemplo:

Cuando estamos hablando con una persona por medio de una llamada telefónica se puede producir ruido o interferencia que afecte a la calidad de la llamada, y no nos permita escuchar a la otra persona con claridad. Es por esto que existen diferentes medios regeneradores de señal que tratan de restaurarla a un estado limpio y puro. Entre mejor sea el estado de la señal, escucharemos mejor a la otra persona y esa persona nos escuchará mejor a nosotros.

### Recursos
[Señales](https://programas.cuaed.unam.mx/repositorio/moodle/pluginfile.php/824/mod_resource/content/5/contenido/index.html)
[¿Qué es un Regenerador?](https://es.wikipedia.org/wiki/Regenerador#:~:text=Cuando%20una%20se%C3%B1al%20digital%20atraviesa,mediante%20el%20uso%20del%20regenerador.)

# Actividad

#### Buscar cuales son las partes analógicas y digitales de un computador.
### Señales Digitales

- Una computadora digital se basa en una señal compuesta de números binarios que controlan la conducta de su funcionamiento.
- El sistema de reloj en tiempo real de un computador se basa en señales que se dirigen a circuitos digitales.

### Señales Análogas

Todo dispositivo que sea capaz de identificar variables y señales tiene que ser análogo. Lo que sucede con los sensores digitales, es una conversión de un sistema análogo a uno digital para entregar la información que se solicita.

- Una computadora análoga, se basa en una señal compuesta de ondas que pueden ser eléctricas, mecánicas o hidráulicas.
- Un sensor de temperatura para una computadora moderna funciona mediante un sistema que detecta variaciones en la temperatura y las transforma a una señal eléctrica.
- La frecuencia de tasa de refresco de la pantalla de un computador se basa en ondas de transmisión que actualizan la información que se actualiza en la pantalla cada segundo.

#### Investigar todas las formas de comunicación que puede tener un smartphone.

- Llamadas de voz.
- Videollamadas.
- Mensajería Instantánea.
- Redes Sociales.
- Correo Electrónico.
- Mensajes de Texto.
- Foros y Grupos de Discusión.
- Blogs.
- Envío de Archivos.
- Impresión.
- Escaneo.
- Realidad Aumentada
- Asistentes Virtuales
## Referencias
	
[Tipos de Sensores de Temperatura](https://srcsl.com/tipos-sensores-temperatura/#:~:text=%C2%BFQu%C3%A9%20es%20un%20sensor%20de,la%20regulaci%C3%B3n%20de%20la%20temperatura.)
[Qué es una Computadora Analógica](https://es.quora.com/Qu%C3%A9-es-una-computadora-anal%C3%B3gica)
[Relojes en Tiempos Reales](https://es.wikipedia.org/wiki/Reloj_en_tiempo_real#:~:text=El%20siguiente%20sistema%20es%20bien,de%20cuarzo%20o%20resonadores%20cer%C3%A1micos.)
[Fotogramas Por Segundo](https://es.wikipedia.org/wiki/Fotogramas_por_segundo)





