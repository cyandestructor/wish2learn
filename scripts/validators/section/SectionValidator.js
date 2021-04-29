import Validations from '../Validations.js';
import { interpretError } from '../ValidationsUtility.js';

export default class SectionValidator {
    #section;
    #errors = {};

    static #fields = ['title', 'price'];

    constructor(section) {
        this.#section = section;
    }

    get section() {
        return this.#section;
    }

    get errors() {
        return this.#errors;
    }

    validate() {
        SectionValidator.#fields.forEach((field) => {
            if (!this.#section.hasOwnProperty(field)) {
                throw new Error(`The ${field} is not present in the section`);
            }
        });

        this.validateTitle();
        this.validatePrice();

        return this.#errors;
    }

    validateTitle() {
        const field = 'title';
        let title = String(this.#section[field]).trim();

        const maxLength = 50;

        let validate = new Validations(title);
        validate.maxLength(maxLength).required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error, 0, maxLength);
            this.addError(field, message);
        }
    }

    validatePrice() {
        const field = 'price';
        let price = String(this.#section[field]).trim();

        let validate = new Validations(price);
        validate.number().minValue(0).notRequired();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error, 0, 0, 0);
            this.addError(field, message);
        }
    }

    addError(key, value) {
        this.#errors[key] = value;
    }
}
