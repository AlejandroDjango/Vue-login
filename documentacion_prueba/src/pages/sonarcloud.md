# SONARCLOUD

# **SOLO EN SERVIDORES DEV**

## INSTALACIÓN EN SERVIDOR

`wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip`

`unzip sonar-scanner-cli-5.0.1.3006-linux.zip`

`mv sonar-scanner-5.0.1.3006-linux/* /opt/sonar-scanner`


En` nano /etc/profile.d/sonar-scanner.sh`

Escribir:
```
#!/bin/bash
export PATH="$PATH:/opt/sonar-scanner/bin"
```

`reboot`  
`source /etc/profile.d/sonar-scanner.sh`

Comprobamos java:
`java -version`

Si no esta instalado
```
sudo apt install openjdk-17-jre
java -version
```

`sonar-scanner -v`

> Nota: en Oracle Ampere (ARM) no funciona el lanzador de sonar-scannner, para solucionarlo podemos hacer lo siguiente:
>
> `cd /opt/sonar-scanner/`
> `sudo nano sonar-scanner.sh`
> Y escribimos ->   java -jar lib/sonar-scanner-cli-5.0.1.3006.jar start
>
> `sudo chmod -x sonar-scanner.sh`
> `sudo chmod 777 sonnar-scanner.sh`
> `sudo nano /etc/profile.d/sonar-scanner.sh`
> Y escribimos ->
> #!/bin/bash  
> export PATH="$PATH:/opt/sonar-scanner/sonar-scanner.sh"  
>
> `reboot`  
> `source /etc/profile.d/sonar-scanner.sh`  

## PUESTA EN MARCHA
