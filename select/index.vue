<template>
  <el-select :multiple="myOption.multiple"
             :multiple-limit="myOption.multipleLimit"
             :disabled="myOption.disabled || disabled"
             :placeholder="myOption.placeholder"
             :clearable="myOption.clearable"
             v-model="value" @change="handleChange">
    <el-option
      v-for="item in myOption.dicData"
      :key="item[myOption.props.value]!==undefined?item[myOption.props.value]:
item[myOption.props.label]"
      :label="item[myOption.props.label]"
      :value="item[myOption.props.value]!==undefined?item[myOption.props.value]:
item[myOption.props.label]">
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
      type: [Array, String, Number]
    },
    option: {},
    dicData: {},
    props: {},
    disabled: {}
  }, watch: {
    props: {
      handler(val) {
        if (val) {
          beanUtil.copyPropertiesNotEmpty({ props: val }, this.myOption);
        }
      },
      immediate: true,
      deep: true
    },
    dicData: {
      handler(val) {
        if (val) {
          this.myOption.dicData = val;
        }
      },
      immediate: true,
      deep: true
    },
    modelValue: {
      handler(val) {
        this.value = val;
      },
      deep: true
    },
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption);
        console.log(this.myOption);
        if (this.myOption.dicUrl) {
          window.axios.get(this.myOption.dicUrl).then(res => {
            this.myOption.dicData = res;
          });
        }
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
  created() {
    setTimeout(() => {
      console.log(this.myOption);

    }, 2000);
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