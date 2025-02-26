---
date: 2025-02-26
tags:
  - OctavoSemestre
---
**Índice**
```table-of-contents
```
# Introducción
## Contexto

La inteligencia artificial consta de redes de autoproceso, que a su vez se divide en un procesamiento numérico y un procesamiento simbológico. El Procesamiento numérico tiene sistemas asociativos y sistemas distribuidos (Estos últimos se componen de redes neuronales y redes subsimbólicas).

El desarrollo de la clase se va a basar en sumas y restas ponderadas, con el dilema de que las mismas operaciones deben de ser recursivas.

## Lo Que Se Busca

- Exponer los aspectos básicos de las redes neuronales.
- Exponer los conceptos acerca de las redes neuronales.
- Exponer los conceptos del aprendizaje natural y automático.
- Exponer los conceptos del reconocimiento de patrones,
- Plantear el modelo de redes neuronales artificiales.
- Exponer las arquitecturas de las redes neuronales.

## Introducción
La materia de este curso se ampara en los agentes inteligentes como una de las técnicas para emular el comportamiento de los seres humanos basándose en las redes neuronales artificiales.

Las redes neuronales nos pueden permitir el reconocimiento de patrones, el agrupamiento de patrones y la reconstrucción de patrones.

## Conceptualización

Primero se debe comprender cómo funcionan las neuronas biológicas, luego tratamos de hacer una analogía definiendo los conceptos en una neurona artificial. Posteriormente se plantea el problema y el cómo resolverlo mediante los algoritmos más acertados.

La arquitectura nos describe a nosotros el cómo está construida la red, cuáles son sus características y cómo se relacionan. Una vez definida, podemos decidir si nos vamos por el tipo de red no recurrente (aquella que necesita un entrenamiento supervisado) o una red recurrente (aquella no necesita de un entrenamiento supervisado).

Cuando el conjunto de patrones se puede categorizar agrupar, o ordenar en categorías mediante una línea recta, entonces se dice que los patrones son linealmente separables (y tienen infinitas soluciones). Si esto sucede, existirán algunas arquitecturas que nos permitirán poder realizar el trabajo diseñando un modelo para categorizar los patrones linealmente separables.

Si el problema no presenta una sola línea recta para poder solucionar o clasificar el conjunto de patrones, se puede decir que los patrones no son linealmente separables, por lo que entrenar por ejemplo, un perceptrón, se tardaría bastante tiempo. En este caso se puede optar por un entrenamiento basado en una línea curva que puede otorgar una solución.

En caso de que el problema no pueda ser resuelto mediante la utilización de líneas, existen técnicas que pueden ser capaces de otorgar una clasificación de patrones basados en zonas en vez de lineas para resolver un problema de categorización.

>[!Quote] Ing. Jaime Andrade
La complejidad de la red es directamente proporcional a la cantidad de patrones. Por ejemplo: Cuando hablamos de una imagen, la asociamos a una matriz.

Cuando la red no puede trabajar con líneas o puntos, entonces toca referirse a las matrices que van a hacer uso de las sumas y los puntos como operaciones que conforman un resultado final basándose en capas gracias a un área.

Algunos problemas no linealmente separables se pueden llegar a resolver por medio de la utilización de varios perceptrones debido a que las lineas se pueden volver un área, esa área un volumen y ese volumen un entrenamiento por capas, sin embargo no suele ser viable debido al tiempo que se tardaría al entrenar tantos modelos.

# Red Neuronal Biológica

Los elementos procesadores en nuestro cerebro son las neuronas, y realizan sumas ponderadas y comparativas como métodos de proceso. Según la literatura, existen $10^{11}$ neuronas dentro de nuestro cerebro y cada neurona tiene la posibilidad de tener hasta $10000$ conexiones. 

Las neuronas como elementos de procesos simples son estructuralmente tan complejas como las células, pero **no son células**. Además, el cuerpo de las neuronas es amorfo, por lo que no tienen una forma definida.

El cerebro no tiene una arquitectura definida, por lo que dentro de nuestro modelo neuronal biológico no existe el sincronismo. A su vez, el cerebro tiene la capacidad de tratar situaciones nuevas.

El voltaje de una neurona en reposo está alrededor de 7-0mv y el umbral está en -55mv
## Elementos de Procesamiento

![[Pasted image 20250225120901.png]]

- **Dendritas de Entrada:** Vellocidades o canales de entrada por los que una neurona recibe un estímulo o impulso. Son las encargadas de abrir o cerrar los canales iónicos. El núcleo de la neurona es el encargado de recibir y procesar los estímulos para determinar el estado neuronal.  Una fase refractaria es el tiempo que le toma a una neurona el recuperarse para volver a generar un impulso mediante la excitación.

- El **núcleo** de una neurona compara el nivel de los estímulos por medio de una medición llamada umbral. Si el estímulo no supera el umbral, la neurona no se excitará. Cuando la neurona se excita, se genera un nuevo impulso eléctrico.

- **El canal de Axón**: Funciona como un filtro y amplificador del impulso eléctrico que se genera desde el núcleo.

- **Un Axón de Salida**: Funciona como un canal de salida de un impulso eléctrico.

- **Sinapsis de Conexión**: Se presenta como una calidad de conexión entre una neurona u otra. La fuerza de atracción que existe en un canal sináptico a través de una magnitud numérica que liga o establece la jerarquía de la conexión se define como el peso sináptico.
- $10^{4}$ sinapsis por neurona.
  
- Comunicación mediante potenciales de Acción.

- Generación de nuevas conexiones asociadas a nuevas experiencias.
  
- Consolidación de conexiones que hacen que las mismas puedan fortalecerse o debilitarse.

- Potenciales de Acción (PA): Niveles o Umbrales que determinan el reposo o excitación neuronal.
## Naturaleza Eléctrica de la Neurona
- Es una onda de descarga eléctrica que viaja a lo largo de la membrana de la neurona.
- Se utilizan para llevar información entre neuronas.
- Se generan en las células y las neuronas.
- Tienen un periodo refractario de $10^{-3}$ segundos entre los potenciales de acción.

- Desde que se genera un estímulo hasta que la neurona está lista pasan aproximadamente 4 milisegundos. La fase fractaria está en promedio de 5 a 2 milisegundos.

$\text{Na = Ion Positivo, K = Ion Negativo}$

**La conexión sináptica nunca es igual a 0. Si es negativo significa que está inhibiendo el conocimiento, sin embargo si es positivo, significa que está siendo invadido por iones de sodio.**

El umbral determina la sensibilidad neuronal, por lo que su excitación está ligada en su índice de aprendizaje.

El sobreentrenamiento tiene un problema y es que la red desaprende y biológicamente los enlaces empiezan a separarse, por lo tanto el modelo está sujeto a **Desaprender**.

Cuando el error alcanza el mínimo permitido podemos decir que entra en **Convergencia**. Por el contrario, cuando el error se aleja del mínimo permitido podemos decir que entra en **Divergencia**.

![[Pasted image 20250226081539.png]]

![[Pasted image 20250226081608.png]]

# Red Neuronal Artificial (RNA)

Para cada patrón de entrada debe existir una única neurona, y estos patrones que se reciben se arquitectan por capas.  Esto funciona como un modelo de caja negra en el que siempre debemos abogar por optimizar el modelamiento de la red neuronal. 

![[Pasted image 20250226081633.png]]

![[Pasted image 20250226083356.png]]
## Partes de una RNA

- Entradas (X)
- Salida (Y)
- Pesos Sinápticos (W)
- Función Suma (net)
- Función de Activación (f)
	- Función de Escalon: Solo tiene 2 estados: 0 o 1.
	- Función Lineal.
	- Función Gaussiana
	- Función Signoidal o mixta.
 - Funcionamiento en modo P
### Capa de Entrada
Los datos son recibidos en la capa de entrada, por lo que conociendo los patrones de entrada podemos determinar la cantidad de neuronas en la capa de entrada. Ej: En función de una temperatura el problema nos puede entregar $n$ patrones de entrada, tengo un número de soluciones como abrir una puerta o cerrar una ventana, por lo que **Nosotros definimos cuántas salidas necesitamos** proyectándonos en resolver un problema.
### Capa de Salida
Por cada patrón de salida existe una neurona de salida, por consiguiente cada neurona tiene un único patrón de salida y se define la magnitud de la etapa de salida.
### Capas Ocultas
Todas las capas que estén comprendidas entre capas de entrada y capas de salida se comprenden como capas ocultas. Siempre tenemos que abogar por empezar con crear neuronas progresivamente dentro de la capa oculta para evitar el hecho de crear neuronas innecesariamente, la recomendación es inicialmente siempre crear una sola neurona oculta luego de crear una capa oculta.
### Pesos Sinápticos
Son las conexiones entre las neuronas, aquellas que se determinan en la entrada se conocen como pesos  sinápticos de entrada.  Así mismo, las conexiones que provienen de una capa oculta y se conectan con la salida se conocen como pesos sinápticos de salida. La nomenclatura que siguen es $\omega ji$, en donde $j$ es el índice de la neurona en la que se encuentra actualmente, e $i$ es de la neurona de donde proviene. Cuando las conexiones de las neuronas van de una a otra y únicamente de izquierda a derecha podemos decir que esta red es de tipo forward. 

Los pesos sinápticos crecen en proporción a las capas, y si los pesos no cambian con el paso del tiempo queremos decir que la red aprendió.

Las neuronas de entrada no hacen un procesamiento debido a que en el salen los mismos valores que entran, En el caso de la capa oculta, se dispone de una función de transferencia que define el proceso por medio de un procesamiento.

La función de transferencia cumple la función de un núcleo, en donde primero se **Pondera**, luego se **Suma** y luego se **Compara**. Si la comparación es mayor al umbral, ya no se entrega un impulso eléctrico, sino un impulso de una función de transferencia.

Todas las neuronas de la capa de entrada y salida se manejan por la función del núcleo que es definido por la sumatoria de la actividad.
### Umbral
Es considerado como una neurona adicional que biológicamente no existe, pero en lo artificial sirve para poder asignar un nivel de excitación en las neuronas de la red. Esto normalmente es conocido como BIAS. Cuando hablamos de $\omega 0$, sabemos que este corresponde al umbral.
### Patrones
Los patrones se pueden encontrar en dos tipos de datos, análogos (números reales) o digitales (1s y 0s). Si los patrones en la salida y en la entrada son análogos se dice que la red es una red análoga, por el contrario, si los patrones en la salida y en la entrada son digitales se dice que la red es digital. Cuando los patrones análogos y digitales se combinan, se dice que la red es híbrida. 

Se definen como el conjunto de valores de entrada.

## Inspiración Biológica

- Buscamos inclinarnos a adquirir conocimiento desde la experiencia.
- Un conocimiento almacenado en conexiones sinápticas.
- Tienen una gran facilidad neuronal y tolerancia a fallos.
- Un comportamiento altamente no lineal.

## Características

Es un sistema de procesamiento de información que tiene propiedades inspiradas en las redes neuronales biológicas:

- La información se procesa simultaneamente en las neuronas de cada capa.
- Las conexiones entre neuronas permiten la transferencia de información neuronal.
- El procesamiento de información ocurre en muchos elementos simples basados neuronas.
- Las señales son transferidas entre neuronas a través de enlaces de información.
- Cada conexión es representada por un peso sináptico (ponderación).
- Existen neuronas que no hacen procesamiento (Capa de Entrada) y otras que modelan el trabajo del núcleo biológico mediante la ponderación, sumatoria y la generación de potenciales de acción.

## Modelo de una RNA

![[Pasted image 20250226093548.png]]

## RB VS NA

- Neurona = Unidad de Procesamiento
- Dentritas = Entradas ($x$)
- Axón = Salidas ($y$)
- Conexiones Sinápticas = Conexiones Con Pesos ($\omega$)
- Efectividad Sináptica = Peso Sináptico ($\omega ij$)
- Excitación / Inhibición = Pesos Wij (+ o -).
- Potencial = Valores de Entrdadas o Salidas
- Combinado de PAs = FUnción de Programación ($\sum$)
- Potencial de Acción = Función de Transferencia ($f$)

