<template>
  <div v-if="!myOption.dicData.length"
       v-loading="loading">
    <div class="el-tree__empty-block" style="min-height: 80px">
      <span class="el-tree__empty-text un-select" style="margin-top: 10px">
        暂无部门<el-button type="text" @click="append({id:0})" style="padding: 2px 15px;">点击添加</el-button>
      </span>
    </div>

  </div>
  <el-tree
      v-else
      v-loading="loading"
      :current-node-key="currentNodeKey"
      :data="myOption.dicData"
      :node-key="myOption.props.value"
      :draggable="myOption.draggable"
      highlight-current
      :props="myOption.props"
      @node-drop="handleDrop"
      @node-click="handleNodeClick"
      default-expand-all
      empty-text="暂无部门"
      :expand-on-click-node="false">
    <template #default="{ node, data }">
      <div class="custom-tree-node">
        {{ node.label }}
        <el-dropdown trigger="click" v-show="myOption.menu" placement="bottom-start">
          <el-button type="text" size="mini" style="margin-right: 6px">操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="myOption.addBtn.icon" @click.native="() => append(data)"
                                v-if="myOption.addBtn">{{ myOption.addBtn.text }}
              </el-dropdown-item>
              <el-dropdown-item :icon="myOption.delBtn.icon" @click.native="() => remove(node, data)"
                                v-if="myOption.delBtn">{{ myOption.delBtn.text }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-tree>
</template>

<script>
import beanUtil from "../util/bean-util";
import option from "./option";

export default {
  name: "ClTree",
  props: {
    modelValue: {},
    dicUrl: {},
    option: {},
    disabled: {}
  },
  emits: ["update:modelValue", "add", "del", "node-drop", "node-click"],
  watch: {
    modelValue: {
      handler(val) {
        if (val !== undefined) {
          this.value = val
        }
      },
      immediate: true,
      deep: true
    },
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption);
        this.initDic();
      },
      immediate: true,
      deep: true
    },
    dicUrl: {
      handler() {
        this.initDic();
      },
      immediate: true
    }
  },
  data() {
    return {
      value: "",
      loading: false,
      myOption: JSON.parse(JSON.stringify(option)),
      currentNodeKey: undefined
    };
  },
  methods: {
    initDic() {
      const dicUrl = this.dicUrl ? this.dicUrl : this.myOption.dicUrl
      if (dicUrl) {
        this.loading = true
        window.axios.get(dicUrl).then(res => {
          this.loading = false
          this.myOption.dicData = res;
          if (this.myOption.defaultCurrent && res && res.length > 0) {
            this.currentNodeKey = res[0][this.myOption.props.value]
            this.handleNodeClick(res[0])
          }
        }).catch((err) => {
          console.error(err)
          this.loading = false
        });
      }
    },
    append(data) {
      if (this.myOption.addPrompt) {
        this.$prompt(this.myOption.addPromptText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({value}) => {
          this.$emit('add', data, value, () => {
            this.initDic()
          })
        }).catch(() => {
        });
      } else {
        this.$emit('add', data, newChild => {
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);
        })
      }
    },
    remove(node, data) {
      this.$confirm('是否确认将"' + data[this.myOption.props.label] + '"删除?', '提示', {type: 'warning'}).then(() => {
        this.$emit('del', data, () => {
          this.initDic()
        })
      }).catch(() => {
      })
    },
    handleDrop(draggingNode, dropNode, dropType) {
      this.$emit('node-drop', draggingNode, dropNode, dropType, () => {
        this.initDic()
      })
    },
    handleNodeClick(data) {
      this.$emit('node-click', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.el-tree > > > .is-current .el-tree-node__label {
  color: #2E41D9;
  font-weight: bold;
}
</style>