let actions = {
    async INITIAL_BOOT({commit}) {
        await axios.post('/initial')
            .then((info) => {
                commit('INITIAL_BOOT', info)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    INSPECTOR(){
        axios.interceptors.request.use(config => {
            console.log('Исходящий запрос на '+config.url)
            console.log('Ответ: '+config.data)
            return config
        })
    }

}

let mutations = {
    INITIAL_BOOT(state, info) {
        if(info.data.auth) {
            state.auth_user = info.data.user
            state.setting = info.data.setting
        } else {
            state.auth_user = false
        }
    },
    LOADER_INFO (state, err) {
        if (state.loaderRequest && err !== 'ERROR') {
            state.loaderRequest = false
            state.loaderError = false
        }else if(state.loaderRequest && err === 'ERROR') {
            state.loaderRequest = false
            state.loaderError = true
        }else {
            state.loaderRequest = true
        }
    },
}

let getters = {
    auth: state => {
        return state.auth_user
    }
}

let state = {
    auth_user: false,
    setting: {
        default: 1
    },
    admin: false,
    loaderRequest: false,
    loaderError: false,
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}
