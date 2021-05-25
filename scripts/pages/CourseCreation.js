import Utility from '../Utility.js';
import Course from '../objects/Course.js';
import { getCurrentUserId } from '../objects/Session.js';

const addCourseCategories = (courseId) => {
    const select = document.getElementById('categoriasDB');

    const course = new Course();

    for (let i = 0; i < select.selectedOptions.length; i++) {
        let option = select.selectedOptions[i];
        let categoryId = option.value;
        course.addCategory(categoryId, courseId);
    }
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
                    Utility.displayMessage('colocarAvisos', 'Registro exitoso');
                    Utility.displayErrors('courseErrors', null);

                    response.json().then((course) => {
                        const courseIdContainer =
                            document.getElementById('courseIdContainer');
                        courseIdContainer.dataset.courseId = course.id;

                        addCourseCategories(course.id);

                        form.reset();

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

document.getElementById('courseImageForm').addEventListener('submit', (e) => {
    e.preventDefault();

    let courseIdContainer = document.getElementById('courseIdContainer');

    if (!courseIdContainer) {
        alert('No se ha creado un id de curso');
        return;
    }

    let courseId = courseIdContainer.dataset.courseId;

    if (!courseId) {
        Utility.displayErrors('courseImageErrors', {
            'message': 'Es necesario crear un curso primero',
        });
        return;
    }

    let course = new Course(
        (response) => {
            if (response.ok) {
                Utility.displayErrors('courseImageErrors', null);
                Utility.displayMessage(
                    'courseImageMessages',
                    'Se ha cambiado la imagen exitosamente'
                );
                return;
            }

            if (response.status === 400) {
                response.json().then((data) => {
                    Utility.displayErrors('courseImageErrors', {
                        'message': data.message,
                    });
                    Utility.displayMessage('courseImageMessages', '');
                });
            }

            if (response.status >= 500) {
                // Do something
                return;
            }
        },
        (errors) => {
            Utility.displayErrors('courseImageErrors', errors);
            Utility.displayMessage('courseImageMessages', '');
        }
    );

    const fileInput = document.getElementById('courseImageInput');
    const courseImage = fileInput.files[0];

    course.setImage(courseImage, courseId);
});

document.getElementById('publishCourseBtn').addEventListener('click', (e) => {
    const courseIdContainer = document.getElementById('courseIdContainer');
    const courseId = courseIdContainer.dataset.courseId;

    if (!courseId) {
        Utility.displayErrors('publishError', {
            'message': 'Debe crearse un curso primero',
        });
        return;
    }

    const course = new Course((response) => {
        if (response.ok) {
            Utility.displayErrors('publishError', null);
            Utility.displayMessage(
                'publishMessage',
                'El curso se ha publicado de forma exitosa'
            );
            return;
        }

        if (response.status === 400) {
            response.json().then((data) => {
                Utility.displayErrors('publishError', data.errors);
            });
        }
    });

    course.edit({ 'published': true }, courseId);
});
