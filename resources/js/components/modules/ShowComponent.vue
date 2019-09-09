<template>
        <div class="row m-0 p-0 position-relative">
            <div class="col-12 p-0 m-0 " style="right: 0px;">
                <div class="card border-0 rounded" style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10), 0 6px 10px 0 rgba(0, 0, 0, 0.01); overflow: hidden; height: 100%;">

                    <div class="card-header p-1 border border-top-0 border-left-0 border-right-0" >

                        <img class="rounded float-left" style="width: 50px; height: 50px;" v-show="get_chat.countPeople.length<3" :src="get_chat.creator.img"/>

                        <h6 class="float-left" style="margin: 0px 0px 0px 10px;">  {{get_chat.countPeople.length<3 ? get_chat.creator.name : get_chat.subject}}
                            <br/>
                            <small> Должность </small>
                        </h6>

                        <div class="dropdown show">

                            <a id="dropdownMenuLink" data-toggle="dropdown" class="btn btn-sm float-right text-secondary" role="button"><h5><i class="fa fa-ellipsis-h" title="Ayarlar!" aria-hidden="true"></i>&nbsp;</h5></a>

                            <div class="dropdown-menu dropdown-menu-right border p-0" aria-labelledby="dropdownMenuLink">

                                <a class="dropdown-item p-2 text-secondary" href="#"> <i class="fa fa-auth_u m-1" aria-hidden="true"></i> Profile </a>
                                <hr class="my-1"></hr>
                                <a class="dropdown-item p-2 text-secondary" href="#"> <i class="fa fa-trash m-1" aria-hidden="true"></i> Delete </a>

                            </div>
                        </div>

                    </div>

                    <div class="card bg-sohbet border-0 m-0 p-0" style="height: calc(100vh - 15em);">
                        <div id="sohbet" class="card border-0 m-0 p-0 position-relative bg-transparent" style="overflow-y: auto; height: 100vh;">

                            <div v-for="message in get_chat.messages" v-if="message.body" :class="message.user_id === auth_u.id ? 'balon1':'balon2'"
                                 class="p-2 m-0 position-relative" :data-is="message.created ">

                                <a :class="message.user_id === auth_u.id ? 'float-right':'float-left'"> {{ message.body }} </a>

                            </div>


                        </div>
                    </div>

                    <div class="w-100 card-footer p-0 border border-bottom-0 border-left-0 border-right-0">

                        <div class="row m-0 p-0">
                            <div class="col-9 m-0 p-1">

                                <textarea  v-model="chat.message" id="text" class="mw-100 border rounded form-control" type="text" name="text" title="пиши" placeholder="Вводите сообщение..." @keydown="writing" required></textarea>

                            </div>
                            <div class="col-3 m-0 p-1">

                                <button class="btn btn-outline-secondary rounded border w-100" title="Отправить" style="padding-right: 16px; height: 100%;" @click="SEND_MESSAGE">
                                    <i class="fa fa-paper-plane" aria-hidden="true" style="color: wheat;font-size: large;"></i>
                                </button>

                            </div>
                        </div>

                        <span  v-if="user_write.write" style="position: relative; left: 15px">{{user_write.write.name}} пишет сообщение ...</span>

                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        name: "ShowComponent",
        props: [],
        computed: {
            ...mapGetters(['send_chat', 'get_chat', 'groupUsers', 'auth_u', 'user_write']),
            
            chat: {
                get () {
                    return this.send_chat
                },
                set (value) {
                    this.$store.commit('UPDATE_CHAT', value)
                }
            }
        },
        watch: {

        },
        mounted() {
            window.Echo.join(`chat.${this.send_chat.id}`)
                .listen(".server", e => {
                    this.$store.commit('LISTEN_CHAT_UPDATE', e)

                    this.$store.commit("USER_WRITE", false)
                })

                .listenForWhisper('typing', (e) => {
                    this.$store.commit("USER_WRITE", e)
                    console.log('Кто то что то пишет == '+e)
                    if(this.user_write.time) clearTimeout(this.user_write.time)

                    this.$store.commit("SET_TIMER", setTimeout(() => {
                        this.$store.commit("USER_WRITE", false)
                    }, 2000))
                })

        },
        methods: {
            // TODO: Надо сделать приват каналы
            writing() {
                window.Echo.join(`chat.${this.send_chat.id}`)
                    .whisper('typing', {
                    name: this.auth_u.name,

                })
                console.log('Я пишуюююю')
            },

            ...mapActions(["SEND_MESSAGE"]),
            

        }
    }

</script>

<style scoped>

</style>
