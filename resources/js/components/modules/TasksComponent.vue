<template>
    <div>
        <ul class="todo-list1">
            <li v-for="(task, index) in sortedArray"
                :key="task.id"
                class="todo col-12">

                <div class="view" style="display: grid;">
                    <div class="taskT" data-toggle="modal" :data-target="'#ModalCenter'+task.id" data-backdrop="static" data-keyboard="false">
                        <i class="fa "  :class="task.completed ? 'fa-check' : 'fa-minus'" :style="!task.completed ? 'color: red' : ''"></i>
                        {{ task.title }}

                    </div>
                    <div
                         style="text-decoration: underline;
                                             text-decoration-skip-ink: none;
                                             color: tomato;font-weight: bold;
                                             cursor: help;">{{task.status}}</div>
                    <div class="col-12">

                        <span>{{task.users?task.users.name.replace(/(\S)\S* (\S+) (\S)\S*/, "$2 $3.$1.") :'Нет данных'}}</span>

                    </div>
                </div>
                <!-- Modal -->
                <div class="modal fade " :id="'ModalCenter'+task.id" tabindex="-1" role="dialog" :aria-labelledby="'ModalCenterTitle'+task.id" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-backdrop modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header py-3">
                                <button type="button" class="btn btn-sm btn-rounded  my-1 mr-2" :class="task.completed?'btn-secondary':'btn-success'"
                                        @click=""><i class="fa fa-check mr-2"></i>{{task.completed?'Доделать':'Закрыть заявку'}}</button>

                                <button type="button" class="btn btn-sm btn-rounded btn-warning my-1 mr-2" @click="ex_done(task)"  data-dismiss="modal">
                                    <i class="fa fa-floppy-o" aria-hidden="true" style="color: #164763;"></i>
                                    Сохранить
                                </button>

                                <p class="my-1 mr-2">Дата до:
                                    <span class="rounded text-blue">
                                                            <input type="date" v-model="task.toDate" style="border: 1px solid rgba(48, 72, 95, 0.17) !important; text-align: center;">
                                                        </span>
                                </p>

                                <select v-model="task.priority" name="priority" class="my-1 mr-2" style="border: 1px solid rgba(48, 72, 95, 0.17) !important;">
                                    <option v-for="option in options"  :value="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <button type="button" class="close" data-dismiss="modal">×</button>
                            </div>
                            <div class="modal-body" style="margin: 0;font-size: 19px;">
                                                    <span>Статус:
                                                        <input type="tel" v-model="task.status" class="borderNone">
                                                    </span>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Заголовок:</label>
                                    <input type="text" class="form-control borderNone" id="recipient-name" v-model="task.title">
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Подробное описание:</label>
                                    <textarea class="form-control borderNone" id="message-text" v-model="task.desc"></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        name: "TasksComponent",
        props: [],
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters(['sortedArray', 'options']),
        },
        watch: {

        },
        created(){

        },
        mounted() {
            this.$store.dispatch('FETCH_DATA')

            /*window.Echo.channel("newTask").listen(".task-created", e => {
                this.tasks.unshift(e.task)
                console.log("Задача с id:" + e.task.id + " была добавлена, на стороне сервера")
            });
            window.Echo.channel("taskUpdated").listen(".task-updated", e => {
                let index = this.tasks.findIndex(el => el.id === e.task.id);
                this.tasks.splice(index, 1,e.task)
                this.taskUpd = true
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
    .todo-list1 {
        height: calc(100vh - 8.2em);
        background: #f1f1f1;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .todo-list1 li {
        background: #fff;
        color: #000;
        border: 1px solid rgba(15,15,15,.1);
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(15,15,15,.15);
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
