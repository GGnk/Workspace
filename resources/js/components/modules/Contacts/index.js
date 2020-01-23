function inputFormData(data, log = false) {
    let formData = new FormData()
    _.forEach(data, function(item, key) {
        formData.append(key,item)
    })

    console.log(data)
    if(data.file != null && data.files.length > 0){
        let countFile = 1
        _.forEach(data.files, function (value) {
            formData.append('files'+countFile, value);
            countFile++
        });
    }

    if (log){
        formData.forEach(function (item, key) {
            console.log(`${key}` +' => '+`${item}`)
        })
    }

    return formData
}
let actions = {
    ADD_CONTACT({commit, state}) {
        let formData = inputFormData(state.addContact,true)

        axios.post('/admin/add-contact', formData)
            .then(response => {
                commit('INFO_CONTACT', response)
            })
            .catch(err => {
                console.log(err)
            })
    },
    EDIT_CONTACT({commit}, contact) {
        commit('CACHE_INPUT_CONTACT', contact)

        let formData = inputFormData(contact,true)

        axios.post('/admin/edit-contact', formData)
            .then(response => {
                commit('INFO_CONTACT', response)
            })
            .catch(err => {
                state.message = {
                    text: "Все пошло не по плану! А ты авторизован?",
                    type: 'error'
                }
                state.alert_message = true
                console.log(err)
            })
    },
    DELETE_CONTACT({commit, state}, payload) {
        console.log(payload)
        axios.get('/admin/delete-contact/'+payload.item.id)
            .then(response => {
                commit('INFO_CONTACT', response)
                commit('DELETE_CONTACT', {item: payload.item, index: payload.index, cat: payload.cat, server_message: response.data.message}, { root: true })
            })
            .catch(err => {
                state.message = {
                    text: "Все пошло не по плану! А ты авторизован?",
                    type: 'error'
                }
                state.alert_message = true
                console.log(err)
            })
    }

}

let mutations = {
    /**
     * @return {boolean}
     */
    INFO_CONTACT (state, response) {
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
    CACHE_INPUT_CONTACT(state, contact) {
        state.CacheContacts = contact
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
    },

    inputCacheContact: state => {
        return state.CacheContacts
    }
}

let state = {
    addContact: {
        profession: '',
        img: null,
        new_img: null,
        name: '',
        sort: 1,
        email:'',
        phone:'',
        files: null
    },
    CacheContacts: {},
    error: null,
    alert_message: false,
    message: {
        type: 'success',
        text: ''
    },
    loading: false
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
