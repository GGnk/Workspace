<template>
    <div class="col-12">
        <tasks class="col-12 col-sm-3"></tasks>
        <div id="mapRGD" class="col-12 col-sm-9" style="height: calc(100vh - 11em);"></div>
        Координаты маркера: {{map_cursor}}
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import tasks from "./TasksComponent"
    let DG = require('2gis-maps');
    export default {
        name: "MapComponent",
        components: {
            tasks
        },
        comments: [
            'tasks'
        ],
        props: [],
        data() {
            return {
            }
        },
        computed: {
             ...mapGetters(['map_cursor', 'markers']),
        },
        watch: {

        },
        created(){

        },
        mounted() {
            this.$store.dispatch('LOAD_MAP')
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
