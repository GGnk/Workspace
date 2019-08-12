<template>
    <div>
        <div class="title"><b>{{ thread.subject }}</b><i class="fa fa-search"></i></div>
        <div class="chat-list" id="chat-list" >
            <ul style="width: 100%;">

                <li v-for="message in thread.messages" v-if="message.body" :class="message.user_id == user.id ? 'me':''">
                    <div class="name">
                        <img :src="message.user.img">

                    </div>
                    <div class="message">
                        <span class="badge">{{ message.user_id == user.id ? 'You': message.user.name }}</span>
                        <p>{{ message.body }}</p>
                        <span class="msg-time">{{ message.created }}</span>
                    </div>
                </li>

            </ul>
        </div>
        <div class="input-area">
            <div class="input-wrapper col-9">
                <textarea  v-model="chat.message" placeholder="текст..."></textarea>
                <i class="fa fa-smile-o"></i>
                <i class="fa fa-paperclip"></i>
            </div>
            <button type="submit" class="btn btn-primary send-btn col-3" style="height: 32px;font-size: 12px;padding: 2px;" @click="SEND_MESSAGE">Отправить</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShowComponent",
        props: [
            'thread',
            'user'
        ],
        watch: {

        },
        mounted() {
            this.Scroll()

        },
        methods: {
            Scroll() {
                let block = document.getElementById("chat-list");
                block.scrollTop = block.scrollHeight;
            },
        }
    }

</script>

<style scoped>

</style>
