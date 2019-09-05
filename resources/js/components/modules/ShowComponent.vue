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

                    <div class="card bg-sohbet border-0 m-0 p-0" style="height: calc(100vh - 225px);">
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

                                <textarea  v-model="chat.message" id="text" class="mw-100 border rounded form-control" type="text" name="text" title="пиши" placeholder="Вводите сообщение..." required></textarea>

                            </div>
                            <div class="col-3 m-0 p-1">

                                <button class="btn btn-outline-secondary rounded border w-100" title="Отправить" style="padding-right: 16px; height: 100%;" @click="SEND_MESSAGE">
                                    <i class="fa fa-paper-plane" aria-hidden="true" style="color: wheat;font-size: large;"></i>
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

    export default {
        name: "ShowComponent",
        props: [],
        computed: {
            ...mapGetters(['send_chat', 'get_chat', 'groupUsers', 'auth_u']),
            
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


        },
        methods: {
            ...mapActions(["SEND_MESSAGE"]),

        }
    }

</script>

<style scoped>
    .form-control {
        background-color: #2e2d30;
    }


    .card::-webkit-scrollbar {
        width: 1px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 9px;
        background: rgba(96, 125, 139,0.99);
    }

    .balon1, .balon2 {

        margin-top: 5px !important;
        margin-bottom: 5px !important;

    }


    .balon1 a {

        background: #42a5f5;
        color: #fff !important;
        border-radius: 20px 20px 3px 20px;
        display: block;
        max-width: 75%;
        padding: 7px 13px 7px 13px;

    }

    .balon1:before {

        content: attr(data-is);
        position: absolute;
        right: 15px;
        bottom: -0.8em;
        display: block;
        font-size: .750rem;
        color: rgb(195, 195, 195);

    }

    .balon2 a {

        background: #f1f1f1;
        color: #000 !important;
        border-radius: 20px 20px 20px 3px;
        display: block;
        max-width: 75%;
        padding: 7px 13px 7px 13px;

    }

    .balon2:before {

        content: attr(data-is);
        position: absolute;
        left: 13px;
        bottom: -0.8em;
        display: block;
        font-size: .750rem;
        color: rgb(195, 195, 195);

    }

    .bg-sohbet:before {

        content: "";
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=');
        opacity: 1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height:100%;
        position: absolute;

    }
</style>
