<template>
    <el-date-picker
            ref="clDatePickerRef"
            v-model="myValue"
            :type="defaultOption.type"
            :readonly="defaultOption.readonly"
            :disabled="defaultOption.disabled || disabled"
            :editable="defaultOption.editable"
            :clearable="defaultOption.clearable"
            :size="defaultOption.size"
            :placeholder="defaultOption.placeholder"
            :start-placeholder="defaultOption.startPlaceholder"
            :end-placeholder="defaultOption.endPlaceholder"
            :format="defaultOption.format"
            :align="defaultOption.align"
            :popper-class="defaultOption.popperClass"
            :picker-options="defaultOption.pickerOptions"
            :range-separator="defaultOption.rangeSeparator"
            :default-value="defaultOption.defaultValue"
            :default-time="defaultOption.defaultTime"
            :value-format="defaultOption.valueFormat"
            :name="defaultOption.name"
            :unlink-panels="defaultOption.unlinkPanels"
            :prefix-icon="defaultOption.prefixIcon"
            :clear-icon="defaultOption.clearIcon"
            :validate-event="defaultOption.validateEvent"
            @change="handleChange"
    >
    </el-date-picker>
</template>

<script>
    import beanUtil from "../util/bean-util";
    import deOp from "./option";

    export default {
        name: "ClDatePicker",
        props: {
            value: {},
            option: {type: Object, default: undefined},
            disabled: {type: Boolean, default: false}
        }, watch: {
            option: {
                deep: true,
                immediate: true,
                handler(val) {
                    beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                }
            }, value(val) {
                this.myValue = val
            }, myValue(val) {
                this.$emit('input', val)
            }
        }, data() {
            return {
                myValue: this.value,
                defaultOption: JSON.parse(JSON.stringify(deOp))
            }
        }, methods: {
            handleChange(value) {
                this.$emit('input', value)
                this.$emit('change', value);
            }, focus() {
                this.$refs.clDatePickerRef.focus();
            }
        }
    }
</script>

<style scoped>

</style>
