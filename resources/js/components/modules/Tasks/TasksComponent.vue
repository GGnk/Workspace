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
                                v-model="user_id_list"
                                item-text="name"
                                item-value="id"
                                hide-selected
                                color="success"
                                height="48"
                            ></v-select>
                        </div>
                        <v-btn
                            @click="$store.commit('tasks/EDIT_DIALOG_FORM', 'tasks')"
                            tile
                            rounded
                            color="info">
                            <v-icon>playlist_add</v-icon>
                        </v-btn>
                    </v-subheader>

                </v-col>

                <v-divider></v-divider>
<!-- начало - Бумажный список задач------------- -->
                <universal-card
                    v-if="sortedArray.length"
                    :tasks="sortedArray"
                    :title-card="'Бумажные дела'"
                ></universal-card>
<!-- конец - Бумажный список задач------------- -->

<!-- начало - Свой писок задач ------------- -->
                <v-slide-x-transition
                    v-for="(task, i) in sortedArray"
                    v-if="task.cat !== 1"
                    :key="i"
                >
                    <universal-card :id="i" :todo="task"></universal-card>
                </v-slide-x-transition>
<!-- конец - Свой писок задач ------------- -->
            </v-col>

<!-- начало - Общий список задач------------- -->
            <v-col sm="5">
                <v-divider></v-divider>
                <v-col sm="12"  style="height: 50px">
                    Общий список
                </v-col>
                <v-divider></v-divider>
                <v-slide-x-transition
                    v-for="(dep, indexGeneralTask) in general_tasks"
                    v-if="dep.tasks.length"
                    :key="indexGeneralTask"
                >
                    <universal-card
                        :tasks="dep.tasks"
                        :title-card="dep.name"
                        :id="indexGeneralTask"
                        :general="true"
                    ></universal-card>

                </v-slide-x-transition>
            </v-col>
<!-- конец - Общий список задач------------- -->
        </v-row>

<!-- начало - Форма добавления/обновления задач------------- -->
        <v-dialog
            v-model="FormOpen"
            max-width="600"
        >
            <v-card>
                <v-card-title class="headline">{{FormTitle}}</v-card-title>

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
                        @click="$store.commit('tasks/DIALOG_FORM_CLOSE')"
                    >
                        Отмена
                    </v-btn>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="$store.dispatch('tasks/SAVE_TASK')"
                    >
                        {{FormButtomTitle}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
<!-- конец - Форма добавления/обновления задач------------- -->
    </v-list>
</template>

<script>
    import {mapGetters} from 'vuex'
    import UniversalCard from "./blocks/universal-card";

    export default {
        name: "TasksComponent",
        components: {UniversalCard},
        props: [],
        data() {
            return {}
        },
        computed: {
            ...mapGetters('tasks',
                [   'sortedArray', 'general_tasks','options',
                    'cat', 'deps' ,'intTask', 'tasksUsers',
                    'task','dialogForm', 'dialogFormTitle', 'dialogFormButtomTitle','menuMode'
                ]),
            FormOpen:{
                get() {
                    return this.dialogForm
                },
                set() {
                    this.$store.commit('tasks/DIALOG_FORM_CLOSE')
                }
            },
            FormTitle: {
                get() {
                    return this.dialogFormTitle
                }
            },
            FormButtomTitle: {
                get() {
                    return this.dialogFormButtomTitle
                }
            },

            user_id_list: {
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
                    this.$store.commit('tasks/ENTER_TASK_FORM', {vv: 'title', value})
                }
            },
            task_desc: {
                get() {
                    return this.task.desc
                },
                set(value) {
                    this.$store.commit('tasks/ENTER_TASK_FORM', {vv: 'desc', value})
                }
            },
            task_status: {
                get() {
                    return this.task.status
                },
                set(value) {
                    this.$store.commit('tasks/ENTER_TASK_FORM', {vv: 'status', value})
                }
            },
            task_priority: {
                get() {
                    return this.task.priority
                },
                set(value) {
                    this.$store.commit('tasks/ENTER_TASK_FORM', {vv: 'priority', value})
                }
            },
            task_cat: {
                get() {
                    return this.task.cat
                },
                set(value) {
                    this.$store.commit('tasks/ENTER_TASK_FORM', {vv: 'cat', value})
                }
            },
            task_general: {
                get() {
                    return this.task.general
                },
                set(value) {
                    this.$store.commit('tasks/ENTER_TASK_FORM', {vv: 'general', value})
                }
            },
            task_dep: {
                get() {
                    return this.task.deps_id
                },
                set(value) {
                    this.$store.commit('tasks/ENTER_TASK_FORM', {vv: 'deps_id', value})
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
            this.$store.dispatch('tasks/FETCH_DATA')
        },
        mounted() {

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
        }
    }
</script>

<style scoped>
    .return-task {
        align-items: center;
        display: flex;
        flex: 1 1 100%;
    }
</style>
