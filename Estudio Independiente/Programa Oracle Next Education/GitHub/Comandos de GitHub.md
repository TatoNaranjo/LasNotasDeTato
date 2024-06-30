
#### Git Clone

```git
git clone https://github.com/TatoNaranjo/ElRoguelikeDeTato
```

Comando que utilizamos para clonar un repositorio a nuestra computadora.
Con el `git clone` también puedes clonar el repositorio para una carpeta específica:

```git
git clone <repositorio> <mi-proyecto-clone>
```
El repositorio localizado en `repositorio` es clonado para una carpeta llamada:

```bash
mi-proyecto-clone
```

También puedes configurar el `git clone` y clonar el repositorio desde una **branch** específica, diferente a la original, de esta manera:

```bash
git clone -branch new_feature <repositorio>
```

#### Git Log

Sirve para ver el historial de nuestro proyecto en [[GitHub]].

Si deseas verificar el historial de cambios, los mensajes de commit, el nombre de la persona autora del commit y otras informaciones sobre el proyecto, hay un comando de git que te puede ayudar. Este comando es `git log`.

Como ya sabemos, los commits poseen hashs que los identifican de una manera única, es decir, no existen dos commits con el mismo hash. Con git log podemos ver el hash y muchas otras informaciones del commit.

```git
git log
```

Si queremos ver el historial de una forma resumida, podemos usar:

```git
git log --oneline
```

Si, en lugar de menos informaciones, queremos ver más, como las alteraciones del commit, podemos usar:

```git
git log -p
```

También podemos buscar las informaciones de la persona autora del commit con el comando:

```git
git log --author="user_name"
```

#### Git Pull

Comando usado para traer los cambios del proyecto de GitHub desde un servidor remoto.

```git
git pull
```

#### Git Status

Sirve para verificar el estado de nuestro proyecto.

```git
git status
```

#### Git Add

Sirve para agregar los archivos que tenemos actualizados en nuestro entorno local pero que aún no se encuentran en GitHub.

```git
git add .
```

#### Git Diff

Para ver las diferencias entre un archivo en el entorno local y el mismo archivo en el servidor de GitHub.

```git
git diff
```


#### Git Restore

Sirve para devolvernos a un punto anterior en el proyecto.

```git
git restore --source codigoDelCommit nombreDelArchivo
```