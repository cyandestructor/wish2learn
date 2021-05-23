import Utility from '../Utility.js';
import ApiObject from './ApiObject.js';
import CourseValidator from '../validators/course/CourseValidator.js';

export default class Course extends ApiObject {
    static endpoint = 'http://localhost/api/courses';

    constructor(responseCallback, validationCallback) {
        super();
        super.setResponseCallback(responseCallback);
        super.setValidationErrorCallback(validationCallback);
    }

    create(courseObj) {
        let validator = new CourseValidator(courseObj);
        let errors = validator.validate();

        if (!Utility.objectIsEmpty(errors) && this.validationErrorCallback) {
            return this.validationErrorCallback(errors);
        }

        fetch(Course.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseObj),
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }
}
