<template>
  <el-date-picker
    v-model="value"
    :style="myOption.width ? { width: myOption.width + 'px' } : { width: '100%' }"
    :disabled="myOption.disabled || disabled"
    :type="myOption.type"
    :placeholder="myOption.placeholder"
    :start-placeholder="myOption.startPlaceholder"
    :end-placeholder="myOption.endPlaceholder"
    :format="myOption.format"
    @change="handleChange"
  >
  </el-date-picker>
</template>

<script>
import option from './option'
import beanUtil from '../util/bean-util'
import { debounce } from '../util/util'

export default {
  name: 'ClDatePicker',
  props: {
    modelValue: {
      type: [Date, Array, String],
      default: ''
    },
    option: {},
    disabled: {}
  },
  watch: {
    modelValue: {
      handler(val) {
        if (val !== this.backValue) {
          this.value = val
        }
      },
      deep: true,
      immediate: true
    },
    option: {
      handler(val) {
        if ((val.type === 'datetime' || val.type === 'datetimerange') && !val.format) {
          val.format = 'YYYY-MM-DD HH:mm:ss'
        }
        if ((val.type === 'datetime' || val.type === 'datetimerange') && !val.valueFormat) {
          val.valueFormat = 'yyyy-MM-dd HH:mm:ss'
        }
        beanUtil.copyPropertiesNotEmpty(val, this.myOption)
        this.myOption.format = this.myOption.format
          .replaceAll('yyyy', 'YYYY')
          .replaceAll('dd', 'DD')
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      value: '',
      backValue: '',
      myOption: JSON.parse(JSON.stringify(option))
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleChange: debounce(
      function (val) {
        if (!val) {
          this.backValue = val
        } else if (Object.prototype.toString.call(val) === '[object Array]') {
          const temp = []
          for (let i = 0; i < val.length; i++) {
            temp.push(val[i].format(this.myOption.valueFormat))
          }
          this.backValue = temp
        } else {
          this.backValue = val.format(this.myOption.valueFormat) // dateFormat(val, this.myOption.valueFormat);
        }
        this.$emit('update:modelValue', this.backValue)
      },
      500,
      false
    )
  }
}
</script>

<style scoped></style>
