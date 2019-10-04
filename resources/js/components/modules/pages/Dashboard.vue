<template>
    <v-row
        class="layout wrap"
    >
        <v-flex lg4 sm4 xs12 >
            <v-card class="mb-2 mx-3">
                <mac-header :title="sortedArray.length+(sortedArray.length >= 0?' задач!':(sortedArray.length == 1?' задача!':' задачи!'))"></mac-header>
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
        </v-flex>
        <v-flex lg4 sm4 xs12
            sm="4">
            <mac-header title="Хранилище"></mac-header>
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
        </v-flex>
        <v-flex lg4 sm4 xs12
            sm="4">
            <v-card class="mb-2 mx-3 timeline">
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
            </v-card>
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
            XMLyandex: window.m_index,
            colorNews: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4'
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
            YandexNews() {
                    var data=window.m_index;
                    if(!data||!data.length){return;}
                    function formatDate(ts){
                        var d=new Date(ts*1000);
                        return d.getHours()+':'+('0'+d.getMinutes()).substr(-2);
                    }
                    var html='<div class="ya-news__title"><a href="https://news.yandex.ru/" target="_blank">Новости Саратов</a></div>';
                    for(var i=0;i<data.length;i++){
                        var item=data[i];
                        html+='<div>' +
                            '<span class="ya-news__date">'+item.date+'&nbsp;'+item.time+ '</span>'
                            + '<span class="ya-news__title">'
                            + '<a href="'+item.url+'" target="_blank">'+item.title+'</a>' +
                            '</span>' +
                            '</div>' +
                            '<div class="ya-news__description">'+item.descr+'</div>';
                    }
                    html+='<div class="ya-news__all"><a href="https://news.yandex.ru/" target="_blank">Все новости на '+formatDate(data.update_time_t)+'</a></div>';
                    this.XMLyandex = html
                console.log(window.m_index)
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
    .ya-news__title{font-size:100%;font-weight:700;margin-bottom:.5em}
    .ya-news__date{font-size:85%;margin-right:.5em}
    .ya-news__informer{font-size:85%;margin-bottom:.3em}
    .ya-news__description{font-size:85%;margin-bottom:.5em}
    .ya-news__all{font-size:80%;margin-top:.3em}
</style>
