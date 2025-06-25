---
date: 2024-10-10
tags:
  - Linux
  - Productividad
  - Scripting
  - GitHub
  - Arch
---
La razón principal por la que suelo preferir a Linux por delante de otros Sistemas Operativos es su alta personalización. Literalmente puedes configurar tu propio espacio sin aplicaciones intrusivas o bloatware que venga al momento de una instalación limpia (Si... te estoy hablando a ti, Windows). Sin embargo, ¿qué pasa si queremos guardar nuestros archivos de configuración para utilizarlos después o simplemente tenerlos almacenados en internet?.

>[!Check] Podría Interesarte
>Puedes encontrar mi primer configuración de dotfiles basados en Arch Linux dando click en el siguiente link: [My Arch Dotfiles](https://github.com/TatoNaranjo/arch-dotfiles)

Hay muchas maneras de almacenar tus *Archivos de Configuración* (Normalmente conocidos en el mundo de Linux como: **Dotfiles**), sin embargo, la que vamos a utilizar aquí tiene que ver con una forma diferente para crear repositorios en GitHub. Los *Bare Repositories*.

## Empezando desde Cero
Si no has estado llevando el proceso de tus configuraciones en un repositorio de Git hasta ahora, puedes proceder a crearlo mediante los siguientes comandos:

```shell
git init --bare $HOME/.cfg 

alias config='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME' 

config config --local status.showUntrackedFiles no 

echo "alias config='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'" >> $HOME/.bashrc
```

- `git init` va a crear una carpeta `~/.cfg`, que será un Git Bare Repository que rastreará el proceso de todos nuestros archivos.
- Luego, procedemos a crear un `alias` o snippet que usaremos en vez del típico comando `git` cuando queramos interactuar con la configuración del repositorio.
- Ahora vamos a configurar un estado `--local` para mantener ocultos todos los archivos a los cuales no se les está haciendo un seguimiento. Esto es para que, cuando escribas `config status`, no te aparezcan los archivos en los que no estás interesado, y que así mismo no se muestren como no rastreados (`untracked`).
- También puedes añadir la definición del alias por tu cuenta dentro de tu `.bashrc`o usar el último comando y modificarlo para más privacidad.

Así mismo, un usuario de Atlassian ha puesto este snippet dentro de un script, el cual puedes ejecutar a través de este link:

```bash
curl -Lks http://bit.do/cfg-init | /bin/bash
```

Luego de haber seguido el script o ejecutar el snippet, cualquier carpeta dentro del directorio `$HOME` puede ser actualizado mediante versiones, utilizando el mismo sistema de Git pero reemplazando el típico comando `git` con tu nuevo alias configurado: `config`, de la siguiente manera:

```bash
config status 
config add 
.vimrc config 
commit -m "Add vimrc" 
config add .bashrc 
config commit -m "Add bashrc" 
config push
```

>[!Tip] Añade un archivo a la vez
>A la hora de manejar tus dotfiles, es mejor rastrear los archivos uno por uno, que carpeta por carpeta.

>[!caution] Cuidado Con El Error De Novato
>Ni se te ocurra escribir el comando `config add .` dentro de tu carpeta de configuraciones si no quieres guardar absolutamente todos los archivos que se encuentren allí (Información de navegadores, terminales u apps personales... etc). 

## Instalar tus dotfiles en un nuevo sistema (O migrar estas configuraciones)
Si ya guardaste tus archivos de configuración dentro de un repositorio de Git, puedes migrar tus dotfiles a un nuevo sistema siguiendo los siguientes pasos:

Antes de la instalación, asegúrate de haber hecho un commit del alias a tu archivo `.bashrc`o `.zsh`

```bash
alias config='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'
```

Y que tu repositorio en el que tienes tus configuraciones ignore la carpeta en la que lo clonarás, para evitar problemas raros de recursión.

```bash
echo ".cfg" >> .gitignore
```

Ahora puedes clonar tus archivos dentro de un bare repository en una carpeta "dot" en tu ruta `$HOME`.

```bash
git clone --bare <git-repo-url> $HOME/.cfg
```

Crea el alias en el entorno de shell actual

```bash
alias config='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'
```

Verifica el contenido actual del bare repository dentro de tu carpeta `$HOME`:

```bash
config checkout
```

El paso de arriba puede arrojar el siguiente error:

```bash
error: The following untracked working tree files would be overwritten by checkout:     .bashrc     .gitignore Please move or remove them before you can switch branches. Aborting
```

Esto puede ser porque tu carpeta `$HOME`quizás ya tenga alguna configuración por defecto  que van a sobreescribirse gracias a Git. La solución es simple: respalda los archivos si necesitas guardarlos, o eliminarlo si no te sirven. Te daré un atajo para mover todos los archivos en conflicto hacia una carpeta de backup:

```bash
mkdir -p .config-backup && \ config checkout 2>&1 | egrep "\s+\." | awk {'print $1'} | \ xargs -I{} mv {} .config-backup/{}
```

Puedes volver a correr el comando `checkout`si tienes problemas:

 ```bash
 config checkout
 ```

Podemos volver a configurar la variable  `showUntrackedFiles`como `ǸO` dentro del repositorio local:

```bash
config config --local status.showUntrackedFiles no
```

Y eso sería todo, ahora puedes configurar y manejar tu repositorio de la misma forma de antes, utilizando el comando `config`:

```bash
config status 
config add 
.vimrc config 
commit -m "Add vimrc" 
config add .bashrc 
config commit -m "Add bashrc" 
config push
```


