import UserValidator from './validators/user/UserValidator.js'
import Utility from './Utility.js';

document.getElementById('form').addEventListener('submit', (e) => {
    const form = e.target;
    const user = Utility.formDataToObject(new FormData(form));

    let validator = new UserValidator(user);
    let errors = validator.validate();

    if (!Utility.objectIsEmpty(errors)) {
        Utility.displayErrors(errors);
        console.log(errors);
        e.preventDefault();
    }
});