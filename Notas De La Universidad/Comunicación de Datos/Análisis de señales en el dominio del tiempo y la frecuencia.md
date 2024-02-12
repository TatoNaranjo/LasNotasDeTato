Segunda clase de [[Comunicación de Datos]]
# Definición
Es un conjunto de técnicas par la caracterización y manipulación de señales cuyas estadísticas varían en el tiempo. Cuándo hablamos del análisis del tiempo nos referimos a una conversión Analógica-Digital.
# Dominio del tiempo
El análisis en el dominio del tiempo muestra el comportamiento de la señal a lo largo del tiempo. Un gráfico del dominio temporal muestra la evolución de una señal en el tiempo. 
# Dominio de la frecuencia
Se utiliza en condiciones en las que se requieren procesos como el filtrado, la amplificación y la mezcla. Un gráfico frecuencial muestra los componentes de la señal según la frecuencia en la que oscila dentro de un rango determinado.

> Es necesario filtrar la señal para transmitir la información de la mejor manera posible, identificando lo datos más esenciales de esa señal.
# Señal
Para procesar estas señales necesitamos de un proceso en el que entra una señal de entrada analógica que parte de la naturaleza y pasa por un sistema determinado para después obtener una respuesta a esa señal, es decir una señal digital tratada.
## Clasificación de señales
- Señal lineal, una señal cuyo valor no cambia a lo largo del tiempo.
- Señal Sinoidal, aquella que cambia su polaridad.
- Señal discreta, aquella que ya está siendo procesada y se convierte en muestreos
### Tiempo Continuo
Las señales de tiempo continuo se caracterizan por tener un dominio definido en término del conjunto de los números reales. En otras palabras, están especificadas para cada valor real de tiempo $t$, lo que significa que su amplitud varía de manera continua con el tiempo. 

>La información de un sistema continuo es tan amplia que ningún sistema puede tomarla en su totalidad.

Esta definición contrasta con el tiempo discreto, en las cuales el dominio se define en términos de números enteros.
## Tiempo discreto
Se definen por tener un dominio que se especifica únicamente para ciertos valores finitos del tiempo. Esto significa que la amplitud de la señal solo cambia en intervalos discretos del tiempo, a diferencia de las señales de tiempo continuo, en las cuales la amplitud cambia de manera continua en el tiempo. Se sacrifica parte de la información con el objetivo de transmitir más rápido la información con el menor número de pérdidas posibles.

La definición de dominio discreto permite trabajar con señales digitales en sistemas de comunicación y procesamiento de señales, lo que resulta útil en muchas aplicaciones prácticas. Este tipo de señales se utilizan comúnmente cuando se muestrea una señal analógica a través de un conversor analógico/digital (*ADC* por sus siglas en inglés).
### Ejemplo

- Cuando hablamos de telefonía e sacrifican ciertas partes del mensaje al no procesar todos los sonidos, pero el emisor y el receptor pueden seguir identificando esos valores que hacen que la voz de la persona sea reconocible.

- Un formato en MP3 es un formato comprimido de música que aún así sigue conservando la información requerida para que el sonido siga siendo distinguible aunque hayan pérdidas.

> Nos hemos acoplado a un mundo de compresión.
## Discretización de las señales analógicas
Es el proceso de convertir una señal analógica o de tiempo continuo, en una señal discreta. Se habla de una unipolaridad y bipolaridad en el mensaje, teniendo en cuenta que tenemos polaridades negativas o positivas en una señal Senoidal a cantidades iguales.

Tomamos un tipo de información específica para convertirla a un pulso, y aunque la discretización elimina una cierta cantidad de información, toma la necesaria para que el mensaje llegue correctamente.

La importancia de los procesos de conversión analógico-digital (*ADC*) y digital-analógico (*DAC*) radica en su papel central en la integración y funcionalidad de sistemas electrónicos en nuestra vida cotidiana y en diversas industrias.

>Cuando se trabaja en redes también se tiene que manejar este tipo de información, debido a la información o datos que van a ser capturados del mundo externo.

Para discretizar una señal analógica hace falta un convertidor analógico, es decir, un circuito especializado en esta tarea.
## Resolución
La mínima diferencia en la señal de entrada que el convertidor puede detectar. Se mide en bits y determina la cantidad de valores discreto que el convertidor puede producir. Por ejemplo, un *ADC* de 8 bits puede representar $2^8$ ($256$) valores diferentes.

Es el numero de bits que vamos a requerir para transformar esta señal en un tren de datos. El numero de muestras va a ser $2^n$ en donde $n$ es el bit que vamos a tomar.

El numero de muestras determina en cuantas partes se divide una señal para tomar información, por lo que al aumentar la resolución vamos ganando mayor cantidad de información. Lo recomendable para capturar una información de analógica a digital, lo recomendable es manejar $8$ o $10$ bits.

Ejemplo: Cuál es la variación de voltaje de una señal que tiene como pico de voltaje 5 voltios con 8 bits?

**Divide los voltios en el número de bits que vas a utilizar**
$5/256 = 19.5mv$ 

### Ejercicios
Hallar la variación de los siguientes parámetros, todos con un pico máximo de 5 voltios.

1. 8bits de resolución, F3.
2. 10 bits de resolución,145
3. 16 bits de resolución, 735F
4. 24 bits de resolución en 5A3810

#### Pasos a Seguir:

### Tabla de Prefijos Métricos
![[prefijosMétricos.png]]

> ***Notas de Tato: Tener cuidado con las notaciones científicas, pueden costar a nivel de desarrollo de software (Líneas de Producción... Etc).***

# Tasa de Muestreo
Frecuencia con la que el convertidor analógico-digital muestrea la señal de entrada. Se mide en muestras por segundo (*SPS*). Una tasa de muestreo más alta permite capturar más información de la señal de entrada, pero requiere más recursos de procesamiento y almacenamiento. 
Por ejemplo, un microcontrolador controla las tasas de muestreo por medio de el reloj del procesador para obtener las pruebas requeridas o verificar en qué momento hay variaciones en el momento de llegada de una señal de entrada análoga. El pre-escalamiento está dado entre 10 y 100 kbps.

## Cantidad de canales
Se refiere al número de señales analógicas que el convertidor puede procesar simultáneamente. Los convertidores pueden ser de un solo canal o multicanal, dependiendo de las necesidades de la aplicación. El numero de canales depende del microprocesador con el que estemos trabajando. Cuando se trabaja con Arduino o Raspberries podemos estar hablando de hasta 20 canales, en los que cada uno de ellos me permite realizar una tarea diferente.

## Rango de Voltaje
Define los límites de voltaje de entrada que el convertidor puede manejar. Este rango debe ser adecuado para la señal que se pretende medir para evitar la saturación o la pérdida de datos. Siempre debemos llevar una información a este limite de voltaje para evitar daños en el los canales de un dispositivo. Para llevar una señal análoga al limite de voltaje se debe de usar un *transformador*, el cual permite disminuir o aumentar el voltaje de una señal en caso de que sea necesario.

![[diagramaTransformador.png]]
**Diagrama de un transformador eléctrico**

La potencia del primario debe de ser igual a la potencia del secundario, es decir que si el voltaje baja la corriente debe de subir para que haya un equilibrio dentro del sistema. Adicionalmente existe una relación de transformación que está dada por la siguiente fórmula. 
**Relación de Transformación de un transformador eléctrico:** $\frac{v1}{v2}= \frac{I1}{I2}= n$

Matemáticamente la fórmula me elimina todos los valores de voltaje y corriente por lo que la magnitud de la relación de Transformación es adimensional. Lo que nos está indicando es el numero de veces que se reduce el valor de lo que ingresa.

Otra manera de lograr reducir el voltaje es a traves de un *divisor de voltaje*. Tomamos dos resistencias de un valor muy alto, en el orden de los Mega Ohms, las conectamos en serie y nos aseguramos que la relación entre las resistencia sea tal que el voltaje en el nodo formado por las dos resistencias sea una fracción de voltaje total.

**Relación de Transformación de un divisor de voltaje:** $Vx = \frac{Vf*R1}{R1+R2}$
