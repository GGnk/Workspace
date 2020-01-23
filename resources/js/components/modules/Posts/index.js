
let actions = {
    FETCH_DATA({commit}) {
        axios.get('/admin/posts')
            .then(e => {
                commit('GET_DATA', e.data)
            })
            .catch(err => {
                console.log(err)
            })

    },
    async SAVE_POST({state, commit, dispatch, rootGetters}) {
        if (rootGetters['config/auth']) {
            if (state.dialogFormValid) {
                if (state.postIndex > -1) {
                    dispatch('UPDATE_POST')
                } else {
                    dispatch('ADD_POST')
                }
                commit('DIALOG_FORM_CLOSE')
            } else commit('ALERT_MESSAGE', {type: 'warning', text: 'Неправильно заполнена форма!'})

        } else console.log('Доступно только авторизованным пользователям!')
    },
    async ADD_POST({state, commit}) {
        let formData = new FormData()
        if(state.post.img) formData.append("img", state.post.img, state.post.img.name)
        formData.append("title", state.post.title)
        formData.append("description", state.post.description)
        if(state.post.files.length){
            let countFile = 1
            $.each(state.post.files, function (key, value) {
                formData.append('files'+countFile, value);
                countFile++
            });
        }

        await axios.post(`/admin/posts`, formData)
            .then((e) => {
                commit('POST_ADD', e.data.post)
                commit('ALERT_MESSAGE', {type: e.data.message.type, text: e.data.message.text})
                commit('DIALOG_FORM_CLOSE')
            })
            .catch((err) => {
                console.log(err)
            })
    },
    async UPDATE_POST({commit}) {
        await axios.put(`/admin/posts`, {post: state.post, method: 'put'})
            .then((e) => {
                commit('POST_UPDATE', {oldTask: state.cachePost, newTask: e.data})
            })
            .catch((err) => {
                console.log(err)
            })
    },

}

let mutations = {
    GET_DATA (state, data) {
        state.posts = data.posts
        state.message = data.message
    },
    INPUT_POST_FORM(state, payload){
        state.post[payload.vv] = payload.value
    },
    POST_UPDATE(state, payload) {},
    POST_ADD(state, post) {
        state.posts.unshift(post)
    },
    POST_DELETE(state) {
        state.posts.slice(state.postIndex, 1)
    },
    DIALOG_FORM_VALID (state, value) {
        state.dialogFormValid = value
    },
    DIALOG_FORM_OPEN (state, payload) {
        if (payload) {
            state.postIndex = payload.index
            state.post = payload.post
        }
        state.dialogForm = true
    },
    DIALOG_FORM_CLOSE (state) {
        state.dialogForm = false
        setTimeout(() => {
            state.post = Object.assign({}, state.dialogFormInput)
            state.cachePost = {}
            state.postIndex = -1
        }, 300)
    },
    ALERT_MESSAGE (state, payload) {
        state.message = {
            type: payload.type,
            text: payload.text
        }
        state.alert_message = true
    },
    ALERT_CLOSE (state) {
        state.alert_message = false
        setTimeout(() => {
            state.message = {
                    type: 'success',
                    text: ''
            }
        }, 300)
    },


}

let getters = {
    get_posts: state =>{
        return state.posts
    },
    get_rules: state =>{
        return state.rules
    },
    get_post: state =>{
        return state.post
    },

    get_alert: state => {
        return state.alert_message
    },
    get_alert_message: state =>{
        return state.message
    },

    dialogForm: state => {
        return state.dialogForm
    },
    dialogFormValid:state => {
        return state.dialogFormValid
    },
    dialogFormUpdate: state =>{
        return state.postIndex === -1
    },
    dialogFormTitle: state =>{
        return state.postIndex === -1? 'Добавляем пост':'Обновляем пост'
    },
    dialogFormButtomTitle: state =>{
        return state.postIndex === -1? 'Добавить':'Обновить'
    },
}

let state = {

    posts: [],
    post:{
        title: '',
        description: '',
        img: null,
        files: []
    },
    dialogFormInput: {
        title: '',
        description: '',
        img: null,
        files: []
    },
    cachePost: {},
    postIndex: -1,

    dialogForm: false,
    dialogFormValid: false,
    rules: {
        post_img: [
            value => {
                if(value) {
                    return value.size < 2097152 || 'Картинка не может быть больше 2 MB!'
                }
                return true
            },
        ],
        post_title: [
            value => !!value || 'Заголовок обязателен!',
        ],
        post_desc: [
            value => !!value || 'Описание обязателено!',
        ],
        post_files: [
            value => {
                if(value.length) {
                    let countSize = 0
                    value.forEach(function(item) {
                        countSize+=item.size
                    })
                    return countSize < 10485760 || 'Докуметы не должны превышать 10 MB!'
                }
                return true
            }
        ],
    },

    alert_message: false,
    message: {
        type: 'success',
        text: ''
    },
    loading: false,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
