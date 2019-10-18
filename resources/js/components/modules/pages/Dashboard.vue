<template>
    <v-row
        class="layout wrap"
        dense
    >
        <v-flex class="mb-2 px-2"  lg9 sm3 xs12>
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
                        <v-list two-line subheader>
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
                                prepend-inner-icon="search"
                                v-model="input"
                                @keydown.enter="searchInfo"
                            ></v-text-field>
                            <v-list-item-group color="primary">

                                <v-row>
                                    <v-flex lg4 sm6 xs12
                                            class="mb-2 px-2">
                                        <p class="title" style="text-align: center; margin: 0">Люди</p>
                                        <hr style="margin: 0">
                                        <v-list-item
                                            v-for="(item, i) in results"
                                            v-if="item.sort == 1"
                                            :key="i"
                                        >
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
                                    </v-flex>
                                    <v-flex lg4 sm6 xs12
                                            class="mb-2 px-2">
                                        <p class="title" style="text-align: center; margin: 0">Службы</p>
                                        <hr style="margin: 0">
                                        <v-list-item
                                            v-for="(item, i) in results"
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
                                    </v-flex>
                                    <v-flex lg4 sm6 xs12
                                            class="mb-2 px-2">
                                        <p class="title" style="text-align: center; margin: 0">Внешнии компании</p>
                                        <hr style="margin: 0">
                                        <v-list-item
                                            v-for="(item, i) in results"
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
                                    </v-flex>
                                </v-row>
                            </v-list-item-group>
                        </v-list>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-flex>

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
    import widget from '../Widget'
    import {mapGetters} from 'vuex'

    export default {
        name: "Dashboard",
        components: {
          widget,
            'mac-header':  () => import ('../mac-header')
        },
        data: () => ({

            newTodo: '',
            todo: [],

            XMLyandex: window.m_index,

            tab: 1,
            items: [
                'Задачи', 'Контакты'
            ],

            results: '',
            input: '',
            error: null,
            loading: false,
        }),
        computed: {
            ...mapGetters(['sortedArray','options', 'tasksUsers', 'intTask']),
            task_array: {
                get () {
                    return this.intTask
                },
                set (value) {
                    this.$store.commit('TASK_LIST', value)
                }
            }
        },
        created() {
            this.$store.dispatch('FETCH_DATA')
        },
        mounted() {
            this.searchInfo();
        },
        watch: {
            input(after, before) {
                this.searchInfo();
            }
        },
        methods: {
            searchInfo() {
                if(this.input.length == 0) {
                    axios.get('/getInfo')
                        .then(response => {
                            this.results = response.data.users
                            console.log(this.results)
                        })
                        .catch(error => {
                            console.log('Что то пошло не так, статус ошибки: ' + error)
                        });
                }else if (this.input.length > 2) {
                    axios.get('/searchInfo', {params: {keywords: this.input.replace(/,/g, '*,')}})
                        .then(response => {
                            if (response.data.error) {
                                this.error = response.data.error
                                console.log(this.error)

                            } else if (response.data.message) {
                                this.error = response.data.message
                                console.log(this.error)

                            } else {
                                this.results = response.data.users
                                console.log(this.results)
                            }
                        })
                        .catch(error => {
                            console.log('Что то пошло не так, статус ошибки: ' + error)
                        });
                }
            },
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

