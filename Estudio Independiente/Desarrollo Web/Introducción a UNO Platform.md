---
date: 2025-02-28
tags:
  - DesarrolloDeSoftware
  - Frameworks
---
# Objetivo
Crear una aplicación multiplataforma utilizando UNO Platform utilizando XAML y C#.
# Qué es Uno Platform?
Uno Platform es una plataforma de diseño basada en XAML y C#. Nos puede servir como un puente de plataformas que permite correr código basado en UWP (Universal Windows Platform) de forma nativa en Mac, IOS, Android y en buscadores utilizando WebAssembly.

La UI de XAML nos da la ventaja de generar la interfaz en todas las plataformas.

Además, esta tecnología se apoya de forma muy cercana con la tecnología de Microsoft llamada Xamarin, por medio de la utilización de C# para correr el código en todas las plataformas que este lenguaje soporte.

**UWP** es una tecnología de XAML que UNO expande a buscadores Web, MacOS, iOS y Android.

![[Pasted image 20250228182826.png]]

# Creando El Proyecto
Primero debemos tener en cuenta con qué dispositivo vamos a trabajar, debido a que si estamos trabajando aplicaciones de IOS desde Windows tendremos que buscar la manera de cargar la aplicación al dispositivo, debido a que Xamarin no lo soporta de forma nativa.

En un principio y si trabajamos con Visual Studio, debemos elegir como opción de proyecto: Cross Platform Application (Uno Platform), e inmediatamente se nos crearán los proyectos correspondientes a su plataforma:

![[Pasted image 20250228184212.png]]

La plantilla que se crea para este tipo de proyectos contiene un código común para todas las plataformas, y lo que queremos hacer es poner la mayor cantidad de código en la mayor cantidad de plataformas que se puedan.
## El Hola Mundo de UNO
La primera página que se muestra cuando corremos la App es tiene el nombre de `mainPage.xml` y la podemos encontrar dentro de la carpeta `nombreDelProyecto.Shared`.

1. **Page**: Representa la pantalla principal de la UI.
2. **Grid**: Contenedor que permite organizar elementos en una cuadrícula.
3. **TextBlock**: Control para mostrar texto.
4. **Background="{ThemeResource ApplicationPageBackgroundThemeBrush}"**: Usa los recursos de tema para la apariencia.
5. **x:Class="MiApp.MainPage"**: Conecta el XAML con su correspondiente código en C#.

```xml
<Page
    x:Class="MiApp.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:MiApp">

    <Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
        <TextBlock Text="¡Hola, UNO Platform!" 
                   HorizontalAlignment="Center" 
                   VerticalAlignment="Center"
                   FontSize="24"/>
    </Grid>

</Page>
```

Para correr una carpeta en específico como la plataforma que deseamos correr basta con dar click derecho en la carpeta y seleccionar la opción *set as startup project* o *Iniciar como proyecto de Arranque*

## Code-Behind
El **Code-Behind** es un archivo en C# que se encuentra asociado a cada archivo XAML en UNO Platform. Se usa para definir la lógica y comportamiento de la interfaz de usuario (UI). En otras palabras, **separa la presentación (XAML) del código funcional (C#)**, facilitando el mantenimiento del código y el desarrollo estructurado.

Cada archivo XAML tiene un archivo Code-Behind con la misma estructura de nombre pero con la extensión `.xaml.cs`. Dentro de este archivo se define la clase parcial (partial class), que complementa la definición de la UI con eventos, métodos y lógica de negocio.

Una estructura básica del Code Behind se ve así

```xml
<Page
    x:Class="MiApp.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">

    <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center">
        <TextBlock x:Name="TextoSaludo" Text="Hola, usuario" FontSize="24"/>
        <Button Content="Cambiar Saludo" Click="CambiarSaludo_Click"/>
    </StackPanel>
</Page>
```

En este caso qué estamos haciendo?

• Se define una página con un StackPanel que contiene un `TextBlock `y un `Button`.
• El TextBlock tiene un `x:Name="TextoSaludo"`, lo que permite acceder a él desde el Code-Behind.
• El botón tiene un evento` Click="CambiarSaludo_Click"`, lo que significa que su funcionalidad está definida en el Code-Behind.

Por otra parte, El archivo `MainPage.xaml.cs` maneja la lógica del botón y la interacción con la UI.

```C#
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace MiApp
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }

        private void CambiarSaludo_Click(object sender, RoutedEventArgs e)
        {
            TextoSaludo.Text = "¡Bienvenido a UNO Platform!";
        }
    }
}
```