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
No hay clases de direcciones, todas las direcciones so iguales.

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
