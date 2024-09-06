Este es un informe de laboratorio realizado por **David Santiago Sierra Fernandez y Santiago Naranjo Herrera** dentro de la plataforma de AWS para la materia de [[Redes y Comunicación]]. El objetivo es lograr habilitar los puertos necesarios para que el profesor pueda tener acceso a una aplicación en específico. En este caso, la aplicación elegida fue World of Warcraft, la cual tiene los puertos TCP 3724, 1119, 6112, 6113, 6114 y 4000 para jugar, y el puerto UDP 3724 para el chat de voz del videojuego.

# Índice

```table-of-contents
```

# ¿ Qué es el control de acceso basado en reglas?
El control de acceso basado en reglas administra el acceso a los recursos en función de las reglas definidas por el administrador. Esto permite un control muy granular sobre el acceso, ya que el administrador puede definir la combinación exacta de requisitos para el acceso.  El sistema de manejo de acceso compara la información sobre el usuario dentro de las reglas ubicadas en una base de datos. Si se cumplen las condiciones, entonces ese usuario puede usar aplicaciones, mover archivos o ver historiales. Si no, el sistema restringe los permisos del usuario.

# Por qué es importante el control de acceso basado en reglas?
El hecho de controlar un acceso al usuario es un reto de seguridad bastante crítico. Sin controles de acceso robustos, las compañías pueden exponer datos sensibles a atacantes externos. Las brechas de seguridad o ataques de ransomware son algunas de las consecuencias de no implementar estos controles de acceso. Así mismo, uno de los beneficios es que las reglas son confiables y consistentes. Si los administradores configuran las reglas correctas en sus sistemas de acceso, hay mucha menos probabilidad de cometer errores.

# Implementando el Control de Acceso Basado en Reglas

## Conociendo el Panel de Control de AWS

El punto inicial del laboratorio fue acceder al panel de control de la consola establecida por el profesor dentro de la plataforma de AWS. Ingresando las credenciales y luego de lograr cambiar la contraseña por medidas de seguridad nos encontramos con el siguiente dashboard:

![[Pasted image 20240906125239.png]]

Lo siguiente que hacemos es acceder a el panel de control del entorno de EC2, ubicado en la imagen dentro de la sección de "Recently Added"

![[Pasted image 20240906131458.png]]
## Accediendo a las Instancias
Las instancias dentro del entorno de Amazon son espacios dedicados para máquinas virtuales que se usan para diferentes necesidades, dependiendo de la configuración de CPU, memoria o almacenamiento.

Lo que hacemos luego de acceder al entorno de EC2 es, precisamente verificar qué instancias tenemos en nuestro espacio de trabajo.

![[Pasted image 20240906131825.png]]

Accedemos a las características de la única instancia que se nos proporciona:

![[Pasted image 20240906131905.png]]
## Creando las Reglas de Seguridad
Dentro de las opciones de la instancia, hay un apartado de seguridad que nos permite crear nuestra propia habilitación de accesos basados en reglas. El panel se ve así:

![[Pasted image 20240906132102.png]]

Luego, procedemos a acceder al grupo de seguridad que se encuentra ubicado dentro del apartado para empezar a crear las reglas de seguridad.

![[Pasted image 20240906132159.png]]

Lo siguiente es crear las reglas de seguridad basándose en los puertos que necesita World Of Warcraft para funcionar y sus protocolos TCP y UDP:

![[Pasted image 20240906132338.png]]

![[Pasted image 20240906132559.png]]

Las opciones que ofrece AWS para configurar los protocolos de las reglas son las siguientes:

![[Pasted image 20240906132537.png]]

## Guardando las reglas

Posteriormente, se le da el nombre a las reglas y se guardan con los nombres de los integrantes del grupo:

![[Pasted image 20240906132724.png]]
![[Pasted image 20240906132649.png]]

Viendo el panel general de todas las reglas que se han creado dentro del entorno de la consola de AWS podemos notar que las reglas se guardaron exitosamente

![[Pasted image 20240906132812.png]]

## Creando las reglas mediante Consola

De igual forma se hizo el experimento de crear las reglas mediante consola.


Los siguientes parámetros mencionados se pueden utilizar tanto para agregar una regla como para eliminarla:

```bash
--group-id sg-xxxxxxxx: El ID del grupo de seguridad donde queremos agregar o eliminar la regla.
--protocol tcp: El protocolo de la regla que queremos agregar o eliminar (en este caso TCP).
--port 80: El puerto de la regla que queremos agregar o eliminar.
--cidr 0.0.0.0/0: El rango de IPs asociado a la regla que queremos agregar o eliminar.
--profile x: El perfil de AWS que estamos usando.
```

Usando dichos parámetros, los datos ingresados fueron los siguientes:

```bash
aws ec2 authorize-security-group-ingress \         
--group-id sg-05271a5acece6c688 \
--protocol tcp \
--port 1119 \
--cidr 192.24.57.161/32 \
--profile ucundi
```

![[Pasted image 20240906132958.png]]

![[Pasted image 20240906133011.png]]

![[Pasted image 20240906133026.png]]

# Conclusión
La habilitación de accesos basados en reglas en AWS es fundamental para garantizar la seguridad y la eficiencia en la gestión de recursos en la nube. AWS proporciona una variedad de herramientas y servicios, como IAM, Grupos de Seguridad y ACLs de red, que permiten definir políticas de acceso precisas y adaptables a las necesidades de cada organización. Implementar reglas adecuadas de acceso es crucial para proteger los datos sensibles y los recursos de la infraestructura, al tiempo que se asegura que solo los usuarios y servicios autorizados puedan interactuar con ellos.

El uso de accesos basados en reglas tiene un impacto significativo en la seguridad al minimizar el riesgo de accesos no autorizados y posibles brechas de seguridad. También facilita la gestión de recursos, permitiendo a las organizaciones escalar sus operaciones sin comprometer la seguridad, gracias a políticas bien definidas que se adaptan a diferentes escenarios y cargas de trabajo.

Para una implementación efectiva de accesos basados en reglas en AWS, se recomienda seguir el principio de menor privilegio, otorgando solo los permisos necesarios para cada usuario o rol. En este caso, lo que se buscó fue otorgar acceso únicamente a los puertos que necesitaba World Of Warcraft para funcionar, sin activar todos los puertos para no dar paso a brechas de seguridad.

Adoptando estas prácticas, pudimos afianzar de forma significativa nuestra postura de seguridad en la nube, aprendiendo a como proteger los recursos de una empresa, y garantizar un control adecuado y eficiente sobre el acceso a su infraestructura utilizando AWS.
# Referencias
- [NordLayer](https://nordlayer.com/learn/access-control/rule-based-access-control/)
- [Puertos de WoW](https://eu.forums.blizzard.com/en/wow/t/can-anyone-share-wows-ports/155203/2)

