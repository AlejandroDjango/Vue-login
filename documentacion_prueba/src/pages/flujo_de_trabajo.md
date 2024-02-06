# <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>FLUJO DE GIT</span>

<div style={{ backgroundColor: 'yellow', color: 'black', border: '2px solid black', padding: '3px' }}>
  <span style={{ fontWeight: 'bold' }}>
	PENDIENTE DE DISCUSIÓN
  </span>
  [ASIGNACIÓN DE NOMBRES: ENTRE Desarrollo, Pruebas, Producción]
</div>

Nuestros repositorios GIT tendrán 3 ramas que serán la base para el seguimiento del producto:

- <span style={{ fontWeight: 'bold' }}>Desarrollo:</span> Rama donde obtendrán la base para implementar nuevas funciones los desarrolladores. Siempre se deberá crear una nueva rama preferiblemente con un nombre que evoque a la función a desarrollar.

- <span style={{ fontWeight: 'bold' }}>Pruebas:</span> Esta rama, pese a poder ser de larga duración debido a la externalización de las pruebas, es una rama efímera. Aquí se pondrán a prueba los cambios en el repositorio en un entorno simulado. Si la revisión es interna, la validación la debería hacer una persona diferente a la que hace el desarrollo de la nueva función.

- <span style={{ fontWeight: 'bold' }}>Producción [Master]:</span> Solo llegarán aquellos puntos del repositorio que estén listos para su despliegue. Este es el producto que llegará al cliente y desde donde se realizará la integración continua y los despliegues.

![produccion.png](img/produccion.png "produccion")

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>1. RAMA DESARROLLO</span>

El procedimiento de trabajo en esta rama será el siguiente:

- El desarrollador creará una rama (FEATURE) a partir del origen/HEAD de desarrollo para desarrollar una función concreta de la aplicación. El nombrado de la rama seguirá el siguiente patrón:

<div style={{ textAlign: 'center', fontWeight: 'bold' }}>
  <h2>[TIPO DE ACTUACIÓN] Nombre explicativo de la función.</h2>
</div>

<div style={{ paddingLeft: '5%' }}>
  El tipo de Actuación podrá ser:
  <ul>
    <li>
      FEATURE: Añade una nueva funcionalidad al programa.
    </li>
    <li>
      BUG FIX: Corrige una funcionalidad del programa.
    </li>
    <li>
      CHORE: Ni corrige ni añade una nueva funcionalidad, pero agrega orden al desarrollo, cambia sintaxis, cambia funciones que no cambian su salida.
    </li>
  </ul>
</div>

- El desarrollador realizará todas las actuaciones necesarias
- Enviará estos cambios a la rama remota
- Seguidamente creará un <span style={{ fontStyle: 'italic' }}>metge request</span> a la rama de desarrollo a la que asignará como encargado otro de los desarrolladores.

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>2. RAMA PRUEBAS</span>

<div style={{ backgroundColor: 'yellow', color: 'black', border: '2px solid black', padding: '3px' }}>
  <span style={{ fontWeight: 'bold' }}>
	PENDIENTE DE DISCUSIÓN
  </span>
  [PROCEDIMIENTO en caso de errores: no pasa los test-> borrar después de <span style={{ fontStyle: 'italic' }}>metge-request</span> en <span style={{ fontStyle: 'italic' }}>desarrollo</span> o no para poder utilizar esa rama como rama para fijar errores]
</div>

- El desarrollador encargado del <span style={{ fontStyle: 'italic' }}>metge request</span> se encargará de realizarlo en la rama de desarrollo y solucionar todas las incidencias para la fusión, así como de crear una nueva rama llamada <span style={{ fontStyle: 'italic' }}>release-XXXXXXX</span> donde se incorporarán estos cambios para posteriormente fusionarla (merge) con la rama pruebas si esta existe.

- Una vez probado en el entorno de prueba estará listo para realizar la release al entorno de prod.

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>3. RAMA PRODUCCIÓN/MÁSTER</span>

- Si es requerida una acción puntual sobre el código a manera de reparación rápida (hotfix) podrá ser llevada a cabo en esta rama.
- Este <span style={{ fontStyle: 'italic' }}>hotfix</span> se hará mediante una Branch de máster y se incorporará a máster, siendo una nueva release si fuera necesario, y a desarrollo para que se mantenga la coherencia del proyecto.

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>STACK TECNOLÓGICO</span>

#### BASE DE DATOS:
- <span style={{ fontWeight: 'bold' }}>PostgreSQL</span> dado que es la base de datos recomendada por el framework de backend.
- <span style={{ fontWeight: 'bold' }}>Sqlite3</span> en proyectos con baja exigencia.
- <span style={{ fontWeight: 'bold' }}>MongoDB</span> en casos en que la base de datos que necesitemos sea NoSQL.

#### BACKEND:
- <span style={{ fontWeight: 'bold' }}>Django REST Framework:</span> Porque nos va a automatizar muchas tareas sobre modelo y también sobre la entrega de datos (ej: formatea en JSON y XML de forma nativa).
- <span style={{ fontWeight: 'bold' }}>Flask & SQLAlchermy:</span> Dado que el principal framework corre sobre python y Flask también lo hace y SQlAlchemy nos crea un ORM igual al de Django. Esta opción nos proporciona control sobre lo que corremos. Alternativamente podríamos usar FastAPI.
- <span style={{ fontWeight: 'bold' }}>(LEGACY) Django:</span> proyectos antiguos que se integran monolíticamente sobre Django. Olarra.

#### FRONTEND:
- <span style={{ fontWeight: 'bold' }}>VUE.js 3:</span> Dada es el framework que permite una adaptación más rápida y usa js como base.
- <span style={{ fontWeight: 'bold' }}>Javascript, HTML, CSS o SCSS.</span>
- Si requiriéramos alternativas utilizaríamos <span style={{ fontWeight: 'bold' }}>REACT</span> por encima de ANGULAR porque este último además de las diferencias usa Typescript.

#### CONTAINERIZACIÓN:
- <span style={{ fontWeight: 'bold' }}>Docker:</span> Como gestor de contenedores y orquestación de los mismos. En un futuro podríamos gestionar la orquestación con Kubernetes.

#### DESPLIEGUE:
- <span style={{ fontWeight: 'bold' }}>Puppet:</span> Para escribir los manifiestos de despliegue y realizarlo.
- <span style={{ fontWeight: 'bold' }}>Chef:</span> Para el control del despliegue.

#### CONTROL DE VERSIONES:
- <span style={{ fontWeight: 'bold' }}>GitLab:</span> Que deberemos integrar el control de despliegue y la integración continua.

## <span style={{ fontWeight: 'bold', color: '#0f4c81' }}>HERRAMIENTAS RECOMENDADAS</span>

- <span style={{ fontWeight: 'bold' }}>VSCode:</span> Como IDE principal. Con los siguientes plugin:
> - GIT: GITGraph, Gitlab WorkFlow, Conventional Commits.
> - Linters: ESLint, autopep8, Pylint, isort, SonarLint
> - Identador de código: Prettier
> - Idiomas: Spanish Language Pack
> - Base de datos: SQLite
> - API Endpoints: Postman
> - Docker: Docker
> - Vue: Volar, Vite

- <span style={{ fontWeight: 'bold' }}>WSL</span> como sistema operativo base para hacer las pruebas.
> - Ubuntu: 22.04.2 LTS (Jammy Jellyfish)

- <span style={{ fontWeight: 'bold' }}>Docker Desktop:</span> que permite la integración con WSL y VSCode
- <span style={{ fontWeight: 'bold' }}>PgAdmin:</span> PostgreSQL Admin para gestionar bases de datos.
- <span style={{ fontWeight: 'bold' }}>Solar-Putty:</span> para conexiones SSH y poder gestionar su guardado visualmente.
- <span style={{ fontWeight: 'bold' }}>WinSCP:</span> para gestión de ficheros y carpetas a través de SFTP (SSH).
- <span style={{ fontWeight: 'bold' }}>Postman:</span> Para testing y gestión de endpoints API.
