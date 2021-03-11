<template>
  <el-select :multiple="myOption.multiple"
             :multiple-limit="myOption.multipleLimit"
             :placeholder="myOption.placeholder"
             :clearable="myOption.clearable"
             v-model="value" @change="handleChange">
    <el-option
      v-for="item in myOption.dicData"
      :key="item[myOption.dicProps.value]?item[myOption.dicProps.value]:
item[myOption.dicProps.label]"
      :label="item[myOption.dicProps.label]"
      :value="item[myOption.dicProps.value]?item[myOption.dicProps.value]:
item[myOption.dicProps.label]">
    </el-option>
  </el-select>
</template>

<script>
import option from "./option";
import beanUtil from "../util/bean-util";

export default {
  name: "ClSelect",
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    option: {}
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
      myOption: beanUtil.deepClone(option)
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