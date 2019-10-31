let actions = {
    async INITIAL_BOOT({commit}) {
        await axios.post('/initial')
            .then((info) => {
                commit('INITIAL_BOOT', info)
                commit('ACCESS_INFO')
                commit('LEFT_MENU')
            })
            .catch((err) => {
                console.log(err)
            })
    },
    INSPECTOR(){
        axios.interceptors.request.use(config => {
            console.log('Исходящий запрос на '+config.url)
            console.log(config)
            return config
        })
    }

}

let mutations = {
    INITIAL_BOOT(state, info) {
        if(info.data.auth) {
            state.user = info.data.user
            state.loggedIn = true
        } else {
            state.user = false
            state.loggedIn = false
        }
        state.setting.default = info.data.setting.default
    },
    /**
     * Access for user
     * 1 - add
     * 2 - edit
     * 3 - delete
     * 4 - view for root user
     * 5 - soft deleted
     * @return boolean
     * */
    ACCESS_INFO(state) {
        if (state.loggedIn) {
            if (state.user.role_id && state.user.role_id === 3){
                state.setting.access_admin = false
                state.setting.access_root = false
            } else if(state.user.role_id === 2) {
                state.setting.access_admin = true
                state.setting.access_root = false
            }else if(state.user.role_id === 1) {
                state.setting.access_admin = true
                state.setting.access_root = true
            }else {
                state.setting.access_admin = false
                state.setting.access_root = false
            }
            console.log('===================================')
            console.log('Доступ админа: '+ (state.setting.access_admin ? 'Да':'Нет'))
            console.log('Доступ root: '+ (state.setting.access_root ? 'Да':'Нет'))
            console.log('===================================')
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
    LEFT_MENU (state) {
        state.left_menu = [
            { icon: 'add', text: 'Создать что то' , access: state.setting.access_admin},
            { icon: 'chat_bubble', text: 'Месседжер' , access: state.loggedIn },
            { icon: 'folder_shared', text: 'Файл менеджер', access: state.loggedIn},
            { icon: 'delete', text: 'Корзина', access: state.setting.access_root},
            { icon: 'settings', text: 'Настройки' , 'replace': true, 'action': state.full_screen_setting , access: true},
            { icon: 'help', text: 'Help' , access: true},
            { icon: 'contacts', text: 'Войти' , url: '/login', access: !state.loggedIn},
            { icon: 'logout', text: 'Выйти' , url: '/logout', access: state.loggedIn},
        ]
    },
    FULL_SCREEN_MENU(state) {
        state.full_screen_setting = !state.full_screen_setting
    }
}

let getters = {
    auth: state => {
        return state.loggedIn
    },
    admin: state => {
        return state.setting.access_admin
    },
    root: state => {
        return state.setting.access_root
    },
    user: state => {
        return state.user
    },
    left_menu: state => {
        return state.left_menu
    },
    full_screen_setting: state => {
        return state.full_screen_setting
    }
}

let state = {
    user: false,
    setting: {
        access_admin: false,
        access_root: false,
        default: 1,
    },

    left_menu: {},
    full_screen_setting: false,

    loggedIn: true,

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
