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
                    <li>
                        <button type="button" id="sidebarCollapse" class="btn btn-light">
                            <i class="fa fa-align-left"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="window-area row">
            <sidebar></sidebar>

            <div class="right-tabs col-12 ">
                <ul class="tabs">
                    <li v-for="tab in list_tabs"
                        :key="tab"
                        :class="[{ active: currentTabComponent === tab }]"
                        @click="CURRENT_TAB(tab)">
                        <i class="fa fa-users"></i> {{ tab }}
                    </li>
                </ul>

                <component :is="currentTabComponent"></component>

                <i class="fa fa-cog"></i>
            </div>
        </div>
        <div class="overlay"></div>
    </div>
</template>

<script>
    // import { mixin } from '../modal/alerts.js'

    import chats from '../components/modules/ThreadsComponent'
    import show from '../components/modules/ShowComponent'
    import file_manager from '../components/modules/FileManagerComponent'
    import sidebar from '../components/modules/SideBarComponent'

    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        // mixins: [mixin],
        components: {
            chats,
            show,
            file_manager,
            sidebar
        },
        name: "Wrapper",
        props: [],
        computed: {
            ...mapGetters(['info_chats', 'send_chat', 'auth_u', 'get_user_list', 'loader_request', 'loader_error', 'list_tabs', 'currentTabComponent']),

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
                    this.$store.commit('CHAT_REMOVE', e)
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

            ...mapActions(["CREATE_CHAT"]),
            ...mapMutations(["DIR_OR_CHAT", "CURRENT_TAB"]),

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

    #sidebar {
         position: fixed;
         top: 0;
         left: -99%;
         height: 100vh;
         z-index: 999;
         transition: all 0.3s;
        background-color: #2a7984;

     }
    .window-area .active{
        left: 0 !important;

    }
    #dismiss {
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background: #7386D5;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        -webkit-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
    }
    #dismiss:hover {
        background: #fff;
        color: #7386D5;
    }
    .overlay {
        display: none;
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 998;
        opacity: 0;
        transition: all 0.5s ease-in-out;
    }
    .wrapper .active {
        display: block;
        opacity: 1;
    }
    .main-sidebar {
        box-shadow: 9px 0px 18px 1px rgba(0, 0, 0, 0.5);
        font-family: sans-serif;
        font-size: 16px;
    }
    .badge {
        white-space: pre-line;
        word-break: break-word;
    }
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
