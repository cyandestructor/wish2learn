# Lesson

## Obtener lista de lecciones de una sección

Permite obtener las lecciones de una sección.

Endpoint: localhost/api/sections/{id}/lessons?userId=1

Método: GET

### Parámetros

| Nombre | Requerido | En    | Tipo    | Descripción                                                                                                              |
| ------ | --------- | ----- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| id     | True      | Path  | Integer | Id de la sección de la que se quieren consultar las lecciones                                                            |
| userId | False     | Query | Integer | Si se especifica, además de la información de las lecciones, especifica si la lección está marcada como completada o no. |

### Respuesta

Regresa una lista de objetos con la información de las lecciones de un sección existente.

| Estatus | Descripción       |
| ------- | ----------------- |
| 200     | Operación exitosa |

## Crear una lección

Permite crear una nueva lección y agregarla a una sección.

Endpoint: localhost/api/sections/{id}/lessons

Método: POST

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                                             |
| ------ | --------- | ---- | ------- | ------------------------------------------------------- |
| id     | True      | Path | Integer | Id de la sección en la que se quiere agregar la lección |

### Cuerpo de la petición

Formatos: application/json

| Nombre | Tipo    | Requerido | Descripción                                                                                                                          |
| ------ | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| title  | String  | True      | Título de la lección                                                                                                                 |
| type   | Integer | True      | Tipo de contenido de la sección: 1 corresponde a una lección con video, 2 corresponde a una lección de sólo texto.                   |
| text   | String  | True      | Texto que compone la lección. Cuando es de tipo video, puede ser una descripción, cuando es de tipo texto es el total del contenido. |

### Respuesta

Regresa un objeto con el id de la lección creada.

| Estatus | Descripción                                                                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 201     | Se creó la lección exitosamente                                                                                                                                           |
| 400     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 415     | El formato de la petición es incorrecto. Debe ser application/json                                                                                                        |

## Obtener una lección

Permite obtener toda la información de una lección existente.

Endpoint: localhost/api/lessons/{id}

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                |
| ------ | --------- | ---- | ------- | -------------------------- |
| id     | True      | Path | Integer | Id de la lección requerida |

### Respuesta

Regresa un objeto en formato JSON con la información de la lección solicitada.

| Estatus | Descripción                                 |
| ------- | ------------------------------------------- |
| 200     | Operación exitosa                           |
| 404     | La lección con el id especificado no existe |

## Editar una lección

Permite editar la información de una lección existente.

Endpoint: localhost/api/lessons/{id}

Método: PUT

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción               |
| ------ | --------- | ---- | ------- | ------------------------- |
| id     | True      | Path | Integer | Id de la lección a editar |

### Cuerpo de la petición

Formatos: application/json

| Nombre    | Tipo    | Requerido | Descripción                                                         |
| --------- | ------- | --------- | ------------------------------------------------------------------- |
| title     | String  | False     | Nuevo título de la lección                                          |
| text      | String  | False     | Nuevo texto de la lección                                           |
| published | Boolean | False     | Determina si el contenido es visible al público (true) o no (false) |

### Respuesta

Retorna un objeto con la información anterior (old) y la nueva información (new).

| Estatus | Descripción                                                                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | Edición exitosa                                                                                                                                                           |
| 400     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 404     | La lección que se quiere editar no existe                                                                                                                                 |
| 415     | El formato de la petición es incorrecto, debe ser application/json                                                                                                        |

## Eliminar una lección

Permite eliminar una lección y toda su información relacionada (recursos, etc.).

Endpoint: localhost/api/lessons/{id}

Método: DELETE

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                 |
| ------ | --------- | ---- | ------- | --------------------------- |
| id     | True      | Path | Integer | Id de la lección a eliminar |

### Respuesta

| Estatus | Descripción       |
| ------- | ----------------- |
| 200     | Operación exitosa |

## Cambiar estado de completado de una lección

Permite especificar para una lección y un usuario, si el usuario la ha completado.

Endpoint: localhost/api/users/{userId}/lessons/{lessonId}?completed=true

Método: PUT

### Parámetros

| Nombre    | Requerido | En    | Tipo    | Descripción                                                  |
| --------- | --------- | ----- | ------- | ------------------------------------------------------------ |
| userId    | True      | Path  | Integer | Id del usuario que completa la lección                       |
| lessonId  | True      | Path  | Integer | Id de la lección que se quiere marcar como completada        |
| completed | True      | Query | Boolean | Especifica si la lección está completada (true) o no (false) |

### Respuesta

| Estatus | Descripción                                 |
| ------- | ------------------------------------------- |
| 200     | Operación exitosa                           |
| 400     | El parámetro completed no está especificado |
