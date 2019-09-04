<template>
    <div class="conversation-list col-12">
        <ul>
            <li v-for="(thread, index) in info_chats.chats" :style="thread.id === get_chat.id? 'background-color: #335d85;':''">
                <a role="button" @click.prevent="OPEN_CHAT(thread.id)">

                    <span class="title">
                        <i class="fa" :class="thread.countPeople.length>2?'fa-users':'fa-comments-o'" aria-hidden="true"></i>
                        {{thread.countPeople.length>2? thread.subject : (thread.creator.id == auth_u.id && thread.countPeople.length == 1?'Избранное':thread.interlocutor) }}
                    </span>
                    <span class="content">
                        <h4 class="badge" v-if="thread.latestMessage">{{thread.latestMessage.user_id == auth_u.id? 'Вы:': auth_u.name}}</h4> {{thread.latestMessage?thread.latestMessage.body: 'Чат пуст...'}}
                    </span>
                    <span class="label label-danger" style="float: right;" v-if="thread.UnreadMessagesCount">{{thread.UnreadMessagesCount}}</span>

                </a>
                <span class="deleteChat" @click="DELETE_CHAT(thread.id)"></span>
            </li>
            <div v-if="!info_chats.chats || info_chats.chats.length === 0" style="padding: 20px;text-align: center;">
                Начни, создай чат с кем нибудь!
            </div>
        </ul>


    </div>

</template>


<script>
    import {mapActions} from 'vuex'
    import {mapMutations} from 'vuex'
    import {mapGetters} from 'vuex'

    export default {
        name: "ThreadsComponent",
        props: [],
        computed: {
            ...mapGetters(['info_chats', 'get_chat', 'auth_u']),

        },
        methods: {
            ...mapActions(["OPEN_CHAT"])
        }
    }
</script>

<style scoped>

</style>
