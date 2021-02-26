<template>
  <el-input
    ref="inputRef"
    v-model="myValue"
    :maxlength="defaultOption.maxlength"
    :minlength="defaultOption.minlength"
    :show-word-limit="defaultOption.showWordLimit"
    :placeholder="defaultOption.placeholder"
    :clearable="defaultOption.clearable"
    :show-password="defaultOption.showPassword"
    :disabled="disabled || defaultOption.disabled"
    :size="defaultOption.size"
    :prefix-icon="defaultOption.prefixIcon"
    :suffix-icon="defaultOption.suffixIcon"
    :rows="defaultOption.rows"
    :autosize="defaultOption.autosize"
    :autocomplete="defaultOption.autocomplete"
    :auto-complete="defaultOption.autoComplete"
    :name="defaultOption.name"
    :readonly="defaultOption.readonly"
    :max="defaultOption.max"
    :min="defaultOption.min"
    :step="defaultOption.step"
    :resize="defaultOption.resize"
    :autofocus="defaultOption.autofocus"
    :form="defaultOption.form"
    :label="defaultOption.label"
    :tabindex="defaultOption.tabindex"
    :validateEvent="defaultOption.validateEvent"
    :type="defaultOption.type"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
    @clear="handleClear"
  >
    <slot name="prefix" slot="prefix" />
    <slot name="suffix" slot="suffix" />
    <slot name="prepend" slot="prepend" />
    <slot name="append" slot="append" />
  </el-input>
</template>

<script>
import beanUtil from "../util/bean-util";
import deOp from "./option";

export default {
  name: "ClInput",
  props: {
    value: {},
    option: { type: Object, default: undefined },
    disabled: { type: Boolean, default: false }
  },
  watch: {
    option: {
      deep: true,
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
  created() {
    if (this.option) {
      beanUtil.copyPropertiesNotEmpty(this.option, this.defaultOption);
    }
  },
  data() {
    return {
      myValue: this.value,
      defaultOption: JSON.parse(JSON.stringify(deOp))
    };
  },
  methods: {
    handleBlur(event) {
      this.$emit("blur", event);
    },
    handleFocus(event) {
      this.$emit("focus", event);
    },
    handleChange(value) {
      this.$emit("change", value);
    },
    handleClear() {
      this.$emit("clear");
    },
    focus() {
      this.$refs.inputRef.focus();
    },
    blur() {
      this.$refs.inputRef.blur();
    },
    select() {
      this.$refs.inputRef.select();
    }
  }
};
</script>

<style scoped></style>
