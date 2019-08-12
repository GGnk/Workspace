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
        state.threads = e.data.threads
        state.threads.chats = e.data.threads.chats? e.data.threads.chats: []
        state.users = e.data.users
        state.auth_user = e.data.auth_user
        state.users_list = e.data.users_list
        state.chat = {}
    },
    GET_CHAT (state, e) {
        let index = state.threads.chats.findIndex(el => el.id === e.data.chat.id);
        state.threads.chats[index].UnreadMessagesCount = 0

        state.chat = e.data.chat
        state.send.id = e.data.chat.id
        state.users = e.data.users
    },
    UPDATE_CHAT (state, chat) {
        state.send = chat
    },
    SEND_CHAT (state, message) {
        state.chat = message.data.thread.chat
        let index = state.threads.chats.findIndex(el => el.id === message.data.thread.chat.id);
        state.threads.chats.splice(index, 1)
        state.threads.chats.unshift(message.data.thread.chat)
        state.send.message = ''
        if (process.env.NODE_ENV !== 'production') console.log(message.statusText)
    },
    CHAT_REMOVE (state, chat) {
        state.threads.chats.splice(state.threads.chats.findIndex(el => el.id === chat), 1)

        if (process.env.NODE_ENV !== 'production') console.log("Чат с id:" + chat + " был удален!")
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
        state.threads.chats.unshift(e.data.chat)
        if (process.env.NODE_ENV !== 'production') console.log("Чат с id:" + e.data.chat.id + " был создан")
    },
    LISTEN_CHAT_REMOVE (state, e) {
        // TODO: сделать обновление одного элемента в списке
        // let index = this.threads.chats.findIndex(el => el.id === e.data.chat.id);
        // this.threads.chats.splice(index, 1)
        //
        // if (process.env.NODE_ENV !== 'production') console.log("Чат с id:" + e.data.chat.id + " был удален!")
    }

}

export default mutations
