# <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>Añadir backup a tu proyecto JakinSuma</span>

- Buildear proyecto __JakinSuma__
- Parar los contenedores de __Docker__
- Cargar el backup desde /cmd/ con el comando  -> `./recuperar_backup.sh <nombre_backup>.tar.gz`
## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>¡ IMPORTANTE !</span>
El backup tiene que estar dentro de una carpeta backups en la carpeta raiz de __WSL__.

- Levantar los contenedores de nuevo.
- Ejecutar las nuevas migraciones que tengas en la version actual desde /cmd/ -> `./migracion.sh`
## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>¡ IMPORTANTE !</span>
El backup solo te creara el esquema de base de datos que tenia en la version que se ha descargado, por eso se ejecutan las nuevas migraciones de tu nueva version del proyecto.
