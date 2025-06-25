---
date: 2025-02-28
---
>[!Warning] Aviso
>Esta nota sirve como complemento a una redacción ya hecha sobre una [[Introducción a UNO Platform]]. La sintaxis de XAML puede variar dependiendo del uso que le quieras dar y el ambiente de trabajo en el que lo estés ejecutando.

Llamado como Extensible Aplication Markup Language es un lenguaje de marcado que fue diseñado y mantenido por Microsoft. Se usa para una programación declarativa de forma similar al HTML, y es bastante común cuando queremos declarar elementos de UI que tienen datos ligados a el. Algunos sistemas de UI que implementan XAML son Xamarin,Forms, UWP, WPF o Uno Platform.

La utilización de XAML se diferencia dependiendo del uso que se le de en cada sistema, sin embargo el XAML que utiliza Uno es similar a el XAML de UWP (Una Plataforma Universal de Windows). En el caso de Uno Platform, la cual es nuestra plataforma para usar como referencia, existen dos capas, la primera es aquella que usa XML como el lenguaje de marcado, y la segunda es llamada 'Code Behind', está escrita en C# y es la encargada de realizar los procesos de lógica detrás de la interfaz de usuario.

**Índice**

```table-of-contents
```
## Diseño de Paneles y Cuadrículas

El diseño de paneles nos permite organizar los controles en pantalla. Su utilización es variada, sin embargo los dos más comunes y sencillos de explicar se denominan **StackPanel** y **grid**.

Los StackPanels se amontonan encima de cada uno de forma vertical, o uno después del otro de forma horizontal, y de igual forma las cuadriculas denominadas como **grids** permiten organizar las celdas que pertenecen a una fila y una columna.
### Aplicación

- El grid nos permite controlar cuántas celdas dividirán nuestro diseño en términos de filas y columnas.
- Podemos usar las propiedades `Grid.Row` y `Grid.Column` para especificar a qué celda pertenece cada componente.
- Podemos usar Grid.RowSpan y Grid.ColumnSpan para permitir que cada componente tome el espacio de varias celdas.
- Además usamos $*$ para radios y números que representen un tamaño fijo.
- Por último, podemos usar Auto para que la celda tenga un tamaño automático asignado.

```xml
<Page
    x:Class="MiApp.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:MiApp">

    <Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
        
        <!-- Definimos una cuadrícula con 3 filas y 2 columnas -->
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/> <!-- Para el encabezado -->
            <RowDefinition Height="*" />   <!-- Para el contenido -->
            <RowDefinition Height="Auto"/> <!-- Para el footer -->
        </Grid.RowDefinitions>

        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="2*" /> <!-- Primera columna más ancha -->
            <ColumnDefinition Width="1*" /> <!-- Segunda columna más pequeña -->
        </Grid.ColumnDefinitions>

        <!-- Encabezado -->
        <TextBlock Text="Bienvenido a UNO Platform"
                   FontSize="24"
                   FontWeight="Bold"
                   Grid.Row="0"
                   Grid.ColumnSpan="2"
                   HorizontalAlignment="Center"
                   Margin="10"/>

        <!-- Contenido Principal -->
        <StackPanel Grid.Row="1" Grid.Column="0" Padding="20">
            <TextBlock Text="Este es un ejemplo de Grid y StackPanel"
                       FontSize="18" Margin="0,0,0,10"/>
            <Button Content="Presionar"
                    HorizontalAlignment="Stretch"
                    Click="OnButtonClick"/>
        </StackPanel>

        <!-- Barra lateral con opciones -->
        <StackPanel Grid.Row="1" Grid.Column="1" Padding="10">
            <TextBlock Text="Opciones:" FontSize="18"/>
            <Button Content="Opción 1" Margin="5"/>
            <Button Content="Opción 2" Margin="5"/>
            <Button Content="Opción 3" Margin="5"/>
        </StackPanel>

        <!-- Footer -->
        <TextBlock Text="Pie de Página"
                   FontSize="14"
                   Grid.Row="2"
                   Grid.ColumnSpan="2"
                   HorizontalAlignment="Center"
                   Margin="10"/>

    </Grid>
</Page>
```

## Stack Panels
El **StackPanel** es un contenedor de diseño en **UNO Platform** (y en tecnologías basadas en XAML como UWP y WPF) que organiza elementos de forma **vertical u horizontal** en una única línea, sin superposición.

Lo podemos usar cuando queremos colocar elementos en una **lista ordenada** o cuando los elementos deben alinearse **de forma natural en una sola dirección**

```xml
<StackPanel Orientation="Vertical" Padding="10">
    <TextBlock Text="Hola Mundo" FontSize="18"/>
    <Button Content="Click Aquí" Margin="5"/>
    <CheckBox Content="Acepto términos y condiciones" Margin="5"/>
</StackPanel>
```

## Estilos
Los estilos te permiten configurar propiedades a través de multiples componentes del mismo tipo, lo que te permite crear una vistas vistas consistentes alrededor de tu app. Los recursos también son definidos como estilos y luego los referenciamos a través de la app.

### Creando un estilo en XAML

```xml
<Page.Resources>
    <Style x:Key="BotonPersonalizado" TargetType="Button">
        <Setter Property="Background" Value="Blue"/>
        <Setter Property="Foreground" Value="White"/>
        <Setter Property="FontSize" Value="18"/>
        <Setter Property="Padding" Value="10,5"/>
    </Style>
</Page.Resources>
```

En este caso:
• `x:Key="BotonPersonalizado"` define un **identificador** para el estilo.
• `TargetType="Button"` indica que **solo** se aplicará a botones.
• Cada Setter establece una propiedad del control (Background, FontSize, etc.).

Y para aplicar un estilo a un botón, podemos usar:

```xml
<Button Content="Mi Botón" Style="{StaticResource BotonPersonalizado}"/>
```

En caso de que queramos aplicar un estilo de manera global, lo único que tenemos que omitir es el atributo `x:Key`.

### Estilos con Triggers

Para hacer que atributos como los colores cambien cuando haya algún evento como poner el mouse encima de un botón, podemos hacer lo siguiente:

```xml
<Style x:Key="BotonConHover" TargetType="Button">
    <Setter Property="Background" Value="Gray"/>
    <Setter Property="Foreground" Value="White"/>
    
    <Style.Triggers>
        <Trigger Property="IsPointerOver" Value="True">
            <Setter Property="Background" Value="DarkGray"/>
        </Trigger>
    </Style.Triggers>
</Style>
```

### Recursos Compartidos

Para reutilizar estilos en toda la app, guárdalos en un archivo separado (en mi caso, siempre los suelo llamar `Styles.xaml`).

Dentro de tu archivo (en mi caso `styles.xml`)

```xml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Style x:Key="BotonGlobal" TargetType="Button">
        <Setter Property="Background" Value="Navy"/>
        <Setter Property="Foreground" Value="White"/>
        <Setter Property="FontSize" Value="16"/>
        <Setter Property="Padding" Value="10"/>
    </Style>
</ResourceDictionary>
```

y para incluirlo en `app.xml`

```xml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="Styles.xaml"/>
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

## Unión de Datos

La **unión de datos** (Data Binding) permite conectar la interfaz de usuario (UI) con un modelo de datos, facilitando la actualización automática de los valores en la UI cuando el modelo cambia. Esto mejora la separación entre la lógica y la presentación, siguiendo el patrón **MVVM** (_Model-View-ViewModel_).

UNO Platform soporta dos enfoques principales de **binding** en XAML:

1. **{Binding}** – Más flexible, pero menos eficiente.
2. **{x:Bind}** – Más rápido y con comprobación en tiempo de compilación.

### Binding

El **binding tradicional** ({Binding}) permite enlazar datos de forma **dinámica**, conectando un objeto en DataContext con los elementos de la UI. Por ejemplo, si queremos usar un binding en un bloque de texto lo podemos hacer de la siguiente forma:

```xml
<TextBlock Text="{Binding Nombre}" FontSize="18"/>
```

Para esto, debemos definir un contexto de los datos que estamos utilizando por medio del código de C#

```c#
public class Persona
{
    public string Nombre { get; set; }
}

public MainPage()
{
    this.InitializeComponent();
    this.DataContext = new Persona { Nombre = "Juan Pérez" };
}
```


A su vez, si queremos que los cambios se reflejen tanto en el modelo como en la interfaz de usuario podemos utilizar `Mode+TwoWay` de la siguiente manera:

```xml
<TextBox Text="{Binding Nombre, Mode=TwoWay}" />
```

### {x:Bind}

{x:Bind} es una versión más rápida del binding, porque se compila en lugar de resolverse en tiempo de ejecución. **No requiere DataContext**, sino que enlaza directamente a propiedades de la clase del código detrás. Un ejemplo de cómo podríamos implementarlo sería la siguiente linea de código:

```xml
<TextBlock Text="{x:Bind MiPersona.Nombre}" FontSize="18"/>
```

A su vez, también tenemos que definir un objeto en el code-behind de C#

```C#
public class Persona
{
    public string Nombre { get; set; }
}

public sealed partial class MainPage : Page
{
    public Persona MiPersona { get; } = new Persona { Nombre = "Ana Gómez" };

    public MainPage()
    {
        this.InitializeComponent();
    }
}
```

### Binding Con Colecciones

En caso de necesitar usar el Binding con listas, podemos usar `Binding` o `x:Bind` para listas en controles como `ListView`. Por ejemplo, veamos la siguiente implementación en el xaml y el code behind:

```xml
<ListView ItemsSource="{x:Bind Personas}">
    <ListView.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Nombre}" FontSize="18"/>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

Y definimos la lista en el code-behind

```C#
public sealed partial class MainPage : Page
{
    public ObservableCollection<Persona> Personas { get; } = new ObservableCollection<Persona>
    {
        new Persona { Nombre = "Pedro" },
        new Persona { Nombre = "María" },
        new Persona { Nombre = "Luis" }
    };

    public MainPage()
    {
        this.InitializeComponent();
    }
}
```