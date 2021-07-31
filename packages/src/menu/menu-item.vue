<template>
  <div>
    <template v-for="(item, index) in items">
      <el-menu-item-group
        v-if="item.type === 'group'"
        :key="item.index ? item.index : level + index"
        :title="item.title"
      >
        <cl-menu-item
          :items="item.items"
          :sub-option="subOption"
          :level="level + index + '-'"
          :disabled="disabled"
        />
      </el-menu-item-group>
      <template v-else>
        <el-menu-item
          v-if="isEmpty(item.items)"
          :disabled="disabled || item.disabled"
          :index="item.index ? item.index : level + index"
          :key="item.index ? item.index : level + index"
        >
          <template #title>
            <i v-if="item.icon" :class="item.icon" />
            <span> {{ item.title }}</span>
          </template>
        </el-menu-item>
        <el-submenu
          v-else
          :popper-class="subOption.popperClass"
          :show-timeout="subOption.showTimeout"
          :hide-timeout="subOption.hideTimeout"
          :popper-append-to-body="subOption.popperAppendToBody"
          :disabled="disabled || item.disabled"
          :index="item.index ? item.index : level + index"
          :key="item.index ? item.index : level + index"
        >
          <template #title>
            <i v-if="item.icon" :class="item.icon" />
            <span> {{ item.title }}</span>
          </template>
          <cl-menu-item
            :items="item.items"
            :sub-option="subOption"
            :level="level + index + '-'"
            :disabled="disabled"
          />
        </el-submenu>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ClMenuItem',
  props: {
    items: { type: Array, default: () => [] },
    level: { type: String, default: () => '' },
    disabled: { type: Boolean, default: () => false },
    collapse: { type: Boolean, default: () => false },
    subOption: {
      type: Object,
      default: () => {
        return {
          popperClass: undefined, // 弹出菜单的自定义类名
          showTimeout: 300, // 展开 sub-menu 的延时
          hideTimeout: 300, // 收起 sub-menu 的延时
          popperAppendToBody: undefined // 是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性
        }
      }
    }
  },
  methods: {
    isEmpty(item) {
      return item === undefined || item === null || item.length === 0
    }
  }
}
</script>

<style scoped></style>
