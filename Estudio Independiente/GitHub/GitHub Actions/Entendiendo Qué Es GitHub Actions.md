---
date: 2024-09-27
---

[[GitHub Actions]] es una plataforma de integración contínua y entrega continua (Continuous Deployment y Continuous Integrations o CI/CD) que te permite actualizar tus espacios de construcción, pruebas y despliegue de un proyecto. Puedes crear **flujos de trabajo (Workflows)** que construyan y prueben las distintas pull requests que envíes a tu repositorio. Además GitHub Actions va más allá de los aspectos de DevOps, permitiéndote ejecutar workflows cuando ocurran otros eventos en tu repositorio. Por ejemplo: puedes correr un flujo de trabajo de forma automática para añadir etiquetas apropiadas a las pull requests o cuando una persona vaya a publicar una revisión de errores en tu repositorio.

GitHub proporciona máquinas virtuales de Linux, Windows y MacOS para ejecutar tus flujos de trabajo, aunque si también lo deseas, también puedes hostear tus propios ejecutables en tu propio data center o infraestructura cloud.

## Los Componentes de GitHub Actions
Puedes configurar un workflow de GitHub Actions para ejecutarse apenas ocurra un evento dentro de tu repositorio, como por ejemplo, cada vez que se abra una pull request o se genere un error. Tu workflow puede contener uno o mas **trabajos** corriendo en un orden sucesivo o paralelo. Cada trabajo correrá dentro de su propio ejecutable en una máquina virtual, o dentro de un contenedor, y así mismo, puede a contener uno o más pasos que corran un script que tengas definido o ejecuten una **acción**, lo cual puede convertirse en una extensión reutilizable que simplifique tu flujo de trabajo.

![[Workflow Example.png]]
## Workflows
Un Workflow es un proceso automatizado y configurable que ejecutará uno o más trabajos. Los workflows están definidos por un archivo YAML que se encuentra dentro de tu repositorio, y pueden ser ejecutados cuando se dispare algún evento dentro de tu repositorio, cuando decidas ejecutarlo o simplemente en algún horario definido. Los workflows se definen dentro del directorio `.github/workflows`del repositorio. Un repositorio puede tener varios workflows, y cada uno de ellos puede ejecutar tareas tales como:

- Construcción y testeo de una Pull Request.
- Desplegar tu aplicación cada vez que se crea una nueva release.
- Añadir una nueva etiqueta cada vez que se crea un problema.

Así mismo puedes hacer referencia a un workflow dentro de otro, para mas información puedes ver cómo [Reutilizar Workflows](https://docs.github.com/en/actions/sharing-automations/reusing-workflows).

Si quieres saber como crear un workflow puedes visitar la sección que trata la parte de [Escribir un Workflow](https://docs.github.com/en/actions/writing-workflows).

## Eventos
Un evento es una actividad específica en un repositorio que dispara una ejecución de un workflow. Por ejemplo, una actividad puede ser originada por GitHub cuando alguien crea una pull request, abre un nuevo caso de problemas, o simplemente manda un commit al repositorio. También puedes disparar un evento para correr un workflow en un [Horario Específico](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule) o realizando una [petición de post a una REST API](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event).

Si quieres saber cuáles son los eventos que pueden ejecutar un workflow puedes ver el documento sobre [Eventos que disparan un Workflow](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows).

## Trabajos 
Un trabajo es un conjunto de pasos dentro de un workflow dentro del mismo ejecutable. Cada paso puede constar de un script en shell que será ejecutado o simplemente una acción que se ejecuta. Los pasos se ejecutan en un orden específico, y dependen el uno del otro. Como cada paso se ejecuta en el mismo ejecutable, puedes compartir datos de un paso a otro. Por ejemplo, puedes tener un paso que construya tu aplicación y posteriormente puedes revisar que dicha build se haya creado de manera exitosa.

Puedes configurar las dependencias de un trabajo mediante otros trabajos; por defecto, los trabajos no tienen dependencias y pueden correr en paralelo. Cuando un trabajo depende de otro, primero se espera a que el trabajo dependiente se complete antes de ejecutarse después.

Por ejemplo, tal vez quieras configurar múltiples trabajos para diferentes arquitecturas sin ningún trabajo que tenga dependencias, junto con un trabajo que dependa de las ejecuciones de las mismas. Los trabajos de building corren en paralelo, y una vez que se completan de manera exitosa, comienza el trabajo dedicado específicamente al empaquetamiento.

Para más información, puedes ver [Cómo escoger lo que hará tu workflow](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does).

## Acciones
Una acción es una aplicación personalizada de GitHub Actions que realiza una tarea compleja pero que se tenga que repetir normalmente. Puedes usar una acción para ayudar a reducir la cantidad de código repetido que escribes en los archivos de tu workflow. Una acción puede generar una acción pull en tu repositorio de GitHub, luego puede elegir la cadena de suministros específica para tu ambiente de construcción, o ajustar la configuración de tu proveedor de cloud.

Puedes escribir tus propias acciones o puedes encontrar diferentes acciones para usar en tus workflows de GitHub en el Marketplace de GitHub.

Para más información, puedes ver la parte de [Compartir automatizaciones](https://docs.github.com/en/actions/sharing-automations).

## Entorno de Ejecución
Un entorno de ejecución es un servidor que se ejecuta en tu workflow cuando es disparado. Cada entorno puede ejecutar un solo trabajo a la vez. GitHub proporciona entornos en Ubuntu Linux, Microsoft Windows, y entornos de MacOS para ejecutar tus workflows. Cada ejecución de workflow se ejecuta en una máquina virtual totalmente nueva.

GitHub también proporciona entornos más grandes, que están disponibles para configuraciones más grandes. Para más información, puedes ver como [usar instancias más grandes](https://docs.github.com/en/actions/using-github-hosted-runners/using-larger-runners). 

Si necesitas un sistema operativo diferente o requieres de una configuración de hardware específica, puedes hospedar tus propios entornos. Para más información sobre esto puedes ver cómo [hostear tus propias instancias](https://docs.github.com/en/actions/hosting-your-own-runners).

## ¿Qué hacer Después?
GitHub Actions puede ayudarte a automatizar casi cada aspecto de los procesos de desarrollo de tu aplicación. Estás listo para empezar? Aquí hay algunos recursos útiles que te pueden ayudar a dar tus siguientes pasos con GitHub Actions:

- Para crear un workflow de GitHub Actions, mira el artículo "[usando la plantilla de workflow](https://docs.github.com/en/actions/learn-github-actions/using-starter-workflows)."
- Para workflows de integración contínua (continuous integration (CI)), revisa "[Building and testing](https://docs.github.com/en/actions/automating-builds-and-tests)."
- Para construir y publicar paquetes, mira "[Publicar Paquetes](https://docs.github.com/en/actions/publishing-packages)."
- Para un despliegue de proyectos, revisa "[Casos de Uso y Ejemplos](https://docs.github.com/en/actions/deployment)."
- Para automatizar tareas y procesos en GitHub, mira "[Cómo manejar Proyectos](https://docs.github.com/en/actions/managing-issues-and-pull-requests)."
- Para ejemplos que demuestran más características complejas de GitHub Actions puedes mirar los "[Casos de uso y Ejemplos](https://docs.github.com/en/actions/examples)." Estos ejemplos detallados explican como probar tu código en un entorno de ejecución, acceder al CLI de GitHub y usar características avanzadas como como matrices de concurrencias y pruebas de concurrencias.
- Para certificar tu proeficiencia en el proceso de automatización de workflows y acelerar el desarrollo con GitHub Actions, gana un certificado de GitHub Actions con las certificaciones de GitHub. Para mas información puedes mirar todo "[sobre las Certificaciones de GitHub](https://docs.github.com/en/get-started/showcase-your-expertise-with-github-certifications/about-github-certifications)."