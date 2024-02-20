Segunda clase de las [[Sesiones de estudio de UdeC]].
***Por:*** *Santiago Naranjo Herrera ([TatoNaranjo](https://codeforces.com/profile/TatoNaranjo)) && Felipe Salamanca ([FelipeOP](https://codeforces.com/profile/FelipeOP))*
***Lenguaje Utilizado en los Ejemplos:*** *C++*

***Índice***
```table-of-contents
```


# Estructuras Básicas

Una *Estructura de Datos* es una forma de almacenar datos en la memoria de un computador. Para nosotros es importante escoger una estructura adecuada para un problema, porque cada estructura de datos tiene sus propias ventajas y sus propias desventajas. La pregunta crucial es: 

>Qué tipo de operaciones son más eficientes en las estructuras de datos elegida?

Este documento hace una introducción a las estructuras más importantes de la librería estándar de C++. Siempre es buena idea usar la librería estándar de c++ cuando sea posible, ya que nos va a ahorrar un montón de tiempo.

## Iteradores y Rangos

Algunas funciones en la librería estándar en C++ operan por medio de iteradores. Un *Iterador* es una variable que apunta a un elemento en una estructura de datos.

Los iteradores más usados comúnmente, `begin` y `end` definen un rango que contiene todos los elementos en una estructura de datos. El iterador `begin` apunta al primer elemento de la estructura de datos, y el iterador `end` apunta a la posición que está *después* del último elemento. La situación se puede representar de esta forma:

```
{ 3, 4, 6, 8, 12, 13, 14, 17  }
  ^                          ^
  |                          |
s.begin();                s.end();
```

### Trabajar Con Rangos

Los iteradores se utilizan en funciones de la biblioteca estándar de C++ a las que se les da un rango de elementos de una estructura de datos. Por lo general, queremos procesar todos los elementos de una estructura de datos, por lo que los iteradores ``begin`` y ``end`` se dan para la función. por lo que los iteradores begin y end se dan para la función.

Por ejemplo, el siguiente código ordena un vector utilizando la función ``sort``, luego
invierte el orden de los elementos mediante la función`` reverse``, y finalmente baraja
el orden de los elementos mediante la función ``random_shuffle``.

```cpp
sort(v.begin(), v.end()); 
reverse(v.begin(), v.end()); 
random_shuffle(v.begin(), v.end());
```

## Arreglos Dinámicos

> La forma más sencilla de almacenar los elementos que te pide un problema.

```cpp
vector<TipoDeDato>vector(Tamaño);
```

Un *Arreglo Dinámico* es un arreglo cuyo tamaño puede cambiar durante la ejecución del programa. El arreglo dinámico más popular en C++ es la estructura `vector`, que puede ser usada como un arreglo ordinario.

### Crear un Arreglo Dinámico

El siguiente código crear un vector vacío y añade tres elementos a el:

```cpp
vector<int>v;
v.push_back(3); // [3]
v.push_back(2); // [3,2]
v.push_back(5); // [3,2,5]
```

### Acceder a los elementos de un Arreglo Dinámico
Después de esto, podemos acceder a los elementos como en un arreglo ordinario:

```cpp
cout << v[0] << "\n"; // 3 
cout << v[1] << "\n"; // 2 
cout << v[2] << "\n"; // 5
```

La función `size` retorna el numero de elementos en el vector. El siguiente código itera a través del vector e imprime todos los elementos en el:
```cpp
for (int i = 0; i < v.size(); i++) { 
	cout << v[i] << "\n"; 
}
```

Una forma más corta de iterar a través de un vector puede ser usar un `for each` en este tipo:

```cpp
for (auto x : v) {
cout << x << "\n";
}
```

### Crear un vector con Tamaño Asignado

Otra forma de crear un vector es darle un numero de elementos en el valor inicial para cada elemento:

```cpp
// Tamaño 10, Todos los elementos inician en 0 
vector v(10);
```

```cpp
// Tamaño 10, Todos los elementos inician en 5 
vector v(10, 5);
```


## Estructura Set

> Usado a la hora de almacenar elementos sin que ninguno se repita.

Un `set` es una estructura de datos que mantiene una colección de elementos. 
*Las operaciones básicas de un set implican la inserción, la búsqueda y la eliminación de un elemento*.

La librería básica de c++ utiliza dos implementaciones de un set:

- La estructura `set` se basa en un arbol binario y sus operaciones trabajan en un tiempo $O(log_n)$. 

> ***¿Por qué pasa esto?***
> Porque todos los elementos que vas insertando, se van organizando de forma ascendente. De esta forma las operaciones se hacen más eficientes.

- La estructura `unordered_set` usa hashing, y sus operaciones trabajan en un tiempo $O(1)$.

> ***¿Qué Cambia?***
> Los elementos que vas insertando, mantienen el orden en el que van llegando, no se organizan.

### ¿Cuándo uso un Set y Cuando uso un Unordered Set?

La elección sobre cual implementación usar es cuestión de gustos. El beneficio de la estructura `set` es que mantiene un orden en los elementos y provee funciones que no están disponibles en un `unordered_set`. Por el otro lado, un `unordered_set` puede ser más eficiente.

### Implementación

```cpp
set s; 
s.insert(3); 
s.insert(2); 
s.insert(5); 
cout << s.count(3) << "\n"; // 1 
cout << s.count(4) << "\n"; // 0 
s.erase(3); 
s.insert(4); 
cout << s.count(3) << "\n"; // 0 
cout << s.count(4) << "\n"; // 1
```
 
### Propiedades
***Un Set puede ser usado casi como un vector, sin embargo no es posible acceder a los elementos usando la notación []. El siguiente código crea un set, imprime el número de elementos en el, y luego itera a través de todos los elementos:***

```cpp
set s = {2,5,6,8}; 
cout << s.size() << "\n"; // 4 
for (auto x : s) { 
cout << x << "\n";
}
```

***Todos los elementos en el set son distintos, por lo que si utilizamos una función `count` que nos retorna el numero de veces que existe un elemento $x$ en el set, solo podremos obtener un $1$ o un $0$***

```cpp
set s; 
s.insert(5); 
s.insert(5); 
s.insert(5); 
cout << s.count(5) << "\n"; // 1
```

### Iteradores
Los iteradores se usan de forma frecuente para acceder a elementos dentro de un set. El siguiente código utiliza un iterador `it` que apunta a el elemento más pequeño en un set:

```cpp
set::iterator it = s.begin();
```

Una forma más corta de escribir el código se reduce en:

```cpp
auto it = s.begin();
```

Podemos acceder al elemento al que un iterador apunta usando el símbolo `*`. Por ejemplo, el siguiente código imprime el primer elemento en el set:

```cpp
auto it = s.begin(); 
cout << *it << "\n";
```

Los iteradores se pueden mover usando los operadores `++` (Hacia adelante) y `--` (Hacia Atrás). Significa que el iterador se mueve al siguiente elemento o al anterior elemento dentro del set.

El siguiente código imprime todos los elementos de forma ascendente.

```cpp
for (auto it = s.begin(); it != s.end(); it++)
{ 
	cout << *it << "\n"; 
}
```
## Estructura Map

Un `map` es un arreglo generalizado que consiste en Valores de Pares de tipo *Clave-Valor*. 

Mientras que una clave en un arreglo normal siempre son enteros consecutivos $0,1, ..., n-1$, donde $n$ es el tamaño del arreglo, las clave en un mapa pueden ser de cualquier tipo de datos que no tienen que ser necesariamente consecutivos.

El siguiente código crea un mapa donde las claves son `strings` y los valores son enteros:


```cpp
map m; m["monkey"] = 4;
m["banana"] = 3; 
m["harpsichord"] = 9; 
cout << m["banana"] << "\n"; // 3
```

Si se pide un valor de una clave que no existe en un mapa, la clave se añade automáticamente al mapa con un valor por defecto. Por ejemplo, en el siguiente código la clave `aybabtu` con un valor de 0 es añadido al mapa:

```cpp
map m; 
cout << m["aybabtu"] << "\n"; // 0
```

La función `count` revisa si una clave existe en un mapa:

```cpp
if (m.count("aybabtu")) { 
// La clave existe
}
```

El siguiente código imprime todos los pares tipo *Clave-Valor* de un mapa:

```cpp
for (auto x : m) { 
cout << x.first << " " << x.second << "\n"; 
}
```

# Otras Estructuras

## Cola Doblemente Enlazada(Deque)

Un *Deque* es un arreglo dinámico cuyo tamaño puede cambiar por ambos lados del arreglo. Como un `vector`, un *deque* contiene las funciones `push_back` y `pop_back`, pero también incluye las funciones `push_front` y `pop_front` que no están disponibles en un vector.

Un *Deque* puede ser usado de la siguiente forma:

```cpp
deque d; 
d.push_back(5); // [5] 
d.push_back(2); // [5,2] 
d.push_front(3); // [3,5,2] 
d.pop_back(); // [3,5] 
d.pop_front(); // [5]
```

La implementación interna de un deque es más compleja que la de un vector, y por esta razón, un deque es mas lento que un vector. De igual forma, añadir y remover elementos sigue tomando un tiempo de $O(1)$ de promedio en ambos casos.
## Pila (Stack)

Un *Stack* es una estructura de datos que provee dos operaciones de tipo $0(1)$: Añadir un elemento en la parte superior, y eliminar un elemento de la parte superior. Solo es posible acceder a un elemento superior de un Stack.

El siguiente código muestra como se puede usar un *stack*.

```cpp
stack s; 
s.push(3); 
s.push(2); 
s.push(5); 
cout << s.top(); // 5 
s.pop(); 
cout << s.top(); // 2
```


## Cola (Queue) 
Una *Cola* también provee dos operaciones en un tiempo $0(1)$: Añadir un elemento al final de la cola, y remover el primer elemento de la cola. Solo es posible acceder al primer y al ultimo elemento de una cola. 

El siguiente código muestra como puede usarse una *queue*:

```cpp
queue q; 
q.push(3); 
q.push(2); 
q.push(5); 
cout << q.front(); // 3 
q.pop(); 
cout << q.front(); // 2
```

## Cola de Prioridad (Priority Queue)
Una *cola de prioridad* mantiene un set de elementos. Las operaciones soportadas son la inserción, y dependiendo del tipo de cola, la obtención o eliminación del elemento mayor o menor de la cola. El tiempo de inserción y eliminación toma $O(log_n)$ ciclos, y el tiempo de obtención es de $O(1)$.

Mientras que un set ordenado soporta de manera eficiente todas las operaciones de una cola de prioridad, el beneficio de usar una cola de prioridad radica en que tiene factores constantes más pequeños. Una cola de prioridad se implementa normalmente en una estructura heap, que es mucho más sencilla que un arbol binario balanceado de un set ordenado.

Por defecto, los elementos en una cola de prioridad en C++ están organizados de manera decreciente, y es posible encontrar y eliminar el número más grande en la cola. El siguiente código lo ilustra de una forma más clara:

```cpp
priority_queue q; 
q.push(3); 
q.push(5); 
q.push(7); 
q.push(2); 
cout << q.top() << "\n"; // 7 
q.pop(); cout << q.top() << "\n"; // 5 
q.pop(); q.push(6); cout << q.top() << "\n"; // 6 
q.pop();
```

Si queremos crear una cola de prioridad que soporte encontrar y eliminar el elemento más pequeño podemos hacerlo de la siguiente forma:

```cpp
priority_queue,greater> q;
```

# Recursos
- [Competitive Programmer's Handbook - Inglés](https://usaco.guide/CPH.pdf)
