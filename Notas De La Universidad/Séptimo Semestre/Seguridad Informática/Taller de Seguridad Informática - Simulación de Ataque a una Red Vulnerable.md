
> **Santiago Naranjo Herrera, David Santiago Sierra Fernández & Edgar Duván Bernal Acero**
# Introducción

El presente informe detalla las actividades realizadas en un entorno controlado para identificar y explotar vulnerabilidades críticas en un servidor con fines educativos. La simulación se llevó a cabo en un escenario proporcionado por CyberSec Labs, una empresa ficticia dedicada a pruebas de penetración. El objetivo principal fue comprometer la seguridad del servidor Metasploitable, específicamente a través de los servicios FTP (vsftpd 2.3.4) y SSH (puerto 22), documentando cada paso del proceso para mejorar las defensas de la organización.
# Objetivos del Taller

- Identificar y explotar vulnerabilidades en el servidor Metasploitable.
- Documentar los procedimientos utilizados para comprometer los servicios FTP y SSH.
- Proponer mejoras para evitar futuros ataques en entornos reales.

# Escenario y Metodología

Se asignó la IP del servidor vulnerable, el cual contenía varios servicios potencialmente explotables. El análisis se centró en dos servicios críticos: FTP (vsftpd 2.3.4) y SSH. Se utilizaron herramientas de reconocimiento y explotación, como Nmap y Metasploit, siguiendo una metodología estructurada.:

## Reconocimiento y Escaneo de la Red
    
- **Nmap** fue utilizado para identificar los puertos abiertos y las versiones de servicios activos.
- Se verificó que el puerto 21 (FTP) estaba ejecutando vsftpd 2.3.4, conocido por su vulnerabilidad de backdoor, y el puerto 22 estaba abierto para SSH. Para esto se utilizó una máquina virtual dentro de un entorno de Arch Linux.
![[Pasted image 20240920070542.png]]

Luego se detectan todos los puertos que tenemos disponibles para concentrarnos en los que necesitamos: SSH y FTP:

![[Pasted image 20240920070836.png]]

![[Pasted image 20240920070710.png]]

## Explotación del Servicio FTP (vsftpd 2.3.4)
    
- Se buscó y seleccionó un exploit adecuado para la versión vulnerable de vsftpd, en este caso `fsftpd234_backdoor`.
- Configurando el host remoto, y ejecutando el exploit, se logró obtener una shell como usuario root.

Los ajustes de configuración se basaron en la variable de IP equivalente a la dirección `192.168.1.0`, y la configuración de los puertos `21` y `22`.

![[Pasted image 20240920073106.png]]

## Ataque de Fuerza Bruta a SSH
    
- Se identificó un módulo de fuerza bruta de SSH en Metasploit. Tras configurarlo correctamente, se obtuvo acceso a una sesión SSH.

![[Pasted image 20240920071427.png]]

- Así mismo, se nos permitió ejecutar comandos en la máquina comprometida. A continuación podemos ver algunos scripts que podían ejecutarse.

![[Pasted image 20240920071452.png]]

Así mismo, también nos conectamos por SSH mediante las credenciales obtenidas gracias al método de fuerza bruta.

![[Pasted image 20240920074048.png]]
## Uso de Payloads con msfvenom:

- Se generó un payload para establecer una conexión inversa con la máquina atacante.

![[Pasted image 20240920072139.png]]

- Se transfirió y ejecutó el payload en la máquina Metasploitable, obteniendo control total del sistema comprometido.

![[Pasted image 20240920072418.png]]

Mostrando el Payload en ejecución:

![[Pasted image 20240920072502.png]]

# Resultados

## Vulnerabilidades Identificadas

- **FTP (vsftpd 2.3.4):** Backdoor en la versión, permitiendo acceso root con un exploit conocido.
- **SSH:** Acceso a través de un ataque de fuerza bruta, aprovechando credenciales débiles.
## Técnicas Utilizadas

- Escaneo de puertos y versiones con nmap.
- Explotación del servicio FTP usando un exploit específico de vsftpd.
- Fuerza bruta a SSH con Metasploit.
- Creación de los payloads utilizando msfvenom, realizando una trasnferencia de archivos mediante un servidor FTP .

# Conclusión y Recomendaciones

El taller permitió identificar y explotar con éxito vulnerabilidades críticas en el servidor Metasploitable. Además, este taller nos permitió identificar distintas alternativas a herramientas creadas para funcionar de manera específica dentro de un entorno de windows, permitiendo así fomentar la investigación externa. Las técnicas utilizadas demuestran la importancia de mantener actualizados los servicios y emplear políticas de seguridad robustas, como el uso de contraseñas fuertes y la limitación de acceso a servicios innecesarios.

## Recomendaciones:

- **Actualización de Servicios:** Implementar versiones actualizadas y seguras de vsftpd y SSH.
- **Contraseñas Fuertes:** Implementar políticas de contraseñas robustas y no reutilizar credenciales en diferentes servicios.
- **Monitoreo y Respuesta:** Configurar sistemas de monitoreo que alerten sobre intentos de acceso no autorizados y respuestas rápidas ante incidentes.
- **Restricción de Acceso:** Limitar el acceso a servicios críticos a través de listas blancas de IP y autenticación multifactor.

Estas acciones ayudarían a proteger la infraestructura de la empresa contra ataques similares en entornos reales.