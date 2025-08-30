---
date: 2025-08-30
---
# Cómo Resolver Circuitos Eléctricos?

> Por: Santiago Naranjo Herrera (Tato)


Hey chicos, soy Tato. Para poder entender cómo resolver el ejercicio que me mencionan y prepararse para futuros parciales he preparado una guía básica con los conceptos básicos que deberían saber.

Para resolver el ejercicio que me mencionan, no necesitan ser expertos en circuitos, pero sí entender tres conceptos básicos que son la base de la electrónica: el **voltaje**, la **corriente** y la **resistencia**. Una vez que los dominen, todo se vuelve mucho más sencillo.

### 1. Concepto de Voltaje (V)

Imaginen que el **voltaje** es como la presión del agua en una tubería.

- **Presión alta (más voltaje):** El agua sale con mucha fuerza. En un circuito, esto significa que hay una "fuerza" que empuja a los electrones.
- **Presión baja (menos voltaje):** El agua sale con poca fuerza. En un circuito, hay menos "fuerza" empujando a los electrones.
 
En el ejercicio, la fuente de voltaje ($100 V$) es la que "empuja" a la corriente a través de todo el circuito. El voltaje en una resistencia, como $V4​$ o $V2$​, es la "caída de presión" que ocurre cuando la corriente pasa a través de ella.

---
### 2. Concepto de Corriente (I)

Si el voltaje es la presión, la **corriente** es el flujo de agua en la tubería.

- **Corriente alta:** Mucha agua fluye por segundo. En un circuito, muchos electrones pasan por un punto en un segundo.
- **Corriente baja:** Poca agua fluye por segundo. En un circuito, pocos electrones pasan por un punto en un segundo.

La corriente se mide en Amperios ($A$). En un circuito en serie, la corriente es la misma en todos los componentes. En un circuito en paralelo, la corriente se divide. Esto es clave para entender cómo funciona un circuito como el de nuestro ejercicio.

---
### 3. Concepto de Resistencia (R)

Si el voltaje es la presión y la corriente es el flujo, la **resistencia** es lo que se opone a ese flujo.

- **Resistencia alta:** Es como una tubería muy estrecha que no deja pasar mucha agua. En un circuito, un componente con alta resistencia reduce el flujo de corriente. 
- **Resistencia baja:** Es como una tubería ancha que deja pasar mucha agua. Un componente con baja resistencia deja pasar fácilmente la corriente.
    

>[!check] Dato Globito
La resistencia se mide en Ohmios (Ω). Es importante recordar que **1 Kiloohmio (kΩ) = 1000 Ohmios (Ω)**.

---

### Ley de Ohm: La Regla de Oro

Estos tres conceptos están conectados por una de las leyes más importantes de la electrónica: la Ley de Ohm.

La fórmula es: $V=I×R$

- **Voltaje (V):** Es igual a...
- **Corriente (I):** multiplicada por...
- **Resistencia (R).**

Esta fórmula permite calcular cualquier valor si conoces los otros dos. Por ejemplo, si quieren saber la corriente que pasa por una resistencia, la despejan: $I=RV​$.

### El Puente de Wheatstone: Un Caso Especial

El ejercicio 3 desde mi punto de vista, parece ser un **Puente de Wheatstone**, que usa estos conceptos de una forma muy específica. Si no estoy mal, recuerdo que este circuito tiene una propiedad especial: se puede "equilibrar" para que el voltaje en dos puntos sea el mismo, o lo que es lo mismo, que no haya corriente entre ellos. Esto sucede cuando la multiplicación de las resistencias en diagonal es igual:

$R1​×Rx​=R2​×R4​$

---

### ¿Cómo pueden llegar a abordar el ejercicio?

1. **Identifiquen el tipo de circuito:** Tienen que investigar más a profundidad y reconocer qué es un **Puente de Wheatstone**.
2. **Entiendan la condición:** El problema dice que **V4​ debe ser igual a V2​**. Esto es la señal de que el circuito debe estar en **equilibrio**.
3. **Usen la fórmula correcta:** Cómo podemos buscar un equilibrio entre el voltaje en 2 puntos?.
4. **Sustituir y despejar:** Coloquen los valores que les dan y despejen la resistencia que no conocen (Rx​).
    

Entonces, ya teniendo estos conceptos claros, pueden empezar a diseñar un circuito con la equivalencia que están solicitando, y además van a tener una base sólida para entender otros circuitos más complejos. Es como aprender las reglas básicas de un juego antes de empezar a jugar.