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

    </div>
</template>

<script>
    export default {
        name: "ShowComponent",
        props: [
            'thread',
            'user'
        ],
        computed: {

        },
        watch: {

        },
        mounted() {


        },
        methods: {

        }
    }

</script>

<style scoped>

</style>
