let actions = {
    async LOAD_DIRECTORY({commit}, payload) {
        commit("LOADER_INFO", "NULL")
        await axios.post('/obmen', {'dir': payload.next})
            .then((info) => {
                commit('LOAD_DIRECTORY', {info, 'prev': payload.prev})
                commit("LOADER_INFO","NULL")
            })
            .catch((err) => {
                commit("LOADER_INFO", 'ERROR')
                console.log(err)
            })
    },
}

let mutations = {
    LOAD_DIRECTORY (state, payload) {
        state.prev = payload.prev
        state.directories = payload.info.data.dirs
        state.files = payload.info.data.files

        console.log(payload.prev)

    },

}

let getters = {
    all_directories: state => {
        return state.directories
    },
    all_files: state => {
        return state.files
    },
    get_prev_folder: state => {
        return state.prev ? state.prev:''
    }
}

let state = {
    directories: [],
    files:[],
    prev: ''
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
