---
date: 2024-11-22
tags:
  - IA
  - MachineLearning
---
Los árboles de decisión te dejan con un cuestionamiento difícil. Un árbol profundo con un montón de hojas se sobreajustará porque cada predicción viene de los datos históricos desde únicamente las pocas casas que hay en sus hojas. Pero un árbol superficial con pocas hojas rendirá pobremente porque falla en capturar tantas similitudes como pueda dentro de los datos sin procesar. 

Incluso hoy en día, las técnicas más sofisticadas de modelados enfrentan esta tensión entre el sobreajuste y la insuficiencia. Sin embargo muchos modelos tienen ideas brillantes que pueden llevar a un mejor rendimiento. Por ejemplo, miremos a los **random forests** como un ejemplo.

Un random forest usa varios árboles, y hace una predicción promediando las predicciones de cada árbol componente. Generalmente, tiene una precisión de predicciones más acertadas que un simple árbol de decisión y funciona bien con parámetros por defecto. SI sigues modelando, puedes aprender sobre más modelos con un rendimiento, aunque algunos de ellos suelen ser más sensibles a la hora de escoger los parámetros correctos.

## Ejemplo

Ya has visto el código para cargar los datos un par de veces. Al final del cargue de datos, tenemos las siguientes variables:

- `train_X`
- `val_X`
- `train_y`
- `val_y`

```python
import pandas as pd
    
# Load data
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
melbourne_data = pd.read_csv(melbourne_file_path) 
# Filter rows with missing values
melbourne_data = melbourne_data.dropna(axis=0)
# Choose target and features
y = melbourne_data.Price
melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'BuildingArea', 
                        'YearBuilt', 'Lattitude', 'Longtitude']
X = melbourne_data[melbourne_features]

from sklearn.model_selection import train_test_split

# split data into training and validation data, for both features and target
# The split is based on a random number generator. Supplying a numeric value to
# the random_state argument guarantees we get the same split every time we
# run this script.
train_X, val_X, train_y, val_y = train_test_split(X, y,random_state = 0)
```

Construimos un modelo de random forest de forma similar a como construimos un árbol de decisión en Scikit-learn. Esta vez usando la clase `RandomForestRegressor` en vez de `DecisionTreeRegressor`;

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

forest_model = RandomForestRegressor(random_state=1)
forest_model.fit(train_X, train_y)
melb_preds = forest_model.predict(val_X)
print(mean_absolute_error(val_y, melb_preds))
```

