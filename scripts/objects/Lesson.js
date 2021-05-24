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
}
