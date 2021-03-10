<template>
  <el-date-picker v-model="value"
                  :type="myOption.type"
                  placeholder="选择日期"
                  :format="myOption.format.toUpperCase()"
                  @change="handleChange">

  </el-date-picker>
</template>

<script>
import option from "./option";
import beanUtil from "../util/bean-util";
import { dateFormat } from "../util/date-util";
import { PropType } from "vue";

export default {
  name: "ClDatePicker",
  props: {
    modelValue: {
      type: [Date, Array, String],
      default: ""
    },
    option: {}
  }, watch: {
    modelValue: {
      handler(val) {
        if(val){
          this.value = val;
        }
      },
      deep: true,
      immediate: true
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
      value: "",
      myOption: JSON.parse(JSON.stringify(option))
    };
  },
  emits: ["update:modelValue"],
  methods: {
    handleChange(val) {
      if (Object.prototype.toString.call(val) === "[object Array]") {
        const temp = [];
        for (let i = 0; i < val.length; i++) {
          temp.push(dateFormat(val[i], this.myOption.valueFormat));
        }
        this.$emit("update:modelValue", temp);
      } else {
        this.$emit("update:modelValue", dateFormat(val, this.myOption.valueFormat));
      }
    }
  }
};
</script>

<style scoped>

</style>