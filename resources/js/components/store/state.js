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
    currentTab: 'chats',
    showChat: 'notshow',
    tabss: [
        {
            icon: 'fa fa-users',
            name: 'chats',
            title: 'Чат'
        }, 
        {
            icon: 'fa fa-folder-open',
            name: 'file_manager',
            title: 'Файловый менеджер'
        }
    ],

    isWriting: false,
    setTimer: false


}
export default state
