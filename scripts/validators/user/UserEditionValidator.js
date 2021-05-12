import Validations from '../Validations.js';
import UserValidator from './UserValidator.js';
import { interpretError } from '../ValidationsUtility.js';

export default class UserEditorValidator extends UserValidator
{
    static #fields = ['name', 'lastname', 'description'];

    validate()
    {
        UserEditorValidator.#fields.forEach(field => {
            if (!super.user.hasOwnProperty(field)) {
                throw new Error(`${field} is not present in the user`);
            }
        });

        super.validateName();
        super.validateLastname();

        return super.errors;
    }

    validateDescription()
    {
        const field = 'description';
        let description = String(this.user[field]).trim();

        const maxLength = 1000;

        let validate = new Validations(description);
        validate
            .maxLength(maxLength)
            .notRequired();

        let error = validate.lastError;
        if (error !== Validations.Error.None) {
            let message = interpretError(field, error, 0, maxLength);
            super.addError(field, message);   
        }
    }
}