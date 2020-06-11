<template>
    <el-form ref="clForm"
             :inline="defaultOption.inline"
             :label-position="defaultOption.labelPosition"
             :label-width="defaultOption.labelWidth"
             :label-suffix="defaultOption.labelSuffix"
             :hide-required-asterisk="defaultOption.hideRequiredAsterisk"
             :show-message="defaultOption.showMessage"
             :inline-message="defaultOption.inlineMessage"
             :status-icon="defaultOption.statusIcon"
             :validate-on-rule-change="defaultOption.validateOnRuleChange"
             :size="defaultOption.size"
             :disabled="defaultOption.disabled||defaultLoading"
             :model="form">
        <el-row :gutter="defaultOption.gutter">
            <el-col v-for="(item,index) in defaultOption.items" v-bind:key="index"
                    :span="(item.span && item.span>0)?item.span:12">
                <el-form-item
                        :label="item.label?item.label+'：':''"
                        :prop="item.prop"
                        :label-width="item.labelWidth"
                        :required="item.required"
                        :rules="item.rules"
                        :error="item.error"
                        :show-message="item.showMessage"
                        :inline-message="item.inlineMessage"
                        :size="item.size">
                    <!--                    <template v-if="inputTypeArray.indexOf(item.type)>=0">-->
                    <!--                        <cl-input v-model="value[item.prop]" :option="item"></cl-input>-->
                    <!--                    </template>-->
                    <template v-if="inputNumberTypeArray.indexOf(item.type)>=0">
                        <cl-input-number v-model="value[item.prop]" :option="item"></cl-input-number>
                    </template>
                    <template v-else-if="radioTypeArray.indexOf(item.type)>=0">
                        <cl-radio v-model="value[item.prop]" :option="item"></cl-radio>
                    </template>
                    <template v-else-if="checkboxTypeArray.indexOf(item.type)>=0">
                        <cl-check-box v-model="value[item.prop]" :option="item"></cl-check-box>
                    </template>
                    <template v-else-if="selectTypeArray.indexOf(item.type)>=0">
                        <cl-select v-model="value[item.prop]" :option="item"></cl-select>
                    </template>
                    <template v-else>
                        <cl-input v-model="value[item.prop]" :option="item"></cl-input>
                    </template>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-form-item class="center" v-if="defaultOption.btn === true">
                <div :style="'margin-left:-' + defaultOption.labelWidth">
                    <el-button type="primary" :icon="defaultLoading?'el-icon-loading':defaultOption.submitBtn.icon"
                               @click="onSubmit"
                               v-if="defaultOption.submitBtn!==false && defaultOption.submitBtn.display===true">
                        {{defaultOption.submitBtn.text}}
                    </el-button>
                    <el-button type="primary" plain :icon="defaultLoading?'el-icon-loading':defaultOption.resetBtn.icon"
                               @click="onReset"
                               v-if="defaultOption.resetBtn!==false && defaultOption.resetBtn.display===true">
                        {{defaultOption.resetBtn.text}}
                    </el-button>
                    <slot name="btn"/>
                </div>
            </el-form-item>
        </el-row>
    </el-form>
</template>

<script>
    import deOp from './option'
    import beanUtil from '../util/bean-util'
    import {inputTypeArray, inputNumberTypeArray, radioTypeArray, checkboxTypeArray, selectTypeArray} from '../util/type'

    export default {
        name: "ClForm",
        componentName: 'ClForm',
        props: {
            value: {},
            option: {type: Object, default: undefined},
            loading: {type: Boolean, default: false}
        }, watch: {
            value: {
                deep: true,
                immediate: true,
                handler(val) {
                    this.form = JSON.parse(JSON.stringify(val))
                    if (!this.formBack) {
                        this.formBack = JSON.parse(JSON.stringify(val))
                    }
                }
            },
            option: {
                deep: true,
                immediate: true,
                handler(val) {
                    this.setOption(val)
                }
            }, loading(val) {
                this.defaultLoading = val
            }
        }, created() {
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp)),
                form: {},
                formBack: undefined,
                defaultLoading: false,
                inputTypeArray: inputTypeArray,
                radioTypeArray: radioTypeArray,
                checkboxTypeArray: checkboxTypeArray,
                selectTypeArray: selectTypeArray,
                inputNumberTypeArray: inputNumberTypeArray
            }
        }, methods: {
            setOption(val) {
                this.defaultOption = beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                if (this.defaultOption.readonly === true && this.defaultOption.items && this.defaultOption.items.constructor === Array) {
                    this.defaultOption.items.forEach(item => item.readonly = true)
                }
            },
            //对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
            validate(callback) {
                this.$refs.clForm.validate(callback)
            },
            //对部分表单字段进行校验的方法Function(props: array | string, callback: Function(errorMessage: string))
            validateField(props, callback) {
                this.$refs.clForm.validateField(props, callback)
            },
            //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            resetFields() {
                this.$refs.clForm.resetFields()
            },
            //移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
            clearValidate(props) {
                this.$refs.clForm.clearValidate(props)
            },
            onSubmit() {
                if (this.defaultOption.repeat) {
                    this.defaultLoading = true
                    this.$emit('submit', beanUtil.deepClone(this.form), () => {
                        this.defaultLoading = false
                    })
                } else {
                    this.$emit('submit', beanUtil.deepClone(this.form))
                }
            }, onReset() {
                this.$emit('input', JSON.parse(JSON.stringify(this.formBack)))

                //this.$refs.clForm.resetFields()
            }
        }
    }
</script>

<style scoped>
    .center {
        text-align: center;
    }
</style>
