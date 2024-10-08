---
date: 2024-09-27
---

Esta **[integración de Astro](https://docs.astro.build/es/guides/integrations-guide/)** genera un Sitemap basado en tus páginas al construir tu proyecto de Astro.

## ¿Por qué Astro Sitemap?

[Sección titulada ¿Por qué Astro Sitemap?](https://docs.astro.build/es/guides/integrations-guide/sitemap/#por-qu%C3%A9-astro-sitemap)

Un Sitemap es un archivo XML que describe todas las páginas, videos y archivos de tu sitio. Los motores de búsqueda como Google leen este archivo para rastrear tu sitio de manera más eficiente. [Consulta el consejo de Google sobre los Sitemaps](https://developers.google.com/search/docs/advanced/sitemaps/overview) para obtener más información al respecto.

Se recomienda utilizar un archivo Sitemap para sitios grandes con múltiples páginas. Si no utilizas un Sitemap, la mayoría de los motores de búsqueda aún podrán listar las páginas de tu sitio, pero un Sitemap es una excelente manera de asegurarte de que tu sitio sea lo más amigable posible para los motores de búsqueda.

Con [[Astro]] Sitemap, no tienes que preocuparte por crear este archivo XML tú mismo: la integración Astro Sitemap rastreará tus rutas generadas estáticamente y creará el archivo sitemap, incluyendo [rutas dinámicas](https://docs.astro.build/es/core-concepts/routing/#rutas-din%C3%A1micas) como `[...slug]` o `src/pages/[lang]/[version]/info.astro` generado por `getStaticPaths()`.

Esta integración no puede generar entradas de sitemap para rutas dinámicas en [modo SSR](https://docs.astro.build/es/core-concepts/rendering-modes/#renderizado-bajo-demanda).