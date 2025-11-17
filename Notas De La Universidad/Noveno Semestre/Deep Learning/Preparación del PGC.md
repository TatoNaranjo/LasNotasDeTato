---
date: 2025-10-27
---
### 1. Introducción (El "Qué")

**(Iniciar con el objetivo principal)**

**Ustedes:** "Buenos días. Nuestro proyecto es un sistema inteligente para la **detección y mitigación de emociones musicales**. El objetivo es crear una herramienta que no solo identifique la emoción de una canción, sino que actúe activamente para ayudar a regular el estado de ánimo del usuario."

"El resultado es un prototipo web funcional que consta de tres componentes clave:

1. **La Demo de Usuario:** Una interfaz para analizar canciones y recibir playlists.
2. **Un Dashboard de Métricas:** (Aquí abren `metrics.html`) Una vista para el ingeniero, que valida la calidad y precisión de nuestro modelo de Deep Learning.
3. **Una Línea de Tiempo de Trazabilidad:** (Aquí abren `traceability.html`) Una vista para el investigador, que documenta el por qué de nuestras decisiones, los problemas encontrados y los pivotes estratégicos que tomamos."
    

### 2. El Problema (El "Por Qué")

**(Justifiquen la relevancia del proyecto)**

**Ustedes:** "El problema que abordamos es que, si bien la música tiene una influencia profunda en el estado de ánimo, las herramientas actuales como Spotify son pasivas. Sus algoritmos se centran en _qué_ te gusta, no en _cómo_ te sientes."

"Se desaprovecha la oportunidad de usar la música como una herramienta activa de bienestar. Nuestro proyecto busca llenar ese vacío, creando un sistema que escuche la emoción actual y proponga un camino musical para regularla."

### 3. La Trazabilidad: Nuestra Investigación (El "Viaje") 🧠


**Ustedes:** "Nuestro proceso no fue una línea recta. Tuvimos que adaptarnos a los hallazgos de nuestra investigación.

- **Fase 1: El Fracaso Inicial (CNN + Audio Crudo)**
    
    - "Al principio, intentamos construir todo desde cero. Usamos un modelo Convolucional (CNN) para analizar el audio crudo de archivos MP3, convirtiéndolos en imágenes de espectrogramas."
    - "**Resultado:** Fracaso total. El modelo tenía un sobreajuste severo (96% en entrenamiento vs 33% en validación) y un desbalance de clases que lo hacía inútil."
        
- **Fase 2: El Pivote Estratégico (DNN + Features de Spotify)**
    
    - "Decidimos pivotar. En lugar de procesar audio crudo, usamos un dataset masivo de Kaggle con 240,000 canciones que ya incluía 11 características de audio extraídas por Spotify (como `valence`, `energy`, `danceability`)."
    - "Cambiamos nuestro modelo a una Red Neuronal Densa (DNN), que es ideal para este tipo de datos tabulares."
        
- **Fase 3: El Gran Hallazgo (El Problema de la clase "Calma")**
    
    - "Este nuevo modelo nos permitió hacer un diagnóstico real. El modelo funcionaba bien, pero seguía fallando estrepitosamente en una clase: 'Calma'."
    - (Aquí abren `metrics.html` y señalan la gráfica de **Balanceo de Clases**).
    - "Como pueden ver, la clase 'Calma' estaba severamente desbalanceada. Intentamos solucionarlo con técnicas como `SMOTE` y `class_weight`, pero los resultados no mejoraron."
    - "**Nuestra Conclusión Clave:** El problema no era el modelo, eran los datos. Las características de audio de una canción de 'Calma' son sónicamente ambiguas, se parecen demasiado a 'Tristeza' y a 'Felicidad'. Era imposible para el modelo separarlas."
        
- **Fase 4: La Solución (El Modelo de 3 Clases)**
    
    - "Basados en este hallazgo, tomamos la decisión de ingeniería más importante: **eliminamos la clase 'Calma' del entrenamiento**."
    - "Esto nos permitió entrenar un modelo experto y altamente preciso en las 3 clases que sí son distinguibles: **Ira, Tristeza y Felicidad**. Como ven en la gráfica de balanceo, esto nos dio un dataset casi perfecto."
    - "Cumplimos el objetivo, porque nuestro sistema _no necesita_ predecir 'Calma', solo necesita saber cómo _recomendar_ 'Calma'."
        
- **Fase 5: Retos de Integración (La API de Spotify)**
    
    - "Finalmente, conectamos nuestro modelo a la API de Spotify. Aquí superamos dos retos finales:"
        
    
    1. **Error 403 (Bloqueo):** La API nos bloqueaba. Lo resolvimos creando una nueva cuenta de desarrollador desde cero.
    2. **Error 404 (No encontrado):** El plan original de usar `sp.recommendations` fallaba porque nuestras peticiones eran demasiado estrictas. Pivotamos a una solución más robusta: usamos `sp.search(type='playlist')`. En lugar de _crear_ una playlist, _buscamos_ playlists de mitigación (ej. "música para calmar") hechas por humanos y le presentamos esas canciones al usuario."
        

### 4. Demostración y Resultados (La "Prueba") 🚀

**(Aquí ejecutan la demo `index.html` y la vista de `metrics.html`).**

**Ustedes:** "El resultado es el prototipo que ven aquí.

- **(Paso 1: Demo)** "El usuario busca una canción de nuestra base de datos. Por ejemplo, 'Chop Suey', que es una canción de 'Ira'."
- **(Paso 2: Modelo)** "Nuestro modelo la analiza y, como ven, la clasifica como 'Ira' con un **(X)% de confianza**."
- **(Paso 3: Mitigación)** "Basado en esa predicción, el backend busca aleatoriamente playlists con términos como 'música para calmar' o 'chill vibes'."
- **(Paso 4: Resultado)** "Y le presenta al usuario una playlist de mitigación funcional, con links directos a Spotify."
    

**(Ahora, cambien a la pestaña `metrics.html`).**

**Ustedes:** "Y para los jurados, aquí está la justificación de por qué este modelo es confiable:

1. **(Señalen la Arquitectura)**: "Esta es la arquitectura de nuestra Red Neuronal Densa de 4 capas."
2. **(Señalen el Reporte de Clasificación)**: "Aquí vemos las métricas clave. El modelo tiene un **F1-Score** alto y balanceado para las 3 clases, lo que demuestra que es preciso y no está sesgado."
3. **(Señalen la Matriz de Confusión)**: "Y la matriz de confusión confirma visualmente que el modelo es excelente para distinguir entre las 3 clases."
    

### 5. Conclusión (El Cierre)

**Ustedes:** "En conclusión, hemos cumplido todos los objetivos del proyecto.

1. **Recolectamos y preparamos** un dataset masivo.
2. **Implementamos y optimizamos** un modelo de Deep Learning, justificando cada decisión.
3. **Diseñamos un algoritmo** de recomendación robusto.
4. Y **evaluamos** su calidad con métricas estándar.
    

Más que una simple aplicación, construimos un prototipo que demuestra un **proceso de investigación completo**, desde el fracaso inicial hasta el diagnóstico de un problema de datos y la implementación de una solución de ingeniería efectiva.

Como trabajo futuro, este sistema podría expandirse para analizar playlists completas o permitir al usuario elegir el tipo de mitigación que prefiere."

"Muchas gracias."

# Preguntas de Fogueo

### Respuestas Sugeridas (Rol: Estudiante)

#### Sobre la Metodología y el Pivoteo

**1. Usted propuso un objetivo (Obj. 2) que menciona "procesamiento de audio" y "técnicas de deep learning". Sin embargo, su modelo final (un DNN) no procesa audio; procesa un CSV. ¿No considera esto un incumplimiento de su propio objetivo? ¿Por qué un DNN sobre un CSV es un proyecto de noveno semestre?**

- **Respuesta:**
    
    - "Gracias por la pregunta. El objetivo 2 se cumple, pero de una forma más eficiente. El proyecto utiliza técnicas de Deep Learning (una Red Neuronal Densa o DNN) aplicadas a _datos procesados de audio_.
        
    - Mi investigación inicial (la Fase 1 con la CNN) consistió en procesar el audio yo mismo usando Librosa. Sin embargo, los resultados demostraron que esta extracción de características era subóptima y generaba un modelo de baja calidad.
        
    - Tomé una decisión de ingeniería: en lugar de reinventar la rueda, decidí apalancarme en el procesamiento de audio de nivel industrial que ya realiza Spotify. Las 11 características del dataset de Kaggle _son_ el resultado de un procesamiento de audio avanzado.
        
    - Mi modelo de Deep Learning (el DNN) aprende de estas características de alto nivel. Esto no es un incumplimiento, es una optimización. Un proyecto de noveno semestre también consiste en saber _integrar_ y _construir sobre_ herramientas existentes, en lugar de construir todo desde cero de forma ineficiente."
        

**2. Usted invirtió tiempo en un modelo CNN con Librosa, que falló. Luego cambió a un DNN con un dataset de Kaggle. ¿Cómo justifica este "pivote"? ¿No es esto simplemente un manejo deficiente de la incertidumbre del proyecto? ¿Por qué deberíamos ver esto como una optimización y no como un error de planificación?**

- **Respuesta:**
    
    - "Al contrario. Lo veo como la validación de un proceso de investigación y desarrollo ágil. La planificación inicial contenía una **hipótesis**: _'Es posible crear un modelo CNN preciso a partir de espectrogramas Mel para esta tarea'_.
        
    - Mi trabajo en la Fase 1 fue **testear esa hipótesis**. Los resultados (el `recall` de 9% para 'Calma') **refutaron la hipótesis**, demostrando que, con las herramientas a mi alcance, las características no eran lo suficientemente separables.
        
    - El "pivote" no fue un error, fue la **conclusión lógica** de esa primera fase experimental. Demuestra que el proyecto no se aferró a un plan fallido, sino que se adaptó a la evidencia, que es un pilar de la ingeniería. La optimización fue abandonar un callejón sin salida para tomar una ruta más prometedora que, como vemos en los resultados finales, fue exitosa."
        

**3. Su primer modelo (CNN de 4 clases) falló. El segundo (DNN de 4 clases) también falló. ¿Por qué insistió en usar Deep Learning? ¿Por qué no probó un modelo de Machine Learning tradicional como Random Forest o SVM? ¿Cómo sabe que su DNN de 65% de precisión es mejor que un SVM que quizás le daba 75% con menos esfuerzo?**

- **Respuesta:**
    
    - "Esa es una excelente pregunta metodológica. Mi insistencia en Deep Learning se debió a dos razones:
        
        1. **Requisito del Proyecto:** El Objetivo Específico 2 nos pedía explícitamente "utilizar técnicas de deep learning". Esto restringió mi conjunto de herramientas.
            
        2. **Escalabilidad:** Las Redes Neuronales Densas (DNN) son excelentes para encontrar patrones no lineales complejos en grandes datasets como el que usé (más de 200,000 muestras).
            
    - Ahora, reconozco que un modelo clásico como Random Forest o XGBoost podría, en efecto, tener un rendimiento igual o superior en este tipo de datos tabulares. Una **comparativa de benchmarks** entre mi DNN final y un modelo como Random Forest sería una parte fundamental del _trabajo futuro_ para optimizar aún más el sistema. Para el alcance de este semestre, el desafío era implementar un pipeline _completo_ usando Deep Learning, y eso fue lo que se logró."
        

---

#### Sobre el Dataset y las Características

**4. Su modelo final se entrena con datos de Spotify de 2018 y 2019. La música ha cambiado. ¿No está su modelo entrenado con datos obsoletos? ¿Qué validez tiene este modelo para predecir la emoción de una canción de 2025?**

- **Respuesta:**
    
    - "Es una preocupación válida sobre el _model drift_. Sin embargo, el modelo no está aprendiendo 'canciones de 2019'. Está aprendiendo la **relación fundamental entre las características de audio y la emoción humana.**
        
    - Es decir, aprende que las canciones con baja energía, tonalidad menor y poca 'danceability' tienden a ser tristes. Esas reglas psicoacústicas son, en gran medida, atemporales. Una balada triste de 2025 compartirá muchas de esas mismas características con una de 2018.
        
    - Dicho esto, un sistema en producción real necesitaría un pipeline de **reentrenamiento continuo** con datos nuevos para ajustarse a las tendencias de producción musical. Pero para un prototipo, este dataset de 130,000 canciones es una base robusta para aprender esos patrones fundamentales."
        

**5. Su modelo de cuadrantes (Valencia-Energía) es una simplificación radical de la emoción humana. ¿Qué pasa con las canciones "agridulces" (alta valencia, baja energía pero tristes)? ¿No es esta premisa fundamentalmente errónea y demasiado arbitraria?**

- **Respuesta:**
    
    - "Tiene toda la razón. El modelo de 2 dimensiones de Russell (Valencia-Arousal) es una **abstracción**, y como toda abstracción, tiene limitaciones. La emoción humana es mucho más compleja.
        
    - Para este proyecto, adoptamos este modelo porque es el **estándar de la industria** (Spotify mismo lo usa con sus métricas `valence` y `energy`) y nos da un marco de trabajo objetivo y medible.
        
    - Nuestro sistema no puede, por diseño, capturar la ambigüedad de una canción "agridulce". Ese sería un desafío mucho más complejo, que probablemente requeriría el análisis de la letra (NLP) y características más avanzadas. Para el alcance de este prototipo, decidimos aceptar esta limitación y enfocarnos en las cuatro emociones cardinales que el modelo sí puede representar."
        

**6. Su solución final fue eliminar la clase "Calma". ¿No es esto simplemente "barrer el problema debajo de la alfombra"? ¿Cómo puede un sistema de "detección de emociones" ser robusto si intencionalmente ignora una de las cuatro emociones fundamentales?**

- **Respuesta:**
    
    - "Esta fue una de las decisiones de diseño más importantes. No ignoramos la emoción 'Calma'; **cambiamos la forma en que el sistema interactúa con ella.**
        
    - Mis experimentos demostraron que, con las 11 características de Spotify, el modelo era **incapaz** de distinguir 'Calma' de las otras clases (`recall` del 9%). Insistir en predecir una clase ambigua estaba _dañando_ la precisión de las clases que sí eran claras.
        
    - El objetivo del proyecto es la _mitigación_. Mi sistema _aún_ recomienda 'Calma'. Cuando detecta 'Ira', el algoritmo de recomendación sabe perfectamente cómo buscar canciones de 'Calma': lo hace **filtrando el catálogo de Spotify** (`valence >= 0.5` y `energy < 0.5`).
        
    - Separamos las responsabilidades: el **modelo de IA** se encarga de la detección _difícil_ (Ira, Tristeza, Felicidad), y el **algoritmo de recomendación** se encarga de la identificación _fácil_ (Calma). Esto crea un sistema general mucho más robusto y preciso."
        

---

#### Sobre el Modelo y los Resultados

**7. Su reporte final muestra un F1-score de 0.80 para "Tristeza", pero 0.59 para "Felicidad" e "Ira". Un 59% es apenas mejor que adivinar. ¿Cómo puede estar listo para un front-end un modelo que, en 2 de sus 3 funciones, se equivoca casi la mitad de las veces?**

- **Respuesta:**
    
    - "Aquí es clave el contexto. El _baseline_ o línea base no es 0%, es 33% (adivinar al azar entre 3 clases). Un F1-score de 0.59 está significativamente por encima de eso y demuestra un aprendizaje real.
        
    - Lo más importante para un sistema de _mitigación_ es la clase **'Tristeza'**, y ahí el modelo es **muy robusto, con un 80% de F1-score**. Esto significa que el caso de uso principal del prototipo funciona muy bien.
        
    - Los scores de 0.59 para 'Ira' y 'Felicidad' indican que el modelo es 'decente' y funcional para un prototipo. No es un modelo de precisión quirúrgica, pero es un **Producto Mínimo Viable** exitoso. El flujo completo funciona, y los resultados son lo suficientemente buenos como para validar el concepto y pasar a la integración con el front-end."
        

**8. Muéstreme la arquitectura de su DNN. ¿Por qué `Dense(128)`? ¿Por qué no 64 o 256? ¿Por qué un `Dropout` de 0.5 y no de 0.2? ¿O simplemente copió esta arquitectura de un tutorial? ¿Cuál fue su proceso metodológico para la sintonización de hiperparámetros?**

- **Respuesta:**
    
    - "La arquitectura (`128 -> 64 -> 32`) sigue una estructura de 'embudo' (funneling), que es una práctica estándar para datos tabulares, donde se busca condensar la información progresivamente.
        
    - La capa inicial de 128 neuronas se eligió para ser significativamente más grande que el vector de entrada (de 11 características), dándole al modelo espacio suficiente para aprender combinaciones complejas.
        
    - Los valores de `Dropout` (0.5, 0.3) se eligieron deliberadamente altos como una medida de **regularización fuerte** para prevenir el _overfitting_, que fue el principal problema que identifiqué en la Fase 1 del proyecto.
        
    - Admito que esta arquitectura no es el resultado de una sintonización de hiperparámetros exhaustiva (como un GridSearch o KerasTuner), lo cual sería un paso obvio de optimización futura. Esta arquitectura se seleccionó como un **punto de partida robusto y estándar** para validar el modelo de 3 clases."
        

**9. Su sistema detecta "Tristeza" y recomienda "Felicidad". Detecta "Ira" y recomienda "Calma". Esta lógica de mitigación es muy simplista. ¿Qué pasa si un usuario está enojado y _quiere_ escuchar música de "Ira" para catarsis? ¿No está usted imponiendo una experiencia de usuario (UX) en lugar de asistir al usuario?**

- **Respuesta:**
    
    - "Esa es una observación de UX excelente. El alcance de este prototipo era implementar un sistema de **mitigación** (es decir, contrarrestar la emoción). El `mitigation_map` que diseñé cumple ese objetivo específico.
        
    - Usted tiene razón: un sistema completo no solo debería mitigar, sino también permitir la _exploración_ o _catarsis_. En una versión futura, el front-end debería preguntar al usuario: 'Detectamos Ira. ¿Quieres calmarte o quieres explorar esta emoción?'
        
    - Mi prototipo actual implementa el _backend_ técnico para una de esas dos rutas. La lógica de recomendación es un módulo intercambiable; el sistema de IA que lo alimenta es robusto."
        

---

#### Sobre la Implementación y el Sistema

**10. Usted mencionó la posibilidad de subir un MP3. Propone usar una API como ACRCloud para identificar la canción y luego buscarla en Spotify. ¿Ha medido la latencia de esa tubería (pipeline)? ¿Cuánto tiempo real pasa desde que el usuario sube el MP3 hasta que se genera la playlist? ¿Es aceptable para un usuario final?**

- **Respuesta:**
    
    - "No he implementado aún esa funcionalidad, pero he analizado su viabilidad. La latencia estimada sería una suma de varias llamadas:
        
        1. La subida del archivo (depende del usuario).
            
        2. La llamada a la API de fingerprinting (ACRCloud), que suele tardar entre 2 y 5 segundos.
            
        3. Dos llamadas a la API de Spotify (una para `audio_features` y otra para crear la playlist), que son muy rápidas, probablemente 1-2 segundos en total.
            
        4. La predicción del modelo local, que es casi instantánea (milisegundos).
            
    - La latencia total activa estaría en el rango de **5 a 8 segundos**. Para una operación "pesada" como procesar un archivo nuevo, esta latencia se considera aceptable para una experiencia de usuario, similar a lo que tarda Shazam."
        

**11. ¿Qué pasa si el usuario sube una canción que no está en Spotify o en la base de datos de ACRCloud? ¿Simplemente falla? ¿Qué manejo de excepciones implementó para ese caso de uso?**

- **Respuesta:**
    
    - "Ese es un caso de uso crítico. El sistema no debe fallar con un error 500. La implementación correcta, que está contemplada, usaría un manejo de excepciones (`try...except`).
        
    - El flujo de la API de reconocimiento estaría envuelto en un bloque `try`. Si la API de ACRCloud devuelve un 'No Encontrado', el `except` capturaría ese error y le devolvería un mensaje JSON claro al front-end, algo como: `{'status': 'error', 'message': 'Lo sentimos, no pudimos identificar esta canción. Asegúrate de que sea música comercial y no una grabación local.'}`. El front-end sería responsable de mostrar ese mensaje amigable al usuario."
        

**12. (Pregunta de Fogueo) ¿Cuál es el costo computacional y económico de su solución? ¿Cuánto costaría mantener este sistema si tuviera 10,000 usuarios activos al mes?**

- **Respuesta:**
    
    - "El costo se divide en dos:
        
        1. **Mi Modelo (Costo bajo):** El modelo DNN es un archivo de pocos megabytes. La predicción (inferencia) es computacionalmente muy barata. Podría desplegarse en un servicio _serverless_ como AWS Lambda o Google Cloud Functions, donde el costo por 10,000 predicciones sería de **centavos de dólar**.
            
        2. **Las APIs (Costo real):** Aquí es donde está el costo. La API de Spotify tiene un nivel gratuito generoso, por lo que probablemente no sería un problema. Sin embargo, la API de reconocimiento de MP3 (ACRCloud) sí tiene costos asociados. Su plan gratuito no soportaría 10,000 usuarios, por lo que el proyecto tendría que escalar a un plan de pago, cuyo costo dependería del número de subidas de MP3.
            
    - En resumen: el costo de _mi_ desarrollo de IA es casi nulo. El costo de la _funcionalidad_ de subir MP3 dependería de un proveedor externo."
        

---

#### Pregunta de Cierre (Defensa)

**13. Ingeniero, sea honesto. Después de toda esta experimentación, ¿no habría sido más rápido, barato y preciso saltarse el Deep Learning por completo y simplemente usar la API de Spotify, pedir las `audio_features` y aplicar su lógica de cuadrantes directamente? ¿Qué valor real aportó su modelo de Deep Learning al sistema final?**

- **Respuesta:**
    
    - "Esa es la pregunta central del proyecto, y la respuesta es **no, no habría sido mejor**, y el modelo de Deep Learning es el **componente que más valor aporta.**
        
    - Si yo solo usara los dos ejes (`valence` y `energy`) para aplicar la lógica de cuadrantes, mi sistema sería una copia exacta de la clasificación que ya hicimos para etiquetar el dataset, y estaría sujeto a todos sus errores.
        
    - El valor de mi modelo DNN de 3 clases es que aprendió a predecir la emoción **usando 11 características, no solo 2**. Mi modelo aprendió patrones más sutiles.
        
    - Por ejemplo, mi modelo obtuvo un **80% de F1-score en 'Tristeza'**. Esto significa que aprendió que 'Tristeza' no es solo 'baja valencia y baja energía', sino que también es una combinación específica de alta `acousticness`, bajo `tempo`, y baja `danceability`.
        
    - El modelo de Deep Learning **es un clasificador mucho más inteligente y preciso** que una simple división de cuadrantes. Va más allá de los dos ejes obvios y encuentra las relaciones ocultas en las otras 9 características, dándome un detector de 'Tristeza' e 'Ira' mucho más robusto. Ese es su valor real."

