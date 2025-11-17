---
project: Asistente Clínico RAG
author: Santiago Naranjo Herrera (TatoNaranjo)
date: 2025-11-11
tags:
  - proyecto
  - python
  - django
  - react
  - typescript
  - nlp
  - rag
  - ollama
  - llm
  - spacy
---

![[Pasted image 20251111073328.png]]

>[!Info] Links del Repositorio
>Back-End: https://github.com/TatoNaranjo/psicologiaPLN
>Front-End: https://github.com/TatoNaranjo/PLNVinetas-FrontEnd

## 1. Resumen Ejecutivo

Este proyecto consiste en el desarrollo de una aplicación web *full-stack* diseñada para funcionar como un asistente de chat para psicólogos. El asistente es capaz de analizar viñetas clínicas proporcionadas por el usuario, manteniéndose estrictamente dentro de su contexto clínico.

La principal característica de esta aplicación es su arquitectura **100% local**. Utiliza un Modelo de Lenguaje Grande (LLM) servido a través de **Ollama** (ej. `phi3:3.8b`) y un sistema de **Generación Aumentada por Recuperación (RAG)** para consultar un corpus de conocimiento local (`corpus.json`). Esto garantiza que ningún dato sensible del paciente abandone la máquina del usuario, eliminando preocupaciones de privacidad y costos de API.

## 2. Objetivos del Proyecto

* **Objetivo General:** Desarrollar una aplicación de chat *full-stack* y local para el análisis de viñetas clínicas usando RAG.
* **Objetivos Específicos:**
    1.  Implementar un **Backend** (API REST) en Django que orqueste el flujo RAG.
    2.  Implementar un **Frontend** de chat en React y TypeScript que interactúe con el backend.
    3.  Construir un **mecanismo de RAG** que utilice `spaCy` para la búsqueda de similitud vectorial contra un corpus JSON.
    4.  Asegurar que el LLM se mantenga **en-tema** (contexto clínico) mediante el uso de *system prompts* robustos.
    5.  Garantizar una operación **100% local** sin dependencia de APIs externas.

## 3. Arquitectura del Sistema

El sistema se divide en tres componentes principales que se ejecutan simultáneamente en la máquina local.

### 3.1. Frontend (`PLNVinetas-FrontEnd`)

Es la interfaz de usuario con la que interactúa el psicólogo.
* **Tecnología:** React, TypeScript, Vite, Tailwind CSS.
* **Función:**
    * Renderiza la interfaz de chat.
    * Mantiene un estado (`messages`) con el historial de la conversación.
    * Al enviar un mensaje, envía el **historial completo** al backend.
    * Recibe la respuesta del backend y la añade al historial del chat.
* **Archivo Clave:** `src/App.tsx`.

### 3.2. Backend (`psicologiaPLN`)

Es el orquestador central que conecta el frontend con la lógica de IA.
* **Tecnología:** Django, Django Rest Framework.
* **Función:**
    * Expone un único endpoint: `/api/analizar_chat/`.
    * Recibe el `history` (historial) del frontend.
    * Llama al módulo `matcher_utils.py` para realizar la **Recuperación** (Retrieval) sobre el último mensaje del usuario.
    * Realiza la **Generación** (Generation) construyendo un *prompt* que incluye el *system prompt*, el historial, y el contexto RAG.
    * Envía este *prompt* a Ollama y devuelve la respuesta al frontend.
* **Archivo Clave:** `api/views.py`.

### 3.3. Cerebro IA (Ollama + RAG)

Es el componente de procesamiento de lenguaje que genera las respuestas.
* **Ollama:** Es el servidor que carga el LLM (ej. `phi3:3.8b`) en la memoria y expone una API (`http://localhost:11434`) para interactuar con él.
* **Lógica RAG (`matcher_utils.py`):**
    1.  **Corpus:** Un archivo `corpus.json` que contiene los diagnósticos (el "conocimiento").
    2.  **Vectorización:** `spaCy` (`es_core_news_md`) se usa para convertir tanto el corpus como la viñeta del usuario en vectores numéricos.
    3.  **Recuperación:** Se utiliza la similitud del coseno para encontrar los `top_k=3` fragmentos del corpus más relevantes para la viñeta del usuario.
    4.  **Aumentación:** Estos fragmentos se "aumentan" (inyectan) en el *prompt* final.

---

## 4. Tecnologías Utilizadas

* **Backend:**
    * Python 3
    * Django & Django Rest Framework
    * Requests (para llamar a Ollama)
* **Frontend:**
    * React 18
    * TypeScript
    * Vite
    * Tailwind CSS
* **IA & NLP:**
    * Ollama (para servir LLMs)
    * `phi3:3.8b` (Modelo de LLM)
    * spaCy (`es_core_news_md`)
    * Numpy (para similitud del coseno)

---

## 5. Flujo de Datos (Paso a Paso)

Este es el flujo completo de una solicitud del usuario:

1.  **Usuario** escribe "Hola" o una viñeta clínica en el chat de React.
2.  **`App.tsx`** actualiza su estado `messages` y envía el *array completo* de mensajes al backend (`http://localhost:8000/api/analizar_chat/`).
3.  **`views.py`** (Django) recibe la petición en la función `analizar_chat`.
4.  La función extrae el último mensaje del usuario.
5.  Llama a `buscar_mas_similar()` con ese mensaje.
6.  **Decisión RAG:** `views.py` comprueba la puntuación de similitud.
    * **Si es baja (< 0.25):** El mensaje es una simple charla (ej. "Hola"). Se omite el paso RAG.
    * **Si es alta (>= 0.25):** El mensaje es una viñeta. Se genera el `contexto_rag` con los 3 mejores resultados.
7.  **Construcción del Prompt:** `views.py` crea un `final_prompt` en formato ChatML, combinando:
    1.  El `SYSTEM_PROMPT` (las reglas del bot).
    2.  El historial de chat previo.
    3.  El `contexto_rag` (si existe).
    4.  El último mensaje del usuario.
8.  `views.py` envía este `final_prompt` al endpoint `/api/generate` de **Ollama**.
9.  **Ollama** procesa el *prompt* con el modelo `phi3:3.8b` y genera una respuesta de texto.
10. `views.py` recibe la respuesta de Ollama, la extrae del JSON (clave `"response"`) y la envía como respuesta al frontend.
11. **`App.tsx`** recibe el JSON, extrae el texto de la respuesta y actualiza el estado `messages`, mostrando la respuesta del asistente en el chat.

---

## 6. Guía de Instalación Rápida

Para ejecutar el proyecto, se necesitan 3 terminales:

* **Terminal 1: Servidor IA (Ollama)**
    ```bash
    # Carga el modelo en memoria y lo mantiene "caliente"
    ollama run phi3:3.8b
    ```

* **Terminal 2: Servidor Backend (Django)**
    ```bash
    # (Navegar a la carpeta 'psicologiaPLN')
    # Activar entorno virtual
    source venv/bin/activate
    # Iniciar servidor
    python manage.py runserver
    ```

* **Terminal 3: Servidor Frontend (React)**
    ```bash
    # (Navegar a la carpeta 'PLNVinetas-FrontEnd')
    # Iniciar servidor de desarrollo
    npm run dev
    ```
    
Acceder a la aplicación en `http://localhost:5173`.

![[Pasted image 20251111073420.png]]

## 7. Conclusiones y Trabajo Futuro

Este proyecto demuestra con éxito la viabilidad de crear herramientas de IA potentes, sensibles al contexto y que priorizan la privacidad, todo utilizando herramientas *open-source* y ejecutándose en hardware de consumo (MacBook Air M1).

**Posibles Mejoras Futuras:**

* **Base de Datos Vectorial:** Reemplazar la búsqueda manual con `spaCy` por una base de datos vectorial dedicada (ej. `LanceDB` o `ChromaDB`) para una recuperación más rápida y escalable.
* **Mejores Embeddings:** Usar un modelo de embeddings más potente que `spaCy`, como `nomic-embed-text`, que ya está instalado.
* **Streaming de Respuestas:** Implementar `stream: True` en la llamada a Ollama y manejar la respuesta en el frontend para que el texto aparezca palabra por palabra, mejorando la UX.
* **Fine-Tuning:** (El objetivo original) Explorar el *fine-tuning* (ej. QLoRA) de un modelo pequeño usando los datos del corpus para que "internalice" el estilo de respuesta clínica, reduciendo la dependencia del RAG en tiempo real.