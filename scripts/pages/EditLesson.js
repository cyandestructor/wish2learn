import Lesson from '../objects/Lesson.js';
import Utility from '../Utility.js';

const displayLessonData = (lesson) => {
    const title = document.getElementById('lessonTitle');
    const text = document.getElementById('lessonText');
    const form = document.getElementById('lessonEditionForm');
    const published = document.getElementById('lessonPublished');
    const unpublished = document.getElementById('lessonUnpublished');
    const deleteBtn = document.getElementById('deleteLessonBtn');

    if (lesson.published) {
        published.checked = true;
    } else {
        unpublished.checked = true;
    }

    title.value = lesson.title;
    text.innerText = lesson.text;
    form.dataset.lessonId = lesson.id;
    deleteBtn.dataset.lessonId = lesson.id;
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const lessonId = params.get('lesson');

    if (!lessonId) {
        // Do something
        console.log('Lesson not registered');
        return;
    }

    const lesson = new Lesson((response) => {
        if (response.ok) {
            response.json().then((data) => {
                displayLessonData(data);
            });
            return;
        }
    });

    lesson.getInformation(lessonId);
});

document.getElementById('lessonEditionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const lessonId = form.dataset.lessonId;

    if (!lessonId) {
        console.log('lesson is not specified');
        return;
    }

    let lessonObj = Utility.formDataToObject(new FormData(form));

    const lesson = new Lesson(
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

    lesson.edit(lessonObj, lessonId);
});

document.getElementById('deleteLessonBtn').addEventListener('click', (e) => {
    const button = e.target;
    const lessonId = button.dataset.lessonId;

    if (!lessonId) {
        console.log('Lesson is not specified');
        return;
    }

    let lesson = new Lesson((response) => {
        if (response.ok) {
            // Deleted
            alert('Se ha borrado la lección');
            return;
        }
    });

    lesson.delete(lessonId);
});
