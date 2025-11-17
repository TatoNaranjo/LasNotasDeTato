---
date: 2025-10-03
tags:
  - IA
  - FundamentosIA
  - LógicaDifusa
  - SistemasExpertos
---
## El Proceso de Inferencia Global

El Motor de Inferencia es el **núcleo** del sistema de lógica difusa y simula el proceso de decisión humano. Su función es tomar los antecedentes (variables difusas de entrada) y, aplicando la Base de Reglas, generar los consecuentes (variables difusas de salida).

1.  **Entrada (*Crisp*):** Valor numérico exacto (Ej: 25°C).
2.  **[[Fuzzificación]]:** Conversión de valor *crisp* a **Variable Lingüística/Difusa** (Ej: "Temperatura Alta" con grado de membresía 0.8).
3.  **Motor de Inferencia (Aplicación de Reglas):** Evalúa las reglas SI-ENTONCES.
4.  **[[Defusificación]]:** Conversión final de la Variable Difusa de Salida a un **Valor *Crisp* de Acción** (Ej: Velocidad del ventilador = 1200 RPM).

---

## Componentes Clave del Motor

| Componente | Definición | Uso en el Motor de Inferencia |
| :--- | :--- | :--- |
| **Antecedentes** | Variables lingüísticas de **entrada** (lo que conozco del sistema, Ej: Temperatura, Humedad). | Se usan con sus grados de membresía para activar las reglas. |
| **Reglas (Base de Conocimiento)** | Sentencias **SI-ENTONCES** que definen el comportamiento del sistema. | Relacionan Antecedentes con Consecuentes. Utilizan **Operadores Lógicos Difusos** (T-Normas y T-Conormas). |
| **Operadores Lógicos** | Versiones difusas de los operadores lógicos clásicos: **AND (Mínimo)**, **OR (Máximo)**, **NOT (Complemento)**. | Se usan en la parte "SI" (antecedente) para combinar múltiples entradas. |
| **Consecuentes** | Variables lingüísticas de **salida** (la acción a tomar, Ej: Velocidad del Ventilador). | Es el resultado difuso de la inferencia, antes de la defusificación. |

---

## Tipos de Sistemas de Inferencia

Los sistemas se clasifican según la estructura de sus **consecuentes** y su salida final:

### 🚀 A. Sistema Tipo **Mamdani** (Enfoque del Curso)
* **Consecuente:** Es un **Conjunto Difuso** (Ej: *ENTONCES la Velocidad es ALTA*).
* **Ventaja:** Proporciona un modelo de **control más intuitivo** y es fácil de entender para operadores humanos.
* **Desventaja:** Requiere la etapa final de **Defusificación**, que es computacionalmente más pesada.

### 💨 B. Sistema Tipo **Sugeno** (o Takagi-Sugeno-Kang)
* **Consecuente:** Es una **Función Matemática** o un **Valor Escalar** (Ej: *ENTONCES la Velocidad es f(x, y)* o *ENTONCES la Velocidad es 5*).
* **Ventaja:** **Más eficiente** y sencillo de trabajar, ya que la salida es casi *crisp* o una función lineal, simplificando o eliminando la defusificación.
* **Desventaja:** Menos intuitivo en su base de reglas para la comprensión humana.

---

## El Proceso de Defusificación (Método Centroide)

La Defusificación es el proceso final para convertir el **Conjunto Difuso de Salida Agregado** (el resultado de todas las reglas) en un único valor numérico (*crisp*) que pueda ser utilizado por un actuador (como un motor o un sistema de control).

### Método Común: **Centro de Gravedad (Centroide)**

* **Principio:** El valor *crisp* de salida ($z^*$) se calcula como el **centroide** (o centro de masa) del área total bajo la curva del conjunto difuso de salida agregado ($\mu_{C'}(z)$).
* **Fórmula (Discreta, la usada en implementación):**
    $$ z^* = \frac{\sum_{i=1}^{n} \mu_{C'}(z_i) \cdot z_i}{\sum_{i=1}^{n} \mu_{C'}(z_i)} $$
    * *z\_i*: Valores de la variable de salida.
    * *$\mu_{C'}(z_i)$*: Grado de pertenencia del valor $z_i$ al conjunto difuso agregado.
* **Función:** Este método es preferido en control por su **continuidad** y por considerar toda el área de los consecuentes activados.