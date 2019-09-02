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
            <aside class="main-sidebar col-12 col-sm-2">
                <section class="sidebar" style="height: auto;">
                    <ul class="sidebar-menu" style="text-align: center; color: white;">
                        <li>

                            <div class="team-thumb " v-if="auth_u.img">
                                <img :src="auth_u.img" :alt="auth_u.name" width="60%">
                            </div>
                            <span id="idname" class="team-name badge btn-warning" data-toggle="modal" data-target="#ModalCenterProfile1" data-backdrop="static" data-keyboard="false">{{auth_u.name}}</span>

                            <span class="title">
                                <div class="team-social-bar">
                                    <a class="social-btn sb-style-1 sb-twitter" href="#">
                                        <i class="fa fa-twitter"></i>
                                    </a>
                                    <a class="social-btn sb-style-1 sb-github" href="#">
                                        <i class="fa fa-github"></i>
                                    </a>
                                    <a class="social-btn sb-style-1 sb-stackoverflow" href="#">
                                        <i class="fa fa-linkedin"></i>
                                    </a>
                                    <a class="social-btn sb-style-1 sb-skype" href="#">
                                        <i class="fa fa-skype"></i>
                                    </a>
                                </div>
                            </span>
                            
                        </li>
                    </ul>
                    <ul class="sidebar-menu">
                        <li class="active">
                            <a href="http://192.168.2.59/admin/home">
                                <i class="fa fa-wrench"></i>
                                <span class="title">Панель управления</span>
                            </a>
                        </li>
                                    <li class="treeview">
                            <a href="#">
                                <i class="fa fa-sitemap"></i>
                                <span>Доп функционал</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                                    <li>
                                   <a href="http://192.168.2.59/admin/tasks">
                                   <i class="fa fa-tasks"></i>
                                   <span class="title">Задачи</span>
                                   </a>
                                </li>
                                                                        <li>
                                    <a href="http://192.168.2.59/admin/faqs">
                                        <i class="fa fa-question"></i>
                                        <span class="title">Список вопросов</span>
                                    </a>
                                </li>
                                                                        <li>
                                    <a href="http://192.168.2.59/admin/files">
                                        <i class="fa fa-tasks"></i>
                                        <span class="title">Файлообменник</span>
                                    </a>
                                </li>
                                                    <li>
                                    <a href="http://192.168.2.59/admin/edo">
                                        <i class="fa fa-cloud"></i>
                                        <span>Список ЭДО</span>
                                    </a>
                                    <ul>
                                                                    <li style="padding: 0 0 10px 0">
                                            <a href="http://192.168.2.59/admin/cat_edo">
                                                <i class="fa fa-list-ol"></i>
                                                <span class="title">Категории ЭДО</span>
                                            </a>
                                        </li>
                                                                </ul>
                                </li>
                                
                            </ul>
                        </li>            

                                    <li class="treeview">
                            <a href="#">
                                <i class="fa fa-sitemap"></i>
                                <span>Структура</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                                    <li>
                                    <a href="http://192.168.2.59/admin/macs">
                                        <i class="fa fa-tv"></i>
                                        <span>Список Mac</span>
                                    </a>
                                </li>                    
                                                    <li>
                                    <a href="http://192.168.2.59/admin/deps">
                                        <i class="fa fa-home"></i>
                                        <span>Список корпусов</span>
                                    </a>
                                </li>                    
                                                    <li>
                                    <a href="http://192.168.2.59/admin/offices">
                                        <i class="fa fa-coffee"></i>
                                        <span>Список офисов</span>
                                    </a>
                                </li>                    
                            </ul>
                        </li>            
                                    <li class="treeview">
                            <a href="#">
                                <i class="fa fa-users"></i>
                                <span>Управление сотрудниками</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                                    <li>
                                    <a href="http://192.168.2.59/admin/users">
                                        <i class="fa fa-user"></i>
                                        <span>Сотрудники</span>
                                    </a>
                                </li>                    
                                                    <li>
                                    <a href="http://192.168.2.59/admin/roles">
                                        <i class="fa fa-briefcase"></i>
                                        <span>Привилегия</span>
                                    </a>
                                </li>                    
                            </ul>
                        </li>
                        <li class="">
                            <a href="http://192.168.2.59/change_password">
                                <i class="fa fa-key"></i>
                                <span class="title">Сменить пароль</span>
                            </a>
                        </li>

                        <li>
                            <a href="#logout" onclick="$('#logout').submit();">
                                <i class="fa fa-arrow-left"></i>
                                <span class="title">Выйти</span>
                            </a>
                        </li>
                    </ul>
                </section>
            </aside>

            <div class="right-tabs col-12 col-sm-10 col" id="accordion">
                <ul class="tabs">
                    <li>
                        <a data-toggle="collapse" href="#Collapse1" role="button" aria-expanded="true" aria-controls="Collapse1"><i class="fa fa-users"></i></a>
                    </li>
                    <li><a data-toggle="collapse" href="#Collapse3" role="button"  aria-controls="Collapse3" @click="DIR_OR_CHAT"><i class="fa fa-paperclip"></i></a></li>
                </ul>

                <div class="collapse show" id="Collapse1" data-parent="#accordion">
                    <div class="conversation-list col-12" style="padding: 0">
                        <ul style="margin-bottom: 46px;height: 80vh;overflow-y: auto;border: 1px solid;" >
                            <li style="position: relative;" v-for="(thread, index) in info_chats.chats" :style="thread.id === get_chat.id? 'background-color: #335d85;':''">
                                <a data-toggle="collapse" href="#Collapse2" role="button" aria-expanded="false" aria-controls="Collapse2" @click.prevent="OPEN_CHAT(thread.id)">

                                    <chats :thread="thread" :user="auth_u"></chats>

                                </a>
                                <span class="deleteChat" @click="DELETE_CHAT(thread.id)"></span>
                            </li>
                            <div v-if="!info_chats.chats || info_chats.chats.length === 0" style="padding: 20px;text-align: center;">
                                Начни, создай чат с кем нибудь!
                            </div>
                        </ul>

                    
                    </div>
                </div>
                <div class="collapse"  id="Collapse2" data-parent="#accordion">

                    <show v-if="get_chat.id" :thread="get_chat" :user="auth_u"></show>


                </div>
                <div class="collapse"  id="Collapse3" data-parent="#accordion">
                    <div class="chat-area">
                        <file_manager ></file_manager>
                    </div>
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
    import {mapMutations} from 'vuex'

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

            ...mapActions(["OPEN_CHAT", "SEND_MESSAGE", "CREATE_CHAT", "DELETE_CHAT", "DIR_OR_CHAT"]),
            ...mapMutations(["DIR_OR_CHAT"]),

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
