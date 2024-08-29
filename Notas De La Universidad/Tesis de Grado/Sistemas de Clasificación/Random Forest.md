# ¿Qué es?
Es un algoritmo de aprendizaje supervisado que es conformado por múltiples árboles de decisión que normalmente son entrenados con la técnica conocida como [Bagging Method](https://blog.paperspace.com/bagging-ensemble-methods/). La idea general de la técnica bagging method es que una combinación de modelos de aprendizaje aumente el éxito del resultado final.

> Visto de forma simple, random forest construye muchos árboles de decisión y los junta para obtener una predicción más estable y precisa.

# ¿Cómo Funciona?
Una ventaja enorme de un random forest es que puede ser usado tanto para problemas de clasificación como para problemas de regresión, siendo estos dos tipos de problemas la fuente principal de la mayoría de sistemas de machine learning actuales. Puedes ver más sobre su clasificación en un documento que está en esta misma carpeta: [[Clasificación de un Algoritmo Random Forest]].

![[randomForestCon2Arboles.png]]

# Modelos Random Forest en la Clasificación y la Regresión

Random Forest tiene casi los mismos hiperparámetros que un árbol de decisión o un clasificador que use el Bagging Method. Afortunadamente no hay necesidad de combinar un árbol de decisión con un clasificador que use el bagging method porque puedes usar un clasificador basado en clases de para un Random Forest. Con Random Forest, puedes lidiar con tareas de regresión usando el algoritmo de regresión.

Random forest añade una aleatoriedad adicional al modelo que es proporcional al crecimiento de los árboles. En vez de buscar la característica más importante mientras divide un nodo, busca la mejor característica entre un subconjunto aleatorio de características. Estos resultados expanden una diversidad que normalmente termina en un mejor modelo.

Además, en un clasificador de Random Forest, solo un subset aleatorio de las características se toma dentro de la consideración del algoritmo sobre si debe dividir un nodo o no. Incluso puedes llegar a hacer tres árboles aleatorios adicionales si consideras usar umbrales aleatorios para cada característica en vez de buscar por los mejores umbrales posibles (como lo hace normalmente un árbol de decisión).

# Modelos de Random Forest Vs Árboles de Decisión
Debido a que un Random Forest es una colección de Árboles de decisión, hay unas cuántas diferencias.

Si tu ingresas un dataset de entrenamiento con características y etiquetas dentro de un árbol de decisión, este formulará un conjunto de reglas que deben ser usadas para realizar las predicciones.

Por ejemplo, para predecir si una persona hará click o no en un anuncio, tendrías que recolectar información sobre los anuncios a los que esa persona ha hecho click en el pasado, junto con algunas características que describan esta decisión. Si colocas las características y las etiquetas en un árbol de decisión, este generará unas reglas que pueden ayudar a predecir si se ingresará al anuncio o no.

Otra diferencia son las decisiones "profundas" que pueden causar un sobre-ajuste. La mayoría de las veces, los Random Forests evitan esto creando subsets aleatorios de las características y construyendo árboles similares pero más pequeños usando estos subsets. Después, combina los sub-árboles. Es importante notar que esto no funciona todas las veces e incluso puede hacer que el cálculo sea más lento, dependiendo de cuántos árboles construya el modelo de Random Forest.

# Un Ejemplo de un Modelo Random Forest en la Vida Real
Andrew quiere decidir a qué sitio ir durante sus vacaciones de todo un año, así que decide preguntarle a la gente que más conoce sobre sus sugerencias. El primer amigo le cuenta sobre sus gustos y disgustos de viajes pasados. Basándose en sus respuestas, le dará a Andrew algún consejo.

Este es un enfoque típico de un algoritmo de árboles de decisión. El amigo de Andrew creó unas reglas para orientar su decisión basándose en las respuestas de Andrew.

Después, Andrew le pregunta a más y más de sus amigos, y ellos le hacen preguntas de vuelta que pueden usar para darle una recomendación. Finalmente, Andrew escoge los lugares que sus amigos más le recomendaron, lo que es un enfoque típico de un algoritmo de Random Forest.

# La importancia de las características de un Modelo Random Forest
Otra cualidad importante del algoritmo Random Forest es que es muy fácil medir la importancia relativa de cada característica en la predicción. SkLearn ofrece una gran herramienta para esto, la cual mide la importancia de una característica en base a qué tanto se reduce la impureza de todo el árbol con los 3 nodos que hacen uso de la característica dentro del bosque.Así mismo, calcula esta puntuación de forma automática para cada característica después de entrena, y escala los resultados por lo que la suma de toda importancia es igual a uno.

Si no sabes cómo funciona un árbol de decisión, aquí hay una buena descripción de Wikipedia: "En un árbol de decisión, cada nodo interno representa una prueba de un atributo (Por ejemplo, si al lanzar una moneda esta termina siendo cara o cruz), cada rama representa una salida de la prueba, y cada nodo hoja representa una etiqueta de clase (una decisión tomada luego de haber completado todos los atributos). Un nodo que no tiene hijos es un nodo hoja."

Al mirar la importancia de la característica, puedes decidir qué características abandonar en razón de si no contribuyen (o contribuyen muy poco) al proceso de predicción. Esto es importante porque una regla general dentro del machine learning es que entre más características tengas, aumentará la probabilidad de un sobre-ajuste y viceversa.

# Hiperparámetros de un Modelo Random Forest
Los hiperparámetros de un random forest se usan para incrementar el poder predictivo del modelo, o para hacer el modelo aún más veloz. Echemos un vistazo a los hiperparámetros que tiene SkLearn en su función ya construida.

## Imcrementar el poder de predicción
Primero, tenemos al hiperparámetro de **n_estimators**, el cual se define como el número de árboles que construye el algoritmo antes de agarrar los votos máximos, o los votos promediados de una predicción. En general, un número más elevado de árboles aumenta el rendimiento y hace que las predicciones sean más estables, pero de igual forma, hace más lento el proceso de cómputo.

Otro hiperparámetro importante es **max_features**, el cual es el número máximo de características que el random forest tiene en consideración para dividir un nodo. SkLearn proporciona bastantes opciones, siendo todas y cada una de ellas explicadas en la [documentación](http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html).

El último hiperparámetro importante para mencionar en esta categoría es conocido como **min_sample_leaf**. Este determina el número mínimo de hojas para dividir un nodo interno.

## Incrementar la velocidad del modelo Random Forest
El hiperparámetro **n_jobs** le dice al motor cuántos procesadores se pueden usar. Si tiene un valor de uno, solo podrá usar un procesador. Un valor de "-1" indica que no el uso de procesadores no tendrá un límite

El hiperparámetro **random_state** hace que la salida del modelo pueda replicarse. El modelo siempre producirá los mismos resultados cuando tiene una variable definida en su random_state, siempre y cuando también se la hayan dado los mismos hiperparámetros y los mismos datos de entrada.

>Es decir, condiciona el Output.

Por último, tenemos el hiperparámetro **oob_score** (también llamado **oob_sampling**), el cuál es un método de validación cruzada de Random Forest. En este muestreo, no se usan cerca de un tercio de los datos para entrenar el modelo sino para evaluar su rendimiento. Estas muestras son conocidas como muestras fuera del saco. Es bastante similar al método de validación cruzada dejando uno afuera, con la diferencia de que el primero no conlleva una carga adicional para la computación.

# Ventajas y Desventajas del Modelo Random Forest
## Ventajas del Modelo Random Forest
Una de las mayores ventajas de un Random Forest es su adaptabilidad. Puede ser utilizado tanto para tareas de regresión como para tareas de clasificación, y también es fácil mirar la importancia relativa que este le asigna a las características.

- Su uso es muy versátil.
- Tiene hiperparámetros fáciles de entender.
- El clasificador no se sobreajusta con suficientes árboles.

También es importante mencionar que el algoritmo Random Forest es un algoritmo muy manejable debido a que los hiperparámetros que produce casi siempre resaltan una solución acertada. Entender los parámetros casi siempre es una tarea directa, y no existen muchos de los mismos.

Uno de los mayores problemas en el machine learning es el sobre-ajuste, pero en la mayoría de casos esto no pasa gracias a como está conformado un clasificador de un modelo Random Forest. Si hay suficientes árboles en el bosque, el clasificador no sobre-ajustará el modelo.
## Desventajas del Modelo Random Forest
La limitación principal de un Random Forest es que un número grande de árboles pueden hacer que el modelo se vuelva lento y poco efectivo para predicciones en tiempo real. En general, estos algoritmos se entrenan rápido, pero son lentos creando predicciones una vez que ya están entrenados. Un modelo más preciso va a requerir de más árboles, lo que puede acabar en la implementación de un modelo lento. En la mayoría de aplicaciones en el mundo, el algoritmo Random Forest es lento, pero pueden haber situaciones puntuales en las que el rendimiento en tiempo de ejecución sea una prioridad, por lo que se puede optar por otros enfoques.

- Una precisión mayor requiere más árboles.
- Más árboles pueden ralentizar el modelo.
- No se pueden describir relaciones dentro de los datos.

También es importante mencionar que el Random Forest es una herramienta de modelo **predictiva**, mas no una herramienta de modelo descriptiva, lo que significa que si estás buscando una descripción entre las relaciones en tus datos, será mejor buscar otro enfoque.
# Aplicaciones del Modelo Random Forest
Normalmente se usa en un amplio sector de campos como por ejemplo, el sector bancario, el área de medicina y el E-Commerce.

También es usado para:
- Detectar deudores confiables y posibles cometedores de fraude dentro de distintas finanzas.
- Verificar componentes medicinales y datos de pacientes en el área de la medicina.
- Medir si a los clientes les gustará un producto en el E-Commerce


# Referencias
- [Random Forest: A Complete Guide for Machine Learning](https://builtin.com/data-science/random-forest-algorithm)
- [Random Forest Con Python](https://cienciadedatos.net/documentos/py08_random_forest_python)
- [Introduction to Bagging and Ensemble Methods](https://blog.paperspace.com/bagging-ensemble-methods/)