import Utility from '../Utility.js';
import ApiObject from './ApiObject.js';

export default class Video extends ApiObject {
    static base = 'http://localhost';

    constructor(responseCallback, validationCallback) {
        super();
        super.setResponseCallback(responseCallback);
        super.setValidationErrorCallback(validationCallback);
    }

    set(video, lessonId) {
        let endpoint = `${Video.base}/api/lessons/${lessonId}/video`;

        const maxImageSize = 300 * 1024 * 1024; // 300.0 MB
        if (video.size >= maxImageSize && this.validationErrorCallback) {
            return this.validationErrorCallback({
                resource: 'El video no puede pesar más de 300.0 MB',
            });
        }

        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': video.type,
            },
            body: video,
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }
}
