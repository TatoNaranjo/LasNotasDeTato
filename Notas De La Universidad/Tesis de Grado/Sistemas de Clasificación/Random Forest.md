# ¿Qué es?
Es un algoritmo de aprendizaje supervisado que es conformado por múltiples árboles de decisión que normalmente son entrenados con la técnica conocida como [Bagging Method](https://blog.paperspace.com/bagging-ensemble-methods/). La idea general de la técnica bagging method es que una combinación de modelos de aprendizaje aumente el éxito del resultado final.

> Visto de forma simple, random forest construye muchos árboles de decisión y los junta para obtener una predicción más estable y precisa.

# ¿Cómo Funciona?
Una ventaja enorme de un random forest es que puede ser usado tanto para problemas de clasificación como para problemas de regresión, siendo estos dos tipos de problemas la fuente principal de la mayoría de sistemas de machine learning actuales. Puedes ver más sobre su clasificación en un documento que está en esta misma carpeta: [[Clasificación de un Algoritmo Random Forest]].

![[randomForestCon2Arboles.png]]

# Random Forest en la Clasificación y la Regresión

Random Forest tiene casi los mismos hiperparámetros que un árbol de decisión o un clasificador que use el Bagging Method. Afortunadamente no hay necesidad de combinar un árbol de decisión con un clasificador que use el bagging method porque puedes usar un clasificador basado en clases de para un Random Forest. Con Random Forest, puedes lidiar con tareas de regresión usando el algoritmo de regresión.

Random forest añade una aleatoriedad adicional al modelo que es proporcional al crecimiento de los árboles. En vez de buscar la característica más importante mientras divide un nodo, busca la mejor característica entre un subconjunto aleatorio de características. Estos resultados expanden una diversidad que normalmente termina en un mejor modelo.

Además, en un clasificador de Random Forest, solo un subset aleatorio de las características se toma dentro de la consideración del algoritmo sobre si debe dividir un nodo o no. Incluso puedes llegar a hacer tres árboles aleatorios adicionales si consideras usar umbrales aleatorios para cada característica en vez de buscar por los mejores umbrales posibles (como lo hace normalmente un árbol de decisión).

# Modelos de Random Forest Vs Árboles de Decisión
Debido a que un Random Forest es una colección de Árboles de decisión, hay unas cuántas diferencias.

Si tu ingresas un dataset de entrenamiento con características y etiquetas dentro de un árbol de decisión, este formulará un conjunto de reglas que deben ser usadas para realizar las predicciones.

Por ejemplo, para predecir si una persona hará click o no en un anuncio, tendrías que recolectar información sobre los anuncios a los que esa persona ha hecho click en el pasado, junto con algunas características que describan esta decisión. Si colocas las características y las etiquetas en un árbol de decisión, este generará unas reglas que pueden ayudar a predecir si se ingresará al anuncio o no.

Otra diferencia son las decisiones "profundas" que pueden causar un sobre-ajuste. La mayoría de las veces, los Random Forests evitan esto creando subsets aleatorios de las características y construyendo árboles similares pero más pequeños usando estos subsets. Después, combina los sub-árboles. Es importante notar que esto no funciona todas las veces e incluso puede hacer que el cálculo sea más lento, dependiendo de cuántos árboles construya el modelo de Random Forest.

# Un Ejemplo de Random Forest en la Vida Real
Andrew quiere decidir a qué sitio ir durante sus vacaciones de todo un año, así que decide preguntarle a la gente que más conoce sobre sus sugerencias. El primer amigo le cuenta sobre sus gustos y disgustos de viajes pasados. Basándose en sus respuestas, le dará a Andrew algún consejo.

Este es un enfoque típico de un algoritmo de árboles de decisión. El amigo de Andrew creó unas reglas para orientar su decisión basándose en las respuestas de Andrew.

Después, Andrew le pregunta a más y más de sus amigos, y ellos le hacen preguntas de vuelta que pueden usar para darle una recomendación. Finalmente, Andrew escoge los lugares que sus amigos más le recomendaron, lo que es un enfoque típico de un algoritmo de Random Forest.

# La importancia de las características de un Random Forest
Otra cualidad importante del algoritmo Random Forest es que es muy fácil medir la importancia relativa de cada característica en la predicción. SkLearn ofrece una gran herramienta para esto, la cual mide la importancia de una característica en base a qué tanto se reduce la impureza de todo el árbol con los 3 nodos que hacen uso de la característica dentro del bosque.Así mismo, calcula esta puntuación de forma automática para cada característica después de entrena, y escala los resultados por lo que la suma de toda importancia es igual a uno.

Si no sabes cómo funciona un árbol de decisión, aquí hay una buena descripción de Wikipedia: "En un árbol de decisión, cada nodo interno representa una prueba de un atributo (Por ejemplo, si al lanzar una moneda esta termina siendo cara o cruz), cada rama representa una salida de la prueba, y cada nodo hoja representa una etiqueta de clase (una decisión tomada luego de haber completado todos los atributos). Un nodo que no tiene hijos es un nodo hoja."

Al mirar la importancia de la característica, puedes decidir qué características abandonar en razón de si no contribuyen (o contribuyen muy poco) al proceso de predicción. Esto es importante porque una regla general dentro del machine learning es que entre más características tengas, aumentará la probabilidad de un sobre-ajuste y viceversa.
# Referencias
- [Random Forest: A Complete Guide for Machine Learning](https://builtin.com/data-science/random-forest-algorithm)
- [Random Forest Con Python](https://cienciadedatos.net/documentos/py08_random_forest_python)
- [Introduction to Bagging and Ensemble Methods](https://blog.paperspace.com/bagging-ensemble-methods/)