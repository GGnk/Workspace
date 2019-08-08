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
        state.chat = message.data.chat
        let index = state.threads.chats.findIndex(el => el.id === message.data.chat.id);
        state.threads.chats.splice(index, 1,message.data.chat)
        state.send.message = ''
    },



    // Пример
/*    ADD_TODO(state, todo) {
        state.todos.unshift(todo)
    },
    DELETE_TODO(state, todo) {
        state.todos.splice(state.todos.indexOf(todo), 1)
        state.toRemove = null;
    }*/
}

export default mutations
