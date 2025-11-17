---
date: 2025-10-07
---
Queremos **optimizar el uso de un área total disponible** $A_T$ distribuyéndola entre diferentes elementos o componentes $i = 1, 2, ..., n$, cada uno con sus dimensiones, costos y beneficios asociados.

> [!Success] Objetivo Principal
> **Maximizar la rentabilidad total o minimizar el costo por unidad de área**, sujeto a restricciones de espacio y cantidad.

---

| Símbolo | Descripción | Tipo |
|----------|--------------|------|
| $n$ | Número de tipos de elementos (por ejemplo, piezas, parcelas, productos, etc.) | Entero |
| $x_i$ | Cantidad del elemento $i$ | Entero |
| $l_i, w_i$ | Largo y ancho del elemento $i$ | Real |
| $A_i = l_i \times w_i$ | Área ocupada por un elemento $i$ | Real |
| $C_i$ | Costo de un elemento $i$ | Real |
| $B_i$ | Beneficio generado por un elemento $i$ | Real |
| $A_T$ | Área total disponible | Constante |
| $P_i$ | Precio de venta o utilidad esperada por elemento $i$ | Real |

---

## Función objetivo

Dependiendo del enfoque, se pueden tener varios objetivos.  

### Maximizar la rentabilidad total
$$
\text{Maximizar } f(x) = \sum_{i=1}^{n} (B_i - C_i) \cdot x_i
$$

Donde:
- $B_i - C_i$ representa la utilidad neta por unidad.
- El algoritmo puede buscar la combinación $x_i$ que maximice las ganancias **sin pasarse del área disponible**.

---

### Minimizar el costo por área ocupada
$$
\text{Minimizar } f(x) = \frac{\sum_{i=1}^{n} C_i \cdot x_i}{\sum_{i=1}^{n} A_i \cdot x_i}
$$

Esto busca configuraciones más **eficientes en costo por metro cuadrado**.

---

## Restricciones

Estas condiciones deben cumplirse siempre (se usan dentro del algoritmo genético para filtrar o penalizar individuos):

1. **Restricción de área total:**
   $$
   \sum_{i=1}^{n} A_i \cdot x_i \leq A_T
   $$

2. **Restricciones de cantidad mínima/máxima (si aplica):**
   $$
   x_i^{\text{min}} \leq x_i \leq x_i^{\text{max}}, \quad \forall i
   $$

3. **Restricción de dimensiones máximas (si el área tiene forma rectangular o cuadrada):**
   $$
   l_i \leq L_{\text{máx}}, \quad w_i \leq W_{\text{máx}}
   $$

4. **Restricción de presupuesto total:**
   $$
   \sum_{i=1}^{n} C_i \cdot x_i \leq C_{\text{máx}}
   $$

5. **Restricción de proporción:**
   $$
   \frac{x_i}{\sum x_i} \geq p_i^{\text{min}}
   $$
   (Ejemplo: al menos el 20 % del área debe ser del tipo 1)

---

## Rentabilidad global

La **rentabilidad total** del conjunto elegido se puede medir como:

$$
R = \frac{\sum_{i=1}^{n} (B_i - C_i) \cdot x_i}{\sum_{i=1}^{n} C_i \cdot x_i}
$$

Si $R > 1$, el sistema es rentable (beneficio mayor que el costo).  
El algoritmo podría **maximizar directamente $R$** o **usar $R$ como métrica secundaria** para seleccionar soluciones.

---

## Representación cromosómica 

Cada individuo (cromosoma) puede representarse como un vector:

$$
X = [x_1, x_2, ..., x_n]
$$

donde cada gen $x_i$ indica la **cantidad** del elemento $i$.  
En caso de que las dimensiones sean variables evolutivas se puede extender a:
$$
X = [(x_1, l_1, w_1), (x_2, l_2, w_2), ..., (x_n, l_n, w_n)]
$$


---

## Penalización por violaciones

Cuando una solución exceda las restricciones, se puede penalizar:
$$
f'(x) = f(x) - \alpha \cdot \text{penalización}
$$

Por ejemplo:
$$
\text{penalización} = 
\begin{cases}
0, & \text{si todas las restricciones se cumplen} \\
\beta_1 \cdot (\text{Área excedida}) + \beta_2 \cdot (\text{Costo excedido}), & \text{caso contrario}
\end{cases}
$$

Esto mantiene la **presión evolutiva** hacia soluciones válidas.

---

## Ejemplo:

Supongamos:
- Área total $A_T = 1000$
- 3 tipos de elementos (Televisores, Colchones, Estufas)
- Datos:

| i         | $A_i$ | $C_i$ | $B_i$ | $x_i^{min}$ | $x_i^{max}$ |
| --------- | ----- | ----- | ----- | ----------- | ----------- |
| Televisor | 50    | 200   | 300   | 0           | 10          |
| Colchón   | 80    | 250   | 400   | 0           | 8           |
| Estufa    | 100   | 400   | 550   | 0           | 5           |

El algoritmo genético buscaría los $x_i$ que:
- No excedan $A_T = 1000$
- Maximicen $f(x) = \sum (B_i - C_i) x_i$
- Cumplan con las demás restricciones.