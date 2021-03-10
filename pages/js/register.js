import UserValidator from '../../scripts/validators/user/UserValidator.js';
import Utility from '../../scripts/Utility.js';

function registerUser(user) {
    const endpoint = 'http://localhost/api/post/RegisterUser.php';

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(result => { return result.json(); })
    .then(data => {
        if(data.status === 'error')
        {
            const errors = data.errors;
            Utility.displayErrors('registerErrors', errors);
        }
    });
}

document.getElementById('userRegisterForm').addEventListener('submit', e => {
    const form = e.target;
    let user = Utility.formDataToObject(new FormData(form));

    let validator = new UserValidator(user);
    let errors = validator.validate();

    if (!Utility.objectIsEmpty(errors)) {
        Utility.displayErrors('registerErrors', errors);
        e.preventDefault();
    }
    else {
        registerUser(user)
    }
});