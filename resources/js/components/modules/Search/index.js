let actions = {
    async SEARCH({commit, state}) {
        if (state.input_search.length > 2) {
            state.loading = true
            await axios.get('/search', {params: {keywords: state.input_search.replace(/,/g, '*,')}})
                .then(response => {
                    commit('INFO_SET', response)
                    state.loading = false
                })
                .catch(error => {
                    console.log(error)
                    state.loading = false
                });
        } else {
            state.error = ''
            state.results = {
                people: [],
                build: [],
                business: []
            }
        }
    },
    async SEARCH_INFO({commit, state}) {
        if (state.input_search.length > 2) {
            state.loading = true
        await axios.get('/searchInfo', {params: {keywords: state.input_search.replace(/,/g, '*,')}})
                .then(response => {
                    commit('INFO_SET', response)
                    state.loading = false
                })
                .catch(error => {
                    console.log(error)
                    state.loading = false
                });
        } else {
            state.error = ''
            state.results = {
                people: [],
                build: [],
                business: []
            }
        }
    },

    SWITCH_MODE_SEARCH({dispatch, state}) {
        if (state.switchModeSearch) {
            dispatch('SEARCH')
        } else {
            dispatch('SEARCH_INFO')
        }
    }
}

let mutations = {
    INFO_SET (state, response) {
        if (response.data.error) {
            state.error = response.data.error

            state.results = {
                people: [],
                build: [],
                business: []
            }
            console.log(state.error)

        } else if (response.data.message) {
            state.error = response.data.message

            state.results = {
                people: [],
                build: [],
                business: []
            }
            console.log(state.error)

        } else {
            state.error = ''
            state.results = {
                people: response.data.people,
                build: response.data.build,
                business: response.data.business
            }
        }
    },
    INPUT_SET (state, input) {
        state.input_search = input
    },
    DELETE_CONTACT(state, payload) {
        state.results[payload.cat].splice(payload.index, 1)
    },
    MODE_SEARCH(state, value) {
        state.switchModeSearch = value
    }
}

let getters = {
    get_results_search: state=> {
        return state.results
    },
    get_error_search: state => {
        return state.error
    },
    get_input_search: state=> {
        return state.input_search
    },
    loading_search: state =>{
        return state.loading
    },
    switchModeSearch: state => {
        return state.switchModeSearch
    }
}

let state = {
    results: {
        people: [],
        build: [],
        business: []
    },
    switchModeSearch: false,
    input_search: '',
    error: null,
    loading: false,
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
