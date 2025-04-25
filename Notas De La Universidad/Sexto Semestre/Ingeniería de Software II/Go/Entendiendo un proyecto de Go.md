---
date: 2024-05-15
tags:
  - DesarrolloDeSoftware
  - Go
  - Aplicaciones
---

**Tabla de Contenido**
	`Por: Santiago Naranjo Herrera`
```table-of-contents
```


# Variables de Entorno

Si en la consola colocamos el comando:

```shell
go env
```

veremos todas las variables de entorno del lenguaje de [[Go]]. La variable de entorno que determina en donde se instalarán los paquetes que vayamos a utilizar en el lenguaje lleva la sintaxis:

```shell
set GOPATH=C:\Users\Tato\go
```

Aparte, la siguiente variable de entorno sirve para comunicarle a Go en donde se encuentra instalado en nuestro PC:

```shell
set GOROOT=C:\Program Files\Go
```

En versiones anteriores de Go, teníamos que crear el espacio dentro de una carpeta llamada workspace, que podíamos encontrar en las directivas de Go. Sin embargo, ahora solo hace falta crear una carpeta y a través de algo llamado *Módulos de Go* podemos inicializar un proyecto (Algo parecido a NodeJS con *npm* o Python con *env*).

# ¿Cómo Trabajar en un Proyecto de Go?
## Inicializando el Proyecto

En la consola de VSCode ya con el lenguaje instalado, procedemos a escribir el siguiente comando:

```go
go mod init [Url única]
```

Cuando nos referimos a una URL Única hablamos normalmente del repositorio de GitHub en el que vamos a alojar el proyecto (*Ten en cuenta que la URL debe ir sin las llaves que se muestran en el código.*).

>Anotación de Tato: Si no quieres alojar el proyecto en un repositorio de GitHub, solo basta con poner el nombre de una carpeta. Por ejemplo:

```go
go mod init example/hello
```

Luego de ejecutar el comando se creará un archivo `go.mod`, que es el encargado de decirnos qué librerías y dependencias se necesitan para que la aplicación funcione, conforme vamos haciendo que el proyecto crezca y vamos añadiendo librerías. Cuando vayamos importando paquetes y librerías también se creará un archivo llamado `go.sum`, que será el que nos diga cuales son las dependencias de las dependencias del proyecto.

Luego, procedemos a crear un archivo `main.go`. 

>Anotación de Tato: *No te olvides de instalar las extensiones recomendadas por VSCode, para ayudarte a escribir código de una forma más rápida, tener formateo automático de código y en generar configurar de mejor manera tu entorno de trabajo en go*

**Si quieres comprobar que el código funciona bien, puedes copiar este template de inicio y pegarlo en tu archivo `main.go` **

```go
package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}
```

El proyecto se ejecuta en consola por medio de el comando:

```go
go run .
```

## Creando una Build del Proyecto
Para crear una build del proyecto de go, lo único que tenemos que hacer es ejecutar el comando:

```go
go build .
```

Este comando nos crea un ejecutable en formato `.exe` del proyecto que ya está compilado y se puede correr de la misma manera que si se estuviera usando el comando de `go run .`


# Referencias
- [Go, Instalación en Windows y Primera aplicación en VSCode - Fzst Code](https://www.youtube.com/watch?v=lQVhwSJpkqg)
- [Getting Started - Documentación de Go](https://go.dev/doc/tutorial/getting-started)