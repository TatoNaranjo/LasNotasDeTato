[[Networking]] 


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

| Dígito | Lugar en la Base | Resultado |
| ---- | ---- | ---- |
| 3 | $16^5 = 1048576$ | 3145728 |
| A = 10 | $16^4 = 65536$ | 655360 |
| 7 | $16^3 = 4096$ | 28672 |
| F = 15 | $16^2 = 256$ | 3840 |
| B = 11 | $16^1 = 16$ | 176 |
| D = 13 | $16^0 = 1$  | 13 |
|  | NUMERO FINAL | 3833789 |
