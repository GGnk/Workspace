<template>
    <v-row
        class="layout wrap"
        dense
    >
        <v-col class="mb-2 px-2" >
            <v-card dark>
                <v-tabs
                    v-model="tab"
                    background-color="transparent"
                >
                    <v-tab
                        v-for="(item, i) in items"
                        :key="i"
                    >
                        {{ item }}
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item >
                        <v-list v-if="this['config/auth']" two-line subheader>
                            <v-container>
                                <v-flex xs12>
                                    <v-text-field clearable v-model="newTodo" id="newTodo" name="newTodo" :label="sortedArray.length > 0 ?'Еще пару задач?':'Начни что то делать...'" @keyup.enter="">
                                    </v-text-field>
                                </v-flex>
                            </v-container>
                            <v-subheader class="subheading">Задачи:
                                <div class="mx-2">
                                    <v-select
                                        :items="tasksUsers"
                                        label="Пользователя"
                                        width="120"
                                        v-model="task_array"
                                        item-text="name"
                                        item-value="id"
                                        hide-selected
                                        color="success"
                                        height="48"
                                    ></v-select>
                                </div>
                            </v-subheader>
                            <div style="overflow: auto; height: 25vw">
                                <div v-for="(todo, i) in sortedArray" >
                                    <v-list-item
                                        style="line-height: 1; min-height: 45px; height: 45px"
                                    >
                                        <v-list-item-action>
                                            <v-checkbox v-model="todo.completed"></v-checkbox>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <v-list-item-title :class="{
                                        done: todo.completed
                                        }" class="" >{{todo.title}}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>Создана: {{todo.created_at}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-btn icon ripple color="red"  v-if="todo.completed" @click="removeTodo(i)">
                                            <v-icon class="white--text opacity-1"
                                                    color="red"
                                            >close</v-icon>
                                        </v-btn>
                                    </v-list-item>
                                </div>
                            </div>

                        </v-list>
                        <v-card v-else>
                            <v-card-title>
                                Авторизуйтесь для просмотра задач
                            </v-card-title>
                            <v-card-actions>
                                <v-btn block outlined href="/login">Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-list
                            two-line
                            nav
                            dense
                        >
                            <v-text-field
                                outlined
                                flat
                                hide-details
                                label="Поиск информации"
                                placeholder="Введи запрос. Не менее 3 символов!"
                                prepend-inner-icon="search"
                                v-model="input_info"
                                @keydown.enter="SEARCH_INFO"
                                @keydown.esc="$store.commit('INPUT_SET', '')"
                            ></v-text-field>
                            <v-btn
                            class="ma-2"
                            outlined
                            rounded
                            small
                            @click="addFormUser = !addFormUser"
                            >
                                <v-icon left>mdi-plus</v-icon>
                                Добавить
                            </v-btn>
                            <v-badge
                                v-if="addFormUser && valid"
                                overlap
                                class="align-self-center"
                            >
                                <template v-slot:badge >
                                    <v-tooltip right class="success">
                                        <template v-slot:activator="{ on }">
                                            <v-icon v-on="on" class="white--text" >keyboard</v-icon>
                                        </template>
                                        <span>Ctrl + Enter</span>
                                    </v-tooltip>
                                </template>
                                <v-btn
                                    class="ma-2"
                                    outlined
                                    rounded
                                    small
                                    @click="$store.dispatch('ADD_CONTACT')"
                                >
                                    Save
                                </v-btn>
                            </v-badge>

                            <v-list-item-group color="primary">

                                <v-row>
                                    <v-flex v-if="get_error_search" class="px-2">
                                        <v-skeleton-loader
                                            v-if="loading_search"
                                            height="94"
                                            type="list-item-two-line"
                                        >
                                        </v-skeleton-loader>
                                        <v-card
                                            outlined
                                            disabled
                                            style="text-align: center"
                                        >
                                            <v-card-title
                                                style="text-align: center"

                                                v-html="get_error_search"
                                            >
                                            </v-card-title>

                                        </v-card>
                                    </v-flex>
                                    <v-expand-transition>
                                        <v-col cols="12" v-if="addFormUser" @keyup.ctrl.enter="$store.dispatch('ADD_CONTACT')">
                                            <v-alert
                                                prominent
                                                colored-border
                                                dismissible
                                                v-model="alert_add"
                                                border="left"
                                                elevation="2"
                                                :type="get_message.type"
                                                icon="mdi-account"
                                            >
                                                {{get_message.text}}

                                            </v-alert>
                                            <v-form v-model="valid">
                                                    <v-container>
                                                        <v-row>
                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_name"
                                                                    :rules="nameRules"
                                                                    :counter="50"
                                                                    label="ФИО (Название)"
                                                                    required
                                                                ></v-text-field>
                                                            </v-col>

                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_profession"
                                                                    :rules="nameRules"
                                                                    :counter="50"
                                                                    label="Должность"
                                                                    required
                                                                ></v-text-field>
                                                            </v-col>

                                                            <v-col
                                                                cols="12"
                                                                md="4"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_email"
                                                                    :rules="emailRules"
                                                                    label="E-mail"
                                                                ></v-text-field>
                                                            </v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="4"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_phone"
                                                                    :rules="phoneRules"
                                                                    label="Телефон"
                                                                    aria-required="true"
                                                                ></v-text-field>
                                                            </v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="4"
                                                            >
                                                                <v-select
                                                                    :items="sort_items"
                                                                    item-text="name"
                                                                    item-value="data"
                                                                    v-model="input_sort"
                                                                    filled
                                                                    label="Относится к "
                                                                    dense
                                                                ></v-select>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-form>
                                        </v-col>
                                    </v-expand-transition>
                                    <v-col
                                            class="mb-2 px-2" v-if="get_results_search.people.length > 0">
                                        <p class="title" style="text-align: center; margin: 0">Люди</p>
                                        <hr style="margin: 0">
                                        <v-row>
                                            <v-col :lg="(get_results_search.build.length || get_results_search.business.length) > 0? 12:4"
                                                   :sm="(get_results_search.build.length || get_results_search.business.length) > 0? 12:6"
                                                   xl="12"
                                                   v-for="(item, i) in get_results_search.people"
                                                   v-if="item.sort == 1"
                                                   :key="i">
                                                <v-list-item>
                                                    <v-list-item-avatar>
                                                        <i class="material-icons">
                                                            emoji_people
                                                        </i>
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title v-html="item.name"></v-list-item-title>
                                                        <v-list-item-subtitle v-html="item.phone"></v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col class="mb-2 px-2" v-if="get_results_search.build.length > 0">
                                        <p class="title" style="text-align: center; margin: 0">Службы</p>
                                        <hr style="margin: 0">
                                        <v-list-item
                                            v-for="(item, i) in get_results_search.build"
                                            v-if="item.sort == 2"
                                            :key="i"
                                        >
                                            <v-list-item-avatar>
                                                <i class="material-icons">
                                                    build
                                                </i>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="item.name"></v-list-item-title>
                                                <v-list-item-subtitle v-html="item.phone"></v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                    <v-col class="mb-2 px-2" v-if="get_results_search.business.length > 0">
                                        <p class="title" style="text-align: center; margin: 0">Внешнии компании</p>
                                        <hr style="margin: 0">
                                        <v-list-item
                                            v-for="(item, i) in get_results_search.business"
                                            v-if="item.sort == 3"
                                            :key="i"
                                        >
                                            <v-list-item-avatar>
                                                <i class="material-icons">
                                                    business
                                                </i>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="item.name"></v-list-item-title>
                                                <v-list-item-subtitle v-html="item.phone"></v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </v-list-item-group>
                        </v-list>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>

        <v-flex lg3 sm3 xs12
                class="mb-2 px-2 news">
            <mac-header title="Новости Саратова"></mac-header>
            <v-expansion-panels
                multiple
                focusable
            >
                <v-expansion-panel
                    v-for="(item, i) in XMLyandex"
                    :key="i"
                >
                    <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div v-html="item.descr"></div>
                        <div style=" text-align: center">
                            <a :href="item.url" target="_blank">
                                <v-btn
                                    text
                                >Подробнее ...</v-btn>
                            </a>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-flex>
    </v-row>
</template>

<script>
    import widget from '../modules/Widget'
    import {mapGetters, mapActions} from 'vuex'
    import getters from "../templates/vue-material-admin-master/src/store/getters";
    import store from "../templates/vue-material-admin-master/src/store";

    export default {
        name: "Dashboard",
        components: {
          widget,
            'mini-tasks': () => import('./etc/miniTasks'),
            'mac-header':  () => import ('./etc/mac-header')
        },
        data: () => ({

            newTodo: '',
            todo: [],

            XMLyandex: window.m_index,

            tab: 1,
            items: [
                'Задачи', 'Контакты'
            ],
            sort_items: [
                {name: 'Пользователь', data: 1},
                {name: 'Служба', data: 2},
                {name: 'Внешняя компания', data: 3},
            ],

            addFormUser: false,
            valid: false,
            name: '',
            profession: '',
            phone:'',
            phoneRules: [
                v => !!v || 'Телефон обязателен!',

            ],
            sort: '',
            nameRules: [
                v => !!v || 'Потом не вспомнишь!',
                v => v.length <= 50 || 'Name must be less than 30 characters',
            ],
            email: '',
            emailRules: [
                /* v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid', */
            ],


        }),
        computed: {
            ...mapGetters(["config/auth",'sortedArray','options', 'tasksUsers', 'intTask',
                'get_info', 'get_input_search', 'get_results_search', 'get_error_search', 'loading_search', 'get_message', 'get_alert',
                'inputContactName','inputContactProfession','inputContactSort','inputContactEmail','inputContactPhone'
            ]),
            task_array: {
                get () {
                    return this.intTask
                },
                set (value) {
                    this.$store.commit('TASK_LIST', value)
                }
            },
            alert_add: {
                get () {
                    return this.get_alert
                },
                set (value) {
                    this.$store.commit('ALERT_SET', value)
                }
            },
            input_info: {
                get() {
                    return this.get_input_search
                },
                set(value) {
                    this.$store.commit('INPUT_SET', value)
                }
            },
            input_name: {
                get() {
                    return this.inputContactName
                },
                set(value) {
                    this.$store.commit('UPDATE_INPUT_CONTACT', {key: 'name', data: value})
                }
            },
            input_profession: {
                get() {
                    return this.inputContactProfession
                },
                set(value) {
                    this.$store.commit('UPDATE_INPUT_CONTACT', {key: 'profession', data: value})
                }
            },
            input_sort: {
                get() {
                    return this.inputContactSort
                },
                set(value) {
                    this.$store.commit('UPDATE_INPUT_CONTACT', {key: 'sort', data: value})
                }
            },
            input_email: {
                get() {
                    return this.inputContactEmail
                },
                set(value) {
                    this.$store.commit('UPDATE_INPUT_CONTACT', {key: 'email', data: value})
                }
            },
            input_phone: {
                get() {
                    return this.inputContactPhone
                },
                set(value) {
                    this.$store.commit('UPDATE_INPUT_CONTACT', {key: 'phone', data: value})
                }
            }
        },
        created() {
            this.$store.dispatch('FETCH_DATA')
        },
        mounted() {
        },
        watch: {
            input_info(newInput, oldInput) {
                this.SEARCH_INFO()
            }
        },
        methods: {
            ...mapActions(['SEARCH_INFO'])
        }
    }
</script>

<style scoped>

    /* Helper classes */
    .basil {
        box-shadow: inset 2px -3px 20px 0px rgba(25, 118, 210, 0.26), 2px -1px 5px 0px rgba(25, 118, 210, 0.24);
    }

    .v-list-item__subtitle, .v-list-item__title {
        white-space: inherit !important;
    }
</style>

