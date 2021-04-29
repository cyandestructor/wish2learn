import Validations from '../Validations.js';
import { interpretError } from '../ValidationsUtility.js';

export default class LessonValidator {
    #lesson;
    #errors = {};

    static #fields = ['title'];

    constructor(lesson) {
        this.#lesson = lesson;
    }

    get lesson() {
        return this.#lesson;
    }

    get errors() {
        return this.#errors;
    }

    validate() {
        LessonValidator.#fields.forEach((field) => {
            if (!this.#lesson.hasOwnProperty(field)) {
                throw new Error(`The ${field} is not present in the lesson`);
            }
        });

        this.validateTitle();

        return this.#errors;
    }

    validateTitle() {
        const field = 'title';
        let title = String(this.#lesson[field]).trim();

        const maxLength = 50;

        let validate = new Validations(title);
        validate.maxLength(maxLength).required();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error, 0, maxLength);
            this.addError(field, message);
        }
    }

    addError(key, value) {
        this.#errors[key] = value;
    }
}
