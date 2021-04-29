import Validations from '../Validations.js';
import { interpretError } from '../ValidationsUtility.js';

export default class UserValidator {
    #user;
    #errors = {};

    static #fields = ['username', 'name', 'lastname', 'email', 'password'];

    constructor(user) {
        this.#user = user;
    }

    get errors() {
        return this.#errors;
    }

    get user() {
        return this.#user;
    }

    validate() {
        UserValidator.#fields.forEach((field) => {
            if (!this.#user.hasOwnProperty(field)) {
                throw new Error(`${field} is not present in the user`);
            }
        });

        this.validateUsername();
        this.validateEmail();
        this.validateName();
        this.validateLastname();
        this.validatePassword();

        return this.#errors;
    }

    validateUsername() {
        const field = 'username';
        let username = String(this.#user[field]).trim();

        const minLength = 6;
        const maxLength = 30;

        let validate = new Validations(username);
        validate
            .alphanumeric()
            .minLength(minLength)
            .maxLength(maxLength)
            .required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error, minLength, maxLength);
            this.addError(field, message);
        }
    }

    validateName() {
        const field = 'name';
        let name = String(this.#user[field]).trim();

        let validate = new Validations(name);
        validate.alphabetic(true).required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error);
            this.addError(field, message);
        }
    }

    validateLastname() {
        const field = 'lastname';
        let lastname = String(this.#user[field]).trim();

        let validate = new Validations(lastname);
        validate.alphabetic(true).required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error);
            this.addError(field, message);
        }
    }

    validatePassword() {
        const field = 'password';
        let password = this.#user[field];

        let validate = new Validations(password);
        validate
            .match(/.*(?=.*[A-Z])(?=.*\d)(?=.*\W).*/)
            .minLength(8)
            .required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message;
            if (error === Validations.Error.Match) {
                message =
                    'The password must have at least one uppercase, one number and one special character';
            } else {
                message = interpretError(field, error, 8);
            }
            this.addError(field, message);
        }
    }

    validateEmail() {
        const field = 'email';
        let email = String(this.#user[field]).trim();

        let validate = new Validations(email);
        validate.email().required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error);
            this.addError(field, message);
        }
    }

    addError(key, value) {
        this.#errors[key] = value;
    }
}
