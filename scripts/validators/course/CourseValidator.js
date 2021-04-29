import Validations from '../Validations.js';
import { interpretError } from '../ValidationsUtility.js';

export default class CourseValidator {
    #course;
    #errors = {};

    static #fields = ['title', 'description', 'price'];

    constructor(course) {
        this.#course = course;
    }

    get errors() {
        return this.#errors;
    }

    get course() {
        return this.#course;
    }

    validate() {
        CourseValidator.#fields.forEach((field) => {
            if (!this.#course.hasOwnProperty(field)) {
                throw new Error(`${field} is not present in the course`);
            }
        });

        this.validateTitle();
        this.validateDescription();
        this.validatePrice();

        return this.#errors;
    }

    validateTitle() {
        const field = 'title';
        let title = String(this.#course[field]).trim();

        let maxLength = 70;

        let validate = new Validations(title);
        validate.maxLength(maxLength).required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error, 0, maxLength);
            this.addError(field, message);
        }
    }

    validateDescription() {
        const field = 'description';
        let description = String(this.#course[field]).trim();

        const maxLength = 2000;

        let validate = new Validations(description);
        validate.maxLength(maxLength).notRequired();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error, 0, maxLength);
            this.addError(field, message);
        }
    }

    validatePrice() {
        const field = 'price';
        let price = String(this.#course[field]).trim();

        let validate = new Validations(price);
        validate.number().minValue(0).required();

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
