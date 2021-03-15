<template>
  <el-checkbox-group :disabled="myOption.disabled || disabled" v-model="value" :min="myOption.min" :max="myOption.max" @change="handleChange">
    <el-checkbox :border="myOption.border" :label="item[myOption.dicProps.value]!==undefined?item[myOption.dicProps.value]:
item[myOption.dicProps.label]"
                 v-for="item in myOption.dicData">
      {{ item[myOption.dicProps.label] }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import option from "./option";
import beanUtil from "../util/bean-util";

export default {
  name: "ClCheckBox",
  props: {
    modelValue: {
      type: Array,
      default: () => []
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