import User from '../objects/User.js';
import Utility from '../Utility.js';

document.getElementById('userRegisterForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const userInfo = Utility.formDataToObject(new FormData(form));

    const user = new User(
        (response) => {
            if (response.ok) {
                // Display success message / Mostrar mensaje de éxito
                Utility.displayMessage(
                    'displayRegisterMessage',
                    'User registered'
                );
                form.reset();
                Utility.displayErrors('displayRegisterErrors', null);
                return;
            }

            // Se puede realizar una acción de acuerdo al código de respuesta (response.status)
            alert('Something failed');
        },
        (errors) => {
            // Display errors / Mostrar errores
            Utility.displayMessage('displayRegisterMessage', '');
            Utility.displayErrors('displayRegisterErrors', errors);
        }
    );

    user.register(userInfo);
});
