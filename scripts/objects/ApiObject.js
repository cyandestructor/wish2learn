export default class ApiObject {
    validationErrorCallback;
    responseCallback;

    setResponseCallback(callback) {
        this.responseCallback = callback;
    }

    setValidationErrorCallback(callback) {
        this.validationErrorCallback = callback;
    }
}
