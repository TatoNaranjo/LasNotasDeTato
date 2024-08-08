Explicación de como dividir las redes para [[Networking]]
## ¿Qué es el Subnetting?
Es la técnica de dividir una red IP grande en subredes más pequeñas. Su analogía es equivalente a dividir una casa en diferentes habitaciones más pequeñas.

Hay dos formas de hacerlo:
- Que todas las redes sean del mismo tamaño
- Por división

![[Subnetting.png]]
## ¿Por qué se utiliza el subnetting?

### Mejora la eficiencia
Permite un uso más eficiente del espacio de las direcciones IP, evitando el desperdicio de direcciones en redes pequeñas. Esto solo funciona si utilizo una red dividida.
### Mejora la seguridad
Permite segmentar la red en zonas con diferentes niveles de seguridad, dificultando el acceso no autorizado a áreas sensibles.
### Mejora el rendimiento
Reduce el tráfico de broadcast, y mejora la velocidad de red al dirigir los paquetes de datos de forma más precisa, esto debido a que ya no se trabaja con Switches sino con routers que envían los datos directamente a la dirección IP que tengan asignada.
### Facilita la administración
Permite organizar la red de forma más lógica y facilita la gestión de los dispositivos y usuarios.

## ¿Cómo funciona el Subnetting?

El subnetting se realiza mediante la máscara de subred. La máscara de subred es un número binario que se utiliza para dividir la dirección IP en dos partes: La parte de red y la parte de host. La parte de red identifica la subred la subred a la que pertenece un dispositivo, mientras que la parte de host identifica al dispositivo específico dentro de la subred.

![[Clases IPV4 y Máscaras de Subnet.png]]

### Ejemplo

| Dirección IPv4 | Mascara de red | Parte de Red | Parte del Host |
| -------------- | -------------- | ------------ | -------------- |
| 10.10.10.6     | /8             | 8 bits       | 24 bits        |
| 172.16.100.20  | /16            | 16 bits      | 16 bits        |
| 192.168.1.23   | /24            | 24 bits      | 8 bits         |
| 175.7.10.15    | /16            | 16 bits      | 16 bits        |
| 223.178.96.15  | /24            | 24 bits      | 8 bits         |
| 25.12.250.23   | /8             | 8 bits       | 24 bits        |
|                |                |              |                |

### ¿Cómo se escribe una máscara de subred?

| /#  | Decimal Punteado | Clase C |
| --- | ---------------- | ------- |
| /8  | 255.0.0.0        | A       |
| /16 | 255.255.0.0      | B       |
| /24 | 255.255.255.0    | C       |
## Dirección de Red vs Broadcast
### Dirección de red
- La dirección de red identifica una red específica dentro de un conjunto de redes interconectadas. Es como el nombre de una calle en una ciudad. Todos los dispositivos que se encuentran en la misma red comparten la misma dirección de red.
#### Componentes
- Parte de red: Identifica la red a la que pertenece un dispositivo.
- Parte de Host Identifica un dispositivo específico dentro de la red

#### Ejemplo
Consideremos la dirección IP *192.168.1.10* y la máscara de subred *255.255.255.0*:

La *Parte de red* es *192.168.1.0*, lo que indica el dispositivo pertenece a la red *192.168.1.0/24*

La *Parte de host* es *10*, lo que identifica al dispositivo específico dentro de la red.

### Dirección de Broadcast
Una dirección IP especial que se utiliza para enviar mensajes a *todos* los dispositivos de una red al mismo tiempo. Es como un megáfono que se utiliza para hacer un anuncio a todos los residentes de una calle.

Cuando una dirección IP se hace pasar por el dueño original de esta dirección de Broadcast, puede interceptar la información. Este tipo de ataque se conoce como Broadcast Relay o ARP Relay.
#### Valor
- La dirección de broadcast se calcula tomando la dirección de red y cambiando todos los bits de la parte de host a *1*

#### Ejemplo
- En la red *192.168.1.0/24*, la dirección de broadcast es 192.168.1.255.

#### Funciones
- Permite enviar mensajes a todos los dispositivos de la red.
- Se utiliza para descubrir dispositivos en la red.
- Se utiliza para realizar tareas de administración de red.

## Estructura de la dirección IP

![[Estructura de la dirección IP.png]]

Un espacio de subred siempre toca los bits de hosts, y nunca los de red.

### Requisitos
La mascara de subred debe suplir la necesidad de direcciones IP para host para la subred más grande.

![[requisitosSubnetting.png]]
$2^h -2 >=$ tamaño de la subred más grande.

### Conceptos

- Una *VLAN (Virtual Local Area Network)* o red de area local virtual, las VLANs se configuran con switches gestionables.
- *E.WAN* es la abreviatura para *Ethernet Wide Area Network*, que en español significa *Red de área amplia Ethernet*.
- *E.LAN* o red de area local emulada, es una tecnología que permite crear redes de área local virtuales (VLANs) dentro de una red de área Extensa (WAN).

![[ConceptosSubnetting.png]]

### Subredes del mismo tamaño

![[SubredesMismoTamaño.png]]

$2^h-2>=$ tamaño de la subred más grande
$2^8-2=254$ IP's
$255.255.255.0$

### Máscara de Subred de Longitud Variable
Es un método de subnetting que permite crear subredes de diferentes tamaños
![[SubredesMismoTamaño.png]]

- Para los 230 host
$2^8-2=254$ IP's
$255.255.255.0$

- Para los routers
$2^2-2=2$ IP's
$255.255.255.252$

- Para cada uno de los 50 host
$2^6-2=62$ IP's
$255.255.255.192$


## Ejercicio
**1. Escriba la máscara de subred correspondiente a cada una de estas direcciones en formato IP y cuantos bits a cada uno:**

- 177.100.18.4
- 119.18.45.0
- 191.249.234.191
- 223.23.223.109
- 10.10.250.1
- 126.123.23.1
- 223.69.230.250
- 192.12.35.105
- 77.251.200.51
- 189.210.50.1
- 88.45.65.35
- 128.212.250.254
- 193.100.77.83
- 125.125.250.1
- 1.1.10.50
- 220.90.130.45
- 134.125.34.9
- 95.250.91.99


223.69.230.250

| Dirección IPv4 | Mascara de red | Parte de Red | Parte del Host | Decimal Punteado | Clase | Binario                            |
| -------------- | -------------- | ------------ | -------------- | ---------------- | ----- | ---------------------------------- |
| 223.69.230.250 | /24            | 24 bits      | 8 bits         | 255.255.255.0    | C     | 11011111.1000101.11100110.11111010 |
