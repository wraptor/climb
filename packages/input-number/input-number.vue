<template>
    <el-input-number
            ref="inputNumberRef"
            v-model="myValue"
            :min="defaultOption.min"
            :max="defaultOption.max"
            :step="defaultOption.step"
            :stepStrictly="defaultOption.stepStrictly"
            :precision="defaultOption.precision"
            :size="defaultOption.size"
            :disabled="disabled || defaultOption.disabled"
            :controls="defaultOption.controls"
            :controlsPosition="defaultOption.controlsPosition"
            :name="defaultOption.name"
            :label="defaultOption.label"
            :placeholder="defaultOption.placeholder"
            @change="handleChange"
            @blur="handleBlur"
            @focus="handleFocus"
    >
    </el-input-number>
</template>

<script>
    import beanUtil from "../util/bean-util";
    import deOp from "./option";

    export default {
        name: "ClInputNumber",
        props: {
            value: {},
            option: {type: Object, default: undefined},
            disabled: {type: Boolean, default: false},
            min: {type: Number, default: undefined},
            max: {type: Number, default: undefined},
        }, watch: {
            option: {
                deep: true,
                handler(val) {
                    beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                }
            }, min: {
                handler(val) {
                    this.defaultOption.min = val
                }
            }, max: {
                handler(val) {
                    this.defaultOption.max = val
                }
            }, value(val) {
                this.myValue = val
            }, myValue(val) {
                this.$emit('input', val)
            }
        }, created() {
            if (this.option) {
                beanUtil.copyPropertiesNotEmpty(this.option, this.defaultOption)
            }
            if (this.min) {
                this.defaultOption.min = this.min
            }
            if (this.max) {
                this.defaultOption.max = this.max
            }
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp)),
                myValue: this.value
            }
        }, methods: {
            handleBlur(event) {
                this.$emit('blur', event);
            }, handleFocus(event) {
                this.$emit('focus', event);
            }, handleChange(value) {
                this.$emit('change', value);
            }, focus() {
                this.$refs.inputNumberRef.focus();
            }, select() {
                this.$refs.inputNumberRef.select();
            }
        }
    }
</script>

<style scoped>

</style>
