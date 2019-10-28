<template>
    <v-app id="keep">
        <v-app-bar
            app
            clipped-left
            color="secondary"
        >
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <span class="title white--text ml-3 mr-5">IT&nbsp;<span class="font-weight-light">помощник</span></span>

            <div class="flex-grow-1"></div>
        </v-app-bar>

        <!--<v-navigation-drawer
            v-model="drawer"
            app
            clipped
            color="grey lighten-4"
        >
            <v-list
                dense
                class="grey lighten-4"
            >
                <template v-for="(item, i) in items">

                    <v-list-item
                        :key="i"
                        @click=""
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey&#45;&#45;text">
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>-->

        <v-content>
            <v-container
                fluid
            >
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "Home",
        props: {
            source: String,
        },

        data: () => ({
            drawer: false,
            items: [
                { icon: 'lightbulb_outline', text: 'Заметки' },
                { icon: 'touch_app', text: 'Reminders' },
                { icon: 'add', text: 'Create new label' },
                { icon: 'archive', text: 'Archive' },
                { icon: 'delete', text: 'Trash' },
                { icon: 'settings', text: 'Settings' },
                { icon: 'chat_bubble', text: 'Trash' },
                { icon: 'help', text: 'Help' },
                { icon: 'phonelink', text: 'App downloads' },
                { icon: 'keyboard', text: 'Keyboard shortcuts' },
            ],

        }),
        created() {
            this.$store.dispatch('config/INITIAL_BOOT')
        },
        mounted() {
            this.$store.dispatch('config/INSPECTOR')
        }


    }
</script>

<style>
    #keep .v-navigation-drawer__border {
        display: none
    }
</style>
