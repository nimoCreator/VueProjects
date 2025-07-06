<template>
    <div class="chat">
        <div class="messagesContainer" ref="messagesContainer">
            <div class="messages">
                <div class="message" :class="{ 'usersMessage': selectedUser == message.sender }"
                    v-for="(message, index) in messages" :key="index">
                    <div class="icon">
                        <img :src="users[message.sender].avatar" :alt="`User ${message.sender} Avatar`">
                    </div>
                    <div class="about">
                        <div class="name">
                            {{ users[message.sender].name }}
                        </div>
                        <div class="time">
                            {{ formatTime(message.timestamp) }}
                        </div>
                    </div>
                    <div class="content">
                        {{ message.text }}
                    </div>
                </div>
            </div>
        </div>


        <div class="input">
            <div class=inputWrapper>
                <textarea 
                    ref="inputMessageTextArea"
                    v-model="newMessage"
                    @keyup.enter.exact.prevent="sendMessage" 
                    placeholder="Type your message..."
                    @input="updateInputTextareaHeight"
                    ></textarea>
                    <div class=buttons>
                        <button @click="sendMessage" class="send"><sendIcon/></button>
                        <button @click="attachToMessage" class="attachment"><PaperClipIcon/></button>
                    </div>
            </div>
        </div>


        <div class="users">
            Send as:
            <select v-model="selectedUser">
                <option v-for="(user, key) in users" :key="key" :value="key">
                    {{ user.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>

import PaperClipIcon from '@/assets/img/svg/paperClipIcon.vue';
import sendIcon from '@/assets/img/svg/sendIcon.vue';

export default {
    name: 'Chat',
    components: {
        PaperClipIcon,
        sendIcon
    },
    data() {
        return {
            messages: [],
            newMessage: '',
            users: {
                'raccoon': { name: 'Raccoon', avatar: 'https://picsum.photos/200' },
                'fox': { name: 'Fox', avatar: 'https://picsum.photos/201' },
                'vulpera': { name: 'Vulpera', avatar: 'https://picsum.photos/202' }
            },
            selectedUser: 'raccoon',
        }
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() === '') return;

            this.messages.push({
                sender: this.selectedUser,
                text: this.newMessage,
                timestamp: new Date()
            });

            this.newMessage = '';
            this.$nextTick(() => {
                this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;

                this.updateInputTextareaHeight();
            });
        },
        formatTime(timestamp) {
            const date = new Date();
            if (date - timestamp < 1000 * 60) {
                return 'Just now';
            } else if (date - timestamp < 1000 * 60 * 60) {
                return Math.floor((date - timestamp) / (1000 * 60)) + ' minutes ago';
            } else if (date - timestamp < 1000 * 60 * 60 * 24) {
                return Math.floor((date - timestamp) / (1000 * 60 * 60)) + ' hours ago';
            } else {
                return date.toLocaleDateString();
            }
        },
        updateInputTextareaHeight() {
            this.$refs.inputMessageTextArea.style.height = 'auto';
            this.$refs.inputMessageTextArea.style.height = this.$refs.inputMessageTextArea.scrollHeight + 'px';
        }
    },
    mounted() {
        const theMessage = `Moim zdaniem to nie ma tak, że dobrze albo że nie dobrze. Gdybym miał powiedzieć, co cenię w życiu najbardziej, powiedziałbym, że ludzi. Ekhm... Ludzi, którzy podali mi pomocną dłoń, kiedy sobie nie radziłem, kiedy byłem sam. I co ciekawe, to właśnie przypadkowe spotkania wpływają na nasze życie. Chodzi o to, że kiedy wyznaje się pewne wartości, nawet pozornie uniwersalne, bywa, że nie znajduje się zrozumienia, które by tak rzec, które pomaga się nam rozwijać. Ja miałem szczęście, by tak rzec, ponieważ je znalazłem. I dziękuję życiu. Dziękuję mu, życie to śpiew, życie to taniec, życie to miłość. Wielu ludzi pyta mnie o to samo, ale jak ty to robisz?, skąd czerpiesz tę radość? A ja odpowiadam, że to proste, to umiłowanie życia, to właśnie ono sprawia, że dzisiaj na przykład buduję maszyny, a jutro... kto wie, dlaczego by nie, oddam się pracy społecznej i będę ot, choćby sadzić... znaczy... marchew.`;

        for (let i = 0; i < Math.random() * 10; i++) {
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    this.messages.push({
                        sender: 'raccoon',
                        text: theMessage.substring(0, Math.floor(Math.random() * theMessage.length)),
                        timestamp: new Date() - Math.floor(Math.random() * 1000 * 60 * 60 * 24)
                    });
                    break;
                case 1:
                    this.messages.push({
                        sender: 'fox',
                        text: theMessage.substring(0, Math.floor(Math.random() * theMessage.length)),
                        timestamp: new Date() - Math.floor(Math.random() * 1000 * 60 * 60 * 24)
                    });
                    break;
                case 2:
                    this.messages.push({
                        sender: 'vulpera',
                        text: theMessage.substring(0, Math.floor(Math.random() * theMessage.length)),
                        timestamp: new Date() - Math.floor(Math.random() * 1000 * 60 * 60 * 24)
                    });
                    break;
            }
        }
    }
}
</script>

<style scoped>


.chat {
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;
    max-height: 100vh;
    width: 100%;

    justify-content: stretch;
}

/* #region CHAT MESSAGES */

.messagesContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    overflow-y: auto;

    padding: 1rem;
    gap: 1rem;

    width: 100%;

    scroll-behavior: smooth;
}

.messages {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: fit-content;

    padding: 1rem;
    gap: 1rem;
}

.message {
    display: grid;
    grid-template-areas: 'i a' 'i c';
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    gap: 0.25rem 0.5rem;
    width: fit-content;
    max-width: 30rem;
    
    align-self: start;

    margin-inline: 0 5rem;

    animation: messageAppear 0.5s forwards ease-out;
}
.message.usersMessage {
    grid-template-areas: 'a i' 'c i';
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    margin-inline: 5rem 0;
    align-self: end;
}
@keyframes messageAppear {
    0% {
        opacity: 0;
        transform: translateY(1rem);
        filter: blur(0.5rem);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
}

.message .icon {
    grid-area: i;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.message .icon img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
}

.message .about {
    grid-area: a;
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    justify-content: flex-start;
    align-items: center;
    padding-inline: 0.5rem;

    font-size: 0.75rem;
    color: #888;

    width: fit-content;
}
.message .about .name {
    font-size: 1rem;
    color: #fff;
}
.message .about .time {
    font-size: 0.75rem;
    color: #888;
}
.message.usersMessage .about {
    justify-content: flex-end;
    justify-self: end;
}

.message .content {
    grid-area: c;

    padding: 0.5rem 0.75rem;
    background-color: #333;

    width: auto;
    min-width: 100%;
    max-width: min(90%, 50rem);

    word-break: break-all;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    word-wrap: break-word;

    border-radius: 0.125rem 1rem  1rem 1rem;

    justify-self: start;
}
.message.usersMessage .content {
    border-radius: 1rem 0.125rem 1rem 1rem;
    justify-self: end;
    background-color: #00aaff;
}

/* #endregion CHAT MESSAGES */






/* #region INPUT */

.input {
    display: flex;
    gap: 1rem;
    padding: 0.25rem;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

}

.input::after {
    content: '';
    background-image: linear-gradient(to top, #101214, #10121400);
    width: 100%;
    height: 2rem;
    position: absolute;
    bottom: 100%;
}
.input .inputWrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;

    width: clamp(10rem, 100%, 25rem);
    
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #333;

    
    height: min-content;
}
.input textarea {
    width: clamp(10rem, 100%, 25rem);
    resize: none;
    background: none;
    
    min-height: 2.5rem;
    max-height: 20rem;
    padding: 0;

    color: #fff;
    border: none;
}


.input .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    flex-wrap: wrap;

    gap: 0.5rem;
}
.input button {
    display: flex;
    justify-content: center;
    align-items: center;


    background-color: #333;
    border-radius: 0.5rem;

    color: #fff;
    border: none;
    cursor: pointer;

    padding: 0.5rem;
}

.input button.send svg {
    width: 1.25rem;
    height: 1.25rem;
}
.input button.attachment svg {
    width: 1.25rem;
    height: 1.25rem;
}

.input button.send {
    border-radius: 0.5rem;
    color: #fff;
    border: none;
    cursor: pointer;

    
    background-color: #00aaff;

    transition: background-color 0.25s;
}

.input button:hover {
    background-color: #424242;
    transform: scale(1.05);

    transition: background-color 0.1s;
}

.input button:active {
    background-color: #1f1f1f;
    transform: scale(0.95);

    transition: background-color 0.01s;
}
.input button.send:hover {
    background-color: #0056b3;
}

.input button.send:active {
    background-color: #004085;
}


/* #endregion INPUT */


.users {
    display: flex;
    flex-direction: column;

    position: absolute;
    right: 1rem;
    bottom: 1rem;
}

</style>