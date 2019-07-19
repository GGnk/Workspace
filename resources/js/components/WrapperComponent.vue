<template>
    <div>
        <div class="window-title">
            <div class="dots">
                <i class="fa fa-circle"></i>
                <i class="fa fa-circle"></i>
                <i class="fa fa-circle"></i>
            </div>
            <div class="title">
                <ul class="nav navbar-nav">
                    <li><a href="/">Главная <span class="label label-danger" v-if="threads.newThreadsCount"> {{threads.newThreadsCount}}</span></a></li>
                    <li>
                        <a href="#" role="button" data-toggle="modal" data-target="#createChat">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            <span>Создать чат!</span>
                        </a>
                        <!-- Modal -->

                    </li>
                </ul>
            </div>
        </div>
        <div class="window-area row">
            <div class="conversation-list col-12 col-sm-3" style="padding: 0">
                <ul style="margin-bottom: 46px;">
                    <li style="" v-for="thread in threads.chat"  :key="thread.id">
                        <a href="#" @click.prevent="SendChat(thread.id)">
                            <threads :thread="thread"></threads>
                        </a>
                    </li>
                </ul>
                <div class="my-account">
                    <div class="image">
                        <img :src="user.img">
                        <i class="fa fa-circle online"></i>
                    </div>
                    <div class="name">
                        <div class="dropdown">
                            <a href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>{{user.name}}</span>
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
            <div class="chat-area col-12 col-sm-6">
                <show :thread="chat" :user="user"></show>
                <div class="input-area">
                    <div class="input-wrapper col-9">
                        <input name="message" type="text" placeholder="текст...">
                        <i class="fa fa-smile-o"></i>
                        <i class="fa fa-paperclip"></i>
                    </div>
                    <button type="submit" class="btn btn-primary send-btn col-3" style="height: 32px;font-size: 12px;padding: 2px;" >Отправить</button>
                </div>
            </div>
            <div class="right-tabs col-12 col-sm-3 col" id="accordion">
                <ul class="tabs">
                    <li>
                        <a data-toggle="collapse" href="#Collapse1" role="button" aria-expanded="true" aria-controls="Collapse1"><i class="fa fa-users"></i></a>
                    </li>
                    <li class="active"><a data-toggle="collapse" href="#Collapse2" role="button" aria-expanded="false" aria-controls="Collapse2"><i class="fa fa-paperclip"></i></a></li>
                    <li><a data-toggle="collapse" href="#Collapse3" role="button" aria-expanded="false" aria-controls="Collapse3"><i class="fa fa-link"></i></a></li>
                </ul>
                <div class="col collapse show" id="Collapse1" data-parent="#accordion">
                    <ul class="tabs-container">
                        <li class="active">
                            <ul class="member-list">
                                <li v-for="user in users" class="btn-outline-light" style="cursor: pointer">
                                    <span class="status idle">
                                        <i class="fa fa-circle-o"></i>
                                    </span>
                                    <span :id="'dropdownMenuButton'+user.id" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span style="color: black;">{{user.name}}</span>
                                    </span>
                                    <span class="time">10:45 pm</span>
                                    <div class="dropdown-menu" :aria-labelledby="'dropdownMenuButton'+user.id">
                                        <a class="dropdown-item" href="#"  style="color: black">Написать</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div class="col collapse"  id="Collapse2" data-parent="#accordion">
                    Two
                </div>
                <div class="col collapse"  id="Collapse3" data-parent="#accordion">
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
        props: [
            'user',
            'users',
            'threads'
        ],
        mounted() {

        },
        data() {
            return {
                chat: false,
            }
        },
        watch: {
            // method(after, before) {
            //
            // }
        },
        methods: {
            SendChat(chatID) {
                axios.post('/dialog/show', {chatID: chatID})
                    .then((e) => {
                        this.chat = e.data.chat
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>
