---
date: 2025-02-25
tags:
  - OctavoSemestre
---
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

## Redes Neuronales Biológicas

Los elementos procesadores en nuestro cerebro son las neuronas, y realizan sumas ponderadas y comparativas como métodos de proceso. Según la literatura, existen $10^{11}$ neuronas dentro de nuestro cerebro y cada neurona tiene la posibilidad de tener hasta $10000$ conexiones. 

Las neuronas como elementos de procesos simples son estructuralmente tan complejas como las células, pero **no son células**. Además, el cuerpo de las neuronas es amorfo, por lo que no tienen una forma definida.

El cerebro no tiene una arquitectura definida, por lo que dentro de nuestro modelo neuronal biológico no existe el sincronismo. A su vez, el cerebro tiene la capacidad de tratar situaciones nuevas.

El voltaje de una neurona en reposo está alrededor de 7-0mv y el umbral está en -55mv
### Elementos de Procesamiento

![[Pasted image 20250225120901.png]]

- Dendritas de Entrada: Vellocidades o canales de entrada por los que una neurona recibe un estímulo o impulso. Son las encargadas de abrir o cerrar los canales iónicos. El núcleo de la neurona es el encargado de recibir y procesar los estímulos para determinar el estado neuronal.  Una fase refractaria es el tiempo que le toma a una neurona el recuperarse para volver a generar un impulso mediante la excitación.

- El núcleo de una neurona compara el nivel de los estímulos por medio de una medición llamada umbral. Si el estímulo no supera el umbral, la neurona no se excitará. Cuando la neurona se excita, se genera un nuevo impulso eléctrico.

- El canal de Axón: Funciona como un filtro y amplificador del impulso eléctrico que se genera desde el núcleo.

- Un Axón de Salida: Funciona como un canal de salida de un impulso eléctrico.

- Sinapsis de Conexión: Se presenta como una calidad de conexión entre una neurona u otra. La fuerza de atracción que existe en un canal sináptico a través de una magnitud numérica que liga o establece la jerarquía de la conexión se define como el peso sináptico.
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
