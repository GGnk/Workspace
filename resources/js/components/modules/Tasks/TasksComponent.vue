<template>
    <v-list  two-line subheader>
        <v-row class="mx-0 text-center">
            <v-col sm="7">
                <v-divider></v-divider>
                <v-col sm="12" style="height: 50px">
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
                        <v-btn
                            @click="$store.commit('tasks/DIALOG_ADD')"
                            tile
                            rounded
                            color="info">
                            <v-icon>playlist_add</v-icon>
                        </v-btn>
                    </v-subheader>

                    <v-dialog
                        :value="dialogAddTask"
                        @input="$store.commit('tasks/DIALOG_ADD') "
                        max-width="600"
                    >
                        <v-card>
                            <v-card-title class="headline">Добавляем задачу</v-card-title>

                            <v-card-text>
                                <v-text-field
                                    v-model="task_title"
                                    label="Заголовок"
                                    required
                                ></v-text-field>

                                <v-textarea
                                    v-model="task_desc"
                                    label="Описание"
                                ></v-textarea>
                                <v-text-field
                                    v-model="task_status"
                                    label="Статус"
                                ></v-text-field>
                                <v-row>
                                    <v-select
                                        v-model="task_priority"
                                        :items="options"
                                        label="Приоритет"
                                        required
                                    ></v-select>
                                    <v-select
                                        v-model="task_cat"
                                        :items="cat"
                                        label="Категория"
                                        required
                                    ></v-select>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-checkbox v-model="task_general" label="Общий список"></v-checkbox>
                                    </v-col>
                                    <v-col>
                                        <v-select
                                            v-model="task_dep"
                                            v-if="task_general"
                                            :items="deps"
                                            item-text="name"
                                            item-value="id"
                                            label="Корпус"
                                            required
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                    color="green darken-1"
                                    text
                                    @click="$store.commit('tasks/DIALOG_ADD')"
                                >
                                    Отмена
                                </v-btn>

                                <v-btn
                                    color="green darken-1"
                                    text
                                    @click="$store.dispatch('tasks/ADD_TASK') && $store.commit('tasks/DIALOG_ADD') "
                                >
                                   Добавить
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-col>
                <v-divider></v-divider>
                <v-card
                    class="mb-2"
                >
                    <v-card-title>Бумажные дела:</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item
                                v-for="(todo, index) in sortedArray"
                                v-if="todo.completed == false && todo.cat == 1"
                                :key="index"
                                style="min-height:30px!important;"
                            >
                                <v-tooltip
                                    right>
                                    <template v-slot:activator="{ on }">
                                        <v-list-item-subtitle
                                            class="text-wrap black--text text-left"
                                            v-on="on"
                                        >
                                            {{todo.title}}
                                        </v-list-item-subtitle>
                                    </template>
                                    <span
                                    >{{todo.status?todo.status:'Задайте статус'}}</span>
                                </v-tooltip>
                                <v-list-item-action
                                    class="mt-0"
                                    style="display: inline!important;"
                                >
                                    <v-menu
                                        v-model="todo.menu"
                                        close-on-click
                                        close-on-content-click
                                        offset-y
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-btn
                                                v-on="on"
                                                class="mx-2" outlined fab x-small color="accent">
                                                <v-icon>mdi-format-list-bulleted-square</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item
                                                v-for="(item, index) in menuMode.list"
                                                :key="index"
                                                @click="item.dispatch? $store.dispatch('tasks/'+item.module, {id:todo.id, index:i}):$store.commit('tasks/'+item.module, todo)"
                                            >
                                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                    <v-btn
                                        @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 1, index: index})"
                                        class="mx-2" outlined fab x-small color="success">
                                        <v-icon>done</v-icon>
                                    </v-btn>
                                </v-list-item-action>

                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
                <v-slide-x-transition
                    v-for="(todo, i) in sortedArray"
                    v-if="todo.completed == false && todo.cat !== 1"
                    :key="i"
                >
                    <v-card
                        class="mb-2"
                        :id="i"
                    >
                        <v-card-title class="text-break">
                            <v-col sm="9">
                                <span
                                    class="position-absolute font-italic font-weight-medium caption"
                                    :class="color_status(todo.priority)"
                                    style="top: 0; right: 8px">{{todo.status}}</span>
                                {{todo.title}}
                            </v-col>
                            <v-col sm="3">
                                <v-menu
                                    v-model="todo.menu"
                                    close-on-click
                                    close-on-content-click
                                    offset-y
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            v-on="on"
                                            class="mx-2" outlined fab x-small color="accent">
                                            <v-icon>mdi-format-list-bulleted-square</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            v-for="(item, index) in menuMode.list"
                                            :key="index"
                                            @click="item.dispatch? $store.dispatch('tasks/'+item.module, {id:todo.id, index:i}):$store.commit('tasks/'+item.module, todo)"
                                        >
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-btn
                                    @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 1, index: i})"
                                    class="mx-2" outlined fab x-small color="success">
                                    <v-icon>done</v-icon>
                                </v-btn>
                            </v-col>
                        </v-card-title>
                    </v-card>
                </v-slide-x-transition>
                <v-dialog
                    :value="dialogUpdateTask"
                    @input="$store.commit('tasks/DIALOG_UPDATE') "
                    max-width="600"
                >
                    <v-card>
                        <v-card-title class="headline">Обновляем задачу</v-card-title>

                        <v-card-text>
                            <v-text-field
                                v-model="task_update_title"
                                label="Заголовок"
                                required
                            ></v-text-field>

                            <v-textarea
                                v-model="task_update_desc"
                                label="Описание"
                            ></v-textarea>
                            <v-text-field
                                v-model="task_update_status"
                                label="Статус"
                            ></v-text-field>
                            <v-row>
                                <v-select
                                    v-model="task_update_priority"
                                    :items="options"
                                    label="Приоритет"
                                    required
                                ></v-select>
                                <v-select
                                    v-model="task_update_cat"
                                    :items="cat"
                                    label="Категория"
                                    required
                                ></v-select>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-checkbox v-model="task_update_general" label="Общий список"></v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-select
                                        v-model="task_update_dep"
                                        v-if="task_update_general"
                                        :items="deps"
                                        item-text="name"
                                        item-value="id"
                                        label="Корпус"
                                        required
                                    ></v-select>
                                </v-col>
                            </v-row>

                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                color="green darken-1"
                                text
                                @click="$store.commit('tasks/DIALOG_UPDATE')"
                            >
                                Отмена
                            </v-btn>

                            <v-btn
                                color="green darken-1"
                                text
                                @click="$store.dispatch('tasks/UPDATE_TASK') && $store.commit('tasks/DIALOG_UPDATE')"
                            >
                               Обновить
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
            <v-col sm="5">
                <v-divider></v-divider>
                <v-col sm="12"  style="height: 50px">
                    Общий список
                </v-col>
                <v-divider></v-divider>

                <v-slide-x-transition
                    v-for="(dep, i) in general_tasks"
                    v-if="dep.tasks.length"
                    :key="i"
                >
                    <v-card
                        class="mb-2"
                    >
                        <v-card-title>{{dep.name}}:</v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-item
                                    v-for="(task, index) in dep.tasks"
                                    :key="index"
                                    style="min-height:30px!important;"
                                >
                                    <v-tooltip
                                        right>
                                        <template v-slot:activator="{ on }">
                                            <v-list-item-subtitle
                                                class="text-wrap black--text text-left"
                                                v-on="on"
                                            >
                                                {{task.title}}
                                            </v-list-item-subtitle>
                                        </template>
                                        <span
                                        >{{task.status?task.status:'Задайте статус'}}</span>
                                    </v-tooltip>
                                    <v-list-item-action
                                        class="mt-0"
                                        style="display: inline!important;"
                                    >
                                        <v-menu
                                            v-model="task.menu"
                                            close-on-click
                                            close-on-content-click
                                            offset-y
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    v-on="on"
                                                    class="mx-2" outlined fab x-small color="accent">
                                                    <v-icon>mdi-format-list-bulleted-square</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item
                                                    v-for="(item, index) in menuMode.list"
                                                    :key="index"
                                                    @click="item.dispatch? $store.dispatch('tasks/'+item.module, {id:task.id, index:i}):$store.commit('tasks/'+item.module, task)"
                                                >
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 1, index: index})"
                                            class="mx-2" outlined fab x-small color="success">
                                            <v-icon>done</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-slide-x-transition>
            </v-col>
        </v-row>
    </v-list>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "TasksComponent",
        props: [],
        data() {
            return {
                newTodo: '',
            }
        },
        computed: {
            ...mapGetters('tasks',['sortedArray', 'general_tasks','options', 'cat', 'deps' ,'intTask', 'tasksUsers', 'task', 'task_update','dialogAddTask', 'dialogUpdateTask','menuMode']),

            task_array: {
                get () {
                    return this.intTask
                },
                set (value) {
                    this.$store.commit('tasks/TASK_LIST', value)
                }
            },
            task_title: {
                get() {
                    return this.task.title
                },
                set(value) {
                    this.$store.commit('tasks/TASK_ADD_DATA', {vv: 'title', value})
                }
            },
            task_desc: {
                get() {
                    return this.task.desc
                },
                set(value) {
                    this.$store.commit('tasks/TASK_ADD_DATA', {vv: 'desc', value})
                }
            },
            task_status: {
                get() {
                    return this.task.status
                },
                set(value) {
                    this.$store.commit('tasks/TASK_ADD_DATA', {vv: 'status', value})
                }
            },
            task_priority: {
                get() {
                    return this.task.priority
                },
                set(value) {
                    this.$store.commit('tasks/TASK_ADD_DATA', {vv: 'priority', value})
                }
            },
            task_cat: {
                get() {
                    return this.task.cat
                },
                set(value) {
                    this.$store.commit('tasks/TASK_ADD_DATA', {vv: 'cat', value})
                }
            },
            task_general: {
                get() {
                    return this.task.general
                },
                set(value) {
                    this.$store.commit('tasks/TASK_ADD_DATA', {vv: 'general', value})
                }
            },
            task_dep: {
                get() {
                    return this.task.deps_id
                },
                set(value) {
                    this.$store.commit('tasks/TASK_ADD_DATA', {vv: 'deps_id', value})
                }
            },
            // Update form
            task_update_title: {
                get() {
                    return this.task_update.title
                },
                set(value) {
                    this.$store.commit('tasks/TASK_UPDATE_DATA', {vv: 'title', value})
                }
            },
            task_update_desc: {
                get() {
                    return this.task_update.desc
                },
                set(value) {
                    this.$store.commit('tasks/TASK_UPDATE_DATA', {vv: 'desc', value})
                }
            },
            task_update_status: {
                get() {
                    return this.task_update.status
                },
                set(value) {
                    this.$store.commit('tasks/TASK_UPDATE_DATA', {vv: 'status', value})
                }
            },
            task_update_priority: {
                get() {
                    return this.task_update.priority
                },
                set(value) {
                    this.$store.commit('tasks/TASK_UPDATE_DATA', {vv: 'priority', value})
                }
            },
            task_update_cat: {
                get() {
                    return this.task_update.cat
                },
                set(value) {
                    this.$store.commit('tasks/TASK_UPDATE_DATA', {vv: 'cat', value})
                }
            },
            task_update_general: {
                get() {
                    return this.task_update.general
                },
                set(value) {
                    this.$store.commit('tasks/TASK_UPDATE_DATA', {vv: 'general', value})
                }
            },
            task_update_dep: {
                get() {
                    return this.task_update.deps_id
                },
                set(value) {
                    this.$store.commit('tasks/TASK_UPDATE_DATA', {vv: 'deps_id', value})
                }
            }
        },
        watch: {

        },
        created(){

        },
        mounted() {
            this.$store.dispatch('tasks/FETCH_DATA')

            /*window.Echo.channel("newTask").listen(".task-created", e => {
                this.tasks.unshift(e.task)
                console.log("Задача с id:" + e.task.id + " была добавлена, на стороне сервера")
            });
            window.Echo.channel("taskUpdated").listen(".task-updated", e => {
                let index = this.tasks.findIndex(el => el.id === e.task.id);
                this.tasks.splice(index, 1,e.task)
                console.log("Задача с id:" + e.task.id + " была обновлена")
            });
            window.Echo.channel("taskRemoved").listen(".task-removed", e => {
                // TODO: сделать обновление одного элемента в списке
                let index = this.tasks.findIndex(el => el.id === e.task.id);
                this.tasks.splice(index, 1)
                console.log("Задача с id:" + e.task.id + " была удалена")
            });*/
        },
        methods: {
            color_status(status){
                switch (status) {
                    case 1:
                        return 'accent'
                    case 2:
                        return 'warning lighten-2'
                    case 3:
                        return 'error lighten-2'
                }
            },
        }
    }
</script>

<style scoped>
    .hover {
        opacity: 0.5;
    }
    .on-hover {
        opacity: 1!important;
    }
    .todo-list1 {
        height: calc(100vh - 8.2em);
        background: #2f2e32;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .todo-list1 li {
        background: #fff;
        color: #000;
        border: 1px solid rgb(255, 255, 255);
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgb(234, 234, 234);
        display: inline-flex;
        height: 70px;
        overflow: hidden;
        padding: 5px 3px 3px 10px;
        font-size: 11px;
        margin: 5px;
        width:96%;
    }
    .taskT {
        overflow: hidden;
        height: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .todo-list1::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
        border-radius: 10px;
        background-color: #f1f1f1;
    }

    .todo-list1::-webkit-scrollbar
    {
        width: 5px;
        background-color: #2f2e32;
    }

    .todo-list1::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #b8db81;

    }
</style>
