import Chat from '../objects/Chat.js';
import { getCurrentUserId } from '../objects/Session.js';

let createChatRow = (chat) => {
    let row = document.createElement('tr');
    let rowHtml = `<!-- row -->
    <td>
        <span
            class="
                mb-0
                text-muted
            "
            >${chat.name}</span
        >
    </td>
    <!-- Message -->
    <td>
        <a
            class="link"
            href="/html/messages.html?chat=${chat.id}"
        >
            <span
                class="
                    text-dark
                "
                >Abrir
                la
                conversación</span
            >
        </a>
    </td>`;
    row.innerHTML = rowHtml;

    return row;
};

document.addEventListener('DOMContentLoaded', () => {
    let promise = getCurrentUserId();

    if (!promise) {
        console.log('No promise');
        return;
    }

    promise.then((data) => {
        const userId = data.id;

        const mailbox = document.getElementById('mailboxTable');

        const chat = new Chat((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        const row = createChatRow(data[i]);
                        mailbox.appendChild(row);
                    }
                });
            }
        });

        chat.getUserChats(userId);
    });
});
