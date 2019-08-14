<template>
    <div class="manager">
        <ul class="menu-manager">
            <li @click="load_dirs('/')">Главная</li>
            <li>Обновить</li>
            <li>Добавить</li>
            <li>Удалить</li>
        </ul>
        <ul class="control-manager">
            <li v-for="dir in all_directories" class="dir-setting">

                <div class="control">
                    <label>
                        <input type="checkbox" v-show="false">
                        <i class="fa fa-folder"></i>
                    </label>
                </div>
                <div class="main" @click="load_dirs(dir)">
                    {{dir}}
                </div>

            </li>
            <li v-for="file in all_files" class="file-setting">
                <div class="control">
                    <label>
                        <input type="checkbox" v-show="false">
                        <i class="fa fa-file"></i>
                    </label>
                </div>
                <div class="main" >
                    {{file}}
                </div>
            </li>
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
            this.load_dirs('/')
        },
        methods: {
            ...mapActions(["LOAD_DIRECTORY"]),
            load_dirs(dir) {
                this.$store.dispatch("LOAD_DIRECTORY", dir)
            },

        }
    }

</script>

<style scoped>
    .manager .control label i{
        font-size: 32px;
    }
    .manager .control label input[type="checkbox"]:checked ~  i{
        color: orange;
    }

    .manager .menu-manager {
        display: flex;
    }
    .manager .menu-manager li {
        margin: 2px;
        padding: 10px;
    }
    .manager .control-manager {
        margin: 0;
        left: 1px;
        overflow-y: auto;
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .control-manager li {
        padding: 1px 0;
        height: 36px;
        width: 100%;
        line-height: 36px;
    }
    .control-manager .control {
        margin: 2px 10px;
        float: left;
    }
    .control-manager .main {
        cursor: pointer;
        display: block;
        background-color: #4a494e99;
    }
    .control-manager .main:hover {
        background-color: #93919899;
    }
</style>
