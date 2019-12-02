<template>
    <div class="security-code-wrap">
        <label :for="`code-${uuid}`">
            <ul :class="`${theme}-container security-code-container`">
                <li class="field-wrap" :class="value[index] ?In:''"  v-for="(item, index) in length" :key="index">
                    <i class="char-field">{{value[index] || placeholder}}</i>
                </li>
            </ul>
        </label>
        <input class="input-code" @keydown="HIDE_KEYBOARD" v-model="value_p"
               :id="`code-${uuid}`" :name="`code-${uuid}`" type="tel" :maxlength="length"
               autocorrect="off" autocomplete="off" autocapitalize="off" autofocus="autofocus">
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from "vuex";

    export default {
        name:'PinCodeComponent',
        props: {},
        data () {
            return {}
        },
        mounted() {

        },
        watch: {
            value_p(after, before) {
                this.HIDE_KEYBOARD()
            }
        },
        computed: {
            ...mapGetters('pin_code', ['uuid', 'In', 'value', 'length','placeholder','theme']),

            value_p: {
                get(){
                    return this.value
                },
                set(value){
                    this.VAR_EDIT({key: 'value', value: value})
                }

            }
        },
        methods: {
            ...mapMutations('pin_code',['VAR_EDIT']),
            ...mapActions('pin_code',['HIDE_KEYBOARD'])
        }
    }
</script>

<style>
    .security-in1 {
        background-color: antiquewhite !important;
    }
    .security-in2 {
        background-color: red !important;
        color: white !important;
    }
    .security-in3 {
        background-color: green !important;
        color: white !important;
    }
    .security-code-wrap {
        height: 10vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .security-code-container {
        margin: 0;
        padding: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .security-code-container .field-wrap {
        list-style: none;
        display: block;
        height: 60px;
        width: 60px;
        line-height: 60px;
        font-size:35px;
    }
    .security-code-container .field-wrap .char-field {
        font-style: normal;
    }

    .block-container {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
    .block-container .field-wrap {
        background-color: #f5f5f5;
        margin: 20px;
        color: #000;
        text-align: center;
    }

    .line-container {
        position: relative;
        background-color: #fff;
    }
    .line-container:after {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        content: "";
        width: 200%;
        height: 200%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        position: absolute;
        border: 1px solid #d9d9d9;
        top: 0;
        left: 0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        border-radius: 4px;
    }
    .line-container .field-wrap {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        position: relative;
    }
    .line-container .field-wrap:not(:last-child):after {
        content: "";
        width: 1px;
        height: 50%;
        position: absolute;
        right: 0;
        top: 25%;
        background-color: #d9d9d9;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }
    .input-code {
        position: absolute;
        left: -9999px;
        top: -9999px;
    }

</style>
