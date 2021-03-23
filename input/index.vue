<template>
  <el-input :type="myOption.type"
            v-model="value"
            :disabled="myOption.disabled || disabled"
            v-if="myOption.type!=='number'"
            :maxlength="myOption.maxlength"
            :show-word-limit="myOption.showWordLimit"
            :show-password="myOption.type==='password' && myOption.showPassword!==false"
            :prefix-icon="myOption.prefixIcon"
            :suffix-icon="myOption.suffixIcon"
            :rows="myOption.rows"
            :autosize="myOption.autosize"
            :autocomplete="myOption.autocomplete"
            :name="myOption.prop"
            :placeholder="myOption.placeholder"
            @input="handleInput">
    <template #suffix v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </template>
    <template #prefix v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </template>
  </el-input>

  <el-input-number
    v-else
    :disabled="myOption.disabled || disabled"
    v-model="value"
    :model-value="value"
    :min="myOption.min"
    :max="myOption.max"
    :step="myOption.step"
    :step-strictly="myOption.stepStrictly"
    :precision="myOption.precision"
    :controls="myOption.controls"
    :controls-position="myOption.controlsPosition"
    @change="handleInput" />
</template>

<script>
import { ref, reactive } from "vue";
import option from "./option";
import beanUtil from "../util/bean-util";

export default {
  name: "ClInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    option: {},
    disabled:{}
  }, watch: {
    modelValue(val) {
      this.value = val;
    },
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption);
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    console.log("slot",this.$slots)
  },
  setup(props, ctx) {
    return {
      value: ref(props.modelValue),
      myOption: reactive(JSON.parse(JSON.stringify(option))),
      handleInput: (val) => {
        ctx.emit("update:modelValue", val);
      }
    };
  }
};
</script>

<style scoped>

</style>