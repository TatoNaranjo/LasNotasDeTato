---
date: 2025-02-04
tags:
  - IA
---
Es una arquitectura definida como monoproceso o monocapa, lo que significa que no tiene una capa oculta. Es la arquitectura más sencilla que se puede realizar dentro del estudio de redes neuronales. Además, es una red digital no recurrente, por lo que constituye un aprendizaje supervisado. Este tipo de red puede contener únicamente dos categorías.

>[!Success] Cuál es la base de un perceptrón?
El algoritmo de el perceptrón se basa en minimizar el error presentándole entradas, calculando salidas, evaluando el error, ajustando las conexiones sinápticas y redefiniendo el proceso hasta que el error sea mínimo o 0.

>[!Success] Concepto
El trabajo de un perceptrón está en minimizar un error. Una época de entrenamiento termina cuando se han modificado las conexiones sinápticas.


Los índices son lo que le da complejidad a la construcción de una red neuronal.

La única neurona que hace procesamiento es la capa de salida, por lo que no existen capas de salida, lo que le da su nombre a la arquitectura Monocapa.

Se caracteriza porque la función de su respuesta tiene una expresión representada de la forma $y=mx+b$ (representa su respuesta con una recta).


>[!WARNING] Anotación Importante
> Los patrones de entrada deben ser linealmente separables, de lo contrario no se puede resolver con un único perceptrón.

El índice que acompaña a una neurona virtual es el 0, y es la que representa el umbral de una neurona biológica.

Cuando considero las sumas de la entrada únicamente, decimos que estamos haciendo una suma ponderada, cuando le añadimos la suma de la neurona virtual, le llamamos. Suma ponderada Neta.

La función de una suma ponderada es $\text{Net} (j)(k)$

El estado actual de la neurona nos dice que hay una función en donde:
- $t$ = tiempo actual.
- $t-1$ = Tiempo inmediatamente anterior.
- $t +1$ = tiempo futuro o tiempo inmediatamente superior.

$net-\theta$ nos ayuda a considerar si la neurona está en reposo o no.

Por lo tanto $a(j)(k)(t+1)$ nos ayuda a determinar el estado futuro de la neurona.

Debemos asumir que todas las neuronas parten en reposo, y evaluamos lo que se recibe dentro de las dendritas con el umbral.

Artificialmente, el impulso se da con una función de transferencia definida como $f(a(t+1))$, en donde $a$ es el estado próximo de la neurona.

Luego de realizar las tareas mencionadas anteriormente, obtenemos una respuesta a la que nombramos como una $y$ obtenida.


# Definiciones Importantes

- $X$ -> Entradas a la RNA (Digitales (1,0), análogas (0... 1)) y son elementos que componen el patrón (Variables de entrada).
- $W$ -> Sinapsis (Wh y Wo)
- $\theta$ -> El Umbral, coeficiente o magnitud que determina el estado de activación de la neurona (WO, bias).
- $\text{NET}$ -> Ponderación de entrada (Sumas Ponderadas).
- $a$ -> Estado de Activación (F)
- $f$ -> Función de transferencia (escalón, lineal, sigmoide...). Representa la respuesta de activación de la neurona.
- $Y$ -> Salida (Digital, Análoga)

# Funciones de Activación
## Función Escalón Monopolar
Cuando se se produce una indeterminación en una función de activación monopolar, decimos que es una función discontinua. 


$$
F_{Emp}=
\begin{cases}
0,t<0\\
\text{"N.C"}, t=0\\
0, t<0
\end{cases}
$$


$$
\frac{dF_\text{Emp}}{dt}=
\begin{cases}
0 < 0\\
\infty = 0\\
0 > 0
\end{cases}
$$
Lo opuesto a una función discreta es una función continua, en la cual existe una derivada en todo el dominio, o aquella en donde existe un solo punto/rango en el dominio.
## Función Escalón con Umbral

Para esta neurona, el N.C no cambia el estado de la neurona, por lo tanto, ocurren los siguientes casos:

$$
F_{Emp}=
\begin{cases}
0,Net-\theta < 0\\
\text{"N.C"}, Net - \theta = 0\\
1, Net - \theta = 0
\end{cases}
$$

---

$\text{FUN} = \text{Net}-\theta$, entonces si la función es > 0, $Y =1$, de lo contrario $Y = 0$.

Cuando $\frac{d(w(t)=k)}{dt} = 0$ para todas las neuronas, podemos decir que la red "Aprendió", de lo contrario la red se sigue entrenando.

El primer elemento que entra a un bloque de aprendizaje (El Espacio en donde se agrega el Y deseado al perceptrón y que se encarga de calcular las nuevas conexiones sinápticas) es el error. Adicionalmente, también ingresa $\alpha$, que es el coeficiente de aprendizaje definido por la persona (Y que se recomienda poner como un valor entre 0 y 1).  También existen algoritmos que también pueden ayudarnos a definir cuál es el mejor coeficiente de aprendizaje.

La salida del bloque de entrenamiento está dada por la función $w(t+1)$.

La actualización de los pesos dentro del bloque de aprendizaje se da por la expresión: $\delta \omega=\alpha * e * x$. Si el error de aprendizaje $e$ es igual a 0, entonces los pesos se mantienen.


La ecuación del Error Obtenido se obtiene mediante la fórmula $\text{Error} = Yd - Yb$.

# Algoritmo del Perceptrón

- **Paso 1:** Inicializar los pesos ($Wi$) y el umbral (bias) ($-WO=\theta$). Recomendación: Aleatorios entre -1 y +1.
- **Paso 2:** Presentación de la diada, es decir, del par de la Entrada ($Xp$) y salida deseada ($YDp$).
- **Paso 3:** Calcular la salida actual $Yp(t)=f\sum{Wi(t)*Xi(t)-\theta}$.
- **Paso 4:** Calcular el Error para retroalimentar.
- **Paso 5:** Adaptar los pesos $Wi(t+1)=Wi(t) + \alpha * error * Xi(t)$
- **Paso 6:** Volver al paso 2 si el error es diferente a 0 para todos los patrones.

## Entonces... Cuándo Aprende?

1. Se convierten los datos de entrada en un vector de características $Xi$.
2. Se aprenden los pesos asociados a cada una de esas características para obtener un valor escalar a partir de cada vector de entrada.
3. Si este valor escalar se halla por encima de un umbral, se decide que el vector de entrada corresponde a un ejemplo de la clase objetivo (yk = 1).

## Conclusión General
- Los patrones de entrada expresan la característica de un problema, por lo tanto, por cada característica debe existir una neurona.
- Se actualizan los pesos asociados a cada característica para obtener un escalar (el $y$ obtenido).
- Si el escalar está por encima del umbral, se define que el vector de entrada corresponde a una clase objetivo.   

# Ejemplo del Perceptrón

![[Pasted image 20250305073101.png]]