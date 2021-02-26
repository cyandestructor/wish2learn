import UserValidator from './validators/user/UserValidator.js'

const user = {
    username: 'cyandestructor',
    name: 'Bryan',
    lastname: 'Duarte',
    email: 'myemail.55@mail.com',
    password: 'Camera11!'
};

let userValidator = new UserValidator(user);
let errors = userValidator.validate();

if (Object.keys(errors).length) {
    console.log(errors);
}
else {
    console.log('The information is correct');
}