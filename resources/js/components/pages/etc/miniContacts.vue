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
                <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.phone"></v-list-item-subtitle>
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
                        <v-list-item-subtitle>{{item.profession}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn
                            v-if="$store.getters['config/admin']"
                            icon
                            @click="$store.dispatch('contacts/DELETE_CONTACT', item.id)"
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
                        color="success" @click="$store.dispatch('contacts/EDIT_CONTACT', item)">Save</v-btn>
                </v-form>

            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
export default {
  props: [
        'item'
  ],

  data() {
    return {
        valid: false,
        rules: {
            phoneRules: [
                v => !!v || 'Телефон обязателен!',
            ],
            nameRules: [
                v => !!v || 'Потом не вспомнишь!',
                v => v.length <= 50 || 'Name must be less than 30 characters',
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
