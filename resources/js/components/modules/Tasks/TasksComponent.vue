<template>
    <v-list  two-line subheader>
        <v-row class="mx-0 text-center">
            <v-col
                cols="12" :sm="generalArray.length> 0 ? 7 : 12">
                <v-divider class="d-none d-sm-block .d-xl-flex"/>
                <v-col sm="12" class="my-2 pa-0" style="height: 50px">
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

                            />
                        </div>
                        <v-btn
                            @click="$store.commit('tasks/EDIT_DIALOG_FORM')"
                            tile
                            rounded
                            color="info">
                            <v-icon>playlist_add</v-icon>
                        </v-btn>
                    </v-subheader>

                </v-col>

                <v-divider class="d-none d-sm-block .d-xl-flex"/>
<!-- начало - Бумажный список задач------------- -->

                <v-card
                    v-if="no_cat_task"
                    dark
                    class="blue-grey mb-2">
                    <v-card-title>
                        Бумажные дела:
                    </v-card-title>
                    <v-card-text class="px-0">
                        <v-list class="pa-0">
                            <v-hover
                                v-for="(todo, indexTask) in sortedArray"
                                v-if="!todo.general && todo.cat == 1"
                                :key="indexTask"
                                v-slot:default="{ hover }"
                                :open-delay="0"
                                :close-delay="0"
                            >
                                <v-list-item
                                    class="grey lighten-5"
                                    style="min-height:30px!important;border-top: 1px solid #607D8B !important"
                                >
                                    <div
                                        class="return-task"
                                        v-if="todo.completed != 1"
                                    >
                                        <v-tooltip
                                            right>
                                            <template v-slot:activator="{ on }">
                                                <v-list-item-subtitle
                                                    class="text-wrap black--text text-left"
                                                    v-on="on"
                                                >
                                                    {{todo.desc}}
                                                </v-list-item-subtitle>
                                            </template>
                                            <span
                                            >{{todo.status?todo.status:'Задайте статус'}}</span>
                                        </v-tooltip>
                                        <v-list-item-action
                                            style="display: inline"
                                        >
                                            <div class="d-sm-none ma-1">
                                                <v-menu
                                                    v-model="todo.menu"
                                                    close-on-click
                                                    close-on-content-click
                                                    offset-y
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn
                                                            v-on="on"
                                                            class="ml-2" outlined fab x-small color="accent">
                                                            <v-icon>mdi-format-list-bulleted-square</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list>
                                                        <v-list-item
                                                            @click="$store.commit('tasks/EDIT_DIALOG_FORM',
                                                    {task:todo})"
                                                        >
                                                            <v-list-item-title>Редактировать</v-list-item-title>
                                                        </v-list-item>
                                                        <v-list-item
                                                            @click="$store.dispatch('tasks/DELETE_TASK', todo)"
                                                        >
                                                            <v-list-item-title>Удалить</v-list-item-title>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                                <v-btn
                                                    @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 1, index: indexTask})"
                                                    class="mr-2" outlined fab x-small color="success">
                                                    <v-icon>done</v-icon>
                                                </v-btn>
                                            </div>
                                            <div class="d-none d-sm-block .d-xl-flex">
                                                <v-speed-dial
                                                    v-model="hover"
                                                    absolute
                                                    bottom
                                                    right
                                                    direction="left"
                                                    transition="slide-y-reverse-transition"
                                                >
                                                    <v-btn
                                                        text
                                                        icon
                                                        color="green"
                                                        @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 1, index: id})"
                                                    >
                                                        <v-icon>done</v-icon>
                                                    </v-btn>
                                                    <v-btn
                                                        text
                                                        icon
                                                        color="black"
                                                        @click="$store.commit('tasks/EDIT_DIALOG_FORM', todo)"
                                                    >
                                                        <v-icon>mdi-pencil</v-icon>
                                                    </v-btn>
                                                    <v-btn
                                                        text
                                                        icon
                                                        color="red"
                                                        @click="$store.dispatch('tasks/DELETE_TASK', todo)"
                                                    >
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-speed-dial>
                                            </div>
                                        </v-list-item-action>
                                    </div>
                                    <div
                                        class="return-task"
                                        v-else
                                    >
                                        <v-btn
                                            @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 0, index: indexTask})"
                                            class="mx-2" outlined  color="grey">
                                            Вернуть задачу
                                        </v-btn>
                                        <v-list-item-subtitle
                                            class="text-wrap black--text text-left"
                                        >
                                            {{todo.desc}}
                                        </v-list-item-subtitle>
                                    </div>

                                </v-list-item>
                            </v-hover>
                        </v-list>
                    </v-card-text>
                </v-card>

<!-- конец - Бумажный список задач------------- -->

<!-- начало - Свой писок задач ------------- -->
                <v-slide-x-transition
                    v-for="(task, i) in sortedArray"
                    v-if="!task.general && task.cat !=1"
                    :key="i"
                >
                    <universal-card :id="i" :task="task"/>
                </v-slide-x-transition>
<!-- конец - Свой писок задач ------------- -->
            </v-col>

<!-- начало - Общий список задач------------- -->
            <v-col
                v-if="generalArray.length"
                cols="12" sm="5">
                <v-divider/>
                <v-col sm="12"  style="height: 50px">
                    Общий список
                </v-col>
                <v-divider/>
                <v-slide-x-transition
                    v-for="(task, i) in generalArray"
                    :key="i"
                >
                    <universal-card :id="i" :task="task"/>

                </v-slide-x-transition>
            </v-col>
<!-- конец - Общий список задач------------- -->
        </v-row>

<!-- начало - Форма добавления/обновления задач------------- -->
        <v-dialog
            v-model="FormOpen"
            max-width="600"
            :fullscreen="ui_mobile"
        >
            <v-card>
                <v-card-title class="headline">{{FormTitle}}</v-card-title>

                <v-card-text>
                    <v-form
                        v-model="valid"
                    >
                        <v-row>
                            <v-col cols="12">
                                <ckeditor :editor="editor" v-model="task_desc" label="Описание" :rules="get_rules.task_desc" :config="editorConfig"/>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="task_status"
                                    label="Статус"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select
                                    v-model="task_priority"
                                    :items="options"
                                    label="Приоритет"
                                    :rules="get_rules.task_priority"
                                />
                            </v-col>
                            <v-col>
                                <v-select
                                    v-model="task_cat"
                                    :items="cat"
                                    label="Категория"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-checkbox v-model="task_general" label="Общий список"/>
                            </v-col>
                            <v-col>
                                <v-select
                                    v-model="task_house"
                                    :items="houses"
                                    item-text="name"
                                    label="Корпус"
                                    multiple
                                    filled
                                    shaped
                                    return-object
                                />
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>

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
    import InlineEditor from '@ckeditor/ckeditor5-build-inline';
    export default {
        name: "TasksComponent",
        components: {
            UniversalCard: () => import("./blocks/universal-card")
        },
        props: [],
        data() {
            return {
                editor: InlineEditor,
                editorConfig: {
                    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
                }
            }
        },
        computed: {
            ...mapGetters('config', ['ui_mobile']),

            ...mapGetters('tasks',
                [   'sortedArray', 'generalArray', 'options',
                    'cat', 'houses' ,'intTask', 'tasksUsers',
                    'task', 'task_houses', 'get_rules','dialogForm', 'dialogFormValid', 'dialogFormTitle', 'dialogFormButtomTitle', 'no_cat_task'
                ]),
            valid: {
                get() {
                    return this.dialogFormValid
                },
                set(value) {
                    this.$store.commit('tasks/DIALOG_FORM_VALID', value)
                }
            },
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
            task_house: {
                get() {
                    return this.task.house

                },
                set(value) {
                    this.$store.commit('tasks/ENTER_TASK_FORM', {vv: 'house', value})
                }
            },


            // Update form

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
            task_update_house: {
                get() {
                    return this.task_update.house_ids
                },
                set(value) {
                    this.$store.commit('tasks/TASK_UPDATE_DATA', {vv: 'house_ids', value})
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

<style scoped lang="scss" type="text/scss">
    .return-task {
        align-items: center;
        display: flex;
        flex: 1 1 100%;
    }
</style>
