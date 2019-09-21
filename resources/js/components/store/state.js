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
export default state
