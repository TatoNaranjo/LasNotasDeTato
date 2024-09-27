[[GitHub Actions]] es una plataforma de integración contínua y entrega continua (Continuous Deployment y Continuous Integrations o CI/CD) que te permite actualizar tus espacios de construcción, pruebas y despliegue de un proyecto. Puedes crear **flujos de trabajo (Workflows)** que construyan y prueben las distintas pull requests que envíes a tu repositorio. Además GitHub Actions va más allá de los aspectos de DevOps, permitiéndote ejecutar workflows cuando ocurran otros eventos en tu repositorio. Por ejemplo: puedes correr un flujo de trabajo de forma automática para añadir etiquetas apropiadas a las pull requests o cuando una persona vaya a publicar una revisión de errores en tu repositorio.

GitHub proporciona máquinas virtuales de Linux, Windows y MacOS para ejecutar tus flujos de trabajo, aunque si también lo deseas, también puedes hostear tus propios ejecutables en tu propio data center o infraestructura cloud.

## Los Componentes de GitHub Actions
Puedes configurar un workflow de GitHub Actions para ejecutarse apenas ocurra un evento dentro de tu repositorio, como por ejemplo, cada vez que se abra una pull request o se genere un error. Tu workflow puede contener uno o mas **trabajos** corriendo en un orden sucesivo o paralelo. Cada trabajo correrá dentro de su propio ejecutable en una máquina virtual, o dentro de un contenedor, y así mismo, puede a contener uno o más pasos que corran un script que tengas definido o ejecuten una **acción**, lo cual puede convertirse en una extensión reutilizable que simplifique tu flujo de trabajo.

![[Workflow Example.png]]
## Workflows
