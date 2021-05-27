import Utility from '../Utility.js';
import Lesson from '../objects/Lesson.js';
import Resource from '../objects/Resource.js';
import Video from '../objects/Video.js';

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

export const addResourceEvent = (e, displayMessageId, displayErrorsId) => {
    e.preventDefault();
    const form = e.target;

    let section = form.dataset.section;
    let lesson = form.dataset.lesson;

    let lessonFormId = `s${section}l${lesson}`;
    const lessonForm = document.getElementById(lessonFormId);

    const lessonId = lessonForm.dataset.lessonId;

    if (!lessonId) {
        Utility.displayErrors(displayErrorsId, {
            'message': 'Es necesario guardar la lección primero',
        });
        return;
    }

    const resource = new Resource(
        (response) => {
            if (response.ok) {
                Utility.displayErrors(displayErrorsId, null);
                Utility.displayMessage(
                    displayMessageId,
                    'Se ha subido el recurso'
                );
                return;
            }

            response.json().then((data) => {
                Utility.displayMessage(displayMessageId, '');
                Utility.displayErrors(displayErrorsId, data.errors);
            });
        },
        (errors) => {
            Utility.displayMessage(displayMessageId, '');
            Utility.displayErrors(displayErrorsId, errors);
        }
    );

    let fileInput = document.getElementById(`${lessonFormId}ResourceInput`);
    for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        resource.create(file, lessonId);
    }
};

export const addVideoEvent = (e, displayMessageId, displayErrorsId) => {
    e.preventDefault();
    const form = e.target;

    let section = form.dataset.section;
    let lesson = form.dataset.lesson;

    let lessonFormId = `s${section}l${lesson}`;
    const lessonForm = document.getElementById(lessonFormId);

    const lessonId = lessonForm.dataset.lessonId;

    if (!lessonId) {
        Utility.displayErrors(displayErrorsId, {
            'message': 'Es necesario guardar la lección primero',
        });
        return;
    }

    const video = new Video(
        (response) => {
            if (response.ok) {
                Utility.displayErrors(displayErrorsId, null);
                Utility.displayMessage(
                    displayMessageId,
                    'Se ha subido el video'
                );
                return;
            }

            response.json().then((data) => {
                Utility.displayMessage(displayMessageId, '');
                Utility.displayErrors(displayErrorsId, data.errors);
            });
        },
        (errors) => {
            Utility.displayMessage(displayMessageId, '');
            Utility.displayErrors(displayErrorsId, errors);
        }
    );

    let fileInput = document.getElementById(`${lessonFormId}VideoInput`);
    let videoFile = fileInput.files[0];

    video.set(videoFile, lessonId);
};
