---
date: 2025-02-19
tags:
  - OctavoSemestre
---
En este taller se conocerán las reglas para cambiar formulas matemáticas a expresiones validas para la gestión de informacion, a demás de diferenciar constantes e identificadores y tipos de datos simples para utilizarlos lógicamente dentro de una sentencia de consulta.

## Contenidos:

1. Tipos de datos
2. Expresiones
3. Operadores y operándoos.

## Objetivos Específicos:

- Identificar los tipos de datos
- Identificar como se componen las expresiones.
- Aplicar y Diferenciar los operadores y operándoos de acuerdo a sus prioridades de jerarquía.

## Actividades de Aprendizaje

1. **En un aula con computadores consulte por Internet el significado de los siguientes términos y de tres ejemplos de cada uno de ellos en un contexto de trabajo en base de datos.**

**Datos Simples**

1. **Numéricos:** Representan valores numéricos.
• **Ejemplo 1:** Precio de un producto en una tienda (DECIMAL(10,2))
• **Ejemplo 2:** Edad de un cliente en un registro (INT)
• **Ejemplo 3:** Saldo en la cuenta de un usuario (FLOAT)

2. **Lógicos (Booleanos):** Representan valores de verdad (TRUE o FALSE).

• **Ejemplo 1:** Estado de pago de una factura (BOOLEAN)
• **Ejemplo 2:** Si un usuario tiene acceso a un módulo (BIT(1))
• **Ejemplo 3:** Disponibilidad de un producto en stock (BOOLEAN)

3. **Alfanuméricos (String):** Representan texto o caracteres.

• **Ejemplo 1:** Nombre de un cliente (VARCHAR(255))
• **Ejemplo 2:** Dirección de correo electrónico (VARCHAR(100))
• **Ejemplo 3:** Código de producto en inventario (CHAR(10))

**Datos Estructurados (Definidos por el usuario)**

1. **Arreglos (Vectores, Matrices):** Estructuras de datos que almacenan múltiples valores.

• **Ejemplo 1:** Lista de categorías asignadas a un producto en un e-commerce (ARRAY en PostgreSQL)
• **Ejemplo 2:** Historial de calificaciones de un estudiante (JSON ARRAY)
• **Ejemplo 3:** Coordenadas de ubicación de sucursales en un sistema geoespacial (ARRAY de FLOAT)

2. **Registros:** Conjuntos de datos organizados en filas dentro de una base de datos.

• **Ejemplo 1:** Registro de empleados con nombre, cargo y salario
• **Ejemplo 2:** Registro de ventas con fecha, producto y cantidad.
• **Ejemplo 3:** Registro de clientes con su historial de compras.

3. **Archivos:** Almacenan datos de manera estructurada dentro de un sistema de archivos o en la base de datos.

• **Ejemplo 1:** Archivos CSV con información de clientes importados.
• **Ejemplo 2:** Documentos PDF almacenados en la base de datos (BLOB).
• **Ejemplo 3:** Respaldo de datos en archivos JSON para migración de sistemas.

4. **Apuntadores:** Referencias a ubicaciones de memoria o datos en la base de datos.

• **Ejemplo 1:** Claves foráneas en bases de datos relacionales (FOREIGN KEY).
• **Ejemplo 2:** Índices que mejoran la búsqueda en bases de datos (INDEX en SQL).
• **Ejemplo 3:** Punteros a bloques de datos en sistemas de almacenamiento distribuido.

---
2. **Defina que es una expresión matemática y como se compone, elabore 10 ejemplos de diferentes expresiones**

Una **expresión matemática** es una combinación de números, variables, operadores y funciones que representan un valor o una relación entre cantidades. No necesariamente incluye un signo de igualdad, ya que una **ecuación** es una expresión matemática con un signo igual.

**10 Ejemplos de Expresiones Matemáticas**

1. **Expresión algebraica simple:**
$x + 3$  

(Suma de una variable y una constante).

2. **Expresión con multiplicación y suma:**

$4x - 2y + 7$

(Combina suma, resta y variables).

3. **Expresión con exponentes:**

x^2 + 3x + 5

(Ecuación cuadrática sin igualdad).

4. **Expresión con fracciones:**
$\frac{3x + 2}{5}$

(Fracción algebraica).

5. **Expresión con raíces:**

$\sqrt{x} + 2$

(Raíz cuadrada más un número).

6. **Expresión trigonométrica:**

$\sin(x) + \cos(y)$

(Suma de funciones trigonométricas).

7. **Expresión con logaritmos:**

$\log(x) + 2$

(Logaritmo en base 10 más una constante).

8. **Expresión exponencial:**

$2^x + e^x$

(Combinación de potencias y la base de Euler).

9. **Expresión con producto de términos algebraicos:**  

$(x + 2)(x - 3)$

(Multiplicación de dos binomios).

10. **Expresión con sumatoria:**

$\sum_{n=1}^{10} n^2$

---
**4. ¿Cuántos y cuáles son los operadores aritméticos?**

Los **operadores aritméticos** son aquellos que permiten realizar operaciones matemáticas básicas sobre números y variables. Hay **cinco operadores aritméticos principales**:

1. **Suma (+)** → Adiciona dos números.

• Ejemplo:  5 + 3 = 8 

1. **Resta (-)** → Sustrae un número de otro.

• Ejemplo:  10 - 4 = 6 

1. _Multiplicación ( o ·)_* → Multiplica dos valores.

• Ejemplo:  $6 \times 3 = 18$

1. **División (/ o ÷)** → Divide un número entre otro.

• Ejemplo:  $20 \div 4 = 5$

1. **Exponente (^ o **)** → Eleva un número a una potencia.

• Ejemplo:  $2^3 = 8$ 

Algunos lenguajes de programación también incluyen operadores como el **módulo (%)**, que devuelve el residuo de una división:

• Ejemplo:  $10 \mod 3 = 1$

---
**5. ¿Cuál es la prioridad de los operadores aritméticos?**

La prioridad de los operadores determina el **orden en que se resuelven las operaciones** en una expresión matemática. Se sigue la regla **PEMDAS** (por sus siglas en inglés) o **jerarquía de operaciones**:

1. **Paréntesis** → Se resuelven primero:  ( ) ,  [ ] ,  \{ \} .

2. **Exponentes** → Potencias y raíces: $x^y ,  \sqrt{x} .$

3. **Multiplicación y División** → Se resuelven de izquierda a derecha:  $\times, \div.$

4. **Suma y Resta** → Se resuelven de izquierda a derecha:  +, - .

--- 
6. **Resuelva paso por paso los siguientes ejercicios**:

$4+2*5=14$
$23 * 2 / 5 =5$

---
**7. ¿Cuántos y cuáles son los operadores relacionales?**


Los **operadores relacionales** comparan dos valores y devuelven un resultado **booleano** (_true_ o _false_). En total, hay **seis operadores relacionales**:

1. **Mayor que (>)** → Verifica si un valor es mayor que otro.

• Ejemplo:  10 > 5  → **Verdadero**

1. **Menor que (<)** → Verifica si un valor es menor que otro.

• Ejemplo:  3 < 8  → **Verdadero**

1. **Mayor o igual que (≥)** → Comprueba si un valor es mayor o igual a otro.

• Ejemplo:  $5 \geq 5$  → **Verdadero**

1. **Menor o igual que (≤)** → Comprueba si un valor es menor o igual a otro.

• Ejemplo:  $7 \leq 10$  → **Verdadero**

1. **Igual a (==)** → Comprueba si dos valores son iguales.

• Ejemplo:  4 == 4  → **Verdadero**

1. **Diferente de (!= o <>)** → Verifica si dos valores son distintos.

• Ejemplo:  $6 \neq 3$  → **Verdadero**

---
**8. ¿Cuál es la prioridad de los operadores relacionales?**

En la jerarquía de operaciones, los operadores relacionales tienen **menor prioridad que los operadores aritméticos** pero **mayor prioridad que los operadores lógicos**.  

El orden de prioridad es el siguiente:

1. **Paréntesis** → Se resuelven primero: ().

2. **Aritméticos** → *, /, %, +, -.

3. **Relacionales** → <, >, <=, >=, ==, !=.

4. **Lógicos** → AND, OR, NOT.

Ejemplo:
5 + 3 > 6 - 2


1. Se resuelven las operaciones aritméticas:

• 5 + 3 = 8 

• 6 - 2 = 4 

2. Se evalúa la comparación:

• 8 > 4  → **Verdadero**

---
**9. Resolviendo los ejercicios de operadores relacionales:**

Dado que:
• **a = 10**, **b = 20**, **c = 30**

**Expresión** **Resultado**

a + b > c 10 + 20 > 30  → **Falso**
a - b < c 10 - 20 < 30  → **Verdadero**
a - b = c 10 - 20 = 30  → **Falso**
a * b <> c 10 * 20 $\neq$ 30  → **Verdadero**

---
**10. ¿Cuántos y cuáles son los operadores lógicos?**

Los **operadores lógicos** permiten evaluar múltiples condiciones booleanas al mismo tiempo. Hay **tres operadores principales**:

1. **AND (&& o ∧)** → Devuelve true solo si **ambos** operandos son true.

• Ejemplo: (5 > 3) AND (10 < 20) → **Verdadero**

1. **OR (|| o ∨)** → Devuelve true si **al menos uno** de los operandos es true.

• Ejemplo: (5 > 3) OR (10 > 20) → **Verdadero**

1. **NOT (! o ¬)** → Invierte el valor lógico.

• Ejemplo: NOT (5 > 3) → **Falso**

---
**11. ¿Cuál es la prioridad de los operadores lógicos?**

La jerarquía de prioridad es la siguiente:

1. **NOT (!)** → Se evalúa primero.
2. **AND (&&)** → Se evalúa después.
3. **OR (||)** → Se evalúa al final.


Ejemplo:
$\text{TRUE OR FALSE AND TRUE}$
1. **AND** se evalúa primero:

• FALSE AND TRUE = FALSE

2. **OR** se evalúa después:

• TRUE OR FALSE = TRUE
**Resultado final: TRUE**

---

**12. Resolviendo los ejercicios de operadores lógicos:**

**Tabla de AND (&& o ∧):**

**Operando1** **Operador** **Operando2** **Resultado**
1 AND 0 0
1 AND 1 1
0 AND 0 0
0 AND 1 0

**Tabla de OR (|| o ∨):**

**Operando1** **Operador** **Operando2** **Resultado**
1 OR 0 1
1 OR 1 1
0 OR 0 0
0 OR 1 1

---
**13. ¿Cuál es la jerarquía de los operadores en general?**


El orden de prioridad de los operadores en general es el siguiente:

1. **Paréntesis ( )** → Se evalúan primero.

2. **Operadores aritméticos:**

• *, /, % → Multiplicación, división y módulo.

• +, - → Suma y resta.

3. **Operadores relacionales:**

• <, >, <=, >=, ==, !=

4. **Operadores lógicos:**

• NOT (!) → Se evalúa primero entre los lógicos.

• AND (&&) → Se evalúa después.

• OR (||) → Se evalúa al final.

---
**14. Resolviendo los ejercicios de operadores lógicos y relacionales**

**Valores dados:**

• a = 10
• b = 12
• c = 13
• d = 10

**Ejercicio 1**

$((a > b) \text{ OR } (a < c)) \text{ AND } ((a = c) \text{ OR } (a \geq b))$

1. **Evaluamos dentro de los paréntesis:**

• (a > b) → (10 > 12) → FALSO
• (a < c) → (10 < 13) → VERDADERO
• (a = c) → (10 = 13) → FALSO
• (a >= b) → (10 >= 12) → FALSO

2. **Evaluamos los OR dentro de los paréntesis:**

• (FALSO OR VERDADERO) → VERDADERO
• (FALSO OR FALSO) → FALSO

3. **Evaluamos el AND final:**

• VERDADERO AND FALSO → FALSO

**Resultado: FALSO**


**Ejercicio 2**
  
$((a \geq b) \text{ OR } (a < d)) \text{ AND } ((a \geq d) \text{ AND } (c > d))$

1. **Evaluamos dentro de los paréntesis:**

• (a >= b) → (10 >= 12) → FALSO

• (a < d) → (10 < 10) → FALSO

• (a >= d) → (10 >= 10) → VERDADERO

• (c > d) → (13 > 10) → VERDADERO

2. **Evaluamos los OR y AND dentro de los paréntesis:**

• (FALSO OR FALSO) → FALSO

• (VERDADERO AND VERDADERO) → VERDADERO

3. **Evaluamos el AND final:**

• FALSO AND VERDADERO → FALSO

**Resultado: FALSO**



**Ejercicio 3**

$\text{NOT }(a = c) \text{ AND } (c > b)$


1. **Evaluamos dentro de los paréntesis:**

• (a = c) → (10 = 13) → FALSO

• (c > b) → (13 > 12) → VERDADERO

2. **Aplicamos NOT:**

• NOT (FALSO) → VERDADERO

3. **Evaluamos el AND final:**

• VERDADERO AND VERDADERO → VERDADERO

**Resultado: VERDADERO**