<template>
  <el-radio-group v-model="value" :disabled="myOption.disabled || disabled" @change="handleChange">
    <el-radio :border="myOption.border" :label="item[myOption.dicProps.value]!==undefined?item[myOption.dicProps.value]:
item[myOption.dicProps.label]"
              v-for="item in myOption.dicData" :key="item[myOption.dicProps.value]!==undefined?item[myOption.dicProps.value]:
item[myOption.dicProps.label]">
      {{ item[myOption.dicProps.label] }}
    </el-radio>
  </el-radio-group>
</template>

<script>
import option from "./option";
import beanUtil from "../util/bean-util";

export default {
  name: "ClRadio",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    option: {},
    disabled: {}
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
  data() {
    return {
      value: this.modelValue,
      myOption: JSON.parse(JSON.stringify(option))
    };
  },
  emits: ["update:modelValue"],
  methods: {
    handleChange(val) {
      this.$emit("update:modelValue", val);
    }
  }
};
</script>

<style scoped>

</style>