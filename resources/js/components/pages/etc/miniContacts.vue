<template>
    <v-menu
        v-model="item.menu"
        :close-on-content-click="false"
        max-width="600"
        absolute
        offset-y
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
                    <v-list-item-subtitle>{{item.profession}}, {{item.phone}} </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-card>
            <v-list>
                <v-list-item>
                    <v-list-item-avatar
                    >
                        <i class="material-icons">
                            emoji_people
                        </i>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn
                            v-if="$store.getters['config/admin']"
                            icon
                            @click="dialog = true"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
                <v-form v-model="valid"
                >
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    :disabled="!$store.getters['config/admin']"
                                    v-model="item.name"
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
                                    :disabled="!$store.getters['config/admin']"
                                    v-model="item.profession"
                                    :rules="rules.nameRules"
                                    :counter="70"
                                    label="Должность"
                                    required
                                ></v-text-field>
                            </v-col>

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

                    <v-btn @click="item.menu = false">Cancel</v-btn>
                    <v-btn
                        v-if="$store.getters['config/admin']"
                        color="success" @click="$store.dispatch('contacts/EDIT_CONTACT', item) && (item.menu = !item.menu)">Save</v-btn>
                </v-form>

            </v-card-actions>

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
    </v-menu>
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
</style>
