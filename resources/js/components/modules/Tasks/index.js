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
        } else console.log('Доступно только авторизованным пользователям!')
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
                commit('TASK_UPDATE', {oldTask: state.cacheTask, newTask: e.data})
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
        } else console.log('Доступно только авторизованным пользователям!')
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
        } else console.log('Доступно только авторизованным пользователям!')
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
    TASK_UPDATE(state, payload) {
        // TODO: исправить перемешение (удалять старые)
        if (payload.newTask.general == false) {
                if(payload.oldTask.general == payload.newTask.general) {
                    Object.assign(state.tasks[state.taskIndex], payload.newTask)
                    console.log('Свой список, действующий ')
                }
                else {
                    let indexDep = state.general_tasks.findIndex(item =>  item.id === payload.oldTask.deps_id)
                    state.general_tasks[indexDep].tasks.splice(state.taskIndex, 1)

                    state.tasks.unshift(payload.newTask)
                    console.log('Свой список, новый ')
                }
        }
        else {
            if (payload.oldTask.general == payload.newTask.general) {
                let indexDep = state.general_tasks.findIndex(item => item.id === payload.newTask.deps_id)

                if(payload.oldTask.deps_id === state.general_tasks[indexDep].id) {
                    Object.assign(state.general_tasks[indexDep].tasks[state.taskIndex], payload.newTask)
                } else {
                    if (indexDep > -1) {
                        state.general_tasks[indexDep].tasks.unshift(payload.newTask)

                    } else {
                        indexDep = state.deps.findIndex(item => item.id === payload.newTask.deps_id)
                        state.general_tasks.unshift(state.deps[indexDep])
                        state.general_tasks[0].tasks.unshift(payload.newTask)
                    }
//Todo:Либо доделать удаление , либо перепланировать обьект\массив general
                    indexDep = state.general_tasks.findIndex(item => item.id === payload.oldTask.deps_id)
                    let item = state.general_tasks[indexDep].findIndex(item => item.id === payload.oldTask.id)
                    if(item > -1) {
                        state.general_tasks[indexDep].splice(item, 1)
                    }
                }

                console.log('Общий список, действующий ')
            } else {
                state.tasks.splice(state.taskIndex, 1)

                let indexDep = state.deps.findIndex(item => item.id === payload.newTask.deps_id)
                let indexDepGeneral = state.general_tasks.findIndex(item => item.id === state.deps[indexDep].id)
                if (indexDepGeneral > -1) {
                    state.general_tasks[indexDepGeneral].tasks.unshift(payload.newTask)
                } else {
                    state.general_tasks.unshift(state.deps[indexDep])
                    state.general_tasks[0].tasks.unshift(payload.newTask)
                }

                console.log('Общий список, новый ')
            }
        }
    },

    EDIT_DIALOG_FORM(state, payload){
        if(payload.list === 'general'){
            let index = state.general_tasks.findIndex(item =>  item.id === payload.task.deps_id)
            state.taskIndex = state.general_tasks[index].tasks.indexOf(payload.task)
        } else {
            state.taskIndex = state.tasks.indexOf(payload.task)
        }
        state.cacheTask = payload.task
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
            state.cacheTask = {}
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
    cacheTask: {},

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

