---
date: 2023-02-05
tags:
  - DesarrolloDeSoftware
---

Clase de la cuarta semana para [[Ingeniería de Software II]].

# Arquitectura Monolítica
Aquello que desarrollamos en el semestre pasado para Ingeniería de Software I
## Pros:
- Se realiza un desarrollo rápido de aplicaciones
- Con un solo proyecto se llega a la solución de un problema.
## Contras:
- No es una aplicación fácil de escalar
- Puede llegar a quedar desordenado si no se siguen buenas prácticas.

# Arquitectura Por Capas o Distribuida
Cada uno de los componentes internos de la aplicación se pueden trabajar como independientes frente a su desarrollo, haciendo que trabajen juntos para realizar un cometido o una base de datos.

Se hace una separación a nivel técnico.

La capa 1 va a seguir siendo el navegador.
La capa 2 van a ser los componentes de UI/UX.
La capa 3 va a ser la lógica de negocio, regla de negocio, acceso a datos.
La capa 4 ya será el servidor de base de datos.

# Microservicios
Los servicios del backend se dividen en varias partes. 

## Pros
- Son altamente escalables, por lo que se podría replicar un solo microservicio para varios proyectos.
- Si un microservicio el modulo deja de servir, pero la aplicación no se cae.
- La posibilidad de combinar varios lenguajes de desarrollo.

## ¿Qué se necesita para trabajar con microservicios?
- Dinero
