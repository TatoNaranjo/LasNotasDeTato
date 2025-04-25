---
date: 2024-09-19
---

>By: ***TatoNaranjo***

Documento que recopila los conceptos básicos para entender qué es esta técnica estadística.
```table-of-contents
```


## Definición

La regresión lineal es una técnica de análisis de datos que predice el valor de datos desconocidos mediante el uso de otro valor de datos relacionado y conocido. Modela matemáticamente la variable desconocida o dependiente (que es aquella que se desea pronosticar) y la variable conocida o independiente como una ecuación lineal. Por ejemplo, supongamos que tienes datos sobre tus gastos e ingresos del año pasado. Las técnicas de regresión lineal analizan estos datos y determinan que tus gastos son la mitad de tos ingresos. Luego calculan un gasto futuro desconocido al reducir a la mitad un ingreso conocido futuro.

> Entonces, eso significa que en base al procesamiento de unos datos que yo ya tengo, la regresión lineal detecta un patrón y en base a ese patrón genera una predicción.

## Ejemplo

### Entendemos los datos
Se nos da el caso de una empresa que remodela casas viejas en Manhattan , Nueva York. Con el tiempo nos hemos percatado de que su volumen de dólares por trabajos de renovación ***depende*** de la nómina del área de Manhattan. En la siguiente tabla se numeran los ingresos de la empresa y el monto de dinero percibido por los trabajadores en Manhattan durante los últimos seis años.

Además, se nos otorgan los siguientes datos:

| Ventas $y$ (Cientos de Miles) | Nómina $x$ (Cientos de Millones) |
| ----------------------------- | -------------------------------- |
| 2                             | 1                                |
| 3                             | 3                                |
| 2.5                           | 4                                |
| 2                             | 2                                |
| 2                             | 1                                |
| 3.5                           | 7                                |

> Podemos determinar que la variable dependiente en este caso son las ***ventas***, debido a que dependen directamente de la nómina. Es por eso que denominamos a ventas con la variable $y$ y a la nómina con la variable $x$.

Luego, procedemos a graficar los datos en un diagrama de dispersión.
![[DisperssionDiagramLinearRegression.png]]

### Identificamos una ecuación para representar los datos
Para poder representar la relación entre estos puntos mediante una linea recta debemos de utilizar la ecuación de la recta ($Y = a+bx$) debido a que es la ecuación que más se adapta a estos puntos.

Debemos conocer el valor de la **ordenada ($a$)**, la cual se obtiene mediante la formula: $a = \bar{y} - b \bar{x}$.

Sin embargo, como también necesitamos conocer el valor de la **pendiente ($b$)**, necesitamos usar la fórmula:

$b = \frac{\sum{xy}-n\bar{x}\bar{y}}{\sum{x²}-n\bar{x²}}$

En donde $\bar{x}$ es la media de $x$ y $\bar{y}$ es la media de $y$.

Entonces... para facilitarnos los cálculos podemos añadir los siguientes dos valores a la tabla:

| Ventas $y$ (Cientos de Miles) | Nómina $x$ (Cientos de Millones) | $x^2$  | $y²$     | $xy$     |
| ----------------------------- | -------------------------------- | ------ | -------- | -------- |
| 2                             | 1                                | 1      | 4        | 2        |
| 3                             | 3                                | 9      | 9        | 9        |
| 2.5                           | 4                                | 16     | 6.25     | 10       |
| 2                             | 2                                | 4      | 4        | 4        |
| 2                             | 1                                | 1      | 4        | 2        |
| 3.5                           | 7                                | 49     | 12.25    | 24.5     |
| **15**                        | **18**                           | **80** | **39.5** | **51.5** |

Reemplazando en la ecuación de la pendiente:

$b = \frac{51.5-(6)(3)(2.5)}{80-6(3²)}$

$b = \frac{6.5}{26}$

$b = 0.25$

Ahora podemos sustituir en la ecuación de la ordenada $a = \bar{y} - b \bar{x}$:

$a = 2.5 - (0.25*3)$
$a = 1.75$

Conociendo el valor de la pendiente ($b$) y el valor de la ordenada $a$, podemos sustituir en la ecuación de la recta ($Y = a+bx$) quedando de la siguiente forma:

$Y = 1.75+0.25x$

Con esta ecuación podemos realizar un pronóstico.

### Realizamos un pronóstico

Si la cámara de comercio local predice que la nómina para el área de Manhattan será de 600 millones de dólares el próximo año, estimamos las ventas de la empresa con una ecuación de regresión: $Y = a+bx$

$Y = 1.75+0.25(6)$
$Y = 1.75+1.5$
$Y = 3.25$

Entonces... esta ecuación $Y = 1.75+0.25(x)$ nos va a entregar una recta que representa a los datos esperados (el pronóstico) en cierto valor de x. Graficándolo en el diagrama de dispersión queda de la siguiente forma:

> No debemos pronosticar valores tan lejanos con pocos datos debido a que el mercado es muy inestable y esas predicciones pueden cambiar en un futuro.

![[dispersionDiagramLinearRegression.png]]

La distancia entre los puntos y el pronóstico es conocida como la ***desviación o error***.

### Calcular el error estándar de la estimación

Este cálculo se llama desviación estándar de la regresión, y mide el error desde la variable dependiente, y, hasta la recta de regresión. La ecuación a utilizar es la siguiente:

$s_{xy} = \sqrt{\frac{\sum{y²}-a\sum{y}-b\sum{xy}}{n-2}}$

Llenando la ecuación con los datos obtenidos:

$s_{xy} = \sqrt{\frac{39.5-1.75(15)-0.25(51.5)}{(6)-2}}$

$s_{xy} = \sqrt{\frac{39.5-26.25-12.875}{4}}$

$s_{xy} = \sqrt{\frac{0.375}{4}}$

$s_{xy} = \sqrt{0.09375}$

$s_{xy} = 0.306$

Por lo tanto, $0.306$ es la desviación estándar entre los valores de la variable dependiente y la recta de regresión.

### Calcular los coeficientes de correlación para rectas de regresión

Esta medida expresa el grado o fuerza de la relación lineal, también es conocido como el coeficiente de correlación de Pearson. Casi siempre identificado como $r$, el coeficiente de correlación puede ser cualquier número entre $+1$ y $-1$.

- Si la recta se ajusta a todos los puntos y se desplaza hacia arriba, tenemos una correlación positiva perfecta $r = +1$.
- Cuando la los valores no se ajustan perfectamente a la recta de regresión pero si se acercan tenemos una correlación positiva con valores $0 < r < 1$, en donde entre $r$ más se acerque al $1$, tendrá una correlación más fuerte.
- Cuando los puntos se encuentran tan dispersos que no existe una correlación, el coeficiente de correlación $r=0$.
- Si la recta se ajusta a todos los puntos y se desplaza hacia abajo, tenemos una correlación positiva perfecta $r = 0$.

![[correlationCoeficients.png]]

Para calcular el valor del coeficiente de correlación debemos aplicar la siguiente fórmula:

$r = \frac{n\sum{xy}-\sum{x}-\sum{y}}{\sqrt{(n\sum{x^2}-(\sum{x})²)(n\sum{y²}-(\sum{y})²)}}$

Entonces, reemplazando los valores dentro de la fórmula:

$r=\frac{6(51.5)-(18)(15)}{\sqrt{(6(80)-(18²)(6(39.5))-(15)²)}}$

$r = \frac{309-270}{\sqrt{(156)-(12)}}$

$r = \frac{39}{\sqrt{1872}}$

$r = \frac{39}{43.2}$

$r =0.90$

Por lo tanto, podemos decir que el coeficiente de correlación es bastante preciso debido a que se acerca al valor de 1.

Esto nos sirve para determinar la correlación de la siguiente forma:

![[correlationTypes.png]]

### Calcular el Coeficiente de determinación $r^2$

Es el porcentaje de variación en la variable dependiente (y) que explica la ecuación de regresión. Se calcula elevando el coeficiente de correlación al cuadrado. 

Por lo tanto, siguiendo con el ejemplo:

$r² = (0.90)² = 0.81$ = 81%

> El 81% de la variación de las ventas debido a la nomina del área de Manhattan se explica mediante la ecuación de regresión.

Entonces, por último nos debemos preguntar: 

**¿Con cuánta exactitud predice la ecuación de regresión ($y = 1.75 + 0.25x$) las ventas, mediante la nómina de Manhattan?**

Si fuera posible hacer predicciones perfectas, el coeficiente de determinación sería de 100% que está relacionada con un coeficiente de correlación de +1 o -1. En este caso es evidente que los datos no forman una línea perfecta, en vez de eso los datos se diseminan alrededor de la recta y habrá un error en las predicciones.

## ¿Por qué es tan importante?

Los modelos de regresión lineal son relativamente simples y proporcionan una fórmula matemática fácil de interpretar para generar predicciones. La regresión lineal es una técnica estadística establecida y se aplica fácilmente al software y a la computación. Las empresas lo utilizan para convertir datos sin procesar de manera confiable y predecible en inteligencia empresarial y conocimiento práctico. Los científicos de muchos campos, incluidas la biología y las ciencias del comportamiento, ambientales y sociales, utilizan la regresión lineal para realizar análisis de datos preliminares y predecir tendencias futuras. Muchos métodos de ciencia de datos como el machine learning y la inteligencia artificial utilizan la regresión lineal para resolver problemas complejos.

## ¿Cómo funciona la regresión lineal?

Una técnica de regresión lineal simple intenta trazar un gráfico lineal entre dos variables de datos, $x$ e $y$. Como una variable independiente, $x$ se traza a lo largo del eje horizontal. Las variables independientes también se llaman variables explicativas o variables predictivas. La variable dependiente $y$ se traza en el eje vertical. También puede hacer referencia a los valores y como variables de respuesta o variables pronosticadas.

### Pasos en la regresión Lineal

Para esta visión general, debemos de tener en cuenta la forma más simple de la ecuación de gráfico de líneas entre $y$ y $x$; $y = c*x+m$ en donde $c$ y $m$ son constantes para todos los valores posibles de $x$ e $y$. Así, por ejemplo, supongamos que los datos de entrada para $(x,y)$ eran $(1,5), (2,8)$ y $(3,11)$. Para identificar el método de regresión lineal debemos seguir los siguientes pasos:

1. Trazar una línea recta y medir la correlación entre 1 y 5.
2. Seguir cambiando la dirección de la linea recta para los nuevos valores $(2,8)$ y $(3,11)$ hasta que se ajusten todos los valores.
3. Identificar la ecuación de regresión lineal como $y = 3*x+2$.
4. Extrapolar o predecir que $y$ es 14 cuando $x$ es: 4.


> Entonces... como yo lo veo parece que primero vas trazando algunos puntos dados dentro de un espacio (puede ser un plano cartesiano). Luego de poner el primer punto la regresión lineal va trazando una linea recta que se va acomodando conforme más puntos aparecen dentro del plano. Mi duda es... ¿como identifico la ecuación de la expresión.?

## ¿Qué es la regresión lineal en el machine learning?

En machine learning, los programas de computación denominados algoritmos analizan grandes conjuntos de datos y trabajan hacia atrás a partir de esos datos para calcular la ecuación de regresión lineal. Los científicos de datos primero entrenan el algoritmo en conjuntos de datos conocidos o etiquetados, y a continuación, utilizan el algoritmo para predecir valores desconocidos. Los datos de la vida real son más complicados que el ejemplo anterior. Es por eso que el análisis de regresión lineal debe modificar o transformar matemáticamente los valores de los datos para cumplir con las siguientes cuatro características supuestas:

### Relación Lineal

Debe existir una relación lineal entre las variables independientes y las dependientes. Para determinar esta relación, los científicos de datos crean una gráfica de dispersión (una colección aleatoria de valores x e y) para ver si caen a lo largo de una línea recta. De lo contrario, puede aplicar funciones no lineales, como la raíz cuadrada o el registro, para crear matemáticamente la relación lineal entre las dos variables.

### Independencia Residual

Los científicos de datos utilizan residuos para medir la precisión de la predicción. Un residuo es la diferencia entre los datos observados y el valor previsto. Los residuos no deben tener un patrón identificable entre ellos. por ejemplo, no queremos que los residuos crezcan con el tiempo. Podemos utilizar diferentes pruebas matemáticas, como la prueba de **Durbin-Watson**, para determinar la independencia residual. Podemos usar datos ficticios para reemplazar cualquier variación de datos, como los datos estacionales.

### Normalidad

Las técnicas de representación gráfica, como las gráficas Q-Q, determinan si los residuos se distribuyen normalmente. Los residuos deben caer a lo largo de una línea diagonal en el centro de la gráfica. Si los residuos no están normalizados, podemos probar los datos para detectar valores atípicos aleatorios o valores que no sean típicos. Eliminar los valores atípicos o realizar transformaciones no lineales puede solucionar el problema.

### Homocedasticidad

La homocedasticidad supone que los residuos tienen una variación constante o un desvío estándar de la media para cada valor de x. de lo contrario, es posible que los resultados del análisis no sean precisos. Si no se cumple esta suposición, es posible que tenga que cambiar la variable dependiente. Dado que la variación se produce de forma natural en grandes conjuntos de datos, tiene sentido cambiar la escala de la variable dependiente. Por ejemplo, en lugar de usar el tamaño de la población para predecir la cantidad de estaciones de bomberos en una ciudad, podríamos usar el tamaño de una población para predecir la cantidad de estaciones de bomberos por persona.

## ¿Cuáles son los tipos de regresión lineal?

Algunos tipos de análisis de regresión son más adecuados que otros para gestionar conjuntos de datos complejos. A continuación se muestran algunos ejemplos:

### Regresión Lineal Simple

La regresión lineal simple se define mediante la función lineal:

$Y= β0*X + β1 + ε$

En donde $\beta0$ y $\beta1$ son dos constantes desconocidas que representan la pendiente de regresión, mientras que $\epsilon$ (Epsilon) es el margen de error.

Podemos usar la regresión lineal simple para modelar la relación entre dos variables como por ejemplo:

- La lluvia y el rendimiento de los cultivos
- La edad y la estatura en niños
- La temperatura y la expansión del mercurio metálico en un termómetro.

### Regresión Lineal Múltiple

En el análisis de regresión lineal múltiple, el conjunto de datos contiene una variable dependiente y múltiples variables independientes. la función de linea de regresión lineal cambia para incluir más factores de la siguiente manera.

$Y = β0*x0 + β1x1 + β2x2+…… βNxN+ ε$

A medida que aumenta el número de variables predictivas, las constantes $\beta$ también aumentan en consecuencia.

La regresión lineal múltiple modela múltiples variables y su impacto en un resultado:

- Lluvia, temperatura y el uso de fertilizantes en el rendimiento de los cultivos.
- Dieta y ejercicio sobre enfermedades cardíacas.
- Crecimiento Salarial e inflación en las tasas de préstamos hipotecarios.

### Regresión Logística

Los científicos de datos usan la regresión logística para medir la probabilidad de que se produzca un evento. La predicción es un valor entre 0 y 1, en donde 0 indica un evento que es poco probable que ocurra y 1 indica una máxima probabilidad de que suceda. las ecuaciones logísticas usan funciones logarítmicas para calcular la línea de regresión.

A continuación se muestran algunos ejemplos:

- La probabilidad de ganar o perder en algún partido deportivo.
- La probabilidad de aprobar o reprobar un examen.
- La probabilidad de que una imagen sea una fruta o un animal.


## Referencias

- [Regresión Lineal - AWS](https://aws.amazon.com/es/what-is/linear-regression/#:~:text=La%20regresi%C3%B3n%20lineal%20es%20una%20t%C3%A9cnica%20estad%C3%ADstica%20establecida%20y%20se,inteligencia%20empresarial%20y%20conocimiento%20pr%C3%A1ctico.)
- [Regresión Lineal Simple  | Ejercicio Resuelto - YouTube](https://www.youtube.com/watch?v=wRqntzPxNXU)