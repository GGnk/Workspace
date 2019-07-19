<template>
    <div>

        <span style="width: 70%;color: white;    font-size: 13px;">
            <i class="fa" :class="thread.countPeople.length>2?'fa-users':'fa-comments-o'" style="color: white" aria-hidden="true"></i>
            {{thread.countPeople.length>2? thread.subject : thread.interlocutor }}
        </span>
        <span style=" margin: 5px;overflow: hidden;text-overflow: ellipsis;height: 13px;    width: 90%;">
            <h4 class="badge">Вы:</h4> {{thread.messages[0].body}}
        </span>
        <span class="label label-danger" style=" float: right;" v-if="thread.UnreadMessagesCount">{{thread.UnreadMessagesCount}}</span>

    </div>

</template>


<script>
    export default {
        name: "ThreadsComponent",
        props: [
            'thread'
        ],
    }
</script>

<style scoped>

</style>
