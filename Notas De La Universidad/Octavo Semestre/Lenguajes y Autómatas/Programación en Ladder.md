---
date: 2025-02-20
tags:
  - OctavoSemestre
---
> By: TatoNaranjo

Es un lenguaje normalmente utilizado en los PLCs, el cual fue la clave del éxito para la programación de los mismos dentro del mundo de los electricistas debido a que utiliza diagramas eléctricos basados en diagramas de relés (un relé es un componente que funciona como una compuerta que funciona como un interruptor impulsado por señales eléctricas). Así mismo, permite abrir o cerrar contactos mediante un electroimán, lo cual también hace que reciban el nombre de relés electromagnéticos o relevador.

## Estructura de un Programa

Se le llama Ladder porque su estructura es muy parecida a la de una escalera. En donde las lineas verticales son una representación del estado energía. La linea vertical de la izquierda representa el **Terminal de Alimentación** (24V), mientras que la linea vertical derecha representa el **Terminal de Masa** (0V). Las lineas verticales son llamadas **Rung** o **Escalón**, en donde en el lado izquierdo están las partes que son denominadas como condiciones (que provienen de entradas del PLC, Relés Internos, Salidas de Bloques de Funciones), mientras que el lado derecho son las acciones que se realicen (Que corresponden a salidas internas o relés internos).

![[Pasted image 20250220154654.png]]

## Simbología

![[Pasted image 20250220155131.png]]

### Contacto Normalmente Abierto
Permite el paso de la energía cuando hay un 1 lógico en el elemento que representa, que puede ser una variable física o una variable interna. La energía puede pasar cuando se energiza la bobina.
### Contacto Normalmente Cerrado
Permite el paso de la energía cuando hay un 0 lógico en el elemento que representa, el cual puede ser una entrada física o una variable interna. 
### Bobina Normalmente Abierta
Se energiza cuando la combinación lógica que hay a la izquierda tienen como resultado un 1 lógico. Puede representar una salida o una variable interna.
### Bobina Normalmente Cerrada
Se energiza cuando la combinación lógica que hay a su izquierda (condiciones) tienen como resultado un 0 lógico.
### Bobina Set
Una vez activa con un 1 lógico no puede desactivarse.
### Bobina Reset 
Permite desactivar una bovina set previamente activada.

## Reglas de Ejecución

- Un Programa escrito en Ladder se ejecutará de Renglón en Renglón, de Arriba hacia Abajo y de Izquierda a Derecha. Primero evalúa todas las reglas y luego las ejecuta.
 
![[Pasted image 20250220160801.png]]

