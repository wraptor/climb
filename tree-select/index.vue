<template>
  <el-select :model-value="value" ref="treeSelectRef">
    <el-option :value="value" :label="label">
      <el-tree :data="myOption.dicData" :props="myOption.dicProps" @node-click="handleNodeClick"></el-tree>
    </el-option>
  </el-select>
</template>

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
        console.log(this.myOption);
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      value: "",
      label: "",
      myOption: JSON.parse(JSON.stringify(option)),
      data: [{
        label: "一级 1",
        children: [{
          label: "二级 1-1",
          children: [{
            label: "三级 1-1-1"
          }]
        }]
      }, {
        label: "一级 2",
        children: [{
          label: "二级 2-1",
          children: [{
            label: "三级 2-1-1"
          }]
        }, {
          label: "二级 2-2",
          children: [{
            label: "三级 2-2-1"
          }]
        }]
      }, {
        label: "一级 3",
        children: [{
          label: "二级 3-1",
          children: [{
            label: "三级 3-1-1"
          }]
        }, {
          label: "二级 3-2",
          children: [{
            label: "三级 3-2-1"
          }]
        }]
      }]
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
    handleNodeClick(data) {
      this.value = data[this.myOption.dicProps.value] ? data[this.myOption.dicProps.value] : data[this.myOption.dicProps.label];
      this.label = data[this.myOption.dicProps.label];
      this.$emit("update:modelValue", this.value);
      this.$refs.treeSelectRef.blur();
    }
  }
};
</script>

<style scoped>
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

ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.el-tree >>> .is-current .el-tree-node__label {
  font-weight: 700;
}

.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #434343;
  font-weight: normal;
}

.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
</style>