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
        if (rootGetters['config/auth'] && state.dialogFormValid) {
            if (state.taskIndex > -1) {
                dispatch('UPDATE_TASK')
            } else {
                dispatch('ADD_TASK')
            }
            commit('DIALOG_FORM_CLOSE')

        } else console.log('Что то пошло не так! ')
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
                commit('TASK_UPDATE', {task: e.data})
            })
            .catch((err) => {
                console.log(err)
            })
    },

    async DONE_TASK({commit, getters, rootGetters}, payload) {
        if (rootGetters['config/auth']) {
            await axios.put(`/admin/tasks/done`, {id: payload.id, completed: payload.completed, method: 'put'})
                .then((e) => {
                    commit('TASK_DONE', e.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else console.log('Доступно только авторизованным пользователям!')
    },
    async DELETE_RELATION({commit, rootGetters}, payload) {
        if (rootGetters['config/auth']) {
            let data = {task_id: payload.task_id, relation_id: payload.relation_id}
            await axios.post(`/admin/tasks/rem-relation`, data)
                .then((e) => {
                    commit('TASK_DELETE_RELATION', {task: e.data, index: payload.task_index} )
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
        state.Wusers = info.e.data.users.map(function (qw) {
            let name  = qw.name.replace(/(\S)\S* (\S+) (\S)\S*/, "$2 $3.$1.")
            return {id : qw.id, name : name}
        })

        if(info.index == -1) {
            state.tasks = []
        } else{
            state.tasks = info.e.data.tasks[info.index].tasks
        }

        state.houses = info.e.data.houses
    },
    TASK_LIST (state, data) {
        state.intTask = data
        let index = state.arrayTasks.findIndex(el => el.id === data)
        if (index == -1) {
            state.tasks = []
        }else {
            state.tasks = state.arrayTasks[index].tasks
        }
    },
    TASK_ADD(state, task) {
        state.tasks.unshift(task)
    },
    TASK_DELETE_RELATION(state, data) {
        state.tasks.splice(data.index, 1, data.task)
    },

    TASK_DELETE(state, task) {
        state.tasks.splice(state.tasks.indexOf(task), 1)
    },
    TASK_DONE(state, task) {
        let old_task = state.tasks.findIndex(task_ => task_.id === task.id)
        state.tasks.splice(old_task, 1, task)
    },
    TASK_UPDATE(state, payload) {
        state.tasks.splice(state.taskIndex, 1, payload.task)
    },

    EDIT_DIALOG_FORM(state, task){
        state.taskIndex = state.tasks.indexOf(task)

        state.cacheTask = task
        state.task = Object.assign(state.task, task)
        state.dialogForm = true
    },
    DIALOG_FORM_VALID (state, value) {
        state.dialogFormValid = value
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
        return state.tasks.filter(item => item.general === 0)
            // .sort((a, b) => a.completed - b.completed)
    },
    generalArray: state => {
        if (!state.arrayTasks) return []
        let ll = []
        for(let itemI of state.arrayTasks) {
            if(itemI.tasks.length){
                for(let item of itemI.tasks) {
                    if(item.general == 1) ll.push(item)
                }
            }
        }
        return ll
    },
    count_my_tasks: (state, getters, rootState, rootGetters) => {
        if (!state.arrayTasks.length) return 0
        let index = state.arrayTasks.findIndex(el => el.id === rootGetters['config/user'].id)
        if (index === -1) return 0
        let items = state.arrayTasks[index].tasks.filter(task => task.completed === 0 && task.general === 0)
        return items.length
    },
    count_general_tasks: (state, getters) => {
        let items = getters.generalArray.filter(item => item.completed === 0)
        return items.length
    },
    intTask: (state, getters, rootState, rootGetters) => {
        return state.intTask = rootGetters['config/user'].id
    },
    task: state => {
        return state.task
    },
    task_houses: state => {
        return state.task.house.map(function (item) {
            return item.id
        })
    },
    no_cat_task: state=> state.tasks.find(task => task.cat > 0),

    options: state=> {
        return state.options
    },
    cat: state=> {
        return state.cat
    },
    houses: state => {
        return state.houses
    },
    tasksUsers: state => {
        return state.Wusers
    },
    get_rules: state => {
        return state.rules
    },
    dialogForm: state => {
        return state.dialogForm
    },
    dialogFormValid:state => {
        return state.dialogFormValid
    },
    dialogFormTitle: state =>{
        return state.taskIndex === -1? 'Добавляем задачу':'Обновляем задачу'
    },
    dialogFormButtomTitle: state =>{
        return state.taskIndex === -1? 'Добавить':'Обновить'
    }

}

let state = {
    tasks: [],
    intTask: '',
    arrayTasks: [],
    Wusers: [],
    task: {
        priority: 1,
        desc: '',
        toDate: "",
        status: '',
        cat: 0,
        general: 0,
        house: []
    },
    cacheTask: {},

    dialogFormInput: {
        priority: 1,
        desc: '',
        toDate: "",
        status: '',
        cat: 0,
        general: 0,
        house: []
    },
    taskIndex: -1,
    dialogForm:false,
    dialogFormValid: false,
    rules: {
        task_img: [
            value => {
                if(value) {
                    return value.size < 2097152 || 'Картинка не может быть больше 2 MB!'
                }
                return true
            },
        ],
        task_desc: [
            value => !!value || 'Описание обязателено!',
        ],
        task_priority: [
            value => !!value || 'Укажите приоритет!',
        ],
        task_cat: [
            value => !!value || 'Укажите категорию!',
        ],
        task_files: [
            value => {
                if(value.length) {
                    let countSize = 0
                    value.forEach(function(item) {
                        countSize+=item.size
                    })
                    return countSize < 10485760 || 'Докуметы не должны превышать 10 MB!'
                }
                return true
            }
        ],
    },
    houses: [],
    options: [
        { text: 'Низкий', value: 1 },
        { text: 'Средний', value: 2 },
        { text: 'Высокий', value: 3 }
    ],
    cat:[
        { text: 'Документ', value: 1 },
        { text: 'Прочее', value: 0 },
    ]
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

