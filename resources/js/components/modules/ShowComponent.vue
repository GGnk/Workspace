<template>
    <div v-if="thread">
        <div class="title"><b>{{ thread.subject }}</b><i class="fa fa-search"></i></div>
        <div class="chat-list" id="chat-list" :onload="Scroll">
            <ul style="width: 100%;">

                <li v-for="message in thread.messages" :class="message.user_id == user.id ? 'me':''">
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
            thread(after, before) {
                this.Scroll()
            }
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
