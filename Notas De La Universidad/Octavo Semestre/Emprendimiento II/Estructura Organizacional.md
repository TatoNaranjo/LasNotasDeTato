---
date: 2025-03-22
---
## Algunos Propósitos del Proceso de Organización
- Agrupar las diferentes tareas en unidades.
- Establecer relaciones entre individuos, grupos y departamentos.
- Determinar las lineas formales de autoridad.
- Asignar y desplegar los recursos de la organización.

## Procesos de Organización

```mermaid
graph TD;
    A[Obj. De la empresa] --> B[Objetivos, Políticas y planes de apoyo];
    B --> C[Identificación de las actividades requeridas];
    C --> D[Agrupación de actividades según recursos y ocupaciones];
    D --> E[Delegación de autoridad];
    E --> F[Coordinación horizontal y vertical de relaciones de autoridad];
    F --> G[Integración de personal];
    G --> H[Dirección];
    H --> I[Control];
    subgraph Parte 2 Planeación
        A
        B
    end
    subgraph Parte 3 Organización
        C
        D
        E
        F
    end
    subgraph Otras Funciones
        G
        H
        I
    end
```

## Organigrama Empresarial

Organigrama = (Órgamo = Órgano u Orgamismo + Grama = Gráfico)

Es la gráfica que representa la organización de una empresa o sea, su estructura organizacional.

### Desventajas del Organigrama
- Solo contiene relaciones formales de autoridad y omiten las numerosas relaciones informales significativas.
- También muestra las relaciones principales de línea o formales. Sin embargo no indica cuánta autoridad existe en cualquier punto de la estructura.
- Los individuos pueden confundir la gráfica con los niveles de estatus.

### Ejemplo 

```mermaid
graph TD;
    A[Desarrollador Front-End] -->|React, UI/UX| B[Equipo de Desarrollo]
    C[Desarrollador Back-End] -->|API, Seguridad| B
    D[Especialista en Base de Datos] -->|SQL Server, Modelado de Datos| B
    E[Analista de Datos] -->|Gráficos, Encuestas| B
    F[Psicólogo Asesor] -->|Recursos de Salud Mental| B
    
    B((Equipo de Desarrollo))
```

## Departamentalización

Es la base sobre la cual se agrupan los trabajos a fin de alcanzar las metas organizacionales.

### Tipos
1. Departamentalización Funcional.
2. Departamentalización por Producto.
3. Departamentalización Geográfica.
4. Departamentalización por Procesos
5. Departamentalización por Clientes.
6. Departamentalización por Números.