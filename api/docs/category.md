# Category

## Crear una categoría

Permite crear una categoría nueva

Endpoint: localhost/api/categories

Método: POST

### Cuerpo de la petición

Formatos: application/json

| Nombre      | Tipo   | Requerido | Descripción                 |
| ----------- | ------ | --------- | --------------------------- |
| name        | String | True      | Nombre de la categoría      |
| description | String | True      | Descripción de la categoría |

### Respuesta

Regresa un objeto con el id de la categoría creada

| Estatus | Descrición                                                                                                                                                           |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 201     | Creación exitosa                                                                                                                                                     |
| 400     | La información es inválida o está incompleta. Regresa un objeto con mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 415     | El formato de la petición no es válido. Debe ser application/json                                                                                                    |

## Obtener una categoría

Endpoint: localhost/api/categories/{id}

Método: GET

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                    |
| ------ | --------- | ---- | ------- | ------------------------------ |
| id     | True      | Path | Integer | Id de la categoría a consultar |

### Respuesta

Regresa un objeto con la información de la categoría consultada.

| Estatus | Descrición                        |
| ------- | --------------------------------- |
| 200     | Operación exitosa                 |
| 404     | La categoría con ese id no existe |

## Obtener lista de categorías

Endpoint: localhost/api/categories?count=10&page=1

Método: GET

### Parámetros

| Nombre | Requerido | En    | Tipo    | Descripción                                                     |
| ------ | --------- | ----- | ------- | --------------------------------------------------------------- |
| count  | True      | Query | Integer | Especifica el número máximo de elementos que se quieren obtener |
| page   | False     | Query | Integer | Paginación                                                      |

### Respuesta

Regresa una lista de objetos con la información de las categorías consultadas.

| Estatus | Descrición                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------------- |
| 200     | Operación exitosa                                                                                         |
| 400     | Un parámetro está incompleto o es incorrecto. Retorna un objeto de mensaje (message) con más información. |

## Editar una categoría

Endpoint: localhost/api/categories/{id}

Método: PUT

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                 |
| ------ | --------- | ---- | ------- | --------------------------- |
| id     | True      | Path | Integer | Id de la categoría a editar |

### Cuerpo de la petición

Formatos: application/json

| Nombre      | Tipo   | Requerido | Descripción                       |
| ----------- | ------ | --------- | --------------------------------- |
| name        | String | False     | Nuevo nombre de la categoría      |
| description | String | False     | Nueva descriptión de la categoría |

### Respuesta

Regresa un objeto con la información anterior (old) y la nueva información (new)

| Estatus | Descrición                                                                                                                                                             |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | Edición exitosa                                                                                                                                                        |
| 400     | La información está incompleta o es incorrecta. Regresa un objeto con mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 404     | La categoría con el id especificado no existe                                                                                                                          |
| 415     | El formato de la petición es inválido. Debe ser application/json                                                                                                       |

## Obtener categorías de un curso

Endpoint: localhost/api/courses/{id}/categories

Método: GET

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                                           |
| ------ | --------- | ---- | ------- | ----------------------------------------------------- |
| id     | True      | Path | Integer | Id del curso del que se quiere obtener sus categorías |

### Respuesta

Regresa una lista con la información de las categorías de un curso especificado.

| Estatus | Descrición        |
| ------- | ----------------- |
| 200     | Operación exitosa |
