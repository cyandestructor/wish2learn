import Utility from '../Utility.js';
import ApiObject from './ApiObject.js';
import LessonValidator from '../validators/lesson/LessonValidator.js';

export default class Lesson extends ApiObject {
    static base = 'http://localhost';

    constructor(responseCallback, validationCallback) {
        super();
        super.setResponseCallback(responseCallback);
        super.setValidationErrorCallback(validationCallback);
    }

    create(lessonObj, sectionId) {
        let endpoint = `${Lesson.base}/api/sections/${sectionId}/lessons`;

        let validator = new LessonValidator(lessonObj);
        let errors = validator.validate();

        if (!Utility.objectIsEmpty(errors) && this.validationErrorCallback) {
            return this.validationErrorCallback(errors);
        }

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lessonObj),
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }

    edit(lessonObj, lessonId) {
        let validator = new LessonValidator(lessonObj);
        let errors = validator.validate();

        if (!Utility.objectIsEmpty(errors) && this.validationErrorCallback) {
            return this.validationErrorCallback(errors);
        }

        const endpoint = `${Lesson.base}/api/lessons/${lessonId}`;

        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lessonObj),
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }

    delete(lessonId) {
        const endpoint = `${Lesson.base}/api/lessons/${lessonId}`;

        fetch(endpoint, {
            method: 'DELETE',
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }

    getInformation(lessonId) {
        const endpoint = `${Lesson.base}/api/lessons/${lessonId}`;

        fetch(endpoint).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }

    getSectionLessons(sectionId) {
        const endpoint = `${Lesson.base}/api/sections/${sectionId}/lessons`;

        fetch(endpoint).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }

    setCompleted(lessonId, userId, completed) {
        const endpoint = `${Lesson.base}/api/users/${userId}/lessons/${lessonId}?completed=${completed}`;

        fetch(endpoint, {
            method: 'PUT',
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }
}
