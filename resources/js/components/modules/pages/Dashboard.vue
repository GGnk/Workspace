<template>
    <v-row>
        <v-col>
            <v-card class="mb-2" max-width="400">
                <widget icon="domain"
                        :title="todos.length+(todos.length == 0?' задач!':(todos.length == 1?' задача!':' задачи!'))"
                        :subTitle="day+' '+date+''+ord+' '+year"
                        supTitle="День чудес"
                        color="#00b297"/>

                <v-list two-line subheader>
                    <v-container>
                        <v-flex xs12>
                            <v-text-field clearable v-model="newTodo" id="newTodo" name="newTodo" label="Начни что то делать..." @keyup.enter="addTodo">
                            </v-text-field>
                        </v-flex>
                    </v-container>
                    <v-subheader class="subheading" v-if="todos.length === 0">У тебя 0 задач, добавь...</v-subheader>
                    <v-subheader class="subheading" v-else="todos.length == 1">Твои задачи: </v-subheader>
                    <div v-for="(todo, i) in todos">
                        <v-list-item>
                            <v-list-item-action>
                                <v-checkbox v-model="todo.done"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title :class="{
      done: todo.done
      }" class="title">{{todo.title | capitalize}}
                                </v-list-item-title>
                                <v-list-item-subtitle>Создана: {{date}}{{ord}} {{day}} {{year}}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn icon ripple color="red"  v-if="todo.done" @click="removeTodo(i)">
                                <v-icon class="white--text opacity-1">close</v-icon>
                            </v-btn>
                        </v-list-item>
                    </div>
                </v-list>
            </v-card>
        </v-col>
        <v-col>
            <v-card class="mb-2" max-width="450">
                <v-card-text>
                    <div>Word of the Day</div>
                    <p class="display-1 text--primary">
                        be•nev•o•lent
                    </p>
                    <p>adjective</p>
                    <div class="text--primary">
                        well meaning and kindly.<br>
                        "a benevolent smile"
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        text
                        color="deep-purple accent-4"
                    >
                        Прочитать
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col>
            <v-card class="mb-2 timeline" max-width="450">
                <v-card
                    dark
                    flat>
                    <v-btn
                        absolute
                        bottom
                        color="pink"
                        right
                        fab
                        @click="onAddPerson">
                        <v-icon>person_add</v-icon>
                    </v-btn>
                    <v-card-title class="pa-2 purple lighten-3">
                        <v-btn icon>
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                        <h3 class="title font-weight-light text-xs-center grow">Timeline</h3>
                        <v-avatar>
                            <v-img :src="avatarIcon"></v-img>
                        </v-avatar>
                    </v-card-title>
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
                        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)">
                        <v-container fill-height>
                            <v-layout align-center>
                                <strong class="display-4 font-weight-regular mr-4">8</strong>
                                <v-layout column justify-end>
                                    <div class="headline font-weight-light">Monday</div>
                                    <div class="text-uppercase font-weight-light">February 2015</div>
                                </v-layout>
                            </v-layout>
                        </v-container>
                    </v-img>
                </v-card>
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
    export default {
        name: "Dashboard",
        components: {
          widget
        },
        data: () => ({
            avatarIcon: 'https://avataaars.io/',

            show: true,
            newTodo: '',
            todo: [],
            todos: [],
            day: '25',
            date: 'Wednesday ',
            ord: 'dddd',
            year: '2019',
        }),
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
                this.todos.splice(index, 1);
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
