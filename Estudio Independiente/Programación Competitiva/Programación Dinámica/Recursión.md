---
date: 2024-05-20
tags:
  - Problem-Solving
  - Cpp
  - Programación-Competitiva
---

Es una forma de utilizar un proceso para definir al mismo proceso, y a su vez un recurso vital para entender diversos algoritmos que tiene la [[Programación Dinámica]].

Una función recursiva debe de tener:
- Un Caso Base
- Transiciones que nos lleven a ese caso base.
- Un valor de retorno (Opcional)

```table-of-contents
```


## Cómo funciona la recursión por dentro?

Cuando nuestro programa se ejecuta, se crea un espacio denominado stack, que funciona como una estructura de datos pila en donde el ultimo elemento en entrar es el primero en salir. Cada vez que se ejecuta una función en el programa se introduce un espacio o frame que contiene todos los elementos relacionados a la función, en el stack.

## El Caso Base

Es aquella condición de parada para nuestro algoritmo recursivo, que nos dice cuando dejar de introducir frames en nuestra pila y empezar a retornar los valores. En otras palabras, es aquello que evita que nuestra función recursiva se quede en un ciclo infinito.

## Ejemplos

### Sumando dos números de forma recursiva.

Imaginemos que tenemos que hallar la suma de dos números, $a$ y $b$ en donde $0<a,b<=10e8$. Para hacer esta suma podemos utilizar diversos métodos, pero el que nos interesa en este caso es el de la recursión.
#### Solución Recursiva
Si paso dos parámetros a y b a una función, debo tener en cuenta los tres conceptos bases de la recursión.

- El caso base: La condición para que la función se detenga en este caso, será que alguno de los dos números llegue a 0, esto debido a que si el numero es igual a 0 no se está sumando nada.

- La transición que nos lleva a el caso base: Cómo modificamos la función para que llegue a el caso base? Restando uno de los dos números y añadiendo el valor al elemento que está sin restar. Es decir que los dos casos que pueden darse son $a=a$, $b=b-1$ y $a=a-1$, $b=b$ .

### Implementación en c++

```cpp
int sum (int a, int b){
if(b==0)return a;
return sum(a,b-1)+1;
}

```


### Fibonacci.

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

Lo que hace la función, es que al llegar al caso base y retornar un elemento se sume a los valores que teníamos anteriormente. En este caso, cuando la función ```fibonacci(x-1)``` llega a su caso base, retorna un 1 o un 0 para luego proceder con la función `fibonacci(x-2)`. Cuando la última función llega a su caso base, los resultados de la primera y la última función se suman y se retornan.


### Un Conjunto de Libros

Tenemos un conjunto de libros y queremos saber el total de las páginas por todos los libros.

Para llegar a esta solución podemos utilizar dos métodos.

#### Solución Iterativa
Consiste en ir viendo cuantas páginas tiene el primer libro, luego sumarlas con las de el segundo libro y así hasta llegar al final de los libros.

#### Solución Recursiva
Para encontrar el total de paginas en los libros, podemos tomar el numero de páginas del primer libro y sumarlo a el total de páginas que tienen todos los demás. Repetiremos ese proceso hasta que el numero restante de libros por contar sea 1.



