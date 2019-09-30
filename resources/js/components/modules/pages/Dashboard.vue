<template>
    <v-row>
        <v-col sm="4">
            <widget icon="domain"
                    :title="sortedArray.length+(sortedArray.length >= 0?' задач!':(sortedArray.length == 1?' задача!':' задачи!'))"
                    :subTitle="day+' '+date+''+ord+' '+year"
                    supTitle="День чудес"
                    class="mb-5"
                    color="#502020"/>

            <v-card class="mb-2">
                <widget icon="domain"
                        :title="sortedArray.length+(sortedArray.length >= 0?' задач!':(sortedArray.length == 1?' задача!':' задачи!'))"
                        :subTitle="day+' '+date+''+ord+' '+year"
                        supTitle="День чудес"
                        color="#00b297"/>

                <v-list two-line subheader>
                    <v-container>
                        <v-flex xs12>
                            <v-text-field clearable v-model="newTodo" id="newTodo" name="newTodo" :label="sortedArray.length > 0 ?'Еще пару задач?':'Начни что то делать...'" @keyup.enter="addTodo">
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
                    <div v-for="(todo, i) in sortedArray" >
                        <v-list-item>
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
                </v-list>
            </v-card>
        </v-col>
        <v-col
            sm="4">
            <widget icon="domain"
                    :title="'Что то там'"
                    :subTitle="'Где то тут'"
                    supTitle="День чудес"
                    class="mb-5"
                    color="#00b827"/>

            <v-expansion-panels popout >
                <v-expansion-panel
                    v-for="(message, i) in messages"
                    :key="i"
                    hide-actions
                    style="max-width:inherit"
                >
                    <v-expansion-panel-header>
                        <v-row
                            align="center"
                            class="spacer"
                            no-gutters
                        >
                            <v-col
                                cols="2"
                                sm="3"
                                md="2"
                            >
                                <v-avatar
                                    size="36px"
                                >
                                    <img
                                        v-if="message.avatar"
                                        alt="Avatar"
                                        src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                    >
                                    <v-icon
                                        v-else
                                        :color="message.color"
                                        v-text="message.icon"
                                    ></v-icon>
                                </v-avatar>
                            </v-col>

                            <v-col
                                class="text-no-wrap"
                                cols="9"
                                sm="11"
                                md="9"
                            >
                                <v-chip
                                    :color="`${message.color} lighten-4`"
                                    class="ml-0"
                                    label
                                    small
                                >
                                    <strong v-html="message.title"></strong>
                                </v-chip>

                            </v-col>

                        </v-row>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                        <v-divider></v-divider>
                        <v-card-text v-text="lorem"></v-card-text>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
        <v-col
            sm="4">
            <v-card class="mb-2 timeline">
                <v-card-text class="py-0">
                    <v-timeline
                        align-top
                        dense>
                        <v-timeline-item
                            color="pink"
                            small>
                            <v-layout pt-3>
                                <v-flex xs3>
                                    <strong>5pm</strong>
                                </v-flex>
                                <v-flex>
                                    <strong>New Icon</strong>
                                    <div class="caption">Mobile App</div>
                                </v-flex>
                            </v-layout>
                        </v-timeline-item>

                        <v-timeline-item
                            color="teal lighten-3"
                            small>
                            <v-layout wrap pt-3>
                                <v-flex xs3>
                                    <strong>3-4pm</strong>
                                </v-flex>
                                <v-flex>
                                    <strong>Design Stand Up</strong>
                                    <div class="caption mb-2">Hangouts</div>
                                    <v-avatar>
                                        <v-img
                                            src="https://avataaars.io/"
                                        ></v-img>
                                    </v-avatar>
                                    <v-avatar>

                                        <v-img
                                            src="https://avataaars.io/"
                                        ></v-img>
                                    </v-avatar>
                                    <v-avatar>
                                        <v-img
                                            src="https://avataaars.io/"
                                        ></v-img>
                                    </v-avatar>
                                </v-flex>
                            </v-layout>
                        </v-timeline-item>

                        <v-timeline-item
                            color="pink"
                            small>
                            <v-layout pt-3>
                                <v-flex xs3>
                                    <strong>12pm</strong>
                                </v-flex>
                                <v-flex>
                                    <strong>Lunch break</strong>
                                </v-flex>
                            </v-layout>
                        </v-timeline-item>

                        <v-timeline-item
                            color="teal lighten-3"
                            small>
                            <v-layout pt-3>
                                <v-flex xs3>
                                    <strong>9-11am</strong>
                                </v-flex>
                                <v-flex>
                                    <strong>Finish Home Screen</strong>
                                    <div class="caption">Web App</div>
                                </v-flex>
                            </v-layout>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import widget from '../Widget'
    import {mapGetters} from 'vuex'
    export default {
        name: "Dashboard",
        components: {
          widget
        },
        data: () => ({
            avatarIcon: 'https://avataaars.io/',
            usersItem: ['dsd', 'dsds'],
            show: true,
            newTodo: '',
            todo: [],
            todos: [],
            day: '25',
            date: 'Wednesday ',
            ord: 'dddd',
            year: '2019',
            messages: [
                {
                    avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
                    name: 'John Leider',
                    title: 'Welcome to Vuetify.js!',
                    color: 'red',
                },
                {
                    color: 'red',
                    icon: 'people',
                    name: 'Social',
                    title: 'Twitter',
                },
                {
                    color: 'teal',
                    icon: 'local_offer',
                    name: 'Promos',
                    title: 'Shop your way',
                },
            ],
            lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
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
            onAddPerson() {

            },
            addTodo() {
                var value = this.newTodo && this.newTodo.trim();
                if (!value) {
                    return;
                }
                this.todos.push({
                    title: this.newTodo,
                    done: false
                });
                this.newTodo = '';
            },
            removeTodo(index) {

            },
            todoDay() {
                var d = new Date();
                var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                return days[d.getDay()];
            },
            nth(d) {
                if(d>3 && d<21) return 'th';
                switch (d % 10) {
                    case 1:  return "st";
                    case 2:  return "nd";
                    case 3:  return "rd";
                    default: return "th";
                }
            },
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        }
    }
</script>

<style scoped>

</style>
