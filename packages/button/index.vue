<template>
  <el-button
    :type="type"
    :size="size"
    :icon="icon"
    :native-type="nativeType"
    :plain="plain"
    :autofocus="autofocus"
    :round="round"
    :circle="circle"
    :disabled="disabled || myDisabled"
    :loading="loading || myLoading"
    @click="handleClick"
  >
    <slot></slot>
  </el-button>
</template>

<script>
import { ref } from 'vue'
import { throttle } from '../util/util'

export default {
  name: 'ClButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (val) => {
        return ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text'].includes(val)
      }
    },
    size: {
      type: String
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button',
      validator: (val) => {
        return ['button', 'submit', 'reset'].includes(val)
      }
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  emits: ['click'],
  setup(props, { emit }) {
    const myDisabled = ref(false)
    const myLoading = ref(false)
    return {
      myDisabled,
      myLoading,
      handleClick: throttle(() => {
        myLoading.value = true
        myDisabled.value = true
        emit('click', () => {
          setTimeout(() => {
            myLoading.value = false
            myDisabled.value = false
          }, 100)
        })
      })
    }
  }
}
</script>

<style scoped></style>
