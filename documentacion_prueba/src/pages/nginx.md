# NGINX

## Instalación:

`sudo apt-get install nginx`

## Configuración:

1. Si tenemos ufw activado deberemos dejar pasar a nginx:

   `sudo ufw allow 'Nginx HTTP'`
2. En el directorio `/etc/nginx/sites-available` debemos crear el archivo `sgsi-demo` en este archivo debemos introducir el siguiente código (poniendo el {NOMBRE-DEL-DOMINIO} correcto):

```
server {
    # Puerto de escucha
    listen   80;

    # Nombre del servidor (si no tenemos que poner SSL puede ser lo que queramos, si usamos SSL tenemos que
    # registrar un dominio
    server_name (NOMBRE-DEL-DOMINO};

    # Tamaño máximo del cuerpo del cliente 100MB
    client_max_body_size 100M;


    location / {
        # Configuración del proxy inverso

        ## Encabezados: x_forwarded_for para transmitir la dirección IP original del cliente
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;    

        ## Gestionar cambio de conexión HTTP/1.x a WebSocket o HTTP/2
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        ## Timeout para mitigar DOS
        proxy_read_timeout 3600;

        ## Desactiva la reescritura automática de cabeceras de redirección por parte de Nginx
        proxy_redirect off;

        ## Dirección a donde apunta el proxy
        proxy_pass http://127.0.0.1:8080/;       
    }
}
```

3. Creamos un enlace símbolico en `sites-enabled` para que se ponga en marcha esta configuración:

   `sudo ln -s /etc/nginx/sites-available/sgsi-demo /etc/nginx/sites-enabled/`
4. Borramos el enlace símbolico a `default` si estuviera o cualquier otro sitio que nos pueda interferir:

   `sudo ls /etc/nginx/sites-enabled/`\
   `sudo rm /etc/nginx/sites-enabled/default`
5. Testamos que nuestra configuración sea correcta y no haya errores de sintaxis:

   `sudo nginx -t`

   Si todo va bien obtendremos:

   ```
   nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
   nginx: configuration file /etc/nginx/nginx.conf test is successful
   ```
6. Reiniciamos el servidor para que se ponga en marcha el proxy a nuestra app de docker:

   `sudo systemctl restart nginx`
7. En este punto lo tenemos funcionando en el puerto 80 sin certificado. Vamos a obtener un certificado:

   `sudo apt-get update`\
   `sudo apt-get install certbot`\
   `sudo apt-get install python3-certbot-nginx`

   Obtenemos el certificado:

   `sudo certbot --nginx -d {NOMBRE-DEL-DOMINIO}`

   Si todo ha ido bien nos lo dirá (si ha ido mal habrá que mirar el motivo).

   Si todo ha ido bien el propio certboot habrá modificado la configuración del sitio web de nginx añadiendo las líneas necesarias.

   Quedando el código así

```
server {
    # Puerto de escucha
    listen   80;

    # Nombre del servidor (si no tenemos que poner SSL puede ser lo que queramos, si usamos SSL tenemos que
    # registrar un dominio
    server_name {NOMBRE-DEL-DOMINO};

    # Tamaño máximo del cuerpo del cliente 100MB
    client_max_body_size 100M;


    location / {
        # Configuración del proxy inverso

        ## Encabezados: x_forwarded_for para transmitir la dirección IP original del cliente
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;    

        ## Gestionar cambio de conexión HTTP/1.x a WebSocket o HTTP/2
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        ## Timeout para mitigar DOS
        proxy_read_timeout 3600;

        ## Desactiva la reescritura automática de cabeceras de redirección por parte de Nginx
        proxy_redirect off;

        ## Dirección a donde apunta el proxy
        proxy_pass http://127.0.0.1:8080/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/jakinsuma.jakincode.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/jakinsuma.jakincode.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = jakinsuma.jakincode.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen   80;
    server_name jakinsuma.jakincode.com;
    return 404; # managed by Certbot
}
```

Este código lo podemos retocar para mejorar la legibilidad:

```
server {
    # Puerto de escucha
    listen 80;

    # Nombre del servidor (tenemos que registrar un dominio)
    server_name jakinsuma.jakincode.com;

    # Redirección de todo el tráfico de HTTP a HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    # puerto de escucha ssl
    listen 443 ssl;
    # Nombre del servidor (tenemos que registrar un dominio)
    server_name jakinsuma.jakincode.com;

    # Certificados SSL gestionados por Certbot
    ssl_certificate /etc/letsencrypt/live/jakinsuma.jakincode.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jakinsuma.jakincode.com/privkey.pem;

    # Otras configuraciones SSL de Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Tamaño máximo del cuerpo del cliente 100MB
    client_max_body_size 100M;

    location / {
        # Configuración del proxy inverso

        ## Encabezados: x_forwarded_for para transmitir la dirección IP original del cliente
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;

        ## Gestionar cambio de conexión HTTP/1.x a WebSocket o HTTP/2
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        ## Timeout para mitigar DOS
        proxy_read_timeout 3600;

	## Dirección a donde apunta el proxy
        proxy_pass http://127.0.0.1:8080/;

        ## Desactiva la reescritura automática de cabeceras de redirección por parte de Nginx
        proxy_redirect off;
    }
}
```

8. Hacer que el certificado se autorenueve mediante un crontab:

   `crontab -e`

   Una vez abierto el fichero añadimos la siguiente línea:

   `0 12 * * * /usr/bin/certbot renew --quiet`

   Salvamos y ya esta configurado nginx.
