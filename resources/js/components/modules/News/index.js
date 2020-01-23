let actions = {
    //TODO : доделать
    async FETCH_DATA({commit, rootGetters, state}) {
        await axios.get('https://news.yandex.ru/Saratov/index5.utf8.js', state.option)
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
    option: {
        headers: {
            'Origin':'http://188.235.147.108:2591'
        }

    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

