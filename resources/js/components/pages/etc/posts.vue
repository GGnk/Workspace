<template>
    <v-row>
        <v-col lg="4" sm="4" xl="12">
            <v-card
                class="mx-auto"
                :color="color"
                dark
                max-width="400"
            >
                <v-card-title>
                    <v-icon
                        large
                        left
                    >
                        mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">{{title}}</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                    Тут типо текст
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                :src="author.img"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{author.name}}</v-list-item-title>
                        </v-list-item-content>

                        <v-row
                            align="center"
                            justify="end"
                        >
                            <v-icon class="mr-1">mdi-heart</v-icon>
                            <span class="subheading mr-2">{{like}}</span>
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Posts",
        components: {
            // 'mac-header':  () => import ('./etc/mac-header')
        },
        props: [
            'title',
            'desc',
            'author',
            'like',
            'color',
        ],
        data:() => ({

        }),
        computed: {

        },
        created() {
        },
        mounted() {
        },
        watch: {

        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
