# Section

## Obtener lista de secciones de un curso

Permite obtener una lista con la información de las secciones de un curso.

Endpoint: localhost/course/{id}/sections?userId=1

Método: GET

### Parámetros

| Nombre | Requerido | En    | Tipo    | Descripción                                                                                                                               |
| ------ | --------- | ----- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| id     | True      | Path  | Integer | Id del curso del que se quiere obtener la lista de secciones                                                                              |
| userId | False     | Query | Integer | Si se especifica el id de un usuario, además de regresar la información de las secciones, especifica si es accesible o no para el usuario |

### Respuesta

Regresa una lista de objetos con la información de las secciones de un curso existente.

| Estatus | Descripción       |
| ------- | ----------------- |
| 200     | Operación exitosa |

## Crear una sección de un curso

Permite crear una sección y agregarla como parte de un curso.

Endpoint: localhost/api/courses/{id}/sections

Método: POST

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                                   |
| ------ | --------- | ---- | ------- | --------------------------------------------- |
| id     | True      | Path | Integer | Id del curso al que se le agregará la sección |

### Cuerpo de la petición

Formatos: application/json

| Nombre | Tipo   | Requerido | Descripción                                                      |
| ------ | ------ | --------- | ---------------------------------------------------------------- |
| title  | String | True      | Título de la sección                                             |
| price  | Double | True      | Precio que se le dará a la sección. Si es gratis puede ser $0.00 |

### Respuesta

Regresa un objeto con el id de la sección creada.

| Estatus | Descripción                                                                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 201     | La sección fue creada con éxito                                                                                                                                    |
| 400     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores que especifican la fuente y el mensaje de error. |
| 415     | El formato de la información es incorrecto. Debe ser application/json                                                                                              |

## Obtener una sección

Permite obtener toda la información de una sección existente.

Endpoint: localhost/api/sections/{id}

Método: GET

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                |
| ------ | --------- | ---- | ------- | -------------------------- |
| id     | True      | Path | Integer | Id de la sección requerida |

### Respuesta

Regresa un objeto en formato JSON con la información de la sección requerida.

| Estatus | Descripción                                 |
| ------- | ------------------------------------------- |
| 200     | Operación exitosa                           |
| 404     | La sección con el id especificado no existe |

## Editar una sección

Permite editar la información de una sección existente.

Endpoint: localhost/api/sections/{id}

Método: PUT

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción               |
| ------ | --------- | ---- | ------- | ------------------------- |
| id     | True      | Path | Integer | Id de la sección a editar |

### Cuerpo de la petición

Formatos: application/json

| Nombre    | Tipo    | Requerido | Descripción                                                    |
| --------- | ------- | --------- | -------------------------------------------------------------- |
| title     | String  | False     | Nuevo título de la sección                                     |
| price     | Double  | False     | Nuevo precio de la sección                                     |
| free      | Boolean | False     | Determina si la sección se vuelve gratuita (true) o no (false) |
| published | Boolean | False     | Determina si la sección es visible al público o no             |

### Respuesta

Retorna un objeto que contiene la información anterior (old) y la información nueva (new).

| Estatus | Descripción                                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200     | Edición exitosa                                                                                                                                                                      |
| 400     | La información proporcionada está incompleta o incorrecta. Retorna un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 404     | La sección especificada no existe                                                                                                                                                    |
| 415     | El formato de la petición es incorrecto. Debe ser application/json                                                                                                                   |

## Eliminar una sección

Permite eliminar toda la información de una sección, incluyendo la información relacionada (lecciones, recursos, etc.)

Endpoint: localhost/api/sections/{id}

Método: DELETE

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                 |
| ------ | --------- | ---- | ------- | --------------------------- |
| id     | True      | Path | Integer | Id de la sección a eliminar |

### Respuesta

| Estatus | Descripción       |
| ------- | ----------------- |
| 200     | Operación exitosa |
