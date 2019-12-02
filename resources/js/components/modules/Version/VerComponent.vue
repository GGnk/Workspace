<template>
    <v-row
        class="layout wrap"
        dense
    >
        <v-col class="mb-2 px-2" >
            <v-timeline align-top>
                <v-timeline-item
                    class=" mb-12"
                    color="green"
                >
                    <span  slot="opposite">Что ты изменил на этот раз???</span>
                    <template v-slot:icon>
                        <span>NEW</span>
                    </template>
                    <v-text-field
                        v-model="input"
                        hide-details
                        flat
                        label="Добавь изменения..."
                        solo
                        @keydown.enter="comment"
                    >
                        <template v-slot:append>
                            <v-btn
                                class="mx-0"
                                depressed
                                @click="comment"
                            >
                                Добавить
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-timeline-item>

                <v-slide-x-transition
                    group
                >
                    <v-timeline-item
                        v-for="event in timeline"
                        :key="event.id"
                        class="mb-4"
                        color="pink"
                    >
                        <template v-slot:icon>
                            <v-avatar>
                                <img src="http://i.pravatar.cc/64">
                            </v-avatar>
                        </template>
                        <span slot="opposite">Commit on {{event.time}}</span>
                        <v-card class="elevation-2">
                            <v-card-title class="headline">Тут будет заголовок</v-card-title>
                            <v-card-text v-text="event.text"></v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-slide-x-transition>

            </v-timeline>
        </v-col>

        <v-flex lg3 sm3 xs12
                class="mb-2 px-2">
            <news :title="'Саратова'"></news>
        </v-flex>
    </v-row>
</template>

<script>
    const COLORS = [
        'info',
        'warning',
        'error',
        'success',
    ]
    const ICONS = {
        info: 'mdi-information',
        warning: 'mdi-alert',
        error: 'mdi-alert-circle',
        success: 'mdi-check-circle',
    }

    export default {
        name: "VerComponent",
        components: {
             'news':  () => import ('../News/news')
        },
        data:() => ({
            events: [],
            input: null,
            nonce: 0,
        }),
        computed: {
            timeline () {
                return this.events.slice().reverse()
            },
        },
        created() {
        },
        mounted() {
        },
        watch: {

        },
        methods:{
            comment () {
                const time = (new Date()).toTimeString()
                this.events.push({
                    id: this.nonce++,
                    text: this.input,
                    time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
                        return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
                    }),
                })

                this.input = null
        }
        }
    }
</script>

<style scoped>

</style>
