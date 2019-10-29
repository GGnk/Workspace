
let actions = {
    ADD_CONTACT({commit, state}) {
        axios.post('/admin/add-contact', state.addContact)
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

    UPDATE_INPUT_CONTACT(state, payload) {
        state.addContact[payload.key] = payload.data
    },
    ALERT_SET (state, input) {
        state.alert_message = input
    }
}

let getters = {

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
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
