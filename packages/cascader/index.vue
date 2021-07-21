<template>
  <el-cascader
    :props="myOption.props"
    :options="myOption.dicData"
    :size="myOption.size"
    :placeholder="myOption.placeholder"
    :disabled="myOption.disabled || disabled"
    :clearable="myOption.clearable"
    :show-all-levels="myOption.showAllLevels"
    :collapse-tags="myOption.collapseTags"
    :separator="myOption.separator"
    :filterable="myOption.filterable"
    :filter-method="myOption.filterMethod"
    :debounce="myOption.debounce"
    :before-filter="myOption.beforeFilter"
    :popper-class="myOption.popperClass"
    style="width: 100%"
    v-model="value"
    @change="handleChange"
  >
  </el-cascader>
</template>

<script>
import option from './option'
import beanUtil from '../util/bean-util'

export default {
  name: 'ClCascader',
  props: {
    modelValue: {
      type: [Array, String, Number]
    },
    option: {},
    dicData: {},
    props: {},
    disabled: {}
  },
  watch: {
    props: {
      handler(val) {
        if (val) {
          beanUtil.copyPropertiesNotEmpty({ props: val }, this.myOption)
        }
      },
      immediate: true,
      deep: true
    },
    dicData: {
      handler(val) {
        if (val) {
          this.myOption.dicData = val
        }
      },
      immediate: true,
      deep: true
    },
    modelValue: {
      handler(val) {
        this.value = val
      },
      deep: true
    },
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption)
        if (this.myOption.dicUrl) {
          window.axios.get(this.myOption.dicUrl).then((res) => {
            this.myOption.dicData = res
          })
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
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleChange(val) {
      this.$emit('update:modelValue', val)
    }
  }
}
</script>

<style scoped></style>
