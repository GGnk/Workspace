
let actions = {

    async GET_INFO({commit, state}) {
        state.loading = true
        await axios.get('/getInfo')
            .then(response => {
                commit('GET_INFO', response)
                state.loading = false
            })
            .catch(error => {
                console.log(error)
                state.loading = false
            });
    },
    async SEARCH_INFO({commit, state}) {
        if (state.input_search.length > 2) {
            state.loading = true
        await axios.get('/searchInfo', {params: {keywords: state.input_search.replace(/,/g, '*,')}})
                .then(response => {
                    console.log('Отправляю в обработчик')
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
    ADD_CONTACT({commit, state}) {
        // TODO: поставить /admin/add-contact
        axios.post('/add-contact', state.addContact)
            .then(response => {
                commit('ADD_CONTACT', response)

            })
            .catch(err => {
                console.log(err)
            })

    }

}

let mutations = {
    ADD_CONTACT (state, response) {
        if (response.data.error) {
            state.error = response.data.error
        } else if (response.data.message) {
            state.message = response.data.message
            state.alert_message = true
        }
        console.log(response)
    },
    GET_INFO (state, info) {
        state.info = {
            people: info.people,
            build: info.build,
            business: info.business
        }
    },
    INFO_SET (state, response) {
        console.log('Обработал')
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
            console.log(state.results)
        }
    },
    INPUT_SET (state, input) {
        state.input_search = input
    },
    ALERT_SET (state, input) {
        state.alert_message = input
    },
    UPDATE_INPUT_CONTACT(state, payload) {
        state.addContact[payload.key] = payload.data
    }
}

let getters = {
    get_info: state=> {
      return state.info
    },
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
    get_message: state =>{
        return state.message
    },
    get_alert: state => {
       return state.alert_message
    },
    inputContactName: state =>{
        return state.addContact.name
    },
    inputContactProfession: state =>{
        return state.addContact.profession
    },
    inputContactSort: state =>{
        return state.addContact.sort
    },
    inputContactEmail: state =>{
        return state.addContact.email
    },
    inputContactPhone: state =>{
        return state.addContact.phone
    }
}

let state = {
    results: {
        people: [],
        build: [],
        business: []
    },
    info: {
        people: '',
        build: '',
        business: ''
    },

    addContact: {

        profession: '',
        name: '',
        sort:1,
        email:'',
        phone:''
    },
    input_search: '',
    error: null,
    alert_message: false,
    message: {
        type: 'success',
        text: ''
    },
    loading: false,
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
