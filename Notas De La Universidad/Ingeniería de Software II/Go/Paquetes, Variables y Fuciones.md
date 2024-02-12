Entendiendo las diferentes herramientas básicas que conforman [[Go]].

**Tabla de Contenido**
```table-of-contents
```

# Paquetes

Cada programa de Go está hecho de Paquetes. Los programas se inician en el paquete `main`. Por ejemplo, el siguiente programa está usando los paquetes que se importan de `fmt` y `math/rand`.

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
}
```

Por términos de convención, el nombre del paquete es el mismo que el último elemento de el directorio de importación. Para este ejemplo, el paquete `math/rand` comprende los archivos que inician con la directiva `package rand`.
## Importaciones de Paquetes
Este código agrupa las importaciones de paquetes en una sola directiva de importación conformada de paréntesis.

```go
package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
}

```

Aunque se considera como buena práctica agrupar las importaciones en una sola directiva, también puedes importar los paquetes como:

```go
import "fmt"
import "math"
```
## Nombres Exportados
En Go, un nombre es importado si comienza con una letra mayúscula. Por ejemplo, `Pizza` es un nombre exportado, así como `Pi` es un nombre exportado del paquete `math`.

Por el contrario, `pizza` y `pi` no comienzan con una letra mayúscula por lo que no serán exportados.

> Cuando importes un paquete, solo puedes referirte a sus nombres exportados. Cualquier nombre que no esté exportado no se puede acceder desde afuera del paquete.

Por ejemplo, trata de correr el siguiente código y date cuenta del error:

```go
package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println(math.pi)
}
```

Para solucionar el error, solamente basta con renombrar `math.pi` a `math.Pi`.

# Funciones
Una función puede tomar cero o más argumentos. En este ejemplo, `add` toma dos parámetros de tipo `int`. 

>Anotación de Tato: Nota que el tipo de variable viene después de su nombre.

```go
package main
import "fmt"
func add(x int, y int) int {
	return x + y
}
func main() {
	fmt.Println(add(42, 13))
}
```

Para más información sobre el por qué de las sintaxis de las variables puedes visitar este link: [article on Go's declaration syntax](https://go.dev/blog/gos-declaration-syntax).

*To-Do: traducir el artículo de la declaración de sintaxis en Go.*

## Funciones Continuas
Cuando dos o mas parámetros consecutivos de funciones comparten un mismo tipo de variable, puedes omitir el tipo de todos los parámetros excepto del último. En este ejemplo acortamos `x int, y int` a `x, y int`. 

```go
package main

import "fmt"

func add(x, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
```

## Retorno de Múltiples Resultados
Una función puede retornar múltiples resultados. En este caso la función swap retorna dos strings.

```go
package main

import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
```

## Valores de Retorno Nombrados
En go, los valores de retorno se pueden nombrar. Si se nombran, son tratados como variables definidas en la parte superior de la función. Estos nombres pueden ser usados para documentar el significado de los valores de retorno.

Una declaración `return` sin argumentos retorna los valores de retorno nombrados. Esto es conocido como un *retorno descubierto*(*Naked Return*).

Las declaraciones de un retorno descubierto pueden ser usadas solo en funciones pequeñas, como con el ejemplo mostrado a continuación, debido a que pueden dificultar la legibilidad en funciones muy grandes.

```go
package main

import "fmt"

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func main() {
	fmt.Println(split(17))
}
```

# Variables
La declaración `var` declara una lista de variables; al igual que en la lista de argumentos de una función, el tipo de variable se coloca al último. Una declaración de `var` se puede hacer dentro de un paquete o dentro de una función.

```go
package main

import "fmt"

var c, python, java bool

func main() {
	var i int
	fmt.Println(i, c, python, java)
}
```

## Variables Inicializadas
Una declaración de variables también puede ser inicializada una vez por variable. Si una variable ya está inicializada, el tipo de variable se puede omitir debido a que la variable tomará el tipo del inicializador.

```go
package main

import "fmt"

var i, j int = 1, 2

func main() {
	var c, python, java = true, false, "no!"
	fmt.Println(i, j, c, python, java)
}
```

## Declaraciones cortas de una variable

Dentro de una función, la declaración de asignación `:=` puede usarse en lugar de usar una declaración de variable `var` con un tipo implícito.

Afuera de una función, cada declaración inicia con una palabra clave (`var`, `funct`, entre otras), por lo que la asignación `:=` no está disponible.

```go
package main

import "fmt"

func main() {
	var i, j int = 1, 2
	k := 3
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java)
}
```

## Tipos de datos básicos
Los tipos de datos básicos en Go son:
```
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex128
```

El ejemplo muestra variables de diferentes tipos, y también esas declaraciones de variables que pueden ser "factorizadas" en bloques, como con las declaraciones de una importación.

```go
package main

import (
	"fmt"
	"math/cmplx"
)

var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
	fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)
	fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt)
	fmt.Printf("Type: %T Value: %v\n", z, z)
}
```

Los tipos de datos `int`, `uint` y `uintptr` suelen tener 32 bits de ancho en sistemas de 32 bits, y 64 bits de ancho en sistemas de 64 bits. Cuando necesites un valor entero, debes usar un `int` a no ser que tengas una razón específica para usar un tipo de dato sized o unsigned.
## Conversiones de tipos
La expresión `T(v)` convierte el valor `v` al tipo `T`.

Algunas conversiones numéricas pueden ser:

```go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
```

o de manera simplificada:
```go
i := 42
f := float64(i)
u := uint(f)
```

A diferencia de C, en Go las asignaciones entre items de diferente tipos requieren una conversión explícita. Puedes intentar remover las conversiones de `float64` o `uint` en el siguiente ejemplo y ver lo que sucede.

```go
package main

import (
	"fmt"
	"math"
)

func main() {
	var x, y int = 3, 4
	var f float64 = math.Sqrt(float64(x*x + y*y))
	var z uint = uint(f)
	fmt.Println(x, y, z)
}
```

## Inferencia de tipos
Cuando declaras una variable sin especificar un tipo de dato explicito (es decir, sin usar las expresiones de sintaxis `:=` o `var =`), el tipo de variable se infiere dependiendo de el valor que se encuentre a la derecha.

Cuando el lado derecho de la declaración se tiene tipado, la nueva variable también será de ese tipo:

```go
var i int
j := i // j is an int
```

Pero, cuando el lado derecho contiene una constante numérica sin ningún numero a asignar, la nueva variable puede ser un `int`, `float64` o `complex128` dependiendo de la precisión de la constante.

```go
i := 42           // int
f := 3.142        // float64
g := 0.867 + 0.5i // complex128
```

## Constantes
Las constantes se declaran igual que las variables pero con la palabra clave `const`. Las constantes pueden ser de tipo string, booleano, o numérico. Las constantes no se pueden declarar usando la sintaxis `:=`

Las constantes numéricas son valores de alta precisión. Una constante sin un tipo específico, asigna el tipo de dato por su contexto.
# Recursos
- [Tour Explicativo de Go](https://go.dev/tour)