let actions = {
    async FETCH_DATA({commit, getters}) {
        if (getters['config/auth']) {
            await axios.get('/admin/tasks')
                .then((e) => {
                    let index = e.data.tasks.findIndex(el => el.id === getters['config/user'].id)
                    commit('TASKS_DATA', {e,index})
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
    },
    TASK_LIST (state, data) {
        state.intTask = data
        let index = state.arrayTasks.findIndex(el => el.id === data)
        state.tasks = state.arrayTasks[index].tasks
    }

};

let getters = {
    sortedArray: state=> {

        return state.tasks
            // .sort((a, b) => a.completed - b.completed)
    },
    intTask: (state, getters) => {
        return state.intTask = getters['config/user'].id
    },
    options: state=> {
        return state.options
    },
    tasksUsers: state => {
        return state.Wusers
    }

}

let state = {
    tasks: [],
    intTask: '',
    arrayTasks: '',
    Wusers: [],
    task: {
        user: '',
        priority: 1,
        desc: '',
        toDate: "",
        status: ''

    },
    taskUpd: false,
    options: [
        { text: 'Низкий', value: 1 },
        { text: 'Средний', value: 2 },
        { text: 'Высокий', value: 3 }
    ],
    MyList: ''
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
