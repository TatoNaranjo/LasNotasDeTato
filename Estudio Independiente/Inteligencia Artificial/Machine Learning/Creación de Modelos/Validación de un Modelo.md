---
date: 2024-11-16
tags:
  - IA
  - Python
---
Vale, has construido un modelo pero... Qué tan bueno es?

En estas notas vas a aprender a usar las validaciones de modelos para medir la calidad de tu modelo. Medir la calidad del modelo es un factor clave para mejorar al mismo de forma iterativa.

## En qué consiste la validación de Modelos?

Vas a querer evaluar todos (o la mayoría) de modelos que hagas. En la mayoría de aplicaciones, el valor de relevancia para medir la calidad del modelo consiste en la precisión predictiva. En otras palabras, si el modelo se acerca a lo que pasa actualmente.

Muchas personas cometen un error gigante al momento de medir la precisión predictiva. Hacen predicciones con sus datos de entrenamiento y comparan dichas predicciones con los valores objetivo en los datos de entrenamiento. Más adelante verás el problema con este enfoque y como resolverlo, pero... pensemos en cómo se hace esto en un principio.

Primero, necesitas resumir la calidad del modelo en una forma que pueda entenderse. Si comparas los valores predichos y el valor actual de las casas para 10.000 hogares, te encontrarás con una mezcla de valores buenos y malos. Mirar a través de una lista de 10.000 valores predichos y actuales no tiene sentido. Necesitamos resumirlo dentro de una única métrica.

Hay muchas métricas para resumir la calidad de un modelo. Sin embargo, en este caso vamos a empezar con una métrica llamada el **Error Medio Absoluto** (O por sus siglas en ingl és de Mean Absolute Error: MAE). Vamos a descomponer esta métrica empezando con la última palabra: Error.

El error de predicción para cada casa es:

$$Error = actual-predicho$$
Entonces, si una casa cuesta $150.000 y tu predicción dijo que costaría $100.000, el error es $50.000.

Con la métrica MAE, tomamos el valor absoluto de cada error, lo que convierte cada error en un número positivo. Podemos tomar el promedio de estos errores absolutos. Esta es nuestra medida de la calidad del modelo. Cuando lo decimos en español, podemos decir que:

>[!Quote] Representación Linguistica del Error
>En promedio, nuestras predicciones se equivocan en un X 

Para calcular la métrica MAE, primero vamos a necesitar un modelo. Por lo cual vamos a utilizar el ejemplo de lecciones anteriores:

```python
# Data Loading Code Hidden Here
import pandas as pd

# Load data
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
# Filter rows with missing price values
filtered_melbourne_data = melbourne_data.dropna(axis=0)
# Choose target and features
y = filtered_melbourne_data.Price
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'BuildingArea', 
                        'YearBuilt', 'Lattitude', 'Longtitude']
X = filtered_melbourne_data[melbourne_features]

from sklearn.tree import DecisionTreeRegressor
# Define model
melbourne_model = DecisionTreeRegressor()
# Fit model
melbourne_model.fit(X, y)
```

Una vez que tenemos un modelo, así es como calculamos el error medio absoluto:

```python
from sklearn.metrics import mean_absolute_error

predicted_home_prices = melbourne_model.predict(X)
mean_absolute_error(y, predicted_home_prices)
```

## El problema de puntuar "Dentro de las Muestras"

Las medidas que acabamos de computar, pueden ser descritas como puntuaciones "dentro de las muestras". Usamos una "muestra" simple de casas tanto para construir como para evaluar el modelo, y esto precisamente es lo que está mal.

Imagina esto, en el amplio estado real del mercado, el precio de una puerta no se relaciona al precio de una casa.

Sin embargo, en la muestra de los datos que usaste para construir tu modelo, todas las casas con puertas verdes estuvieron muy caras. El trabajo del modelo es encontrar patrones que predigan el precio de las casas, así que si vemos este patrón, podemos suponer que siempre va a predecir precios altos para las casas con puertas verdes.

Como este patrón vino de los datos de entrenamiento, el modelo aparentará tener precisión con los datos del entrenamiento. Pero... y si este patrón no se mantiene cuando el modelo va a ver nuevos datos? El modelo sería muy impreciso cuando se usa en la práctica.

Como los valores prácticos del modelo vienen de hacer predicciones con los nuevos datos, medimos el rendimiento con datos que no fueron usados para construir el modelo. La forma más óptima de hacer esto es excluir unos datos del proceso de construcción del modelo para luego usarlos en las pruebas de precisión del modelo con datos que no hayan sido vistos antes. estos datos son llamados **Datos de Validación**. 

## Codeando una validación del modelo

La librería scikit-learn tiene una función llamada `train_test_split` que divide los datos en dos partes. Usaremos parte de esos datos como datos de entrenamiento para alimentar al modelo, mientras que la otra parte será usada como validación para calcular el `mean_absolute_error`.

Aquí está el código de ejemplo:

```python
from sklearn.model_selection import train_test_split

# split data into training and validation data, for both features and target
# The split is based on a random number generator. Supplying a numeric value to
# the random_state argument guarantees we get the same split every time we
# run this script.
train_X, val_X, train_y, val_y = train_test_split(X, y, random_state = 0)
# Define model
melbourne_model = DecisionTreeRegressor()
# Fit model
melbourne_model.fit(train_X, train_y)

# get predicted prices on validation data
val_predictions = melbourne_model.predict(val_X)
print(mean_absolute_error(val_y, val_predictions))
```

Si lo corremos, podemos notar que el error absoluto para los datos que estuvieron dentro de las muestras ronda alrededor de los 500 dólares, sin embargo, cuando hicimos las validaciones afuera de las muestras, pudimos ver que el error absoluto fue de más de 250.000 dólares.

Esta es la diferencia entre un modelo que está casi correcto, y uno que es inutilizable cuando hablamos de propósitos prácticos. Como un punto de referencia, el valor promedio de las casas en los datos de validación es de 1.1 millones de dólares. Así que el error en los nuevos datos está cerca del cuarto del promedio del valor de las casas.

Hay muchas formas de mejorar el modelo, como experimentar para encontrar mejores características o diferentes tipos de modelos.