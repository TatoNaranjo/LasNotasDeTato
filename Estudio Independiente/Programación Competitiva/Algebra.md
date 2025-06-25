---
date: 2024-06-06
tags:
  - Problem-Solving
  - Matemáticas
  - Algoritmos
  - Programación-Competitiva
---

Componentes de Algebra necesarios o utilizados para [[Programación Competitiva]]

# Exponenciación Binaria

La exponenciación binaria nos permite calcular $a^n$ usando multiplicaciones en un tiempo de $O(log_n)$ en vez de las multiplicaciones tradicionales del $O(n)$

## Implementación
### Implementación recursiva

```cpp
long long binpow(long long a, long long b) { 
	if (b == 0) 
		return 1; 
	long long res = binpow(a, b / 2); 
	if (b % 2) 
		return res * res * a; 
	else 
		return res * res; 
}
```
### Implementación sin recursividad

```cpp
long long binpow(long long a, long long b) { 
	long long res = 1; 
	while (b > 0) { 
		if (b & 1) 
			res = res * a; 
		a = a * a; 
		b >>= 1; 
	} 
		return res; }
```

## Aplicaciones 
- Computación efectiva de largos exponentes módulos de un número
- Computación efectiva de los números de fibonnacci.
- Aplicar una permutación K veces
	- **Problema:** Te dan una secuencia de longitud n. Aplícale una permutación dada K veces.
	- **Solución:** Simplemente eleva la permutación a la potencia de $k$ usando exponenciación binaria y luego aplícala a la secuencia para obtener un tiempo de $O(n*log_k)$
	

```cpp
vector<int> applyPermutation(vector<int> sequence, vector<int> permutation) { 

vector<int> newSequence(sequence.size()); 
	for(int i = 0; i < sequence.size(); i++) { 
		newSequence[i] = sequence[permutation[i]]; 
	} 
	return newSequence; 
} 

vector<int> permute(vector<int> sequence, vector<int> permutation, long long k) { 

	while (k > 0) { 
		if (k & 1) { 
		sequence = applyPermutation(sequence, permutation); 
		} 
		permutation = applyPermutation(permutation, permutation); 
		k >>= 1; 
	} 
		return sequence; 
}
```
