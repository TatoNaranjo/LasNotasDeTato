---
date: 2024-03-15
tags:
  - Redes
---

Entendiendo una sucesión sobre señales para la materia de [[Comunicación de Datos]].

## Qué necesita una función para representarse mediante Series de Fourier?

Para que una función pueda ser representada mediante series de Fourier debe ser periódica. Además, esta función debe ser continua a trozos.
## Qué es una Función Periódica?
 Una de las condiciones para que una función $P(t)$ sea periódica es que $P(t) = P(t+T)$, en donde se interpreta que la función $P$ evaluada en cualquier punto $t$ debe ser equivalente a la función $P$ en ese mismo punto, sumándole un intervalo $T$.

Si esta condición se cumple, podemos decir que $P(t)$ es periódica a $T$.

![[Explicacion Fourier.png]]

## Partes Importantes de una Serie de Fourier 
Para entender el significado de una Serie de Fourier, debemos entender el significado de sus conceptos más importantes uno por uno.

### La expresión de una Función Senoidal
 Si tenemos una función senoidal expresada de las siguiente forma $f(t)=sen(2\pi f_o t)$ en donde $f_0$ puede ser un número cualquiera y $t$ es la variable independiente, $f_0$ es la frecuencia del $sen$.

El periodo es la inversa de la frecuencia, es por ello que si en nuestra función aparece $\frac{1}{T}$, podemos hacer alusión a una frecuencia.

### La suma de Senos y Cosenos
Una Serie de Fourier es una suma de Senos y Cosenos que tienen una frecuencia igual a múltiplos de la frecuencia $f_0$ y están multiplicados por constantes (También llamados coeficientes de Fourier), los cuales indican cuánto varían cada uno de esos Senos y Cosenos. De igual forma, a partir de la suma de Senos y Cosenos de forma infinita, se puede llegar a la interpretación de una gráfica de una señal analógica como la siguiente.
![[graficaFourier.png]]

### Discontinuidades en la función
Si la función que deseo representar mediante series de Fourier presenta discontinuidades, lo que hará mi sucesión será aproximar al promedio entre el valor máximo de la función y el valor mínimo de la función, de la siguiente manera:

![[Discontinuidad.png]] 