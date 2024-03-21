# DOCKER

Instalación:

`sudo apt-get install docker.io`
`sudo apt-get install docker-compose`

En caso de que no exista creamos el grupo docker:

`sudo groupadd docker`

Y añadimos al usuario que usamos para loguear:

`sudo usermod -aG docker [USER]`

**Y una vez que tengamos instalado gitlab-runner** añadimos al usuario gitlab-runner:

`sudo usermod -aG docker gitlab-runner`
