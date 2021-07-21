<template>
  <div style="display: flex; flex-direction: row">
    <cl-input v-model="value1" :option="myOption" />
    <span style="padding: 0 10px">-</span>
    <cl-input v-model="value2" :option="myOption" />
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import beanUtil from '../util/bean-util'

export default {
  name: 'ClInputRange',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    option: {},
    disabled: {}
  },
  watch: {
    modelValue: {
      handler(val) {
        if (val && val.length === 2) {
          this.value1 = val[0]
          this.value2 = val[1]
        } else {
          this.value1 = undefined
          this.value2 = undefined
        }
      },
      immediate: true,
      deep: true
    },
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption)
        this.myOption.type = this.myOption.type.replaceAll('Range', '')
      },
      immediate: true,
      deep: true
    },
    value1() {
      this.$emit('update:modelValue', [this.value1, this.value2])
    },
    value2() {
      this.$emit('update:modelValue', [this.value1, this.value2])
    }
  },
  setup() {
    return {
      value1: ref(undefined),
      value2: ref(undefined),
      myOption: reactive({})
    }
  }
}
</script>

<style scoped></style>
