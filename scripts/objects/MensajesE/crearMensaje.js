import { getCurrentUserId } from '../objects/Session.js';
document.addEventListener("DOMContentLoaded", () => { 
	const promise = getCurrentUserId();
var obtenerID = document.getElementById('quienEnvia');
    if (!promise) {
        console.log('No promise');
        return;
    }

    promise.then((data) => {
      /*  const currentUserId = data.id;
        quienEnvia.dataset.indexNumber = data.id;*/
    })
})

function create(messageObj, chatId) {
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