# Courses

## Obtener lista

Obtiene una lista de cursos en base a parámetros establecidos

Endpoint: localhost/api/courses?count=10&page=1&orderBy=publication

Método: GET

### Parámetros

| Nombre  | Requerido | En    | Tipo    | Descripción                                                                                                                                                                                                                                |
| ------- | --------- | ----- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| count   | True      | Query | Integer | Total de elementos a regresar en la lista                                                                                                                                                                                                  |
| page    | False     | Query | Integer | Paginación                                                                                                                                                                                                                                 |
| orderBy | False     | Query | String  | Determina el tipo de ordenamiento por el cual se van a obtener los resultados. Posibles valores: rate (Obtener del mejor al peor votado), publication (Obtener del más reciente al más antiguo), sales (Obtener del más al menos comprado) |

### Respuesta

En caso de éxito, regresa una lista de objetos en JSON con la información de los cursos que cumplen con los parámetros establecidos. El número de elementos regresados es igual o menor a count.

| Estatus | Descripción                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------- |
| 200     | Operación exitosa                                                                                       |
| 400     | Los parámetros son requeridos o incorrectos. Retorna un objeto de mensaje con más información del error |

## Obtener un curso

Regresa la información completa de un curso.

Endpoint: localhost/api/courses/{id}

Método: GET

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción             |
| ------ | --------- | ---- | ------- | ----------------------- |
| id     | True      | Path | Integer | Id del curso solicitado |

### Respuesta

Regresa un objeto en JSON con la información del curso con el id especificado.

| Estatus | Descripción                                         |
| ------- | --------------------------------------------------- |
| 200     | Operación exitosa                                   |
| 404     | El curso con ese id no se ha encontrado o no existe |

## Obtener imagen de un curso

Permite acceder a la imagen de un curso. El endpoint puede ser usado directamente en una etiqueta img de HTML.

Endpoint: localhost/api/courses/{id}/image

Método: GET

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                                       |
| ------ | --------- | ---- | ------- | ------------------------------------------------- |
| id     | True      | Path | Integer | Id del curso del cual se quiere obtener la imagen |

### Respuesta

Regresa directamente el recurso solicitado en forma de imagen.

| Estatus | Descripción                                     |
| ------- | ----------------------------------------------- |
| 200     | Operación exitosa                               |
| 404     | El curso con ese id no existe o no tiene imagen |

## Crear un curso

Permite registrar un curso en la base de datos.

Endpoint: localhost/api/courses

Método: POST

### Cuerpo de la petición

Formatos: JSON

| Nombre       | Tipo    | Requerido | Descripción                        |
| ------------ | ------- | --------- | ---------------------------------- |
| title        | String  | True      | Título del curso                   |
| description  | String  | True      | Descripción del curso              |
| price        | Double  | True      | Precio al cual se venderá el curso |
| instructorId | Integer | True      | Id del usuario que crea el curso   |

### Respuesta

Regresa un objeto en formato JSON con el id del curso recién creado.

| Estatus | Descripción                                                                  |
| ------- | ---------------------------------------------------------------------------- |
| 201     | El curso se ha creado con éxito                                              |
| 400     | La información proporcionada es incorrecta o está incompleta                 |
| 415     | El tipo de contenido de la petición es incorrecto. Debe ser application/json |

## Editar un curso

Permite editar un curso ya registrado.

Endpoint: localhost/api/courses/{id}

Método: PUT

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción           |
| ------ | --------- | ---- | ------- | --------------------- |
| id     | True      | Path | Integer | Id del curso a editar |

### Cuerpo de la petición

Formatos: JSON

| Nombre      | Tipo   | Requerido | Descripción                 |
| ----------- | ------ | --------- | --------------------------- |
| title       | String | False     | Nuevo título del curso      |
| description | String | False     | Nueva descripción del curso |
| price       | Double | False     | Nuevo precio del curso      |

### Respuesta

Regresa un objeto que incluye la información anterior (old) y la nueva información (new).

| Estatus | Descripción                                                                                                                                                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | Operación exitosa                                                                                                                                                                                                                       |
| 400     | La información proporcionada es incorrecta o está incompleta. Retorna un objeto con un objeto de mensaje (message) con más información del error, y un objeto de errores (errors) que indican la fuente del error y el error específico |
| 404     | El curso que se quiere editar no existe                                                                                                                                                                                                 |
| 415     | El formato de la información es incorrecto, debe ser application/json                                                                                                                                                                   |

## Editar imagen de un curso

Permite asignar o editar la imagen de un curso existente.

Endpoint: localhost/api/courses/{id}/image

Método: PUT

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                                      |
| ------ | --------- | ---- | ------- | ------------------------------------------------ |
| id     | True      | Path | Integer | Id del curso del cual se quiere editar la imagen |

### Cuerpo de la petición

Formatos: image/jpg, image/png

Se adjunta la información binaria del archivo que se quiere asignar como imagen del curso.

### Respuesta

| Estatus | Descripción                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| 200     | Operación exitosa                                                                                                         |
| 400     | El tamaño de la imagen es incorrecto o no se ha enviado la información. Retorna un objeto de mensaje con más información. |
| 415     | El tipo de contenido enviado no es válido. Debe ser image/jpg o image/png                                                 |

## Eliminar un curso

Permite eliminar por completo un curso existente y su información relacionada (secciones, lecciones, recursos, etc.).

Endpoint: localhost/api/courses/{id}

Método: DELETE

### Párametros

| Nombre | Requerido | En   | Tipo    | Descripción             |
| ------ | --------- | ---- | ------- | ----------------------- |
| id     | True      | Path | Integer | Id del curso a eliminar |

### Respuesta

| Estatus | Descripción       |
| ------- | ----------------- |
| 200     | Operación exitosa |

## Agregar categoría a un curso

Permite agregar una categoría a un curso existente.

Endpoint: localhost/api/courses/{id}/categories

Método: POST

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                                     |
| ------ | --------- | ---- | ------- | ----------------------------------------------- |
| id     | True      | Path | Integer | Id del curso al que se le agregará la categoría |

### Cuerpo de la petición

Formatos: JSON

| Nombre     | Tipo    | Requerido | Descripción                                       |
| ---------- | ------- | --------- | ------------------------------------------------- |
| categoryId | Integer | True      | Id de la categoría que se quiere agregar al curso |

### Respuesta

| Estatus | Descripción                                                        |
| ------- | ------------------------------------------------------------------ |
| 201     | Se ha agregado la categoría al curso correctamente                 |
| 415     | El formato de la petición es incorrecto. Debe ser application/json |

## Eliminar categoría a un curso

Permite eliminar una categoría de las categorías registradas de un curso.

Endpoint: localhost/api/courses/{id}/categories/{categoryId}

Método: DELETE

### Parámetros

| Nombre     | Requerido | En   | Tipo    | Descripción                                                       |
| ---------- | --------- | ---- | ------- | ----------------------------------------------------------------- |
| id         | True      | Path | Integer | Id del curso del que se quiere eliminar la categoría              |
| categoryId | True      | Path | Integer | Id de la categoría a eliminar de la lista de categorías del curso |

### Respuesta

| Estatus | Descripción       |
| ------- | ----------------- |
| 200     | Operación exitosa |
