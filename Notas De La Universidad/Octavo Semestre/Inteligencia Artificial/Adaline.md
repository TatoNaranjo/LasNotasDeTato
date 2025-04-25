---
date: 2025-03-11
tags:
  - OctavoSemestre
---

Es una red monocapa (Únicamente una capa de entrada y una única neurona en la capa de salida). Se concede como una red neuronal híbrida, ya que en este caso puede recibir patrones análogos o digitales, y mostrar salidas de solo resultados análogos (Por lo tanto, puede presentar más de 2 categorías a diferencia del perceptrón).

Los patrones de clasificación del Adaline no se representan en líneas rectas sino en líneas curvas. Además, se considera como un filtro adaptativo, lo que significa que permite modelar una relación entre diferentes señales **en tiempo real y de forma iterativa**.

Su entrenamiento se fundamenta en la regla delta y el uso del descenso del gradiente. Cuando nos referimos a delta decimos que trabajamos con la desviación de la magnitud del error cometido actual vs el error anterior, siendo el error total un error medio cuadrado. Y con el algoritmo del descenso del gradiente se mejora el entrenamiento hasta encontrar el descenso negativo que indicará un mínimo local. Por consiguiente la red Adaline es una red feedforward (con conexiones hacia adelante, no recurrente y por lo tanto supervisada).

> [!Task] Tarea
> Recordar qué es el descenso de gradiente.

La respuesta de un Adaline se acompaña de una precisión (definida como la desviación del error comparándose con el resultado esperado). 

$\text{error} + \text{precision} = 100\%$

>[!question] Consideración
>Precisión == Exactitud?

La salida de un Adaline es representada por la suma ponderada neta (Arquitectura Adaline).

## Arquitectura de un Adaline

> [!Check] Anotación
> La arquitectura de un Adaline no tiene una función de activación debido a que era esta la que convertía una respuesta análoga a digital, haciendo que se vuelva un perceptrón.

![[Pasted image 20250311104643.png]]

La salida de un Adaline debe apuntar a ser lo más exacta posible.

## Y Cómo Aprende?
El objetivo del Adaline es poder estimar de la manera más exacta la salida (conseguir una salida exacta es prácticamente imposible en la mayoría de los casos), se busca minimizar la desviación de la red para todos los patrones de entrada, eligiendo una medida del error global. Normalmente se utiliza el error cuadrático medio. La manera de reducir este error global es ir modificando los valores de los pesos al procesar cada entrada, de forma iterativa, mediante la regla del descenso del grandiente.

## Algoritmo Adaline

1. Inicializar los pesos (Wi) [-1,1] (De forma aleatoria)
2. Presentación del par Entrada $xp$ y salida deseada ($YDp$)
3. Especificar el índice de aprendizaje y la **precisión requerida** (desviación).
4. Inicializar la cuenta de épocas.
5. Estimar $E(t) - E(t-1)$
6. Si ($E(t)-E(t-1)>\text{precisión}$
	1. $\text{E(anterior) = E(actual)}$
	2. Calcular la suma ponderada de todos los patrones $Yo - w(i)*x(i)$
	3. Actualizar Pesos: $w(t+1) = w(t) + \text{alfa} * (\mid Ydp-Yo\mid)* x(i)$
	4. Cálculo del error: $Eo = Eo + (Ydp - Yo)^2$
7. $\text{épocas = épocas +1}$
8.  Calculamos el error medio: $\text{E(actual) = Eo / (i (n muestras))}$
	1. En cuyo caso no se haya finalizado el entrenamiento, volver al paso 5.
9. Fin del Entrenamiento 

## En General Aprende

1. Se convierten los datos de entrada en un vector de característica $x_i$
2. Se aprenden los pesos asociados a cada uno de los patrones de entrada considerando la regla delta y el descenso de gradiente
3. Si el error actual es menor que la precisión finaliza el entrenamiento.

