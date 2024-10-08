---
date: 2024-07-26
---

## Filtrar elementos y mostrarlos según corresponda

JavaScript tiene una función llamada `filter` que permite mostrar ciertos elementos si cumplen con una condición en específico.

Por ejemplo:

```javascript
teamName={team.name}
collaborators={collaborators.filter(collaborator => collaborator.team == team.name)}
```

> En esta prop, tengo una lista de colaboradores que quiero mostrar, sin embargo, quiero que solo se muestren aquellos colaboradores que pertenezcan al equipo que seleccionaron dentro de un input. Por lo tanto, lo que le digo a la función es que me muestre a cada colaborador cuyo equipo concuerde con el título de la sección o equipo que se está mostrando.

