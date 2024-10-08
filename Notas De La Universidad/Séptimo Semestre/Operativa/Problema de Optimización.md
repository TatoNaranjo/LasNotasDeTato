---
date: 2024-08-25
tags:
  - Problem-Solving
  - Algoritmos
  - Matemáticas
  - Planeacion
---

Problema asignado para la materia de [[Operativa]] en donde hay que entender cómo fue que se llegó a la solución planteada en el libro [Problemas de Programación Lineal de Javier Osorio Acosta](https://accedacris.ulpgc.es/bitstream/10553/1018/1/993.pdf)


> **Realizado Por:** Santiago Naranjo Herrera, Edgar Duván Bernal Acero y David Santiago Sierra Fernández.

Una empresa que realiza laminados de aceros de aleación especial produce dos tipos de láminas, que le reportan 8.000 y 6.000 pesetas netas respectivamente por cada metro producido. El proceso consta de una etapa previa de acondicionamiento del acero, otra de laminado propiamente dicho, y una tercera de pulido de la superficie resultante, disponiéndose diariamente para cada actividad de un número de horas limitado. Las horas requeridas por unidad de producto y las horas totales diarias disponibles para cada actividad se muestran en la tabla adjunta:

**Horas Requeridas por Unidad de Producto**

|                   | Laminado 1 | Laminado 2 | Horas Totales Disponibles |
| ----------------- | ---------- | ---------- | ------------------------- |
| Acondicionamiento | 4          | 2          | 60                        |
| Laminado          | 2          | 4          | 48                        |
| Pulido            | 6          | 2          | 76                        |
| **Ingresos**      | 8000       | 6000       |                           |
En principio no existen limitaciones de material, si bien la empresa está obligada a producir al menos un metro de laminado 1, y un metro también de laminado 2 diariamente con objeto de generar una rentabilidad mínima. Por el contrario, debido a acuerdos en el sector siderúrgico de control de la competencia, no puede producir más de 15 metros diarios de laminado 1, ni más de 5 metros diarios de laminado 2.

a) Con los datos anteriores calcular la programación de producción que maximiza los beneficios de la empresa. 

b) Suponiendo que interesara contratar más horas diarias de las actividades del proceso, ¿cuál sería el valor máximo que se pagaría por cada hora adicional?

## Solución
### Punto A

El objetivo de este enfoque es encontrar una rentabilidad de las ganancias o beneficios de la empresa pero un limitante que serían las horas propuestas para gastar por los distintos procesos por los que tienen que pasar los dos laminados.

A este tipo de problemas se les conoce como un tipo de problema primal, y una de las mejores formas para resolver este tipo de problemas puede ser utilizar un algoritmo simplex.

Este tipo de algoritmo nos ayuda a encontrar la mejor manera de distribuir los recursos para obtener una mayor ganancia en los resultados basándose en los siguientes pasos:

1. Se comienza en un punto de partida con una solución que no puede ser la más óptima pero que cumple todos los requisitos propuestos en el planteamiento del problema. En este caso, los requisitos mínimos que solicitan son al menos un metro de laminado 1 y un metro de laminado 2 que a su vez no sobrepasen la cantidad diaria de 15 metros y 2 metros respectivamente.
2. El algoritmo busca otras combinaciones que sean mejores a la anterior mediante una serie de pasos. Esto garantiza que haya un proceso dentro de la optimización de recursos.
3. En un punto, el algoritmo de mejora llega hasta un punto en el que deja de avanzar porque ya no hay mejores oportunidades de mejora por lo que entrega la solución más optimizada que existe.

Sabiendo esto y volviendo con el problema, podemos decir que se utilizó un algoritmo simplex con el cual se definen las variables para cada laminado haciendo que se pueda evaluar cuantos laminados se pueden lograr por día de cada laminado sin llegar a un tope, luego se define la producción que vamos a optimizar, identificando las variables de decisión, las cuales corresponden a los dos procesos de laminado y sus ingresos unitarios en pesetas de forma respectiva formando así la siguiente **función objetivo** a partir de los datos que tenemos hasta el momento:

$X_1=$ Laminado 1
$X_2 =$ Laminado 2 

$Maximizar$ $Z$ = 8.000$X_1$ + 6.000$X_2$

Ahora se definen las **restricciones** que se tienen por cada día producido en los procesos de acondicionamiento, laminado y pulido de cada producto. Esto da como resultado una matriz de 3x3 que indica las restricciones respectivamente:

> La función $Z$ está sujeta a:


4$X_1$, + 2$X_2$ <= 60
2$X_1$, + 4$X_2$ <= 48
6$X_1$, + 2$X_2$ <= 76

Definiendo los límites de producción acorde a la descripción del problema encontramos que del laminado 1 solo se pueden obtener entre 1 y 15 metros y entre el laminado 2 solo se puede obtener entre 1 y 5 metros. Es aquí donde se evidencia una diferencia fundamental con el proceso de resolución de un problema simplex debido a que tenemos no solo una limitante superior sino también una limitante inferior.

En este caso, con las variables de holgura agregadas nuestra función objetivo se ve modificada debido a que cada desigualdad debe convertirse en una igualdad.

Debido a que es un problema que está pidiendo una maximización de ganancias, se debe definir un sistema de ecuaciones que cumpla con el formato de la solución de un problema simplex de variables acotadas.

Lo primero que tenemos que hacer es identificar las variables que pueden entrar en un índice de mejoramiento para nuestra función objetivo. La cota superior que podemos elegir para no sobrepasar las restricciones de la función $Z$, es la de la producción de máximo 5 metros diarios para el laminado 2. Por el contrario, la cota inferior que podemos elegir es aquella de mínimo 1 metro de producción para el laminado uno.

Posteriormente, procedemos a crear una solución inicial factible que haga uso de los tres procesos. Esto se hace restando la diferencia entre las horas requeridas por unidad de productos considerando las cotas, a los valores iniciales de las horas totales disponibles ($60$, $48$ y $56$). Se evalúa si la solución actual es óptima comparando los valores de la fila cero (los coeficientes de la función objetivo) y se determina si se puede mejorar. Se elige la variable que entra en la base (la que maximiza la mejora del objetivo) y la variable que sale (la que limita la mejora).

Para ello, lo primero que hay que hacer es definir cuáles serían los ingresos por cada producto considerando las cotas de rentabilidad, mediante la siguiente operación:


$$
Z = \bar{C}_B \cdot \bar{B}^{-1} \cdot \bar{b} - \left( \bar{C}_B \cdot \bar{B}^{-1} \cdot \bar{N}_1 - \bar{C}_N \right) \cdot \bar{I}_{N_1} - \left( \bar{C}_B \cdot \bar{B}^{-1} \cdot \bar{N}_2 - \bar{C}_{N_2} \right) \cdot \bar{u}_{N_2} 
$$

$$
= 0 - \left(0 - (-8.000)\right) \cdot 1 - \left(0 - (-6.000)\right) \cdot 5 = -38.000
$$

Es decir que resolviendo la siguiente operación en donde ($60$, $48$ y $56$) son valores iniciales de las horas totales disponibles, $(4,2,6)$ las horas requeridas de acondicionamiento, laminado y pulimiento de el laminado 1; y $(2,4,2)$ las horas requeridas de acondicionamiento, laminado y pulimiento del laminado 2:
$(60,48,56)$ - ($((4,2,6)*1 - (2,4,2)*5)$

Obtenemos unas soluciones que respetan los rangos de las limitaciones del ejercicio:

| $Z$   | $X_1$ | $X_2$ | $X_3$ | $X_4$ | $X_5$ | Soluciones |
| ----- | ----- | ----- | ----- | ----- | ----- | ---------- |
| $Z$   | 8000  | 6000  | 0     | 0     | 0     | -38000     |
| $X_3$ | 4     | 2     | 1     | 0     | 0     | 46         |
| $X_4$ | 2     | 4     | 0     | 1     | 0     | 26         |
| $X_5$ | 6     | 2     | 0     | 0     | 1     | 60         |
Dado que las tres soluciones presentadas aún se establecen dentro de los límites del ejercicio, afirmamos que la solución puede seguir siendo optimizada. Por lo tanto, lo que tenemos que hacer ahora es realizar un pivotaje siguiendo las instrucciones para resolver un problema simplex.

Primero, se define cuál de las tres soluciones será descartada (A la que llamaremos $\gamma_1$) fijándonos en cuál es el valor mínimo que obtenemos al dividirlas entre sus respectivos valores de la cota inferior, es decir, de la columna $X_1$.

$$
\gamma_1 = \text{Min} \left\{ \frac{46 - 0}{4}, \frac{26 - 0}{2}, \frac{60 - 0}{6} \right\} = \frac{b_3 - l_{B_3}}{y_{31}} ; \, \gamma_1 = 10
$$

Realizando un pivotaje en el que la columna pivote es $X_1$ y la fila pivote es $X_5$, y siendo $(X_1,X_5) = 6$ la variable que sale de nuestra tabla simplex, tenemos que volver a definir el valor de nuestra función objetivo.

$$
Z = \hat{Z} - \left(z_k - c_k \right) \cdot \Delta_k = -38.000 - (8.000) \cdot 10 = -118.000
$$

Posteriormente volvemos a definir cuáles serían las horas establecidas para cada proceso de laminado cuando las ganancias se ajustan a la nueva función objetivo, resultando en la operación:

$(46,26,60) - (4,2,6)*10$

Obteniendo así los resultados de pivote para la solución más optimizada que se puede obtener de acuerdo a los parámetros del ejercicio.


|       | $X_1$ | $X_2$             | $X_3$ | $X_4$ | $X_5$             | LD         |
| ----- | ----- | ----------------- | ----- | ----- | ----------------- | ---------- |
| $Z$   | 0     | $\frac{10000}{3}$ | 0     | 0     | $\frac{-4000}{3}$ | $-118.000$ |
| $X_3$ | 0     | $\frac{2}{3}$     | 1     | 1     | $\frac{-2}{3}$    | 6          |
| $X_4$ | 0     | $\frac{10}{3}$    | 0     | 0     | $\frac{-1}{3}$    | 6          |
| $X_1$ | 1     | $\frac{1}{3}$     | 0     | 0     | $\frac{1}{6}$     | 11         |



Los beneficios máximos terminan resultando en X = 118.000 pesetas cuando se elaboran 11 metros diarios de laminado 1 y 5 metros diarios de laminado 2. A su vez terminan sobrando 6 horas de laminado y 6 horas de acondicionamiento (Variables $X_3$ y $X_4$). Sin embargo, se puede ver que existe una limitante o cuello de botella cuando hablamos del proceso del pulido para los laminados, el cual nos impide seguir optimizando la formula de maximización para los beneficios de la empresa.

### Punto B
Para considerar cuánto podríamos llegar a pagar por una hora adicional debemos pensar en la rentabilidad de los resultados y la valoración de los límites de los recursos. A esto se le conoce como un enfoque de problema dual.

Tal y como se plantea en el punto A para resolver un enfoque de maximización de ganancias (Es decir un problema primal), la formula es: $Z$ = 8000 * $X_1$ + 6000 * $X_2$.

Planteando el sistema de ecuaciones sobre las limitaciones equivalentes a la fórmula anterior:

4 ∗ $X_1$, +2 ∗$X_2$ <= 60
2 ∗ $X_1$, +4 ∗ $X_2$ <= 48
6 ∗ $X_1$, +2 − $X_2$ <= 76

Se puede deducir que tanto las variables $X_1$ y $X_2$ serán mayores a 0 y por lo tanto habrán horas de producción de acondicionamiento y laminado sobrantes.

Es en este punto en el que el problema se convierte en un problema duplex, debido a que nos preguntamos cuánto estamos dispuestos a pagar por unas horas extra de producción en el proceso de pulimiento si eso nos permitiese generar más ganancias.

En base a las limitaciones del cuello de botella en el proceso del pulimiento, podemos decir que la nueva función de minimización $Z = 60*W_1+48*W_2+76*W_3$ (en donde $W_1,W_2$ y $W_3$ son nuestras variables de holgura) está sujeta a las siguientes ecuaciones:

4-$W_1$+ 2-$W_2$+ 6-$W_3$ >= 8.000 
2-$W_1$+ 4-$W_2$+ 2-$W_3$ >= 6.000

Para que la condición $W_1, W_2, W_3 > 0$ se cumpla.

Debido al teorema de holgura complementaria y teniendo en cuenta la respuesta en el punto A, nos podemos dar cuenta de que la holgura existe en los procesos de Acondicionamiento y Laminado, por lo tanto incrementar las horas en ambas variables no generaría ningún ingreso adicional para la empresa. Conociendo esto, sabemos que el beneficio del pulimiento por hora equivale a $\frac{-4000}{3}$, por lo que procedemos a aplicar un valor absoluto sobre el beneficio para posteriormente aplicar la división.

Esto resulta en que: $\frac{4000}{3} = 1.333,33$ puntos de beneficio de pulimiento por hora.

Con lo que se puede concluir que cada hora de pulimiento incrementaría los valores de los beneficios en $1.333,33$ puntos.

