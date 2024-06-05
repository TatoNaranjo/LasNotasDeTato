Segunda clase de las [[Sesiones de estudio de UdeC]].
***Hecho Por:*** *TatoNaranjo*

La eficiencia de los algoritmos es importante en la programación competitiva. Normalmente es fácil diseñar un algoritmo que resuelva un problema de forma lenta, pero el reto real es inventar un algoritmo rápido. Si el algoritmo es muy lento solo recibirá una parte de los puntos totales o incluso, puede que no reciba puntos.

***Tabla de Contenido:***
```table-of-contents
```

# Reglas De Cálculo
La complejidad en tiempo de un algoritmo se describe como $O(...)$, donde los tres puntos representan una función. Normalmente la variable $n$ representa el tamaño del input. Por ejemplo, si el input es un arreglo de números, $n$ será el tamaño de un arreglo, y si el input es un string, $n$ será la longitud del string. 

## Loops - Ciclos Repetitivos
Una de las razones más frecuentes por las cuales un algoritmo es lento, es porque contiene muchos ciclos repetitivos que recorren el input. Entre más ciclos anidados contenga el algoritmo, más lento será.

Si hay $k$ ciclos anidados, la complejidad temporal es $O(n^k)$.

Por ejemplo, la complejidad temporal de este código es de $O(n)$.

```cpp
for (int i = 1; i<= n; i++){
	//Código
}
```

Y la complejidad temporal del siguiente código es $O(n^2)$

```cpp
for (int i = 1; i <= n; i++) { 
	for (int j = 1; j <= n; j++) { 
	// code } 
	}
}
```

## Orden de magnitud
Una complejidad temporal no nos dice el número de veces exacto en la que un ciclo se ejecuta, pero si muestra un *Orden de Magnitud*. En los siguientes ejemplos, el código dentro del ciclo repetitivo se ejecuta $3n$, $n+5$ y $n/2$ veces, pero la complejidad de cada código es $O(n)$

```cpp
for (int i = 1; i <= 3*n; i++) { 
	// codigo 
}
```

```cpp
for (int i = 1; i <= n+5; i++) { 
	// code 
}
```

```cpp
for (int i = 1; i <= n; i += 2) {
// code 
}
```

Aquí tienes otro ejemplo de como la complejidad temporal es $O(n^2)$

```cpp
for (int i = 1; i <= n; i++) { 
	for (int j = i+1; j <= n; j++) { 
	// code } 
	}
}
```

## Fases de un Algoritmo

Si el algoritmo tiene diferentes ciclos repetitivos, la complejidad total será la más grande dentro de una fase simple. Esto se debe a que la fase más grande es el cuello de botella que suele romper un código en cuanto a tiempos de ejecución.

Por ejemplo, el siguiente código consiste en tres fases con complejidades de tiempo: $O(n)$, $O(n^2)$  y $O(n)$. Entonces, la complejidad total es $O(n^2)$.

```cpp
for (int i = 1; i <= n; i++) { 
// code 
}

for (int i = 1; i <= n; i++) { 
	for (int j = 1; j <= n; j++) { 
		// code 
	} 
} 

for (int i = 1; i <= n; i++) { 
	// code 
}
```

# Tipos de Complejidad
La siguiente lista contiene algunos tiempos de complejidad comunes en algoritmos.


| $O(1)$ | El tiempo de ejecución de un algoritmo de ***tiempo constante***, es decir, que no depende de un tamaño de input. Normalmente es una formula directa que calcula nuestra respuesta. |
| ---- | ---- |
| $O(log_n)$ | Un algoritmo ***Logarítmico*** que parte el tamaño del input a la mitad por cada iteración. El tiempo de este algoritmo es logarítmico porque $log_2 n$ equivale al numero de veces que $n$ debe ser dividido entre $2$ para llegar a 1 |
| $O(\sqrt{n})$ | Un algoritmo de ***Raíz Cuadrada*** es más lento que un $O(log_n)$ pero más rápido que un $O(n)$. Una propiedad especial de las raíces cuadradas es que $\sqrt{n} = n/\sqrt{n}$, por lo que la raíz cuadrada $\sqrt{n}$ acaba, en algún punto, en la mitad del input. |
| $O(n*log_n)$ | Esta complejidad a menudo indica que el algoritmo organiza el input, porque la complejidad temporal de una organización eficiente de algoritmos es $O(n*log_n)$. Otra posibilidad es que el algoritmo use una estructura de datos donde cada operación tome un tiempo de $O(log_n)$ |
| $O(n^2)$ | Un algoritmo ***Cuadrático*** a menudo contiene dos ciclos repetitivos anidados. Es posible ir a través de todos los pares del elemento de un input en un tiempo de $O(n^2)$. |
| $O(n^3)$ | Un algoritmo ***Cúbico*** a menudo contiene tres ciclos repetitivos anidados. Es posible ir a través de todos triples de los elementos de un input en un tiempo de $O(n^3)$. |
| $O(2^n)$ | Esta complejidad temporal a menudo indica que el algoritmo itera a través de todos los subsets de los elementos del input. Por ejemplo los subsets de ${1,2,3}$ son $1$, $2$, $3$, $[1,2]$, $[1,3]$,$[2,3]$ y $[1,2,3]$ |
| $O(n!)$ | Esta complejidad temporal a menudo indica que el algoritmo itera a través de todas las permutaciones de los elementos de un input. Por ejemplo, las permutaciones de $[1,2,3]$ son $[1,2,3]$,$[1,3,2]$,$[2,1,3]$,$[2,3,1]$,$[3,1,2]$ y $[3,2,1]$ |

# Estimar la Eficiencia

| Tamaño de un Input | Complejidad temporal Requerida |
| ---- | ---- |
| $n<=10$ | $O(n!)$ |
| $n<=20$ | $O(2^n)$ |
| $n<=500$ | $O(n^3)$ |
| $n<=5000$ | $O(n^2)$ |
| $n<=10^6$ | $O(n*log_n)$ o $O(n)$ |
| $n$ más grande | $O(1)$ o $O(log_n)$ |

# Recursos Útiles
- [Competitive Programmer Handbook - Sección "Time Complexity"](https://usaco.guide/CPH.pdf)
- [Guía de la USACO - Complejidad Temporal](https://usaco.guide/bronze/time-comp?lang=cpp)
