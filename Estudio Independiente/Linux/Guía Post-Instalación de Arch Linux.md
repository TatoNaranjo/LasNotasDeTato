---
date: 2024-08-26
tags:
  - Linux
  - Arch
---

Bueno, parece que ya has completado la instalación de tu nueva distribución de Linux, eso significa que has dado el primer paso y has completado una hazaña dentro del mundo de las distribuciones de [[Linux]]. Ahora que tu sistema está en marcha es hora de que conozcas los pequeños componentes sobre los cuales se encuentra construido para facilitar tu acceso y personalizarlo para que se ajuste a tus necesidades. 

En este post exploraremos una serie de pasos y herramientas recomendadas para sacarle provecho a tu nueva instalación de Arch, desde configuraciones básicas hasta ajustes avanzados basados en mi experiencia para que tu experiencia con Linux sea más poderosa y fluida. ¿Qué te parece?

# Índice
- ¿Qué es un entorno de escritorio?
- Cómo Instalar Aplicaciones (Yay y Pacman)
- Paquetes recomendados
- Alternativas de Aplicaciones (Reproductor de música, photoshop, word)
- Troubleshooting (Nvidia y sus complicaciones con arch)
- Diferencia entre Xorg y Wayland
- Extensiones de Gnome - Puede ser un post aparte
- Qué es un servidor gráfico
- Cómo encontrar los drivers de red

# ¿Qué es un entorno de Escritorio?
Un entorno de escritorio es una capa de software que se coloca sobre el sistema operativo de tu computadora, proporcionando una interfaz gráfica más amigable y personalizable para interactuar con tu PC. Es importante destacar que durante la instalación de Arch Linux, todo se realiza a través de la consola, y aunque podrías realizar las operaciones más básicas desde ella, el sistema también ofrece la opción de escoger un entorno de escritorio que replique e incluso mejore la experiencia que podrías tener con otros sistemas operativos como Windows o macOS.

Si lo llevamos a una analogía, podríamos imaginar que nuestro PC es como una casa, donde el sistema operativo representa la estructura básica (como paredes, piso y techo). En este caso, el entorno de escritorio sería como los muebles que utilizamos para decorar los diferentes espacios de nuestra casa, tales como la barra de tareas, el gestor de archivos, y el editor de texto.

Si nunca has utilizado un sistema operativo basado en Linux, es probable que hayas elegido un entorno básico preconfigurado como GNOME o KDE. Para saber qué entorno gráfico estás utilizando, puedes ingresar el siguiente comando en la consola:

```bash
echo $XDG_CURRENT_DESKTOP
```

Además, puedes cambiar el entorno gráfico al iniciar sesión en tu PC, justo antes de ingresar tu contraseña. Solo necesitas presionar el ícono de engranaje en la parte inferior derecha, donde aparecerá un menú con todos los entornos de escritorio instalados en tu sistema.

Debes tener en cuenta que existen diferentes entornos gráficos que ofrecen distintos niveles de libertad en la personalización de los "muebles de tu casa". Después de un tiempo usando el sistema, te animo a probar distintos entornos de escritorio para darle un toque único a tu espacio de trabajo.

Aquí tienes algunos entornos de escritorio conocidos.

- **GNOME:** Uno de los entornos de escritorio más utilizados, conocido por su diseño limpio y moderno.
- **KDE:** Ofrece una gran cantidad de opciones de personalización y una amplia gama de aplicaciones.
- **XFCE:** Un entorno ligero y rápido, ideal para equipos con recursos limitados.
- **Cinnamon:** Basado en GNOME, pero con un aspecto más tradicional y familiar para los usuarios de Windows.
- **Hyprland**: Es un entorno que ofrece una personalización completa de tu Sistema Operativo debido a que su uso parte de únicamente una consola. (Personalmente, estoy incursionando en el para crear mi propia personalización del sistema, y me está encantando. Puedes ver una imagen de referencia de mi personalización en la imagen de la portada de este post).

# ¿Qué es un Servidor Gráfico?

En el mundo de los sistemas operativos modernos, un servidor gráfico juega un papel fundamental en la gestión de la interfaz gráfica del usuario (GUI). Es el componente que te permite a ti como usuario, la posibilidad de interactuar con el sistema a través de gráficos y ventanas, en lugar de solo texto. Cuando estamos hablando de conceptos que debes entender luego de instalar tu Sistema Operativo Arch, también hablo sobre entender cómo funciona un servidor gráfico porque se vuelve un elemento clave para configurar tu entorno de escritorio de una forma efectiva y como más desees.

Un servidor gráfico, también conocido como servidor X en sistemas basados en Linux, es un software que actúa como intermediario entre el hardware gráfico (como tu tarjeta gráfica) y las aplicaciones que deseas ejecutar. Su función principal es manejar la entrada y salida de gráficos, gestionar la visualización de ventanas y coordinar la interacción del usuario con la interfaz gráfica.

Cuando abres una aplicación gráfica en tu sistema, el servidor gráfico se encarga de renderizar las ventanas y los elementos gráficos que aparezcan en tu pantalla. También recibe las entradas del teclado y el ratón, enviándolas a la aplicación correspondiente. Además, el servidor gráfico administra cómo se dibujan y se actualizan las imágenes en pantalla, asegurando que todo funcione de manera fluida y coherente.

# La Diferencia Entre Xorg y Wayland
Cuando inicias sesión en tu PC por medio de un entorno de escritorio, estás eligiendo cómo quieres que se muestren las aplicaciones de tu entorno de trabajo. Es por ello que debes conocer las diferencias entre dos de los servidores de visualización de aplicaciones más utilizados en Linux.
## Xorg
Rs el servidor de visualización más antiguo y ampliamente utilizado en distribuciones de Linux. Funciona como un servidor central que gestiona todas las operaciones gráficas, desde la interacción del usuario hasta la presentación de contenido en la pantalla. Su arquitectura es cliente-servidor, donde las aplicaciones se conectan al servidor Xorg para mostrar sus interfaces gráficas.
## Wayland
Es un protocolo de composición más moderno y ligero. A diferencia de Xorg, Wayland no actúa como un servidor central, sino como un compositor que coordina la comunicación entre las aplicaciones y el hardware gráfico. Cada aplicación se comunica directamente con el compositor, lo que resulta en un sistema más eficiente y escalable. Sin embargo, su arquitectura hace que la curva de aprendizaje de este protocolo sea mas lenta debido a la incompatibilidad que hay con algunas aplicaciones.

# ¿Cómo instalar Aplicaciones?
Arch es conocido por ser un sistema simple y flexible, afortunadamente para ti, querido usuario de Linux, estas características también están cuando hablamos de instalar de aplicaciones. En este sistema operativo, los usuarios cuentan con múltiples herramientas para gestionar software, desde las utilidades oficiales hasta soluciones ofrecidas por la comunidad y sistemas de distribución universales.

En Arch Linux, la instalación de aplicaciones puede llevarse a cabo principalmente a través de tres métodos: `Pacman`, el gestor de paquetes oficial; `Yay`, una poderosa herramienta para acceder al Arch User Repository (AUR); y `Flatpak`, una opción que permite instalar aplicaciones en un entorno aislado. Cada uno de estos métodos ofrece ventajas particulares, y juntos, cubren prácticamente cualquier necesidad que puedas tener al momento de buscar, instalar y actualizar software en tu sistema.

A continuación se cubrirá el proceso de instalación de cada uno de los tres paquetes de forma individual:
## Pacman
El comecocos favorito de los videojuegos retro ahora también se ha convertido en el gestor de paquetes oficial de este sistema operativo. Pacman instala las aplicaciones directamente de los repositorios oficiales de Arch Linux. Dichos paquetes de aplicaciones son mantenidos por el equipo oficial de Arch, por lo que puedes estar plenamente seguro de que las aplicaciones que instales a partir de este gestor serán altamente estables y seguras. Además, Pacman gestiona los paquetes de manera directa, integrándolos completamente con el sistema. Esto significa que las aplicaciones instaladas con Pacman están profundamente integradas en tu entorno de Arch y no están aisladas.

Para instalar un paquete debes utilizar el siguiente comando:

```shell
sudo pacman -S nombre-del-paquete
```

Por ejemplo, si quieres instalar el editor de texto Vim, puedes usar el comando:

```shell
sudo pacman -S vim
```

Si deseas desinstalar un paquete, basta con utilizar el comando:

```bash
sudo pacman -R nombre-del-paquete
```

**Es importante tener los paquetes actualizados para que las aplicaciones funcionen correctamente, puedes hacerlo a través de el siguiente comando:**

```shell
sudo pacman -Syu
```

## Yay
Yet Another Yaourt es otro repositorio de aplicaciones (Conocidos también como AUR Helpers) que facilita la instalación de los paquetes tanto de sus repositorios oficiales como también del repositorio oficial de Arch (AUR). El repositorio oficial de Arch es un espacio en el que diferentes programadores pueden subir sus aplicaciones y mantener sus propios paquetes, lo que significa que este repositorio de aplicaciones amplía la cantidad de software disponible incluyendo Apps que no están en los repositorios oficiales. Al igual que Pacman, Yay integra completamente las aplicaciones con el sistema. Sin embargo, como los paquetes en el AUR son mantenidos por la comunidad, pueden ser menos estables o seguros que los del repositorio oficial, aunque suelen estar más actualizados o incluir software más especializado.

Para utilizar Yay primero tienes que instalar el repositorio de aplicaciones, mediante los siguientes comandos:

```bash
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

Listo!, ya puedes instalar cualquier aplicación utilizando el siguiente comando:

```bash
yay -S nombre-del-paquete
```

Por ejemplo, si deseas instalar Google Chrome:

```bash
yay -S google-chrome
```

Para actualizar todos los paquetes que tengas instalados mediante Yay, puedes utilizar el siguiente comando:

```bash
yay -Syu
```

Si deseas eliminar un paquete instalado con Yay, puedes usar el mismo comando de pacman: 

```bash
sudo pacman -R nombre-del-paquete
```

## Flatpak
Flatpak permite instalar las aplicaciones mediante un **entorno aislado** (también conocido como sandbox). Esto significa que cada aplicación tiene su propio conjunto de dependencias y a su vez están apartadas del sistema. Esto puede mejorar la seguridad a la hora de instalar las aplicaciones, pero puede hacer que el uso del espacio de almacenamiento de tu disco sea elevado.

Para comenzar a instalar aplicaciones por medio de Flatpak, lo primero que debes hacer es instalar la tienda de aplicaciones por medio de pacman mediante el siguiente comando:

```bash
sudo pacman -S flatpak
```

Una vez instalada, puedes acceder a la [página oficial](https://flathub.org/) de Flatpak para instalar lo que necesites.

# Paquetes Recomendados
¿Estás pensando en dar el salto a Linux pero te preocupa perder tus aplicaciones favoritas de Windows? No te preocupes, yo pensaba lo mismo hasta que descubrí algo...

A lo largo de mi estadía en Linux, me he dado cuenta de que una de las razones por las que no extraño volver a utilizar Windows, es porque la mayoría de aplicaciones también están disponibles o tienen una alternativa que funciona de forma similar a su contraparte original. Es por ello que hoy quiero compartirte algunas de las aplicaciones que suelo usar y que te recomiendo instalar en Arch para incursionar dentro de este Sistema Operativo sin perder la comodidad de tu anterior entorno de trabajo.
## Productividad y Oficina
### Suites de Office
Lamentablemente, la suite de Office hecha por Microsoft no está disponible para Sistemas Operativos de Linux, sin embargo puedo decirte que una de las opciones que más recomiendo para solventar esta carencia es la Suite de [WPS Office](https://wiki.archlinux.org/title/WPS_Office), la cual fue creada por Kingston (Si, la misma empresa que hay visto tallada varias veces en las USBs que sueles comprar).

Puedes descargar WPS Office mediante el siguiente comando:

```bash
yay -S wps-office
```

## Compatibilidad con Software de Windows
### Wine
Wine (siendo un acrónimo en ingles para Wine Is Not An Emulator), es una interfaz de programación de aplicaciones que nos permite correr archivos ejecutables en Linux de forma nativa y sin tener que recurrir a máquinas virtuales en el proceso. Si necesitas ejecutar un `.exe` este software puede llegar como una solución altamente eficiente en la mayoría de casos.

Puedes instalarlo siguiendo esta [Guía de Instalación](https://dev.to/yofreormaza/instalar-wine-en-arch-linux-4bok)

### Proton
Adelantándonos un poco, podemos ver que en la tienda de videojuegos de Steam hay aplicaciones que son compatibles de forma nativa con las distribuciones de Linux, y otras aplicaciones que no están disponibles para este sistema Operativo. Proton es un software desarrollado por Valve que ofrece una capa de compatibilidad y permite correr tus juegos favoritos de Windows en Linux usando como base a Wine.

Para instalar este software basta con ir a las opciones de la aplicación de Steam y buscar la opción de compatibilidad dentro del Videojuego que desees ejecutar. Para una explicación más detallada puedes seguir esta [Guía](https://www.howtogeek.com/738967/how-to-use-steams-proton-to-play-windows-games-on-linux/).
## Navegadores Web
### Brave
Brave es un navegador web que se enfoca en la privacidad y en el bloqueo de anuncios. Ofrece características como la navegación privada, o el bloqueo de rastreadores; y es por ello que se ha vuelto mi navegador favorito desde hace más de dos años. Una característica importante es que es compatible con las extensiones de Chrome de forma nativa.

Puedes instalarlo utilizando Pacman:

```bash
sudo pacman -S brave-bin
```
## Multimedia
### VLC
Aunque Spotify sea mi reproductor de música favorito por defecto, VLC sigue siendo un reproductor muy usado tanto en Windows como en Linux, así que si eres de los que sigue escuchando música descargada en formato digital, o quieres ver algún video, puedes instalarlo mediante el siguiente comando:

```bash
yay -S vlc
```
## Creatividad y Diseño
### GIMP
Es la alternativa por defecto a Adobe Photoshop, muchos usuarios adoran esta aplicación debido a que es totalmente gratis y contiene las mismas herramientas que la suite de Adobe original, puedes instalarla mediante este comando:

```bash
yay -S gimp
```

### DaVinci Resolve
Es un software potente de edición de video y corrección de color, conocido por su uso en producciones profesionales. Puedes instalarlo mediante este link:

```
yay -S davinci-resolve-bin

```

## Gaming
¿Quién dijo que no se podía jugar en Linux?
### Steam
El mítico cliente y tienda #1 de videojuegos que todos usábamos en Windows también está para Arch. ¿Lo mejor de todo? Viene con el ya mencionado Software de proton, que hace que puedas correr tus juegos favoritos de Windows en Linux. Puedes instalarlo mediante el siguiente comando:

```bash
yay -S steam
```
### Heroic Games Launcher
Es una aplicación de código abierto diseñada para facilitar la gestión y el lanzamiento de juegos desde la tienda Epic Games Store en sistemas Linux. Ofrece una interfaz gráfica que permite a los usuarios instalar, actualizar y ejecutar juegos de Epic Games sin necesidad de usar el cliente oficial de Windows. Puedes instalarla mediante el siguiente Comando:

```bash
yay -S heroic-games-launcher
```
### RetroArch
Es un sistema de emuladores de videojuegos que puedes utilizar para revivir tus mejores momentos en tus consolas favoritas. Esta aplicación permite correr juegos de consolas antiguas y de consolas de generaciones pasadas como la Xbox 360. Puedes instalarlo mediante el siguiente comando:

```bash
yay -S retroarch
```

# Introducción a la personalización con GNOME
GNOME, el entorno de escritorio predeterminado en muchas distribuciones de Linux, ofrece una experiencia intuitiva y elegante, pero su verdadero potencial se libera cuando se adentra en la personalización. En Arch, uno de los entornos más flexibles y poderosos, GNOME permite una personalización exhaustiva para adaptarse a tus necesidades y preferencias.

Una de las herramientas más potentes para personalizar GNOME son las extensiones. Estas pequeñas aplicaciones modifican y mejoran el comportamiento del entorno de escritorio, permitiéndote ajustar la apariencia, funcionalidad y experiencia general del sistema. Desde añadir nuevas funcionalidades a la barra de tareas hasta modificar el diseño de la interfaz, las extensiones ofrecen una gran variedad de opciones para personalizar GNOME según tus gustos.

Para empezar a personalizar GNOME en Arch Linux, necesitarás instalar y activar algunas herramientas esenciales. La principal es [GNOME Shell Extensions](https://chromewebstore.google.com/detail/integraci%C3%B3n-con-gnome-she/gphhapmejobijbbhgpjhcjognlahblep), una extensión que permite gestionar otras extensiones desde el propio entorno de escritorio. También es útil instalar [GNOME Tweaks](https://archlinux.org/packages/extra/any/gnome-tweaks/), una aplicación que proporciona un acceso más profundo a las configuraciones del sistema y las extensiones instaladas.

Al explorar las opciones de personalización, te darás cuenta de que GNOME ofrece una gran flexibilidad para adaptar tu entorno de escritorio a tus necesidades. Aunque en este post no abordaré mucho el tema de las extensiones específicas que puedes utilizar, es importante destacar que la comunidad de GNOME y Arch Linux cuenta con una vasta colección de extensiones que puedes explorar para encontrar las que mejor se adapten a tu estilo de trabajo y preferencias personales.

En un futuro post, me adentraré en algunas de las extensiones más populares y que más suelo utilizar en mi ambiente de GNOME, proporcionando recomendaciones y guías sobre cómo instalarlas y configurarlas. Mientras tanto, te invito a experimentar con la personalización de GNOME y descubrir cómo puedes mejorar tu experiencia en Arch Linux.


# Troubleshooting

## Cómo Encontrar tus Drivers de Red

Luego de instalar Arch, uno de los aspectos cruciales es asegurarse de que el hardware de red esté funcionando correctamente. Esto puede incluir tanto adaptadores de red inalámbricos como por cable. Si el hardware de red no es reconocido automáticamente durante la instalación, es posible que necesites encontrar e instalar los drivers adecuados para que funcione correctamente. Aquí te puedo dar unas nociones básicas sobre como hacerlo en una serie de pasos.

**1. Identificar tu Hardware de Red**

El primer paso es identificar el hardware de red en tu sistema. Puedes utilizar el comando `lspci` para listar los dispositivos PCI, que incluirán la mayoría de las tarjetas de red:

```bash
lspci | grep -i network
```

Para adaptadores de red USB, utiliza `lsusb`:

```bash
lsusb
```

Estos comandos te ayudarán a identificar el fabricante y el modelo de tu adaptador de red, información crucial para buscar los drivers adecuados.

**2. Consultar la Wiki de Arch Linux**

La Wiki de Arch Linux es una excelente fuente de información para encontrar los drivers necesarios. La página de [Configuración de Red](https://wiki.archlinux.org/title/Network_configuration) proporciona detalles sobre cómo configurar diversos adaptadores de red y puede tener enlaces a paquetes específicos o drivers recomendados para tu hardware.

**3. Buscar e Instalar Drivers**

Una vez que hayas identificado tu hardware, busca el driver correspondiente en los repositorios de Arch Linux. Utiliza `pacman`, el gestor de paquetes de Arch, para buscar e instalar el driver adecuado. Por ejemplo, si necesitas instalar el driver para una tarjeta de red Intel, puedes buscar en el repositorio usando pacman:

```bash
pacman -Ss intel
```

**4. Configurar el Servicio de Red**

Después de instalar el driver, asegúrate de que el servicio de red esté configurado y habilitado. Para redes por cable, puedes utilizar `systemd-networkd` o `NetworkManager`, dependiendo de tus preferencias y necesidades. Para redes inalámbricas, también puedes configurar `wpa_supplicant` si estás usando `systemd-networkd`.

**5. Verificar la Conexión**

Finalmente, verifica que tu adaptador de red esté funcionando correctamente. Usa el comando `ip link` para comprobar si el dispositivo de red aparece en la lista de interfaces. Luego, intenta conectarte a una red y verifica la conexión con un ping:

```bash
ping www.google.com
```


Esta es la parte del post en la que trataré problemas comunes que he ido experimentando al momento de utilizar Arch para que tu no tengas que sufrir buscando una solución. Se irá actualizando constantemente, por lo que puede que tu solución se encuentre aquí.
## NVIDIA Y Sus Problemas Con Arch
Al momento de utilizar un PC que tiene procesadores o tarjetas gráficas de NVIDIA, muchas personas han encontrado bastantes conflictos que los hacen devolverse a Windows en vez de encontrar una solución. Sin embargo, es importante mencionarte que la [Wiki de Arch](https://wiki.archlinux.org/title/NVIDIA) tiene una guía bastante detallada sobre como configurar correctamente los drivers para que todo vaya genial en tu Sistema Operativo.

# Conclusion
Fiu!, por fin he terminado de redactar esta guía. Como un chico que lleva siendo usuario de distribuciones de Linux por más de dos años, puedo decirte que nunca me he divertido tanto aprendiendo conceptos y llevando al máximo la personalización de mi ambiente de desarrollo y trabajo. Te invito a que no te detengas y sigas explorando este mundo maravilloso mediante la lectura de foros de discusión, grupos de Reddit y muchos... pero muchos repositorios en GitHub. Si la publicación te ha gustado te invito a compartirla con tus amigos que estén pensando en dejar el miedo de soltar Windows y pasar al lado divertido y de Software Libre de los Sistemas Operativos.  Muy probablemente iré actualizando este post con más links útiles y creando algunos más para profundizar en algunos conceptos mencionados aquí; pero hasta que eso pase, nos veremos en una siguiente ocasión.

**- Tato, Fuera**

# Referencias
- Asesoría para organización de temas en el índice: [Santorar](https://github.com/santorar) 
- [Desktop Environment - Arch Wiki](https://wiki.archlinux.org/title/Desktop_environment_(Espa%C3%B1ol))
- [Find Desktop Environment - ItsFoss](https://itsfoss.com/find-desktop-environment/)
- [XOrg - Arch Wiki](https://wiki.archlinux.org/title/Xorg)
- [Hyprland's Official Webpage](https://hyprland.org/)
- [Pacman - Arch Wiki](https://wiki.archlinux.org/title/Pacman)
- [Yay Official Repository](https://github.com/Jguer/yay)
- [Flatpak Official Webpage](https://flatpak.org/)
- [Flatpak's Arch Quick Setup](https://flatpak.org/setup/Arch)
- [How to Install Wine in Arch Linux](https://dev.to/yofreormaza/instalar-wine-en-arch-linux-4bok)
- [How to use Proton To Play Windows Games on Linux - How To Geek](https://www.howtogeek.com/738967/how-to-use-steams-proton-to-play-windows-games-on-linux/)
- [Network Configuration - Arch Wiki](https://wiki.archlinux.org/title/Network_configuration)
- [NVIDIA - Arch Wiki](https://wiki.archlinux.org/title/NVIDIA)
