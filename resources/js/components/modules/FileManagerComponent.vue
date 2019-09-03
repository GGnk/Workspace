<template>
    <div class="manager" >
        <ul class="menu-manager">
            <li @click="load_dirs('/')">Главная</li>
            <li>Обновить</li>
            <li>Добавить</li>
            <li>Удалить</li>
        </ul>
        <ul class="control-manager" style="overflow-y: auto;height: 80vh;">
            <li class="dir-setting">

                <div class="control">
                        <i class="fa fa-arrow-left"></i>
                </div>
                <div class="main" @click="load_dirs(get_prev_folder)">
                    {{get_prev_folder !== '.'?get_prev_folder:'на главную'}}
                </div>

            </li>

            <li v-for="dir in all_directories" class="dir-setting">

                <div class="control">
                    <label>
                        <input type="checkbox" v-show="false">
                        <i class="fa fa-folder"></i>
                    </label>
                </div>
                <div class="main" @click="load_dirs(dir.path, dir.dirname)">
                    {{dir.folder}}
                </div>

            </li>
            <li v-for="file in all_files" class="file-setting">
                <div class="control">
                    <label>
                        <input type="checkbox" v-show="false">
                        <i class="fa fa-file"></i>
                    </label>
                </div>
                <div class="main" @click="load_dirs(file.path)">
                    <h3>{{file.name}}</h3>
                    <span v-if="file.size !== null">{{file.size}} Mb</span>
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
            ...mapGetters(["all_files", "all_directories", "get_prev_folder"]),

        },
        watch: {

        },
        mounted() {
            this.load_dirs('/')
        },
        methods: {
            ...mapActions(["LOAD_DIRECTORY"]),
            load_dirs(next, prev = '.') {
                this.$store.dispatch("LOAD_DIRECTORY", {next, prev})
            }
        }
    }

</script>

<style scoped>
    .manager {
        box-shadow: inset 0px -7px 8px 5px rgba(0, 0, 0, 0.5);
    }
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
        
    }
    .control-manager li {
        padding: 1px 0;
        height: 36px;
        line-height: 36px;
        width: 100%;
    }
    .control-manager .file-setting {
    }
    .control-manager .control {
        margin: 2px 10px;
        float: left;
    }
    .control-manager .main {
        cursor: pointer;
        display: block;
        height: 36px;
        background-color: #4a494e99;
    }
    .control-manager .file-setting .main h3{
        color: #e8f5a6;
        float: left;
        width: 84%;
        font-size: 0.8vw;
        line-height: 19px;
        word-break: break-all;
    }
    .control-manager .file-setting .main span{
        color: orange;
        font-size: 10px;
        float: right;
    }
    .control-manager .main:hover {
        background-color: #93919899;
    }
</style>
