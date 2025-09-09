---
date: 2025-09-03
---

**¡Hey, Aquí Tato al Habla!**

Si están aquí, es porque ya saben lo que es un informe técnico y lo aburrido que puede ser darle formato. Pero no se preocupen, hoy les voy a enseñar una herramienta que les va a cambiar la vida: **LaTeX**. Piénsenlo como si fuera Word, pero mucho más poderoso y enfocado en la ciencia. Y la mejor parte es que con **Overleaf**, organizar todo es mucho más sencillo.

Esta guía está diseñada para que, desde cero, puedan crear un informe completo en formato APA.

![[Pasted image 20250903130301.png]]
## ¿Qué es LaTeX y por qué usarlo?

**LaTeX** es un lenguaje de programación para crear documentos. A diferencia de Word, donde ven el resultado mientras escriben, en LaTeX se escribe el texto y se le dan instrucciones de formato. ¿Suena complicado? La ventaja es que una vez que aprenden las bases, el formato se hace automáticamente. Esto les ahorrará horas de trabajo y sus informes se verán increíblemente profesionales y consistentes.

**Overleaf** es una plataforma en línea que les permite trabajar con LaTeX sin necesidad de instalar nada en su computadora. Es como un Google Docs para LaTeX.

## Paso 1: Configurando Overleaf

1. **Crear una cuenta:** Vayan a [overleaf.com](https://www.overleaf.com/) y regístrense. Es gratis y súper sencillo.

2. **Iniciar un nuevo proyecto:** Una vez que estén dentro, hagan clic en "New Project" y seleccionen "Blank Project". Pónganle un nombre descriptivo, como "Informe Práctica Agronomía".

3. **Conociendo la interfaz:** La pantalla se divide en dos:

- **A la izquierda:** Verán el código de su documento. Aquí es donde van a escribir.

- **A la derecha:** Verán el resultado final del PDF. Cada vez que hagan un cambio, solo tienen que hacer clic en "Recompile" (o usar la compilación automática) para ver cómo queda.


## Paso 2: Creando un documento APA

Para no empezar desde cero, vamos a usar una plantilla que ya tiene el formato APA listo. Esto es como tener el tractor listo para sembrar, solo necesitan poner la semilla (su texto).

1. **Ingresen a la página para buscar [Plantillas de Overleaf](https://www.overleaf.com/latex/templates)**, aquí podrán buscar el formato que necesiten, como puede ser IEEE, APA, etc.
   
![[Pasted image 20250903130708.png]]
    
2. **Hagan clic en Abrir como Plantilla, o Open as Template:**

![[Pasted image 20250903130634.png]]    

---

## Paso 3: Escribiendo el contenido del informe

Aquí es donde la magia de LaTeX comienza. Solo tienen que preocuparse por el contenido, el formato lo hace la plantilla:
### Partes del informe

Veamos las partes clave de un informe técnico:
#### 1. Título y autores

En `main.tex`, busquen las líneas que se parecen a esto:

```
\title{Su título va aquí}
\author{Su nombre va aquí}
\date{\today}
```

- **`\title{...}`:** Escriban el título de su informe entre las llaves.
- **`\author{...}`:** Escriban su nombre completo.
- **`\date{\today}`:** Esto inserta la fecha actual automáticamente. ¡Déjenlo así!

#### 2. Resumen (Abstract)

Busquen la sección que dice `\begin{abstract}...\end{abstract}`. Escriban su resumen dentro de estas dos líneas.

```
\begin{abstract}
Aquí va el resumen de su informe. Es una breve descripción del problema, la metodología, los resultados y las conclusiones.
\end{abstract}
```

#### 3. Introducción, Materiales y Métodos, Resultados, Conclusiones

Para crear una nueva sección, usen el comando `\section{...}`.

```
\section{Introducción}
Aquí escriben el texto de su introducción. Pueden usar texto normal, sin preocuparse por el formato.

\section{Materiales y Métodos}
Detallen los materiales y el método que utilizaron para su experimento.

\section{Resultados}
Presenten los resultados de su investigación.

\section{Conclusiones}
Aquí escriben sus conclusiones.
```

#### 4. Listas y enumeraciones

Para una lista con viñetas (puntos), usen `itemize`:

```
\begin{itemize}
   \item Primer punto de la lista.
   \item Segundo punto de la lista.
\end{itemize}
```

Para una lista numerada, usen `enumerate`:


```
\begin{enumerate}
   \item Primer paso.
   \item Segundo paso.
\end{enumerate}
```

---

## Paso 4: Referencias bibliográficas

Esta es una de las mayores ventajas de LaTeX. Olvídense de ordenar las referencias manualmente.

1. **Encontrar el archivo `.bib`:** En la plantilla de APA, verán un archivo llamado `biblio.bib` o similar. Si no lo ven, pueden crearlo. Este archivo es como una base de datos de todas sus referencias.

2. **Añadir una referencia:** Vayan a Google Scholar, PubMed o cualquier base de datos. Busquen el artículo que quieren citar y hagan clic en "Citar". Luego, seleccionen "BibTeX". Copien todo el texto que aparezca y péguenlo en su archivo `.bib`.

Un ejemplo de una referencia de artículo se vería así:

```
@article{smith2020efecto,
  title={Efecto de la luz en el crecimiento de la planta de maíz},
  author={Smith, John and Jones, Mary},
  journal={Journal of Agronomy},
  volume={10},
  number={2},
  pages={123--130},
  year={2020}
}
```

3. **Citar en el texto:** Ahora, para citar en su informe, solo necesitan usar el comando `\cite{...}` con el nombre corto de la referencia (la primera palabra en la línea `@article{...}`), en este caso, `smith2020efecto`.
  
```
   El efecto de la luz en el crecimiento del maíz es crucial \cite{smith2020efecto}.
```
  
¡Listo! Cuando compilen el PDF, LaTeX se encargará de crear la sección de "Referencias" y de darle el formato APA correcto, ¡sin que tengan que mover un dedo!

## Tips finales para no morir en el intento

- **Guarden y compilen seguido:** Es una buena práctica para ver los cambios y corregir errores a medida que avanzan.

- **No se estresen por los errores:** Si hay un error, Overleaf les dirá la línea donde está. Lean el mensaje de error, por lo general les da una pista de qué salió mal. ¡Es parte del aprendizaje.

- **Comunidad y ayuda:** Si se topan con un problema, la comunidad de LaTeX es enorme. Busquen en Google "cómo hacer X en LaTeX", y encontrarán la solución en foros como StackExchange o en la misma documentación de Overleaf.
