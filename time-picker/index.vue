<template>
  <el-time-picker
    v-model="value"
    :is-range="myOption.type==='timerange'"
    :format="myOption.format"
    :placeholder="myOption.placeholder"
    :disabled-hours="myOption.disabledHours"
    :disabled-minutes="myOption.disabledMinutes"
    :disabled-seconds="myOption.disabledSeconds"
    @change="handleChange">
  </el-time-picker>
</template>

<script>
import option from "./option";
import beanUtil from "../util/bean-util";

export default {
  name: "ClTimePicker",
  props: {
    modelValue: {
      type: [Date, Array, String],
      default: ""
    },
    option: {}
  }, watch: {
    modelValue: {
      handler(val) {
        if (val) {
          if (Object.prototype.toString.call(val) === "[object Array]") {
            let temp = [];
            for (let i = 0; i < val.length; i++) {
              temp.push(new Date("2020-01-01 " + val[i]));
            }
            this.value = temp;
          } else {
            this.value = new Date("2020-01-01 " + val);
          }
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
          temp.push(val[i].format(this.myOption.valueFormat));
        }
        this.$emit("update:modelValue", temp);
      } else if (val) {
        this.$emit("update:modelValue", val.format(this.myOption.valueFormat));
      }
    }
  }
};
</script>

<style scoped>

</style>