import ApiObject from './ApiObject.js';

export default class Message extends ApiObject {
    static base = 'http://localhost';

    constructor(responseCallback, validationCallback) {
        super();
        super.setResponseCallback(responseCallback);
        super.setValidationErrorCallback(validationCallback);
    }

    create(messageObj, chatId) {
        const endpoint = `${Message.base}/api/chats/${chatId}/messages`;

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageObj),
        }).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }

    getChatMessages(chatId) {
        const endpoint = `${Message.base}/api/chats/${chatId}/messages`;

        fetch(endpoint).then((response) => {
            if (this.responseCallback) {
                return this.responseCallback(response);
            }
        });
    }
}
