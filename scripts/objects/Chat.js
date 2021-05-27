import ApiObject from './ApiObject.js';

export default class Chat extends ApiObject {
    static endpoint = 'http://localhost';

    constructor(responseCallback, validationCallback) {
        super();
        super.setResponseCallback(responseCallback);
        super.setValidationErrorCallback(validationCallback);
    }

    getUserChats(userId) {
        const endpoint = `${Chat.endpoint}/api/users/${userId}/chats`;

        fetch(endpoint).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }
}
