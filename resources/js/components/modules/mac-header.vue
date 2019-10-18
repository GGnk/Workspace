<template>
    <div class="macheader">
                    <span class="macIcon">
                        <i class="material-icons" style="color: white;">fiber_manual_record</i>
                        <i class="material-icons" style="color: white;">fiber_manual_record</i>
                        <i class="material-icons" style="color: white;">fiber_manual_record</i>
                    </span>
        <span class="macTitle" v-html="title"></span>
    </div>
</template>

<script>
    export default {
        name: "mac-header",
        props: {
            title: String,
        }
    }
</script>

<style scoped>
    .macIcon i {
        font-size: 15px;
    }
    .macheader {
        padding-left: 11px;
        width: 100%;
        background: #424242;
        height: 48px;
        line-height: 2;
        color: white;
    }
    .macTitle {
        width: 70%;
        display: inline-block;
        text-align: center;
    }
</style>
