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
    export default {
        name: "news",
        components: {
            'mac-header':  () => import ('../Dashboard/blocks/mac-header')
        },
        props: {
            title: String,
        },
        data: () => ({
            XMLyandex: window.m_index
        })
    }
</script>

<style scoped>

</style>
