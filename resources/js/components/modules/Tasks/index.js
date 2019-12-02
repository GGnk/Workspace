import {consoleInfo} from "vuetify/lib/util/console";

let actions = {
    async FETCH_DATA({commit, getters, rootGetters}) {
        if (rootGetters['config/auth']) {
            await axios.get('/admin/tasks')
                .then((e) => {
                    let index = e.data.tasks.findIndex(el => el.id === rootGetters['config/user'].id)
                    commit('TASKS_DATA', {e,index})
                })
                .catch((err) => {
                    console.log(err)
                })
        } else console.log('Получить задачи могут только авторизованные пользователи!')
    },
    async ADD_TASK({state, commit, getters, rootGetters}) {
        if (rootGetters['config/auth']) {
            await axios.post(`/admin/tasks`, state.task)
                .then((e) => {
                    commit('TASK_ADD', e.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else console.log('Получить задачи могут только авторизованные пользователи!')
    },
    async UPDATE_TASK({commit, getters, rootGetters}) {
        if (rootGetters['config/auth']) {
        await axios.put(`/admin/tasks`, {task: state.task_update, method: 'put'})
            .then((e) => {
                // commit('TASK_UPDATE', {task: e.data,index: payload.index})
            })
            .catch((err) => {
                console.log(err)
            })
        } else console.log('Получить задачи могут только авторизованные пользователи!')
    },
    async DONE_TASK({commit, getters, rootGetters}, payload) {
        if (rootGetters['config/auth']) {
            await axios.put(`/admin/tasks/done`, {id: payload.id, completed: payload.completed, method: 'put'})
                .then((e) => {
                    commit('TASK_UPDATE', {task: e.data,index: payload.index})
                })
                .catch((err) => {
                    console.log(err)
                })
        } else console.log('Получить задачи могут только авторизованные пользователи!')
    },
    async DELETE_TASK({commit, getters, rootGetters}, payload) {
        if (rootGetters['config/auth']) {
            await axios.get(`/admin/tasks/delete/`+payload.id)
                .then((e) => {
                    commit('TASK_DELETE', {index: payload.index})
                })
                .catch((err) => {
                    console.log(err)
                })
        } else console.log('Получить задачи могут только авторизованные пользователи!')
    },
}

let mutations = {
    TASKS_DATA (state, info) {
        state.arrayTasks = info.e.data.tasks
        state.tasks = info.e.data.tasks[info.index].tasks
        state.Wusers = info.e.data.tasks.map(function (qw) {
            let name  = qw.name.replace(/(\S)\S* (\S+) (\S)\S*/, "$2 $3.$1.")
            return {id : qw.id, name : name}
        })
        state.general_tasks = info.e.data.general_tasks
        state.deps = info.e.data.deps
    },
    TASK_LIST (state, data) {
        state.intTask = data
        let index = state.arrayTasks.findIndex(el => el.id === data)
        state.tasks = state.arrayTasks[index].tasks
    },
    TASK_ADD(state, task) {
        state.dialogAddTask = false
        state.tasks.unshift(task)
        state.task = {
                        title:'',
                        priority: 1,
                        desc: '',
                        toDate: "",
                        status: '',
                        cat: null
                    }
    },
    TASK_DELETE(state, payload) {
        state.tasks.splice(payload.index, 1)
    },
    TASK_UPDATE(state, payload) {
        state.tasks.splice(payload.index, 1,payload.task)
    },
    DIALOG_ADD(state) {
        state.dialogAddTask = !state.dialogAddTask
    },
    DIALOG_UPDATE(state, task) {
        state.task_update = {}
        state.dialogUpdateTask = !state.dialogUpdateTask
    },
    DIALOG_LOAD_DATA(state, task) {
        state.task_update = task
        state.dialogUpdateTask = !state.dialogUpdateTask
    },
    TASK_ADD_DATA(state, payload) {
        state.task[payload.vv] = payload.value
    },
    TASK_UPDATE_DATA(state, payload) {
        state.task_update[payload.vv] = payload.value
    },
    MENU_MODE(state) {
        state.menuMode.active = !state.menuMode.active
    }
}

let getters = {
    sortedArray: state=> {
        return state.tasks
            // .sort((a, b) => a.completed - b.completed)
    },
    general_tasks: state=> {
        return state.general_tasks
    },
    intTask: (state, getters, rootState, rootGetters) => {
        return state.intTask = rootGetters['config/user'].id
    },
    options: state=> {
        return state.options
    },
    cat: state=> {
        return state.cat
    },
    deps: state => {
        return state.deps
    },
    tasksUsers: state => {
        return state.Wusers
    },
    dialogAddTask: state => {
        return state.dialogAddTask
    },
    dialogUpdateTask: state => {
        return state.dialogUpdateTask
    },

    task: state => {
        return state.task
    },
    task_update:state => {
        return state.task_update
    },
    menuMode: state => {
        return state.menuMode
    }

}

let state = {
    tasks: [],
    general_tasks: [],
    intTask: '',
    arrayTasks: '',
    Wusers: [],
    task: {
        title:'',
        priority: 1,
        desc: '',
        toDate: "",
        status: '',
        cat: null
    },

    task_update:{
    },
    deps: [],

    options: [
        { text: 'Низкий', value: 1 },
        { text: 'Средний', value: 2 },
        { text: 'Высокий', value: 3 }
    ],
    cat:[
        { text: 'Документ', value: 1 },
        { text: 'Прочее', value: null },
    ],
    MyList: '',
    dialogAddTask:false,
    dialogUpdateTask:false,
    menuMode: {
        list: [
            { title: 'Редактировать', dispatch: false, module: 'DIALOG_LOAD_DATA' },
            { title: 'Удалить', dispatch: true, module: 'DELETE_TASK' }
        ]
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

