Laboratorio realizado para la materia de [[Comunicación de Datos]] que consiste en hacer un sondeo de puertos a 3 IPs diferentes de Shodan usando la herramienta nmap.

> Por: Santiago Naranjo Herrera

# Introducción
El presente informe documenta el laboratorio realizado, cuyo objetivo fue explorar y aplicar técnicas de sondeo de puertos en tres direcciones IP obtenidas a través de la plataforma Shodan. Utilizando la herramienta nmap, se realizaron diferentes tipos de escaneos para identificar puertos abiertos y servicios asociados a cada IP (113.164.27.2, 2.40.2.250 y 104.218.234.234 ). Este ejercicio busca reforzar el conocimiento práctico en la utilización de herramientas de análisis de red, comprender mejor la seguridad de los sistemas conectados a Internet y evaluar potenciales riesgos de ciberseguridad a través de la detección de servicios expuestos.

# Escaneo de Puertos
## 113.164.27.2
La primera IP escogida tiene la denominación de octetos: 113.164.27.2 y es correspondiente a una VPN de Hanoi en Vietnam. Los puertos que muestra Shodan son los siguientes:

![[IPShodan1.png]]

Mientras tanto, vemos que nmap ejecuta 157 scripts en los cuales puede encontrar puertos abiertos que no se encuentran en la página de Shodan, como los puertos 22,23 y 25.

```shell
Starting Nmap 7.95 ( https://nmap.org ) at 2024-09-02 20:00 -05
NSE: Loaded 157 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 20:00
Completed NSE at 20:00, 0.00s elapsed
Initiating NSE at 20:00
Completed NSE at 20:00, 0.00s elapsed
Initiating NSE at 20:00
Completed NSE at 20:00, 0.00s elapsed
Initiating Ping Scan at 20:00
Scanning 113.164.27.2 [2 ports]
Completed Ping Scan at 20:00, 0.47s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 20:00
Completed Parallel DNS resolution of 1 host. at 20:01, 13.00s elapsed
Initiating Connect Scan at 20:01
Scanning 113.164.27.2 [1000 ports]
Discovered open port 25/tcp on 113.164.27.2
Discovered open port 80/tcp on 113.164.27.2
Connect Scan Timing: About 45.02% done; ETC: 20:02 (0:00:38 remaining)
Discovered open port 8081/tcp on 113.164.27.2
Completed Connect Scan at 20:02, 80.66s elapsed (1000 total ports)
Initiating Service scan at 20:02
Scanning 3 services on 113.164.27.2
Completed Service scan at 20:03, 59.59s elapsed (3 services on 1 host)
NSE: Script scanning 113.164.27.2.
Initiating NSE at 20:03
Completed NSE at 20:03, 13.62s elapsed
Initiating NSE at 20:03
Completed NSE at 20:04, 30.74s elapsed
Initiating NSE at 20:04
Completed NSE at 20:04, 0.00s elapsed
Nmap scan report for 113.164.27.2
Host is up (0.66s latency).
Not shown: 993 closed tcp ports (conn-refused)
PORT     STATE    SERVICE            VERSION
22/tcp   filtered ssh
23/tcp   filtered telnet
25/tcp   open     smtp?
```

## 2.40.2.250
La segunda IP escogida tiene ubicación en Turin, Italia y corresponde a una VPN utilizada por Vodafone Italia. Al inicio siguiendo los comandos correspondientes, el cliente bloqueaba los sondeos que hacía nmap. Sin embargo, luego de un par de intentos se logró hacer el sondeo de forma exitosa.

Los puertos mostrados por Shodan son los siguientes:

![[IPShodan2.png]]

Sin embargo, al hacer el sondeo de puertos mediante nmap, podemos ver que también tiene abierto el puerto 25, correspondiente a el protocolo SMTP:

```shell
Completed NSE at 20:20, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 20:20
Completed Parallel DNS resolution of 1 host. at 20:20, 0.41s elapsed
Initiating Connect Scan at 20:20
Scanning net-2-40-2-250.cust.vodafonedsl.it (2.40.2.250) [1000 ports]
Discovered open port 25/tcp on 2.40.2.250
Discovered open port 445/tcp on 2.40.2.250
Completed Connect Scan at 20:20, 20.17s elapsed (1000 total ports)
Initiating Service scan at 20:20
Scanning 2 services on net-2-40-2-250.cust.vodafonedsl.it (2.40.2.250)
Completed Service scan at 20:21, 78.63s elapsed (2 services on 1 host)
NSE: Script scanning 2.40.2.250.
Initiating NSE at 20:21
Completed NSE at 20:23, 98.64s elapsed
Initiating NSE at 20:23
Completed NSE at 20:23, 7.65s elapsed
Initiating NSE at 20:23
Completed NSE at 20:23, 0.00s elapsed
Nmap scan report for net-2-40-2-250.cust.vodafonedsl.it (2.40.2.250)
Host is up (0.25s latency).
Not shown: 998 filtered tcp ports (no-response)
PORT    STATE SERVICE    VERSION
25/tcp  open  smtp?
```

## 104.218.234.234
La tercera IP corresponde a Spartan Host, una compañía para alojar servidores de Minecraft ubicada en Seattle, USA. Los puertos que se muestran en Shodan son los siguientes:

![[IPShodan3.png]]


En este caso, aparte de los puertos mostrados en Shodan,el puerto 25 también estaban abiertos:

```shell
Starting Nmap 7.95 ( https://nmap.org ) at 2024-09-02 20:29 -05
NSE: Loaded 157 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 20:29
Completed NSE at 20:29, 0.00s elapsed
Initiating NSE at 20:29
Completed NSE at 20:29, 0.00s elapsed
Initiating NSE at 20:29
Completed NSE at 20:29, 0.00s elapsed
Initiating Ping Scan at 20:29
Scanning 104.218.234.234 [2 ports]
Completed Ping Scan at 20:29, 0.32s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 20:29
Completed Parallel DNS resolution of 1 host. at 20:29, 0.22s elapsed
Initiating Connect Scan at 20:29
Scanning 104.218.234.234 [1000 ports]
Discovered open port 25/tcp on 104.218.234.234
Discovered open port 22/tcp on 104.218.234.234
```

# Conclusión
El laboratorio permitió aplicar técnicas de sondeo de puertos a tres IPs distintas obtenidas de Shodan utilizando la herramienta nmap. A través de este ejercicio, se logró identificar los puertos abiertos y los servicios asociados en cada dirección IP, lo que demuestra la utilidad de estas herramientas en el análisis y evaluación de la seguridad en redes. Además, la actividad proporcionó una comprensión más profunda de cómo se puede usar el sondeo de puertos para descubrir vulnerabilidades y posibles puntos de entrada en sistemas remotos. Esto subraya la importancia de una adecuada configuración de seguridad y de medidas preventivas para proteger la infraestructura de red ante posibles amenazas.