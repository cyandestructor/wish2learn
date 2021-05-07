import Validations from '../Validations.js';
import { interpretError } from '../ValidationsUtility.js';

export default class CategoryValidator
{
    #category;
    #errors = {};

    static #fields = ['name', 'description'];

    constructor(category)
    {
        this.#category = category;
    }

    get category()
    {
        return this.#category;
    }

    get errors()
    {
        return this.#errors;
    }

    validate()
    {
        CategoryValidator.#fields.forEach(field => {
            if (!this.#category.hasOwnProperty(field)) {
                throw new Error(`The ${field} is not present in the category`);
            }
        });

        this.validateName();
        this.validateDescription();

        return this.#errors;
    }

    validateName()
    {
        const field = 'name';
        let name = String(this.#category[field]).trim();

        const maxLength = 50;

        let validate = new Validations(name);
        validate
            .maxLength(maxLength)
            .required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error, 0, maxLength);
            this.addError(field, message);
        }
    }

    validateDescription()
    {
        const field = 'description';
        let description = String(this.#category[field]).trim();

        const maxLength = 255;

        let validate = new Validations(description);
        validate
            .maxLength(maxLength)
            .required();
        
        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error, 0, maxLength);
            this.addError(field, message);
        }
    }

    addError(key, value)
    {
        this.#errors[key] = value;
    }
}