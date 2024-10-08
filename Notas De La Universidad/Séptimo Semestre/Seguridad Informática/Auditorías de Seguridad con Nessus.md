---
tags:
  - Seguridad
  - Automatización
date:
---

> Hecho Por: **David Santiago Sierra Fernández, Santiago Naranjo Herrera y Edgar Duván Bernal Acero** para la materia de [[Seguridad Informática]].

## Introducción

El uso de herramientas para auditorías de seguridad es una práctica esencial en el mundo de la ciberseguridad, y **Nessus** es una de las soluciones más destacadas en este campo. En un primer acercamiento a las auditorías de seguridad con Nessus, se busca entender cómo esta herramienta permite identificar vulnerabilidades en los sistemas informáticos y redes, facilitando la implementación de medidas de protección. Esta plataforma ofrece una interfaz intuitiva que permite a los auditores configurar y ejecutar análisis de seguridad sin necesidad de ser expertos en la materia desde el primer momento.

#### Pasos para Ingresar por Primera Vez a Nessus

1. **Descarga e Instalación**: El primer paso que realizamos para utilizar Nessus fue descargar la herramienta desde la página oficial de Tenable. Nessus está disponible para varios sistemas operativos, como Windows, Linux y macOS. Después de seleccionar la versión correspondiente, seguimos el proceso de instalación dependiendo del sistema operativo. En este paso, nos aseguramos de que el sistema en el que se instalará cumpla con los requisitos mínimos de hardware y software recomendados por Tenable.
    
2. **Activación del Producto**: Una vez instalada la herramienta, al abrir Nessus por primera vez, se requiere activar el producto con una clave de licencia. Existen diferentes versiones de Nessus, como Nessus Essentials (gratuita para uso personal) y Nessus Professional (de pago, orientada a uso empresarial). Durante la activación, se ingresa el código proporcionado tras el registro en la página de Tenable. En este laboratorio, activamos una versión de prueba de Nessus Professional, lo cual fue útil para realizar una evaluación completa del producto.
    
3. **Acceso a la Interfaz Web**: Después de la activación, Logramos gestionar la herramienta de Nessus a través de una **interfaz web**. Se accede ingresando la dirección IP del servidor donde está instalado Nessus, junto con el puerto designado (por defecto, 8834). Al hacerlo, se pedirá crear una cuenta de administrador para gestionar los análisis y configuraciones. A partir de este momento,obtuvimos un acceso completo a la plataforma, y pudimos comenzar a explorar las diferentes funcionalidades.

![[Pasted image 20240928190950.png]]

## Configuración Inicial del Escaneo
Uno de los primeros pasos en una auditoría con Nessus es la configuración de los **escaneos**, donde se puede definir el alcance del análisis, los sistemas a escanear y las políticas de seguridad a aplicar. Nessus ofrece varios perfiles de escaneo predeterminados que cubren desde evaluaciones básicas de vulnerabilidades hasta auditorías más complejas, como el cumplimiento con estándares de seguridad. Nosotros pudimos personalizar estos perfiles de acuerdo con las necesidades del entorno que desea auditar. Como nuevos usuarios, es útil comenzar con configuraciones básicas, como escaneos de red para identificar puertos abiertos, servicios en ejecución y posibles vulnerabilidades conocidas.

![[Pasted image 20240928192641.png]]

![[Pasted image 20240928192620.png]]

Una vez iniciado el escaneo, Nessus realiza un análisis profundo de los sistemas y muestra los resultados en un formato detallado que clasifica las vulnerabilidades según su severidad: baja, media, alta y crítica. Este sistema de clasificación facilita la priorización de los riesgos, permitiendo a los auditores y administradores de sistemas abordar primero las amenazas más urgentes. La herramienta también ofrece sugerencias para mitigar las vulnerabilidades detectadas, brindando información técnica y recomendaciones específicas para la remediación. Esta característica es de gran ayuda para aquellos que están familiarizándose con el mundo de las auditorías de seguridad, ya que proporciona un camino claro hacia la mejora de la seguridad.

![[Pasted image 20240928192154.png]]

## Conclusión
El primer acercamiento a las auditorías de seguridad con Nessus nos permitió descubrir el potencial de una de las herramientas más robustas y accesibles en el campo de la ciberseguridad. Desde su fácil instalación y activación hasta la configuración de los primeros escaneos, Nessus proporciona una experiencia intuitiva que facilita la detección de vulnerabilidades críticas en redes y sistemas. La clasificación de riesgos y las recomendaciones de remediación proporcionadas por la herramienta permiten a los usuarios priorizar y mitigar amenazas de manera eficiente, incluso si es la primera vez que realizan auditorías de seguridad.

A medida que se adquiere más experiencia con la plataforma, los usuarios pueden aprovechar características avanzadas y personalizar sus escaneos para ajustarse a diferentes entornos y requerimientos de seguridad. En conclusión, Nessus no solo se destaca por su capacidad de análisis profundo y detallado, sino también por su accesibilidad para principiantes, lo que lo convierte en una herramienta esencial tanto para profesionales experimentados como para aquellos que recién se inician en el mundo de las auditorías de seguridad.