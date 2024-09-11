> Informe hecho por: Santiago Naranjo Herrera, David Santiago Sierra y Edgar Duván Bernal Acero
# Introducción

El Método de Iteración de Punto Fijo es una técnica fundamental en el análisis numérico, utilizada para encontrar soluciones aproximadas a ecuaciones no lineales. Este método es especialmente útil cuando no se puede obtener una solución exacta de forma analítica, o cuando se trabaja con funciones complejas para las cuales los métodos tradicionales, como la factorización o el cálculo explícito, no son aplicables.

En el ámbito real, la iteración de punto fijo se aplica en diversas áreas, como la ingeniería, la física, y la economía, donde se necesita encontrar puntos de equilibrio o resolver sistemas de ecuaciones diferenciales. Por ejemplo, se utiliza para predecir el comportamiento de sistemas dinámicos, optimizar procesos en ingeniería, o modelar la estabilidad de mercados financieros.

La simplicidad y flexibilidad del método lo convierten en una herramienta valiosa para quienes necesitan soluciones rápidas y aproximadas, con la posibilidad de ajustarse a diferentes tipos de problemas.

# ¿Cómo se aplica?

Antes de explicar el Método de iteración de punto fijo es importante entender su propósito general; el cual es encontrar los ceros de una función, es decir, los valores en donde $f(x)=0$.
Esto puede expresarse de manera equivalente como $k(h) = h(x)$ lo cual también se puede reescribir como $f(x) = k(x) - h(x) = 0$.


Para resolver este tipo de problemas, primero debemos entender qué es un punto fijo. Un punto fijo de una función es aquel punto en el que la función evaluada en ese punto es igual al punto mismo, es decir, $g(x_p) = x_p$. En términos simples, la descripción de este tipo de problemas consiste en encontrar el punto fijo definido por la ecuación $g(x) = x$.

Definiendo el punto fijo se hace una sucesión con una relación de recurrencia definida por la siguiente formula:

$$x_{x+1} = g(x_n)$$
donde $x_n$​ es la n-ésima aproximación del punto fijo. Se elige un punto inicial $x_0$ y se define el límite de la sucesión para encontrar el punto fijo de la siguiente manera:
$$
x_p = \lim_{n\to \infty}x_p^n
$$

Los pasos para realizar el método de iteración de punto fijo son los siguientes:

1. **Reformular la ecuación:** Primero, necesitamos reformular la ecuación $f(x)=0$ en la forma $x=g(x)$ donde $g$ es una función que se deriva de $f$. Esta reformulación permite que el problema se convierta en un problema de encontrar el punto fijo de $g$, es decir, un punto $x$ tal que $g(x)=x$.
2. **Elegir el valor inicial desde el cual vamos a iterar**
3. **Iterar:** Aplicar la función $g(x)$ repetidamente para obtener una sucesión de valores $x_{n+1}​=g(x_{n}​)$.
4. **Converger:** El proceso se repite hasta que los valores sucesivos $x_n$ y $x_{n+1}$​ se acercan lo suficiente a un valor fijo, que es la solución aproximada de la ecuación original.

## Ejemplos de Aplicación del Método De Iteración De Punto Fijo

Para ilustrar los conceptos previamente discutidos, consideremos los siguientes dos ejemplos. A través de estos casos prácticos, se demostrará cómo aplicar el método de iteración de punto fijo para encontrar soluciones aproximadas a ecuaciones no lineales.

### Ejemplo 1

![[Pasted image 20240911073437.png]]

![[Pasted image 20240911073642.png]]
### Ejemplo 2

![[Pasted image 20240911073658.png]]

Como el valor se estabiliza tenemos que $x=2$ ya que 2 es una ecuación exacta de la ecuación original.

![[Pasted image 20240911080719.png]]

# Conclusión
El Método de Iteración de Punto Fijo es una herramienta poderosa y versátil en el análisis numérico, especialmente cuando se busca resolver ecuaciones no lineales de manera aproximada. A través de su simplicidad y facilidad de implementación, este método permite encontrar puntos fijos de funciones en contextos donde los métodos analíticos convencionales pueden no ser prácticos o factibles.

Los ejemplos presentados demuestran cómo, mediante la elección adecuada de una función $g(x)$ y un punto inicial, es posible aproximar soluciones con un alto grado de precisión. Sin embargo, es importante tener en cuenta que la convergencia del método depende de ciertas condiciones sobre la función y el intervalo de interés, por lo que siempre es recomendable realizar un análisis previo de la función para garantizar su aplicabilidad y efectividad.
