---
date: 2025-02-27
tags:
  - OctavoSemestre
---
>[!check] Hecho Por:
>- Santiago Naranjo Herrera
>  - Edgar Duván Bernal Acero
>  - Daniel Steven Hincapié Cetina

**Índice**
```table-of-contents
```
# Introducción

El objetivo de este taller es experimentar con diferentes valores y operaciones para afianzar los conocimientos básicos de entidades primitivas usando un lenguaje de programación en el contexto de un entorno en particular. En este caso utilizamos el lenguaje de programación llamado python debido a la facilidad con la que se pueden representar este tipo de entidades primitivas.

Para este taller se otorgó un contexto sobre el cual se debía trabajar cada punto, siendo el correspondiente a nuestro grupo el de simular el contexto de un supermercado. Por lo tanto, cada uno de los puntos aquí presentes estarán fundamentados bajo esta situación.

# Desarrollo
## Primer Punto

Para cada una de las siguientes variables, identifique el tipo de dato primitivo más apropiado y muéstrelo en pantalla:

- Edad de una persona
- Nombre de una ciudad
- Temperatura en grados Celsius
- Número de teléfono
- ¿Es verdadero o falso que una persona es mayor de edad?

En el contexto de este programa, se registran los datos básicos de registro de una persona que necesita acceder a un sistema determinado dentro de un supermercado. Los datos como la edad se pueden utilizar como verificación de aptitud para comprar algún tipo de bebida alcohólica.

```python

def primer_punto():|
	print("{:<60} {:<20} {:<15} {:<15}".format("Variables", "Tipo de dato", "Python", "Ejemplo"))|
	print("=" * 120)|
	print("{:<60} {:<20} {:<15} {:<15}".format("Edad de una persona", "Numérico", "int", 22))|
	print("{:<60} {:<20} {:<15} {:<15}".format("Nombre de una ciudad", "Alfanumérico", "string", "Facatativá"))|
	print("{:<60} {:<20} {:<15} {:<15}".format("Temperatura en grados Celsius", "Numérico", "int", 10))|
	print("{:<60} {:<20} {:<15} {:<15}".format("Número de teléfono", "Alfanumérico", "string", "3212861163"))|
	print("{:<60} {:<20} {:<15} {:<15}".format("¿Es verdadero o falso que una persona es mayor de edad?", "Lógico", "bool", "true"))|
	print("_" * 120)|
	#primer_punto()|
```
![[Pasted image 20250227095521.png]]
## Segundo Punto

Escribe un programa que realice las siguientes operaciones:
- Suma de dos números enteros
- Resta de dos números decimales
- Multiplicación de un número entero por un decimal
- División de dos números enteros (considera el caso de división por cero)

Bajo el contexto del supermercado, se realiza un menú que permite al cliente hacer diversas operaciones con una determinada cantidad de productos para determinar un precio y el cambio que se le debe devolver a la persona que quiere realizar la compra.

```python

def segundo_punto():
  entrada = 0
  while(True):
        entrada = int(input("Ingrese una opcion: \n 1.Suma de cantidad de productos \n 2.Calcular el cambio \n 3.Compra de varias cantidades de un producto \n 4.Dividir el costo total entre varias personas \n 0.para salir \n"))
        res = 0
        if(entrada == 1):
          while True:
              try:
                  s_1 = int(input("Ingrese el número de manzanas: "))
                  break
              except ValueError:
                  print("Error: Debes ingresar un número entero válido.")
          while True:
              try:
                  s_2 = int(input("Ingrese el número de peras: "))
                  break
              except ValueError:
                  print("Error: Debes ingresar un número entero válido.")
          suma = s_1 + s_2
          print(f"Lleva {suma} frutas en total")
          print("_" * 120)

        elif(entrada == 2):
          while True:
              try:
                  r_1 = float(input("Ingrese el valor de la factura (El decimal se separa con .): "))
                  break
              except ValueError:
                  print("Error: Debes ingresar un número decimal válido.")
          while True:
              try:
                  r_2 = float(input("Ingrese el valor del descuento (El decimal se separa con .): "))
                  break
              except ValueError:
                  print("Error: Debes ingresar un número decimal válido.")
          resta = r_1 - r_2
          print(f"El saldo es de {resta}")
          print("_" * 120)

        elif(entrada == 3):
          while True:
              try:
                  m_1 = int(input("Cantidad de peras: "))
                  break
              except ValueError:
                  print("Error: Debes ingresar un número entero válido.")
          while True:
              try:
                  m_2 = float(input("Valor por unidad (El decimal se separa con .): "))
                  break
              except ValueError:
                  print("Error: Debes ingresar un número decimal válido.")
          multiplicar = m_1 * m_2
          print(f"El total es de {multiplicar}")
          print("_" * 120)

        elif(entrada == 4):
          while True:
              try:
                  d_1 = int(input("Total de la cuenta: "))
                  break
              except ValueError:
                  print("Error: Debes ingresar un número entero válido.")
          while True:
              try:
                  d_2 = int(input("Numero de personas: "))
                  if d_2 == 0:
                      print("Error: No se puede dividir entre cero. Ingrese otro número.")
                      continue
                  break
              except ValueError:
                  print("Error: Debes ingresar un número entero válido.")
          dividir = d_1 / d_2
          print(f"Cada uno debe pagar {dividir} $")
        elif (entrada == 0):
            print ("Gracias por usar nuestro software")
            break
        else:
            print("Ingrese un numero valido")
            break
 
```

![[Pasted image 20250227095454.png]]

![[Pasted image 20250227095459.png]]

![[Pasted image 20250227095503.png]]
![[Pasted image 20250227095511.png]]
## Tercer Punto

Escribe un programa que realice las siguientes operaciones con cadenas:

- Concatenación de dos cadenas
- Extracción de una subcadena
- Conversión de una cadena a mayúsculas
- Cálculo de la longitud de una cadena

En el contexto proporcionado, se realiza este ejercicio como simulación de un carrito de compras para realizar diversas operaciones basadas en un producto.


```python

def tercer_punto():
    ent = int(input("Ingrese una opcion: \n 1.Actualizar un producto por la marca \n 2. Extraer el numero de tiket \n 3.Poner una categoria en mayusculas \n 4.Calcular la longitud de el nombre de un cliente \n 0. para salir\n"))
    while(True):
        # 1. Concatenación de dos cadenas
        if ent == 1 :
            producto = input("Ingrese un producto")
            marca = input("Ingrese la marca")
            descripcion = producto + " " + marca
            print("Producto actualizado:", descripcion)
        # 2. Extracción de una subcadena - Numero de Tiket
        if ent == 2 :
            ticket = input("Ingrese el tiket de la forma -- Compra #12345 - Total: $50.00 --")
            numero_compra = ticket[8:13]
            print("Número de compra extraído:", numero_compra)

        # 3. Conversión de una cadena a mayúsculas
        if ent == 3 :
            categoria = input("Ingrese la categoria")
            categoria_mayusculas = categoria.upper()
            print("Categoría en mayúsculas:", categoria_mayusculas)

        # 4. Cálculo de la longitud de una cadena - nombre del cliente
        if ent == 4 :
            nombre_cliente = input("ingrese el nombre del cliente")
            longitud_nombre = len(nombre_cliente)
            print("Longitud del nombre del cliente:", longitud_nombre)
        elif (ent == 0):
            print ("Gracias por usar nuestro software")
            break
        else:
            print("Ingrese un numero valido")
            break

```


![[Pasted image 20250227095402.png]]
![[Pasted image 20250227095431.png]]

![[Pasted image 20250227095440.png]]

![[Pasted image 20250227095446.png]]

## Cuarto Punto
Escribe un programa que compare dos valores (números o cadenas) y determine si son iguales, diferentes, mayores o menores.

```python
def cuarto_punto():
    def compare_values(a, b):
        if a == b:
            return "Los valores son iguales."
        elif a > b:
            return "El primer valor es mayor que el segundo."
        else:
            return "El primer valor es menor que el segundo."
    
    print("Seleccione el tipo de comparación:")
    print("1. Comparar precios de productos")
    print("2. Comparar stock de productos")
    print("3. Comparar nombres de productos")
    opcion = input("Ingrese una opción (1, 2 o 3): ")

    if opcion == "1":
        producto1 = input("Ingrese el nombre del primer producto: ")
        precio1 = float(input(f"Ingrese el precio de {producto1}: "))

        producto2 = input("Ingrese el nombre del segundo producto: ")
        precio2 = float(input(f"Ingrese el precio de {producto2}: "))

        print(compare_values(precio1, precio2))

    elif opcion == "2":
        producto1 = input("Ingrese el nombre del primer producto: ")
        stock1 = int(input(f"Ingrese la cantidad en stock de {producto1}: "))

        producto2 = input("Ingrese el nombre del segundo producto: ")
        stock2 = int(input(f"Ingrese la cantidad en stock de {producto2}: "))

        print(compare_values(stock1, stock2))

    elif opcion == "3":
        producto1 = input("Ingrese el nombre del primer producto: ")
        producto2 = input("Ingrese el nombre del segundo producto: ")

        print(compare_values(producto1, producto2))

    else:
        print("Opción no válida.")

```

![[Pasted image 20250227095338.png]]

![[Pasted image 20250227095346.png]]

![[Pasted image 20250227095355.png]]

## Quinto Punto 



Escribe un programa que convertirá un valor de un tipo a otro:

- De entero a decimal
- De decimal a cadena
- De cadena a entero (considera posibles errores de conversión)

```python
def quinto_punto():
    def convertir_precio_entero_a_decimal():
        """Convierte un precio ingresado como número entero a un formato decimal."""
        try:
            precio = int(input("💰 Ingrese el precio del producto sin decimales: "))
            print(f"✅ Precio registrado: ${float(precio):.2f}")
        except ValueError:
            print("❌ Error: Ingrese un valor numérico válido.")

    def convertir_precio_a_etiqueta():
        """Convierte un precio decimal en una etiqueta de texto para mostrarse en los productos."""
        def convertir_a_letras(numero):
            try:
                # Separar parte entera y decimal
                parte_entera = int(numero)
                parte_decimal = round((numero - parte_entera) * 100)  # Tomamos solo dos decimales

                # Convertir ambas partes a letras
                texto_entero = num2words(parte_entera, lang="es").capitalize()
                texto_decimal = num2words(parte_decimal, lang="es")

                if parte_decimal == 0:
                    return f"{texto_entero} pesos"
                else:
                    return f"{texto_entero} pesos con {texto_decimal} centavos"
            except:
                return "❌ Número no válido"

        try:
            precio = float(input("💲 Ingrese el precio del producto: "))
            print(f"🏷️ Etiqueta generada: 'Precio: ${convertir_a_letras(precio)}'")
        except ValueError:
            print("❌ Error: Ingrese un valor decimal válido.")

    def convertir_stock_a_entero():
        #Convierte una cantidad de stock ingresada como texto en un número entero.
        def convertir_cadena_a_entero(cadena):
            try:
                numero = w2n.word_to_num(cadena)  # Convierte la cadena a número
                return f"✅ Conversión exitosa: {numero}"
            except ValueError:
                return "❌ Error: La cadena no es un número válido"
        try:
            stock = input("📦 Ingrese la cantidad en stock (en texto ): ").lower()
            print(convertir_cadena_a_entero(stock))
        except ValueError:
            print("❌ Error: Ingrese un número entero válido para el stock.")

    while True:
        print("\n🛒 **Supermercado - Sistema de Conversión de Datos** 🏬")
        print("1️⃣ Convertir precio de producto (entero a decimal)")
        print("2️⃣ Generar etiqueta de precio (decimal a texto)")
        print("3️⃣ Registrar stock de producto (cadena a número entero)")
        print("0️⃣  Salir")

        opcion = input("Seleccione una opción (1-4): ")

        if opcion == "1":
            convertir_precio_entero_a_decimal()
        elif opcion == "2":
            convertir_precio_a_etiqueta()
        elif opcion == "3":
            convertir_stock_a_entero()
        elif opcion == "0":
            print("👋 Saliendo del sistema de conversión. ¡Gracias por usar nuestro servicio!")
            break
        else:
            print("❌ Opción no válida, seleccione una opción del 1 al 4.")

```

![[Pasted image 20250227095329.png]]
## Sexto Punto

Escribe un programa que utilice variables booleanas para representar condiciones yrealizar operaciones lógicas (AND, OR, NOT).
```python
def sexto_punto():
    def verificar_descuento():
        """Determina si un cliente recibe un descuento basado en su membresía y el monto de su compra."""
        es_cliente_vip = input("¿El cliente tiene membresía VIP? (sí/no): ").strip().lower() == "sí"
        compra_minima = float(input("Ingrese el monto total de la compra: "))

        descuento_aplicado = es_cliente_vip and compra_minima >= 50  # AND: debe ser VIP y gastar ≥ 50
        print(f"✅ Descuento aplicado: {descuento_aplicado}")

    def verificar_promocion():
        """Verifica si un cliente recibe una promoción por ser VIP o por comprar productos en oferta."""
        es_cliente_vip = input("¿El cliente tiene membresía VIP? (sí/no): ").strip().lower() == "sí"
        producto_en_oferta = input("¿El producto está en oferta? (sí/no): ").strip().lower() == "sí"

        promocion_aplicada = es_cliente_vip or producto_en_oferta  # OR: solo uno de los dos es suficiente
        print(f"🎉 Promoción activada: {promocion_aplicada}")

    def verificar_disponibilidad():
        """Determina si un producto está agotado utilizando la operación NOT."""
        producto_en_stock = input("¿El producto está disponible en el inventario? (sí/no): ").strip().lower() == "sí"

        agotado = not producto_en_stock  # NOT: si no hay stock, el producto está agotado
        print(f"❌ Producto agotado: {agotado}")

    while True:
        print("\n🛒 **Supermercado - Sistema de Condiciones Lógicas** 🏬")
        print("1️⃣ Verificar si un cliente recibe un descuento (AND)")
        print("2️⃣ Comprobar si un cliente obtiene una promoción (OR)")
        print("3️⃣ Revisar si un producto está agotado (NOT)")
        print("0️⃣  Salir")

        opcion = input("Seleccione una opción (1-4): ")

        if opcion == "1":
            verificar_descuento()
        elif opcion == "2":
            verificar_promocion()
        elif opcion == "3":
            verificar_disponibilidad()
        elif opcion == "0":
            print("👋 Saliendo del sistema de condiciones. ¡Gracias por usar nuestro servicio!")
            break
        else:
            print("❌ Opción no válida, seleccione una opción del 1 al 4.")

```

![[Pasted image 20250227095321.png]]
## Septimo Punto

Utiliza tipos de datos primitivos para crear estructuras simples como:

- Un registro que almacene el nombre y la edad de una persona
- Un array que contiene una lista de números

```python
def septimo_punto():
  asociado = bool(int(input("¿El cliente es asociado? (1: Si, 0: No): ")))
  producto_oferta = bool(int(input("¿El producto esta de oferta? (1: Si, 0: No): ")))
  varios = bool(int(input("¿lleva mas de 5 productos? (1: Si, 0: No): ")))

  #Se aplica un descuento si lleva mas de 5 productos Y es asociado
  descuento_and = varios and asociado

  #Se aplica un descuento adicional si el producto esta de oferta O es asociado
  descuento_or = producto_oferta or asociado

  #Si NO es asociado pagara el parqueadero
  descuento_not = not asociado

  print(f"¿Recibe descuento por llevar mas de 5 productos Y ser asociado? -> {descuento_and}")
  print(f"¿Recibe descuento por oferta o ser asociado? -> {descuento_or}")
  print(f"¿Debe pagar parqueadero? -> {descuento_not}")
def septimo_punto():
    """Utilizar los tipos de datos primitivos para crear estructuras simples."""

    # Capturar datos del cliente
    nombre = input("Ingrese su nombre: ")
    edad = int(input("Ingrese su edad: "))

    # Lista de precios de productos
    precios = []
    cantidad = int(input("Ingrese la cantidad de productos comprados: "))

    for i in range(cantidad):
        precio = float(input(f"Ingrese el precio del producto {i + 1}: "))
        precios.append(precio)

    # Mostrar la información registrada
    print("\n--- Registro del Cliente ---")
    print(f"Nombre: {nombre}")
    print(f"Edad: {edad}")
    print("Lista de precios de productos:", precios)


```

![[Pasted image 20250227095306.png]]

## Octavo Punto

Plantea un problema sencillo que requiere el uso de entidades primitivas para su solución. 
Por ejemplo:
- Calcular el área de un triángulo dados su base y altura
- Determinar si un número es par o impar
- Encontrar el número mayor de una lista de números

```python
def octavo_punto():
    """
    Problema:
    Un supermercado desea calcular el total a pagar por un cliente aplicando un descuento.
    Se debe solicitar al usuario:
    - El precio total de la compra.
    - El porcentaje de descuento a aplicar.
    
    La solución debe calcular y mostrar:
    - El monto descontado.
    - El total final a pagar.
    """

    # Solicitar datos al usuario
    precio_total = float(input("Ingrese el precio total de la compra: "))
    descuento = float(input("Ingrese el porcentaje de descuento (%): "))

    # Calcular el monto descontado y el total a pagar
    monto_descuento = (precio_total * descuento) / 100
    total_pagar = precio_total - monto_descuento

    # Mostrar los resultados
    print("\n--- Factura ---")
    print(f"Subtotal: ${precio_total:.2f}")
    print(f"Descuento aplicado: ${monto_descuento:.2f}")
    print(f"Total a pagar: ${total_pagar:.2f}")


```

![[Pasted image 20250227095245.png]]