let actions = {
    //TODO : доделать
    async FETCH_DATA({commit, rootGetters}) {
        await axios.get()
            .then((e) => {
                commit('LOAD_DATA', e.m_index)
            })
            .catch((err) => {
                console.log(err)
            })
    },
}

let mutations = {
    LOAD_DATA (state, data) {
        state.XMLyandex = window.m_index
    },
}

let getters = {
    title: state=> {
        return state.title
    },
    XMLyandex: state=> {
        return state.XMLyandex
    },
}

let state = {
    title: 'Саратова',
    XMLyandex: '',
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

