El siguiente informe presenta un [[Análisis Numérico]], destacando la implementación de un programa en Python para calcular parámetros estadísticos importantes como la media, la mediana y la moda, además de la distribución de frecuencias para un conjunto de datos. Este código fue desarrollado por **Santiago Naranjo Herrera**, **David Santiago Sierra** y **Edgar Duván Bernal Acero**.

El link del código se encuentra en el siguiente enlace: [Estadísitica en Python](https://gist.github.com/santorar/155895b67ac1c6f20d3aaa962589202e)

![[Pasted image 20240924111442.png]]

# Introducción

El análisis de datos mediante la estadística permite extraer conclusiones valiosas a partir de grandes volúmenes de información. Este tipo de análisis es fundamental en áreas como la economía, la biología, la ingeniería y las ciencias sociales, ya que permite identificar patrones, tendencias y realizar predicciones con base en muestras observadas. La estadística aplicada, combinada con conceptos matemáticos, ofrece una forma efectiva de abordar problemas complejos, y cuando se implementa mediante la programación, se facilita enormemente el procesamiento de grandes conjuntos de datos.

En este caso, el código utiliza conceptos como la **media aritmética**, que proporciona un valor representativo del conjunto de datos; la **mediana**, que divide el conjunto en dos partes iguales; y la **moda**, que identifica el valor más frecuente en el conjunto. Estos tres parámetros son fundamentales para describir distribuciones de datos.

### Descripción del código

El programa implementa un análisis estadístico de un conjunto de datos, utilizando funciones de Python, combinando herramientas como `math`, `pandas` y `tabulate` para representar los elementos. El conjunto de datos analizado es una lista de valores numéricos que representan algún fenómeno, y mediante este código se logra calcular varias métricas clave:

1. **Tamaño de la muestra (n)**: Se determina la cantidad de datos que contiene la lista, que es esencial para calcular otros parámetros como la amplitud y el número de clases en la distribución.

![[Pasted image 20240924110819.png]]

2. **Rango y amplitud**: El código calcula el rango (diferencia entre el valor máximo y el mínimo) y la amplitud, que permite determinar el tamaño de las clases en la distribución. Así mismo, se hace uso de la regla de Sturges para adquirir la amplitud de los intervalos, que es definida por la fórmula $1+3.22*\log_{10}{n}$ 

![[Pasted image 20240924110848.png]]

3. **Frecuencia y tablas de distribución**: A partir de los datos, se crean intervalos (clases) y se calcula la frecuencia de los valores dentro de cada intervalo. Este análisis es fundamental para construir la **distribución de frecuencias**, una herramienta estadística básica para visualizar cómo se distribuyen los datos a lo largo de un rango.
![[Pasted image 20240924110945.png]]
    
4. **Mediana**: La mediana se calcula a partir de la frecuencia acumulada. En este caso, se utiliza la fórmula estándar para la mediana de datos agrupados, teniendo en cuenta los límites de la clase mediana, la frecuencia acumulada antes de la clase, la frecuencia de la clase y la amplitud.
![[Pasted image 20240924111113.png]]
    
5. **Moda**: Se identifica la clase modal (con mayor frecuencia) y, mediante una fórmula para datos agrupados, se calcula el valor exacto de la moda.
    
6. **Media**: La media se calcula sumando todos los valores y dividiendo por el número total de observaciones, siendo uno de los valores más comunes para describir una tendencia central.
![[Pasted image 20240924111141.png]]
    

# Utilidad y Aplicación

El análisis estadístico realizado por este programa es aplicable en diversas áreas que requieren la manipulación de datos numéricos. En investigación científica, el uso de estos parámetros permite a los investigadores entender mejor la distribución de sus datos, lo que a su vez puede guiar decisiones sobre la validez de sus hipótesis. En el ámbito empresarial, estos cálculos pueden ser utilizados para interpretar grandes volúmenes de datos financieros, de ventas o de usuarios, lo que facilita la toma de decisiones basada en información cuantitativa precisa.

El uso de la programación para estos cálculos es de gran utilidad, ya que permite realizar análisis rápidamente sobre grandes conjuntos de datos, eliminando errores humanos y asegurando la reproducibilidad de los resultados. La implementación de la lógica estadística en Python, junto con la visualización de tablas y resultados en formato estructurado, facilita su comprensión y análisis posterior.

En conclusión, este código ejemplifica cómo la programación puede integrarse eficazmente con el análisis estadístico para generar resultados precisos y útiles en un contexto de datos reales.