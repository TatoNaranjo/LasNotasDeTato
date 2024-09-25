Un método de [[Análisis Numérico]] para realizar aproximaciones.

![[Pasted image 20240925083413.png]]

El objetivo es buscar una aproximación hasta llegar a la raíz en donde la función corta el punto X por medio de una sucesión de aproximaciones por iteraciones.

La característica se da mediante la siguiente fórmula
$$X_{n+1} = X_n - \frac{f(x_n)}{f'(x_n)}$$
**Ejemplo:** Encontrar la aproximación a la raíz de la función: $f(x) = x³-x-1$ o, tomar como punto de partida $x = 1$, hacerlo hasta cuando las 2 cifras decimales sean iguales.
$$f'(x) = 3x²-1$$
En la primera iteración $x_1=1$
En la segunda iteración $x_2$:
  $$x_2 = x_1 - \frac{f(x_n)}{f'(x_n)} = x_2 = 1 - \frac{1³-1-1}{3(1²)-1} =1.5$$
En la tercera iteración $x_3$:
  $$x_3 = 1.5 -\frac{(1.5)³-1.5-1}{3*(1.5²)-1} = 1.3478$$

En la cuarta iteración $x_4$:

  $$x_4 = 1.3478 -\frac{(1.3478)³-1.3478-1}{3*(1.3478²)-1} = 1.3252$$
En la quinta iteración $x_5$:
  $$x_5 = 1.3252 -\frac{(1.3252)³-1.3252-1}{3*(1.3252²)-1} = 1.3247$$