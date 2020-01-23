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
                <v-card>
                    <v-card-title class="headline">{{dialogFormTitle}}</v-card-title>

                    <v-card-text>
                        <v-form
                            v-model="valid"
                        >
                            <v-row>
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
                                <v-col>
                                    <v-text-field
                                        v-model="post_title"
                                        :rules="get_rules.post_title"
                                        label="Заголовок"
                                        required
                                    />
                                </v-col>
                            </v-row>

                            <v-textarea
                                v-model="post_desc"
                                :rules="get_rules.post_desc"
                                label="Описание"
                                rows="15"
                                required
                            />
                            <v-file-input
                                v-if="dialogFormUpdate"
                                v-model="post_files"
                                :rules="get_rules.post_files"
                                placeholder="Загрузите документы"
                                label="Файлы"
                                multiple
                                prepend-icon="mdi-paperclip"
                            >
                                <template v-slot:selection="{ text }">
                                    <v-chip
                                        small
                                        label
                                        color="primary"
                                    >
                                        {{ text }}
                                    </v-chip>
                                </template>
                            </v-file-input>
                            <v-tooltip
                                v-else
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
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

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
            </v-dialog>
        </v-toolbar>

        <v-list two-line>
            <template
                v-for="(post, index) in (get_results_search.posts && get_results_search.posts.length ?get_results_search.posts: get_posts)"

            >
                <v-list-item
                    :key="index"
                    title=""
                >
                    <v-list-item-avatar v-if="post.img">
                        <v-img :src="'/storage/'+post.img"/>
                    </v-list-item-avatar>
                    <v-list-item-avatar v-else>
                        <v-icon>mdi-camera</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-text="post.title"/>
                        <v-list-item-subtitle>
                            <span class='text--primary'>{{post.author.name.replace(/(\S)\S* (\S+) (\S)\S*/, '$2 $3.$1.')}}</span> &mdash;
                            {{post.description }}
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-list-item-action-text>
                            Создан {{post.created_at | moment}}
                        </v-list-item-action-text>
                        <v-card
                            flat
                        >
                            <v-tooltip
                                v-for="(file, i) in post.files"
                                :key="i"
                                bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon :href="'/storage/'+file.path" v-on="on" title="" target="_blank">
                                        <v-icon>insert_drive_file</v-icon>
                                    </v-btn>
                                </template>
                                <span>{{file.name}}</span>
                            </v-tooltip>
                            <v-menu bottom left>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        icon
                                        v-on="on"
                                    >
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item
                                        @click="$store.commit('posts/DIALOG_FORM_OPEN', {index: index, post: post})"
                                    >
                                        <v-list-item-title>Редактировать</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                        @click=""
                                    >
                                        <v-list-item-title>В закладки</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                        @click=""
                                    >
                                        <v-list-item-title>Удалить</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-card>
                    </v-list-item-action>
                </v-list-item>

                <v-divider
                    v-if="index + 1 < get_posts.length"
                    style="margin: 0!important;"
                />
            </template>
        </v-list>

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
            editPost: false
        }),
        computed: {
            ...mapGetters('posts' ,['get_posts', 'get_post',
                'dialogForm', 'dialogFormButtomTitle', 'dialogFormTitle', 'dialogFormUpdate',
                'get_message', 'get_rules', 'dialogFormValid', 'get_alert', 'get_alert_message',
            ]),
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

        }
    }
</script>

<style scoped>

</style>
