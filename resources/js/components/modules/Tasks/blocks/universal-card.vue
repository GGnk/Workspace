<template>
    <v-hover
        v-slot:default="{ hover }"
        :open-delay="0"
        :close-delay="0"
    >
        <v-card
            class="mb-2"
            :elevation="hover ? 16 : 2"
            :style="'border:1px solid '+ (task.priority > 2? '#ff8c84':'#82b1ff') +';'+
            'border-left:'+ (task.priority*3)  +'px solid '+ (task.priority > 2? '#ff8c84':'#82b1ff') +'!important;'"
            :id="id"
        >
            <v-card-text
                v-if="!task.completed"
                class="pb-2 font-weight-bold text-break">
                <span
                    class="position-absolute font-italic font-weight-medium caption"
                    :class="color_status(task.priority)"
                    style="bottom: 0; left: 0">{{task.status}}</span>
                <v-row>
                    <v-col
                        md
                        cols="12"
                        class="pa-0">
                        <div v-html="task.desc"/>
                    </v-col>
                    <v-col
                        md="3"
                        class="d-sm-none pa-0 text-right">
                        <v-menu
                            v-model="task.menu"
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
                                    @click="$store.commit('tasks/EDIT_DIALOG_FORM', task)"
                                >
                                    <v-list-item-title>Редактировать</v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                    @click="$store.dispatch('tasks/DELETE_TASK', task)"
                                >
                                    <v-list-item-title>Удалить</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-btn
                            @click="$store.dispatch('tasks/DONE_TASK', {id: task.id, completed: 1, index: id})"
                            class="ml-2" outlined fab x-small color="success">
                            <v-icon>done</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-speed-dial
                    v-model="hover"
                    absolute
                    bottom
                    right
                    direction="left"
                    transition="slide-y-reverse-transition"
                    class="d-none d-sm-block .d-xl-flex"
                >
                    <v-btn
                        text
                        icon
                        color="green"
                        @click="$store.dispatch('tasks/DONE_TASK', {id: task.id, completed: 1})"
                    >
                        <v-icon>done</v-icon>
                    </v-btn>
                    <v-btn
                        text
                        icon
                        color="dark"
                        @click="$store.commit('tasks/EDIT_DIALOG_FORM', task)"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                        text
                        icon
                        color="red"
                        @click="$store.dispatch('tasks/DELETE_TASK', task)"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-speed-dial>
                <v-row
                    v-if="task.house"
                    cols="12"
                    class="py-3 chip-my"
                >
                    <v-chip
                        v-for="(house, i) in task.house"
                        :key="i"
                        :value="house.id"
                        :title="house.name"
                        style="min-width:30%; max-width: 50%"
                        close
                        @click:close="$store.dispatch('tasks/DELETE_RELATION', {task_id: task.id, task_index: id, relation_id: house.id})"
                    >
                        <v-col class="caption d-inline-block text-truncate">{{house.name}}</v-col>
                    </v-chip>
                </v-row>
            </v-card-text>

            <v-card-text
                v-else
            >
                <v-btn
                    @click="$store.dispatch('tasks/DONE_TASK', {id: task.id, completed: 0, index: id})"
                    class="mx-2" outlined  color="grey">
                    Вернуть задачу
                </v-btn>
                <v-list-item-subtitle
                    class="text-wrap black--text text-left"
                    v-html="task.desc"
                />
            </v-card-text>

            <!--<vue-mouse-menu :visible="visible" :option="mouseOption">
                <v-card>
                    <v-list>
                        <v-subheader>Menu</v-subheader>
                            <v-list-item
                                v-for="(item, i) in items"
                                :key="i"
                            >
                                <v-list-item-content>
                                    <v-list-item-title v-html="item.title"/>
                                </v-list-item-content>
                            </v-list-item>
                    </v-list>
                </v-card>
            </vue-mouse-menu>-->
        </v-card>
    </v-hover>
</template>

<script>
    export default {
        name: "universal-card",
        props: {
            task: {
                type: Object,
                required: false,
                default: null
            },
            id: {
                type: Number,
                required: false,
                default: null
            }

        },
        components: {},
        data() {
            return {
                items: [
                    { title: 'Home', icon: 'dashboard' },
                    { title: 'About', icon: 'question_answer' },
                ],
                mouseEvent: null,
                visible: false,
                mouseOption: {},

            }
        },
        computed:{},
        methods: {
            popMenu(e) {
                let self = this;
                console.log(e)
                if (e.button === 0) {
                    self.mouseEvent = e.clientX;
                    self.visible = true
                } else if (e.movementX > 0) {
                    self.visible = false
                }
            },
            clickLi(item){
                alert(JSON.stringify(item));
                this.visible = false;
            },

            log: (item) => console.log(item),
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

<style scoped lang="scss" type="text/scss">
    .return-task {
        align-items: center;
        display: flex;
        flex: 1 1 100%;
    }

</style>
