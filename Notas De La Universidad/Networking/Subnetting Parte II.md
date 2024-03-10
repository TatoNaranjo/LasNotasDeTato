Segunda parte de la clase de Subredes de [[Networking]]
# Restando bits de host para crear subredes
Para crear subredes, se toman bits prestados del campo de host de la máscara de subred. Al restar bits de host, se aumenta el número de subredes disponibles, pero se reduce el número de hosts por subred.
![[restaBitsHost.png]]

# Cálculo de Subredes
Para calcular las subredes se puede utilizar la siguiente formula:
$2^s$ en donde $s$ = número de bits restados a la parte de host.

$2^s-2$ calcular los host necesarios

## Ejemplo usando una dirección IP clase C
- Subredes 200
- Host/subred 230
- Usando una dirección clase C 192.168.0.0/24
![[ejemploSubnettingC.png]]
$2^s$
$s$ = número de bits restados a la parte del host

Cuántos bits necesito para conectar esas 200 subredes? $8$
Cuántos bits tengo disponibles para conectar las $200$ subredes? $8$

¿Puedo usar una dirección clase C para tener 200 subredes con 230 hosts? No, porque el hecho de conectar esas 200 subredes ya me consume todos los bits, hay que escalar de clase.
$2^8$ = 256

## Ejemplo usando una dirección IP clase B
- Subredes 200
- Host/subred 230
- Usando una dirección clase B 172.16.0.0/16

![[ejemploClaseB.png]]

$s$ = número de bits restados a la parte del host

255.255.*0*.0 -> $2^h-2$ = 254
$2^8=256$

El tercer octeto se tiene totalmente ocupado, utilizándolo para las subredes.

En este caso, partimos la casilla de hosts en 2: $8$ para subred, y otros $8$ para hosts.

## Ejemplo usando una dirección IP Clase A
- Subredes 200
- Host/subred 230
- Usado una dirección clase A 10.10.0.0/8

![[ejemploSubnettingClaseA.png]]

255.*0*.0.0 -> $2^h-2$ = 254
$2^8=256$

El tercer octeto se tiene totalmente ocupado, utilizándolo para las subredes.

En este caso, partimos la casilla de hosts en 2: $12$ para subred, y otros $12$ para hosts.

## Como listar las Subredes

| Network ID                                       | Subnet Broadcast Address                          | IP Adresses                          |
| ------------------------------------------------ | ------------------------------------------------- | ------------------------------------ |
| Número más bajo en la subred no asignable a host | Número más alto en la subred  no asignable a host | Números entre network ID y Broadcast |
### Ejemplo
- Subredes 200
- Host/subred 230
- Usando una dirección clase B 172.16.0.0/16


| Subred      | Primer IP   | Última IP     | Dirección del Broadcast |
| ----------- | ----------- | ------------- | ----------------------- |
| 172.168.0.0 | 172.168.0.1 | 172.168.0.254 | 172.168.0.255           |
| 172.168.1.0 | 172.168.1.1 | 172.168.1.254 | 172.168.1.255           |
| 172.168.2.0 | 172.168.2.1 | 172.168.2.254 | 172.168.2.255           |
| 172.168.3.0 | 172.168.3.1 | 172.168.3.254 | 172.168.3.255           |
| 172.168.4.0 | 172.168.4.1 | 172.168.4.254 | 172.168.4.255           |
| 172.168.5.0 | 172.168.5.1 | 172.168.5.254 | 172.168.5.255           |
| 172.168.6.0 | 172.168.6.1 | 172.168.6.254 | 172.168.6.255           |

## Dirección de Broadcast
No todas las direcciones de broadcast terminan en 255, esto dependerá de la máscara de subred.

### Ejemplo
- Red 172.16.0.0
- Máscara de Subred 255.255.255.192/25