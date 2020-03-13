<template>
    <v-row
        class="layout wrap"
        dense
    >
        <v-col md="8" cols="12" class="mb-2 px-sm-2 pa-0">
            <v-card :dark="$store.getters['config/theme']">
                <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    v-if="!$store.getters['config/ui_mobile']"
                >
                    <v-tab
                        v-for="(item, i) in items"
                        v-if="!item.auth || $store.getters['config/auth']"
                        :key="i"
                    >
                        {{ item.name }}
                    </v-tab>
                </v-tabs>
                <v-toolbar
                    v-if="$store.getters['config/ui_mobile']"
                    dark
                >
                    <v-app-bar-nav-icon
                        @click="$store.commit('config/HOME_CONFIG', 'drawer')"
                    />
                    <v-toolbar-title>
                        <v-btn
                            @click="vibr"
                        >
                            IT
                        </v-btn>

                        &nbsp;</v-toolbar-title>
                    <v-spacer/>
                    <v-btn
                        icon>
                        <v-badge
                            content="1"
                            bordered
                            overlap
                            color="warning"
                        >
                            <v-icon>notification_important</v-icon>
                        </v-badge>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-btn>

                </v-toolbar>
                <v-tabs-items
                    v-model="tab">
                    <v-tab-item>
                        <tasks v-if="this['config/auth']"/>
                        <v-card v-else>
                            <v-card-title>
                                Авторизуйтесь для просмотра задач
                            </v-card-title>
                            <v-card-actions>
                                <v-btn
                                    @click="$store.commit('config/HOME_CONFIG', 'pincode')"
                                    block outlined >Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-list
                            two-line
                            nav
                            dense
                            flat
                        >
                            <v-text-field
                                solo
                                :loading="loading_search"
                                autocomplete="none"
                                autofocus
                                :clearable="$store.getters['config/ui_mobile']"
                                placeholder="Поиск информации"
                                hint="Введи запрос. Не менее 3 символа!"
                                prepend-inner-icon="search"
                                v-model="input_info"
                                class="mb-3"
                                @keydown.enter="SWITCH_MODE_SEARCH()"
                                @click:clear="$store.commit('INPUT_SET', '')"
                                @keydown.esc="$store.commit('INPUT_SET', '')"
                            />
                            <v-col cols
                            class="text-right py-0">
                                <v-switch
                                    v-if="this['config/root']"
                                    v-model="ModeSearch"
                                    label="new Поиск"
                                    inset
                                    :success="ModeSearch"
                                    class="float-left ma-0"
                                    style="height: 28px"
                                />
                                <v-badge
                                    v-if="addFormUser && valid"
                                    overlap
                                    class="align-self-center"
                                >
                                    <template v-slot:badge >
                                        <v-tooltip right class="success">
                                            <template v-slot:activator="{ on }">
                                                <v-icon v-on="on" class="white--text" >keyboard</v-icon>
                                            </template>
                                            <span>Ctrl + Enter</span>
                                        </v-tooltip>
                                    </template>
                                    <v-btn
                                        class="mx-2"
                                        outlined
                                        rounded
                                        small
                                        @click="$store.dispatch('contacts/ADD_CONTACT')"
                                    >
                                        Save
                                    </v-btn>
                                </v-badge>
                                <v-btn
                                    v-if="this['config/admin']"
                                    class="mx-2"
                                    outlined
                                    rounded
                                    small
                                    @click="addFormUser = !addFormUser"
                                >
                                    <v-icon left>mdi-plus</v-icon>
                                    Добавить
                                </v-btn>
                            </v-col>

                            <v-list-item-group
                                color="primary">

                                <v-row>
                                    <v-col cols="12" v-if="get_error_search || loading_search || alert_add" class="px-2">
                                        <!--<v-skeleton-loader
                                            v-if="loading_search"
                                            height="94"
                                            type="list-item-two-line"
                                        >
                                        </v-skeleton-loader>-->
                                        <v-card
                                            v-if="get_error_search"
                                            outlined
                                            disabled
                                            style="text-align: center"
                                        >
                                            <v-card-title
                                                style="text-align: center"

                                                v-html="get_error_search"
                                            >
                                            </v-card-title>
                                        </v-card>
                                        <v-alert
                                            prominent
                                            colored-border
                                            dismissible
                                            v-model="alert_add"
                                            border="left"
                                            elevation="2"
                                            :type="this['contacts/get_message'].type"
                                            icon="mdi-account"
                                        >
                                            {{this['contacts/get_message'].text}}

                                        </v-alert>
                                    </v-col>
                                    <v-expand-transition
                                    >
                                        <v-col cols="12" v-if="addFormUser" @keyup.ctrl.enter="$store.dispatch('contacts/ADD_CONTACT')">
                                            <v-form ref="form" v-model="valid">
                                                    <v-container>
                                                        <v-row>
                                                            <v-col
                                                                cols="12"
                                                                md="5"
                                                            >
                                                                <v-file-input
                                                                    v-model="input_img"
                                                                    :rules="rules.imgRules"
                                                                    accept="image/png, image/jpeg, image/bmp"
                                                                    placeholder="Загрузите аватар"
                                                                    prepend-icon="mdi-camera"
                                                                    label="IMG"
                                                                />
                                                            </v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="7"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_name"
                                                                    :rules="rules.nameRules"
                                                                    :counter="120"
                                                                    label="ФИО (Название)"
                                                                    required
                                                                />
                                                            </v-col>

                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_profession"
                                                                    :rules="rules.nameRules"
                                                                    :counter="120"
                                                                    label="Должность"
                                                                />
                                                            </v-col>

                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_email"
                                                                    :rules="rules.emailRules"
                                                                    label="E-mail"
                                                                />
                                                            </v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_phone"
                                                                    :rules="rules.phoneRules"
                                                                    label="Телефон"
                                                                    aria-required="true"
                                                                />
                                                            </v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                            >
                                                                <v-select
                                                                    :items="sort_items"
                                                                    item-text="name"
                                                                    item-value="data"
                                                                    v-model="input_sort"
                                                                    filled
                                                                    label="Относится к "
                                                                    dense
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-form>
                                        </v-col>
                                    </v-expand-transition>
                                    <v-col class="mb-2 px-2"
                                           v-if="get_results_search.people && get_results_search.people.length > 0"
                                           :md="(get_results_search.build.length || get_results_search.business.length) > 0? 6:12"
                                    >
                                        <p class="title" style="text-align: center; margin: 0">Люди</p>
                                        <hr style="margin: 0">
                                        <v-row>
                                                <v-col
                                                    :xl="(get_results_search.build.length || get_results_search.business.length) > 0? 6:4"
                                                    :lg="(get_results_search.build.length || get_results_search.business.length) > 0? 12:6"
                                                    :sm="(get_results_search.build.length || get_results_search.business.length) > 0? 12:6"
                                                    cols
                                                    style="flex-basis: auto"
                                                    v-for="(item, i) in get_results_search.people"
                                                    :key="i"
                                                >

                                                    <miniContacts :item="item" :index="i" :cat="'people'"/>

                                                </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col class="mb-2 px-2"
                                           v-if="get_results_search.build && get_results_search.build.length > 0"
                                           :md="(get_results_search.people.length || get_results_search.business.length) > 0? 6:12"
                                    >
                                        <p class="title" style="text-align: center; margin: 0">Службы</p>
                                        <hr style="margin: 0">
                                        <v-row>
                                                <v-col
                                                    :xl="(get_results_search.people.length || get_results_search.business.length) > 0? 6:4"
                                                    :lg="(get_results_search.people.length || get_results_search.business.length) > 0? 12:6"
                                                    :sm="(get_results_search.people.length || get_results_search.business.length) > 0? 12:6"
                                                    cols
                                                    v-for="(item, i) in get_results_search.build"
                                                    :key="i"
                                                >
                                                    <miniContacts :item="item" :index="i" :cat="'build'"/>
                                                </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col class="mb-2 px-2"
                                           v-if="get_results_search.business && get_results_search.business.length > 0"
                                           :md="(get_results_search.people.length || get_results_search.build.length) > 0? 6:12"
                                    >
                                        <p class="title" style="text-align: center; margin: 0">Внешнии компании</p>
                                        <hr style="margin: 0">
                                        <v-row>
                                                <v-col
                                                    :xl="(get_results_search.people.length || get_results_search.build.length) > 0? 6:4"
                                                    :lg="(get_results_search.people.length || get_results_search.build.length) > 0? 12:6"
                                                    :sm="(get_results_search.people.length || get_results_search.build.length) > 0? 12:6"
                                                    cols
                                                    v-for="(item, i) in get_results_search.business"
                                                    :key="i"
                                                >
                                                    <miniContacts :item="item" :index="i" :cat="'business'"/>
                                                </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-list-item-group>
                        </v-list>
                    </v-tab-item>
                    <v-tab-item>
                        <posts/>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>

        <v-col  md="4"
                v-if="!$store.getters['config/ui_mobile']"
                class="mb-2 pa-0 px-sm-2">
            <v-col cols="12">
                <span class="position-relative font-weight-medium" style="bottom: 20px">Оценка больницы в Яндексе -</span> <iframe src="https://yandex.ru/sprav/widget/rating-badge/1764888666" width="150" height="50" frameborder="0"/>
            </v-col>
            <news :title="'Саратова'"/>
        </v-col>
        <v-bottom-navigation
            v-model="tab"
            dark
            shift
            fixed
            v-if="$store.getters['config/ui_mobile']"

        >

            <v-btn v-for="(item, i) in items"
                   v-if="!item.auth || $store.getters['config/auth']"
                   :key="i"
                   :value="i"
            >
                <span>{{item.name}}</span>
                <v-badge
                    v-if="item.badge"
                    :content="count_my_tasks"
                    :value="count_my_tasks"
                    overlap
                    class="v-icon"
                    color="red"
                >
                    <v-icon>{{item.icon}}</v-icon>
                </v-badge>

                <v-icon v-else>{{item.icon}}</v-icon>
            </v-btn>

        </v-bottom-navigation>
    </v-row>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'

    export default {
        name: "Dashboard",
        components: {
            'tasks': () => import('../modules/Tasks/TasksComponent'),
            'miniContacts': () => import ('../modules/Contacts/blocks/miniContacts'),
            'news':  () => import ('../modules/News/news'),
            'mac-header':  () => import ('./blocks/mac-header'),
            'posts': () => import('../modules/Posts/PostsComponent'),
        },
        data: () => ({

            tab: 1,
            items: [
                {name:'Задачи', icon: 'today' , badge: true, auth: false},
                {name: 'Контакты', icon: 'contacts' , auth: false},
                {name: 'FAQ', icon: 'sms_failed' , auth: true}
            ],
            /*Для формы добавления контакта*/
            addFormUser: false,
            valid: false,
            rules: {
                imgRules: [
                    v => !v.length || v.size < 2097152 || 'Картинка не может быть больше 2 MB!'
                ],
                phoneRules: [
                    v => !!v || 'Телефон обязателен!',
                ],
                nameRules: [
                    v => !!v || 'Потом не вспомнишь!',
                    v => v.length <= 120 || 'Name must be less than 30 characters',
                ],
                emailRules: [
                    /* v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid', */
                ]
            },
            sort_items: [
                {name: 'Пользователь', data: 1},
                {name: 'Служба', data: 2},
                {name: 'Внешняя компания', data: 3},
            ],

        }),
        computed: {
            ...mapGetters(['config/auth', 'config/user','config/admin','config/root', 'config/ui_mobile',
                'get_input_search', 'get_results_search', 'get_error_search',
                'loading_search', 'switchModeSearch',
                'contacts/get_alert','contacts/get_message',
                'contacts/inputContactName','contacts/inputContactProfession','contacts/inputContactSort',
                'contacts/inputContactEmail','contacts/inputContactPhone'
            ]),
            ...mapGetters('tasks', ['count_my_tasks']),
            ModeSearch: {
                get () {
                    return this.switchModeSearch
                },
                set (value) {
                    this.MODE_SEARCH(value)
                }
            },
            alert_add: {
                get () {
                    return this['contacts/get_alert']
                },
                set (value) {
                    this.$store.commit('contacts/ALERT_SET', value)
                }
            },
            input_info: {
                get() {
                    return this.get_input_search
                },
                set(value) {
                    this.$store.commit('INPUT_SET', value)
                }
            },
            input_img: {
                get() {
                    return this['contacts/inputContactImg']
                },
                set(value) {
                    this.$store.commit('contacts/UPDATE_INPUT_CONTACT', {key: 'img', data: value})
                }
            },
            input_name: {
                get() {
                    return this['contacts/inputContactName']
                },
                set(value) {
                    this.$store.commit('contacts/UPDATE_INPUT_CONTACT', {key: 'name', data: value})
                }
            },
            input_name_cache: {
                get() {
                    return this['contacts/inputCacheContact']
                },
                set(value) {
                    this.$store.commit('contacts/CACHE_INPUT_CONTACT', {key: 'name', data: value})
                }
            },
            input_profession: {
                get() {
                    return this['contacts/inputContactProfession']
                },
                set(value) {
                    this.$store.commit('contacts/UPDATE_INPUT_CONTACT', {key: 'profession', data: value})
                }
            },
            input_sort: {
                get() {
                    return this['contacts/inputContactSort']
                },
                set(value) {
                    this.$store.commit('contacts/UPDATE_INPUT_CONTACT', {key: 'sort', data: value})
                }
            },
            input_email: {
                get() {
                    return this['contacts/inputContactEmail']
                },
                set(value) {
                    this.$store.commit('contacts/UPDATE_INPUT_CONTACT', {key: 'email', data: value})
                }
            },
            input_phone: {
                get() {
                    return this['contacts/inputContactPhone']
                },
                set(value) {
                    this.$store.commit('contacts/UPDATE_INPUT_CONTACT', {key: 'phone', data: value})
                }
            }
        },
        created() {

        },
        mounted() {
        },
        watch: {
            input_info(newInput, oldInput) {
                this.SWITCH_MODE_SEARCH()
            }
        },
        methods: {
            ...mapActions(['SWITCH_MODE_SEARCH']),
            ...mapMutations(['MODE_SEARCH']),
            vibr(){
                window.navigator.vibrate([200, 100, 200])
            },

        }
    }
</script>

<style scoped >

</style>

