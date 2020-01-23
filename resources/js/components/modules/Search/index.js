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
    async SEARCH_INFO({commit, state}, searchModule) {
        if ((state.input_search.length || state.input_search_posts.length) > 2) {
            state.loading = true
            commit("SEARCH_MODULE", searchModule)
        await axios.get(state.search_module, {
            params: {
                keywords: (searchModule === 'posts'? state.input_search_posts:state.input_search).replace(/,/g, '*,')
            }
        })
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
        if (state.search_module === '/admin/search-posts') {
            state.results = {
                people: [],
                build: [],
                business: [],
                posts:  response.data
            }
        } else if (response.data.error){
            state.error = response.data.error

            state.results = {
                people: [],
                build: [],
                business: [],
                posts: []
            }
            console.log(state.error)
        } else {
            state.error = response.data.message
            state.results = {
                people: response.data.people,
                build: response.data.build,
                business: response.data.business,
                posts:  response.data.posts
            }
        }
    },
    INPUT_SET (state, input) {
        state.input_search = input
    },
    INPUT_SET_POSTS (state, input) {
        state.input_search_posts = input
    },
    /**
     * @return {boolean}
     */
    DELETE_CONTACT(state, payload) {
        if (payload.server_message.type === 'success') {
            state.results[payload.cat].splice(payload.index, 1)
        }
    },
    MODE_SEARCH(state, value) {
        state.switchModeSearch = value
    },
    SEARCH_MODULE(state, value) {
        if (value === 'contacts') {
            state.search_module = '/search_contacts'
        } else if (value === 'posts'){
            state.search_module = '/admin/search-posts'
        } else {
            state.search_module = '/searchInfo'
        }

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
    get_input_search_posts: state=> {
        return state.input_search_posts
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
        business: [],
        posts: []
    },
    search_module: '/searchInfo',
    switchModeSearch: false,
    input_search: '',
    input_search_posts: '',
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
