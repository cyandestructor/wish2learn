import ApiObject from './ApiObject.js';

export default class Resource extends ApiObject {
    static base = 'http://localhost';

    constructor(responseCallback, validationCallback) {
        super();
        super.setResponseCallback(responseCallback);
        super.setValidationErrorCallback(validationCallback);
    }

    create(resource, lessonId) {
        let endpoint = `${Resource.base}/api/lessons/${lessonId}/resources`;

        const maxImageSize = 50 * 1024 * 1024; // 50.0 MB
        if (resource.size >= maxImageSize && this.validationErrorCallback) {
            return this.validationErrorCallback({
                resource: 'El recurso no puede pesar más de 50.0 MB',
            });
        }

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': resource.type,
            },
            body: resource,
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }
}
