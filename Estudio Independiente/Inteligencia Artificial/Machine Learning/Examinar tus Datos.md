---
date: 2024-10-11
tags:
  - IA
  - Algoritmos
---
## Utiliza Pandas Para Familiarizarte Con Tus Datos

La primer cosa que debes hacer en un proyecto de machine learning es familiarizarte con los datos que tienes. Para esto, harás uso de la librería `pandas`. **Pandas** es la herramienta principal utilizada por científicos de datos para explorar y manipular los datos. Mucha gente suele abreviar a pandas en su código con el acrónimo `pd`. Normalmente puedes hacer esto con:

```python
import pandas as pd
```

La parte más importante dentro de la librería de pandas es el **DataFrame**. Un **DataFrame** contiene el tipo de datos que normalmente conocemos como tablas. Es similar a una hoja en Excel o una tabla en una base de datos SQL.

Pandas tiene métodos poderosos para la mayoría de cosas que desees hacer con este tipo de datos.

Como un ejemplo, podemos mirar los [Datos sobre los precios de las casas](https://www.kaggle.com/datasets/dansbecker/melbourne-housing-snapshot) en Melbourne, Australia. Como parte de unos ejercicios puedes intentar aplicar los mismos pasos a un datasets de precios de casas en Iowa. 

Los datos de ejemplo (de Melbourne) se encuentran en la ruta `../input/melbourne-housing-snapshot/melb_data.csv`. Vamos a cargar y explorar los datos mediante los siguientes comandos:

```python
# Guardamos la ruta a la variable por facilidad en el acceso
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
# Leemos los datos y los almacenamos en un dataframe llamado melbourne_data
melbourne_data = pd.read_csv(melbourne_file_path) 
# Imprimimos un resumen de los datos de melbourne_data
print(melbourne_data.describe())
```

![[Pasted image 20241012190419.png]]

## Interpreta las Descripciones de los Datos

Los resultados muestran 8 números por cada columna en tu dataset original. El primer número, que hace alusión a la variable `count` muestra cuántas filas tienen valores que no están vacíos.

Los valores faltantes aparecen por varias razones. Por ejemplo, el tamaño de una segunda habitación no sería considerado si estamos llenando una encuesta de una casa con una sola habitación. Luego podemos abordar más a fondo el tema de la pérdida de datos. 

El segundo valor a tratar es la **media**, el cual se refiere a un promedio. Debajo de el, aparece **std**, que es la desviación estándar, que mide de forma numérica qué tan esparcidos se encuentran los datos.

Para interpretar los valores de `min`, `25%`, `50%`, `75%` y `max`, puedes imaginar que estás organizando cada columna con los valores de menor a mayor cantidad. El primer valor (el más pequeño) es el **mínimo**. Si recorres un cuarto de la lista, verás un valor que es más grande que el 25% de los valores anteriores y menor que el 75% de todos los valores. Así es como se definen los valores de 25% (Normalmente nombrado como el 25-avo percentil). El 50-avo percentil y el 75-avo percentil son definidos de forma análoga, y `max` hace referencia al número más grande.