<template>
  <el-select :model-value="myValue" ref="treeSelectRef" style="width: 100%" :placeholder="myOption.placeholder?myOption.placeholder:`请选择${myOption.label}`">
    <el-option :value="myValue" :label="label">
      <el-tree
        ref="elTreeRef"
        :empty-text="myOption.emptyText"
        :default-expand-all="myOption.defaultExpandAll"
        :node-key="myOption.nodeKey ? myOption.nodeKey : myOption.props.value"
        :data="myOption.dicData"
        :default-checked-keys="myOption.showCheckbox ? modelValue : []"
        :expand-on-click-node="myOption.expandOnClickMode"
        :accordion="myOption.accordion"
        :show-checkbox="myOption.showCheckbox"
        :check-strictly="myOption.checkStrictly"
        :props="myOption.props"
        @node-click="handleNodeClick"
        @check="handleCheck"
      ></el-tree>
    </el-option>
  </el-select>
</template>
<script>
import beanUtil from '../util/bean-util'
import option from './option'

export default {
  name: 'ClTreeSelect',
  props: {
    modelValue: {},
    option: {},
    disabled: {}
  },
  emits: ['update:modelValue'],
  watch: {
    modelValue: {
      handler(val) {
        if (val !== undefined) {
          this.value = val
          this.resetCheckNodes()
        }
      },
      immediate: true,
      deep: true
    },
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption)
        this.initDic()
        this.resetCheckNodes()
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      value: '',
      myOption: JSON.parse(JSON.stringify(option)),
      checkedNodes: []
    }
  },
  computed: {
    myValue() {
      if (this.modelValue && this.modelValue.length > 0) {
        return JSON.stringify(this.modelValue)
      }
      return ''
    },
    label() {
      if (!this.myOption.showCheckbox) {
        const find = this.findNode(this.myOption.dicData, this.modelValue)
        if (find) {
          return find[this.myOption.props.label]
        }
      } else if (this.modelValue !== undefined) {
        let label = ''
        for (let i = 0; i < this.checkedNodes.length; i++) {
          label += this.checkedNodes[i][this.myOption.props.label]
          if (i < this.checkedNodes.length - 1) {
            label += ' | '
          }
        }
        return label
      }
      return ''
    }
  },
  methods: {
    initDic() {
      if (this.myOption.dicUrl) {
        window.axios.get(this.myOption.dicUrl).then((res) => {
          this.myOption.dicData = res
          this.resetCheckNodes()
        })
      }
    },
    resetCheckNodes() {
      if (this.myOption.showCheckbox) {
        this.$nextTick(() => {
          try {
            this.checkedNodes = this.$refs.elTreeRef.getCheckedNodes()
          } catch (e) {
            console.warn('this.checkedNodes = this.$refs.elTreeRef.getCheckedNodes(); is warning')
          }
        })
      }
    },
    handleCheck(data, { checkedNodes, checkedKeys }) {
      this.value = checkedKeys
      this.checkedNodes = checkedNodes
      this.$emit('update:modelValue', checkedKeys)
    },
    handleNodeClick(data) {
      if (!this.myOption.showCheckbox) {
        this.value = data[this.myOption.props.value]
          ? data[this.myOption.props.value]
          : data[this.myOption.props.label]
        this.$emit('update:modelValue', this.value)
        this.$refs.treeSelectRef.blur()
        if (this.myOption.change) {
          this.myOption.change(this.value, this.$parent.form)
        }
      }
    },
    findNode(nodes, key) {
      for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i]
        if (item[this.myOption.props.value] === key) {
          return item
        }
        if (item.children && item.children.length > 0) {
          const find = this.findNode(item.children, key)
          if (find) {
            return find
          }
        }
      }
      return null
    }
  }
}
</script>

<style scoped lang="scss">
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

.el-select-dropdown__item.selected {
  font-weight: normal;
}

ul li > .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.el-tree > .is-current .el-tree-node__label {
  color: var(--el-color-primary);
  font-weight: bold;
}

.el-tree > .is-current .el-tree-node__children .el-tree-node__label {
  color: #434343;
  font-weight: normal;
}
</style>
