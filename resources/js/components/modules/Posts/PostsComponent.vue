<template>
    <v-card
        class="mx-auto"
    >
        <v-snackbar
            v-model="alert"
            :color="get_alert_message.type"
            right
            :timeout="5000"
            top
        >
            {{get_alert_message.text}}
            <v-btn
                dark
                text
                @click="$store.commit('posts/ALERT_CLOSE')"
            >
                Close
            </v-btn>
        </v-snackbar>
        <v-toolbar
            color="white"
        >
            <v-text-field
                append-icon="search"
                v-model="input_posts"
                label="Найти"
                :loading="loading_search"
                @keydown.enter="$store.dispatch('SEARCH_INFO','posts')"
                @keydown.esc="$store.commit('INPUT_SET', '')"
                single-line
                hide-details
            />
            <v-btn
                @click="$store.commit('posts/DIALOG_FORM_OPEN')"
                color="primary" icon dark class="mb-2" >
                <v-icon>add</v-icon>
            </v-btn>
            <v-dialog v-model="dialog">
                <v-form
                    v-model="valid"
                >
                    <v-row
                        class="ma-0"
                    >
                            <v-col
                                cols="4"
                                class="pa-0"
                                style="display: grid"
                            >
                                <v-card>
                                    <v-card-title class="headline">{{dialogFormTitle}}</v-card-title>

                                    <v-card-text>
                                        <v-col class="text-center">
                                            <v-file-input
                                                v-if="dialogFormUpdate"
                                                v-model="post_img"
                                                :rules="get_rules.post_img"
                                                accept="image/png, image/jpeg, image/bmp"
                                                placeholder="Загрузите картинку для поста"
                                                prepend-icon="mdi-camera"
                                                label="IMG"
                                            />
                                            <v-hover v-else>
                                                <template
                                                    v-slot:default="{ hover}">
                                                    <div>
                                                        <v-avatar
                                                            size="150"
                                                            tile
                                                        >
                                                            <img
                                                                v-if="post_img"
                                                                :src="'/storage/'+post_img"
                                                            >
                                                            <v-icon v-else>mdi-camera</v-icon>
                                                        </v-avatar>
                                                        <v-fade-transition>
                                                            <v-overlay
                                                                v-if="hover"
                                                                absolute
                                                                color="#036358"
                                                            >
                                                                <v-btn>{{post_img?'Сменить картинку':'Загрузить картинку' }}</v-btn>
                                                            </v-overlay>
                                                        </v-fade-transition>
                                                    </div>
                                                </template>
                                            </v-hover>
                                        </v-col>
                                        <v-file-input
                                            v-model="post_files"
                                            :rules="get_rules.post_files"
                                            placeholder="Загрузите документы"
                                            label="Файлы"
                                            multiple
                                            prepend-icon="mdi-paperclip"
                                        />
                                        <v-tooltip
                                            v-for="(file, i) in post_files"
                                            :key="i"
                                            bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon :href="'/storage/'+file.path" v-on="on" title="" target="_blank">
                                                    <v-icon>insert_drive_file</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{file.name}}</span>
                                        </v-tooltip>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer/>
                                        <v-btn
                                            color="green darken-1"
                                            text
                                            @click="$store.commit('posts/DIALOG_FORM_CLOSE')"
                                        >
                                            Отмена
                                        </v-btn>

                                        <v-btn
                                            color="green darken-1"
                                            text
                                            @click="$store.dispatch('posts/SAVE_POST')"
                                        >
                                            {{dialogFormButtomTitle}}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col
                                class="pa-0"
                                cols="8"
                                style="display: grid"
                            >
                                <v-card>
                                    <v-card-title
                                        @dblclick="editP('title')"
                                        class="headline">
                                        <p>{{ edit.title? '': post_title}}</p>
                                        <v-text-field
                                            v-if="edit.title"
                                            @blur="endEditP('title')"
                                            v-model="post_title"
                                            :rules="get_rules.post_title"
                                            label="Заголовок"
                                            required
                                        />
                                    </v-card-title>

                                    <v-card-text
                                        @dblclick="editP('desc')"
                                    >
                                        <div v-html="edit.desc? '':post_desc"/>
                                            <v-textarea
                                                v-if="edit.desc"
                                                @blur="endEditP('desc')"
                                                v-model="post_desc"
                                                :rules="get_rules.post_desc"
                                                label="Описание"
                                                rows="15"
                                                required
                                            />
                                    </v-card-text>
                                </v-card>
                            </v-col>
                    </v-row>
                </v-form>
            </v-dialog>
        </v-toolbar>

        <v-row class="ma-0">
            <v-col
                v-for="(post, index) in (get_results_search.posts && get_results_search.posts.length ?get_results_search.posts: get_posts)"
                :key="index"
                :cols="ui_mobile ? 12: 6"
            >
                <v-card
                    outlined
                    class="mx-auto"
                >
                    <v-list-item>
                        <v-list-item-avatar v-if="post.img">
                            <v-img :src="'/storage/'+post.img"/>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="headline text-wrap" v-text="post.title"/>
                            <v-list-item-subtitle>
                                <span>{{post.author.name.replace(/(\S)\S* (\S+) (\S)\S*/, '$2 $3.$1.')}}</span>
                                <span class="position-absolute" style="right: 10px">{{post.created_at | moment}}</span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-card-text>
                        {{post.description }}
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            text
                            color="deep-purple accent-4"
                            @click="$store.commit('posts/DIALOG_FORM_OPEN', {index: index, post: post})"
                        >
                            Прочитать
                        </v-btn>
                        <v-spacer/>
                        <v-badge
                            :content="post.files.length"
                            :value="post.files.length"
                            color="green"
                            overlap
                            class="mr-2"
                        >
                            <v-btn icon >
                                <v-icon large>insert_drive_file</v-icon>
                            </v-btn>
                        </v-badge>
                        <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-share-variant</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Posts",
        components: {
            // 'mac-header':  () => import ('./etc/mac-header')
        },
        props: [],
        data:() => ({
            overlay: false,
            editPost: false,
            edit: {
                title: false,
                desc: false
            }
        }),
        computed: {
            ...mapGetters('posts' ,['get_posts', 'get_post',
                'dialogForm', 'dialogFormButtomTitle', 'dialogFormTitle', 'dialogFormUpdate',
                'get_rules', 'dialogFormValid', 'get_alert', 'get_alert_message',
            ]),
            ...mapGetters('config',['ui_mobile']),
            ...mapGetters(['get_input_search_posts', 'get_results_search', 'get_error_search',
                'loading_search', 'switchModeSearch']),
            input_posts: {
                get() {
                    return this.get_input_search_posts
                },
                set(value) {
                    this.$store.commit('INPUT_SET_POSTS', value)
                }
            },
            dialog: {
                get() {
                    return this.dialogForm
                },
                set(value) {
                    this.$store.commit('posts/DIALOG_FORM_CLOSE')
                }
            },
            alert: {
                get() {
                    return this.get_alert
                },
                set(value) {
                    this.$store.commit('posts/ALERT_CLOSE')
                }
            },
            valid: {
                get() {
                    return this.dialogFormValid
                },
                set(value) {
                    this.$store.commit('posts/DIALOG_FORM_VALID', value)
                }
            },
            post_title: {
                get() {
                    return this.get_post.title
                },
                set(value) {
                    this.$store.commit('posts/INPUT_POST_FORM', {vv: 'title', value})
                }
            },
            post_desc: {
                get() {
                    return this.get_post.description
                },
                set(value) {
                    this.$store.commit('posts/INPUT_POST_FORM', {vv: 'description', value})
                }
            },
            post_img: {
                get() {
                    return this.get_post.img
                },
                set(value) {
                    this.$store.commit('posts/INPUT_POST_FORM', {vv: 'img', value})
                }
            },
            post_files: {
                get() {
                    return this.get_post.files
                },
                set(value) {
                    this.$store.commit('posts/INPUT_POST_FORM', {vv: 'files', value})
                }
            },
        },
        created() {
            this.FETCH_DATA()
        },
        mounted() {
        },
        watch: {
            input_posts(newInput, oldInput) {
                this.SEARCH_INFO('posts')
            }
        },
        filters: {
            moment: function (date) {
                moment.locale('ru')
                return moment(date).fromNow()
            }
        },
        methods:{
            ...mapActions('posts', ['FETCH_DATA']),
            ...mapActions(['SEARCH_INFO']),

            editP(key) {
                this.edit[key] = true
            },
            endEditP(key) {
                this.edit[key] = false
            }

        }
    }
</script>

<style scoped>

</style>
