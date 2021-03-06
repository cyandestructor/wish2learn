import UserValidator from './validators/user/UserValidator.js'
import Utility from './Utility.js';

document.getElementById('userRegistration').addEventListener('submit', (e) =>{
    const form = e.target;
    const user = Utility.formDataToObject(new FormData(form));
    
    let userValidator = new UserValidator(user);
    let errors = userValidator.validate();

    if (!Utility.objectIsEmpty(errors)) {
        console.log(errors);
        e.preventDefault();
    }
});