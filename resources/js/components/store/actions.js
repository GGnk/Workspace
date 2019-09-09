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
        /*console.log($('meta[name="csrf-token"]').attr('content'))
        let config = {
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        }*/
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
                console.log('Получили от сервера '+ e.data)
                commit("CHAT_REMOVE", idChat)
                commit("LOADER_INFO", "NULL")
            })
            .catch((err) => {
                commit("LOADER_INFO", "ERROR")
                console.log(err)
            })
    },

}

export default actions
