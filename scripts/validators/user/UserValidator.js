import Validations from '../Validations.js';

export default class UserValidator
{
    #user;
    #errors = {};

    static #fields = ['username', 'name', 'lastname', 'email', 'password'];

    constructor(user)
    {
        this.#user = user;
    }

    static #interpretError(field, error, minLength = 0, maxLength = 0) {
        let message = '';
        
        switch (error) {
            case Validations.Error.Alphabetic:
                message = `${field} must be alphabetic`;
                break;
            case Validations.Error.Numeric:
                message = `${field} must be numeric`;
                break;
            case Validations.Error.Alphanumeric:
                message = `${field} must be alphanumeric`;
                break;
            case Validations.Error.Required:
                message = `${field} must not be empty`;
                break;
            case Validations.Error.MinLength:
                message = `The ${field} must be at least ${minLength} characters long`;
                break;
            case Validations.Error.MaxLength:
                message = `The ${field} must be less than ${maxLength} characters long`;
                break;
            case Validations.Error.Email:
                message = `The ${field} must be a valid email`;
                break;
            default:
                break;
        }
    
        return message;
    }

    validate()
    {
        UserValidator.#fields.forEach(field => {
            if (!this.#user.hasOwnProperty(field)) {
                throw new Error(`${field} is not present in the user`);
            }
        });

        this.#validateUsername();
        this.#validateEmail();
        this.#validateName();
        this.#validateLastname();
        this.#validatePassword();

        return this.#errors;
    }

    #validateUsername()
    {
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
            let message = UserValidator.#interpretError(field, error, minLength, maxLength);
            this.#addError(field, message);
        }
    }

    #validateName()
    {
        const field = 'name';
        let name = String(this.#user[field]).trim();

        let validate = new Validations(name);
        validate
            .alphabetic(true)
            .required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = UserValidator.#interpretError(field, error);
            this.#addError(field, message);
        }
    }

    #validateLastname()
    {
        const field = 'lastname';
        let lastname = String(this.#user[field]).trim();

        let validate = new Validations(lastname);
        validate
            .alphabetic(true)
            .required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = UserValidator.#interpretError(field, error);
            this.#addError(field, message);
        }
    }

    #validatePassword()
    {
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
                message = 'The password must have at least one uppercase, one number and one special character';
            }
            else {
                message = UserValidator.#interpretError(field, error, 8);
            }
            this.#addError(field, message);
        }
    }

    #validateEmail()
    {
        const field = 'email';
        let email = String(this.#user[field]).trim();

        let validate = new Validations(email);
        validate
            .email()
            .required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = UserValidator.#interpretError(field, error);
            this.#addError(field, message);
        }
    }

    #addError(key, value)
    {
        this.#errors[key] = value;
    }
}