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

    setImage(image, courseId) {
        const endpoint = `${Course.endpoint}/${courseId}/image`;

        const maxImageSize = 5 * 1024 * 1024; // 5.0 MB
        if (image.size >= maxImageSize && this.validationErrorCallback) {
            return this.validationErrorCallback({
                image: 'La imagen no puede ser mayor a 5.0 MB',
            });
        }

        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': image.type,
            },
            body: image,
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }

    getInformation(courseId) {
        const endpoint = `${Course.endpoint}/${courseId}`;

        fetch(endpoint).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }

    addCategory(categoryId, courseId) {
        let endpoint = `${Course.endpoint}/${courseId}/categories`;

        let data = { 'categoryId': categoryId };

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }
}
