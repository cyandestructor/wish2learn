# Enrollment

## Inscribir usuario en un curso

Permite inscribir a un usuario existente en un curso existente.

Endpoint: localhost/api/enrollments

Método: POST

### Cuerpo de la petición

Formatos: application/json

| Nombre   | Tipo    | Requerido | Descripción                                         |
| -------- | ------- | --------- | --------------------------------------------------- |
| userId   | Integer | True      | Id del usuario que se inscribe                      |
| courseId | Integer | True      | Id del curso en el que se va a inscribir el usuario |

### Respuesta

| Estatus | Descripción                                                        |
| ------- | ------------------------------------------------------------------ |
| 201     | Inscripción exitosa                                                |
| 415     | El formato de la petición es incorrecto, debe ser application/json |

## Obtener los cursos inscritos de un usuario

Permite obtener los cursos a los que un usuario está inscrito, así como su progreso en el curso

Endpoint: localhost/api/users/{id}/enrollments

Método: GET

### Parámetros

| Nombre | Requerido | En   | Tipo    | Descripción                                                    |
| ------ | --------- | ---- | ------- | -------------------------------------------------------------- |
| id     | True      | Path | Integer | Id del usuario del que se quieren obtener sus cursos inscritos |

### Respuesta

Retorna una lista de objetos con la información de los cursos inscritos de un usuario, así como las lecciones que ha completado y su progreso.

| Estatus | Descripción       |
| ------- | ----------------- |
| 200     | Operación exitosa |
