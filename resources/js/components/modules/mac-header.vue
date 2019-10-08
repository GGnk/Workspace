<template>
    <div class="macheader">
                    <span class="macIcon">
                        <i class="material-icons" style="color: #643311;">fiber_manual_record</i>
                        <i class="material-icons" style="color: #925929;">fiber_manual_record</i>
                        <i class="material-icons" style="color: #565f34;">fiber_manual_record</i>
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
        padding-left: 11px ;
        width: 100%;
        background: white;
        line-height: 2;
        box-shadow: inset 2px -3px 20px 0px rgba(25, 118, 210, 0.26), 2px -1px 5px 0px rgba(25, 118, 210, 0.24);
    }
    .macTitle {
        width: 70%;
        display: inline-block;
        text-align: center;
    }
</style>
