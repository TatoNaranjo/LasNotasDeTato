---
date: 2025-10-13
---

# **Informe de Avance: Prototipo de Detección de Emociones Musicales**

**Autor:** Daniel Steven Hincapié Cetina & Santiago Naranjo Herrera
**Fase del Proyecto:** Preparación y Análisis del Dataset

## **1. Resumen Ejecutivo**

Este informe detalla los avances iniciales correspondientes al **Objetivo Específico 1**: "Recolectar y preparar un dataset de canciones etiquetadas con emociones". 

Se ha seleccionado exitosamente un dataset estándar en la industria, se han procesado sus anotaciones para adaptarlas a los requerimientos del proyecto y se ha realizado un análisis exploratorio para validar la calidad y coherencia de los datos preparados.

## **2. Selección del Dataset: DEAM**

Para asegurar la robustez y replicabilidad del proyecto, se seleccionó el dataset **DEAM (Database for Emotion Analysis using Music)**.

- **Relevancia:** Es uno de los datasets más reconocidos y utilizados en la investigación de música y emoción.
-
- **Modelo de Anotación:** Utiliza el modelo dimensional de **Valencia-Excitación (Valence-Arousal)**, que describe las emociones en dos ejes continuos:
    
    - **Valencia:** El nivel de placer o positividad (de negativo a positivo).
    - **Excitación (Arousal):** El nivel de energía o intensidad (de calma a agitación).

Esta aproximación es más rica y matizada que las etiquetas categóricas simples, proporcionando una base de datos de alta calidad para el entrenamiento del modelo.

## **3. Procesamiento y Etiquetado de Datos**

El principal desafío fue convertir las anotaciones dimensionales (valores numéricos de 1 a 9) en las cuatro categorías discretas necesarias para el modelo: **Felicidad, Tristeza, Ira y Calma**.

Para lograrlo, se implementó una lógica de mapeo basada en los cuatro cuadrantes del modelo Valencia-Excitación, utilizando un script de Python con la librería `pandas`.

- **Cuadrante 1 (Valencia alta, Excitación alta):** `Felicidad` 😃
    
- **Cuadrante 2 (Valencia baja, Excitación alta):** `Ira` 😠
    
- **Cuadrante 3 (Valencia baja, Excitación baja):** `Tristeza` 😢
    
- **Cuadrante 4 (Valencia alta, Excitación baja):** `Calma` 😌
    

El siguiente fragmento de código ilustra la función clave de esta transformación:

Python

```python
def get_emotion_from_va(valence, arousal):
    """
    Clasifica la emoción en una de cuatro categorías basándose
    en los valores de Valencia y Excitación (escala 1-9).
    """
    if valence >= 5 and arousal >= 5:
        return 'Felicidad'
    elif valence < 5 and arousal >= 5:
        return 'Ira'
    elif valence < 5 and arousal < 5:
        return 'Tristeza'
    elif valence >= 5 and arousal < 5:
        return 'Calma'
    return None
```

Este proceso se aplicó exitosamente al archivo `static_annotations_averaged_songs.csv`, generando un dataset limpio y etiquetado, listo para la siguiente fase.

## **4. Análisis Exploratorio de Datos (AED)**

Para validar el procesamiento y comprender la estructura de nuestro nuevo dataset, se generaron cuatro visualizaciones clave utilizando `matplotlib` y `seaborn`.

1. **Conteo de Canciones por Emoción:** Se confirmó que el dataset posee una distribución relativamente balanceada entre las cuatro categorías, lo cual es fundamental para evitar sesgos en el futuro modelo de IA.
    
2. **Mapa Emocional (Valencia vs. Excitación):** Este gráfico de dispersión validó visualmente que nuestra lógica de mapeo funcionó correctamente, mostrando una clara separación de las cuatro emociones en sus respectivos cuadrantes.
    
3. **Distribución de Valencia por Emoción:** El diagrama de cajas demostró la coherencia de los datos, confirmando que las emociones `Felicidad` y `Calma` presentan consistentemente valores altos de valencia, y viceversa para `Ira` y `Tristeza`.
    
4. **Distribución de Excitación por Emoción:** De manera similar, el diagrama de violín validó que `Felicidad` e `Ira` son emociones de alta energía, mientras que `Tristeza` y `Calma` son de baja energía.
    

## **5. Conclusiones y Próximos Pasos**

Se ha completado con éxito la primera fase del proyecto. Ahora contamos con un **dataset robusto, limpio, etiquetado y validado**, que servirá como cimiento para el desarrollo del modelo de detección.

Los próximos pasos se centrarán en el **Objetivo Específico 2**:

1. **Extracción de Características de Audio:** Procesar los archivos `.mp3` correspondientes a cada `song_id` para convertirlos en una representación numérica que el modelo pueda entender (ej. Espectrogramas Mel) utilizando la librería `Librosa`.
    
2. **Diseño y Entrenamiento del Modelo:** Construir y entrenar una Red Neuronal Convolucional (CNN) con los espectrogramas y las etiquetas emocionales que hemos preparado.