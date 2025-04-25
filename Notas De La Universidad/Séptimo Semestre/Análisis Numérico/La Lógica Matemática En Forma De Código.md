---
date: 2024-07-25
tags:
  - Matemáticas
  - Scripting
  - Proyectos
  - Python
---

La Primera actividad de [[Análisis Numérico]] consistió en crear cinco scripts de código con el objetivo de abordar la lógica detrás de distintas operaciones y fórmulas matemáticas. En este documento se describirá el proceso detrás de la creación de los tres algoritmos mediante el lenguaje de programación escogido: `Python`.



> Trabajo Realizado Por: **Edgar Duván Bernal Acero, David Santiago Sierra, Santiago Naranjo Herrera** 
## Primer Algoritmo: La Lógica Detrás De Una División
El primer algoritmo consiste en crear una función que pueda replicar el funcionamiento de una operación básica de división entre dos números, con la restricción de no usar el símbolo usado para realizar la operación en los dispositivos electrónicos: `/`. 

### Código

```python

# a: Dividendo
# b: Divisor

def division(a,b):

	# Primer Proceso: Inicializar un residuo y un contador
	# de reducciones.
	
    residuo = a
    times = 0

	# Segundo Proceso: Contar cuántas veces se debe reducir
	# el residuo para que sea menor al divisor
	
    while residuo >= b:
      times += 1
      residuo -= b

	# Tercer Proceso: Construir la parte decimal de la 
	# respuesta
	
    decimales = 0
    
    while residuo > 0 and decimales < 100:
      residuo = residuo * 10
      deci = 0
      while residuo >= b:
        deci += 1
        residuo -= b
      decimales = decimales * 10 + deci
      
	# Cuarto proceso: Devolver la respuesta
    return float(f"{times}.{decimales}")
```

### Explicación
El código se compone de una función que recibe dos parámetros: `a y b`, en donde `a` es igual al **dividendo** de la operación y `b` es igual al **divisor** de la operación.

A su vez, la función se divide en cuatro procesos importantes:

- **Inicializar un residuo y un contador:** En esta parte del código, inicializamos una variable que equivale a el `residuo` inicial de la operación, que a su vez equivale al dividendo (`a`) que ingresa a la función. Además se inicializa un contador (`times`) que funciona para registrar cuántas veces se tiene que reducir el residuo para llegar a ser menor que el divisor (`b`).
- **Reducir el residuo hasta que sea menor que el divisor**: En esta parte del código procedemos a construir la primera parte de la división (La parte entera) mediante el conteo de las veces que se puede reducir el `residuo` si este es mayor a su divisor (`b`). 
- **Construir la parte decimal de la respuesta:** Para empezar, definimos una variable que es descrita como los números decimales de la respuesta. Luego, procedemos a recrear la acción de añadir un cero al residuo multiplicándolo por diez (`residuo = residuo * 10`) para replicar las acciones del primer y segundo proceso, es decir: reducir el residuo que ha sido multiplicado por diez hasta que sea menor que el divisor, contando cuántas veces se necesita reducir el nuevo residuo (Mediante la variable `deci`) para llegar a ser menor que el divisor. El ciclo se detiene cuando el residuo llega a ser menor o igual a cero.
- **Devolver la Respuesta:** En este punto, la respuesta se devuelve como una unión entre la parte entera y la parte decimal que se vino construyendo durante todo el algoritmo. Sin embargo, es necesario aclarar que la función devuelve una respuesta en una variable de tipo flotante, debido a que esta función se utilizará para realizar otras operaciones.

## Segundo Algoritmo: El Área De Un Triángulo
El segundo algoritmo consiste en replicar el funcionamiento de la operación para hallar el área de un triángulo: `area = (base * altura)/2`. Sin embargo, para realizar esta operación se optó por seguir la misma restricción del algoritmo anterior, es decir, no será posible utilizar el símbolo que describe a la división dentro de un lenguaje de programación: `/`. 
### Código

```python

# Segundo Proceso: Construir la función de división
def division(a,b):
    residuo = a
    times = 0

    while residuo >= b:
      times += 1
      residuo -= b
    decimales = 0
    while residuo > 0 and decimales < 100:
      residuo = residuo * 10
      deci = 0
      while residuo >= b:
        deci += 1
        residuo -= b
      decimales = decimales * 10 + deci
    return float(f"{times}.{decimales}")

# Tercer Proceso: Construir el área del triángulo
def areaTriangulo(base,altura):
    return division(base*altura,2)

# Primer Proceso: Solicitar los datos e imprimir la respuesta
# Posterior

base = int(input("Ingresa la medida de la base del triángulo: "))

altura = int(input("Ingresa la medida de la altura del triángulo: "))

print("El área del triángulo es:",areaTriangulo(base,altura))
```

### Explicación
Al igual que el anterior algoritmo, este código también se divide en distintas fases que conforman el funcionamiento del proceso para calcular el área de un triángulo. Debido a que la restricción de no usar el operador de división se mantiene en este algoritmo, se optó por reutilizar el primer algoritmo para construir una solución basada en la fórmula `Área = (Base * Altura)/2`.

Esta vez, el código entero se divide en tres procesos importantes: 

- **Solicitar los datos e imprimir la respuesta posterior:** La función que calcula el área de un triángulo recibe dos variables, que son la `base` del triángulo y la `altura` del triángulo. Estos datos son solicitados al usuario mediante la consola del sistema, a su vez también se imprime la respuesta mediante la consola cuando los cálculos estén hechos.
- **Construir la función de división:** Para poder calcular el área de un triángulo sin recurrir a el operador de división, se reutilizó la función de división hecha en el primer algoritmo. Su funcionamiento se describió de forma detallada anteriormente en el documento.
- **Construir el área del Triángulo:** Finalmente, se procede a construir la respuesta solicitada mediante la fórmula descrita para calcular el área de un Triángulo, devolviéndola en forma de una variable de tipo flotante.

## Tercer Algoritmo: La longitud de la circunferencia
El tercer algoritmo consiste en crear un programa que pueda devolver la longitud de una circunferencia descrita. La particularidad de este algoritmo reside en la forma de calcular dicha longitud, dado a que la longitud de la circunferencia se puede calcular si se tiene la medida de su radio o si se tiene la medida de su diámetro. 
### Código

```python
import math
pi = math.pi

# Primer Proceso: Definir si se tiene un diámetro o un radio
decision = int(input("¿Bajo qué Condiciones desea realizar el cálculo de la longitud de la circunferencia?\n1. Tengo el diámetro del Círculo\n2. Tengo el Radio del Círculo\n"))

# Segundo Proceso: Construir la Respuesta en base a un Diámetro
if decision==1:
    d = input("Ingresa el diámetro del circulo (En Centímetros): ")
    for i in range (6, 1, -1):
      diameter = round(float(d), i)
      npi = round(pi, i)
      a = pi*diameter
      print(f"La longitud de la circunferencia es: {a} con una precision de {i} decimales, pi = {npi} y diámetro = {diameter}")

# Tercer Proceso: Construir la Respuesta en base a un Radio

elif decision == 2:
    r = input("Ingresa el radio del circulo: ")
    for i in range (6, 1, -1):
      radius = round(float(r), i)
      npi = round(pi, i)
      a = 2*pi*radius
      print(f"La longitud de la circunferencia es: {a} con una precision de {i} decimales, pi = {npi} y radio = {radius}")

# Cuarto Proceso: Validar una Opción Incorrecta
else:
    print("Has elegido una opción inválida, inténtalo de nuevo")
```
### Explicación
Esta vez, el código no se construye mediante una función debido a que necesitaremos usar dos fórmulas totalmente diferentes para calcular la longitud de la circunferencia. También, hemos decidido imprimir la respuesta con diferentes precisiones para demostrar la diferencia entre resultados cuando se trabaja con mas o menos números decimales.

El código consta de cuatro procesos fundamentales para su funcionamiento:

- **Definir si se tiene un Diámetro o un Radio:** Debido a que las dos fórmulas para hallar una longitud de la circunferencia difieren entre si, es necesario saber si la respuesta que se va a entregar (En centímetros) corresponde a el diámetro de la circunferencia o al radio de la circunferencia.
- **Construir la respuesta en base a un diámetro:** La primera solución requiere que el usuario escriba la medida del diámetro de la circunferencia, para posteriormente realizar un cálculo que se basa en la fórmula: `longitud = pi * diámetro`. Al final, se imprime la respuesta y se detiene el programa.
- **Construir la respuesta en base a un radio:** La segunda solución requiere que el usuario escriba la medida del radio de la circunferencia, para posteriormente realizar un cálculo que se basa en la fórmula: `longitud = 2 * pi * radio`. Al final se imprime la respuesta y se detiene el programa.
- **Validar una opción incorrecta:** En caso de que el usuario no haya elegido una opción válida, el programa le indicará que debe volver a repetir el proceso de selección entre un diámetro o un radio.

## Cuarto Algoritmo: El Área De Un Trapecio

El cuarto algoritmo creado consiste en hallar el área de un trapecio mediante la fórmula `area = (baseSuperior+BaseInferior)*altura/2`. Sin embargo, para realizar esta operación se optó por seguir la misma restricción del algoritmo inicial, es decir, no será posible utilizar el símbolo que describe a la división dentro de un lenguaje de programación: `/`. 
### Código

```python

# Segundo Proceso: Construir la función de división
def division(a,b):
    residuo = a
    times = 0

    while residuo >= b:
      times += 1
      residuo -= b
    decimales = 0
    while residuo > 0 and decimales < 100:
      residuo = residuo * 10
      deci = 0
      while residuo >= b:
        deci += 1
        residuo -= b
      decimales = decimales * 10 + deci
      
    return float(f"{times}.{decimales}")

# Tercer Proceso: Construir el área del trapecio
def areaTrapecio(a,b,c):
    answer = division((a+b),2)*c

    print("El Area del Trapecio es:", answer)

# Primer Proceso: Solicitar los datos requeridos
a = int(input("Por favor, ingresa la medida de la base superior del trapecio:"))
b = int(input("Por favor, ingresa la medida de la base inferior del trapecio:"))
c = int(input("Por favor, ingresa la medida de la altura del trapecio:"))

```

### Explicación
Al igual que el anterior algoritmo, este código también se divide en distintos procesos que conforman el funcionamiento del proceso para calcular el área de un trapecio. Debido a que la restricción de no usar el operador de división se mantiene en este algoritmo, se optó por reutilizar el primer algoritmo para construir una solución basada en la fórmula `area = (baseSuperior+BaseInferior)*altura/2`.

El código se divide en los siguientes tres procesos fundamentales:

- **Solicitar los datos requeridos:** Para poder retornar la respuesta requerida, es necesario que el usuario escriba las medidas de la base superior del trapecio, la base inferior del trapecio y finalmente la altura del trapecio, mediante la consola de comandos.
- **Construir la función de división:** Para poder calcular el área de un trapecio sin recurrir a el operador de división, se reutilizó la función de división hecha en el primer algoritmo. Su funcionamiento se describió de forma detallada anteriormente en el documento.
- **Construir el área del Trapecio:** Finalmente, se procede a construir la respuesta solicitada mediante la fórmula descrita para calcular el área de un trapecio, devolviéndola en forma de una variable de tipo flotante.

## Quinto Algoritmo: El Área del Círculo
El quinto y último algoritmo consiste en un código que calcula el área de un círculo cuando se tiene su radio como referencia. Un detalle adicional agregado al código es la posibilidad de ir disminuyendo los números decimales luego del punto para comprender cuánto se ve afectada la precisión de la respuesta.

### Código
```python
import math
pi = math.pi
# Primer Proceso: Solicitar los datos
r = input("Ingrese el radio del circulo: ")

# Segundo Proceso: Ajustar la precisión de la respuesta
for i in range (6, 1, -1):
  radius = round(float(r), i)
  npi = round(pi, i)
  # Tercer Proceso: Calcular la respuesta e imprimirla
  a = radius * radius * npi
  print(f"El area del circulo es: {a} con una precision de {i} decimales, pi = {npi} y radio = {radius}")
```

### Explicación
El código se divide en tres procesos básicos que describen su funcionamiento, los cuales son:

- **Solicitar los datos:** En este proceso se solicita al usuario que escriba el radio del círculo.
- **Ajustar la precisión de la respuesta:** Este proceso es conformado por un ciclo que va disminuyendo hasta que no hayan números decimales por procesar. Lo que se busca es redondear la respuesta hasta mostrar el decimal propuesto.
- **Calcular la respuesta e imprimirla:** Ahora que la variable de `pi` ha sido modificada, lo único que queda es calcular la respuesta en base a la fórmula $Area = radio^2*pi$. Luego, se procede a imprimir la misma, junto con los decimales a los que ha sido redondeada.

