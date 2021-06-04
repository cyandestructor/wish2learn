import ApiObject from './ApiObject.js';

export default class Chat extends ApiObject {
    static endpoint = 'http://localhost';

    constructor(responseCallback, validationCallback) {
        super();
        super.setResponseCallback(responseCallback);
        super.setValidationErrorCallback(validationCallback);
    }

    create(userId, receptorId, name) {
        const endpoint = `${Chat.endpoint}/api/users/${userId}/chats`;
        let chatObj = { 'receptorId': receptorId, 'name': name };

        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(chatObj),
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
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
