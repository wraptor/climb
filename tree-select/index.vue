<template>
  <el-select :model-value="value" ref="treeSelectRef">
    <el-option :value="value" :label="label">
      <el-tree :empty-text="myOption.emptyText" :default-expand-all="myOption.defaultExpandAll"
               :node-key="myOption.nodeKey?myOption.nodeKey:myOption.props.value"
               :data="myOption.dicData"
               :expand-on-click-node="myOption.expandOnClickMode	"
               :accordion="myOption.accordion"
               :show-checkbox="myOption.showCheckbox"
               :check-strictly="myOption.checkStrictly"
               :props="myOption.props"
               @node-click="handleNodeClick"
               @check="handleCheck"></el-tree>
    </el-option>
  </el-select>
</template>
<!--        <template #default="{ node, data }">-->
<!--          <span :class="{'is-not-check-box-mode':!myOption.showCheckbox}">{{ data.name }}</span>-->
<!--        </template>-->
<script>
import beanUtil from "../util/bean-util";
import option from "./option";

export default {
  name: "ClTreeSelect",
  props: {
    modelValue: {},
    option: {},
    disabled: {}
  },
  emits: ["update:modelValue"],
  watch: {
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption);
        this.initDic();
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      value: "",
      label: "",
      myOption: JSON.parse(JSON.stringify(option))
    };
  },
  methods: {
    initDic() {
      if (this.myOption.dicUrl) {
        window.axios.get(this.myOption.dicUrl).then(res => {
          this.myOption.dicData = res;
        });
      }
    },
    handleCheck(data, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) {
      console.log(data);
      console.log(checkedNodes);
      console.log(checkedKeys);

      this.value = checkedKeys;
      this.label = "";
      for (let i = 0; i < checkedNodes.length; i++) {
        this.label += checkedNodes[i][this.myOption.props.label];
        if (i < checkedNodes.length - 1) {
          this.label += " | ";
        }
      }
      this.$emit("update:modelValue", checkedKeys);
    },
    handleNodeClick(data) {
      console.log(data);
      if (!this.myOption.showCheckbox) {
        this.value = data[this.myOption.props.value] ? data[this.myOption.props.value] : data[this.myOption.props.label];
        this.label = data[this.myOption.props.label];
        this.$emit("update:modelValue", this.value);
        this.$refs.treeSelectRef.blur();
        if (this.myOption.change) {
          this.myOption.change(this.value, this.$parent.form);
        }
      }
    }
  }
};
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

ul li > > > .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.el-tree > > > .is-current .el-tree-node__label {
  color: #2E41D9;
  font-weight: bold;
}

.el-tree > > > .is-current .el-tree-node__children .el-tree-node__label {
  color: #434343;
  font-weight: normal;
}
</style>