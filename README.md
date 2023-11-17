# Evaluex

## Backend

### Instalacion y ejecución del proyecto para el entorno de desarrollo

#### Clonar el proyecto

```bash
📁~ 
 > git clone https://github.com/OmarErnest/evaluex.git
```
#### Instalar paquetes y dependencias

```bash
📁~ 
 > cd evaluex/backend

📁~/evaluex/backend
 > npm install
```

#### Configurar variables de entorno

Se deben crear dos archivos `.env` para las variables de entorno.

<h5 a><strong><code>backend/src/.env</code></strong></h5>

```shell
# Puerto de escucha del servidor
PORT=8080

#  Llave privada para emitir los tokens de sesion, debe ser aleatorio, impredecible y secreto
JWT_SECRET="sVBxB4cPCnvMeRqKUnwZyqFBGZo"

# Tiempo de expiracion para los tokens de sesion, siguiendo el estandar de la libreria oficial de jsonwebtoken
JWT_EXPIRESIN="1d"
```
<h5 a><strong><code>backend/src/v1/persistence/prisma/.env</code></strong></h5>

```shell
# Connection string para la base de datos (postgres). Debe seguir el formato oficial de postgres y debe contener ya creada la base de datos "evaluex", sin tablas
DATABASE_URL="postgresql://postgres:password@127.0.0.1:5432/evaluex"
```

#### Ejecutar script para aplicar las migraciones

```bash
📁~/evaluex/backend
 > npm run migrate:dev
```
#### Ejecutar el proyecto

```bash
📁~/evaluex/backend
 > npm run start:dev
```
