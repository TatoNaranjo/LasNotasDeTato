---
date: 2024-03-25
tags:
  - Redes
---

# Conversiones De Bases Rápidas

## De Decimal a Binario

- No hace falta dividir entre 2 cada número, simplemente basta con hacer las potencias y primero, encontrar el número más cercano al solicitado. Luego, simplemente buscar la suma que lo complemente.
## De Binario a Decimal

- Simplemente utiliza el mismo enfoque de conversión decimal a binaria. Apóyate de la tabla de potencias.

## De Hexadecimal A Binario

Cambia el dígito del número con sus cuatro dígitos binarios equivalentes.

|Hexadecimal|Binario|
|---|---|
|0|0000|
|1|0001|
|2|0010|
|3|0011|
|4|0100|
|5|0101|
|6|0110|
|7|0111|
|8|1000|
|9|1001|
|A|1010|
|B|1011|
|C|1100|
|D|1101|
|E|1110|
|F|1111|
### De Hexadecimal a Decimal.

#### Construyendo un número Decimal
Si los números decimales funcionan con una base de números de 10, podemos suponer que cada dígito funciona bajo una potencia de 10. 

#### Ejemplo
Si dividimos el número $5032$ en partes más pequeñas, podemos darnos cuenta de que el último digito representa una potencia de $10^0$, el siguiente elemento de derecha a izquierda representa un $10^1$, y así sucesivamente, por lo que si tuviéramos que armar el número decimal por sus partes tendríamos que multiplicar un dígito por su equivalente lugar en la base. Por lo tanto, el número que proporcionamos se construye de la siguiente forma :

| Dígito | Lugar en la Base | Resultado |
| ---- | ---- | ---- |
| 5 | $10^3$ | 5000 |
| 0 | $10^2$ | 0 |
| 3 | $10^1$ | 30 |
| 2 | $10^0$ | 2 |
|  |  | 5032 |

#### Construyendo un número hexadecimal

Gracias al proceso de arriba, podemos replicar el funcionamiento de la construcción de un número decimal para pasar nuestro número hexadecimal a un número decimal, contemplando el hecho de que esta vez estaremos trabajando con una base $16^n$. En el caso de tener alguna letra, debes de tener en cuenta su valor en decimal para poder aplicar la conversión de manera correcta. Recuerda que la letra $A$ equivale a el número $10$, $B$ equivale a $11$ y así sucesivamente hasta llegar a la letra $F$.

#### Ejemplo

***3A7FBD***

| Dígito | Lugar en la Base | Resultado |  |
| ---- | ---- | ---- | ---- |
| 3 | $16^5 = 1048576$ | 3145728 |  |
| A = 10 | $16^4 = 65536$ | 655360 |  |
| 7 | $16^3 = 4096$ | 28672 |  |
| F = 15 | $16^2 = 256$ | 3840 |  |
| B = 11 | $16^1 = 16$ | 176 |  |
| D = 13 | $16^0 = 1$ | 13 |  |
|  | NUMERO FINAL | 3833789 |  |
|  |  |  |  |

# Tabla de Potencias del 16
|Potencia|Resultado|
|---|---|
|16^0|1|
|16^1|16|
|16^2|256|
|16^3|4096|
|16^4|65536|
|16^5|1048576|
|16^6|16777216|
|16^7|268435456|
|16^8|4294967296|
|16^9|68719476736|
|16^10|1099511627776|
|16^11|17592186044416|
|16^12|281474976710656|
|16^13|4503599627370496|
|16^14|72057594037927936|
|16^15|1152921504606846976|
|16^16|18446744073709551616|
|16^17|295147905179352825856|
|16^18|4722366482869645213696|
|16^19|75557863725914323419136|
|16^20|1208925819614629174706176|

#### Convertir en decimal y binario:

2001:0db8:86a3:0000:0000:8a2e:3070:7334

