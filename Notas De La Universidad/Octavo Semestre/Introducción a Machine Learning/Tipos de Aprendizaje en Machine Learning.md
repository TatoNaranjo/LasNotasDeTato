
## Aprendizaje Supervisado
Requiere que los datos de entrada de los que se va a extraer un conocimiento sean:
- Identificados
- Clasificados
- Descritos

La identificación del tipo de entrada se llama anotación o etiqueta (**LABELS**). Además en este tipo de aprendizaje los datos se conocen como conjuntos no anotados.

## Aprendizaje No Supervisado
Los datos usados contienen implícitamente la anotación. La tarea del algoritmo está en encontrar la clasificación. Sin embargo, la complejidad algorítmica es mayor.

# Datos de Aprendizaje
- Son registros de datos tabulados.
- El conjunto completo es conocido como un conjunto de datos o dataset.
- Cada una de las filas de la tabla son instancias o casos del fenómeno conocidas como muestras
- Cada columna constituye una característica, o FEATURE o dimensión del problema.

## Espacio de Soluciones
- Es el hiper-volumen en el que se encuentran las soluciones para el problema propuesto.
- Normalmente existen múltiples dimensiones dentro del espacio de soluciones, por lo que el algoritmo debe hallar la mejor solución.

# Algoritmo de Aprendizaje de Machine Learning
Es la estrategia que usamos para crear el mecanismo para localizar la mejor solución dentro del espacio de soluciones constituido por el DATASET.  La creación de la estrategia es llamada entrenamiento o TRAINING. La estrategia utilizada se llama MODELO.

## Estados del Modelo
Un modelo busca hallar un patrón común que identifica cada instancia de datos. El proceso es conocido como Generalización. Un modelo generalizado está bien entrenado y no está sesgado.

### Sobre-Entrenamiento
- Ocurre cuando el modelo aprende únicamente los casos del DATASET usado para entrenarlo. Esto se conoce como un sesgo o BIAS, en donde el modelo tiene una respuesta correcta únicamente en los datos en donde se entrenó.
### Underfitting
Ocurre cuando el modelo tiende a identificar erróneamente las muestras. El modelo carece de criterios suficientes para separar las muestras adecuadamente.