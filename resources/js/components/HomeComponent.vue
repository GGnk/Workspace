<template>
    <v-app id="keep" >
        <v-app-bar
            app
            clipped-left
            color="secondary"
        >
            <v-app-bar-nav-icon
                @click="$store.commit('config/HOME_CONFIG', 'drawer')"
            ></v-app-bar-nav-icon>
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
                                <v-badge
                                    overlap
                                    class="align-self-center"
                                >
                                </v-badge>
                            </v-list-item-title>
                        </v-list-item-content>

                        <full-screen-setting v-if="item.replace" :item="item"></full-screen-setting>
                    </v-list-item>

                </template>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-container
                fluid
            >
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-btn
            v-if="$store.getters['config/root']"
            color="primary"
            fab
            bottom
            right
            fixed
            dark
            @click.stop="$store.commit('config/HOME_CONFIG', 'dialog')"
        >
            <v-icon large>info</v-icon>
        </v-btn>

        <v-dialog
            v-if="$store.getters['config/root']"
            :value="$store.getters['config/home'].dialog"
            @input="$store.commit('config/HOME_CONFIG', 'dialog')"
            max-width="500"
        >
            <v-card dark>
                <v-card-title class="headline">Терминал</v-card-title>
                <v-card-text class="pt-2 black">
                    <p v-for="item in $store.getters['config/console']" v-if="item.module">{{item.module}} ({{item.message}})</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-if="!$store.getters['config/user']"
            :value="$store.getters['config/home'].pincode"
            @input="$store.commit('config/HOME_CONFIG', 'pincode')"
            max-width="500"
        >
            <pin-code-component></pin-code-component>
        </v-dialog>
    </v-app>
</template>

<script>
    import PinCodeComponent from "./modules/PinCode/PinCodeComponent";

    export default {
        name: "Home",
        props: {
            source: String,
        },
        components: {
            'pin-code-component': () => import ('./modules/PinCode/PinCodeComponent'),
            'full-screen-setting': () => import ('./modules/Dashboard/blocks/fullScreenSetting')
        },
        computed: {

        },
        data: () => ({

        }),
        created() {
            this.$store.dispatch('config/INITIAL_BOOT')
        },
        mounted() {
            this.$store.dispatch('config/INSPECTOR')
        },
        methods:{}



    }
</script>

<style>
    #keep .v-navigation-drawer__border {
        display: none
    }
</style>
