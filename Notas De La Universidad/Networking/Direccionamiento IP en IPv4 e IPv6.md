Segunda clase de [[Networking]]

Direccionamiento IP: Protocolo mediante el cual nuestros dispositivos pueden conectarse para transmitir información.

>  **Diferencia:** Un celular no tenía la capacidad de enviar datos, podía enviar mensajes y llamar, sin embargo un smartphone si.

IPv4 (Protocolo de Internet versión 4) e IPv6 (Protocolo de internet versión 6). La diferencia entre una y otra radica en cuántos dispositivos se pueden conectar a las mismas.
# Diferencias clave en el direccionamiento

## Tamaño de la dirección:

### IPv4
32 bits expresada como cuatro números decimales separados por puntos representando cuatro octetos. (192.168.1.1).

##### Dirección Clase C
Los tres primeros octetos dentro de la dirección IP van a identificar el identificador de red, y el último octeto va a ser el host.

Para una clase C, la cantidad máxima de equipos que se pueden conectar equivale a $2^8 = 255$ debido a que solo tiene un octeto disponible para la cantidad de hosts.

##### Dirección Clase B
Los dos primeros objetos son para el identificador de red, y los dos últimos son identificadores del Host.

Para una clase B, la cantidad máxima de equipos que se pueden conectar equivale a $255^2 = 65025$ debido a que solo tiene dos octetos disponible para la cantidad de hosts.

##### Dirección Clase A
El primer octeto corresponde al identificador de red, y las siguientes tres corresponden a un identificador del host.

Para una clase A, la cantidad máxima de equipos que se pueden conectar equivale a $255^3 = 16581375$ debido a que solo tiene tres octetos disponible para la cantidad de hosts.
### IPv6
128 bits, expresada como ocho grupos de cuatro dígitos hexadecimales separados por dos puntos.

## Espacio de Direcciones:

### IPv4
Aproximadamente 4.300 millones de direcciones.
### IPv6
Un numero enormemente mayor de direcciones, aproximadamente 340 sextillones.
## Estructuración de la dirección:

### IPv4
Clases de direcciones (A,B,C,D,E) para diferentes tipos de redes.
### IPv6
No hay clases de direcciones, todas las direcciones son iguales.

## Representación

### IPv4
Solo números decimales
### IPv6
Números hexadecimales y ceros comprimidos. 

# Ejemplos de funciones de activación comunes.

## Mecanismos de asignación:

### IPv4
Asignación manual o automática mediante **DHCP** (***Dynamic Host configuration Protocol***).
## IPv6
Elección automática de direcciones (***Stateless Address Autoconfiguration***) como método principal.

## Ventajas e implicaciones

### IPv4

#### Ventajas
Amplia adopción, gran cantidad de dispositivos compatibles.
#### Implicaciones
Agotamiento del espacio de direcciones, vulnerabilidades de seguridad.

### IPv6

### Ventajas
Espacio de direcciones enorme, mayor seguridad, mejor rendimiento
## Implicaciones
Necesidad de actualizar infraestructura y dispositivos y menor adopción actual

# Partes y clases de una dirección IP

## Red
los primeros bits de la dirección IP identifican la red a la que pertenece el dispositivo. El número de bits que se utilizan para la red depende de la clase de la dirección IP.

## Máscara de subred
Es un número de 32 bits que se utiliza para dividir la dirección IP en dos partes: la parte de la red y la parte del host. La máscara de subred se expresa como cuatro números decimales separados por puntos, al igual que la dirección IP.
Se identifican con respecto a una dirección IP debido a la estructura de arranque que tienen.

| Máscara de Subred | Rango de direcciones IP     | Numero de bits para la red | Numero de bits para el host |
| ----------------- | --------------------------- | -------------------------- | --------------------------- |
| 255.0.0.0         | 0.0.0.0 - 127.255.255.255   | 8                          | 24                          |
| 255.255.0.0       | 128.0.0.0 - 191.255.255.255 | 16                         | 16                          |
| 255.255.255.0     | 192.0.0.0 - 223.255.255.255 | 24                         | 8                           |


# Como identificar la clase de una dirección IPv4
Las clases de direcciones IP v4 se pueden identificar por el valor del primer octeto de la dirección IP. la siguiente tabla muestra el rango de valores para cada clase

| Clase | Rango de direcciones | Número de Bits para la red |
| ---- | ---- | ---- |
| A | 0.0.0.0 - 127.255.255.255 | 1 |
| B | 128.0.0.0 - 191.255.255.255 | 2 |
| C | 192.0.0.0 - 223.255.255.255 | 3 |

# Puerta de enlace predeterminada
La puerta de enlace predeterminada, también conocida como *gateway* o *router*, es un dispositivo que actúa como un intermediario entre tu red local y otras sedes, como internet. Es el punto de salida para el tráfico de red que no se puede enviar directamente a otro dispositivo en la misma red.

## Funciones  principales

### Enrutamiento
La puerta de enlace predeterminada determina la ruta que debe tomar el tráfico de red para llegar a su destino. Analiza la dirección IP de destino y la compara con las rutas que conoce. Si la ruta no está en la misma red local, la puerta de enlace reenvía el tráfico al siguiente dispositivo en la ruta.

### Conexión a Internet
Si tu dispositivo está conectado a una red doméstica o empresarial, la puerta de enlace predeterminada te permite acceder a internet. Cuando envías una solicitud a un sitio web, la puerta de enlace la reenvía al servidor web correspondiente.
## Seguridad
La puerta de enlace puede actuar como un cortafuegos que mantiene los puertos lógicos cerrados y contenidos para proteger la red local de intrusiones externas. Puede filtrar el tráfico entrante y saliente para evitar accesos no autorizados y ataques cibernéticos.

