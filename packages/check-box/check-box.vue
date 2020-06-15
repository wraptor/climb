<template>
    <el-checkbox-group v-model="value"
                       :size="defaultOption.size"
                       :disabled="disabled || defaultOption.disabled"
                       :text-color="defaultOption.textColor"
                       :fill="defaultOption.fill"
                       :min="defaultOption.min"
                       :max="defaultOption.max"
                       @change="handleChange">
        <template v-if="defaultOption.button">
            <el-checkbox-button v-for="(item,index) in myDicData" v-bind:key="index"
                                :disabled="item.disabled"
                                :name="item.name"
                                :label="item[defaultOption.dicProps.value]?item[defaultOption.dicProps.value]:item[defaultOption.dicProps.label]">
                {{item[defaultOption.dicProps.label]}}
            </el-checkbox-button>
        </template>
        <template v-else>
            <el-checkbox v-for="(item,index) in myDicData" v-bind:key="index"
                         :disabled="item.disabled"
                         :name="item.name"
                         :indeterminate="item.indeterminate"
                         :label="item[defaultOption.dicProps.value]?item[defaultOption.dicProps.value]:item[defaultOption.dicProps.label]"
                         :border="defaultOption.border">
                {{item[defaultOption.dicProps.label]}}
            </el-checkbox>
        </template>
    </el-checkbox-group>
</template>

<script>
    import beanUtil from "../util/bean-util";
    import deOp from "./option";
    import Axios from 'axios';

    export default {
        name: "ClCheckBox",
        props: {
            value: {default: []},
            option: {type: Object, default: undefined},
            dicData: {type: Array, default: undefined},
            disabled: {type: Boolean, default: false}
        }, watch: {
            option: {
                deep: true,
                handler(val) {
                    this.initData('clCheckBoxInit', val)
                }
            }, dicData: {
                deep: true,
                handler(val) {
                    this.setDicData(val)
                }
            }
        }, created() {
            this.initData('clCheckBoxInit', this.option)
            if (this.dicData) {
                this.setDicData(this.dicData)
            }
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp)),
                myDicData: [],
                myAxios: this.axios ? this.axios : Axios
            }
        }, methods: {
            initData(key, val) {
                if (key && key === 'clCheckBoxInit' && val) {
                    //赋值option
                    beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                    //初始化字典数据
                    this.setDicUrl(this.defaultOption.dicUrl, () => {
                        this.setDicData(this.defaultOption.dicData)
                    })
                }
            }, setDicUrl(dicUrl, callback) {
                if (dicUrl) {
                    if (this.myAxios) {
                        this.myAxios.get(dicUrl).then((response) => {
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
                        console.error('axios is null,please install axios and install in this.$axios')
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
                /*let theValue = undefined
                if (value[this.defaultOption.dicProps.value]) {
                    theValue = value[this.defaultOption.dicProps.value]
                } else {
                    theValue = value[this.defaultOption.dicProps.label]
                }*/
                this.$emit('input', value)
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>
