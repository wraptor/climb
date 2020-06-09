<template>
    <el-radio-group v-model="value"
                    :size="defaultOption.size"
                    :disabled="disabled===true || defaultOption.disabled===true"
                    :text-color="defaultOption.textColor"
                    :fill="defaultOption.fill">
        <template v-if="defaultOption.button">
            <cl-radio-button @change="handleChange(item)" v-for="(item,index) in myDicData" v-bind:key="index"
                             :disabled="item.disabled===true"
                             :label="item[defaultOption.dicProps.value]?item[defaultOption.dicProps.value]:item[defaultOption.dicProps.label]">
                {{item[defaultOption.dicProps.label]}}
            </cl-radio-button>
        </template>
        <template v-else>
            <el-radio @change="handleChange(item)" v-for="(item,index) in myDicData" v-bind:key="index"
                      :disabled="item.disabled===true"
                      :label="item[defaultOption.dicProps.value]?item[defaultOption.dicProps.value]:item[defaultOption.dicProps.label]"
                      :border="defaultOption.border">
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
            dicData: {type: Array, default: undefined},
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
                myDicData: []
            }
        }, methods: {
            initData(key, val) {
                if (key && key === 'clRadioInit' && val) {
                    //赋值option
                    this.defaultOption = beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                    //初始化字典数据
                    this.setDicUrl(this.defaultOption.dicUrl, () => {
                        this.setDicData(this.defaultOption.dicData)
                    })
                }
            }, setDicUrl(dicUrl, callback) {
                if (dicUrl) {
                    if (Axios) {
                        Axios.get(dicUrl).then((response) => {
                            if (this.defaultOption.dicProps.data) {
                                this.setDicData(response.data[this.defaultOption.dicProps.data])
                            } else {
                                this.setDicData(response.data)
                            }
                        }).catch((error) => {
                            console.error(error);
                            callback()
                        })
                    } else {
                        console.error('axios is null,please install axios')
                    }
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
                let theValue = undefined
                if (value[this.defaultOption.dicProps.value]) {
                    theValue = value[this.defaultOption.dicProps.value]
                } else {
                    theValue = value[this.defaultOption.dicProps.label]
                }
                this.$emit('input', theValue)
                this.$emit('change', theValue);
            }
        }
    }
</script>

<style scoped>

</style>
