# __NODE__

## Paso 1: Instalación de CURL

Simplemente debemos instalar curl que es un gestor de descargas en wsl para poder descargar el script de instalación de NVM:

```
  sudo apt update && sudo apt upgrade
  sudo apt-get install curl
```

## Paso 2: Instalación NVM

Para instalar nvm, debes ejecutar el script de instalación. Para hacerlo, puedes descargar y ejecutar el script manualmente o utilizar el siguiente comando cURL:

```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Al ejecutar cualquiera de los comandos anteriores, se descarga un script y se ejecuta. El script clona el repositorio de nvm en `/.nvm` e intenta agregar las líneas de origen del fragmento a continuación al archivo de perfil correcto (`/.bash_profile`, `~/.zshrc`, `~/.profile` o `~/.bashrc`).

##### Notas Adicionales:

- Si la variable de entorno `$XDG_CONFIG_HOME` está presente, colocará los archivos de `nvm` allí.

- Puedes agregar `--no-use` al final del script anterior (...`nvm.sh --no-use`) para posponer el uso de nvm hasta que lo uses manualmente.

- Puedes personalizar la fuente de instalación, el directorio, el perfil y la versión utilizando las variables `NVM_SOURCE`, `NVM_DIR`, `PROFILE` y `NODE_VERSION`. Por ejemplo: `curl ... | NVM_DIR="ruta/a/nvm"`. Asegúrate de que `NVM_DIR-` no contenga una barra diagonal al final.

- El instalador puede utilizar `git`, `curl` o `wget` para descargar `nvm`, según lo que esté disponible.

- Puedes indicar al instalador que no edite la configuración de tu shell (por ejemplo, si ya obtienes completados mediante un complemento de nvm de zsh) estableciendo `PROFILE=/dev/null` antes de ejecutar el script `install.sh`. Aquí tienes un ejemplo de un comando de una sola línea para hacerlo:

```
  PROFILE=/dev/null bash -c 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash'
```

##### Solución de Problemas en Linux

En Linux, después de ejecutar el script de instalación, si obtienes el mensaje `nvm: command not found` o no ves ninguna respuesta en tu terminal después de escribir `command -v nvm`, simplemente cierra la terminal actual, abre una nueva terminal y verifica nuevamente.

Alternativamente, puedes ejecutar los siguientes comandos para diferentes shells en la línea de comandos:

bash: `source ~/.bashrc`

zsh: `source ~/.zshrc `

ksh: `. ~/.profile`

Estos comandos deberían hacer que el comando `nvm` sea reconocido.

## Paso 3: Instalación de Node

Una vez tenemos instalado NVM simplemente deberemos llamar al manager de versiones para que nos instale la última versión y la última versión LTS:

```
  nvm install node
  nvm install --lts
```

> Se deben llamar a ambos comandos para tener ambas versiones de node y en el orden indicado para tener activa la lts.

`nvm ls` listará las versiones disponibles.

`nvm use –-lts` nos configurará lts como el node que usamos

`nvm use node` nos configurará la última versión de node como la que usamos
