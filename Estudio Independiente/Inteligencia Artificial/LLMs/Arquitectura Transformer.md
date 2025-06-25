---
tags:
  - IA
  - MachineLearning
  - Automatización
  - Algoritmos
  - LLMs
date: 2024-11-14
author:
  - TatoNaranjo
---

Fue desarrollada en 2017 por Google para ser usada en un modelo de traducción. Consiste en un modelo de secuencias capaz de convertir secuencias de un dominio en específico, en secuencias de otro dominio. Un ejemplo sencillo de entender es el hecho de traducir oraciones en francés a oraciones en inglés, u oraciones en inglés a oraciones en español.

La arquitectura transformer consiste de dos partes: Un codificador y un decodificador. El codificador convierte un texto (Por ejemplo, una frase en inglés) en una representación. El decodificador usa esta representación y la convierte en un texto de salida (Por ejemplo, una frase en español) de forma autoregresiva. Cabe resaltar que el tamaño de la salida es lineal al tamaño de su entrada.

El transformer consiste en una arquitectura de múltiples capas. Una capa en la red neuronal comprime un conjunto de parámetros que se utilizan para realizar una transformación específica de los datos. Algunos ejemplos de capas que pueden incluirse pueden ser: Atención Multi-Encabezada, Añadir y Normalizar, Alimentación Progresiva, Linealidad, Softmax, etc. Las capas pueden subdividirse dentro del input como sub-capas ocultas y de salida. La capa de Entrada (Como por ejemplo, un embedding de Entrada o Salida) es la capa donde los datos sin procesar entran a la red. Los embeddings de entrada se usan para representar los tokens de entrada en el modelo. Los embeddings de salida, por el contrario se encargan de representar los tokens de salida que el modelo predice. Por ejemplo, en un modelo de traducción de lenguaje, los embeddings de entrada son representados por las palabras en el lenguaje fuente, mientras que los embeddings de salida son representados por las palabras del lenguaje objetivo. La capa de salida (por ejemplo, Softmax) es la capa final que produce la salida de la red. Las capas ocultas (como la atención multi-encabezada) están entre las capas de entrada y salida, y es aquí donde sucede la magia realmente.

**Ilustración de un Modelo Transformer Original**

![[Ilustración de un Modelo Transformer Original.png]]

# Entendiendo la Ilustración

Para entender las diferentes capas de la arquitectura transformer, se usa un ejemplo de una tarea de traducción de inglés a español. Aquí se explica como una frase en francés es traducida dentro del transformer y corresponde a una traducción en inglés como salida. También se describirán los componentes dentro del transformer de la salida 1.

## Preparación de Entrada y Embedding

Para preparar los textos de entrada para los transformers, convertimos una secuencia de entrada en tokens y luego en embeddings de entrada. En una escala más grande, un embedding de entrada es un vector altamente dimensional que representa el significado de cada token en la oración. Luego, se alimenta a este embedding dentro del transformer para su procesamiento. Generar un embedding de entrada involucra los siguientes pasos:

1. **Normalización (Opcional)**: Estandariza el texto quitando espacios en blanco redundantes, tildes, etc.
2. **Tokenización:** Rompe la oración en palabras o subpalabras y las mapea en un ID de token de tipo entero de un vocabulario.
3. **Embedding:** Convierte cada ID del token en su correspondiente vector multi-dimensional, usando de forma típica una tabla de consulta. Esto se puede aprender durante el proceso de entrenamiento.
4. **Codificación Posicional:** Añade información sobre la posición de cada token en la secuencia para ayudar al transformer a entender el orden de las palabras.

Estos pasos ayudan a preparar la entrada para los transformers, de forma que puedan entender mejor el significado del texto.

## Atención Multi-Encabezada

Luego de convertir los tokens de entrada en vectores embebidos, el siguiente paso es alimentar los vectores en el módulo de atención multi-encabezada. La atención propia es es un mecanismo crucial dentro de los modelos transformer, ya que les permite concentrarse en partes específicas del input que sean relevantes para la tarea en cuestión para capturar dependencias de largo alcance por medio de secuencias más efectivas que las Redes Neuronales Recurrentes tradicionales.

### Entendiendo la atención propia

Considera la siguiente oración: "El tigre saltó del árbol para beber porque estaba sediento". La atención propia implica determinar las relaciones entre palabras y frases en oraciones. Por ejemplo, en esta oración, "tigre" y "el" se refieren a la misma cosa así que lo que podemos esperar es que estas dos palabras estén fuertemente relacionadas. La atención propia logra esto mediante los siguientes pasos:

1. **Crear Consultas, Claves y Valores**: Cada embedding de entrada es multiplicado por tres matrices de pesos aprendidas (Wq, Wk, Wv) para generar los vectores de consulta (Q), clave (K) y valor (V).
	1. Query - Consulta: El vector de petición le ayuda al modelo a preguntarse, "Cuáles otras palabras en la secuencia son relevantes para mi?"
	2. Key - Clave: El vector de claves funciona como una etiqueta que ayuda al modelo a identificar el cómo una palabra puede ser relevante por encima de otras en la secuencia.
	3. Value - Valor: El vector de valores funciona como un contenedor de la información actual de la palabra.
2. **Calculando Puntuaciones**: Se calculan puntajes para determinar cuánta "afinidad" tiene una palabra respecto a otras Esto se hace tomando el producto punto del vector de consultas de una palabra y el vector de claves de todas las palabras en la secuencia.
3. **Normalización**: Los puntajes se dividen usando la raíz cuadrada de la dimensión del vector de claves para darle estabilidad, luego se pasan a través de una función Softmax para obtener los pesos de atención. Estos pesos indican qué tan fuerte es la conexión de cada palabra con las otras.
4. **Valores Pesados**: Cada vector de valores es multiplicado por su peso de atención correspondiente. Los resultados se suman, lo que produce una representación consciente y con contexto para cada palabra.

![[Proceso de AutoAtención en un Transformer.png]]

En la práctica, estos cómputos son realizados al mismo tiempo apilando los vectores de consulta, de claves y de valores para todos los tokens dentro de Q, K y V y las multiplica todas tal y como se muestra en la siguiente figura.

![[ComputoDeVectoresEnAutoAtención.png]]

### Atención Multiencabezada: Un poder en la diversidad

La atención multiencabezada emplea múltiples sets de matrices Q,K,V con peso. Estos se ejecutan en paralelo, y cada 'Cabeza' se enfoca potencialmente en diferentes aspectos de las relaciones de la entrada.

El uso de una atención multiencabezada mejora la habilidad del modelo para manejar patrones complejos del lenguaje y dependencias de largo alcance. Esto es crucial para tareas que requieren un entendimiento matizado de la estructura del lenguaje y el contenido, como una traducción de máquina, resumen de textos y resolución de preguntas. El mecanismo habilita al transformer para considerar múltiples interpretaciones y representaciones de la entrada, lo que mejora el rendimiento en estas tareas.

## Capa de Normalización y Conexiones Residuales

Cada modulo en un transformer, que consista de un módulo de atención multiencabezada y un módulo de alimentación continua, emplea una capa de normalización y conexiones residuales. Esto corresponde a la capa de *añadir y normalizar* vista en la figura 1, en donde *añadir* corresponde a las conexiones residuales y *normalizar* corresponde a la capa de normalización. La capa de normalización se encarga de computar la varianza y la media de las activaciones que toman normalizar las activaciones de una capa dada. Esto normalmente se hace para reducir el desplazamiento de covariación así como para mejorar el flujo del gradiente para realizar una convergencia más rapida durante el entrenamiento así como para un rendimiento general mejorado.

Las conexiones residuales propagan las entradas hacia las salidas de una o más capas. Esto tiene el efecto de hacer que el procedimiento de la optimización sea más facil de aprender y también ayuda a lidiar con el desvanecimiento de gradientes o la explosión de los mismos.

La capa de *Añadir y normalizar* se aplica tanto a la capa de atención multiencabezada y al módulo de alimentación continua descrita en la sección.

## Capa de Alimentación Constante

La salida del módulo de atención multiencabezada y la capa subsecuente de *añadir y formalizar* se alimenta dentro de la capa de alimentación constante de cada bloque del transformer. Esta capa aplica una transformación basada en posiciones a los datos, independientemente para cada posición en la secuencia, lo cual permite la incorporación de no linealidad y complejidad dentro de las representaciones del modelo. Normalmente, la capa de alimentación constante consiste de dos transformaciones lineales por medio de una función de activación no lineal, como reLU o GELU, en medio. Esta estructura añade un poder de representación más profundo al modelo. Después de procesarse a través de la capa de alimentación constante, los datos vuelven a pasar por el paso de "*Añadir y normalizar*", lo que contribuye a la estabilidad y efectividad de modelos transformer más complejos.

## Codificador y Decodificador

La arquitectura transformer original se basa en una combinación de módulos codificadores y decodificadores. Cada codificador y decodificador consiste en una serie de capas, con cada capa conteniendo componentes clave: Un mecanismo de auto-atención multiencabezada, una red de alimentación en función de la posición, capas de normalización y conexiones residuales.

La función primaria de un codificador es procesar la secuencia de entrada dentro de una representación continua que tenga información de contexto para cada token. La secuencia de entrada primero se normaliza, luego se tokeniza y se convierte en embeddings. Las codificaciones posicionales se añaden a estos embeddings para retener el orden secuencial de la información. A través de los mecanismos de auto-atención, cada token en la secuencia puede escuchar de forma dinámica a cualquier otro token, entendiendo así, las relaciones entre contextos dentro de la secuencia. La salida del codificador es una serie de vectores de embedding Z, representando la secuencia de entrada entera.

El decodificador tiene la tarea de generar una secuencia de salida basada en el contexto que se le provee al codificador de salida Z. Este, opera en una pasarela de token por token, empezando con un token de inicio de secuencia. Las capas del decodificador emplean dos tipos de mecanismos de atención: auto-atención enmascarada y una atención entre decodificador y codificador. La auto-atención enmascarada se asegura de que cada posición solo pueda escuchar a posiciones más cercanas dentro de la secuencia de salida, preservando la propiedad de auto-regresión. Esto es crucial para prevenir que el decodificador tenga acceso a tokens futuros que se generen dentro de la cadena de salida. El mecanismo de auto-atención multiencabezada permite que el decodificador se enfoque en las partes relevantes de la cadena de entrada, utilizando los embeddings de contexto  que fueron generados por el codificador. Este proceso iterativo continúa hasta que el decodificador predice el token final de la secuencia, además, completando la generación de secuencias de salida.

La mayoría de los LLMs recientes, adoptaron una variante de *solo decodificadores* de la arquitectura transformer. Este enfoque olvida la separación tradicional del codificador-decodificador, enfocándose directamente en generar la secuencia de salida de la entrada. La secuencia de entrada pasa por un proceso similar de embedding y una encriptación posicional antes de ser entrenada dentro del decodificador. Luego, el decodificador usa la auto-atención enmascarada para generar predicciones para cada token subsecuente basado en los tokens generados previamente. Este enfoque directo simplifica la arquitectura para tareas específicas en donde se puede evitar de forma efectiva la codificación y decodificación.

## Entrenando al Transformer

Cuando hablamos de modelos de machine learning, es importante saber diferenciar entre el **entrenamiento** y la **inferencia**. Entrenar se refiere de forma típica a modificar los parámetros del modelo, e involucra funciones de pérdida o de back propagation. La inferencia es cuando un modelo solo se usa para la salida predicha, sin actualizar los pesos del modelo. Los parámetros del modelo se configuran durante la inferencia. Ahora que hemos aprendido cómo es que los transformers generan salidas durante la inferencia, nos enfocaremos en cómo entrenar a los transformers para realizar una o más tareas dadas.

### Preparación de los datos

El primer paso consiste en una preparación de datos que involucra unos cuantos pasos importantes dentro de si. Primero, limpiamos los datos aplicando técnicas como el filtrado, la normalización y la desduplicación. El siguiente paso es la tokenización, en donde el dataset se convierte en tokens usando técnicas como la codificación de bytes por pares y la tokenización de unigramas. La tokenización genera un vocabulario, el cual es un conjunto de tokens únicos que serán usados por el LLM. Este vocabulario sirve como el "lenguaje" que se le da al modelo para procesar y entender el texto. Finalmente, los datos se dividen típicamente dentro de un dataset de entrenamiento para entrenar el modelo, así como un dataset de prueba que es usado para evaluar el rendimiento del modelo.

### Las funciones de Pérdida y Entrenamiento

Un ciclo de entrenamiento típico de un transformer se conforma por diferentes partes: Primero, grupos de secuencias de entradas son tomadas como muestras para un set de entrenamiento. Para cada secuencia de entrada, hay una secuencia de salida correspondiente, en un pre-entrenamiento no supervisado, la secuencia objetivo se deriva de la misma secuencia de entrada. Los grupos de secuencias de entradas luego se entrenan dentro del transformer. El transformer genera secuencias de cadenas predichas. La diferencia entre las secuencias objetivo y las secuencias predichas se miden usando una función de pérdida. Primero se calculan los gradientes dde estas pérdidas, y un optimizador las usa para modificar los parámetros del transformer. Este proceso se repite hasta que el transformer converge en un cierto nivel de rendimiento o hasta que haya sido entrenado en un numero anteriormente especificado de tokens.

Hay diferentes enfoques para formular las tareas de entrenamiento para los transformers dependiendo de la arquitectura que se utilice:

- Los **Modelos Únicamente Decodificadores** son pre-entrenados de forma típica en el lenguaje de modelado. La secuencia objetivo para el decodificador simplemente es una versión alterada de la secuencia de entrada. Dada una secuencia de entrenamiento como 'El gato se sentó en el sillón', se pueden generar múltiples pares de entrada / objetivo para el modelo. Por ejemplo, en la entrada 'El gato se sentó en' debería predecir un 'el' y de forma subsecuente, el input 'El gato se sentó en el' debería predecir la secuencia objetivo 'sillón'.
- Los **Modelos Únicamente Codificadores** (Como BERT) son pre-entrenados a menudo corrompiendo la secuencia de entrada de alguna forma para dejar que el modelo la reconstruya. Un enfoque como tal, se llama un Modelado de Lenguaje Enmascarado, o en inglés (MLM). En el ejemplo dado anteriormente, la secuencia de entrada sería 'El [MASCARA] se sentó en el sillón'. y la secuencia objetivo sería la oración original.
- Los **Modelos Codificadores y Decodificadores** (como el transformer original) son entrenados en tareas supervisadas de forma secuencial, como or ejemplo la traducción (una secuencia de ejemplo siendo "Le chat est assis sur le tapis" y siendo el objetivo "El gato se sentó en el tapiz"), la resolución de preguntas (en donde la secuencia de entrada es una pregunta y la secuencia objetivo es la respuesta correspondiente), y la creación de resúmenes (en donde la secuencia de entrada es un artículo completo y la secuencia objetivo es el resumen correspondiente). Estos modelos también pueden ser entrenados de forma no supervisada, convirtiendo otras tareas al formato secuencial. Por ejemplo, cuando entrenamos los datos con fuentes como Wikipedia, la secuencia de entrada podría ser la primer parte de un artículo, y la secuencia objetivo comprime el residuo del artículo.

Un factor a considerar durante el entrenamiento del modelo debe de ser la 'longitud del contexto'. Con esto, nos referimos al número de tokens previos que el modelo puede 'recordar' y usar para predecir el siguiente token dentro de la secuencia. Los tamaños de contextos largos pueden permitirle al modelo capturar relaciones más complejas y dependencias dentro del texto, aumentando el rendimiento de forma potencial. Sin embargo, contextos más largos también requiere más recursos computacionales y memoria, lo que puede ralentizar el entrenamiento y la inferencia. Escoger una longitud de contexto adecuada involucra el balance de estos intercambios, basados en la tarea específica y los recursos disponibles.