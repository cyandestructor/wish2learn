// import sirve para traer funciones o clases de otr archivo JS
// Para usar esta funcionalidad, los scripts que la usan, cuando se agregan
// a un HTML deben ser etiquetados como en el siguiente ejemplo:
// <script src="scripts/User.js" type="module"></script>
// Nota que se agrega el type='module' en la etiqueta script de apertura
// Más información de módulos de JS ES6: https://desarrolloweb.com/articulos/es6-modules.html
import UserValidator from '../validators/user/UserValidator.js';
import UserEditorValidator from '../validators/user/UserEditionValidator.js';
import Utility from '../Utility.js';

// Con export defino que esta clase puede ser importada (con import) en otro archivo

// Con default indico que esta clase será la importada por default si hago import de
// esta clase desde otro archivo
export default class User {
    #data;
    #validationErrorCallback;
    #responseCallback;

    // Este es el enlace de la api que me permite hacer las operaciones con usuario
    static #endpoint = 'http://localhost/api/users';

    // El constructor le asigna al objeto un callback de respuesta y uno de errores de validación (ver adelante)
    // El validationErrorCallback es opcional, por eso si no se especifica será null por defecto
    constructor(responseCallback, validationErrorCallback = null) {
        this.setResponseCallback(responseCallback);
        this.setValidationErrorCallback(validationErrorCallback);
    }

    // Permite registrar un callback de respuesta
    // Ese callback debe ser una función que reciba de parámetro una respuesta:
    // function callbackEjemplo(respuesta) { ... }
    // El callback se mandará llamar cuando una petición tenga una respuesta
    // la respuesta se enviará al callback para poder procesarla
    // más información de la respuesta: https://developer.mozilla.org/en-US/docs/Web/API/Response
    setResponseCallback(callback) {
        this.#responseCallback = callback;
    }

    // Permite registrar un callback de errores de validación
    // Ese callback debe ser una función que reciba de parámetro un objeto de errores:
    // function callbackEjemplo(errores) { ... }
    // El callback se mandará llamar cuando una validación realizada en el cliente
    // contiene errores (Ej. La contraseña no cumple los requisitos mínimos)
    // Un objeto con pares campo => mensaje se enviará al callback para procesarlo
    // El campo es la fuente de error y el mensaje da más información de qué causó el error
    // Ejemplo:
    // let mensajeDeError = errores['name'];
    // console.log(mensajeDeError); ----> Imprime: 'The name must be alphabetic'
    setValidationErrorCallback(callback) {
        this.#validationErrorCallback = callback;
    }

    // Para hacer el registro necesito recibir un objeto de JS
    // que debe tener al menos los siguientes campos:
    // 'username', 'name', 'lastname', 'email', 'password'
    register(userObj) {
        // Utilizo la clase UserValidator que importé para validar el objeto que contiene la información
        let validator = new UserValidator(userObj);
        let errors = validator.validate();

        // Si hay errores de validación, register manda a llamar el callback de errores
        // de cliente si éste fue registrado con setValidationErrorCallback
        // y le envía el objeto de errores para poder leerlos
        if (!Utility.objectIsEmpty(errors) && this.#validationErrorCallback) {
            return this.#validationErrorCallback(errors);
        }

        // Llamada asíncrona a la base de datos usando fetch
        // Le paso como url el endpoint que definí arriba
        // En la configuración el método es POST porque queremos agregar un nuevo usuario
        // En los headers agregamos el Content-Type y lo definimos como application/json
        // ya que eso es lo que mandamos en el body y es como la API espera recibirlo
        // Al body le asigno la información del usuario convertida en JSON con JSON.stringify
        fetch(User.#endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObj),
        }).then((response) => {
            // Si se logra hacer la llamada, se manda a llamar el callback de respuesta
            // si éste fue registrado previamente con setResponseCallback. Se envía la respuesta completa
            if (this.#responseCallback) {
                return this.#responseCallback(response);
            }
        });
    }

    getInformation(userId) {
        // Aquí el endpoint para obtener información de un usuario es de la forma:
        // /api/users/{id}
        const endpoint = `${User.#endpoint}/${userId}`;

        // Es una petición GET, así que no hay que configurar nada ya que fetch
        // por defecto manda una petición GET
        fetch(endpoint).then((response) => {
            if (this.#responseCallback) {
                return this.#responseCallback(response);
            }
        });
    }

    edit(userId, userObj) {
        // El endpoint necesario para editar es similar al del GET
        // /api/users/{id}
        const endpoint = `${User.#endpoint}/${userId}`;

        // Utilizo la clase UserEditorValidator que importé para validar el objeto que contiene la información
        let validator = new UserEditorValidator(userObj);
        let errors = validator.validate();

        if (!Utility.objectIsEmpty(errors) && this.#validationErrorCallback) {
            return this.#validationErrorCallback(errors);
        }

        // Llamada asíncrona a la base de datos usando fetch
        // Le paso como url el endpoint que definí arriba
        // En la configuración el método es PUT porque queremos editar un usuario existente
        // En los headers agregamos el Content-Type y lo definimos como application/json
        // ya que eso es lo que mandamos en el body y es como la API espera recibirlo
        // Al body le asigno la información del usuario convertida en JSON con JSON.stringify
        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObj),
        }).then((response) => {
            if (this.#responseCallback) {
                return this.#responseCallback(response);
            }
        });
    }

    setAvatar(userId, avatar) {
        // El endpoint necesario para editar el avatar es de la forma
        // /api/users/{id}/avatar
        const endpoint = `${User.#endpoint}/${userId}/avatar`;

        // Se verifica que el archivo cumpla con el tamaño máximo de imagen
        const maxImageSize = 5 * 1024 * 1024; // 5.0 MB
        if (avatar.size >= maxImageSize && this.#validationErrorCallback) {
            return this.#validationErrorCallback({
                avatar: 'The avatar must not be greater than 5.0 MB',
            });
        }

        // Como vamos a editar un recurso, hacemos el fetch con método PUT
        // Agregamos el content type, puede ser image/jpeg o image/png
        // Enviamos como cuerpo de la petición
        // el avatar directo (es decir, la información binaria de la imagen)
        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': avatar.type,
            },
            body: avatar,
        }).then((response) => {
            if (this.#responseCallback) {
                return this.#responseCallback(response);
            }
        });
    }
}
