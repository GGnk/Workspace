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
        commit("LOADER_INFO", "NULL")
        if (state.send.message) {
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
                    state.chat = e.data.chat
                    state.send.id = e.data.chat.id
                    state.send.recipients = []
                    commit("LOADER_INFO", "NULL")
                })
                .catch((err) => {
                    commit("LOADER_INFO", 'ERROR')
                    console.log(err)
                })
        }
    },

/* Пример
    ADD_TODO({
                 commit
             }, todo) {
        axios.post('/api/todos', todo)
            .then(res => {
            if (res.data === "added")
                console.log('ok')
        })
            .catch(err => {
            console.log(err)
        })
    },
    UPDATE_TODO({commit}, todo) {
        axios.put(`/api/todos/${todo.id}`, todo)
            .then(res => {
                if (res.data === 'updated')
                    console.log("updated ")
            })
            .catch(err => {console.log(err)})

    },
    GET_TODOS({commit}) {
        axios.get('/api/todos')
            .then(res => {
                {
                    console.log(res.data)
                    commit('GET_TODOS', res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }*/
}

export default actions
