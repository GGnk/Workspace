<template>
    <div>
        <mac-header :title="'Новости '+title"></mac-header>
        <v-expansion-panels
            multiple
        >
            <v-expansion-panel
                v-for="(item, i) in XMLyandex"
                :key="i"
            >
                <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-html="item.descr"></div>
                    <div style=" text-align: center">
                        <a :href="item.url" target="_blank">
                            <v-btn
                                text
                            >Подробнее ...</v-btn>
                        </a>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "news",
        components: {
            'mac-header':  () => import ('../../views/blocks/mac-header')
        },
        props: {},
        data: () => ({
        }),
        computed:{
            ...mapGetters('news', ['title', 'XMLyandex'])
        },
        mounted() {
            this.$store.commit('news/LOAD_DATA')
            //this.$store.dispatch('news/FETCH_DATA')
        }
    }
</script>

<style scoped>

</style>
