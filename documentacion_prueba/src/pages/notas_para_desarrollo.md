# NOTAS PARA DESARROLLO


### Requerimientos de entorno:

Dado que vamos a tener que compilar el backend para agilizar el trabajo y no tener que estar levantando imágenes del mismo a cada poco tiempo, necesitaremos:

#### Node.js:

Seguiremos estos pasos si no lo tenemos en nuestro sistema WSL.

* Bajamos curl: `sudo apt-get install curl`
* Instalamos el script de NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash`
* Comprobamos la instalación (si no saliera reiniciar el terminal): `command -v nvm`
* Instalamos el node lts: `nvm install --lts`
* Instalamos el node en su versión más reciente: `nvm install node`

#### Instalamos yarn (si nos gusta npm pues dejamos npm)

* `npm install --global yarn`

#### Como estamos trabajando con Quasar necesitamos instalarlo:

* `yarn global add @quasar/cli`

  o bien:
* `npm i -g @quasar/cli`

### Puesta en marcha

La puesta en marcha del proyecto para desarrollo se debe llevar a cabo con docker-compose-dev.yml.

Levantando este archivo nos encontraremos que los cambios realizados en el backend se aplicarán en el momento, aunque en ocasiones requiere reiniciar la máquina debido a la naturaleza de Django.

Para realizar el build y el traspaso de archivos a la imagen de frontend se ha diseñado un script alojado en la carpeta "frontend" que simplemente ejecutándolo (./build.sh) y teniendo en marcha las imágenes de Docker realiza todas las operaciones necesarias para que simplemente haga falta refrescar la página web para ver los cambios.

Conservando los volúmenes en concreto el llamado "database_data" no perderemos los datos de la base de datos. IMPORTANTE: Al haber renombrado este volumen por su especial importancia deberemos crear copias de seguridad de los clientes para que sigan accediendo a sus datos en el siguiente despliegue. Se preparan los scripts de automatización necesarios para dicho propósito.