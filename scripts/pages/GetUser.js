import User from '../objects/User.js';

const loadUser = (user) => {
    // Display user info
    document.getElementById(
        'userFullname'
    ).innerText = `${user.name} ${user.lastname}`;
    document.getElementById('userDescription').innerText = user.description;
};

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const userId = path.substr(path.lastIndexOf('/') + 1); // Ex. /users/{id}

    const user = new User((response) => {
        if (response.ok) {
            // Load user info
            response.json().then(loadUser);
            return;
        }

        if (response.status == 404) {
            // Show 404 message
            return;
        }
    });

    if (userId) {
        user.getInformation(userId);
    }
});
