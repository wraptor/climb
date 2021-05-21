<template>
  <el-select
    v-model="myValue"
    :multiple-limit="myOption.multipleLimit"
    :disabled="myOption.disabled || disabled"
    :placeholder="myOption.placeholder"
    :clearable="myOption.clearable"
    :filterable="myOption.filterable"
    ref="listSelectRef"
    style="width: 100%;"
  >
    <cl-list @load="handleLoad">
      <template #default="{item}">
        <el-option
          :value="item[myOption.props.value]"
          :label="filterLabel(item)"
        >
        </el-option>
      </template>
    </cl-list>
  </el-select>
</template>

<script>
import beanUtil from "../util/bean-util";
import option from "./option";

export default {
  name: "ClListSelect",
  props: {
    modelValue: {
      default: () => []
    },
    option: {},
    disabled: {}
  },
  emits: ["update:modelValue"],
  data() {
    return {
      myOption: JSON.parse(JSON.stringify(option))
    };
  },
  watch: {
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption);
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    myValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      }
    }
  },
  methods: {
    filterLabel(item) {
      if (
        Object.prototype.toString.call(this.myOption.props.label) ===
        "[object Function]"
      ) {
        return this.myOption.props.label(item);
      }
      return item[this.myOption.props.label];
    },
    handleLoad(page, done) {
      if (this.myOption.dicUrl) {
        window.axios
          .get(this.myOption.dicUrl, {
            params: Object.assign(page, this.myOption.params)
          })
          .then(res => {
            done(res);
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
};
</script>

<style scoped>
::v-deep(.el-select-dropdown__item) {
  width: 100%;
}
</style>
