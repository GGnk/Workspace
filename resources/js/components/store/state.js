let state = {
    threads: {
        chats: [],
        newThreadsCount:''
    },
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
    loaderError: false

}
export default state
