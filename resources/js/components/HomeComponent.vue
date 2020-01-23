<template>
    <v-app v-resize="ui" id="keep" class="overflow-hidden">
        <v-app-bar
            app
            clipped-left
            color="secondary"
            v-if="!ui_mobile"
        >
            <v-app-bar-nav-icon
                color="white"
                @click="$store.commit('config/HOME_CONFIG', 'drawer')"
            />
            <span class="title white--text ml-3 mr-5">IT&nbsp;<span class="font-weight-light">помощник</span></span>

            <div class="flex-grow-1"></div>
        </v-app-bar>

        <v-navigation-drawer
            :value="$store.getters['config/home'].drawer"
            app
            clipped
            :color="this.$vuetify.theme.dark ? '': 'grey lighten-4'"
        >
            <v-list
                dense
                :class="this.$vuetify.theme.dark ? '': 'grey lighten-4'"
            >
                <template
                    v-for="(item, i) in $store.getters['config/left_menu']"
                    v-if="item.access"
                >

                    <v-list-item
                        link
                        :key="i"
                        :href="item.url"
                        @click="(item.route && $router.push(item.route).catch( err => {})) || (item.action = !item.action) "
                    >
                        <v-list-item-action v-if="!item.replace">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content v-if="!item.replace">
                            <v-list-item-title class="grey--text">
                                {{ item.text }}

                            </v-list-item-title>
                        </v-list-item-content>

                        <full-screen-setting v-if="item.replace" :item="item"/>
                    </v-list-item>

                </template>
            </v-list>
        </v-navigation-drawer>

        <v-content :class="ui_mobile? 'pa-0':''">
            <v-container
                class="pa-0 pa-sm-3"
                fluid
            >
                <router-view/>
            </v-container>
        </v-content>
        <v-btn
            v-if="root"
            color="primary"
            fab
            bottom
            right
            fixed
            dark
            class="d-none d-sm-block .d-xl-flex"
            @click.stop="$store.commit('config/HOME_CONFIG', 'dialog')"
        >
            <v-icon large>info</v-icon>
        </v-btn>

        <v-dialog
            v-if="root"
            :value="home.dialog"
            @input="$store.commit('config/HOME_CONFIG', 'dialog')"
            max-width="500"
        >
            <v-card dark>
                <v-card-title class="headline">Терминал</v-card-title>
                <v-card-text class="pt-2 black">
                    <p v-for="item in console" v-if="item.module">{{item.module}} ({{item.message}})</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-if="!auth"
            v-model="pincode"
            max-width="500"
        >
            <pin-code-component/>
        </v-dialog>
    </v-app>
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: "Home",
        props: {
            source: String,
        },
        components: {
            'pin-code-component': () => import ('./modules/PinCode/PinCodeComponent'),
            'full-screen-setting': () => import ('./views/blocks/fullScreenSetting')
        },
        computed: {
            ...mapGetters('config', ['auth', 'user','home','root','console','ui_mobile']),
            pincode: {
                get() {
                    return this.home.pincode
                },
                set() {
                    this.$store.commit('config/HOME_CONFIG', 'pincode')
                }
            },
        },
        data: () => ({

        }),
        created() {
            this.$store.dispatch('config/INITIAL_BOOT')
        },
        mounted() {
            this.$store.dispatch('config/INSPECTOR')

        },

        methods:{
            ui() {
                this.$store.commit('config/UI_')
            },
        }



    }
</script>

<style scoped>
    #keep .v-navigation-drawer__border {
        display: none
    }
</style>
