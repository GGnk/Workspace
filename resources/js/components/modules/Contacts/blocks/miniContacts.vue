<template>
    <v-dialog
        v-model="item.menu"
        max-width="600"
    >
        <template v-slot:activator="{ on }">
            <v-list-item
                v-on="on"
            >
                <v-list-item-avatar>
                    <i class="material-icons">
                        emoji_people
                    </i>
                </v-list-item-avatar>
                <v-list-item-content >
                    <v-list-item-title class="text-wrap">{{item.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{item.profession ? item.profession+',': ''}} {{item.phone}} </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-card
        >
            <v-form v-model="valid"
            >
                <v-btn
                    v-if="$store.getters['config/admin']"
                    icon
                    @click="dialog = true"
                    color="red"
                    absolute
                    top
                    right
                    style="z-index: 999"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <div class="row mx-0 d-flex flex-no-wrap">
                    <v-col cols="12" md="4">
                        <v-avatar
                            tile
                            size="100%"
                        >
                            <v-img src="https://www.pngkey.com/png/full/300-3008424_beer-clipart-pictures-and-images-download-user-add.png"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col cols="12" md="8">
                        <v-card-title>
                            <v-text-field
                                :disabled="!$store.getters['config/admin']"
                                v-model="item.name"
                                :rules="rules.nameRules"
                                :counter="50"
                                label="ФИО (Название)"
                                required
                                color="black"
                            ></v-text-field>
                        </v-card-title>

                        <v-card-subtitle>
                            <v-text-field
                                :disabled="!$store.getters['config/admin']"
                                v-model="item.profession"
                                :rules="rules.nameRules"
                                :counter="70"
                                label="Должность"
                                required
                            ></v-text-field>
                        </v-card-subtitle>
                    </v-col>

                </div>
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <v-text-field
                                :disabled="!$store.getters['config/admin']"
                                v-model="item.email"
                                :rules="rules.emailRules"
                                label="E-mail"
                            ></v-text-field>
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
                            ></v-text-field>
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
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
                <v-spacer></v-spacer>

                <v-card-actions>
                    <v-btn @click="item.menu = false">Cancel</v-btn>
                    <v-btn
                        v-if="$store.getters['config/admin']"
                        color="success" @click="$store.dispatch('contacts/EDIT_CONTACT', item) && (item.menu = !item.menu) && (show = false)">Save
                    </v-btn>

                    <v-spacer></v-spacer>

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
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-textarea
                            v-model="item.comment"
                            :disabled="!$store.getters['config/admin']"
                            filled
                            label="Комментарий"
                            hint="До 255 знаков"
                            placeholder="Дополнительная информация отсутсвует"
                        ></v-textarea>
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="400">
            <v-card>
                <v-card-title class="headline"></v-card-title>
                <v-card-text class="black--text">Вы уверены, что хотите удалить контакт - {{item.name}} ?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="dark darken-1" text @click="dialog = false">Отмена</v-btn>
                    <v-btn color="red white--text" @click="$store.dispatch('contacts/DELETE_CONTACT', {item, index, cat})  && (item.menu = !item.menu)">Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-dialog>
</template>

<script>
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
