let actions = {
    HIDE_KEYBOARD({state, rootState, commit, dispatch}) {
        if (state.value.length === state.length) {
            axios.post('/pin', {pin: state.value})
                .then((e) => {
                    if (e.data == 'yes') {
                        state.In = 'security-in3'
                        dispatch('config/INITIAL_BOOT', '', {root: true})
                        rootState.config.home.pincode = false
                    } else {
                        state.In = 'security-in2'
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else commit('HANDLE_SUBMIT')
    }
}

let mutations = {
    HANDLE_SUBMIT(state) {
        state.In = 'security-in1'
    },
    VAR_EDIT (state, payload) {
        state[payload.key] = payload.value
    }
}

let getters = {
    uuid: () =>{
        return Math.random().toString(36).substring(3, 8)
    },
    value: state =>{
        return state.value
    },
    In: state =>{
        return state.In
    },
    length: state =>{
        return state.length
    },
    placeholder: state =>{
        return state.placeholder
    },
    theme: state =>{
        return state.theme
    },

}

let state = {
    value: '',
    In:  'security-in1',
    uuid: '',
    length: 4,
    placeholder: '0',
    theme:  'block'
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
