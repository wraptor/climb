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
             :disabled="defaultOption.disabled||loading"
             :model="form">
        <el-form-item :label="item.label?item.label+'：':''" :prop="item.prop"
                      v-for="(item,index) in defaultOption.items"
                      v-bind:key="index">
            <template v-if="inputTypeArray.indexOf(item.type)>=0">
                <cl-input v-model="form[item.prop]" :option="item"></cl-input>
            </template>
            <template v-else-if="radioTypeArray.indexOf(item.type)>=0">
                <cl-radio v-model="form[item.prop]" :option="item"></cl-radio>
            </template>
            <template v-else-if="checkboxTypeArray.indexOf(item.type)>=0">
                <cl-check-box v-model="form[item.prop]" :option="item"></cl-check-box>
            </template>
        </el-form-item>
        <el-form-item class="center">
            <el-button type="primary" :icon="loading?'el-icon-loading':defaultOption.submitBtn.icon" @click="onSubmit"
                       v-if="defaultOption.submitBtn.display">{{defaultOption.submitBtn.text}}
            </el-button>
            <el-button type="primary" :icon="loading?'el-icon-loading':defaultOption.resetBtn.icon" @click="onReset"
                       v-if="defaultOption.resetBtn.display">{{defaultOption.resetBtn.text}}
            </el-button>
            <slot name="btn"/>
        </el-form-item>
    </el-form>
</template>

<script>
    import deOp from './option'
    import beanUtil from '../util/bean-util'
    import {inputTypeArray, radioTypeArray, checkboxTypeArray} from './type'
    import ClInput from '../input/input'

    export default {
        name: "ClForm",
        componentName: 'ClForm',
        components: {
            ClInput
        },
        props: {
            value: {},
            option: {type: Object, default: undefined}
        }, watch: {
            option: {
                deep: true,
                handler(val) {
                    this.defaultOption = beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                }
            }
        }, created() {
            if (this.option) {
                this.defaultOption = beanUtil.copyPropertiesNotEmpty(this.option, this.defaultOption)
            }
            this.formBack = JSON.parse(JSON.stringify(this.value))
        }, mounted() {
            console.log(this.defaultOption)
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp)),
                form: this.value,
                formBack: {},
                loading: false,
                inputTypeArray: inputTypeArray,
                radioTypeArray: radioTypeArray,
                checkboxTypeArray: checkboxTypeArray
            }
        }, methods: {
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
                    this.loading = true
                    this.$emit('submit', beanUtil.deepClone(this.form), _ => {
                        this.loading = false
                    })
                } else {
                    this.$emit('submit', beanUtil.deepClone(this.form))
                }
            }, onReset() {
                this.form = JSON.parse(JSON.stringify(this.formBack))
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