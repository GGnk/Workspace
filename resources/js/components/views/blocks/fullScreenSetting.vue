<template>
    <v-dialog v-model="model"  fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <div
                    style="display: contents"
                    v-on="on"
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </div>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon @click="btn_menu">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Настройки</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list three-line subheader>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Общие настройки</v-list-item-title>
                            <v-list-item-subtitle>Изменения в системе сохраняются в базе данных, для каждого пользователя отдельно!</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list v-if="this.$store.getters['config/auth']" three-line subheader>
                    <v-subheader>Общие</v-subheader>
                    <v-list-item>
                        <v-list-item-action>
                            <v-switch v-model="theme" class="mx-4"></v-switch>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Темная тема</v-list-item-title>
                            <v-list-item-subtitle>Все возможные элементы на странице будут иметь фон - цвета 'dark', текст - 'white'.</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
</template>

<script>
    export default {
        name: "fullScreenSetting",
        props: [
            'item'
        ],
        computed: {
            model: {
                get() {
                    return this.$store.getters['config/full_screen_setting']
                },
                set() {
                    return this.$store.commit('config/TF_CONFIG', 'full_screen_setting')
                }
            },
            theme: {
                get() {
                    return this.$vuetify.theme.dark
                },
                set() {
                    return this.$vuetify.theme.dark = !this.$vuetify.theme.dark
                }
            },
        },
        data () {
            return {
                notifications: false,
                sound: true,
                widgets: false,
            }
        },
        methods:{
            btn_menu() {
                this.$store.commit('config/TF_CONFIG', 'full_screen_setting')
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
