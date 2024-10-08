---
date: 2024-09-19
tags:
  - IA
  - Random-Forest
  - Algoritmos
---

# ¿Qué es un clasificador de Random Forest?
Un clasificador de un algoritmo [[Random Forest]], es, un algoritmo de machine learning automatizado que se basa en la construcción de árboles conjuntos. También se describe como un conjunto de árboles de decisión que parten de un subconjunto del modelo de entrenamiento seleccionado de forma aleatoria. Al final, este algoritmo agrega las opciones registradas de los diferentes árboles de decisión para decidir la clase final del objeto de prueba.

# ¿Qué son los algoritmos de conjuntos?

Los algoritmos de conjuntos son aquellos que combinan más de un algoritmo ya sea de la misma clase o una distinta para clasificar objetos. Por ejemplo, llevar a cabo una predicción usando naive Bayes, SVM y un árbol de decisión para tomar un voto de veredicto para la consideración final de la clase del objeto.

# Tipos de Clasificadores para modelos de Random Forest

1. La predicción de un clasificador de Random Forest para un problema de clasificación: Aquí, $f(x) =$ la mayoría de votos de todas las clases predichas sobre $B$ árboles
2. La predicción de un clasificador de Random Forest para un problema de regresión: Aquí, $f(x)=$ la suma de todas las predicciones de los sub-árboles divididas sobre $B$ árboles.
# Ejemplos de un clasificador para un Random Forest
![[RandomForestClassificator1.png]]
**Nueve clasificadores diferentes para un árbol de decisión**

![[RandomForestClassificatorExample2.png]]
**Resultados agregados para los nueve clasificadores del árbol de decisión**

Podemos agregar los nueve clasificadores mostrados anteriormente dentro de un algoritmo de conjuntos para random forest que combine su input. Puedes pensar en los ejes verticales y horizontales de las salidas del árbol de decisión como las características $x_1$ y $x_2$. En ciertos puntos de cada característica, el árbol de decisión entrega una clasificación de azul, verde, rojo... etc.

Los resultados de arriba son agregados a través de modelos de votación o promedios, dentro de un modelo de conjuntos simple que acaba superando cualquier salida que pudiese obtener un árbol de decisión normal.

# Ventajas de un Algoritmo Random Forest
- Random Forest es uno de los algoritmos de aprendizaje más eficientes que se encuentran disponibles. Puede entregar resultados altamente precisos y satisfactorios para algunos datasets.
- Puede ejecutarse de forma eficiente en bases de datos grandes.
- Puede manejar bastantes variables de entrada sin recurrir a la eliminación de variables.
- Puede dar un estimado de qué variables son importantes en la clasificación.
- Genera una estimación interna que no es sesgada del error de generalización a medida de que la construcción del bosque avanza.
- Tiene un método específico para estimar datos perdidos y mantiene su precisión aún cuando falta una gran proporción de los datos.
# Desventajas de un Algoritmo Random Forest
- Se ha observado que los Random Forests se suelen sobreajustar cuando hay algunos datasets que tienen información de clasificación/regresión ruidosa.
- Cuando hablamos de datos que incluyen variables categorizadas en diferentes números de niveles, los Random Forests se suelen sesgar hacia los atributos más niveles. Por lo tanto, las puntuaciones de importancia para estos valores no se vuelven recomendables cuando se trabajan estos tipos de datos.

**Todo: Terminar de copiar la implementación en python: How to Implement Random Forest Classifier in Python**

# Referencias
- [Random Forest Classifier in Python: A Guide](https://builtin.com/data-science/random-forest-python-deep-dive)