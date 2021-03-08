import UserEditorValidator from './validators/user/UserEditionValidator.js'
import Utility from './Utility.js';

function displayErrors(errors) {
    const errorList = document.getElementById('error-list');
    
    errorList.innerHTML = '';

    for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
            const error = errors[key];
            errorList.innerHTML += (error + '<br>');
        }
    }
}

document.getElementById('form').addEventListener('submit', (e) => {
    const form = e.target;
    const user = Utility.formDataToObject(new FormData(form));

    let validator = new UserEditorValidator(user);
    let errors = validator.validate();

    if (!Utility.objectIsEmpty(errors)) {
        displayErrors(errors);
        console.log(errors);
        e.preventDefault();
    }
});