<template>
    <el-select v-model="value"
               :multiple="defaultOption.multiple"
               :disabled="defaultOption.disabled || disabled"
               :size="defaultOption.size"
               :clearable="defaultOption.clearable"
               :collapse-tags="defaultOption.collapseTags"
               :multiple-limit="defaultOption.multipleLimit"
               :name="defaultOption.name"
               :autocomplete="defaultOption.autocomplete"
               :auto-complete="defaultOption.autoComplete"
               :placeholder="defaultOption.placeholder"
               :filterable="defaultOption.filterable"
               :allow-create="defaultOption.allowCreate"
               :filter-method="defaultOption.filterMethod"
               :remote="defaultOption.remote"
               :remote-method="defaultOption.remoteMethod"
               :loading="defaultOption.loading"
               :loading-text="defaultOption.loadingText"
               :no-match-text="defaultOption.noMatchText"
               :no-data-text="defaultOption.noDataText"
               :popper-class="defaultOption.popperClass"
               :reserve-keyword="defaultOption.reserveKeyword"
               :default-first-option="defaultOption.defaultFirstOption"
               :popper-append-to-body="defaultOption.popperAppendToBody"
               :automatic-dropdown="defaultOption.automaticDropdown"
               @change="handleChange"
    >
        <el-option
                v-for="item in myDicData"
                :disabled="item.disabled"
                :key="item.value"
                :label="item[defaultOption.dicProps.label]?item[defaultOption.dicProps.label]:item[defaultOption.dicProps.value]"
                :value="item[defaultOption.dicProps.value]?item[defaultOption.dicProps.value]:item[defaultOption.dicProps.label]">
        </el-option>
    </el-select>
</template>

<script>
    import beanUtil from "../util/bean-util";
    import dicUtil from '../util/dic-util'
    import deOp from "./option";
    import Axios from 'axios';

    export default {
        name: "ClSelect",
        props: {
            value: {},
            option: {type: Object, default: undefined},
            dicData: {type: Array, default: undefined},
            disabled: {type: Boolean, default: false}
        }, watch: {
            option: {
                deep: true,
                handler(val) {
                    this.initData('clSelectInit', val)
                }
            }, dicData: {
                deep: true,
                handler(val) {
                    this.setDicData(val)
                }
            }
        }, created() {
            this.initData('clSelectInit', this.option)
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
                if (key && key === 'clSelectInit' && val) {
                    //赋值option
                    this.defaultOption = beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                    //初始化字典数据
                    dicUtil.getData(this.myAxios, this.defaultOption.dicUrl, this.defaultOption.dicProps, (data) => {
                        this.setDicData(data ? data : this.defaultOption.dicData)
                    })
                }
            }, setDicData(dicData) {
                if (dicData && dicData.constructor === Array) {
                    this.myDicData = dicData
                } else {
                    console.error(dicData, 'dicData must be Array')
                }
            },
            handleChange(value) {
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>
