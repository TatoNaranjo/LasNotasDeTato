---
date: 2025-08-22
---

Un sistema se describe como un proceso o una colección de subsistemas que se relacionan entre si mediante funciones de transferencia. Pueden ser eléctricos, mecánicos, hidráulicos, energéticos o de software.

Para analizar un sistema se pueden utilizar dos "grandes mundos" o dominios:

**El Dominio del Tiempo (t):** Se usan ecuaciones diferenciales para describir el proceso.
**Dominio de la Frecuencia (F):** Se usan polinomios para describir el proceso.

Para convertir del dominio del tiempo al de la frecuencia se utiliza la transformada de laplace, representada con el operador $s$.

La función de transferencia ($G(s)$) es una forma de describir un sistema y se define como la relación entre la salida ($Y(s)$) y la entrada ($X(s)$) del sistema.

## Tipos de Sistemas
### Sistemas de Lazo Abierto:

- La información fluye en una sola dirección, desde la entrada hasta la salida.
- El funcionamiento solo depende de la entrada y no considera la salida.
- Son sensibles a señales externas y pueden volverse inestables fácilmente, ya que la salida puede variar de cualquier manera.
- La salida se define por la siguiente ecuación $y(s)= G(s)X(s)$

### Sistemas de Lazo Cerrado:
- Consideran la salida para ajustar el proceso.
- Parte de la salida se usa como retroalimentación para controlar el sistema.