let actions = {
    async FETCH_DATA({commit, rootGetters}) {
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

    async SAVE_TASK({state, commit, dispatch, rootGetters}) {
        if (rootGetters['config/auth']) {
            if (state.taskIndex > -1) {
                dispatch('UPDATE_TASK')
            } else {
                dispatch('ADD_TASK')
            }
            commit('DIALOG_FORM_CLOSE')

        } else console.log('Доступно только авторизованным пользователям!')
    },
    async ADD_TASK({commit}) {
        await axios.post(`/admin/tasks`, state.task)
            .then((e) => {
                commit('TASK_ADD', e.data)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    async UPDATE_TASK({commit}) {
        await axios.put(`/admin/tasks`, {task: state.task, method: 'put'})
            .then((e) => {
                commit('TASK_UPDATE', e.data)
            })
            .catch((err) => {
                console.log(err)
            })
    },

    async DONE_TASK({commit, getters, rootGetters}, payload) {
        if (rootGetters['config/auth']) {
            await axios.put(`/admin/tasks/done`, {id: payload.id, completed: payload.completed, method: 'put'})
                .then((e) => {
                    commit('TASK_DONE', {task: e.data,index: payload.index})
                })
                .catch((err) => {
                    console.log(err)
                })
        } else console.log('Получить задачи могут только авторизованные пользователи!')
    },
    async DELETE_TASK({commit, getters, rootGetters}, task) {
        if (rootGetters['config/auth']) {
            await axios.get(`/admin/tasks/delete/`+task.id)
                .then((e) => {
                    commit('TASK_DELETE', task)
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
        let vm = this
        if(task.general === 1 && task.deps_id > 0){
            let dep_index = state.deps.findIndex(item =>  item.id === task.deps_id)
            let task_dep = state.general_tasks.findIndex(item =>  item.id === state.deps[dep_index].id)
            if(task_dep > -1){
                state.general_tasks[task_dep].tasks.unshift(task)
            }
            else {
                state.general_tasks.unshift(state.deps[dep_index])
                state.general_tasks[0].tasks.unshift(task)
            }

        }
        else {
            state.tasks.unshift(task)
        }

    },

    TASK_DELETE(state, task) {
        if(task.general === 1 && task.deps_id > 0){
            let dep_index = state.deps.findIndex(item =>  item.id === task.deps_id)
            let task_dep = state.general_tasks.findIndex(item =>  item.id === state.deps[dep_index].id)
            //TODO: доделать условие, при не нахождение
            if(task_dep > -1){
                state.general_tasks[task_dep].tasks.splice(state.general_tasks[task_dep].tasks.indexOf(task), 1)
            }
        }
        else state.tasks.splice(state.tasks.indexOf(task), 1)
    },
    TASK_DONE(state, payload) {
        if(payload.task.general === 1 && payload.task.deps_id > 0){
            let dep_index = state.deps.findIndex(item =>  item.id === payload.task.deps_id)
            let task_dep = state.general_tasks.findIndex(item =>  item.id === state.deps[dep_index].id)
            if(task_dep > -1) {
                state.general_tasks[task_dep].tasks.splice(payload.index, 1,payload.task)
            }
        }
        else {
            state.tasks.splice(payload.index, 1,payload.task)
        }
    },
    TASK_UPDATE(state, task) {
        // TODO: доделать перемешение
        if(task.general === 1  && task.deps_id > 0){
            let index = state.general_tasks.findIndex(item =>  item.id === task.deps_id)
            Object.assign(state.general_tasks[index].tasks[state.taskIndex], state.task)
        }
        else {
            Object.assign(state.tasks[state.taskIndex], state.task)
        }
    },

    EDIT_DIALOG_FORM(state, payload){
        if(payload.list === 'general'){
            let index = state.general_tasks.findIndex(item =>  item.id === payload.task.deps_id)
            state.taskIndex = state.general_tasks[index].tasks.indexOf(payload.task)
        } else {
            state.taskIndex = state.tasks.indexOf(payload.task)
        }

        state.task = Object.assign(state.task, payload.task)
        state.dialogForm = true
    },
    ENTER_TASK_FORM(state, payload){
        state.task[payload.vv] = payload.value
    },
    DIALOG_FORM_CLOSE (state) {
        state.dialogForm = false
        state.task.menu = false
        setTimeout(() => {
            state.task = Object.assign({}, state.dialogFormInput)
            state.taskIndex = -1
        }, 300)
    },

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
    task: state => {
        return state.task
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
    dialogForm: state => {
        return state.dialogForm
    },
    dialogFormTitle: state =>{
        return state.taskIndex === -1? 'Добавляем задачу':'Обновляем задачу'
    },
    dialogFormButtomTitle: state =>{
        return state.taskIndex === -1? 'Добавить':'Обновить'
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
        cat: null,
        general: 0,
        deps_id: 5
    },

    dialogFormInput: {
        title:'',
        priority: 1,
        desc: '',
        toDate: "",
        status: '',
        cat: null,
        general: 0,
        deps_id: 5
    },
    taskIndex: -1,
    dialogForm:false,

    deps: [],
    options: [
        { text: 'Низкий', value: 1 },
        { text: 'Средний', value: 2 },
        { text: 'Высокий', value: 3 }
    ],
    cat:[
        { text: 'Документ', value: 1 },
        { text: 'Прочее', value: null },
    ]
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

