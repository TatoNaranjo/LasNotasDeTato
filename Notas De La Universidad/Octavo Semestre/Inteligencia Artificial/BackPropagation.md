---
date: 2025-03-26
tags:
  - OctavoSemestre
---
Se define como una red forward multicapa.

La diferencia entre el Back-Propagation y las redes monocapa como el Perceptrón o el Adaline radica en que back -Propagation puede resolver cualquier tipo de problemas. Este principio se basa en la capacidad de los seres humanos para generalizar los problemas y poder adaptarse.

![[Pasted image 20250326073308.png]]

![[Pasted image 20250326073432.png]]

Debido a la existencia de las capas ocultas, ya no es tan sencillo actualizar el error de la misma forma en la que lo hacíamos antes (Osea: $e = Y_d - Y_o$), y no se puede calcular el error correctamente.

Back Propagation surge como una solución debido a que es una metodología que traduce directamente: **Propagación del Error Hacia Atrás**. Las neuronas que hagan procesamiento tienen que ser contínuas, por lo tanto también tienen que ser derivables (Por lo tanto la función dentro de un Back Propagation No puede Ser un Escalón o un Signo).

## Búsqueda del Error Mínimo

En las gráficas de Error, normalmente buscábamos el punto más bajo en el que $e$ Fuese cercano a cero, sin embargo para este caso, no es tan sencillo debido a que la gráfica puede tener muchas variaciones.  En este caso, tenemos que buscar un error mínimo global.

Cuando el error se mantiene por mucho tiempo, se conoce como un valle. Es ahí cuando debemos actualizar no solo los pesos, sino el coeficiente de aprendizaje de la red para que se entrene más o menos rapido.

El momentum se basa en optimizar el aprendizaje de la red. Este mismo nos va a indicar Cuando estamos en 3 estados: Divergencia (En este caso el momentum nos indica que debemos devolvernos), Convergencia (Recortando los pasos del modelo) y Valles (Hará que el Alfa sea más rápido).

**MAXIMO TRABAJAR CON 1 CAPA OCULTA**

## La Idea

- No sabemos que deben hacer las neuronas ocultas, pero podemos calcular como cambia el error cuando cambia su actividad.
- En vez de utilizar la salida deseada para entrenar las neuronas ocultas, usamos la derivada del error con respecto a sus actividades ($\delta (E) / \delta(y)$)
- La actividad de cada neurona oculta puede tener efectos en muchas neuronas de salida, por lo que debemos combinarlo.
- La actividad de cada neurona oculta puede tener efectos en muchas neuronas de salida, por lo que debemos combinarlos.
- Una vez que tenemos las derivadas del error para todas las unidades ocultas, podemos calcular las derivadas del error para sus pesos de entrada.
- Aplicamos el entrenamiento con un momento para optimizar la convergencia de la RNA

El cálculo del error en las neuronas ocultas se puede estimar a partir de conocer el cambio en la actividad de la red.


**REALIZAR UN CUADRO COMPARATIVO ENTRE RNA PM Y RNA BP**.

## Algoritmo Back Propagation

1. Inicializar los pesos de la red con valores pequeños y aleatorios.
2. Presentar un patrón de entrada y especificar la salida deseada que debe generar la red (Si la red se utiliza como un clasificador, todas las salidas deseadas serán cero, salvo una, que será la de la clase a la que pertenece el patrón de entrada).
3. **Inicio del Forward:**  (Forward, Backward, Actualización de Pesos, Cálculo del Error, Evaluación de las salidas). Clasificar la salida actual de la red, para ello presentamos las entradas a la red y vamos calculando la salida que presenta cada capa hasta llegar a la capa de salida que será la salida de la red $y1, y2, y3, y_n$.  Por lo tanto los pasos son los siguientes:
	1. **Cálculo de las entradas netas en las neuronas ocultas (j)** Se calculan las entradas netas para las neuronas ocultas procedentes de las neuronas de entrada.
	
	   $$
		\text{net}_{pj}^{h} = \sum_{i=1}^{N} w_{ji}^{h} x_{pi} + \theta_{j}^{h}
		\ $$
	   2. **Cálculo de las salidas de las neuronas ocultas**
	      $$y_{pj} = f_{j}^h \text{(net)}_{pj}^h$$
	   3. **Cálculo de la suma ponderada en las Neuronas de Salida**
	      $$
\text{net}_{pk}^{o} = \sum_{j=1}^{L} w_{kj}^{o} \cdot Y_{pj} + \theta_{k}^{o}
$$
		$$
		Y_{pk}^{o} = f_{k}^{o} \left( \text{net}_{pk}^{o} \right)
		$$
		4. **Cálculo de los Términos de Error Para Todas Las Neuronas**
		   $$
			\delta_{pk}^{o} = (d_{pk} - y_{pk}) f_{k}^{o'} \left( \text{net}_{pk}^{o} \right)
			$$

			**ACTIVIDAD:** Buscar las derivadas de todas las funciones de activación.
		4.1  **Cálculo de los Errores Parciales en las Entradas Ocultas** ( Si la función es Sigmoidal su derivada es igual a $(X_pi (1-x_{p_i})))$
	
5. **Actualización de Los Pesos**
	1. **Actualización de los Pesos de Salida (Sin Momentum)**
	2.  **Actualización de los Pesos de la Capa Oculta** (Sin Momentum)
		
6. **Cálculo del Error Medio Cuadrático:** El proceso se repite desde el paso 3 hasta que el error del patrón de todos los patrones esté por debajo de la precisión
