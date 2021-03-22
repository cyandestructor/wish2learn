import Validations from './Validations.js';

export function interpretError(field, error, minLength = 0, maxLength = 0, minValue = 0, maxValue = 0) {
    let message = '';
    
    switch (error) {
        case Validations.Error.Alphabetic:
            message = `The ${field} must be alphabetic`;
            break;
        case Validations.Error.Numeric:
            message = `The ${field} must be numeric`;
            break;
        case Validations.Error.Alphanumeric:
            message = `The ${field} must be alphanumeric`;
            break;
        case Validations.Error.Required:
            message = `The ${field} must not be empty`;
            break;
        case Validations.Error.MinLength:
            message = `The ${field} must be at least ${minLength} characters long`;
            break;
        case Validations.Error.MaxLength:
            message = `The ${field} must be less than ${maxLength} characters long`;
            break;
        case Validations.Error.MinValue:
            message = `The ${field} must be greater than ${minValue}`;
            break;
        case Validations.Error.MaxValue:
            message = `The ${field} must be lesser than ${maxValue}`;
            break;
        case Validations.Error.Email:
            message = `The ${field} must be a valid email`;
            break;
        case Validations.Error.Number:
            message = `The ${field} must be a valid number`;
            break;
        default:
            break;
    }

    return message;
}