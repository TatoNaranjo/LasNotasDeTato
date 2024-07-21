Una secuencia de números utilizada en problemas de [[Combinatoria]].
## Definición
Los números de catalán son una secuencia de números que son realmente útiles en problemas de combinatoria, a menudo involucrando objetos de forma recursiva.

Los primeros números $C_n$ en la secuencia de catalán, iniciando desde 0 son:
$1,1,2,5,14,42,132,429,1430,...$
## Aplicaciones
El número de catalán $C_n$ puede ser la solución a algunos de estos problemas:
- El número de expresiones con paréntesis válidas que consisten en $n$ paréntesis izquierdos y $n$ paréntesis derechos.
	- **Por ejemplo, $C_3 = 5$ porque podemos construir las siguientes expresiones con paréntesis usando tres paréntesis izquierdos y tres paréntesis derechos:**
		- ()()()
		- (())()
		- ()(())
		- ((()))
		- (()())

- El número de árboles binarios completos enraizados con   $n + 1$ hojas (los vértices no están numerados). Un árbol binario enraizado es completo si cada vértice tiene dos hijos o ningún hijo.
- El número de formas de poner entre paréntesis de manera correcta $n+1$ factores
- El número de formas de conectar los $2n$ puntos en un círculo para formar $n$ acordes discontinuos.
	- **Por ejemplo, en el ejercicio adjunto [Safe Salutations](https://vjudge.net/problem/UVA-991)**

## Cómo calcularlos
Hay dos formas para calcular los números catalanes, de la forma **recursiva** y de la forma **analítica**. Debido a que los problemas relacionados a los números de catalán suelen tener la misma solución en la mayoría de los casos, de momento solo lo explicaremos de la forma más sencilla de hacer, es decir, de manera recursiva.
### Fórmula Recursiva

$C_0 = C_1 = 1$
$C_n = \sum_{k = 0}^{n-1} C_k C_{n-1-k} , {n} \geq 2$

La formula de recursividad se puede deducir fácilmente teniendo en cuenta el problema de la secuencia de paréntesis correcta.

El paréntesis de apertura más cercano a la izquierda $l$ corresponde a un cierto paréntesis de cierre $r$, lo que divide la secuencia en dos partes en las cuales debería haber una secuencia correcta de paréntesis. Esta formula también se divide en dos partes. Si miramos la variable $k = r-l-1$, entonces para un $r$ ajustado habrán exactamente $C_k C_{n-1-k}$ secuencias de paréntesis. Sumando esto sobre todas las $k's$ admisibles, obtenemos la relación de recurrencia en $C_n$.

Ahora, también puedes pensarlo de la siguiente forma. Por definición, $C_n$ denota el número correcto de las secuencias de paréntesis. Ahora, la secuencia puede dividirse en 2 partes de longitud $k$ y $n-k$, y cada una de las partes debe ser una secuencia de paréntesis correcta. Por ejemplo:

- ()(()) pueden dividirse en () y (()), pero no se pueden dividir en ()( y ()). De nuevo, sumando todas las $k's$ que son válidas, obtenemos una relación de ocurrencia en $C_n$.

## Implementación en C++
```cpp
const int MOD = ....
const int MAX = .... 
int catalan[MAX]; 
void init() { 
	catalan[0] = catalan[1] = 1; 
	for (int i=2; i<=n; i++) { 
		catalan[i] = 0; 
		for (int j=0; j < i; j++) { 
				catalan[i] += (catalan[j] * catalan[i-j-1]) %  MOD; 
				if (catalan[i] >= MOD) { 
					catalan[i] -= MOD; 
				} 
		} 
	} 
}
```

### Ciclo for para construir la secuencia en $O(n)$
Implementación utilizada para el ejercicio ***Safe Salutations***.

```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

vector<int>catalan(11);
catalan[0] = catalan[1] = 1;
for(int i = 2;i<11;i++){
    catalan[i] = 2*(2*i-1)*catalan[i-1]/(i+1);
}
int n;cin>>n;
cout<<catalan[n]<<"\n";
while(cin>>n){
cout<<"\n"<<catalan[n]<<endl;
}
return 0;
}

```

