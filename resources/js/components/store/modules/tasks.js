let actions = {
    async FETCH_DATA({commit}) {
        commit("LOADER_INFO", "NULL")
        await axios.get('/dialog/tasks')
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
        state.tasks = info.data[0].tasks

        console.log(state.tasks)
    },
    TASK_LIST (state, data) {
        state.tasks = data
    }

}

let getters = {
    Auser: state=> {
        return 'Ghbdtn'
    },
    sortedArray: state=> {
        return state.tasks.sort((a, b) => a.completed - b.completed)
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
    allMyList: 'all'
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
