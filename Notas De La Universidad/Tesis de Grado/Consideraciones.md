Puntos a tener en cuenta cuando estoy planteando la base inicial de la [[Tesis de Grado]].

## ***Ideas Principales:***

- Crear un sistema para ayudar a los psicólogos que se encuentren en fase de prácticas a generar un mejor diagnóstico en base a un gemelo digital que se base en la interacción con pacientes por medio de un chat, teniendo en cuenta las investigaciones de la matriz RDoC. BUSCAR ENTREVISTAS YA CLASIFICADAS, o esquemas de comportamiento en entrevistas de pacientes.
- **Desarrollar una herramienta para analizar las interacciones paciente-psicólogo y generar información sobre posibles patrones de comportamiento relevantes para el diagnóstico de la depresión.**
- Arquitectura para plantear un sistema de recomendación en la evaluación de casos en la patología según RDoC.
- Software práctico al que le ingreso datos dummy y logra el objetivo.
#### Software práctico al que le ingreso datos dummy y logra el objetivo.

De momento, la idea parece unirlo a la idea de la herramienta de análisis creando un proyecto que se base en Python y librerías como `pandas`, `scikit-learn`, `nltk`, y `transformers` de Hugging Face.

- **Recopilación de Datos**: Generar datos dummy que simulen interacciones entre paciente y psicólogo.
- **Preprocesamiento**: Limpiar y preparar los datos para el análisis (tokenización, eliminación de stop words, etc.).
- **Análisis de Sentimientos**: Aplicar un modelo de análisis de sentimientos para clasificar las emociones en las interacciones.
- **Extracción de Patrones**: Utilizar técnicas de NLP para identificar palabras clave y temas recurrentes.
- **Visualización**: Presentar los resultados mediante gráficos que muestren los patrones de comportamiento identificados.

**To-Do:**

- Buscar por qué no hay herramientas que satisfagan lo que yo pienso, si es que no existen.
- ~~Diferencia entre Sistema Recomendador e Inteligencia Artificial.~~
- Buscar que permisos se necesitan para trabajar con datos sensibles de los pacientes.
- Segmentar la idea hasta el punto de pre-grado.
- Buscar conceptos sobre Algoritmos de Procesamiento de Lenguaje Natural



#### Herramienta de análisis para la interacción paciente-psicólogo que genera información sobre posibles patrones de comportamiento relevantes para el diagnóstico de la depresión.

La idea se basa en la construcción de un apoyo que tome como referencia al perfil del paciente, es decir... aquel documento que nos indica el análisis inicial que el psicólogo ha hecho sobre su paciente. 

En base a un modelo de procesamiento de lenguaje natural y una referencia como lo puede ser el [Manual Diagnóstico-Estadístico de Trastornos Mentales](https://www.eafit.edu.co/ninos/reddelaspreguntas/Documents/dsm-v-guia-consulta-manual-diagnostico-estadistico-trastornos-mentales.pdf), lo que se desea es que a través del procesamiento de un modelo, se obtengan resultados basados en porcentajes que ayuden a identificar ciertos patrones que encajen en el diagnóstico de los trastornos.

Se plantea como un mecanismo de apoyo en la evaluación psicológica.


## Preguntas

### ¿Actualmente, existen herramientas que ya hagan lo que estoy pensando?

#### Sistema de ayuda para los psicólogos en base a un gemelo digital usando los fundamentos del RDoC

- **Wysa AI Coach**: Es un servicio inteligente basado en inteligencia artificial que responde a las emociones que expresa el usuario y usa técnicas basadas en el la terapia de conducta cognitiva tales como la meditación, respiración, yoga, entrevistas motivacionales y micro-acciones para construir habilidades de resiliencia mental y generar un bienestar.

- **Woebot**: Es un ayudante virtual que ofrece una terapia asistida y eficiente que guía al usuario a través de los pasos de la terapia. Según su creadora, woebot es eficiente debido a que una conversación es una vía natural para desahogar la angustia y recibir apoyo emocional. En sí, se basa en las acciones que haría un verdadero terapeuta debido a que sigue un proceso de terapia conversacional.

- **APA PsycINFO**: Base de datos de psicología por excelencia, de cobertura mundial y actualización semanal. Incluye cuatro millones de citas y resúmenes de artículos, libros, tesis doctorales e informes, con el sello de calidad de la **Asociación Americana de Psicología**. Es una herramienta indispensable como punto de partida de la búsqueda de información pues recopila toda la literatura de calidad revisada por pares sobre **ciencias del comportamiento y salud mental**. La cobertura se remonta al siglo xvii y llega hasta el presente.

#### Herramienta de análisis para la interacción paciente-psicólogo que genera información sobre posibles patrones de comportamiento relevantes para el diagnóstico de la depresión.

El tema principal que debo investigar respecto a la construcción de esta herramienta son los algoritmos de procesamiento de lenguaje natural. Utilizar modelos generativos o grandes modelos de lenguaje. **Podría dar pistas sobre los trastornos que trata en base a la detección de un discurso.**



No he encontrado herramientas parecidas.

Hay que pensarlo con transformadores para modelos semánticos, LLM.

Plantearlo como un mecanismo de apoyo en la evaluación psicológica.


### ¿Cuál es la diferencia entre un sistema de recomendación y un sistema de inteligencia artificial?

Un sistema de recomendación es en sí un tipo de inteligencia artificial que se utiliza para sugerir productos, servicios o contenido a usuarios individuales. Como el campo de la inteligencia artificial es enorme, se puede definir a un sistema de recomendación como una aplicación específica de la misma.

#### Diferencias:

**Objetivos:**

- **Sistemas de recomendación:** Su objetivo principal es **proporcionar a los usuarios recomendaciones relevantes y útiles**.
- **IA:** Tiene un objetivo más amplio, que es **realizar tareas que normalmente requieren inteligencia humana**, como comprender el lenguaje, aprender y resolver problemas.

**Enfoque:**

- **Sistemas de recomendación:** Se enfocan en **analizar datos de usuario** como compras pasadas, historial de navegación y preferencias declaradas para identificar patrones y hacer predicciones sobre lo que el usuario podría estar interesado en el futuro.
- **IA:** Puede utilizar una variedad de enfoques, incluyendo **aprendizaje automático, procesamiento del lenguaje natural y visión artificial**, para lograr sus objetivos.


## Recursos y Fuentes

- [Wysa FAQ](https://www.wysa.com/faq)
- [Woebot](https://www.technologyreview.es/s/9678/woebot-el-robot-parlante-que-reduce-los-sintomas-de-depresion-en-dos-semanas)
- [APA PhysicINFO](https://biblioteca.uoc.edu/es/Coleccion-digital-por-areas-de-estudio/coleccion/APA-PsycINFO/)
- [IA para aumentar la calidad y la cantidad de la terapia de salud mental](https://www.technologyreview.es/s/13856/ia-para-aumentar-la-calidad-y-la-cantidad-de-la-terapia-de-salud-mental)