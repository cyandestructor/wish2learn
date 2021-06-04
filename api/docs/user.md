# User

## Registrar un usuario

Endpoint: localhost/api/users

Método: POST

### Cuerpo de la petición

Formatos: application/json

| Nombre   | Tipo   | Requerido | Descripción                                    |
| -------- | ------ | --------- | ---------------------------------------------- |
| username | String | True      | Nombre de usuario. Debe ser único              |
| name     | String | True      | Nombre personal del usuario                    |
| lastname | String | True      | Apellido del usuario                           |
| email    | String | True      | Correo electrónico del usuario. Debe ser único |
| password | String | True      | Contraseña del usuario                         |

### Respuesta

Retorna un objeto con el id del usuario registrado

| Estatus | Descrición                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 201     | Registro exitoso                                                                                                                                                          |
| 400     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 415     | El formato de la petición es incorrecto. Debe ser application/json                                                                                                        |

## Obtener un usuario

Endpoint: localhost/api/users/{id}

Método: GET

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                |
| ------ | --------- | ---- | ------- | -------------------------- |
| id     | True      | Path | Integer | Id del usuario a consultar |

### Respuesta

Regresa un objeto con la información del usuario consultado.

| Estatus | Descrición                                  |
| ------- | ------------------------------------------- |
| 200     | Operación exitosa                           |
| 404     | El usuario con el id especificado no existe |

## Editar un usuario

Permite editar la información de un usuario existente.

Endpoint: localhost/api/users/{id}

Método: PUT

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción             |
| ------ | --------- | ---- | ------- | ----------------------- |
| id     | True      | Path | Integer | Id del usuario a editar |

### Cuerpo de la petición

Formatos: application/json

| Nombre      | Tipo   | Requerido | Descripción                          |
| ----------- | ------ | --------- | ------------------------------------ |
| username    | String | False     | Nuevo nombre del usuario             |
| name        | String | False     | Nuevo nombre personal del usuario    |
| lastname    | String | False     | Nuevo apellido del usuario           |
| email       | String | False     | Nuevo correo electrónico del usuario |
| description | String | False     | Nueva descripción del usuario        |

### Respuesta

| Estatus | Descrición                                                                                                                                                  |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | Edición exitosa                                                                                                                                             |
| 400     | La información está incompleta o es incorrecta. Regresa un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 404     | El usuario que se quiere editar no existe                                                                                                                   |
| 415     | El formato de la petición es incorrecto. Debe ser application/json                                                                                          |

## Obtener avatar de un usuario

Permite obtener la imagen de avatar de un usuario. El endpoint se puede usar directamente en una etiqueta img de HTML.

Endpoint: localhost/api/users/{id}/avatar

Método: GET

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                                        |
| ------ | --------- | ---- | ------- | -------------------------------------------------- |
| id     | True      | Path | Integer | Id del usuario del que se quiere obtener su avatar |

### Respuesta

Regresa directamente la imagen de avatar con su correspondiente tipo de contenido.

| Estatus | Descrición                             |
| ------- | -------------------------------------- |
| 200     | Operación exitosa                      |
| 404     | El usuario no existe o no tiene avatar |

## Asignar o editar el avatar de un usuario

Endpoint: localhost/api/users/{id}/avatar

Método: PUT

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                                         |
| ------ | --------- | ---- | ------- | --------------------------------------------------- |
| id     | True      | Path | Integer | Id del usuario al que se le quiere editar el avatar |

### Cuerpo de la petición

Formatos: image/jpeg, image/png

Se envía directamente la información binaria del archivo

### Respuesta

| Estatus | Descrición                                                                      |
| ------- | ------------------------------------------------------------------------------- |
| 200     | Operación exitosa                                                               |
| 400     | El archivo tiene un tamaño incorrecto o no se especificó                        |
| 415     | El tipo de contenido de la imagen no es válido. Debe ser image/jpeg o image/png |

## Eliminar usuario

Permite eliminar un usuario y toda su información relacionada.

Endpoint: localhost/api/users/{id}

Método: DELETE

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción               |
| ------ | --------- | ---- | ------- | ------------------------- |
| id     | True      | Path | Integer | Id del usuario a eliminar |

### Respuesta

| Estatus | Descrición        |
| ------- | ----------------- |
| 200     | Operación exitosa |

## Consultar si un usuario existe

Permite consultar si existe algún usuario con un nombre de usuario o correo electrónico especificado. Permite evitar repeticiones.

Endpoint: localhost/api/users?username=tester&email=test@mail.com

Método: GET

### Parámetros

| Nombre   | Requerido | En    | Tipo   | Descripción                    |
| -------- | --------- | ----- | ------ | ------------------------------ |
| username | False     | Query | String | Nombre de usuario a consultar  |
| email    | False     | Query | String | Correo electrónico a consultar |

### Respuesta

| Estatus | Descrición                                               |
| ------- | -------------------------------------------------------- |
| 200     | Indica que un usuario con esas características ya existe |
| 404     | Indica que no existe un usuario con esas características |
