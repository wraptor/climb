<template>
  <el-time-picker
    ref="clTimePickerRef"
    v-model="myValue"
    :readonly="defaultOption.readonly"
    :disabled="defaultOption.disabled || disabled"
    :editable="defaultOption.editable"
    :clearable="defaultOption.clearable"
    :size="defaultOption.size"
    :placeholder="defaultOption.placeholder"
    :start-placeholder="defaultOption.startPlaceholder"
    :end-placeholder="defaultOption.endPlaceholder"
    :is-range="defaultOption.isRange"
    :arrow-control="defaultOption.arrowControl"
    :align="defaultOption.align"
    :popper-class="defaultOption.popperClass"
    :picker-options="defaultOption.pickerOptions"
    :range-separator="defaultOption.rangeSeparator"
    :default-value="defaultOption.defaultValue"
    :value-format="defaultOption.valueFormat"
    :name="defaultOption.name"
    :prefix-icon="defaultOption.prefixIcon"
    :clear-icon="defaultOption.clearIcon"
    @change="handleChange"
    @blur="handleBlur"
    @focus="handleFocus"
  >
  </el-time-picker>
</template>

<script>
import beanUtil from "../util/bean-util";
import deOp from "./option";

export default {
  name: "ClTimePicker",
  props: {
    value: {},
    option: { type: Object, default: undefined },
    disabled: { type: Boolean, default: false }
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.defaultOption);
      }
    },
    value(val) {
      this.myValue = val;
    },
    myValue(val) {
      this.$emit("input", val);
    }
  },
  data() {
    return {
      myValue: this.value,
      defaultOption: JSON.parse(JSON.stringify(deOp))
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
    handleBlur(value) {
      this.$emit("blur", value);
    },
    handleFocus(value) {
      this.$emit("focus", value);
    },
    focus() {
      this.$refs.clTimePickerRef.focus();
    }
  }
};
</script>

<style scoped></style>
