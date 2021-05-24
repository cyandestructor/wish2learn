import Utility from '../Utility.js';
import Lesson from '../objects/Lesson.js';

export const addLessonEvent = (e, displayMessageId, displayErrorsId) => {
    e.preventDefault();
    const form = e.target;
    let data = Utility.formDataToObject(new FormData(form));

    let formId = form.id;
    let sectionFormId = formId.substr(0, formId.indexOf('l'));
    let sectionForm = document.getElementById(sectionFormId);
    let sectionId = sectionForm.dataset.sectionId;

    if (!sectionId) {
        Utility.displayErrors(displayErrorsId, {
            'message': 'Es necesario guardar la sección primero',
        });
        return;
    }

    let lessonId = form.dataset.lessonId;

    let lesson;

    if (!lessonId) {
        lesson = new Lesson(
            (response) => {
                if (response.ok) {
                    Utility.displayErrors(displayErrorsId, null);
                    Utility.displayMessage(
                        displayMessageId,
                        'Creación exitosa'
                    );

                    response.json().then((lesson) => {
                        form.dataset.lessonId = lesson.id;
                    });
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

        lesson.create(data, sectionId);
        return;
    }
};
