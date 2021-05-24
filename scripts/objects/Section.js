import Utility from '../Utility.js';
import ApiObject from './ApiObject.js';
import SectionValidator from '../validators/section/SectionValidator.js';

export default class Section extends ApiObject {
    static base = 'http://localhost';

    constructor(responseCallback, validationCallback) {
        super();
        super.setResponseCallback(responseCallback);
        super.setValidationErrorCallback(validationCallback);
    }

    create(sectionObj, courseId) {
        let endpoint = `${Section.base}/api/courses/${courseId}/sections`;

        let validator = new SectionValidator(sectionObj);
        let errors = validator.validate();

        if (!Utility.objectIsEmpty(errors) && this.validationErrorCallback) {
            return this.validationErrorCallback(errors);
        }

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sectionObj),
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }
}
