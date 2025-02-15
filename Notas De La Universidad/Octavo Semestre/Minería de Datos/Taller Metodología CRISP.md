> [!Note] Integrantes
> - Santiago Naranjo Herrera
> - Daniel Steven Hincapié Cetina

# Introducción

El presente documento desarrolla un análisis detallado basado en la metodología **CRISP-DM (Cross Industry Standard Process for Data Mining)**, aplicada al contexto de la **detección de lavado de dinero**. A través de este taller, se sigue un enfoque estructurado para comprender el problema de negocio, explorar y preparar los datos, construir un modelo predictivo, evaluarlo y finalmente considerar su implementación en un entorno operativo.

El análisis se realiza con un conjunto de datos ficticio que contiene información sobre transacciones financieras, con el objetivo de identificar patrones que puedan indicar actividades sospechosas. La detección de lavado de dinero es un desafío clave para las instituciones financieras y organismos reguladores, ya que el incumplimiento de normativas puede acarrear sanciones legales y riesgos reputacionales.

En este documento, abordamos cada fase del proceso CRISP-DM:

• **Entendimiento del negocio**: Definición del problema, implicaciones legales y financieras.
• **Entendimiento de los datos**: Exploración de patrones y correlaciones relevantes.
• **Preparación de los datos**: Preprocesamiento, limpieza y transformación de las variables.
• **Modelado**: Selección del modelo más adecuado para la clasificación de transacciones sospechosas.
• **Evaluación**: Análisis de métricas como precisión, recall y F1-score.
• **Despliegue**: Estrategias para la implementación del modelo en los procesos operativos.

  
Este documento ha sido elaborado por **Santiago Naranjo Herrera** y **Daniel Steven Hincapié Cetina**, como parte del desarrollo del taller de aplicación de **CRISP-DM en la detección de lavado de dinero**.

## Entendimiento del Negocio (Business Understanding)

### Definir claramente el problema de negocio relacionado con el lavado de dinero

El lavado de dinero es el proceso mediante el cual los delincuentes ocultan el origen ilícito de sus fondos, haciéndolos parecer legales a través de transacciones financieras. Este problema afecta a bancos, instituciones financieras y organismos reguladores, ya que permite la financiación de actividades ilegales como el narcotráfico, la corrupción y el terrorismo.

El objetivo del modelo es **identificar transacciones sospechosas de lavado de dinero** dentro del conjunto de datos de una empresa. Esto permite a la organización cumplir con las regulaciones de prevención de lavado de dinero (AML, por sus siglas en inglés), mejorar la seguridad financiera y evitar sanciones legales.

### Implicaciones legales y financieras si el modelo identifica incorrectamente las transacciones como sospechosas

Si el modelo **falsamente identifica** transacciones legítimas como sospechosas (**falsos positivos**), puede generar:

• **Costos operativos elevados**: Se requiere un equipo de cumplimiento regulatorio para revisar manualmente los casos marcados.
• **Retrasos en transacciones**: Esto puede afectar la experiencia del cliente y generar insatisfacción.
• **Pérdida de clientes**: Un cliente puede decidir cambiar de institución financiera si sus transacciones son bloqueadas injustificadamente.
• **Demandas y reclamaciones**: Si se afectan operaciones legítimas, la empresa puede enfrentar acciones legales por parte de clientes.

Por otro lado, si el modelo **falla en identificar transacciones ilícitas** (**falsos negativos**), la empresa se expone a:

• **Sanciones legales y multas**: Organismos reguladores pueden imponer multas millonarias por incumplimiento de normativas AML.
• **Daño reputacional**: La empresa puede ser percibida como permisiva con actividades ilegales.
• **Investigaciones legales**: En casos graves, directivos pueden enfrentar responsabilidades penales.

## Entendimiento de los datos (Data Understanding)
### Análisis Exploratorio de los Datos (ADA)

El análisis exploratorio de datos (EDA) se define como un paso crucial para comprender la estructura del dataset, detectar valores atípicos y verificar la calidad de los datos antes de construir un modelo. Para realizar este análisis debemos realizar una serie de pasos que se conforman por las siguientes objetivos.

1. **Revisión de la distribución de cada variable**:

• Analizar cómo están distribuidos los montos de transacciones (mínimo, máximo, media y mediana).
• Revisar si hay valores extremos en la frecuencia de transacciones.
• Evaluar la proporción de transacciones sospechosas vs. no sospechosas.

2. **Detección de valores faltantes**:

• Identificar si hay datos ausentes en variables como país de origen, país de destino o historial de transacciones.
• Definir estrategias para manejar los valores faltantes (imputación con media, eliminación de filas, etc.).

3. **Identificación de valores atípicos (outliers)**:

• Detectar transacciones con montos inusualmente altos.
• Identificar clientes con un número de cuentas excesivamente alto.
• Analizar si hay países con una cantidad anormal de transacciones.

## Preparación de los Datos (Data Preparation)

Una vez comprendido el problema y analizados los datos, es necesario prepararlos adecuadamente para garantizar que el modelo pueda aprender patrones significativos y evitar sesgos o errores durante su entrenamiento.

### Preprocesamiento de los datos para el modelado

Para una limpieza de datos se revisa si existen transacciones repetidas y se eliminan para evitar sesgos en el modelo. Así mismo, si hay pocos valores faltantes en variables numéricas ( por ejemplo, el Monto de la transacción), se pueden imputar con la **media o mediana**. Por otro lado, si hay valores faltantes en variables categóricas (_País de origen_, _Tipo de transacción_), se pueden llenar con la **moda** o asignar un valor como “Desconocido”.  Por último, se convierten fechas y tipos de datos erróneos (ej. convertir la _Fecha de la transacción_ al formato datetime).

### Transformación de Datos Categóricos

Para que el modelo pueda procesar variables categóricas, estas deben ser transformadas en valores numéricos. Para esto, utilizamos One Hot Encoding cuando existen variables que pueden ser _Tipo de transacción_ y _País de origen/destino_. Por otra parte, si existen categorías que tienen un orden implícito utilizamos Label Encoding.

### Creación de Nuevas Características

Para mejorar la capacidad del modelo de identificar patrones sospechosos, se pueden generar nuevas variables como el **Monto promedio de transacciones** en los últimos 6 meses, la **Frecuencia de transacciones** por semana o mes, el **Número de países diferentes con los que ha transaccionado un cliente**, o la**Diferencia entre el monto actual y el promedio de transacciones previas** (esta es fundamental porque puede detectar cambios bruscos dentro del modelo).

### Escalado y Normalización

Se deben normalizar los datos sensibles en caso de que sean sensibles a la magnitud de los valores, como por ejemplo los modelos que hacen uso de Redes Neuronales o K-Vecinos. Para esta normalización se utilizan 2 estrategias.

• **Min-Max Scaling**: Convierte los valores a un rango de 0 a 1.
• **Standard Scaling (Z-score)**: Resta la media y divide por la desviación estándar.

### Manejo de datos faltantes y desbalance de clases

**1. Tratamiento de valores faltantes**

• **Si hay pocos valores faltantes**, se pueden imputar con la **media, mediana o moda**.
• **Si hay muchos valores faltantes**, considerar eliminación de la variable si no es crucial.

**2. Manejo del desbalance de clases**

El lavado de dinero es un evento raro, por lo que es común que el dataset tenga muchas más transacciones **normales (0)** que **sospechosas (1)**. Para corregirlo utilizamos los siguientes conceptos:  

**Submuestreo (undersampling)**: Reducir la cantidad de transacciones normales para equilibrar el dataset.

**Sobremuestreo (oversampling)**: Aumentar las transacciones sospechosas mediante técnicas como **SMOTE (Synthetic Minority Over-sampling Technique)**.

**Asignación de pesos en el modelo**: Algunos algoritmos como **Random Forest o XGBoost** permiten dar más peso a la clase minoritaria.

## Modeling (Modelado)

La detección de lavado de dinero es un problema de clasificación binaria, donde queremos predecir si una transacción es sospechosa o no. Algunos modelos adecuados son:

• **Regresión Logística**: Es bueno para interpretabilidad, pero es limitado cuando se trata de la captura de patrones complejos.

• **Árboles de Decisión / Random Forest**: Manejan relaciones no lineales y permiten entender la importancia de las variables.

• **XGBoost**: Muy eficiente para problemas con desbalance de clases y con alto rendimiento en clasificación.

• **Redes Neuronales**: Útiles para grandes volúmenes de datos, aunque requieren más recursos.

• **Máquinas de Soporte Vectorial (SVM)**: Funcionan bien si los datos son linealmente separables.

  
### ¿Qué modelo proporciona la mejor combinación de precisión, recall y F1-score?

Para evaluar el modelo, consideramos tres aspectos fundamentales:

1. **Precisión (Precision)**: Proporción de transacciones identificadas como sospechosas que realmente lo son. Un modelo con baja precisión generará muchas alertas falsas.

2. **Recall (Sensibilidad)**: Capacidad del modelo para identificar transacciones sospechosas. Un modelo con bajo recall dejará pasar transacciones fraudulentas.

3. **F1-score**: Equilibrio entre precisión y recall, útil cuando hay desbalance de clases.

  > [!Tip] Optimización del Modelo
> Aunque utilizar el modelo correcto es un paso importante en la eficiencia de la clasificación de información, hay algunas cosas que se deben tener en cuenta para optimizar el modelo elegido según el contexto. Algunas de las cosas más importantes en las que nos debemos fijar son:
> - Ajustar Hiperparámetros utilizando una Random Search
>  - Usar métricas ponderadas para reducir el impacto del desbalance de las clases.
>  - Aplicar técnicas de selección de características para mejorar la eficiencia.

## Evaluación (Evaluation)

Luego de la fase de modelado, debemos probar nuestra herramienta creada por medio de una serie de preguntas que nos harán saber si la opción que elegimos fue la correcta y si está optimizada para adaptarse al contexto de la situación. Dentro de esta evaluación, algunas preguntas que nos debemos hacer pueden ser:

### ¿El modelo es efectivo en la detección de lavado de dinero sin generar demasiados falsos positivos?

Para evaluar la efectividad del modelo, consideramos las siguientes métricas clave:

- **Una Matriz de Confusión**:
• Muestra la cantidad de **falsos positivos (FP)** y **falsos negativos (FN)**.
• Queremos minimizar **FN** para no dejar pasar transacciones sospechosas, pero también reducir **FP** para evitar marcar erróneamente transacciones legítimas.

- **Métricas de clasificación:**
	• **Precisión (Precision)**: ¿Cuántas transacciones marcadas como sospechosas realmente lo son?
	• **Recall (Sensibilidad)**: ¿Cuántas transacciones sospechosas fueron detectadas?
	• **F1-score**: Promedio armónico entre precisión y recall, útil cuando las clases están desbalanceadas.

- **Curva ROC y AUC**:

• La curva ROC (Receiver Operating Characteristic) evalúa la capacidad del modelo para diferenciar entre transacciones sospechosas y normales.

• El área bajo la curva (AUC) indica qué tan bien el modelo clasifica los casos sospechosos. Un AUC cercano a **1.0** es ideal.

- **Pruebas en datos no vistos (validación y test)**: Para esto, Evaluamos el modelo con datos separados para verificar su rendimiento en situaciones reales.

### ¿Qué medidas se pueden tomar para mejorar la efectividad del modelo y reducir el riesgo de pasar por alto transacciones sospechosas?

Si el modelo tiene **bajo recall** (muchos falsos negativos), podemos optar por unas cuantas más estrategias para mejorar la efectividad del modelo por medio de una retroalimentación basada en los siguientes factores:

- **Ajustar el umbral de clasificación**: Reducir el umbral de predicción para que más transacciones sean consideradas sospechosas.
- **Aplicar técnicas de sobremuestreo (SMOTE) o submuestreo** para mejorar el balance de clases.
- **Probar modelos más complejos** como XGBoost o Redes Neuronales.
- **Incluir más características** que puedan mejorar la detección de patrones sospechosos.

En caso de que el modelo tenga muchos falsos positivos, podemos optar por:

- **Optimizar hiperparámetros** con Grid Search o Random Search.
- **Reducir el número de características irrelevantes** que puedan generar ruido en la predicción.
- **Agregar reglas basadas en expertos** para complementar el modelo y reducir revisiones manuales innecesarias.

## Despliegue (Deployment)

### ¿Cómo se integrará el modelo en los procesos operativos actuales de la empresa?

•⁠  ⁠La integración del modelo debes ser paulatina y supervisada, para que de esta forma se mitiguen errores y escenarios no previstos. En estas revisiones, se debe validar que las transacciones marcadas como sospechosas tengan patrones entre sí, para mitigar errores asociados a acusar sin fundamentos, logrando al mismo tiempo ahorrar esfuerzos y recursos en investigaciones más costosas y tardías.

Una vez realizado el paso anterior, se pueden agrupar estas cuentas y ver cuál es la razón por la que se marcaron como sospechosas, para de esta forma identificar nuevos patrones e implementar una mejora continua al sistema

### ¿Qué procedimientos se deben establecer para la revisión y acción sobre las transacciones identificadas como sospechosas?**

1. **Definir umbrales de riesgo**

• Para esto debemos asignar niveles de riesgo (bajo, medio, alto) según la probabilidad de lavado de dinero.

• Podemos añadir una característica para que las transacciones de **alto riesgo** pueden bloquearse automáticamente hasta ser revisadas.

2. **Equipo de revisión manual**

• Crear un equipo de analistas que evalúe los casos sospechosos antes de reportarlos a las autoridades.
• Usar herramientas de visualización (Power BI, Tableau) para facilitar el análisis.

3. **Automatización de reportes regulatorios**

• Generar informes estándar para unidades de inteligencia financiera.
• Cumplir con normativas como **FATF, FINCEN o EU AMLD**.

4. **Monitoreo continuo del modelo**

• Reentrenar el modelo con nuevos datos para mantener su precisión.
• Implementar **sistemas de detección de sesgo** para evitar que el modelo genere resultados injustos o discriminatorios.


# Bibliografía

- [Conceptos Básicos y de Ayuda para CRISP-DM](https://www.ibm.com/docs/es/spss-modeler/saas?topic=dm-crisp-help-overview)
- [La metodología CRISP-DM en ciencia de datos](https://www.iic.uam.es/innovacion/metodologia-crisp-dm-ciencia-de-datos/)