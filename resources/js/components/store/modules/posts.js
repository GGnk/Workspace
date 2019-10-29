
let actions = {
    ADD_POST({commit, state}) {
        // TODO: поставить /admin/add-contact
        axios.post('/add-post', state.addPost)
            .then(response => {
                commit('ADD_POST', response)

            })
            .catch(err => {
                console.log(err)
            })

    }

}

let mutations = {
    ADD_POST (state, response) {
        if (response.data.error) {
            state.error = response.data.error
        } else if (response.data.message) {
            state.message = response.data.message
            state.alert_message = true
        }
        console.log(response)
    },
    ALERT_SET (state, input) {
        state.alert_message = input
    },
    UPDATE_INPUT_POST(state, payload) {
        state.addContact[payload.key] = payload.data
    }
}

let getters = {
    /*get_message: state =>{
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
    }*/
}

let state = {

    addContact: {
        profession: '',
        name: '',
        sort:1,
        email:'',
        phone:''
    },

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
