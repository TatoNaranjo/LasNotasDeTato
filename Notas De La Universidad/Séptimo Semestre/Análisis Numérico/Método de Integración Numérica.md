---
tags:
  - Matemáticas
date: 2024-10-16
---
## Regla del Trapecio

Consta de aproximar el área bajo la gráfica de una función por medio de intervalos. Al usar trapecios (es decir, "la regla del trapecio"), podemos obtener aproximaciones más precisas que al utilizar rectángulos (es decir, "sumas de Riemann"). Para esto, debemos recordar que el área de un trapecio ($h$) se halla por medio de la siguiente fórmula:

$$h = (\frac{b1+b2}{2})$$

En donde $b1$ hace referencia a la base mayor y $b2$ hace referencia a la base menor

O escrita de otro modo:

$$h = \frac{[f(a)+f(b)]}{2}*(b-a)$$

### Ejemplo

Utilizar la regla del trapecio para obtener una aproximación de la integral definida siguiente $f(x)$ en el intervalo $(-1,1)$. 

#### Solución

Primero, debemos definir la longitud de un intervalo al momento de utilizar un trapecio

$$\int_{1}^{-1} e^{x⁴}dx$$

$$n = 1$$

$$a = 1 \text{ , } f(a) = f(1) = e^{1⁴} = e$$

$$\int_{-1}^{1} e^{x⁴}dx = \frac{[1-(-1)][e+e]}{2}$$

$$= 2\frac{[2e]}{2}$$

$$=2e$$

$$= 5.436563$$


Ahora, podemos proceder a hallar la serie que nos ayuda a aproximar el área bajo la curva:

$$\int_{a}^{b} f(x)dx = [\frac{h}{2}]*[f(x_0)+2*f(x_1)+2*f(x_2)+...+f(x_n)]$$

$$h=\frac{b-a}{n}$$

