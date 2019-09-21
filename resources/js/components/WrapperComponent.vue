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
                    <li><a href="#" >Главная <span class="label label-danger" v-if="info_chats.newThreadsCount"> {{info_chats.newThreadsCount}}</span></a></li>
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
                        :key="tab.name"
                        :class="{ active: currentTabComponent === tab.name }"
                        @click="CURRENT_TAB(tab.name)">
                        <i :class="tab.icon"></i> {{tab.title}}
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

    import file_manager from '../components/modules/FileManagerComponent'
    import sidebar from '../components/modules/SideBarComponent'
    import mapRGD from '../components/modules/MapComponent'
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        // mixins: [mixin],
        components: {
            chats,
            file_manager,
            sidebar,
            mapRGD
        },
        name: "Wrapper",
        props: [],
        computed: {
            ...mapGetters(['info_chats', 'send_chat',
             'auth_u', 'loader_request', 'loader_error',
              'list_tabs', 'currentTabComponent', 'user_write']),


        },
        mounted() {

        },

        watch: {
            // method(after, before) {
            //
            // }
        },
        methods: {

            ...mapMutations(["DIR_OR_CHAT", "CURRENT_TAB", "USER_WRITE", "SET_TIMER"]),

        }
    }
</script>

<style scoped>

</style>
