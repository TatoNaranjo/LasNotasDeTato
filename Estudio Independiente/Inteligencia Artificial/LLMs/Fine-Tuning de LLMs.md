---
tags:
  - LLMs
  - IA
date: 2024-12-04
---
Los Lenguajes de Modelos Largos (LLMs) abarcan múltiples etapas de entrenamiento. La primera etapa, que normalmente es conocida como el pre entrenamiento, es la etapa de inicio en donde un LLM se entrena a travez de una amplia, diversa y no etiquetada cantidad de datos de texto, y será encargada con la tarea de predecir el siguiente token dandole un contexto anterior. La meta de esta etapa, es tener una distribución grande y general de los datos, y crear un modelo que sea bueno tomándolos como prueba para esta distribución general. Después del pre entrenamiento del lenguaje, el LLM resultante normalmente demuestra un nivel razonable del entendimiento del lenguaje y habilidades de generación de lenguaje a través de una variedad de diferentes tareas que se prueban típicamente a través de una consulta sin contexto, o con muy poco contexto (llenando la instrucción con unos pocos ejemplos o demostraciones). el pre entrenamiento es la etapa más costosa en términos de tiempo (Puede durar semanas e incluso meses dependiendo del tamaño del modelo) y la cantidad de recursos de computación requeridos, (GPU o TPU por hora)

Después del entrenamiento, el modelo puede especializarse por medio de un entrenamiento de refuerzo llamado fine-tuning, o llamado de forma típica, instruction-tuning o simplemente un fine-tuning supervisado (SFT). El SFT involucra entrenar un LLM con un conjunto de datos de tareas específicas en donde su rendimiento también se mide a través de un conjunto de tareas de dominio específicas. Aquí hay algunos ejemplos de comportamientos que se pueden mejorar utilizando el fine-tuning:

- **Seguimiento de instrucciones**: Se le da al LLM una entrada como una instrucción a seguir, lo que incluso puede incluir resumir un pedazo de texto, escribir una pieza de código o escribir un poema en un estilo específico.
- **Mejoramiento de Diálogos**: Este es un caso de refinamiento especial de instrucciones en donde el LLM es mejorado con datos de conversaciones en la forma de preguntas y respuestas. Esto normalmente es conocido como un dialogo de multi-turnos.
- **Refinamiento de Seguridad**: Esto es crucial para mitigar los riesgos asociados con el juzgamiento, la discriminación o los comportamientos tóxicos dentro de una salida. Involucra un enfoque que se basa en la selección de datos sensibles, validaciones hechas por humanos y la incorporación de reglas de seguridad. Técnicas como el aprendizaje reforzado combinado con la retroalimentación humana permiten que el LLM priorice las respuestas que son más seguras y éticas.

## Fine-Tuning Supervisado

Como se mencionó en la sección anterior, el SFT es el proceso de mejorar el rendimiento de un LLM en una tarea específica o en un conjunto de tareas, entrenando el modelo con datos etiquetados en el dominio específico. El conjunto de datos es, de forma típica, significativamente más pequeño que el conjunto de datos utilizado durante el pre entrenamiento, y normalmente suele ser de muy alta calidad.

En esta configuración, cada punto de datos consiste en una entrada (prompt) con una demostración (respuesta objetivo). Por ejemplo, las preguntas (prompt) y las respuestas (el objetivo), las traducciones de un lenguaje (prompt) a otro lenguaje (respuesta objetivo). un documento para resumir (prompt) y el resumen correspondiente (respuesta objetivo).

Es importante notar que, mientras que el fine-tuning puede ser usado para mejorar el rendimiento en tareas particulares como las ya mencionadas, también puede servir al propósito de ayudar al LLM a mejorar su comportamiento para que sea más seguro, menos tóxico, más conversacional y sea mejor siguiendo instrucciones.

## El aprendizaje reforzado desde la retroalimentación humana

Típicamente, luego de realizar un SFT, ocurre una segunda etapa de fine-tuning conocida como el aprendizaje reforzado desde la retroalimentación humana (RLHF). Esta es una técnica muy poderosa de fine-tuning que permite que un LLM encaje mejor con aquellas respuestas que prefiere un ser humano (como por ejemplo hacer las repuestas un poco más útiles, confiables, seguras... etc).

![[RLHF.png]]

En contraste con un SFT, en donde un LLM solo está expuesto a ejemplos positivos (como datos de prueba de alta calidad), el RLHF hace posible que también se produzcan salidas negativas que penalicen al LLM cuando este genere respuestas que son expuestas como indeseadas debido a sus propiedades. Penalizar las salidas negativas hace que sea mucho menos probable que se generen respuestas inútiles o poco seguras.

Para utilizar el RLHF, un modelo recompensado (RM) necesita entrenarse por medio de un procedimiento similar al de la figura anterior. Un RM está inicializado normalmente con un modelo transformer pre entrenado, siendo a menudo el que se encuentra en el SFT. Luego, se expone a los datos que tienen preferencia humana, y que pueden tener una sola perspectiva (un prompt, una respuesta y un puntaje) o puede estar compuesto de un prompt y un par de respuestas puntuadas que indican cuál de las dos es la más elegida. Por ejemplo, dados dos resúmenes A y B, del mismo artículo, un humano prefiere seleccionar un resumen (basándose en la guía otorgada). Con el término de retroalimentación humana, nos referimos a esa preferencia humana escogida. Las preferencias pueden estar en una forma binaria (como "bueno" o "malo"), o en la escala de Likert en donde más de dos candidatos son evaluados o se hace una prueba de calidad más detallada. La señal de preferencia también incorpora algunas dimensiones que toman varios aspectos que definen una respuesta de alta calidad (como la seguridad, la utilidad, la respuesta más justa y confiable).

La figura anterior nos muestra un proceso típico de RLHF en donde un modelo de recompensa es inicializado y reforzado por medio de pares de preferencia. Una vez que un RM ha sido entrenado, luego es usado por un algoritmo de gradiente de aprendizaje reforzado, lo que realiza una mejora a un LLM que ya ha sido mejorado en términos de instrucciones para generar respuestas que estén acordes a las preferencias humanas.

Para escalar mejor el RLHF, el RL de AI Feedback mide la retroalimentación de la IA en vez de la retroalimentación humana para generar etiquetas de preferencia. También es posible eliminar la necesidad del entrenamiento por medio del RLHF realizando enfoques como la optimización de preferencia directa (DPO). Ambos, RLHF y RLAIF pueden usarse en Google Cloud.

## Fine-Tuning Eficiente de Parámetros

Tanto el SFT como el RLHF siguen siendo costosos cuando hablamos de tiempo de computación y aceleradores, especialmente cuando un fine-tuning completo se aplica alrededor de billones de parámetros. Por suerte, hay unas técnicas útiles y efectivas que pueden hacer que el fine-tuning sea significativamente más barato y rápido comparado con un pre-entrenamiento y un fine-tuning completo. Una de esta familia de métodos son las técnicas eficientes de fine-tuning de parámetros (PEFT).

En un alto nivel, los enfoques de PEFT normalmente conllevan un peso significativamente más pequeño de pesos que son utilizados para 'molestar' los pesos del LLM pre entrenado. La perturbación tiene el efecto de realizar una nueva tarea o un nuevo conjunto de tareas dentro del LLM. Esto, a su vez, conlleva el beneficio de entrenar un conjunto de pesos significativamente menor si lo comparamos con un fine-tuning tradicional del modelo entero.

Algunas técnicas de PEFT incluyen el adaptador, la adaptación de posicionamientos básicos y un soft prompting:

- **Fine-Tuning basado en un adaptador**: Emplea módulos pequeños llamados adaptadores dentro del modelo entrenado. Solo los parámetros de los adaptadores se entrenan, por lo que hay menos parámetros que en un SFT.
- **Adaptación de posicionamientos bajos**: Funciona de forma eficiente pero con un enfoque diferente. Usa dos matices más pequeñas para aproximar el peso de la matrix original en vez de realizar un fine-tuning al LLM entero. Esta técnica congela los pesos originales y entrena estas matrices actualizadas, lo que reduce los requerimientos de los recursos con una inferencia de latencia adicional pero mínima. Una ventaja de los módulos es que pueden conectarse y desconectarse, lo que significa que puedes entrenar un módulo que se especialice en una tarea para reemplazarla fácilmente con otro módulo pero entrenado con una tarea diferente. Esto también hace más fácil el hecho de transferir el modelo si asumimos que el receptor tiene la matriz original y solo se necesita otorgar las matrices de actualización.
- **Soft Prompting** es una técnica para condicional lenguajes de modelo largos por medio de vectores de aprendizaje en vez de por prompts de texto hechos manualmente. Estos vectores, llamados soft prompts son optimizados en los datos de entrenamiento y pueden ser tan pocos como 5 tokens, haciendolos más eficientes y permitiendo la inferencia de tareas mixtas.


Para la mayoría de tareas, un fine-tuning completo sigue rindiendo de buena manera, pero cuando hablamos de una eficiencia de parámetros podemos llegar a reducir los costos. Todos los tres enfoques son mas eficientes en términos de memoria que un fine-tuning tradicional y alcanzan un rendimiento comparable.

```python

# Before you start run this command:
# pip install --upgrade --user --quiet google-cloud-aiplatform
# after running pip install make sure you restart your kernel
import vertexai
from vertexai.generative_models import GenerativeModel
from vertexai.preview.tuning import sft

# TODO : Set values as per your requirements
# Project and Storage Constants

PROJECT_ID = ‘<project_id>’
REGION = ‘<region>’
vertexai.init(project=PROJECT_ID, location=REGION)

# define training & eval dataset.
TRAINING_DATASET = ‘gs://cloud-samples-data/vertex-ai/model-evaluation/
peft_train_sample.jsonl’

# set base model and specify a name for the tuned mode
BASE_MODEL = ‘gemini-1.5-pro-002’
TUNED_MODEL_DISPLAY_NAME = ‘gemini-fine-tuning-v1’

# start the fine-tuning job
sft_tuning_job = sft.train(
source_model=BASE_MODEL,
train_dataset=TRAINING_DATASET,

# # Optional:
tuned_model_display_name=TUNED_MODEL_DISPLAY_NAME,
)

# Get the tuning job info.
sft_tuning_job.to_dict()

# tuned model endpoint name
tuned_model_endpoint_name = sft_tuning_job.tuned_model_endpoint_name

# use the tuned model
tuned_genai_model = GenerativeModel(tuned_model_endpoint_name)

print(tuned_genai_model.generate_content(contents=’What is a LLM?’))
```


