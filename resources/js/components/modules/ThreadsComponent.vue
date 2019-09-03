<template>
    <div>

        <span class="title">
            <i class="fa" :class="thread.countPeople.length>2?'fa-users':'fa-comments-o'" aria-hidden="true"></i>
            {{thread.countPeople.length>2? thread.subject : (thread.creator.id == user.id && thread.countPeople.length == 1?'Избранное':thread.interlocutor) }}
        </span>
        <span class="content">
            <h4 class="badge" v-if="thread.latestMessage">{{thread.latestMessage.user_id == user.id? 'Вы:': user.name}}</h4> {{thread.latestMessage?thread.latestMessage.body: 'Чат пуст...'}}
        </span>
        <span class="label label-danger" style="float: right;" v-if="thread.UnreadMessagesCount">{{thread.UnreadMessagesCount}}</span>

    </div>

</template>


<script>
    export default {
        name: "ThreadsComponent",
        props: [
            'thread',
            'user'
        ],
    }
</script>

<style scoped>

</style>
