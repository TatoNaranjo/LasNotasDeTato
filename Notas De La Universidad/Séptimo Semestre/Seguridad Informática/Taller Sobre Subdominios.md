---
date: 2024-09-20
tags:
  - Seguridad
---

Completando los puntos que faltan sobre la seguridad en los puertos de servidores para [[Seguridad Informática]]

13. ¿Cuál es la diferencia entre un puerto abierto, cerrado y filtrado, y qué significan en el contexto de un análisis de seguridad?

### Puerto Abierto
Un puerto abierto es un puerto que está configurado para aceptar conexiones, lo que nos indica que hay un servicio activo para escuchar todas las solicitudes que se hagan en dicho puerto. Sin embargo, dentro del contexto de un análisis de seguridad esto puede representar una amenaza bastante grave, debido a que si el servicio al que está escuchando tiene fallos de seguridad, todo puede terminar en el aprovechamiento de las vulnerabilidades por parte de los atacantes para obtener un acceso no autorizado al sistema.
### Puerto Cerrado
Un puerto cerrado es un puerto que no tiene a ningún servicio activo escuchando por sus solicitudes. Tenemos que considerar que, aunque un puerto cerrado no supone un riesgo inmediato para comprometer datos dentro del sistema, puede revelar a un atacante la configuración de red o del mismo sistema si llega a ser interceptado. Los puertos cerrados pueden ser una indicación de que ciertos servicios no están disponibles, pero también pueden sugerir que el puerto se puede abrir en otro momento o bajo condiciones muy específicas.
### Puerto Filtrado
Un puerto filtrado es aquel que no responde de manera directa a las consultas que se le soliciten debido a que un dispositivo intermediario (que comúnmente suele ser un firewall) se encuentra bloqueando el acceso o la visibilidad del puerto mismo. Esto normalmente se hace con fines de seguridad para evitar que los atacantes detecten su presencia y exploten posibles vulnerabilidades mediante el acceso a brechas de seguridad. También, dentro del contexto de un análisis de seguridad, los puertos filtrados pueden complicar la evaluación debido a que no se puede determinar con certeza si estos se encuentran filtrados o no.

14. ¿Qué medidas puedes tomar si descubres un subdominio con un puerto crítico abierto que no debería estar accesible desde Internet?

Normalmente, cuando un subdominio tiene un puerto crítico expuesto que no debería ser accesible se suelen tomar las siguientes medidas de seguridad:

- **Cerrar el puerto Inmediatamente:** La primera medida sería cerrar el puerto desde el firewall o mediante la configuración del servidor. Esto previene cualquier posible ataque que pudiera explotar ese puerto.
- **Revisar Configuraciones de Seguridad:** Cuando tenemos un firewall funcionando, debemos asegurarnos de que los puertos críticos solo estén accesibles desde redes internas o por usuarios autorizados. Para realizar esto, normalmente los auditores configuran reglas específicas para bloquear el acceso externo al puerto en cuestión.
- **Actualizar el Servicio o Software:** Si el puerto corresponde a un servicio esencial que no puede ser cerrado, un punto importante a tratar puede ser revisar que el software esté actualizado con los últimos parches de seguridad para minimizar el riesgo de vulnerabilidades conocidas.
- **Implementar Autenticación o Cifrado:** Si es necesario que el puerto permanezca abierto, se deben implementar mecanismos de autenticación robustos y cifrado para asegurar que solo usuarios autorizados puedan acceder al servicio.
- **Auditoria y Monitoreo:** El punto más importante dentro de una organización es la realización de una auditoria de seguridad para detectar las vulnerabilidades como los puertos que están abiertos o monitorizar el tráfico para detectar cualquier intento de acceso o explotación no autorizada.

15. ¿Qué técnicas puedes utilizar para proteger un subdominio crítico de posibles ataques que exploten puertos abiertos?

Para proteger un subdominio crítico de posibles ataques que exploten puertos abiertos, se deben considerar las siguientes técnicas:

- **Firewall y Filtrado de Paquetes:**
    
    - Configurar un firewall para filtrar el tráfico hacia los puertos abiertos, permitiendo solo el tráfico necesario y bloqueando el acceso no autorizado. Utiliza filtrado de paquetes para inspeccionar y filtrar tráfico basado en reglas definidas.
- **Red Privada Virtual (VPN):**
    
    - Utilizar una VPN para permitir que solo usuarios autenticados dentro de la red privada puedan acceder a los servicios a través de puertos abiertos. Esto reduce la exposición del puerto a la Internet pública.
- **Segmentación de Red:**
    
    - Implementar segmentación de red para aislar los servicios críticos en subredes privadas, limitando la exposición y permitiendo un control más granular sobre el acceso a los puertos abiertos.
- **Configuración de Intrusión y Detección:**
    
    - Implementar sistemas de detección y prevención de intrusiones (IDS/IPS) para monitorizar y bloquear automáticamente intentos de explotación de puertos abiertos.
- **Autenticación de Dos Factores (2FA):**
    
    - Implementar una autenticación de dos factores para cualquier acceso a servicios críticos a través de puertos abiertos, agregando una capa adicional de seguridad.
- **Cifrado de Comunicaciones:**
    
    - Asegurar que todas las comunicaciones a través de puertos abiertos estén cifradas, por ejemplo, usando TLS/SSL para proteger la integridad y confidencialidad de los datos en tránsito.
- **Actualización y Parcheo Regular:**
    
    - Mantener todos los servicios y sistemas actualizados con los últimos parches de seguridad para minimizar el riesgo de explotación a través de vulnerabilidades conocidas.
- **Monitoreo y Alerta:**
    
    - Establecer un sistema de monitoreo continuo para detectar actividades sospechosas en puertos abiertos y configurar alertas para que el equipo de seguridad pueda responder rápidamente a posibles amenazas.