<template>
  <el-tag
    :key="index"
    style="margin-right: 10px"
    v-for="(item,index) in dynamicTags"
    closable
    :disable-transitions="false"
    @close="tagDel(item)">
    {{ item }}
  </el-tag>
  <el-input
    :style="{width:myOption.inputWidth+'px'}"
    v-model.trim="inputValue"
    ref="saveTagInput"
    v-if="inputVisible"
    :maxlength="myOption.maxlength"
    :show-word-limit="myOption.showWordLimit"
    @keyup.enter.native="handleInputConfirm(false)"
    @blur="handleInputConfirm"
  ></el-input>
  <el-button v-show="!inputVisible && dynamicTags.length < myOption.maxCount" class="button-new-tag"
             @click="showTagInput">+ 新标签
  </el-button>
</template>

<script>
import beanUtil from "../util/bean-util";
import option from "./option";

export default {
  name: "ClTagInput",
  props: {
    modelValue: {
      type: [Array],
      default: () => {
        return [];
      }
    },
    option: {},
    disabled: {}
  },
  emits: ["update:modelValue"],
  watch: {
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
      myOption: JSON.parse(JSON.stringify(option)),
      dynamicTags: JSON.parse(JSON.stringify(this.modelValue)),
      inputValue: "",
      inputVisible: false
    };
  },
  methods: {
    tagDel(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showTagInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(flag = true) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(this.inputValue);
        this.$emit("update:modelValue", this.dynamicTags);
      }
      this.inputValue = "";
      if (flag || this.dynamicTags.length >= this.myOption.maxCount) {
        this.inputVisible = false;
      }
    }
  }
};
</script>

<style scoped>
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>