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

export default mutations
