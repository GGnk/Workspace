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

    /*  Пример
        newTodo: state => {
            return state.newTodo
        },
        completed: state => {
            return state.todos.filter(todo => todo.completed === true)
        },
        remaining: state => {
            return state.todos.filter(todo => todo.completed === false)
        }*/
}

export default getters
