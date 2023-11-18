# Backend

## Instalacion y ejecución del proyecto para el entorno de desarrollo

### Clonar el proyecto

```bash
📁~ 
 > git clone https://github.com/OmarErnest/evaluex.git
```
### Instalar paquetes y dependencias

```bash
📁~ 
 > cd evaluex/backend

📁~/evaluex/backend
 > npm install
```

### Configurar variables de entorno

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

### Ejecutar script para aplicar las migraciones

```bash
📁~/evaluex/backend
 > npm run migrate:dev
```
### Ejecutar el proyecto

```bash
📁~/evaluex/backend
 > npm run start:dev
```
### Crear usuario administrador manualmente

- Conectarse a la base de datos

	```bash
	📁~
	> psql "postgresql://postgres:password@127.0.0.1:5432/evaluex"
	```
- Crear registro en la tabla `Contact`

	```SQL
	psql (15.3)

	evaluex=# INSERT INTO "Contact" VALUES (gen_random_uuid(), 'Venezuela', 'Miranda', 'Caracas', 'Av. Principal', 'ABC-123', '+584120000000');

	INSERT 0 1
	```

- Buscar el registro creado anteriormente y extraer el campo `id` 
	
	```SQL
	psql (15.3)

	evaluex=# SELECT id FROM "Contact";

                 	 id
	--------------------------------------
 	cb6ee25e-d7e6-41ed-8936-25279e4d2119

	```

- Creamos una contraseña hasheada con el algoritmo *[bcrypt](https://bcrypt-generator.com/)*

	![Bcrypt Generator](https://i.imgur.com/HZM1vxN.png)

- Con el `id` extraido anteriormente del registro creado en la tabla `Contact` y el hash generado con *bcrypt*, creamos un nuevo registro en la tabla `Account`

	```SQL
	psql (15.3)

	evaluex=# INSERT INTO "Account" VALUES ('12345678', 'Administrador', 'Principal', 'admin@no-reply.com', '$2a$12$9FeJ7AV1nTZRZxwUWZp1Z.HvejTRHztL7UqGVVPkrty8G9EexSyTS', 'ADMIN', 'https://i.imgur.com/Zs3EoeR.png', 'cb6ee25e-d7e6-41ed-8936-25279e4d2119', '2000-01-01', 'M', now(), 'VERIFIED');

	INSERT 0 1
	```

## Arquitectura de la API

La arquitectura de la API REST está implementada por capas, logrando así un monolito modular con una explícita separación de responsabilidades. Cada capa tiene una función específica y se comunica con las demás mediante una interfaz definida por cada módulo. 

![Diagrama de arquitectura](https://i.imgur.com/iws9kim.png)

### Capas

#### Middlewares
Se encargan de ejecutar codigo previo al procesamiento de la peticion efectuada por el cliente y añadir funcionalidades a la misma para su uso en las capas subsecuentes. Por ejemplo el middleware de autenticacion que se encarga de validar que el token de sesion es correcto o que el usuario ha iniciado sesion.

#### Guards
Se encargan de validar los datos que se encuentran adjuntos al cuerpo de la peticion emitida por el cliente, en caso de ser invalidos terminan la peticion y comunican la razon del fallo.

#### Controllers
Se encargan de manejar la peticion, son los responsables de invocar a los servicios y enviarle el cuerpo de la peticion a traves de interfaces establecidas, manejan la respuesta de los servicios y devuelven los codigos de estado HTTP junto con los datos correspondientes.

#### Servicios
Son aquellos que se encargan de manejar el cuerpo de la peticion y comunicarse con la base de datos para guardar, modificar, leer o eliminar los datos correspondientes.

### Roles
De momento hay solo 4 roles principales en la aplicacion, la jerarquia de roles es extrictamente decreciente, es decir que los que estan arriba en la jerarquia pueden realizar acciones sobre aquellos roles que estan por debajo pero no pueden modificar los roles laterales o superiores

![Jerarquia de roles](https://i.imgur.com/AFy2fIt.png)

## Documentacion de la API

### Authentication


- **POST** */api/v1/register*

	#### Permisos:
	- [x] Admin
	- [x] Recepcionist
	- [x] Doctor
	- [x] Patient

	> Registra un usuario en la base de datos con `"status": "UNVERIFIED"` por defecto, que luego debera ser modificado manualmente por un `RECEPCIONIST` o `ADMIN` a traves del endpoint **PATCH** correspondiente para que dicho usuario pueda iniciar sesion en la aplicacion

	#### Cuerpo de la peticion
	```ts
	{
		id: string;
		name: string;
		last_name: string;
		email: string;
		password: string;
		role?: Role;
		avatar_url?: string;
		contact_info: {
			country: string;
			state: string;
			city: string;
			street: string;
			suite: string;
			primary_phone: string;
			secondary_phone?: string;
		};
		birthday: string;
		gender: Gender;
		status: AccountStatus;
	}
	```

	#### Validaciones
	- `id`:  Se utilizara la cedula, debe cumplir con el patron `[0-9]{8,8}`
	- `name`: 


- 

#### Patients

#### Doctors

#### Services

#### Recepcionists

#### Appointments

### Uso de Postman para pruebas de la API REST

Se debe tener Postman Desktop para hacer pruebas en el entorno local

#### Configurar variables de entorno
En la pestaña `Environment` se debe tener la siguiente configuracion de variables de entorno

```shell
# Puerto de ejecucion del servidor, debe coincidir con el .env
PORT=8080

# Prefijo comun de la URL para todas las peticiones
BASE_URL="http://localhost:{{PORT}}/api/v1"

# Token de sesion que se envia en cada peticion efectuada, por defecto esta vacio si no se ha iniciado sesion en la aplicacion, al iniciar sesion se debe reemplazar manualmente el valor
AUTH_TOKEN=""
```

#### Seleccionar entorno
Una vez configuradas las variables de entorno de la coleccion en Postman, se debe activar el entorno haciendo click en la esquina superior derecha y seleccionando `Local Environment` en lugar de `No Environment`

