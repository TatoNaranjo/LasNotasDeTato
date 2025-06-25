---
tags:
  - Programación-Competitiva
  - Problem-Solving
  - Algoritmos
  - Cpp
date: 2024-05-20
---

Primera clase de las [[Sesiones de estudio de UdeC]].
***Por:*** *TatoNaranjo*

Conceptos fundamentales a tener en cuenta para trabajar la programación competitiva en C++.

# Lenguajes de programación
En este momento, los lenguajes más populares usados en competencias son C++, Python y Java. Por ejemplo: En Google Code Jam 2017, entre los 3.000 participantes, el 79% utilizó C++, el 16% Utilizó Python y el 8% Utilizó Java.

Mucha gente piensa que C++ es la mejor elección para un programador competitivo, y C++ está disponible en casi todos los sistemas de torneos. Los beneficios de *C++* radican en que es un lenguaje muy eficiente y su librería estándar contiene una colección grande de estructuras de datos y algoritmos.

Por otro lado, es buena idea dominar diferentes lenguajes y entender sus fortalezas. Por ejemplo, si los problemas requieren de enteros muy largos *Python* puede ser una buena elección.

Todos los documentos compartidos en el grupo están escritos en C++, junto con las librerías, tipos de datos y algoritmos que son usados comúnmente. Si no sueles programar en C++ aún, ahora es un buen momento para aprender.

# Plantilla de Código en C++

Una plantilla típica de C++ para programación competitiva se ve así:

```cpp
#include <bits/stdc++.h>
using namespace std; 
int main() { 
// La solución viene acá.
}
```

La línea `#include` al inicio del código es una característica del compilador `g++`, que nos permite incluir la librería estándar completa. Así, no es necesario incluir las librerías por separado como `iostream`, `vector` y `algorithm`, sino que están disponibles automáticamente.

La línea `using` declara que las clases y funciones de la librería estándar pueden ser usadas directamente en el código. Sin esa línea tendríamos que escribir `std::cout`, pero ahora se resume a `cout`.

# Input & Output

En los contest, un flujo estándar se usa para leer una entrada y escribir una salida. En C++, los flujos estándar son `cin` para entrada y `cout` para salida. Adicionalmente, las funciones de C `scanf` y `printf` también se pueden usar.

El input para un programa normalmente consiste en números y cadenas que están separadas con espacios o nuevos renglones. Pueden leerse desde el flujo de entrada `cin` de la siguiente forma:

```cpp
int a,b; // Esto es un número
string x; // Esto es una palabra
cin>> a >> b >> c;
```

Esta clase de código funciona siempre, asumiendo que hay al menos un espacio o un nuevo renglón entre cada elemento del input. Por ejemplo, el código de arriba puede leer cualquiera de los siguientes inputs.

```
123 456 monkey
```

```
123  456
monkey
```

El flujo de salida `cout` se usa para imprimir el output de la siguiente manera:

```cpp
int a = 123, b = 456;
string x = "Monkey";
cout<< a << " " << b << " " << x << "\n";
```

> El input y el output normalmente suelen causar problemas de rendimiento o un cuello de botella en el programa. Las siguientes líneas en el inicio del código hacer al input y al output, más eficientes.

```
ios::sync_with_stdio(0); cin.tie(0);
```

# Trabajar con Números

## Enteros
El tipo de enteros más usados en programación competitiva es el `int`, que es un tipo de dato de 32 bits, que comprende los rangos en valores de $-2^{31}$  hasta $2^{31}-1$, o desde $-2*10^9$ hasta $2*10^9$. Si el tipo de dato `int` no es suficiente, el tipo de datos de 64 bits `long long` puede usarse.

El siguiente código define una variable de tipo `long long`:

```cpp
long long x = 123456789123456789LL;
```

El sufijo `LL` denota que el tipo de numero es `long long`.

Un error común cuando se usa el tipo de datos `long long` es que el tipo `int` sigue siendo usado en alguna parte del código. Por ejemplo, el siguiente código contiene un error de desbordamiento:

```cpp
int a = 123456789; 
long long b = a*a; 
cout << b << "\n"; // -1757895751
```

Incluso cuando la variable `b` es del tipo `long long`, ambos números en la expresión `a*a` son del tipo `int`, y el resultado también es de tipo `ìnt`. Por culpa de esto, la variable `b` contendrá un resultado erróneo. El problema se puede resolver cambiando el tipo de `a`, a `long long` o cambiar la expresión a `(long long)a*a`.

## Números decimales
Los tipos de números punto-flotante en programación competitiva son el `double` de 64 bits y su extensión en el compilador de g++, el `long double` de 80 bits. En la mayoría de los casos usar un `double` es suficiente, pero un `long double` es más preciso.

La precisión requerida de la respuesta se da normalmente en la descripción del problema. Una forma sencilla de imprimir la respuesta es usar la función `printf` y darle el número de puntos decimales a la hora de imprimir el texto. Por ejemplo, la siguiente función imprime el valor de x con 9 ceros luego del punto.

```cpp
printf("%.9f\n", x);
```


# Recursos
- [Competitive Programmer's Handbook - Inglés](https://usaco.guide/CPH.pdf)
- [Guía de la USACO - Introducción a la Programación Competitiva](https://usaco.guide/general/intro-cp?lang=cpp)
