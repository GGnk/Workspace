let actions = {
    async FETCH_DATA({commit, getters}) {

            commit("LOADER_INFO", "NULL")
            await axios.get('/admin/tasks')
                .then((e) => {
                    commit('TASKS_DATA', e)
                    commit("LOADER_INFO", "NULL")
                })
                .catch((err) => {
                    commit("LOADER_INFO", 'ERROR')
                    console.log(err)
                })

    },
}

let mutations = {
    TASKS_DATA (state, info) {
        state.Auser = info.data.auth
        state.arrayTasks = info.data.tasks
        let index = info.data.tasks.findIndex(el => el.id === state.Auser.id)
        state.tasks = info.data.tasks[index].tasks
        state.Wusers = info.data.tasks.map(function (qw) {
            let name  = qw.name.replace(/(\S)\S* (\S+) (\S)\S*/, "$2 $3.$1.")
            return {id : qw.id, name : name}
        })
    },
    TASK_LIST (state, data) {
        state.intTask = data
        console.log(data)
        let index = state.arrayTasks.findIndex(el => el.id === data)
        state.tasks = state.arrayTasks[index].tasks
    }

}

let getters = {
    Auser: state=> {
        return state.Auser
    },
    sortedArray: state=> {

        return state.tasks
            // .sort((a, b) => a.completed - b.completed)
    },
    intTask: state => {
        return state.intTask = state.Auser
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
    Auser: [],
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
