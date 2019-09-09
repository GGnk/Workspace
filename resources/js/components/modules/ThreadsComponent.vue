<template>
    <div class="conversation-list col-12">
        <div class="col-12 col-sm-5">
            <div class="menu-chats">
                <a href="#" role="button" data-toggle="modal" data-target="#createChat">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    <span>Создать чат!</span>
                </a>
                <input type="search" class="form-control" placeholder="Поиск чата...">
                <!-- Modal -->
                <div class="modal" id="createChat" tabindex="-1" role="dialog" aria-labelledby="createChatTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content" style="color: black;">
                            <div class="modal-header">
                                <h5 class="modal-title" id="createChatTitle">Создать чат</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style="padding: 15px 0">
                                <div class="col-md-12" >
                                    <!-- Subject Form Input -->
                                    <div class="form-group row">
                                        <div class="col-sm-9 col-12" v-show="chat.recipients.length > 1">
                                            <input type="text" class="form-control" name="subject" placeholder="Тема"
                                                   v-model="chat.subject">
                                        </div>
                                        <!-- Submit Form Input -->
                                        <div class="form-group col-sm-3 col-12" style="margin: auto">
                                            <button type="submit" class="btn btn-primary"  @click="CREATE_CHAT" data-dismiss="modal" aria-label="Close">Написать</button>
                                        </div>
                                        <div class="col-12" >
                                            <ul style="height: auto;">
                                                <label class="list-users" v-for="user in get_user_list">
                                                    <li>
                                                        <img :src="user.img"/>
                                                        <span v-text="user.name"></span>
                                                        <input v-model="chat.recipients" :value="user.id" type="checkbox">
                                                    </li>
                                                </label>

                                            </ul>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ul>
                <li v-for="(thread, index) in info_chats.chats" :style="thread.id === get_chat.id? 'border-left: 3px solid rgb(22, 75, 82);background-color: rgb(33, 33, 33)':''">
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
        <component :is="show_or_notshow" class="col-12 col-sm-7"></component>
    </div>

</template>


<script>
    import show from '../modules/ShowComponent'
    import notshow from '../modules/NotShowComponent'

    import {mapActions} from 'vuex'
    import {mapMutations} from 'vuex'
    import {mapGetters} from 'vuex'

    export default {
        name: "ThreadsComponent",
        props: [],
        components: {
            show,
            notshow
        },
        computed: {
            ...mapGetters(['info_chats', 'send_chat', 'get_chat', 'auth_u', 'get_user_list', 'show_or_notshow']),

            chat: {
                get () {
                    return this.send_chat
                },
                set (value) {
                    this.$store.commit('UPDATE_CHAT', value)
                }
            }

        },
        mounted(){
            this.$store.dispatch("ALL_CHATS")

            window.Echo.channel('Chat_created')
                .listen(".server", e => {
                    this.$store.commit('LISTEN_CHAT_CREATE', e)
                })
            window.Echo.channel('Chat_removed')
                .listen(".server", e => {
                    this.$store.commit('CHAT_REMOVE', e)
                })
        },
        methods: {
            ...mapActions(["OPEN_CHAT", "CREATE_CHAT"])
        }
    }
</script>

<style scoped>

</style>
