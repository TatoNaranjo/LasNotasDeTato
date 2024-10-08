---
date: 2024-10-05
---

Parte del campo de [[Análisis Numérico]] que consiste en encontrar un polinomio que se aproxime a la función.

$$\text{sea } f(x) => f(a)$$

$$Px(x) = f(a)+f'(a)(x-a)+\frac{f''(a)}{2!}(x-a)²+\frac{f'''(a)}{3!}(x-a)³+\frac{f''''(a)}{4!}(x-a)⁴$$

## Ejemplo
Sea $f(x) = e^x$ y $x=0$ trancar a 4 iteraciones.

$f'(x)=e^x$
$f''(x)=e^x$
$f'''(x)=e^x$
$f''''(x)=e^x$

$$Pr(x)=e⁰+e⁰(x-0) = 1+x$$
$$P2(x)=1+x+\frac{e⁰}{2!}(x-0)² =1+x+\frac{x²}{2}$$
$$P3(x)=1+x+\frac{x²}{2}+\frac{e⁰}{3!}(x-0)³ = 1+x+\frac{x²}{2} + \frac{x³}{6}$$
$$P4(x)=1+x+\frac{x²}{2}+\frac{x³}{6}+\frac{e⁰}{4!}(x-0)² =1+x+\frac{x²}{2}+\frac{x³}{6}+\frac{x⁴}{24}$$

