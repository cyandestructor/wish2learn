import Utility from '../Utility.js';
import Section from '../objects/Section.js';

export const addSectionEvent = (e, displayMessageId, displayErrorsId) => {
    e.preventDefault();
    const form = e.target;
    let data = Utility.formDataToObject(new FormData(form));
    let courseIdContainer = document.getElementById('courseIdContainer');

    if (!courseIdContainer) {
        alert('No se ha creado un id de curso');
        return;
    }

    let courseId = courseIdContainer.dataset.courseId;

    if (!courseId) {
        Utility.displayErrors(displayErrorsId, {
            'message': 'Es necesario crear un curso primero',
        });
        return;
    }

    const section = new Section(
        (response) => {
            if (response.ok) {
                Utility.displayErrors(displayErrorsId, null);
                Utility.displayMessage(displayMessageId, 'Creación exitosa');
                return;
            }

            if (response.status === 400) {
                response.json().then((data) => {
                    Utility.displayErrors(displayErrorsId, data.errors);
                });
                return;
            }

            if (response.status >= 500) {
                // Do something
            }
        },
        (errors) => {
            Utility.displayMessage(displayMessageId, '');
            Utility.displayErrors(displayErrorsId, errors);
        }
    );

    section.create(data, courseId);
};
