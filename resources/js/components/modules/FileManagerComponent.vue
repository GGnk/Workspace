<template>
    <div>
        <ul>
            <li v-for="dir in all_directories">{{dir}}</li>
            <li v-for="file in all_files">{{file}}</li>
        </ul>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

    export default {
        name: "FileManager",
        props: [

        ],
        computed: {
            ...mapGetters(["all_files", "all_directories"]),
        },
        watch: {

        },
        mounted() {
            this.$store.dispatch("LOAD_DIRECTORY", '/')
        },
        methods: {
            ...mapActions(["LOAD_DIRECTORY"]),
        }
    }

</script>

<style scoped>

</style>
