###### Por: TatoNaranjo

Tipo de Búsqueda usado en [[Programación Competitiva]] para elementos organizados.
#### Índice.

```table-of-contents
```

#### Implementación en C++

```cpp
int numbers[] = {1,2,3,4,5,6,7,8,9,10};
int n = numbers.size()-1;
int k; // La variable que queremos buscar en el array.
int left = 0; int right = n;
while(left<=right){
	int mid = (left+right)/2;
		if(numbers[mid]>k)r = mid-1;
		else l = mid+1;
}
```

#### Implementación en Python

```python

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
n = len(numbers) - 1
k = 5  # La variable que queremos buscar en el array

left = 0
right = n

while left <= right:
    mid = (left + right) // 2

    if numbers[mid] == k:
        print(mid)
        break
    elif numbers[mid] < k:
        left = mid + 1
    else:
        right = mid - 1


```

##### Complejidad Algorítmica: `O(log N)`
#### Cuándo podemos usar la Búsqueda Binaria?

 - El problema te pide un valor mínimo o un valor máximo de algo.
 - El problema se resuelve de la misma manera en todas las posibilidades hasta el punto en el que ya no se puede más.

Imagina que tienes un conjunto de elementos, y estás buscando que se cumpla una condición. Esa condición tiene un rango en el se puede cumplir, y otro rango en el que no.

La manera de pensarlo es, si tienes un índice en el que la condición de ``mid`` se cumple, puedes iterar sobre los demás elementos porque la condición puede cumplirse desde la posición `mid` hasta `n`, en donde `n` es el límite del rango que queremos buscar.

#### Un ejemplo de la vida cotidiana:

Imagina que estás en un juego que consiste en adivinar el número que estoy pensando dentro de un rango específico. Si el numero que me dices, se excede del valor del mío, te diré que intentes con un número más pequeño, y si el numero que me dices no alcanza el valor exacto en el que estoy pensando, te diré que intentes con un numero más grande.

Por lo tanto, la lógica del juego trasladada al algoritmo seguirá los siguientes pasos:

1. Sea `min = 1` y `max = n` donde n es el limite de nuestro rango.
2. Adivina el promedio de `max` y `min` redondeado hacia abajo de modo que sea un entero.
3. Si adivinaste el número, detén la búsqueda, acabas de encontrarlo.
4. Si el intento fue demasiado bajo, haz que `min` sea más grande que el numero que dijiste.
5. Si el intento fue demasiado alto, haz que `max` sea más pequeño que el número que encontraste.
6. Regresa al paso 2.

#### Cómo Implementamos el algoritmo?

Para entender como funciona el algoritmo, podemos recurrir al siguiente ejemplo:

Imagina que tenemos el siguiente arreglo que contiene los primeros 25 números primos en orden:

```cpp

int primes[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97};
```

Y queremos saber si el número ``67`` es primo. Si ``67`` se encuentra dentro del arreglo, sabremos que es  un número primo.

Sabiendo este dato también podemos averiguar cuántos números primos existen por debajo de `67`.

> La posición de un elemento en un arreglo se conoce como su índice. Los índices de los arreglos empiezan en `0` y aumentan hacia arriba. Si un elemento está en el índice `0` entonces es el primer elemento en el arreglo. Si un elemento está en el índice `3`, entonces tiene 3 elementos antes que él en el arreglo.

Cuando leemos el arreglo de izquierda a derecha de a uno a la vez para buscar el número `67`, estamos haciendo siguiendo el orden de una *Búsqueda Lineal* que tiene una complejidad algorítmica de **``O(N)``** ya que en el peor de los casos tendríamos que buscar a través de `n` elementos.

![[Arreglo Inicial Binary Search.png]]

Realizando la búsqueda nos daremos cuenta de que el elemento que buscamos se encuentra dentro del índice 18, por lo que habremos hecho 19 pasos para encontrar el número deseado usando una *Búsqueda Lineal*. Sin embargo, podemos optimizar esta búsqueda aún más.

Como el arreglo `primes` tiene 25 números, los índices del arreglo irán desde `0` hasta `24`. Al usar el pseudocódigo anterior, sabemos que `min = 0` y `max = 24`. 

El primer intento de la búsqueda binaria se daría con el índice `12`, que es $\cfrac{0+24}{2}$  , es decir $\cfrac{min+max}{2}$. 

`primes[12] = 67`? No, `primes[12] = 41`.

![[Binary Search Explanation 1.png]]

El índice que estamos buscando es mayor o menor que `12`? Como el arreglo está organizado de forma ascendente y sabemos que `41<67`, el valor `67` debe estar a la derecha del índice `12`, es decir, el índice que estamos tratando de buscar debe ser mayor a `12`. Por lo tanto, actualizamos el valor de `min` a `12 + 1` o `13` y dejamos a `max` tal y como está, en el número `24`.

![[Binary Search Explanation 2.png]]

Repitiendo los pasos anteriores, podemos ver que el promedio de `13` y `24` es `18.5`, el cual vamos a redondear hacia abajo a `18`.  Encontraremos que `primes[18]` es 67. 

![[Binary Search Explanation 3.png]]

En este punto, nuestro algoritmo se detiene ya que hemos encontrado el elemento en cuestión, y acortamos esos 19 pasos que teníamos que hacer en una *Búsqueda Lineal* a simplemente 2 pasos usando una Búsqueda Binaria.

En caso de que `max < min`, nos daremos cuenta de que el elemento que buscamos no se encuentra dentro del arreglo.

#### Entendiendo la Complejidad Algorítmica:

Una *Búsqueda Lineal* de un arreglo de `n` elementos puede tomar hasta `n` intentos, así que como ya sabemos, la búsqueda binaria hace menos intentos que una búsqueda lineal.

La idea base de este concepto es que si la búsqueda hace un intento incorrecto, la porción del arreglo que contiene los intentos razonables se reduce a la mitad, omitiendo todos los elementos que no pueden ser  posibles. Si la porción razonable tenía un tamaño de `32` elementos y la búsqueda produce un resultado incorrecto, la búsqueda pasa a ser en un tamaño de `16` y así sucesivamente.

Interpretando esta división como una formula matemática podemos decir que el proceso de llevar una búsqueda binaria a cabo se vuelve $log_2(n)$.

Para que tengas una idea más sencilla de cuantos ciclos van a hacerse, te dejo una tabla que muestra los logaritmos en base 2 de los siguientes elementos:

| $n$ | $log_2(n)$ |
| ---- | ---- |
| 1 | 0 |
| 2 | 1 |
| 4 | 2 |
| 8 | 3 |
| 16 | 4 |
| 32 | 5 |
| 64 | 6 |
| 128 | 7 |
| 256 | 8 |
| 512 | 9 |
| 1024 | 10 |
| 1,048,576 | 20 |
| 2,097,152 | 21 |

Y aquí una comparación de `n` con `log_2(n)` 

![[Comparation.png]]

#### Ejercicios Para practicar:

- [Codeforces - Cursos de la ITMO](https://codeforces.com/edu/course/2/lesson/6/1/practice)
- [Codeforces - Interesting Drink](https://codeforces.com/problemset/problem/706/B/)
- [Codeforces - Frodo and pillows](https://codeforces.com/problemset/problem/760/B)
- [LeetCode - Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
- [LeetCode - Search Insert Position](https://leetcode.com/problems/search-insert-position/)
- [LeetCode - First Bad Version](https://leetcode.com/problems/first-bad-version/)
- [LeetCode - Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square/)
- [LeetCode - Find Peak Element](https://leetcode.com/problems/find-peak-element/)
- [LeetCode - Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- [LeetCode - Find Right Interval](https://leetcode.com/problems/find-right-interval/)
- [Codeforces - GukiZ hates Boxes](https://codeforces.com/problemset/problem/551/C)
- [Codeforces - Enduring Exodus](https://codeforces.com/problemset/problem/645/C)
- [Codeforces - Chip 'n Dale Rescue Rangers](https://codeforces.com/problemset/problem/590/B)
#### Conclusión:

![[meme.jpeg]]
#### Referencias:

- Explicación de la mano de  [JuanOP](https://codeforces.com/profile/SpecterByte) y la comunidad del Club de Algoritmia Hispano.
- [Curso Ciencias de La Computación: Unidad 1, Lección 2: Búsqueda Binaria](https://es.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)
