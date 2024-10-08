---
tags:
  - Algoritmos
  - Programación-Competitiva
  - Cpp
  - Problem-Solving
date: 2024-05-20
---
# Qué es Programación Dinámica?

Es un método utilizado en [[Programación Competitiva]] como una forma de buscar todas las posibles combinaciones para hacer algo. Para entender programación competitiva es casi necesario comprender el término de [[Recursión]].

## Explicándolo con Fibonacci.

Para calcular un numero de Fibonacci de forma recursiva podemos entender como que el numero de Fibonacci es la suma de los dos anteriores números, Tambien expresado como:

$fibonacci(x)=fibonacci(x-1)+fibonacci(x-2)$

En código como:

```cpp
ll fibonacci(ll x){
if(x==1)return 1;
if(x==0)return 0;
return (fibonacci(x-1)+fibonacci(x-2));
}
```

Aplicar esta formula a números grandes puede no ser eficiente, es por esto que se usa una técnica llamada Memoization.

### Aplicando Memoization

Lo primero que debemos hacer es definir un arreglo en el que vamos a memorizar todas las posibles respuestas, con un tamaño definido como el número máximo que nos pueden preguntar `N`.

```cpp
ll memo[N];
```

Inicialicemos el arreglo con un valor de -1 aplicando la siguiente función:

```cpp
memset(memo,-1,sizeof memo);
```

Ahora lo que procedemos a hacer en la función de Fibonacci es ver si el resultado que se está calculando ya fue asignado a una posición en el arreglo de memoización, y si es así, simplemente podremos retornar el mismo valor sin la necesidad de volver a repetir un cálculo ya hecho con anterioridad.

La función quedaría de la siguiente forma:

```cpp
ll fibonacci(ll x){
if(x==1)return 1;
if(x==0)return 0;
// Si el calculo ya fue hecho y asignado a la posición que estamos visitando, simplemente retornamos el numero ya calculado.
if(memo[x]!=-1)return memo[x];
// Asignamos el valor obtenido por primera vez a una posición del arreglo de memoización.
else return memo[x]=(fibonacci(x-1)+fibonacci(x-2));
}
```

