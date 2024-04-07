Los conceptos fundamentales para entender los temas de [[Combinatoria]]

## Qué es Combinatoria?
La combinatoria es una rama de las matemáticas que se encarga de *contar*, *ordenar* y *analizar* objetos y estructuras discretas. Su labor es estudiar las diferentes formas de *Seleccionar*, *Organizar* y *Combinar* elementos de secuencias o conjuntos finitos, a menudo asociados con el contexto de estructuras finitas y discretas.
## Reglas Básicas de la Combinatoria
### La regla de la suma
Si tenemos *A* formas de realizar una Tarea 1, y *B* formas de hacer una Tarea 2, entonces el número total de formas para escoger una de las tareas equivale a *A+B*.

Entonces, por lo general, si hay *N* tareas y la tarea número *i* se puede hacer en $a[i]$ formas, entonces hay $a_1+a_2+a_3...+a_n$ formas de hacer una de las tareas.

#### Ejemplo:

> Imagina que tienes 3 sombreros diferentes, 2 camisas diferentes y 4 pantalones diferentes. Si deseas donar cualquiera de los items, cuál sería el numero total de posibilidades que tienes para hacerlo?
> ***Respuesta***: 3+2+4 = 9

### La regla del producto
Si tenemos *A* formas de realizar una tarea 1, y *B* formas de hacer una Tarea 2, entonces el numero total de formas de hacer ambas tareas es igual a $A*B$

Entonces, por lo general si hay *N* tareas y la *i* tarea puede hacerse de $A[i]$ formas, entonces hay $a_1*,a_2*,a_3*$ formas en las que puedes hacer todas las tareas.
#### Ejemplo:

> Imagina que tienes 3 sombreros diferentes, 2 camisas diferentes y 4 pantalones diferentes. Quieres vestirte y para eso tienes que llevar 1 sombrero, 1 camisa y 1 pantalón. De cuantas formas puedes vestirte?
> ***Respuesta:*** $3* 2 * 4 = 24$

## Conceptos fundamentales en la Combinatoria
## Factorial
El factorial se usa principalmente para contar el número de permutaciones (Número de formas de organizar un objeto), puede ser usado para responder los siguientes tipos de preguntas:

>1. Una clase solo tiene 3 asientos disponibles. Tres personas, P, A y R llegan al mismo tiempo. De cuantas formas podemos organizar a P,A y R en esos 3 asientos disponibles?
>2. Encuentra el numero de formas de organizar 5 personas si 2 de ellas siempre se sientan juntas.
>3. Encuentra todas las palabras de 3 letras que empiecen y terminen con una vocal, dado que la repetición de letras no está permitida.

## Referencias 
- [Básicos de la permutación para programación competitiva](https://www.geeksforgeeks.org/basics-of-combinatorics-for-competitive-programming/)