let actions = {
    async ALL_CHATS({commit}) {
        commit("LOADER_INFO", "NULL")
        await axios.post('/dialog/all')
            .then((e) => {
                commit('GET_ALL_CHATS', e)
                commit("LOADER_INFO","NULL")
            })
            .catch((err) => {
                commit("LOADER_INFO", 'ERROR')
                console.log(err)
            })
    },
    async OPEN_CHAT({commit}, chatID) {
        commit("LOADER_INFO", "NULL")
        await axios.post('/dialog/show', {id: chatID})
            .then((e) => {
                commit("GET_CHAT", e)
                commit("LOADER_INFO","NULL")
            })
            .catch((err) => {
                commit("LOADER_INFO", 'ERROR')
                console.log(err)
            })

    },
    async SEND_MESSAGE({commit, state}) {
        if (state.send.message) {
            commit("LOADER_INFO", "NULL")
            await axios.post('/dialog/update', state.send)
                .then((e) => {
                    commit("SEND_CHAT", e)
                    commit("LOADER_INFO","NULL")
                })
                .catch((err) => {
                    commit("LOADER_INFO", 'ERROR')
                    console.log(err)
                })
        }
    },
    async CREATE_CHAT({commit, state}) {
        if (state.send.subject && state.send.recipients) {
            commit("LOADER_INFO", "NULL")
            await axios.post('/dialog/store', state.send)
                .then((e) => {
                    commit("CREATE_CHAT", e.data.chat)
                    commit("LOADER_INFO", "NULL")
                })
                .catch((err) => {
                    commit("LOADER_INFO", 'ERROR')
                    console.log(err)
                })
        }
    },
    async DELETE_CHAT({commit, state}, idChat) {
        commit("LOADER_INFO", "NULL")
        console.log('Отправили id: '+ idChat)
        let idUser = state.auth_user.id
        await axios.post('/dialog/delete', {idChat, idUser})
            .then((e) => {
                console.log('Получили от сервера '+ e.data.delete_id)
                commit("CHAT_REMOVE", idChat)
                commit("LOADER_INFO", "NULL")
            })
            .catch((err) => {
                commit("LOADER_INFO", "ERROR")
                console.log(err)
            })
    },

}

let getters = {
    info_chats: state => {
        return state.threads
    },
    get_chat: state => {
        return state.chat
    },

    send_chat: state => {
        return state.send
    },
    auth_u: state => {
        return state.auth_user
    },
    get_users: state => {
        return state.users
    },
    get_user_list: state => {
        return state.users_list
    },

    loader_request: state => {
        return state.loaderRequest
    },
    loader_error: state => {
        return state.loaderError
    },
    list_tabs: state => {
        return state.tabss
    },
    currentTabComponent: state => {
        return state.currentTab
    },
    show_or_notshow: state => {
        return state.showChat
    },
    user_write: state => {
        return {write: state.isWriting, time: state.setTimer}
    }


}

let mutations = {
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
    GET_ALL_CHATS (state, e) {
        console.log(e)
        state.threads = e.data.result
        state.threads.chats = e.data.result.chats? e.data.result.chats: []
        state.auth_user = e.data.auth_user
        state.users_list = e.data.users_list

    },
    GET_CHAT (state, e) {
        let index = state.threads.chats.findIndex(el => el.id === e.data.chat.id);
        state.threads.chats[index].UnreadMessagesCount = 0

        state.chat = state.threads.chats[index]
        state.chat.messages = e.data.chat.messages
        state.send.id = e.data.chat.id
        state.send.subject = state.chat.subject

        state.showChat = 'show'
    },
    UPDATE_CHAT (state, chat) {
        state.send = chat
    },
    SEND_CHAT (state, message) {

        state.chat.messages = message.data.update.chat.messages
        let index = state.threads.chats.findIndex(el => el.id === message.data.update.chat.id);
        state.threads.chats[index].latestMessage = message.data.update.chat.messages[message.data.update.chat.messages.length - 1]
        state.send.message = ''
        if (process.env.NODE_ENV !== 'production') console.log(message.statusText)
    },
    CHAT_REMOVE (state, id) {
        console.log('Отправили id в мутатор: '+ id)
        state.threads.chats.splice(state.threads.chats.findIndex(el => el.id === id), 1)

        if (process.env.NODE_ENV !== 'production') console.log("Чат с id:" + id + " был удален!")
    },
    CREATE_CHAT (state, chat) {
        state.threads.chats.unshift(chat)
        state.chat = chat
        state.send.id = chat.id
        state.send.recipients = []
        if (process.env.NODE_ENV !== 'production') console.log("Чат с id:" + chat.id + " был создан!")
    },
    LISTEN_CHAT_UPDATE (state, e) {
        let index = state.threads.chats.findIndex(el => el.id === e.chat.chat.id);
        let count = state.threads.chats[index].UnreadMessagesCount
        state.threads.chats.splice(index, 1)
        if(state.chat.id === e.chat.chat.id) {
            state.chat = e.chat.chat
        }
        // TODO: сделать онлайн
        let index2 = state.threads.chats.unshift(e.chat.chat)
        state.threads.chats[state.threads.chats.indexOf(e.chat.chat)].UnreadMessagesCount = count++

        if (process.env.NODE_ENV !== 'production') console.log('Listen chat #'+ e.chat.chat.id)
    },
    LISTEN_CHAT_CREATE (state, e) {
        // TODO:    контроллер проверить
        console.log('Сокет прислал новый чат c id: '+ e.chat.id)
        state.threads.chats.unshift(e.chat)
        if (process.env.NODE_ENV !== 'production') console.log("Чат с id:" + e.data.chat.id + " был создан")
    },
    LISTEN_CHAT_REMOVE (state, e) {
        // TODO: сделать обновление одного элемента в списке
        // let index = this.threads.chats.findIndex(el => el.id === e.data.chat.id);
        // this.threads.chats.splice(index, 1)
        //
        // if (process.env.NODE_ENV !== 'production') console.log("Чат с id:" + e.data.chat.id + " был удален!")
    },

    CURRENT_TAB (state, data) {
        state.currentTab = data
    },
    USER_WRITE(state, data) {
        state.isWriting = data
    },
    SET_TIMER(state, data) {
        state.setTimer = data
    }

}


let state = {
    threads: {
        chats: [],
        newThreadsCount:''
    },
    // Users - delete
    users:{},

    auth_user:{},
    users_list:{},
    chat: {},
    send: {
        id: '',
        message: '',
        subject: 'Сообщение',
        recipients: []
    },
    loaderRequest: false,
    loaderError: false,
    currentTab: 'mapRGD',
    showChat: 'notshow',
    tabss: [
        {
            icon: 'fa fa-users',
            name: 'chats',
            title: 'Чат',
            acsses: [1]
        },
        {
            icon: 'fa fa-folder-open',
            name: 'file_manager',
            title: 'Файловый менеджер',
            acsses: [0, 1]

        },
        {
            icon: 'fa fa-folder-open',
            name: 'mapRGD',
            title: 'Карта больницы',
            acsses: [0, 1]

        }
    ],

    isWriting: false,
    setTimer: false
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
