Enfoque de [[Programación Competitiva]] utilizado comúnmente como la primera idea que tenemos para resolver problemas.

>***Nota de Tato:*** Es como usar un enfoque de Programación Dinámica pero sin optimizar, así que puedes verlo como que... si el ejercicio te da el tiempo suficiente solo tienes que intentar hacer todas las combinaciones posibles y agarrar la mejor solución sobre la marcha.

> A veces, en donde más se suele fallar es en encontrar sobre qué elementos se debe realizar la búsqueda completa, por lo que la primer pregunta importante que te debes hacer es, sobre cuales elementos/variables puedes realizar la búsqueda completa.

## Preguntas Que Me Hago

- ¿Como hago para generar todas las combinaciones?
	- ¿Estoy realizando alguna categorización innecesaria que evite la búsqueda completa?
- Me estoy saltando algún caso/combinación?
- En caso de que esté guardando las combinaciones dentro de un arreglo, ¿Las combinaciones están quedando como yo quiero? o, ¿están quedando como las anoté en el papel?
- LEER BIEN SE BASA EN QUE NO OBVIES NINGUNA PALABRA QUE ESTÉ EN EL ENUNCIADO.
- Si quiero cambiar de enfoque pero conservo la misma lógica... ¿realmente lo estoy cambiando?
- Realmente estoy haciendo una búsqueda que involucre a TODOS los elementos?

> Consejo: Cuando una idea no te sirva y sientas que estás alejado de la solución, trata de minimizar el panorama. Por ejemplo, no mires todos los elementos dentro de un arreglo y concentrate en dos solamente.
## Definición General

La Búsqueda compleja es un método general utilizado para resolver casi cualquier problema de algoritmos. La idea es generar todas las soluciones posibles a un problema usando fuerza bruta, y luego agarrar la mejor solución o contar el numero de soluciones, dependiendo del problema. 

Búsqueda completa es una buena técnica si se tiene el tiempo suficiente de ir a través de todas las soluciones, porque la búsqueda normalmente es fácil de implementar y siempre da la respuesta correcta. Si la búsqueda completa es muy lenta, otras técnicas como los algoritmos greedy o la [[Programación Dinámica]] pueden ser necesarios.

## Generar Combinaciones

Habrán veces en las que tendremos que realizar combinaciones de 3 o más variables para encontrar varias respuestas, por lo que podemos recurrir a generar permutaciones o subsets que nos pueden ayudar a hacer esta tarea de una forma más sencilla. Sin embargo, debemos tener en cuenta de que esta posibilidad solo se puede dar cuando las constraints son lo suficientemente pequeñas como para permitir una complejidad relativamente alta (Por ejemplo, la complejidad de generar todas las posibles permutaciones de un elemento equivale a $O(N!)$).   

Muchas de estas estrategias requieren que comprendas el significado de la [[Recursión]], que consiste en una función que se llama a sí misma hasta que una condición se cumpla.

### Generando Subsets
#### Primer Método - Recursividad
Una forma elegante de ir a través de todos los subsets de un set es usar la recursión. La siguiente función `search` genera todos los subsets del set {$0,1,...,n-1$}. La función mantiene un vector `subset` que va a contener los elementos de cada subset. La búsqueda inicia cuando la función se llama con el parámetro 0.


```cpp
vector<int>subset;

void search (int k){
	if (k==n){
	// Procesa el Subset
	} else {
	
	// Esta es una opción en la que se incluye el elemento dentro del subset
	// Es decir: Rama Derecha.
	search(k+1);
	subset.push_back(k);

	// Esta es la opción en la que no se incluye el elemento dentro del subset
	// Es decir: Rama Izquierda
	search(k+1);
	subset.pop_back();
	}

}
```

Cuando la función `search` se llama con un parámetro $k$, este decide si incluir el elemento $k$ dentro del subset o no, y en ambos casos, luego se llama a si mismo con el parámetro $k+1$. De igual forma si $k = n$, la función nota que todos los elementos han sido procesados y un nuevo subset ha sido generado.

El siguiente árbol ilustra los llamados de la función cuando $n = 3$. Siempre podremos escoger entre la rama izquierda (en donde $k$ no se incluye en el subset) o la rama derecha (en donde $k$ se incluye dentro del subset).

![[subsetTreeExample.png.png]]

#### Segundo Método - Manipulación de Bits
Otra forma de generar subsets se basa en la representación en forma de bits de los enteros. Cada subset de un set de n elementos puede ser representado como una secuencia de n bits, los cuales corresponden a un entero entre $[0...2^n-1]$. Los unos en la secuencia del bit indican cuales elementos son incluidos dentro del subset. 

La convención tradicional es que el último bit corresponde al elemento 0, el penúltimo bit corresponde al elemento 1 y así sucesivamente. Por ejemplo, la representación en forma de bits de $25$ es $110011$, la cual corresponde al subset $[0,3,4]$.

El siguiente código recorre los subsets de un set de n elementos:

```cpp
for (int b = 0; b<(1<<n);b++){
	//Procesa el subset
}
```

El siguiente código nos muestra cómo podemos encontrar los elementos de un subset que corresponde a una secuencia de bits. Cuando se procesa cada subset, el código construye un vector que contiene los elementos en el subset.

```cpp
for(int b = 0; b<(1<<n);b++){
vector<int>subset;
	for(int i = 0; i<n;i++){
		if(b&(1<<i))subset.push_back(i);
	}
}
```

### Generando Permutaciones
Ahora, tenemos que considerar el problema de generar todas las permutaciones de un set de n elementos. Por ejemplo, las permutaciones de {0,1,2} son (0,1,2), (0,2,1), (1,0,2), (1,2,0), (2,0,1) y (2,1,0). De nuevo, tenemos dos enfoques: Podemos usar la recursión o ir a través de todas las permutaciones de forma iterativa.

#### Primer Método - Recursividad
Podemos generar las permutaciones de un set de elementos de forma recursiva casi de la misma forma que como lo hacíamos con los subsets. La siguiente función `search` va a través de las permutaciones del set {0,1,...,n-1}. La función va construyendo un vector `permutation` que contiene la permutación y la búsqueda inicia cuando la función se llama sin ningún parámetro.

```cpp
void search(){
	if (permutation.size()==n){
		// Procesa la permutación
	} else {

		for(int i = 0; i<n;i++){
			if(chosen[i])continue;
			chosen[i] = true;
			permutation.push_back(i);
			search();
			chosen[i] = false;
			permutation.pop_back();
		}
	}
}
```

Cada llamado de la función añade un nuevo elemento a `permutation`. El arreglo `chosen` indica cuales elementos ya fueron incluidos en la permutación. Si el tamaño de `permutation` es igual al tamaño del set, quiere decir que una permutación ha sido generada.

#### Segundo Método - Forma Iterativa
Otra forma de generar permutaciones es empezar con la permutación {0,1,...,n-1} y de forma repetida usar una función que construye la siguiente permutación de forma ascendente. La librería estándar de C++ contiene la función `next_permutation` que puede ser usada para esta labor.

> **DATO IMPORTANTE:** Para generar todas las permutaciones posibles debemos pasar un set de elementos organizado antes de utilizar la función `next_permutation`, esto debido a que el método genera combinaciones de forma ascendente, lo que quiere decir que todas aquellas combinaciones que sean menores que el set de elementos actual no serán generadas.

```cpp
vector<int> permutation;

for(int i = 0; i<n;i++){
	permutation.push_back(i);
}

do {
	// procesar la permutación
} while (next_permutation(permutation.begin(),permutation.end()));
```

### Backtracking

Un algoritmo de Backtracking inicia con una solución vacía y extiende la solución paso a paso. La búsqueda avanza de forma recursiva a través de todas las diferentes formas en las que se puede construir una solución.

Por ejemplo, considera el problema de calcular el número de formas en las que $n$ reinas pueden colocarse dentro de un tablero de $n * n$ de forma en que ninguna de las dos reinas se ataquen entre sí. Por ejemplo, cuando $n=4$, hay dos posibles soluciones:

![[backtrackingQueens1.png]]

El problema se puede resolver usando backtracking para poner a las reinas dentro del tablero fila por fila. De forma más precisa, exactamente una reina se colocará en cada fila dado a que ninguna reina ataca a cualquier otra que ya se haya colocado antes. Encontramos una solución cuando todas las $n$ reinas hayan sido colocadas en el tablero.

Por ejemplo, cuando $n =4$, algunas soluciones parciales generadas por el algoritmo de backtracking son las siguientes:

![[backtrackingQueens2.png]]

En la parte de más abajo podemos ver que los primeros tres intentos son ilegales porque las reinas se atacan entre sí. Sin embargo, la cuarta combinación es válida y puede extenderse a una solución completa poniendo dos reinas mas en el tablero. Hay solo una forma de colocar las dos reinas que quedan.

El algoritmo se puede implementar de la siguiente manera:

```cpp
void search (int y){
	if( y == n){
		count++;
		return;
	}

	for(int x = 0; x < n; x++){
		if(column[x] || diag1[x+y] || diag2[xy+n-1])continue;
		column[x] = diag1[x+y] = diag2[x-y+n-1] = 1;
		search(y+1);
		column[x] = diag1[x+y] = diag2[x-y+n-1] = 0;
	}
}
```

La búsqueda comienza llamando a `search(0)`. El tamaño del tablero es $n*n$, y el código calcula el número de soluciones con la variable `count`.

El código asume que las filas y columnas del tablero están enumeradas desde 0 hasta $n-1$. Cuando la función `search` es llamada con el parámetro $y$, coloca una reina en la fila $y$ y luego se llama a si misma con el parámetro $y+1$. Entonces, si $y=n$, significa que una función ha sido encontrada y la variable `count` se incrementa en uno.

El arreglo `column` mantiene el registro de las columnas que contienen una reina, y los arreglos `diag1` y `diag2` se encargan de llevar el registro de las diagonales. No es permitido añadir otra reina a una diagonal o columna que ya contiene una reina. Por ejemplo, las columnas y diagonales del tablero de $4*4$ se enumeran de la siguiente forma.

![[backtrackingArray.png]]

Supongamos que $q(n)$ describe el número de formas de colocar $n$ reinas en un tablero de ajedrez que mide $n*n$.

El algoritmo de backtracking que aparece anteriormente nos dice que, por ejemplo $q(8) = 92$. Cuando $n$ incrementa, la búsqueda rápidamente se vuelve más lenta porque el número de soluciones crece de manera exponencial. por ejemplo, calcular $q(16) = 14772512$ usando el algoritmo mencionado tomaría alrededor de un minuto en una computadora moderna.

> No hay una forma eficiente de calcular valores largos de $q(n)$. El record actual es el de $q(27) = 234907967154122528$, calculado en 2016.
## Recursos Útiles y Ejercicios

- [USACO Basic Complete Search Course](https://usaco.guide/bronze/intro-complete)
- [Competitive Programmer's Handbook - Chapter 5](https://usaco.guide/CPH.pdf)
