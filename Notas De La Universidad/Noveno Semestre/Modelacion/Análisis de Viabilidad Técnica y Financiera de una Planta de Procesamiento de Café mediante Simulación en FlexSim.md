# Análisis de Viabilidad Técnica y Financiera de una Planta de Procesamiento de Café mediante Simulación en FlexSim

**Fecha:** 25/10/2025  
**Autores:** Santiago Naranjo Herrera · Daniel Steven Hincapié Cetina · Juan Esteban Fuentes Rojas  
**Asignatura:** Modelación

---

## 1. Introducción y Objetivos

### 1.1 Descripción del Problema
El presente trabajo analiza la viabilidad técnica y financiera de una planta de procesamiento de café modelada en FlexSim. El modelo reproduce las etapas de beneficio, trilla y tostión con configuración **2–2–3** (Máquinas por etapa) y considera la intervención de **6 operarios** dedicados al manejo y transporte entre estaciones. El objetivo es estimar la capacidad productiva, detectar cuellos de botella y evaluar la rentabilidad bajo las condiciones de operación definidas.

### 1.2 Objetivos específicos
- Validar la capacidad productiva del sistema en una **jornada de 10 horas**.  
- Identificar el **cuello de botella** y su impacto en el flujo de trabajo.  
- Calcular el **punto de equilibrio mensual** y la **utilidad proyectada**.  
- Proponer medidas de optimización técnico-económica con análisis costo–beneficio.

---

## 2. Descripción del Modelo

El modelo en FlexSim consta de:
- **Etapa 1 — Beneficio:** 2 máquinas en paralelo.  
- **Almacén 1 (`Espera_Trilla`)**.  
- **Etapa 2 — Trilla y Calidad:** **2 máquinas** en paralelo (actualización).  
- **Almacén 2 (`Espera_Tostion`)**.  
- **Etapa 3 — Tostión:** 3 máquinas en paralelo.  
- **Operarios:** 6 (transporte y operación auxiliar).  
- **Máquinas totales:** 7.

![Pasted image 20251024202846.png]

El flujo y la lógica de despacho siguen la topología descrita; sin embargo, la presencia de recursos humanos limitados y la lógica del `Dispatcher` influyen decisivamente en la utilización efectiva del equipamiento.

---

## 3. Parámetros y Costos del Modelo

> **Período de análisis corregido:** 1 mes = **24 días** × **10 horas/día** = **240 horas/mes**.

### 3.1 Inversión y depreciación

**Composición de la inversión (COP):**
- Beneficio: 2 × $80.000.000 = **$160.000.000**  
- Trilla y Calidad: 2 × $120.000.000 = **$240.000.000**  
- Tostadoras: 3 × $200.000.000 = **$600.000.000**

**Inversión total:** $160M + $240M + $600M = **$1.000.000.000 COP**

**Horizonte de depreciación:** 10 años → 120 meses.

**Depreciación mensual:** $1.000.000.000 / 120 = **$8.333.333,33 / mes**

---

### 3.2 Costos Operativos Mensuales (actualizados)

| Concepto | Cálculo | Total (COP) |
|---|---:|---:|
| Personal (6 operarios) | 6 × $2.500.000 | **$15.000.000** |
| Costos fijos (arriendo, servicios) | — | **$7.000.000** |
| Depreciación maquinaria | (ver arriba) | **$8.333.333,33** |
| **Costo Fijo Total (CFT)** | 15.000.000 + 7.000.000 + 8.333.333,33 | **$30.333.333,33 / mes** |

> **Nota:** los costos fijos y de personal se mantienen según los valores provistos; solo varió la depreciación por modificación del número total de máquinas.

---

### 3.3 Parámetros de producción y precios (sin cambios)

| Parámetro | Valor |
|---|---:|
| Precio de venta (PV) | $30.000 / kg (café tostado) |
| Costo materia prima | $4.000 / kg (cereza) |
| Ratio conversión | 5 kg cereza → 1 kg tostado |
| Costo variable unitario (CVU) | 5 × $4.000 = **$20.000 / kg tostado** |
| Margen de contribución (MC) | PV − CVU = **$10.000 / kg** |

---

## 4. Resultados de la simulación y proyección mensual

### 4.1 Resultados de la corrida de 10 horas
- **Duración simulación:** 10 h (8:00–18:00).  
- **Producción neta alcanzada (simulación):** **792 kg** (tostado).  
  > Detalle: se registraron 797 unidades que entraron a tostión y quedaron 5 en proceso al término, por lo que la producción efectiva fue 797 − 5 = 792 kg.  
- **Throughput promedio:** 792 kg / 10 h = **79.2 kg/h**

### 4.2 Proyección a periodo mensual corregido
Dado que la jornada simulada es de **10 h/día**, se proyecta sobre 24 días/mes:

- **Horas mensuales:** 24 × 10 = **240 h/mes**  
- **Producción mensual proyectada:** 79.2 kg/h × 240 h = **19.008,0 kg/mes**

---

## 5. Cálculos financieros (completos y verificados)

### 5.1 Ingresos y costos variables mensuales
- **Ingresos mensuales (ventas):** 19.008 kg × $30.000 = **$570.240.000 COP**  
- **Costos variables totales:** 19.008 kg × $20.000 = **$380.160.000 COP**

### 5.2 Costos fijos y utilidad
- **Costos fijos totales (CFT):** **$30.333.333,33 COP / mes** (ver sección 3.2)  
- **Utilidad bruta mensual:** Ingresos − Costos variables − Costos fijos  
  = $570.240.000 − $380.160.000 − $30.333.333,33  
  = **$159.746.666,67 COP / mes**

### 5.3 Indicadores clave
- **Margen operativo absoluto:** $159.746.666,67 / mes  
- **Rentabilidad sobre ingresos:** 159.746.666,67 / 570.240.000 ≈ **28.01%**  
- **Punto de equilibrio (unidades / mes):** CFT / MC = $30.333.333,33 / $10.000 = **3.033,33 kg/mes**

> **Interpretación:** con la proyección actual (19.008 kg/mes) se supera ampliamente el punto de equilibrio (≈3.033 kg/mes), y la operación muestra un margen operativo estimado del **~28%**.

---

## 6. Identificación de cuellos de botella y utilización

### 6.1 Observaciones de la corrida
- `Espera_Trilla` y `Espera_Tostion` terminan el día casi vacías: indica que el flujo no está acumulando WIP significativo en buffers.  
- Algunas máquinas aparecen **subutilizadas** (ej. `Proceso_Beneficio`), mientras una o dos máquinas en trilla/tostión concentran la carga, lo que sugiere desbalance por la lógica del `Dispatcher`.  
- Se observó estado `Waiting for operator` en al menos una máquina de tostión, evidencia directa de restricción en personal.

### 6.2 Consecuencia operativa
El **recurso humano (6 operarios)** se identifica como el cuello de botella operativo principal. La configuración de máquinas (7 en total) tiene capacidad instalada suficiente si la coordinación de operarios y la lógica de despacho se ajustan adecuadamente.

---

## 7. Propuestas de mejora y análisis costo–beneficio (actualizado)

### 7.1 Solución A — Reconfigurar Dispatcher (costo $0)
**Acción:** Implementar reglas de despacho que balanceen carga entre máquinas (p. ej., *Shortest Queue*, *Round Robin*, *Least Utilization*).  
**Beneficio estimado:** incremento de producción **10–15%** sin inversión.  
**Impacto esperado:** mayor utilización de máquinas ociosas, reducción de variabilidad en tiempos de espera y WIP.

### 7.2 Solución B — Contratar 2 operarios adicionales (costo +$5.000.000 / mes)
**Acción:** aumentar plantilla de 6 a 8 operarios.  
**Costo adicional:** $5.000.000 / mes.  
**Beneficio estimado:** incremento de producción **30–50%** (según nivel de cuellos actuales).  
**Análisis de recuperación:** con margen por kg = $10.000, un incremento de **500 kg/mes** genera $5.000.000 en contribución (que cubre el nuevo gasto de personal), por lo tanto la medida es rentable si provoca al menos ese incremento mínimo.

### 7.3 Recomendación combinada (orden de implementación)
1. Implementar **Solución A** inmediatamente (sin costo).  
2. Re-simular y medir mejora.  
3. Si la producción proyectada permanece por debajo del potencial esperado, aplicar **Solución B**.

---

## 8. Conclusiones (técnicas y financieras)

- Con la **configuración corregida** (2 machines de Trilla, total 7 máquinas) y la proyección mensual ajustada a **240 h/mes**, el sistema proyecta **19.008 kg/mes** de producción a partir de la corrida de 10 h.  
- El proyecto es **financieramente viable**: utilidad bruta estimada **$159.746.666,67 COP/mes** y rentabilidad aproximada **28.0%** sobre ingresos.  
- El **punto de equilibrio** se ubica en **≈3.033 kg/mes**, valor ampliamente superado por la proyección.  
- El principal problema detectado es **operativo** (falta de operarios y desbalance del Dispatcher), no la capacidad de maquinaria por sí misma.  
- Se recomienda priorizar la reconfiguración de la lógica de despacho y, posterior validación, la contratación de personal adicional si los resultados lo justifican.

---

## 9. Apéndice — cálculos discretos (verificados)

1. Throughput hora = 792 kg / 10 h = **79.2 kg/h**  
2. Horas mensuales = 24 días × 10 h/día = **240 h/mes**  
3. Producción mensual = 79.2 × 240 = **19.008 kg/mes**  
4. Ingresos = 19.008 × 30.000 = **$570.240.000**  
5. Costos variables = 19.008 × 20.000 = **$380.160.000**  
6. Depreciación = 1.000.000.000 / 120 = **$8.333.333,33 / mes**  
7. CFT = 15.000.000 + 7.000.000 + 8.333.333,33 = **$30.333.333,33**  
8. Utilidad = 570.240.000 − 380.160.000 − 30.333.333,33 = **$159.746.666,67**  
9. PE = CFT / MC = 30.333.333,33 / 10.000 = **3.033,33 kg/mes**

---

### Observación final
He mantenido tus valores originales siempre que fue posible y **rectifiqué** los elementos inconsistentes (número de máquinas, depreciación, y periodo de proyección). Si quieres, puedo:

- Recalcular escenarios alternativos (por ejemplo: **si la reconfiguración del dispatcher logra +12%** o **si la contratación de 2 operarios produce +40%**), mostrando sensibilidad y nuevos estados financieros.  
- Generar la **versión PDF** con portada e índice.  
- Incluir un **anexo con gráficos** (utilización por máquina, WIP por buffer, curvas de producción) a partir de datos exportados de FlexSim si me provees los CSV de salida.

¿Te preparo las simulaciones de escenario (+12% / +40%) y un cuadro comparativo con los nuevos indicadores, o prefieres que ahora genere el PDF listo para entrega?