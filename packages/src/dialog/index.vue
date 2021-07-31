<template>
  <div v-dialog-drag>
    <el-dialog
        :top="top"
        :center="center"
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
            <span style="height: 26px; line-height: 26px">{{ title }}</span>
            <div class="flex-row items-center">
              <el-tooltip
                  effect="dark"
                  :show-after="500"
                  :enterable="false"
                  :content="myFullscreen ? '还原' : '最大化'"
                  placement="bottom"
              >
                <i
                    class="climb-icon dialog-icon"
                    style="font-size: 17px"
                    :class="myFullscreen ? 'cl-batch-folding' : 'cl-border'"
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
                <i class="cl-close climb-icon dialog-icon" @click="visible = false"></i>
              </el-tooltip>
            </div>
          </div>
        </slot>
      </template>
      <template #footer v-if="$slots['footer']">
        <slot name="footer"></slot>
      </template>
      <div v-loading="loading">
        <slot></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ClDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {},
    destroyOnClose: {},
    customClass: {
      type: String,
      default: ''
    },
    fullscreen: {type: Boolean, default: false},
    width: {},
    top: {},
    center: {},
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visible: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  },
  watch: {
    myFullscreen(val) {
      // TODO 理论上监听到全屏时，设置top0 left0，但是不生效
      let elDom = document.querySelector(".el-dialog");
      console.log(elDom)
      setTimeout(() => {
        this.$nextTick(() => {
          if (val) {
            elDom.style.left="0";
            elDom.style.top="0";
            // elDom.style.cssText += ";top:0px;left:0px;";
            console.log(elDom.style);
            console.log(elDom.style.cssText);
          }
        })
      }, 10);
    }
  },
  data() {
    return {
      myFullscreen: this.fullscreen
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: "climb-icon"; /* Project id 2706232 */
  src:
      url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAQwAAsAAAAACigAAAPjAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDQAqGbIVFATYCJAMYCw4ABCAFhH8HZxuwCBGFlJJ9JJRjTu3/GquoqIPXwQPl+b2ZTNJu+kmuySPsI+jr9r792imioQ4Wv8arWBLvK7Pf1t7snIVMS6RMp1IC/3Ms9dKiQPLTpWtVrzqfF0hU2kgKpEQm4jOBXd16IWvRL0EAJikUISuqGlrjNLjH6KH4oZAmCnBLi8ED+vXAejejUsgCq87gnqgQy9FBLpB3gGXm54svpAkrSHQN6VbN+1b25sKHMx8XaNPt0+msPWV6dfWwswR0QAMSOmYVo9PdQ9HsdAIaZlxSUQbf461I5IczH35/7PRxgd0OAqajfGhqU1Y70L88iUJHA2EgqR2gbbgbdaZOohoRouY3OJDwsaMRBU0nGNGhWQANy643KtzBGYQriFokXAIeidpaShc56qlCvOh3TXJauAM1fafNedFuoc/Y1dlJdx4XRrSjrYbpa5RKc9kWrYs8YrgjDqP6rVtrmgs92nc0Uqs9+/Reneby7tQBgXVeg4ph9GqbM9FmzRrvYg2xyLVuhpcZaFe4Zh0EZqw1W69e7Vm4wXTPDmvXehS0XbtQEHoUbYBYI6xF2TMQaF20djUJGy3Qbt06r6J2hbsexNO3rqZ9YeX6dgXaF1HXHTq1crbm8tIxzFF1ZDxYLgX5say7tz45Mtq5UMHt1/trFVoOrCUl1gP6O4Y1PxpTEkP6ND0nvUZvbql8IB6KSktzryJcEWqqnDD1oXjwiJp0QledDosp2eamKpTbNjUzbfecOa4W112q8XEmpebM2Z02M7ZKhdrmVhITfipp4N9cVnTOnFPhxYf3+n+OaTF36bW/9S6n467Cw3t0O3pYk73b/TYmA2D/qa3QXEw20IrkdWoP+co7Qv46+76GjYcPxHdzLtD8s9oUAM+iTj5C2P5TUTxjRQJbfK5pYHaqvhEwVFzjag0EYNA+n1vCSeUH+9vvxm9VWnd2EgSmT3IDiYVA0DCJQCpsEujYyAEDk3IwiefhdBvubJgiVBMgii8BBB58g8SJq6DhwQ9SYf9Ax4t/MPAQrmDSVlxdzEaUmHRNKBg1yC10KnijFGZlOyczWukVm6UV9KxnJz6RUod5UOVlRO4ePVJZh6RVUzMbMBQc3FV5O7Q2QKTQo+K8ZY6LojBxr5Kr4EbXEIiAQTSAZAvQoQh4jL4/o7B0OCRZfMFXkIblbWoBpTYZLvgJQqSviNYPVOSULOS92jMb7VjFxIqGGpadBlCdRCAvcNdVJBa1BIAYv10PomBy2gLJyIJC7sxw1XmzWre6lwEm0t8whBSaUEIXhrBg9AykkY6lYNVmJljd+WaubEh4YJbWJkWI/tQpnOGm49EIAA==') format('woff2');
}

.climb-icon {
  font-family: "climb-icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.cl-border:before {
  content: "\e7bc";
}

.cl-batch-folding:before {
  content: "\e7f2";
}

.cl-close:before {
  content: "\e889";
}

.cl-fullscreen:before {
  content: "\e85a";
}

.cl-fullscreen-exit:before {
  content: "\e85b";
}




.dialog-icon {
  padding: 2px 0 2px 4px;
  cursor: pointer;
  color: #909399;
  font-size: 20px;
  height: 22px;
  line-height: 22px;

  &:hover {
    color: var(--el-color-primary);
  }
}

::v-deep(.el-dialog) {
  display: flex;
  flex-direction: column;
  max-height: 75%;
  min-width: 550px;
}
::v-deep(.el-dialog__body) {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 20px 30px;
}
::v-deep(.el-dialog__header) {
  padding: 16px 20px;
}
::v-deep(.el-dialog.height80){
  height: 80%;
  max-height: 80%;
}
::v-deep(.el-dialog.height90){
  height: 90%;
  max-height: 90%;
}
::v-deep(.el-dialog.is-fullscreen){
  max-height: 100%;
  height: 100%;
  left: 0!important;
  top:0!important;
  border-radius:0;
}

.flex-row {
  flex-direction: row !important;
  position: relative;
  display: flex;;
}

.items-center {
  align-items: center !important;
}

.justify-between {
  justify-content: space-between !important;
}
</style>
