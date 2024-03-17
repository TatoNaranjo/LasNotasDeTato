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
Hay dos formas para calcular los números 