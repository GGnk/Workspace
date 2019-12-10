<template>
    <v-card
        class="mb-2"
        v-if="tasks || todo"
        :id="id"
    >

<!-- начало - Бумажный и Общий список задач------------- -->
        <v-card-title
            v-if="tasks && titleCard"
        >
            {{titleCard}}:
        </v-card-title>
        <v-card-text
            v-if="tasks && titleCard"
        >
            <v-list>
                <v-list-item
                    v-for="(todo, indexTask) in tasks"
                    v-if="todo.general === 1 ||todo.cat === 1"
                    :key="indexTask"
                    style="min-height:30px!important;"
                >
                    <div
                        class="return-task"
                        v-if="todo.completed == false"
                    >
                        <v-tooltip
                            right>
                            <template v-slot:activator="{ on }">
                                <v-list-item-subtitle
                                    class="text-wrap black--text text-left"
                                    v-on="on"
                                    :style="todo.title === 'Тестовое сообщение'?'border:2px solid blue':''"
                                >
                                    {{todo.title}}
                                </v-list-item-subtitle>
                            </template>
                            <span
                            >{{todo.status?todo.status:'Задайте статус'}}</span>
                        </v-tooltip>
                        <v-list-item-action
                            class="mt-0 "
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
                                        @click="$store.commit('tasks/EDIT_DIALOG_FORM', {list: (general ? 'general':'tasks'),task:todo})"
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
                                @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 1, index: indexTask, list:(general ?'general_tasks':'tasks')})"
                                class="mx-2" outlined fab x-small color="success">
                                <v-icon>done</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </div>
                    <div
                        class="return-task"
                        v-else
                    >
                        <v-btn
                            @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 0, index: indexTask, list:(general ?'general_tasks':'tasks')})"
                            class="mx-2" outlined  color="grey">
                            Вернуть задачу
                        </v-btn>
                        <v-list-item-subtitle
                            class="text-wrap black--text text-left"
                        >
                            {{todo.title}}
                        </v-list-item-subtitle>
                    </div>

                </v-list-item>
            </v-list>
        </v-card-text>

<!-- начало - Свой писок задач ------------- -->
        <v-card-title
            v-else-if="todo && todo.completed == false"
            class="text-break">
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
                            @click="$store.commit('tasks/EDIT_DIALOG_FORM', {list: 'tasks', task:todo})"
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
                    @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 1, index: id, list:'tasks'})"
                    class="mx-2" outlined fab x-small color="success">
                    <v-icon>done</v-icon>
                </v-btn>
            </v-col>
        </v-card-title>

        <v-card-title
            v-else-if="todo && todo.completed == true"
        >
            <v-btn
                @click="$store.dispatch('tasks/DONE_TASK', {id: todo.id, completed: 0, index: id, list:'tasks'})"
                class="mx-2" outlined  color="grey">
                Вернуть задачу
            </v-btn>
            <v-list-item-subtitle
                class="text-wrap black--text text-left"
            >
                {{todo.title}}
            </v-list-item-subtitle>
        </v-card-title>
    </v-card>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "universal-card",
        props: {
            tasks: {
                type: Array,
                required: false,
                default: null
            },
            todo: {
                type: Object,
                required: false,
                default: null
            },
            id: {
                type: Number,
                required: false,
                default: null
            },
            general: {
                type: Boolean,
                required: false,
                default: false
            },
            titleCard: {
                type: String,
                required: false,
                default: "None title"
            },

        },
        computed:{
            ...mapGetters('tasks',['sortedArray', 'general_tasks','options', 'cat', 'deps' ,'intTask', 'tasksUsers', 'task', 'task_update','dialogAddTask', 'dialogUpdateTask']),
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
    .return-task {
        align-items: center;
        display: flex;
        flex: 1 1 100%;
    }
</style>
