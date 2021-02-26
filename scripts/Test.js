import Validations from './validators/Validations.js'

function interpretError(field, error) {
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
        case Validations.Error.MaxLength:
            message = `${field} is too long`;
            break;
        case Validations.Error.MinLength:
            message = `${field} is too short`;
            break;
        case Validations.Error.Match:
            message = `${field} does not match the expression`;
            break;
        case Validations.Error.MinValue:
            message = `${field} is too low`;
            break;
        case Validations.Error.MaxValue:
            message = `${field} is too high`;
            break;
        case Validations.Error.Required:
            message = `${field} must not be empty`;
            break;
        default:
            message = 'Unknown error';
            break;
    }

    return message;
}

let value = 'ma!A1';
let validate = new Validations(value.trim());

validate.match(/.*(?=.*[A-Z])(?=.*\d)(?=.*\W).*/);

let error = validate.lastError;
if (error !== Validations.Error.None) {
    let message = interpretError('value', error);
    alert(message);
}
else
{
    alert('Information is correct');
}