---
date: 2024-10-25
tags:
  - Automatización
  - Algoritmos
  - CienciaDeDatos
  - IA
  - Python
---

Tu dataset tiene muchas variables como para enfocarte en todas, o al menos tratar de imprimirlas de forma correcta.. Cómo puedes transmitir esta cantidad absurdamente grande de datos en algo que puedes entender?.

Primero, empezaremos agarrando algunas variables usando únicamente nuestra intuición. Con el paso del tiempo puedes aprender diferentes técnicas estadísticas que te ayudarán a priorizar variables de manera automática.

Para escoger variables o columnas necesitaremos listar todas las columnas del dataset. Esto se hace con la propiedad **columns** del DataFrame. Podemos ilustrarlo mejor mediante las siguientes líneas de código.

```python
import pandas as pd

melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
melbourne_data.columns
```

**Output**

```
Index(['Suburb', 'Address', 'Rooms', 'Type', 'Price', 'Method', 'SellerG',
       'Date', 'Distance', 'Postcode', 'Bedroom2', 'Bathroom', 'Car',
       'Landsize', 'BuildingArea', 'YearBuilt', 'CouncilArea', 'Lattitude',
       'Longtitude', 'Regionname', 'Propertycount'],
      dtype='object')
```

Hay múltiples formas de seleccionar un subset para tus datos. Normalmente, esto se profundiza más en el curso de [Pandas](https://www.kaggle.com/learn/pandas) que ofrece Kaggle, sin embargo para esta guía práctica nos enfocaremos en dos enfoques por ahora.

1. La notación de puntos, que usaremos para configurar.
2. Seleccionándolo con una lista de columnas, que usaremos para seleccionar las "características".
## Escogiendo el Objetivo de Precisión

Puedes agarrar una variable por medio de la **notación de puntos**. Esta columna simple se almacena dentro de unas **Series**, lo que es, en medida, muy parecido a un DataFrame pero con una sola columna de datos simples.

Usamos la notación de puntos para seleccionar la columna que queremos predecir, lo que normalmente se conoce como el **objetivo de precisión**. Por convención, el objetivo de precisión normalmente se denota con la letra `y`. Así que el código que necesitamos en este caso para guardar los precios de las casas en los datos de Melbourne es:

```python
y = melbourne_data.Price
```

## Escogiendo las "Características"

Las columnas que entran a nuestro modelo (y luego se usan para realizar predicciones) son conocidas como "Features" o "Características". En nuestro caso, esas harían referencia a las columnas que determinan el precio de una casa. Algunas veces, utilizarás todas las columnas, excepto por los objetivos que también sean características. Otras veces, te puede ir mejor definiendo pocas características.

Por ahora, vamos a construir un modelo con pocas características. Luego, puedes aprender como iterar y comparar sobre modelos que tienen distintas características.

En este caso, seleccionamos varias características dando una lista de columnas dentro de las llaves. Cada item en la lista debe ser un string (con comillas).

Por ejemplo:

```python
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude']
```

Por convención, se suele llamar a esos datos como **X**.

```python
X = melbourne_data[melbourne_features]
```

Lo que debes hacer cuando estás definiendo tus características es tener en cuenta los datos sobre los que estás operando para hacer el análisis. Puedes hacer uso de los métodos `describe`y `head` para mostrarte las filas más grandes. Esto es una parte importante de la labor de un científico de datos, ya que a menudo te puedes encontrar con sorpresas dentro del dataset que merecen un análisis más profundo.

## Construyendo el Modelo

Vamos a hacer uso de la librería `scikit-learn` para construir modelos. Cuando estamos programando, normalmente escribimos esta librería como `sklearn`. Como podrás ver en el código de ejemplo. Scikit-Learn es por mucho, la librería más conocida y usada para modelar los tipos de datos que se almacenan en DataFrames de forma típica.

Los pasos que se siguen para construir y usar un modelo son:

- **Definir**: Qué tipo de modelo será?, Un Árbol de Decisión? Otro tipo de Modelo? Algunos otros parámetros del modelo también se especifican.
- **Entrenar**: Capturar patrones en los datos que tenemos. Este es el corazón del modelado de datos.
- **Predecir**: Así como suena.
- **Evaluar**: Determinar qué tan precisas son las predicciones del modelo.

Aquí puedes encontrar un ejemplo de como definir un modelo de árbol de decisión con scikit-learn y entrenarlo con las características y la variable objetivo.

```python
from sklearn.tree import DecisionTreeRegressor

# Define model. Specify a number for random_state to ensure same results each run
melbourne_model = DecisionTreeRegressor(random_state=1)

# Fit model
melbourne_model.fit(X, y)
```

Muchos modelos de machine learning permiten cierta aleatoriedad al momento de entrenar un modelo. Especificar un número dentro de la característica `random_state` te asegura obtener los mismos resultados en cada prueba. Esto se considera una buena práctica. Puedes usar cualquier número, ya que la calidad del modelo no dependerá significativamente del número que escojas.

Ahora, tenemos un modelo entrenado que podemos usar para hacer predicciones.

En la práctica, vas a querer hacer predicciones para las nuevas casas que aparezcan en el mercado en vez de hacerlas con las casas que ya tienes. Sin embargo, esta vez haremos predicciones en las primeras filas para  ver como funciona el modelo de predicción.

```python
print("Making predictions for the following 5 houses:")
print(X.head())
print("The predictions are")
print(melbourne_model.predict(X.head()))
```
