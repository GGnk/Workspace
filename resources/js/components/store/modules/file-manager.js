let actions = {
    async LOAD_DIRECTORY({commit}, name) {
        commit("LOADER_INFO", "NULL")
        await axios.post('/obmen', {dir: name})
            .then((e) => {
                commit('LOAD_DIRECTORY', e)
                commit("LOADER_INFO","NULL")
            })
            .catch((err) => {
                commit("LOADER_INFO", 'ERROR')
                console.log(err)
            })
    },
}

let mutations = {
    LOAD_DIRECTORY (state, info) {
        console.log(info)
        state.directories = info.data.dirs
        state.files = info.data.files

    },

}

let getters = {
    all_directories: state => {
        return state.directories
    },
    all_files: state => {
        return state.files
    },
}

let state = {
    directories: [],
    files:[]
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
