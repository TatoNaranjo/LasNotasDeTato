---
date: 2025-02-21
tags:
  - OctavoSemestre
---
>[!Check] Integrantes:
> - Santiago Naranjo Herrera
>  - Daniel Steven Hincapié Cetina


# 1. Completar la siguiente tabla


| **Fase**                      | **KDD**                   | **Crisp-DM**             |
| ----------------------------- | ------------------------- | ------------------------ |
| **Comprensión del Negocio**   | No es una fase explícita  | Comprensión del Negocio  |
| **Comprensión de los Datos**  | Selección de los Datos    | Comprensión de los Datos |
| **Selección de los Datos**    | Selección de los Datos    | Preparación de los Datos |
| **Preprocesamiento**          | Preprocesamiento          | Preparación de los Datos |
| **Transformación**            | Transformación            | Preparación de los Datos |
| **Minería de Datos**          | Minería de Datos          | Modelado                 |
| **Interpretación/Evaluación** | Interpretación/Evaluación | Evaluación               |
| **Implementación**            | No es una fase explícita  | Implementación           |
# 2. Asignar cada Caso a una fase de KDD y de CRISP-DM

1. **Han recopilado datos de transacciones de los últimos dos años.**

• **KDD:** Selección de los datos

• **CRISP-DM:** Comprensión de los datos

2. **Están aplicando técnicas de agrupamiento para identificar perfiles de clientes.**

• **KDD:** Minería de datos

• **CRISP-DM:** Modelado

3. **Se ha generado un informe con recomendaciones para la estrategia de marketing.**

• **KDD:** Interpretación/Evaluación

• **CRISP-DM:** Evaluación


# 3) ¿Cuál metodología creen que se ajusta mejor a este caso y por qué?

  
Para este caso, **CRISP-DM se ajusta mejor**, ya que está diseñada específicamente para proyectos de minería de datos en empresas. Su estructura es más clara en términos de procesos de negocio, lo cual es crucial para una empresa que busca mejorar su estrategia de marketing.

Por otro lado, KDD es un enfoque más académico y enfocado en la extracción de conocimiento en general, sin tanto énfasis en la aplicación del negocio.


# 4) ¿Cuál metodología les parece más clara o útil?
  

Depende del contexto:

• **CRISP-DM** es más clara para aplicaciones empresariales, ya que tiene fases bien definidas que siguen un flujo lógico desde la comprensión del negocio hasta la implementación.

• **KDD** es útil si el objetivo es descubrir patrones en grandes volúmenes de datos sin necesariamente aplicarlos en un contexto empresarial inmediato.

En este caso, **CRISP-DM parece más útil** porque la empresa busca aplicar el conocimiento descubierto en estrategias de marketing.  

# 5) ¿Cómo aplicarían estos conceptos en un problema real?

Un ejemplo real sería una tienda en línea que usa minería de datos para mejorar la personalización de recomendaciones de productos:

1. **Comprensión del negocio:** Definir qué problema se quiere resolver (por ejemplo, aumentar las ventas a través de recomendaciones personalizadas).
2. **Comprensión de los datos:** Analizar datos históricos de compra.
3. **Preparación de los datos:** Limpiar y transformar los datos en un formato útil.
4. **Modelado:** Aplicar algoritmos de clustering para segmentar clientes según sus hábitos de compra.
5. **Evaluación:** Verificar si los resultados del modelo tienen sentido y aportan valor.
6. **Implementación:** Usar los resultados para mejorar el sistema de recomendaciones en la tienda en línea.