<template>
    <v-row
        class="layout wrap"
        dense
    >
        <v-col lg="9" sm="9" xs="12" class="mb-2 px-2">
            <v-card :dark="$store.getters['config/theme']">
                <v-tabs
                    v-model="tab"
                    background-color="transparent"
                >
                    <v-tab
                        v-for="(item, i) in items"
                        :key="i"
                    >
                        {{ item }}
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item >
                        <tasks v-if="this['config/auth']"></tasks>
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
                        >

                            <v-text-field
                                solo
                                :loading="loading_search"
                                autocomplete="none"
                                autofocus
                                placeholder="Поиск информации"
                                hint="Введи запрос. Не менее 3 символа!"
                                prepend-inner-icon="search"
                                v-model="input_info"
                                @keydown.enter="SEARCH_INFO"
                                @keydown.esc="$store.commit('INPUT_SET', '')"
                            ></v-text-field>
                            <v-col cols
                            class="text-right py-0">
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

                            <v-list-item-group color="primary">

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
                                                                md="6"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_name"
                                                                    :rules="rules.nameRules"
                                                                    :counter="50"
                                                                    label="ФИО (Название)"
                                                                    required
                                                                ></v-text-field>
                                                            </v-col>

                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_profession"
                                                                    :rules="rules.nameRules"
                                                                    :counter="50"
                                                                    label="Должность"
                                                                    required
                                                                ></v-text-field>
                                                            </v-col>

                                                            <v-col
                                                                cols="12"
                                                                md="4"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_email"
                                                                    :rules="rules.emailRules"
                                                                    label="E-mail"
                                                                ></v-text-field>
                                                            </v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="4"
                                                            >
                                                                <v-text-field
                                                                    v-model="input_phone"
                                                                    :rules="rules.phoneRules"
                                                                    label="Телефон"
                                                                    aria-required="true"
                                                                ></v-text-field>
                                                            </v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="4"
                                                            >
                                                                <v-select
                                                                    :items="sort_items"
                                                                    item-text="name"
                                                                    item-value="data"
                                                                    v-model="input_sort"
                                                                    filled
                                                                    label="Относится к "
                                                                    dense
                                                                ></v-select>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-form>
                                        </v-col>
                                    </v-expand-transition>
                                    <v-col class="mb-2 px-2" v-if="get_results_search.people.length > 0">
                                        <p class="title" style="text-align: center; margin: 0">Люди</p>
                                        <hr style="margin: 0">
                                        <v-row>
                                                <v-col :lg="(get_results_search.build.length || get_results_search.business.length) > 0? 12:4"
                                                       :sm="(get_results_search.build.length || get_results_search.business.length) > 0? 12:6"
                                                       :xl="(get_results_search.build.length || get_results_search.business.length) > 0? 6:3"
                                                       style="flex-basis: auto"
                                                       v-for="(item, i) in get_results_search.people"
                                                       :key="i">

                                                    <miniContacts :item="item" :index="i" :cat="'people'"></miniContacts>

                                                </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col class="mb-2 px-2"
                                           v-if="get_results_search.build.length > 0">
                                        <p class="title" style="text-align: center; margin: 0">Службы</p>
                                        <hr style="margin: 0">
                                        <v-row>
                                            <v-col :lg="(get_results_search.people.length || get_results_search.business.length) > 0? 12:4"
                                                   :sm="(get_results_search.people.length || get_results_search.business.length) > 0? 12:6"
                                                   :xl="(get_results_search.people.length || get_results_search.business.length) > 0? 6:3"
                                                    v-for="(item, i) in get_results_search.build"
                                                    :key="i"
                                            >
                                                <miniContacts :item="item" :index="i" :cat="'build'"></miniContacts>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col class="mb-2 px-2" v-if="get_results_search.business.length > 0">
                                        <p class="title" style="text-align: center; margin: 0">Внешнии компании</p>
                                        <hr style="margin: 0">
                                        <v-row>
                                            <v-col :lg="(get_results_search.people.length || get_results_search.build.length) > 0? 12:4"
                                                   :sm="(get_results_search.people.length || get_results_search.build.length) > 0? 12:6"
                                                   :xl="(get_results_search.people.length || get_results_search.build.length) > 0? 6:3"
                                                    v-for="(item, i) in get_results_search.business"
                                                    :key="i"
                                            >
                                                <miniContacts :item="item" :index="i" :cat="'business'"></miniContacts>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-list-item-group>
                        </v-list>
                    </v-tab-item>
                    <v-tab-item>
                        <posts
                            :title="'заголовок'"
                            :desc="'тут тиао текст'"
                            :author="{
                                name: 'ФИО',
                                img: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'
                            }"
                            :like="999"
                            :color="'pink'"
                        >
                        </posts>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>

        <v-col lg="3" sm="3" xs="12"
                class="mb-2 px-2">
            <news :title="'Саратова'"></news>
        </v-col>
    </v-row>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Dashboard",
        components: {
            'tasks': () => import('../Tasks/TasksComponent'),
            'miniContacts': () => import ('../Contacts/blocks/miniContacts'),
            'news':  () => import ('../News/news'),
            'mac-header':  () => import ('./blocks/mac-header'),
            'posts': () => import('../Posts/PostsComponent'),
        },
        data: () => ({

            tab: 1,
            items: [
                'Задачи', 'Контакты', 'FAQ'
            ],
            /*Для формы добавления контакта*/
            addFormUser: false,
            valid: false,
            rules: {
                phoneRules: [
                    v => !!v || 'Телефон обязателен!',
                ],
                nameRules: [
                    v => !!v || 'Потом не вспомнишь!',
                    v => v.length <= 70 || 'Name must be less than 30 characters',
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
            ...mapGetters(['config/auth','config/admin','config/root',
                'get_info', 'get_input_search', 'get_results_search', 'get_error_search', 'loading_search',
                'contacts/get_alert','contacts/get_message',
                'contacts/inputContactName','contacts/inputContactProfession','contacts/inputContactSort',
                'contacts/inputContactEmail','contacts/inputContactPhone'
            ]),
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
                this.SEARCH_INFO()
            }
        },
        methods: {
            ...mapActions(['SEARCH_INFO' ])
        }
    }
</script>

<style scoped>

</style>

