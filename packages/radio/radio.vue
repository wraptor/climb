<template>
    <el-radio-group v-model="myValue"
                    :size="defaultOption.size"
                    :disabled="disabled || defaultOption.disabled"
                    :text-color="defaultOption.textColor"
                    :fill="defaultOption.fill">
        <template v-if="defaultOption.type==='button'">
            <cl-radio-button @change="handleChange(item)" v-for="(item,index) in myDicData" v-bind:key="index"
                             :label="item[defaultOption.dicProps.value]?item[defaultOption.dicProps.value]:item[defaultOption.dicProps.label]">
                {{item[defaultOption.dicProps.label]}}
            </cl-radio-button>
        </template>
        <template v-else>
            <el-radio @change="handleChange(item)" v-for="(item,index) in myDicData" v-bind:key="index"
                      :label="item[defaultOption.dicProps.value]?item[defaultOption.dicProps.value]:item[defaultOption.dicProps.label]"
                      :border="defaultOption.border || defaultOption.type==='border'">
                {{item[defaultOption.dicProps.label]}}
            </el-radio>
        </template>
    </el-radio-group>
</template>

<script>
    import beanUtil from "../util/bean-util";
    import ClRadioButton from '../radio-button/radioButton'
    import deOp from "./option";
    import Axios from 'axios';

    export default {
        name: "ClRadio",
        components: {ClRadioButton},
        props: {
            value: {},
            option: {type: Object, default: undefined},
            dicData: {},
            disabled: {type: Boolean, default: false}
        }, watch: {
            option: {
                deep: true,
                handler(val) {
                    this.initData('clRadioInit', val)
                }
            }, dicData: {
                deep: true,
                handler(val) {
                    this.setDicData(val)
                }
            }
        }, created() {
            this.initData('clRadioInit', this.option)
            if (this.dicData) {
                this.setDicData(this.dicData)
            }
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp)),
                myValue: this.value,
                myDicData: []
            }
        }, methods: {
            initData(key, val) {
                if (key && key === 'clRadioInit' && val) {
                    //赋值option
                    this.defaultOption = JSON.parse(JSON.stringify(beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)))
                    //初始化字典数据
                    this.setDicUrl(this.defaultOption.dicUrl, () => {
                        this.setDicData(this.defaultOption.dicData)
                    })
                }
            }, setDicUrl(dicUrl, callback) {
                if (dicUrl) {
                    Axios.get(dicUrl).then((response) => {
                        this.myDicData = response
                    }).catch((error) => {
                        console.warn(error);
                        callback()
                    })
                } else {
                    callback()
                }
            }, setDicData(dicData) {
                if (dicData && dicData.constructor === Array) {
                    this.myDicData = dicData
                } else {
                    console.error(dicData, 'dicData must be Array')
                }
            },
            handleChange(value) {
                if (value[this.defaultOption.dicProps.value]) {
                    this.$emit('change', value[this.defaultOption.dicProps.value]);
                } else {
                    this.$emit('change', value[this.defaultOption.dicProps.label]);
                }
            }
        }
    }
</script>

<style scoped>

</style>