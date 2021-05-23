import Utility from '../Utility.js';
import Course from '../objects/Course.js';

const getCurrentUserId = () => {
    return 1; // TODO: Load current user
};

document
    .getElementById('courseCreationForm')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const data = Utility.formDataToObject(new FormData(form));
        data.instructorId = getCurrentUserId();

        const course = new Course(
            (response) => {
                if (response.ok) {
                    form.reset();
                    Utility.displayMessage('colocarAvisos', 'Registro exitoso');
                    Utility.displayErrors('courseErrors', null);

                    response.json().then((course) => {
                        const courseIdContainer =
                            document.getElementById('courseIdContainer');
                        courseIdContainer.dataset.courseId = course.id;

                        const tabButton = document.getElementById(
                            'multimedia-datos-tab'
                        );
                        tabButton.click();
                    });
                    return;
                }

                if (response.status === 400) {
                    response.json().then((data) => {
                        Utility.displayErrors('courseErrors', data.errors);
                    });
                }

                if (response.status >= 500) {
                    // Do something
                    return;
                }
            },
            (errors) => {
                Utility.displayMessage('colocarAvisos', '');
                Utility.displayErrors('courseErrors', errors);
            }
        );

        course.create(data);
    });
