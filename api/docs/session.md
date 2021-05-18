# Session

## Login

Iniciar la sesión de un usuario con sus credenciales.

Endpoint: localhost/api/session

Método: PUT

### Cuerpo de la petición

Formatos: application/json

| Nombre   | Tipo   | Requerido | Descripción                                              |
| -------- | ------ | --------- | -------------------------------------------------------- |
| input    | String | True      | Cadena de caracteres con el username o email del usuario |
| password | String | True      | Contraseña introducida por el usuario                    |

## Respuesta

Regresa un objeto con la informacion de la sesión iniciada si se introducen las credenciales correctas.

| Estatus | Descripción                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------- |
| 200     | Se ha iniciado sesión correctamente                                                               |
| 400     | La información está incompleta o es incorrecta. Retorna un objeto de mensaje con más información. |
| 401     | Las credenciales de usuario son incorrectas                                                       |

## Obtener la sesión actual

Permite obtener la información de la sesión activa.

Endpoint: localhost/api/session

Método: GET

### Respuesta

Retorna un objeto con la información de la sesión activa.

| Estatus | Descripción              |
| ------- | ------------------------ |
| 200     | Operación exitosa        |
| 401     | No se ha iniciado sesión |

## Logout

Permite terminar la sesión actual.

Endpoint: localhost/api/session

Método: DELETE

### Respuesta

| Estatus | Descripción       |
| ------- | ----------------- |
| 200     | Operación exitosa |
