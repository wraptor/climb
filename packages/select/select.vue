<template>
    <el-input-number
            ref="inputNumberRef"
            v-model="value"
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
        name: "ClSelect",
        props: {
            value: {},
            option: {type: Object, default: undefined},
            disabled: {type: Boolean, default: false}
        }, watch: {
            option: {
                deep: true,
                handler(val) {
                    beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                }
            }
        }, created() {
            if (this.option) {
                beanUtil.copyPropertiesNotEmpty(this.option, this.defaultOption)
            }
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp))
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