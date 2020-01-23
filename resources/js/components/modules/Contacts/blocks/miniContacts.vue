<template>
    <v-list-item>
        <v-list-item-avatar>
            <i
                v-if="!item.img"
                class="material-icons">
                emoji_people
            </i>
            <v-img
                v-else
                :src="'storage/'+item.img"/>
        </v-list-item-avatar>
        <v-dialog
            v-model="item.menu"
            max-width="700"
            :fullscreen="ui_mobile"
        >
            <template v-slot:activator="{ on }">
                <v-list-item-content
                    v-on="on"
                >
                    <v-list-item-title class="text-wrap">{{item.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{item.profession ? item.profession+',': ''}} {{item.phone}} </v-list-item-subtitle>
                </v-list-item-content>
                <v-btn
                    v-if="admin"
                    absolute
                    right
                    fab
                    dark
                    small
                    color="red"
                    @click="dialog=true"
                >
                    <v-icon dark>mdi-delete</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-form v-model="valid"
                >
                    <v-row class="mx-0 d-flex flex-no-wrap">
                        <v-col
                            class="d-none d-md-block .d-xl-flex"
                            cols="12"
                            md="4">
                            <v-hover>
                                <template
                                    v-slot:default="{ hover}">
                                    <div>
                                        <v-avatar
                                            style="display: block!important;"
                                            size="100%"
                                            tile
                                        >
                                            <v-img
                                                v-if="item.img && !item.new_img"
                                                :src="'storage/'+item.img"/>
                                            <v-img
                                                v-else-if="item.new_img"
                                                :src="img_url"/>
                                            <v-img
                                                v-else
                                                src="storage/avatars/default/default.png"/>
                                        </v-avatar>
                                        <v-fade-transition
                                            class="align-center"
                                        >
                                            <v-overlay
                                                v-if="hover"
                                                absolute
                                                color="#036358"
                                            >
                                                <div class="text-center">
                                                    <v-btn
                                                        class="mt-2"
                                                        outlined
                                                        onclick="document.getElementById('fileInput').click()">
                                                        {{item.img?'Сменить картинку':'Загрузить картинку' }}
                                                    </v-btn>
                                                    <v-btn
                                                        class="mt-2"
                                                        outlined
                                                        v-if="item.img"
                                                        target="_blank"
                                                        :href="'storage/'+item.img">
                                                        Увеличить
                                                    </v-btn>
                                                </div>
                                            </v-overlay>
                                        </v-fade-transition>
                                    </div>
                                </template>
                            </v-hover>
                        </v-col>
                        <v-file-input
                            v-if="admin"
                            id="fileInput"
                            v-model="item.new_img"
                            @change="onFileChange(item.new_img)"
                            :rules="rules.imgRules"
                            accept="image/png, image/jpeg, image/bmp"
                            class="d-none"
                        />

                        <v-col cols="12" md="8" class="pa-0">
                            <v-row
                                v-if="ui_mobile"
                                class="ma-0">
                                <v-col
                                    cols="4"
                                >
                                    <v-avatar
                                        style="display: block!important;"
                                        height="100px"
                                        width="100px"
                                        onclick="document.getElementById('fileInput').click()"
                                        >
                                            <v-img
                                                v-if="item.img && !item.new_img"
                                                :src="'storage/'+item.img"/>
                                            <v-img
                                                v-else-if="item.new_img"
                                                :src="img_url"/>
                                            <v-img
                                                v-else
                                                src="storage/avatars/default/default.png"/>
                                    </v-avatar>
                                </v-col>
                                <v-col
                                    class="text-right"
                                    cols>
                                    <v-btn @click="item.menu = false">Cancel</v-btn>
                                    <v-btn
                                        v-if="$store.getters['config/admin']"
                                        color="error" @click="dialog = true">Delete
                                    </v-btn>
                                    <v-btn
                                        v-if="$store.getters['config/admin'] && valid"
                                        color="success" @click="$store.dispatch('contacts/EDIT_CONTACT', item) && (item.menu = !item.menu) && (show = false)">Save
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-card-title>
                                <v-text-field
                                    :disabled="!$store.getters['config/admin']"
                                    v-model="item.name"
                                    :rules="rules.nameRules"
                                    :counter="50"
                                    label="ФИО (Название)"
                                    required
                                    color="black"
                                />
                            </v-card-title>

                            <v-card-subtitle>
                                <v-text-field
                                    :disabled="!$store.getters['config/admin']"
                                    v-model="item.profession"
                                    :rules="rules.nameRules"
                                    :counter="70"
                                    label="Должность"
                                    required
                                />
                            </v-card-subtitle>
                        </v-col>
                    </v-row>
                    <v-row class="mx-0" >
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-text-field
                                :disabled="!$store.getters['config/admin']"
                                v-model="item.email"
                                :rules="rules.emailRules"
                                label="E-mail"
                            />
                        </v-col>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-text-field
                                :disabled="!$store.getters['config/admin']"
                                v-model="item.phone"
                                :rules="rules.phoneRules"
                                label="Телефон"
                                aria-required="true"
                            />
                        </v-col>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-select
                                :disabled="!$store.getters['config/admin']"
                                v-model="item.sort"
                                :items="sort_items"
                                item-text="name"
                                item-value="data"
                                filled
                                label="Относится к "
                                dense
                            />
                        </v-col>
                    </v-row>
                    <v-spacer/>

                    <v-card-actions>
                        <div v-if="!ui_mobile">
                            <v-btn @click="item.menu = false">Cancel</v-btn>
                            <v-btn
                                v-if="$store.getters['config/admin']"
                                color="error" @click="dialog = true">Delete
                            </v-btn>
                            <v-btn
                                v-if="$store.getters['config/admin'] && valid"
                                color="success" @click="$store.dispatch('contacts/EDIT_CONTACT', item) && (item.menu = !item.menu) && (show = false)">Save
                            </v-btn>
                        </div>
                        <span></span>
                        <v-spacer/>

                        <v-btn
                            @click="show = !show"
                            :color="item.comment ? 'black white--text': ''"
                        >
                            {{ show ? 'Скрыть' : 'Подробно' }}
                        </v-btn>
                    </v-card-actions>
                </v-form>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider/>

                        <v-card-text>
                            <v-textarea
                                v-model="item.comment"
                                :disabled="!$store.getters['config/admin']"
                                filled
                                label="Комментарий"
                                hint="До 255 знаков"
                                placeholder="Дополнительная информация отсутсвует"
                            />
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="400"
        >
            <v-card>
                <v-card-title class="headline"/>
                <v-card-text class="black--text">Вы уверены, что хотите удалить контакт - {{item.name}} ?</v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="dark darken-1" text @click="dialog = false">Отмена</v-btn>
                    <v-btn color="red white--text" @click="$store.dispatch('contacts/DELETE_CONTACT', {item, index, cat}) && (dialog = false) && (item.menu = false)">Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-list-item>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  props: [
      'item',
      'index',
      'cat'
  ],

  data() {
    return {
        show: false,
        dialog: false,
        valid: false,
        img_url: null,

        rules: {
            imgRules: [
                value => value.length == 0 || value.size < 2097152 || 'Картинка не может быть больше 2 MB!'
            ],
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
    }
  },
    watch: {

    },
    computed: {
        ...mapGetters('config', ['auth','admin', 'ui_mobile']),


    },
    updated () {
        console.log(this.$refs.fileInput)
    },
    methods: {
        ...mapMutations('contacts', ['SELECT_CONTACTS']),

        onFileChange(e) {
            this.img_url = URL.createObjectURL(e);
        }
    }
}
</script>

<style>
  .widget-card {
    border-radius: 5%;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
    background-color: transparent;
  }
  .theme--light.v-input--is-disabled input {
      color: black!important;
  }
</style>
