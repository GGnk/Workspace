<template>
    <div>
        <div class="window-title">
            <div class="dots">
                <a href="/">
                    <img src="/favicon-32x32.png"/>
                </a>
            </div>
            <div class="title">
                <ul class="nav navbar-nav">
                    <li><a href="#" @click="fetchAllChats">Главная <span class="label label-danger" v-if="threads.newThreadsCount"> {{threads.newThreadsCount}}</span></a></li>
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
                                                <div class="col-sm-9 col-12" v-show="send.recipients.length > 1">
                                                    <input type="text" class="form-control" name="subject" placeholder="Тема"
                                                           v-model="send.subject">
                                                </div>
                                                <!-- Submit Form Input -->
                                                <div class="form-group col-sm-3 col-12" style="margin: auto">
                                                    <button type="submit" class="btn btn-primary form-control"  @click="CreateChat" data-dismiss="modal" aria-label="Close">Написать</button>
                                                </div>
                                                <div class="col-12" >
                                                    <ul>
                                                        <label class="list-users" v-for="user in users_list">
                                                            <li>
                                                                <img :src="user.img"/>
                                                                <span v-text="user.name"></span>
                                                                <input v-model="send.recipients" :id="user.id" :value="user.id" type="checkbox">
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
                    <li style="position: relative;" v-for="(thread, index) in threads.chats"  >
                        <a href="#" @click.prevent="LookChat(thread.id)">
                            <threads :thread="thread" :user="auth_user"></threads>
                        </a>
                        <span class="deleteChat" @click="DeleteChat(thread.id, auth_user.id, index)"></span>
                    </li>
                    <div v-if="!threads.chats || threads.chats.length == 0" style="padding: 20px;text-align: center;">
                        Начни, создай чат с кем нибудь!
                    </div>
                </ul>

                <div class="my-account" v-if="auth_user">
                    <div class="image">
                        <img :src="auth_user.img">
                        <i class="fa fa-circle online"></i>
                    </div>
                    <div class="name">
                        <div class="dropdown">
                            <a href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>{{auth_user.name}}</span>
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
                <div v-if="chat.id">
                    <show :thread="chat" :user="auth_user"></show>

                    <div class="input-area">
                        <div class="input-wrapper col-9">
                            <textarea  v-model="send.message" placeholder="текст..."></textarea>
                            <i class="fa fa-smile-o"></i>
                            <i class="fa fa-paperclip"></i>
                        </div>
                        <button type="submit" class="btn btn-primary send-btn col-3" style="height: 32px;font-size: 12px;padding: 2px;" @click="SendChat">Отправить</button>
                    </div>
                </div>
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
                        <li class="active">
                            <ul class="member-list">
                                <li v-for="user in users" class="btn-outline-light">
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


    export default {
        // mixins: [mixin],
        components: {},
        name: "Wrapper",
        props: [],

        mounted() {
            this.fetchAllChats();

            /*window.Echo.channel("chatCreated").listen(".chat-created", e => {
                this.threads.chats.unshift(e.data.chat)
                console.log("Чат с id:" + e.data.chat.id + " была создан")
            });*/
            window.Echo.channel("laravel_database_chatUpdated")
                .listen(".Chat", e => {
                    console.log("Чат 1")
                    let index = this.threads.chats.findIndex(el => el.id === e.chat.chat.id);
                    this.threads.chats.splice(index, 1,e.chat.chat)
                    if(this.chat.id === e.chat.chat.id) {
                        this.chat = e.chat.chat
                    }
                })
            
            /*window.Echo.channel("chatRemoved").listen(".chat-removed", e => {
                // TODO: сделать обновление одного элемента в списке
                let index = this.threads.chats.findIndex(el => el.id === e.data.chat.id);
                this.threads.chats.splice(index, 1)
                console.log("Чат с id:" + e.data.chat.id + " был удален!")
            });*/

        },
        data() {
            return {
                threads: {
                    chats: [],
                    newThreadsCount:''
                },
                users:{},
                auth_user:{},
                users_list:{},
                chat: {},
                send: {
                    id: '',
                    message: '',
                    subject: 'Сообщение',
                    recipients: []
                }
            }
        },
        watch: {
            // method(after, before) {
            //
            // }
        },
        methods: {
            fetchAllChats() {
                axios.post('/dialog/all')
                    .then((e) => {
                        this.threads = e.data.threads
                        this.threads.chats = e.data.threads.chats? e.data.threads.chats: []
                        this.users = e.data.users
                        this.auth_user = e.data.auth_user
                        this.users_list = e.data.users_list
                        this.chat = {}

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            LookChat(chatID) {

                    axios.post('/dialog/show', {id: chatID})
                        .then((e) => {
                            this.chat = e.data.chat
                            this.send.id = e.data.chat.id
                            this.users = e.data.users
                        })
                        .catch((err) => {
                            console.log(err)
                        })

            },
            SendChat() {
                if (this.send.message) {
                    axios.post('/dialog/update', this.send)
                        .then((e) => {
                            // this.chat = e.data.chat
                            // let index = this.threads.chats.findIndex(el => el.id === e.data.chat.id);
                            // this.threads.chats.splice(index, 1,e.data.chat)
                            this.send.message = ''
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            },
            CreateChat() {
                if (this.send.subject && this.send.recipients) {
                    axios.post('/dialog/store', this.send)
                        .then((e) => {
                            this.chat = e.data.chat
                            // this.threads.chats.unshift(e.data.chat)
                            this.send.id = e.data.chat.id
                            this.send.recipients = []

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            },
            minCreateChat(idUser) {
                this.send.recipients = idUser
                this.send.subject = 'Сообщение'
                this.send.message = ''
                this.CreateChat()
            },
            DeleteChat(idChat, idUser, index) {
                axios.post('/dialog/delete', {idChat, idUser})
                    .then((e) => {
                        this.threads.chats.splice(index, 1)
                        console.log(e.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
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
        opacity: 0.3;
        width: 100%;
    }
</style>
