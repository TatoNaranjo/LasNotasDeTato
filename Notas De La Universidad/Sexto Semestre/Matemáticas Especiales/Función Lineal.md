Parte del repaso inicial de la clase de [[Matemáticas Especiales]]

***Dados esos dos puntos Graficar y Hallar la Ecuación de la Recta.***
**Formulas**
*Ecuación de la Recta:* $y = mx+b$
*Pendiente:* $m=\frac{y2-y1}{x2-x1}$

**Puntos Dados**
$A(2,6)$ , $B(-1,-3)$

**Solución:**
$m = \frac {-3-6}{-1-2} = \frac{-9}{-3} = 3$

$y=3x+b$
$y = 3x$

**Gráfico:**
![[Ejercicio1FunciónLineal.png]]

***Hallar la ecuación de la recta Paralela a la ecuación anterior que pasa por el punto $C(-3,2)$:***

*Dos rectas son paralelas entre sí cuando sus dos pendientes son iguales.*
**$m_1 = m_2$

**Solución:**
$y = 3x+b$
$2 = 3*-3+b$
$2=-9+b$
$2+9=b$
$11 = b$
**Ecuación de la recta:** $y = 3x+11$

![[ejercicio1.1FuncionLineal.png]]

***Hallar la ecuación de la recta Perpendicular a la ecuación anterior que pasa por el punto $D(5,2)$***
*Dos rectas son perpendiculares si el producto de sus pendientes es igual a $-1$*
$m_1*m_2 = -1$
**Solución**
$m = -\frac{1}{3}*3$
$y = \frac{-1}{3}x +b$
$2 = \frac{-1}{3}*5+b$
$2 = \frac{-5}{3}+b$
$2+\frac{-5}{3} = b$
$\frac{11}{3}=b$

**Ecuación de la recta:** $y=-\frac{1}{3}x+\frac{11}{3}$

**Gráfica:**
![[Ejercicio1.2FunciónLineal.png]]

**Hallar los puntos de corte:**
Tomamos la primera ecuación $y=3x$, y la segunda ecuación de la recta $y=-\frac{1}{3}x + \frac{11}{3}$

Luego, tomamos el método que más nos convenga

**Punto de Corte de la Recta Perpendicular:**
**Igualación:**
$3x=-\frac{1}{3}x+\frac{11}{3}$
$3x+\frac{1}{3}x = \frac{11}{3}$
$\frac{10}{3}x = \frac{11}{3}$
$x=\frac{11}{10}$
$y=3*\frac{11}{10}$

Punto de Corte: $(1.1,3.3)$

**Punto de Corte de la Recta Paralela:**
Primera Ecuación de $y$ : $y=3x+11$
Ecuación General de la Perpendicular: $y=-\frac{1}{3}x+\frac{11}{3}$

$3x+11=-\frac{1}{3}x+\frac{11}{3}$
$3x+\frac{1}{3}x = \frac{11}{3}-11$
$\frac{10}{3}x = -\frac{22}{3}$
$x = \frac{\frac{22}{3}}{-\frac{10}{3}}$
$x=2.2$ 

$y=-\frac{1}{3}*2.2+\frac{11}{3}$

$(2.2,4.4)$


**Reglas de Kramer, Gauss para solucionar sistemas de 3x3**
$x+6y+z=7$
$x-2y-z=-1$
$5x+7y-4z=9$

**Metodo de Kramer**
Si la solución de la matriz para la determinante es 0, no tiene solución

$x=\frac{\delta x}{\delta s};y=\frac{\delta y}{\delta s};z=\frac{\delta z}{\delta s}$

$$\delta s = \begin{Vmatrix} 2 & 6 & 1\\ 1 & -2 & -1\\ 5 & 7 & 4 \\ 2 & 6 & 1 \\ 1 & 2 & -1 \end{Vmatrix} $$
$\delta s =(16+7-30)-(10-14-24)$
$\delta s =-7-(-48)$
$\delta s = 41$

$$\delta x = \begin{Vmatrix} 7 & 6 &1\\ -1 & -2 & -1\\ 9 & 7 & -4 \\ 7 & 6 & 1 \\ 1 & 2 & -1 \end{Vmatrix} $$

$\delta x =(56-7-54)-(-18-49+24)$
$\delta x = -5 - (-43)$
$\delta x = 38$
$x=\frac{38}{41}$


$$\delta y = \begin{Vmatrix} 2 & 7 &1\\ 1 & -1 & -1\\ 5 & 9 & -4 \\ 2 & 7 & 1 \\ 1 & -1 & -1 \end{Vmatrix} $$

$\delta y =(8+9-35)-(-5-18-28)$
$\delta y = 33$
$y = \frac{33}{41}$

$$\delta y = \begin{Vmatrix} 2 & 6 &7\\ 1 & -2 & -1\\ 5 & 7 & 9 \\ 2 & 6 & 7 \\ 1 & 2 & -1 \end{Vmatrix} $$
$\delta z = (-36+49-30)-(-70-14+54)$
$\delta z = 13$
$z = \frac{13}{41}$

