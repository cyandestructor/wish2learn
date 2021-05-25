import Course from '../objects/Course.js';
import Utility from '../Utility.js';

const displayCourseData = (course) => {
    const title = document.getElementById('courseTitle');
    const price = document.getElementById('coursePrice');
    const description = document.getElementById('courseDescription');
    const form = document.getElementById('courseEditionForm');
    const imageForm = document.getElementById('imageForm');
    const displayImage = document.getElementById('courseImageDisplay');
    const published = document.getElementById('coursePublished');
    const unpublished = document.getElementById('courseUnpublished');
    const deleteBtn = document.getElementById('deleteCourseBtn');

    if (course.published) {
        published.checked = true;
    } else {
        unpublished.checked = true;
    }

    title.value = course.title;
    price.value = course.price;
    description.innerHTML = course.description;
    form.dataset.courseId = course.id;
    imageForm.dataset.courseId = course.id;
    deleteBtn.dataset.courseId = course.id;
    displayImage.src = 'http://localhost' + course.image;
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('course');

    if (!courseId) {
        // Do something
        console.log('Course not registered');
        return;
    }

    const course = new Course((response) => {
        if (response.ok) {
            response.json().then((data) => {
                displayCourseData(data);
            });
            return;
        }
    });

    course.getInformation(courseId);
});

document.getElementById('courseEditionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const courseId = form.dataset.courseId;

    if (!courseId) {
        console.log('course is not specified');
        return;
    }

    let courseObj = Utility.formDataToObject(new FormData(form));

    const course = new Course(
        (response) => {
            if (response.ok) {
                response.json().then((data) => {
                    Utility.displayErrors('editionDisplayErrors', null);
                    Utility.displayMessage(
                        'editionDisplayMessage',
                        'Edición exitosa'
                    );
                });
                return;
            }

            if (response.status === 400) {
                response.json().then((data) => {
                    Utility.displayErrors('editionDisplayErrors', data.errors);
                    Utility.displayMessage('editionDisplayMessage', '');
                });
                return;
            }
        },
        (errors) => {
            Utility.displayErrors('editionDisplayErrors', errors);
            Utility.displayMessage('editionDisplayMessage', '');
        }
    );

    course.edit(courseObj, courseId);
});

document.getElementById('imageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const courseId = form.dataset.courseId;

    if (!courseId) {
        console.log('course is not specified');
        return;
    }

    const input = document.getElementById('courseImage');

    const file = input.files[0];

    let course = new Course(
        (response) => {
            if (response.ok) {
                Utility.displayErrors('imageDisplayErrors', null);
                Utility.displayMessage(
                    'imageDisplayMessage',
                    'Se ha cambiado la imagen exitosamente'
                );
                return;
            }

            if (response.status === 400) {
                response.json().then((data) => {
                    Utility.displayErrors('imageDisplayErrors', {
                        'message': data.message,
                    });
                    Utility.displayMessage('imageDisplayMessage', '');
                });
            }

            if (response.status >= 500) {
                // Do something
                return;
            }
        },
        (errors) => {
            Utility.displayErrors('imageDisplayErrors', errors);
            Utility.displayMessage('imageDisplayMessage', '');
        }
    );

    course.setImage(file, courseId);
});

document.getElementById('deleteCourseBtn').addEventListener('click', (e) => {
    const button = e.target;
    const courseId = button.dataset.courseId;

    if (!courseId) {
        console.log('course is not specified');
        return;
    }

    let course = new Course((response) => {
        if (response.ok) {
            // Deleted
            alert('Se ha borrado el curso');
            return;
        }
    });

    course.delete(courseId);
});
