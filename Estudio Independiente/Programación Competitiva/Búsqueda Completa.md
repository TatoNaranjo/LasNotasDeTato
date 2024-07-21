Enfoque de [[Programación Competitiva]] utilizado comúnmente como la primera idea que tenemos para resolver problemas.

>***Nota de Tato:*** Es como usar un enfoque de Programación Dinámica pero sin optimizar, así que puedes verlo como que... si el ejercicio te da el tiempo suficiente solo tienes que intentar hacer todas las combinaciones posibles y agarrar la mejor solución sobre la marcha.

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

## Generando Subsets
Una forma elegante de ir a través de todos los subsets de un set es usar la recursión. La siguiente función `search` genera todos los subsets del set {$0,1,...,n-1$}. La función mantiene un vector `subset` que va a contener los elementos de cada subset. La búsqueda inicia cuando la función se llama con el parámetro 0.


```cpp
void search (int k){
	if (k==n){
	// Procesa el Subset
	} else {
	search(k+1);
	subset.push_back(k);
	search(k+1);
	subset.pop_back();
	}

}
```

Cuando la función `search` se llama con un parámetro $k$, este decide si incluir el elemento $k$ dentro del subset o no, y en ambos casos, luego se llama a si mismo con el parámetro $k+1$. De igual forma si $k = n$, la función nota que todos los elementos han sido procesados y un nuevo subset ha sido generado.

El siguiente árbol ilustra los llamados de la función cuando $n = 3$. Siempre podremos escoger entre la rama izquierda (en donde $k$ no se incluye en el subset) o la rama derecha (en donde $k$ se incluye dentro del subset).

![[subsetTreeExample.png.png]]

## Recursos Útiles y Ejercicios

- [USACO Basic Complete Search Course](https://usaco.guide/bronze/intro-complete)
- [Competitive Programmer's Handbook - Chapter 5](https://usaco.guide/CPH.pdf)
