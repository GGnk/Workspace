<template>
    <v-app id="keep">
        <v-app-bar
            app
            clipped-left
            color="primary white"
            style="box-shadow: inset 2px -3px 12px 0px rgb(119, 119, 119), 2px -1px 5px 0px rgb(46, 46, 46), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);"
        >
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <span class="title white--text ml-3 mr-5">IT&nbsp;<span class="font-weight-light">помощник</span></span>
            <v-text-field
                solo-inverted
                flat
                hide-details
                label="Поиск инфы"
                prepend-inner-icon="search"
            ></v-text-field>
            <div class="flex-grow-1"></div>
        </v-app-bar>

        <v-navigation-drawer
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
                            <v-list-item-title class="grey--text">
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
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
                { icon: 'lightbulb_outline', text: 'Notes' },
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


    }
</script>

<style>
    #keep .v-navigation-drawer__border {
        display: none
    }
</style>
