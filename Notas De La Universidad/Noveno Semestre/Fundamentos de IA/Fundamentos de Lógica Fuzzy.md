---
date: 2025-09-19
---
En este caso nosotros ya no vamos a utilizar un modelo análogo para controlar un sistema, sino que vamos a utilizar un método que utilice controlador difuso, el cual garantiza que el sistema se acomode a la respuesta que el usuario necesite.

## Introducción

La lógica difusa es una extensión de la lógica tradicional (booleana) que utiliza conceptos de pertenencia de sets más parecidos a la manera de pensar humana. El concepto de un subset difuso fue introducido por Lofty A Zadeh en 1965 como una generalización de un subset exacto (crisp subset) tradicional, mediante la definición de grados de pertenencia. Los subset exactos usan lógica booleana con valores exactos como por ejemplo la lógica binaria que usa valores de 1 o 0 para comparaciones.

>[!Quote] Importante
La pertenencia de elementos dentro de un conjunto clásico están comprendidos por 0 o 1, mientras que en los conjuntos difusos se comprenden como cualquier valor entre 0 y 1. La lógica difusa puede representar sus elementos como elementos exactos, pero los elementos de una lógica exacta no pueden pertenecer a un conjunto difuso, pues sus valores siempre serán exactos. Las respuestas de un sistema difuso siempre serán imprecisas o aproximadas.

Vamos a emular un sistema de control inteligente basado en reglas. Estas reglas se componen de: **Antecedentes**, **Operadores Lógicos**, y **Consecuentes**. Los antecedentes son las variables linguísticas, los operadores lógicos serán esos modificadores que determinan el nivel de las variables linguísticas, y los consecuentes se describen como la salida del sistema.

Además se encontrarán reglas simples y reglas compuestas. Una regla simple solamente depende de un antecedente, y por lo tanto tiene solamente un consecuente. Una regla compuesta comprende a múltiples antecedentes, por lo tanto más operadores lógicos y múltiples consecuentes (Sistemas multi-input, multi-output). Todas las reglas que se le dan a un sistema se denominan como una base del conocimiento.

### Variables Lingüísticas

Para representar el conocimiento en razonamiento aproximado tenemos que utilizar variables lingüísticas. Una variable lingüística es aquella cuyos valores son palabras o sentencias en un lenguaje natural o artificial. De esta forma, una variable lingüística sirve para representar cualquier elemento que sea demasiado complejo, o del cual no tengamos una definición concreta; es decir, lo que no podemos describir en términos numéricos. Así, una variable lingüística está caracterizada por una quíntupla:

$$(X, T(X), U, G, M)$$ 

- $X$ es el nombre de la variable. 
- $T(X)$ es el conjunto de términos de $X$; es decir, la colección de sus valores lingüísticos (o etiquetas lingüísticas). 
- $U$ es el universo del discurso (o dominio subyacente). Por ejemplo, si la hablamos de temperatura “Cálida” o “Aproximadamente 25o ”, el dominio subyacente es un dominio numérico (los grados centígrados). 
- $G$ es una gramática libre de contexto mediante la que se generan los términos en $T(X)$, como podrían ser ”muy alto”, ”no muy bajo”.
- $M$ es una regla semántica que asocia a cada valor lingüístico de X su significado $M(X)$ ($M(X)$ denota un subconjunto difuso en $U$). 

Los símbolos terminales de las gramáticas incluyen: 
- Términos primarios: ”bajo”, ”alto”, ...
- Modificadores: ”Muy”, ”más”, ”menos”, ”cerca de”, ... 
- Conectores lógicos: Normalmente `NOT`, `AND` y `OR`.

### Ejemplo
Se considera a una persona como alta si mide más de 1.80m, pero de igua forma se considera a una persona como alta si mide 1.799999m. Esta consideración no existe en la lógica tradicional que utiliza demarcaciones estrictas para determinar pertenencia en conjuntos:

$A$ es el set clásico de personas altas $A$ $= {x|x>1.8}$

## Objetivo
Este CADI pretende introducir los sistemas difusos como una herramienta para su utilización en aplicaciones de control reales en ingeniería. Los sistemas difusos pueden usarse en muchos campos de la ingeniería, por ejemplo: Control de procesos, modelado no lineal, procesamiento de imágenes, comunicaciones, problemas de optimización o sistemas para la toma de decisiones.
## Conceptos y Definiciones Básicas

Un sistema difuso está conformado por tres bloques principales, como se muestra en la imagen:

1. Transformación de los valores numéricos en valores linguísticos.
2. Motor de inferencia que emplea las reglas.
3. Conversión de los valores linguísticos y los valores numéricos.
## Conjuntos Difusos y Funciones de Membresía
## Operaciones sobre Conjuntos Difusos
## Inferencia usando Lógica Difusa
## Aplicación  Sistema Difuso como Controlador
## Conclusiones
## Referencias
