<template>
    <v-row
        class="layout wrap"
    >
        <v-flex class="mb-2 px-2"  lg8 sm8 xs12 >
            <v-card color="basil">
                <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    color="basil"
                    grow
                >
                    <v-tab
                        v-for="item in items"
                        :key="item"
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
                                        }" class="title">{{todo.title}}
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
                            three-line
                            flat
                            nav
                        >
                            <v-text-field
                                outlined
                                flat
                                hide-details
                                label="Поиск человека"
                                prepend-inner-icon="search"
                            ></v-text-field>
                            <v-list-item-group color="primary">

                                <v-row>
                                    <v-flex lg4 sm6 xs12
                                            class="mb-2 px-2">
                                        <v-list-item
                                        v-for="(item, i) in itemsC"
                                        :key="i"
                                    >
                                        <v-list-item-avatar v-if="item.avatar">
                                            <v-img :src="item.avatar"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title v-html="item.title"></v-list-item-title>
                                            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    </v-flex>
                                    <v-flex lg4 sm6 xs12
                                            class="mb-2 px-2">
                                        <v-list-item
                                            v-for="(item, i) in itemsC"
                                            :key="i"
                                        >
                                            <v-list-item-avatar v-if="item.avatar">
                                                <v-img :src="item.avatar"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="item.title"></v-list-item-title>
                                                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-flex>
                                    <v-flex lg4 sm6 xs12
                                            class="mb-2 px-2">
                                        <v-list-item
                                            v-for="(item, i) in itemsC"
                                            :key="i"
                                        >
                                            <v-list-item-avatar v-if="item.avatar">
                                                <v-img :src="item.avatar"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="item.title"></v-list-item-title>
                                                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
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

        <v-flex lg4 sm4 xs12
                class="mb-2 px-2 news">
            <mac-header title="Новости Саратова"></mac-header>
            <v-carousel
                            cycle
                            hide-delimiter-background
                            show-arrows-on-hover
                        >
                        <v-carousel-item
                            v-for="(item, i) in XMLyandex"
                            :key="i"

                        >

                            <v-sheet
                                height="100%"
                                tile
                                :color="colorNews[Math.round(i + 1) ]"
                                style="padding-top: 10%;"
                            >
                                <v-row
                                    align="center"
                                    justify="center"
                                >

                                    <div class="display-1" style="
                                    height: 210px;
                                    overflow: hidden;
                                    padding:10px; width: 75%; text-align: center; background: #080808ad">{{item.title}}</div>
                                    <div style="margin-top:10px;
                                    padding:10px;
                                    border-radius: 10px;
                                    width: 75%;
                                    height: 145px;
                                    overflow: hidden;
                                    text-align: center;
                                    background: rgba(0, 0, 0, 0.44);
                                    box-shadow: inset 0 -8px 3px 0px #ffffffa6;" v-html="item.descr"></div>
                                    <a :href="item.url" target="_blank">
                                        <v-btn
                                            text
                                        >Подробнее ...</v-btn>
                                    </a>
                                </v-row>
                            </v-sheet>
                        </v-carousel-item>
            </v-carousel>
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
            todos: [],
            day: '25',
            date: 'Wednesday ',
            ord: 'dddd',
            year: '2019',

            XMLyandex: window.m_index,
            colorNews: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4'
            ],
            tab: null,
            items: [
                'Задачи', 'Контакты'
            ],
            itemsC: [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend? hj hj h hjhjhj ',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
                },
            ],
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
        },
        methods: {

        },
        filters: {
            /*capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }*/
        }
    }
</script>

<style scoped>

    /* Helper classes */
    .basil {
        box-shadow: inset 2px -3px 20px 0px rgba(25, 118, 210, 0.26), 2px -1px 5px 0px rgba(25, 118, 210, 0.24);
    }
</style>

