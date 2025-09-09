---
tags:
  - MOCs
date: 2025-08-12
---
# Índice
- [[Dropouts]]
- [[Pooling]]
- [[SoftMax]]
# Proyecto Gestión del Conocimiento

> Por: Santiago Naranjo Herrera & Daniel Steven Hincapié Cetina

### Prototipo de detección de emociones musicales con recomendación de playlists de mitigación emocional

#### Planteamiento del problema

La música posee una influencia significativa sobre el estado emocional de las personas, siendo utilizada de manera cotidiana como un medio para regular, intensificar o mitigar emociones. En este contexto, el desarrollo de sistemas automáticos que reconozcan las emociones transmitidas por una canción adquiere gran relevancia para aplicaciones como la salud mental, la musicoterapia, los sistemas de recomendación y las plataformas de streaming.

Si bien existen avances en la detección de emociones musicales mediante técnicas de inteligencia artificial, la mayoría de los sistemas actuales se limitan únicamente a clasificar el estado emocional, sin ofrecer una acción posterior que genere un impacto positivo en el usuario. En consecuencia, se desaprovecha la oportunidad de que la música funcione como herramienta reguladora de emociones, especialmente en escenarios donde se requiere contrarrestar estados negativos como tristeza, enojo o ansiedad.

De ahí surge la necesidad de diseñar un sistema que no solo detecte con cierta precisión la emoción predominante en una canción, sino que además  genere automáticamente una playlist con emociones opuestas o complementarias, orientada a mitigar o equilibrar el estado emocional detectado. Para asegurar su eficacia, el sistema debe ser evaluado con métricas de rendimiento estándar en clasificación y con indicadores de calidad de la recomendación musical.

Este proyecto es relevante porque propone una solución innovadora y aplicable en diversos contextos: desde plataformas de entretenimiento personalizadas hasta herramientas de apoyo emocional, contribuyendo al bienestar de los usuarios mediante el uso consciente y estratégico de la música.

#### Objetivo General

Crear un sistema inteligente que, a partir de la emoción seleccionada de un usuario, recomiende playlists orientadas a regular o mitigar el estado emocional del usuario, combinando precisión en la detección y la calidad en las recomendaciones.
#### Objetivos específicos

1. Recolectar y preparar un dataset de canciones etiquetadas con emociones(felicidad, tristeza, ira, calma, etc.) que permita entrenar y evaluar modelos de detección emocional.
    
2. Implementar y optimizar un modelo de detección de emociones en canciones utilizando técnicas de deep learning para el procesamiento de audio y aprendizaje automático, 
    
3. Diseñar un algoritmo de recomendación musical que, a partir de la emoción detectada en una canción, sugiera automáticamente una playlist con emociones opuestas o reguladoras.
    
4. Evaluar la calidad del modelo mediante métricas de precisión como recall o F1-score.