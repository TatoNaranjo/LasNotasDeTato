---
date: 2024-09-04
tags:
  - Scripting
  - Python
  - Matemáticas
  - Problem-Solving
---
# Introducción
El sexto punto del parcial de [[Análisis Numérico]] consistió en realizar un programa que calcule la Derivada y la Integral en su forma básica usando puntos flotantes en la captura. En este informe se presentará el código fuente, y su ejecución, la cual trunca sus operaciones a dos cifras decimales, además de continuar con el análisis del código y sus conclusiones.

> Hecho Por: Santiago Naranjo Herrera, Edgar Duván Bernal Acero, David Santiago Sierra.
## Programa de Derivación
### Descripción de la solución

El código (Que se podrá encontrar en la última parte del informe para esta solución) es una función en Python llamada `derivar`, diseñada para calcular la derivada de una expresión algebraica compuesta de términos polinómicos, exponenciales y trigonométricos. La función acepta como entrada una cadena (`expr`) que representa una expresión matemática y devuelve una cadena que representa la derivada de dicha expresión.

#### Métodos Utilizados para la Solución

1. **Separación de Términos:**
    
    - La función utiliza `replace` y `split` para separar los términos de la expresión proporcionada. El método `replace('-', '+-')` permite manejar tanto términos positivos como negativos de manera uniforme al utilizar `split('+')` para dividir la expresión en sus componentes.
2. **Identificación de Términos:**
    - La función evalúa cada término para determinar si es una constante, una función exponencial, trigonométrica o un polinomio. Dependiendo del tipo de término, se aplica una regla de derivación específica:
        - **Constantes:** La derivada de una constante es `0`.
        - **Función Exponencial `e^x`:** La derivada de `e^x` es `e^x`.
        - **Funciones Trigonométricas:** Se aplican las reglas de derivación para seno, coseno, tangente, etc.
        - **Polinomios:** Se utiliza la regla de la potencia, donde la derivada de `ax^n` es `n*ax^(n-1)`.
3. **Manipulación de Coeficientes:**
    - Los coeficientes de los términos se manejan utilizando conversiones de tipo (`float(coeficiente)`) para manejar resultados decimales, y se interpretan casos especiales (como coeficientes implícitos `+` o `-`).
4. **Construcción del Resultado:**
    - Los términos derivados se almacenan en una lista (`result`), que finalmente se combina en una cadena con `' + '.join(result)` para formar la expresión de la derivada completa.

### Ejemplos Para La Ejecución de la solución
![[derivate1.png]]

**Realizando la comparación de la respuesta con una calculadora de integrales, podemos ver que el resultado es el mismo:**

![[comprobationderivate1.png]]
#### Limitaciones del Código

La función solo admite una gama limitada de funciones (polinomios, `e^x`, y funciones trigonométricas como `sin(x)`, `cos(x)`, `tan(x)`). No puede manejar otros tipos de funciones, como logaritmos (`log(x)`), raíces cuadradas, o funciones hiperbólicas, entre otras. Además, como solo calcula las derivadas en su forma más simple, no soporta términos más complejos que involucran productos, cocientes, o funciones compuestas, por lo que no es adecuada para derivadas que requieran la aplicación de la regla del producto, la regla del cociente, o la regla de la cadena.
#### Importancia para el Ámbito del Análisis Matemático

Esta función es útil para automatizar el proceso de derivación de expresiones matemáticas básicas. Puede ser utilizada en aplicaciones que requieren un cálculo simbólico sencillo, como en algunas calculadoras matemáticas, software de aprendizaje, o demostraciones educativas. Además, el código ilustra claramente la aplicación de las reglas básicas de derivación (derivadas de constantes, potencias, exponenciales y funciones trigonométricas), lo que puede ser beneficioso para las personas que se están introduciendo dentro de la materia de cálculo integral
#### Conclusión
Este código proporciona una implementación básica de derivación simbólica para un conjunto limitado de funciones matemáticas. Aunque es útil para cálculos básicos y como herramienta de aprendizaje, tiene limitaciones significativas en términos de manejo de funciones más complejas, expresiones compuestas y validación de entrada. Para aplicaciones avanzadas en análisis matemático, es recomendable utilizar herramientas especializadas que proporcionen una mayor cobertura y precisión.

#### Código
A continuación se muestra el código completo para resolver derivadas básicas, hecho en python.

```python

def derivar(expr):
    # Primero separamos los términos de la expresión
    terms = expr.replace('-', '+-').split('+')
    result = []

    for term in terms:
        # Ignoramos los términos que están vacíos
        if term.strip() == '':
            continue
        
        # Si el término es la expresión e^x, se devuelve el mismo resultado
        if 'e^' in term:
            result.append(term)
            continue

        # Separamos las variables que tengan un coeficiente y un exponente
        if 'x' not in term:
            # Si no tiene algun coeficiente 'x', significa que es una constante.
            # La Derivada de una constante es 0, entonces lo retornamos
            return 0
        elif term == 'x':
            # La Derivada de x es 1
            result.append('1')
        elif 'sin(x)' in term:
        # Derivar términos trigonométricos
            coeficiente = term.split('sin(x)')[0]
            coeficiente = float(coeficiente) if coeficiente and coeficiente != '+' and coeficiente != '-' else (1 if coeficiente == '' or coeficiente == '+' else -1)
            result.append(f'{coeficiente}cos(x)')
        elif 'cos(x)' in term:
            coeficiente = term.split('cos(x)')[0]
            coeficiente = float(coeficiente) if coeficiente and coeficiente != '+' and coeficiente != '-' else (1 if coeficiente == '' or coeficiente == '+' else -1)
            result.append(f'-{coeficiente}sin(x)')
        elif 'tan(x)' in term:
            coeficiente = term.split('tan(x)')[0]
            coeficiente = int(coeficiente) if coeficiente and coeficiente != '+' and coeficiente != '-' else (1 if coeficiente == '' or coeficiente == '+' else -1)
            result.append(f'{coeficiente}sec(x)^2')
        else:
            # Si la variable tiene un exponente se separa
            if 'x^' in term:
                coeficiente, exponente = term.split('x^')
                exponente = float(exponente)
            elif 'x' in term:
                coeficiente, exponente = term.split('x')
                exponente = 1
            else:
                coeficiente, exponente = term, 0
            
            coeficiente = float(coeficiente) if coeficiente else 1

            # Aplicamos la regla de la potencia: n * x^(n-1)
            nuevo_coeficiente = coeficiente * exponente
            nuevo_exponente = exponente - 1

            if nuevo_exponente == 0:
                result.append(f'{nuevo_coeficiente}')
            elif nuevo_exponente == 1:
                result.append(f'{nuevo_coeficiente}x')
            else:
                result.append(f'{nuevo_coeficiente}x^{nuevo_exponente}')

    # Combinamos todos los términos derivados
    return ' + '.join(result)


expr = "tan(x) + e^x + 2x^2"
derivada = derivar(expr)
print(f"Derivada de {expr} es: {derivada}")

```
## Programa de Integración
### Descripción del Programa
Este código implementa un método para calcular la integral aproximada de una función utilizando la regla del trapecio. Además, en caso de que se desee calcular la integral de una identidad trigonométrica sin utilizar librerías, se hace uso de un cálculo basado en la serie de Taylor para calcular una aproximación al seno.

### Métodos Utilizados Para La Solución

#### Serie de Taylor para el Seno:

La función `sin(x)` utiliza una aproximación mediante la serie de Taylor. La serie de Taylor para el seno se define como: 
    $${\displaystyle \sum _{n=0}^{\infty }{\frac {f^{(n)}(a)}{n!}}(x-a)^{n}}$$​
En el código, se limita a 15 términos para obtener una aproximación del seno.

#### Integración Numérica - Regla del Trapecio:
La regla del trapecio es un método de aproximación para calcular el valor de una integral definida. Se basa en la idea de aproximar el área bajo la curva de una función utilizando trapecios en lugar de la forma precisa de la curva.

La función `integrar_trapecio(a, b, n)` calcula la integral definida de una función `f(x)` en el intervalo [a,b] usando el método del trapecio. La fórmula de la regla del trapecio es: 
$$
A_1 = Δx * \frac{Y_1+Y_2}{2}
$$
En donde $Y_1$ y $Y_2$ son las funciones definidas en su límite superior y su límite inferior respectivamente.
### Demostración del Código
#### Usando Funciones trigonométricas

![[IntegratePython1.png]]
**Comprobándola con una calculadora de integrales:**
![[Integration Comprobation 1.png]]
#### Usando exponentes
![[IntegralCheck2.png]]

**Comprobándola con una calculadora de integrales:**
![[IntegralComprobation2.png]]

### Consideraciones del Código
#### Aproximación en las funciones trigonométricas
Debemos tener en cuenta de que al realizar los cálculos mediante series de Taylor, los valores de las funciones trigonométricas no son acertadas totalmente, sino que se interpretan como una aproximación a los valores originales.
#### Método del Trapecio
La precisión del método del trapecio depende del número de subdivisiones `n`. Un valor bajo de `n` puede resultar en una aproximación inexacta. Además, el método puede no ser adecuado para funciones con alta variabilidad o discontinuidades en el intervalo de integración.

### Importancia dentro del ámbito del análisis numérico
#### Integración Numérica
La integración numérica es fundamental en el análisis numérico para calcular áreas bajo curvas y resolver problemas que no tienen una solución analítica simple. El método del trapecio es un primer paso en técnicas de integración numérica y se usa ampliamente debido a su simplicidad y eficiencia para problemas básicos.
#### Aproximación de Funciones Trigonométricas:
La aproximación de funciones trigonométricas mediante series de Taylor es crucial cuando se requiere un cálculo preciso en sistemas digitales y en análisis matemático donde las funciones no están disponibles en forma cerrada. Esto es relevante para aplicaciones en física, ingeniería y otros campos que requieren simulaciones precisas.
#### Cálculo de Factoriales:
El cálculo de factoriales es importante en combinatoria y en el cálculo de series y polinomios. Aunque la implementación recursiva puede no ser la más eficiente, proporciona una base para comprender cómo se manejan los cálculos factoriales.
### Conclusion
El código presentado utiliza técnicas fundamentales del análisis numérico, como las series de Taylor para la aproximación de funciones trigonométricas y el método del trapecio para la integración numérica. Estas herramientas permiten resolver problemas matemáticos complejos de manera aproximada, facilitando el trabajo con funciones difíciles de evaluar de forma exacta. Sin embargo, también presenta limitaciones en términos de precisión y eficiencia, que deben ser consideradas al aplicar estos métodos. A pesar de estas limitaciones, su simplicidad y utilidad hacen que estos métodos sean esenciales en el campo del análisis numérico y en numerosas aplicaciones científicas e ingenieriles.
### Código
```python
import math

e = 2.71828
pi = 3.1415926535897932384626433832795028841971

# Función factorial recursiva para calcular las funciones trigonométricas
def factorial(n):
    if n == 1 or n == 0:
        return 1
    else:
        return n * factorial(n - 1)

def deg(x):
    rad = x * pi/180
    return rad

# Función para entregar el resultado aproximado del seno usando series de Taylor
def sin(x):
    k = 0
    sinx = 0
    while x >= pi:
        x -= pi
    if pi > x > pi / 2:
        x = pi - x
    while k < 15:
        sinx += (-1)**k * x**(2*k + 1) / factorial(2*k + 1)
        k += 1
    return sinx

def cos(x):
    cosx = sin(pi / 2 - x)
    return cosx



function = "3x²"
def f(x):
    # Aquí definimos la función que deseamos integrar
    return 3*(x ** 2) 

def integrar_trapecio(a, b, n):
    # a: límite inferior de integración
    # b: límite superior de integración
    # n: número de subdivisiones
    h = (b - a) / n  # Ancho de cada subdivisión
    integral = 0.5 * (f(a) + f(b))  # Suma de los extremos

    for i in range(1, n):
        x = a + i * h
        integral += f(x)

    integral *= h  # Multiplica por el ancho de las subdivisiones
    return integral

# Ejemplo de uso
a = 0  # El límite Inferior de la Integral
b = 3  # El Límite Superior de la Integral
n = 1000  # El número de Subdivisiones que se quiere hacer en la función
resultado = round(integrar_trapecio(a, b, n),2)

print(f"La integral aproximada de {function} cuando tiene un límite inferior de {a} y un límite superior de {b} es: {resultado}")
```

# Referencias 
- [Método del Trapecio](http://aniei.org.mx/paginas/uam/CursoMN/curso_mn_15.html#:~:text=REGLA%20DEL%20TRAPECIO&text=En%20esencia%2C%20la%20t%C3%A9cnica%20consiste,puntos%20extremos%20de%20los%20intervalos.)