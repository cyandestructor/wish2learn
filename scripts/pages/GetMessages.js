import Utility from '../Utility.js';
import Message from '../objects/Message.js';
import { getCurrentUserId } from '../objects/Session.js';

const createSenderMessage = (message) => {
    const container = document.createElement('div');
    const messageHtml = `
    <div class="d-flex flex-row justify-content-start mb-4">
        <img
            src="/api/users/${message.senderId}/avatar"
            alt="avatar ${message.senderId}"
            style="width: 45px; height: 100%"
        />
        <div
            class="p-3 ms-3"
            style="
                border-radius: 15px;
                background-color: rgba(57, 192, 237, 0.2);
            "
        >
            <p class="mb-0">${message.body}</p>
            <small class="form-text text-muted">
                ${message.date}
            </small>
        </div>
    </div>`;
    container.innerHTML = messageHtml;
    return container;
};

const createReceiverMessage = (message) => {
    const container = document.createElement('div');
    const messageHtml = `
    <div class="d-flex flex-row justify-content-end mb-4">
        <div
            class="p-3 me-3 border"
            style="
                border-radius: 15px;
                background-color: #fbfbfb;
            "
        >
            <p class="mb-0">
                ${message.body}
            </p>
            <small class="form-text text-muted">
                ${message.date}
            </small>
        </div>
        <img
            src="/api/users/${message.senderId}/avatar"
            alt="avatar ${message.senderId}"
            style="width: 45px; height: 100%"
        />
    </div>`;
    container.innerHTML = messageHtml;
    return container;
};

const sendMessageEvent = (e) => {
    e.preventDefault();
    const form = e.target;

    const chatId = form.dataset.chatId;
    const senderId = form.dataset.senderId;

    if (!chatId || !senderId) {
        console.log('undefined chat or sender');
        return;
    }

    let data = Utility.formDataToObject(new FormData(form));

    if (data.body === '') {
        console.log('blank message');
        return;
    }

    data.senderId = senderId;

    const message = new Message((response) => {
        if (response.ok) {
            // Reload page
            location.reload();
            return;
        }
    });

    message.create(data, chatId);
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const chatId = params.get('chat');

    if (!chatId) {
        // Do something
        return;
    }

    const currentUserId = getCurrentUserId();

    const messageContainer = document.getElementById('messageContainer');
    const message = new Message((response) => {
        if (response.ok) {
            response.json().then((data) => {
                for (let i = 0; i < data.length; i++) {
                    let container;
                    if (data[i].senderId == currentUserId) {
                        container = createReceiverMessage(data[i]);
                    } else {
                        container = createSenderMessage(data[i]);
                    }
                    messageContainer.appendChild(container);
                }
            });
        }
    });

    message.getChatMessages(chatId);

    const sendMessageForm = document.getElementById('sendMessageForm');
    sendMessageForm.dataset.chatId = chatId;
    sendMessageForm.dataset.senderId = currentUserId;
    sendMessageForm.addEventListener('submit', sendMessageEvent);
});
