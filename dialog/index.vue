<template>
  <div v-dialog-drag>
    <el-dialog
      :top="top"
      :fullscreen="myFullscreen"
      :show-close="false"
      :model-value="visible"
      :custom-class="customClass"
      :destroy-on-close="destroyOnClose"
      v-model="visible"
      :width="width > 0 ? width + 'px' : width"
    >
      <template #title>
        <slot name="title">
          <div class="flex-row justify-between">
            <span style="height: 26px;line-height: 26px;">{{ title }}</span>
            <div class="flex-row items-center">
              <el-tooltip
                effect="dark"
                :show-after="500"
                :enterable="false"
                :content="myFullscreen ? '还原' : '最大化'"
                placement="bottom"
              >
                <i
                  class="icon-ant dialog-icon"
                  style="font-size: 16px;"
                  :class="myFullscreen ? 'ant-Batchfolding' : 'ant-border'"
                  @click="myFullscreen = !myFullscreen"
                ></i>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                :show-after="500"
                :enterable="false"
                content="关闭"
                placement="bottom"
              >
                <i
                  class="el-icon-close dialog-icon"
                  @click="visible = false"
                ></i>
              </el-tooltip>
            </div>
          </div>
        </slot>
      </template>
      <template #footer v-if="$slots['footer']">
        <slot name="footer"></slot>
      </template>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ClDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {},
    destroyOnClose: {},
    customClass: {
      type: String,
      default: ""
    },
    fullscreen: { type: Boolean, default: false },
    width: {},
    top: {}
  },
  computed: {
    visible: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      }
    }
  },
  watch: {
    myFullscreen() {
      //TODO 理论上监听到全屏时，设置top0 left0，但是不生效
      // setTimeout(() => {
      //   this.$nextTick(()=>{
      //     let elDom = document.querySelector(".el-dialog");
      //     if (val) {
      //       elDom.style.cssText += ";top:0;bottom:0;right:0;left:0;";
      //       console.log(elDom.style);
      //       console.log(elDom.style.cssText);
      //     }
      //   })
      // }, 10);
    }
  },
  data() {
    return {
      myFullscreen: this.fullscreen
    };
  },
  created() {}
};
</script>

<style scoped lang="scss">
.dialog-icon {
  padding: 2px 0 2px 4px;
  cursor: pointer;
  color: #909399;
  font-size: 20px;
  height: 22px;
  line-height: 22px;

  &:hover {
    color: #2e41d9;
  }
}

::v-deep(.el-dialog) {
  display: flex;
  flex-direction: column;
  max-height: 75%;
  min-width: 550px;
  .el-dialog__body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 20px 30px;
  }
  .el-dialog__header {
    padding: 16px 20px;
  }
  &.height80 {
    height: 80%;
    max-height: 80%;
  }
  &.height90 {
    height: 90%;
    max-height: 90%;
  }
  &.is-fullscreen {
    max-height: 100% !important;
    height: 100%;
  }
}
</style>
