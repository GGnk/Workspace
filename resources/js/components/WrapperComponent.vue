<template>
    <div>
        <div class="loader-request spinner-border text-primary" role="status" v-show="loader_request">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="loader-error" v-show="loader_error">
            <i class="fa fa-exclamation-triangle"></i>
        </div>
        <div class="window-title">
            <div class="dots">
                <a href="/">
                    <img src="/favicon-32x32.png"/>
                </a>
            </div>
            <div class="title">
                <ul class="nav navbar-nav">
                    <li><a href="#" @click="fetchAllChats">Главная <span class="label label-danger" v-if="info_chats.newThreadsCount"> {{info_chats.newThreadsCount}}</span></a></li>
                    <li>
                        <a href="#" role="button" data-toggle="modal" data-target="#createChat">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            <span>Создать чат!</span>
                        </a>

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
                                                    <button type="submit" class="btn btn-primary form-control"  @click="CREATE_CHAT" data-dismiss="modal" aria-label="Close">Написать</button>
                                                </div>
                                                <div class="col-12" >
                                                    <ul>
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

                    </li>
                </ul>
            </div>
        </div>
        <div class="window-area row">
            <div class="conversation-list col-12 col-sm-3" style="padding: 0">
                <ul style="margin-bottom: 46px;" >
                    <li style="position: relative;" v-for="(thread, index) in info_chats.chats" :style="thread.id === get_chat.id? 'background-color: #335d85;':''">
                        <a href="#" @click.prevent="OPEN_CHAT(thread.id)">

                            <chats :thread="thread" :user="auth_u"></chats>

                        </a>
                        <span class="deleteChat" @click="DELETE_CHAT(thread.id)"></span>
                    </li>
                    <div v-if="!info_chats.chats || info_chats.chats.length == 0" style="padding: 20px;text-align: center;">
                        Начни, создай чат с кем нибудь!
                    </div>
                </ul>

                <div class="my-account" v-if="auth_u">
                    <div class="image">
                        <img :src="auth_u.img">
                        <i class="fa fa-circle online"></i>
                    </div>
                    <div class="name">
                        <div class="dropdown">
                            <a href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>{{auth_u.name}}</span>
                                <i class="fa fa-angle-down"></i>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="/logout"  style="color: black">Выход</a>
                            </div>
                        </div>
                        <span class="availability">В сети</span>
                    </div>

                </div>
            </div>

            <div class="chat-area col-12 col-sm-6" >
                <div v-if="get_chat.id">

                    <show :thread="get_chat" :user="auth_u"></show>
                    <div class="input-area">
                        <div class="input-wrapper col-9">
                            <textarea  v-model="chat.message" placeholder="текст..."></textarea>
                            <i class="fa fa-smile-o"></i>
                            <i class="fa fa-paperclip"></i>
                        </div>
                        <button type="submit" class="btn btn-primary send-btn col-3" style="height: 32px;font-size: 12px;padding: 2px;" @click="SEND_MESSAGE">Отправить</button>
                    </div>
                </div>
                <file_manager v-show="!get_chat.id"></file_manager>
            </div>

            <div class="right-tabs col-12 col-sm-3 col" id="accordion">
                <ul class="tabs">
                    <li>
                        <a data-toggle="collapse" href="#Collapse1" role="button" aria-expanded="true" aria-controls="Collapse1"><i class="fa fa-users"></i></a>
                    </li>
                    <li><a data-toggle="collapse" href="#Collapse2" role="button" aria-expanded="false" aria-controls="Collapse2"><i class="fa fa-paperclip"></i></a></li>
                    <li><a data-toggle="collapse" href="#Collapse3" role="button" aria-expanded="false" aria-controls="Collapse3"><i class="fa fa-link"></i></a></li>
                </ul>

                <div class="collapse show" id="Collapse1" data-parent="#accordion">
                    <ul class="tabs-container">
                        <li class="active">chat
                            <ul class="member-list">
                                <li v-for="user in get_users" class="btn-outline-light">
                                    <span class="status idle">
                                        <i class="fa fa-circle-o"></i>
                                    </span>
                                    <span :id="'dropdownMenuButton'+user.id" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span>{{user.name}}</span>
                                    </span>
                                    <span class="time">10:45 pm</span>
                                    <div class="dropdown-menu" :aria-labelledby="'dropdownMenuButton'+user.id">
                                        <a class="dropdown-item" href="#"  style="color: black" @click="minCreateChat(user.id)">Написать</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div class="collapse"  id="Collapse2" data-parent="#accordion">
                    Two
                </div>
                <div class="collapse"  id="Collapse3" data-parent="#accordion">
                    Three
                </div>
                <i class="fa fa-cog"></i>
            </div>
        </div>
    </div>
</template>

<script>
    // import { mixin } from '../modal/alerts.js'

    import chats from '../components/modules/ThreadsComponent'
    import show from '../components/modules/ShowComponent'
    import file_manager from '../components/modules/FileManagerComponent'

    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

    export default {
        // mixins: [mixin],
        components: {
            chats,
            show,
            file_manager
        },
        name: "Wrapper",
        props: [],
        computed: {
            ...mapGetters(['info_chats', 'get_chat', 'send_chat', 'auth_u', 'get_users', 'get_user_list', 'loader_request', 'loader_error']),

            chat: {
                get () {
                    return this.send_chat
                },
                set (value) {
                    this.$store.commit('UPDATE_CHAT', value)
                }
            }
        },
        mounted() {
            this.fetchAllChats()

            window.Echo.channel('Chats')
                .listen(".server", e => {
                    this.$store.commit('LISTEN_CHAT_UPDATE', e)
                })
            window.Echo.channel('Chat_created')
                .listen(".server", e => {
                    this.$store.commit('LISTEN_CHAT_CREATE', e)
                })
            window.Echo.channel('Chat_removed')
                .listen(".server", e => {
                    this.$store.commit('CHAT_REMOVE', e.id)
                })



        },

        watch: {
            // method(after, before) {
            //
            // }
        },
        methods: {
            fetchAllChats() {

                this.$store.dispatch("ALL_CHATS")
            },

            ...mapActions(["OPEN_CHAT", "SEND_MESSAGE", "CREATE_CHAT", "DELETE_CHAT"]),


            minCreateChat(idUser) {
                this.send_chat.recipients = idUser
                this.send_chat.subject = 'Сообщение'
                this.send_chat.message = ''
                this.$store.dispatch("CREATE_CHAT")
            }
        }
    }
</script>

<style scoped>
    .list-users {
        display: contents;
        cursor: pointer;
    }
    .list-users li {
        height: 50px;
        text-align: left;
        position: relative;
        padding: 10px;
        border-bottom: 1px solid #d9d9da;
    }
    .list-users li:hover {
        background-color: #e7e8ec;
    }
    .list-users li img {
        width: 8%;
        float: left;
        border-radius: 18px;
    }
    .list-users li span {
        position: relative;
        top: 10px;
        margin-left: 6px;
        font-size: 14px;
        font-family: cursive;
    }
    .list-users li input {
        float: right;
    }
    .deleteChat {
        position: absolute;
        top: 0;
        right: 0;
        background: red;
        text-align: center;
        width: 25px;
        height: 99%;
        opacity: 0.1;
        cursor: pointer;
    }
    .deleteChat:hover {
        opacity: 0.5;
    }
    .loader-request {
        position: absolute;
        top: 1%;
        right: 1%;
    }
    .loader-error {
        position: absolute;
        top: 1%;
        right: 1%;
    }
    .loader-error i {
        color: orange;
        font-size: 33px;
    }
    
</style>
