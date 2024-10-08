---
date: 2024-02-20
tags:
  - Matemáticas
---

Una nueva forma de expresar resultados en [[Matemáticas Especiales]]

## Introducción
Tenemos que empezar revisando esta raíz cuadrada: $\sqrt{-1}$

Una raíz cuadrada siempre va a dar un resultado positivo para números reales, como lo pueden ser por ejemplo, $\sqrt{9}$ o $\sqrt{16}$. Sin embargo, no existe una respuesta para un número negativo como el $-1$.

A estos números que no tienen respuesta, como $\sqrt{-1}$ se les conoce como números imaginarios, y se representan con la letra $i$.

Ahora, veremos qué pasa si elevamos la letra $i$ a diferentes potencias:

$i^{0} = 1$
$i¹ = i$
$i²=(\sqrt{-1})² = -1$
$i³=i²*i=-i$
$i⁴=i^2*i²=1$
$i⁵=i⁴*i=i$
$i⁶=i⁴*i²=-1$
$i⁷=i⁴*i³=-i$

La secuencia $1,i,-1,-i$ se repite para las potencias anteriores.

## Suma y Resta de Números Complejos
Imaginemos que tenemos una operación como la siguiente: 
1. $5+2i+4+7i$

Las operaciones se hacen sumando los términos semejantes, por lo que la cadena de operaciones se transforman en lo siguiente:
1. $9+9i$

Otros ejemplos serían
1. $10-8i+15-6i-3$
	$22-14i$

2. $7+2i-(5-9i)$
	$7+2i-5+9i$
	$2+11i$

3. $-12-11i+(-3+8i)$
	$-12-11i-3+8i$
	$-15-3i$

4. $14-i-(-3+2i)$
	$14-i+3-2i$
	$17-3i$

Ahora miremos las sumas y las restas desde una perspectiva diferente:

Dados $Z_1=3-5i$, $Z_2=-6+8i$ y $Z_3=-12-9i$ Resolver:
1. $Z_1+Z_2$
2. $Z_2-Z_3$
3. $Z_3+Z_2-Z_1$

**Solución:**
1. $3-5i-6+8i$
	$-3+3i$

2. $-6+8i+12+9i$
	$6+17i$

3. $-12-9i-6+8i-3+5i$
	$-21+4i$

## Multiplicación de los Números Complejos
Dados los números complejos $Z_1 = -3-5i$, $Z_2 = 7-9i$ y $Z_3 = -6+i$ encontrar:
1. $Z_1*Z_2$

**Solución**
1. $(-3-5i)*(7-9i)$
	$-21+27i-35i+45i²$
	$-21-8i+45*-1$
	$-21-8i-45$
	$-66-8i$

## División de los Números Complejos
Dados $Z_1 = -4+5i$, $Z_2 = 8-2i$ y $Z_3 = -9-12i$

Encontrar el Valor de:
1. $\frac{Z_1}{Z_2}$
2. $\frac{Z_2}{Z_3}$

Recordar que $(a+b)(a-b)=a^2+b²$

**Solución**
1. $\frac{-4+5i}{8-2i}$

	$\frac{-4+5i}{8-2i}$ * $\frac{8+2i}{8+2i}$

	$\frac{-32-8i+40i+10i²}{8²-(2i)²}$

	$\frac{-32+32i+10*-1}{64-4*-1}$

	$\frac{-42+32i}{68}$

	$-\frac{21}{34} + \frac{8}{17}i$


## Forma polar de un complejo
Se representa de la siguiente manera
$Z=R_\alpha$
-> $Z=a+b_i$
$r=\sqrt{a²+b^2}$
$tan\alpha = \frac{b}{a}$
$\alpha = tan^{⁻1}\frac{b}{a}$

![[representacionFormaPolar.jpeg]]

**Ejemplo:**
Hallar la forma polar de 
$Z = 3+4i$
$r = \sqrt{3²+4²}$
$r = \sqrt{25}$
$\alpha = tan^{-1}\frac{4}{3}$
$\alpha = 53.13°$

Es necesario graficar los ejercicios para saber qué dirección tiene el ángulo
**Ejemplo 2:**
$Z = -2+2i$
$r = \sqrt{-2²+2²}$
$r=\sqrt{8}$ o $r = 2\sqrt{2}$
$\alpha = tan^{-1}\frac{2}{2}$
$\alpha = 45°$
![[Ejemplo2FormaPolar.jpeg]]

Tomando el lado positivo:
$\alpha = 180°-45°$
$\alpha = 135°$

**Ejemplo 3:**
$Z = -3-5i$
$r = \sqrt{(-3^2)+ (-5²)}$
$r = \sqrt{34}$
$\alpha = tan^{-1}\frac{-5}{-3}$
$\alpha = 59.03°$

![[Ejemplo3FormaPolar.jpeg]]

Conociendo la inclinación del ángulo, tomamos su parte positiva
$\alpha = 180° +59.03°$
$\alpha = 239.03°$

**Ejemplo 4**
$Z = 2-3i$
$r = \sqrt{-2^2+-3²}$
$r = \sqrt{13}$
$\alpha = tan^{-1}\frac{-3}{-2}$
$\alpha = -56.30$

$\alpha = 360°-56.30°$
$\alpha = 303.6°$

## Forma Trigonométrica de un Complejo
$Z=a+bi$
$Z = \frac{r(cos\alpha + i sen\alpha)}{e^{i\alpha}}$

Cuando se pide presentarlo de la forma trigonométrica, el ángulo debe estar en radianes, no en grados.

**Ejemplo 2:**

$Z = 2+4i$
$r = \sqrt{2²+4^2}$
$r=2\sqrt{5}$
$\alpha = tan^{-1}\frac{4}{2}$
$\alpha = 63.43°$
$x = \frac{63.43}{180°}*\pi$
$x = 0.35\pi$

$Z=2\sqrt{5}[cos(0.35\pi)+sen(0.35\pi)]$

**Ejemplo 3:**
$Z = -5-3i$
$r = \sqrt{-5²+-3²}$
$r = \sqrt{34}$
$\alpha = tan^{-1}\frac{-3}{-5}$
$\alpha = 30.96°$
$\alpha = 210.96°$
$x = \frac{210.96}{180°}*\pi$
$x = 1.17\pi$

$Z = \sqrt{34}[cos(1.17\pi)+sen(1.17\pi)]$

## Forma exponencial
$Z = re^{i\alpha}$

**Ejemplo 1:**
$Z = \sqrt{34}e^{i\frac{7}{6}\pi}$

## Número Complejo como Una Potencia
$Z = (a+bi)^n$
$Z^n = r^n[cos(n\alpha) + isen(n\alpha)]$

Donde alpha está en grados.

**Ejemplo 1:**
$Z = (-2+2i)⁸$
$r = \sqrt{8}$
$\alpha = tan^{-1}-\frac{2}{2}$
$\alpha = -45$
$\alpha = 180-45$
$\alpha = 135°$

$Z⁸ = (\sqrt{8})⁸ [cos(8.135)+sen(8.135)]$
$= 8⁴[cos(1080)+isen(1080)]$
$= 4096 [1+i0]$
$Z⁸ = 4096$


**Ejemplo 2:**
$Z = (3+4i)⁴$
$r = \sqrt{25}$
$r = 5$
$\alpha = tan^{-1}\frac{4}{3}$
$a= 53.13°$


$Z⁴ = 5^4[cos(4*53.13°)+sen(4*53.13°)]$
$625 = [-0.84 + i(-0.53)]$
$Z⁴ = -526-336i$

## Transformar de forma polar a forma Binómica
$Z = 4_{30°}$

$r = 4$
$\alpha = 30$

Representarlo de forma trigonométrica:

$Z = 4[cos30°+isen30°]$
$4[\frac{\sqrt{3}}{2} + i \frac{1}{2}]$


$Z = 2\sqrt{3}+2i$


