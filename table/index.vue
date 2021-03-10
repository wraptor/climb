<template>
  <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-between">
    <div>
      <el-button v-if="myPermissions.addBtn && myOption.addBtn!==false && myOption.addBtn.display"
                 :icon="myOption.addBtn.icon" :type="myOption.addBtn.type">
        {{ myOption.addBtn.text }}
      </el-button>
    </div>
    <div>
      <el-button @click="loadData" v-show="myOption.refreshBtn.display" :circle="myOption.refreshBtn.circle"
                 :icon="myOption.refreshBtn.icon" :type="myOption.refreshBtn.type">
      </el-button>
    </div>
  </div>
  <el-table
    :index="myOption.index"
    :data="tableData"
    :border="myOption.border"
    :empty-text="myOption.emptyText"
    :tooltip-effect="myOption.tooltipEffect"
    :highlight-current-row="myOption.highlightCurrentRow"
    :stripe="myOption.stripe"
    style="width: 100%;margin-top: 10px">
    <!--    =============序号=============    -->
    <el-table-column v-if="myOption.index" :label="myOption.index" type="index" />
    <!--    =============每一列=============    -->
    <el-table-column
      v-for="item in myOption.columns"
      :key="item.prop"
      :prop="item.prop"
      :sortable="item.sortable"
      :show-overflow-tooltip="item.showOverflowTooltip?
      item.showOverflowTooltip:myOption.showOverflowTooltip"
      :width="item.width?item.width:'auto'"
      :label="item.label">
      <template v-if="item.type==='radio' || item.type==='select'" #default="scope">
        {{ filterValue(item, scope.row[item.prop]) }}
      </template>
    </el-table-column>
    <!--    =============操作菜单=============    -->
    <el-table-column
      :width="myOption.menuWidth"
      v-if="myOption.menu"
      :label="myOption.menuLabel">
      <template #default="scope">
        <el-button @click="handleEdit(scope.row)"
                   v-if="myPermissions.editBtn && myOption.editBtn.display && myOption.editBtn!==false"
                   :icon="myOption.editBtn.icon"
                   :type="myOption.editBtn.type">{{ myOption.editBtn.text }}
        </el-button>
        <el-button @click="handleDel(scope.row)"
                   v-if="myPermissions.delBtn && myOption.delBtn.display && myOption.delBtn!==false"
                   :icon="myOption.delBtn.icon"
                   :type="myOption.delBtn.type">
          {{ myOption.delBtn.text }}
        </el-button>
        <slot name="menu" :row="scope.row" :column="scope.column" :index="scope.$index"></slot>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    background
    @size-change="handlePageSizeChange"
    @current-change="handlePageCurrentChange"
    @prev-click="handlePageCurrentChange"
    @next-click="handlePageCurrentChange"
    style="width: 100%;text-align: right;margin-top: 40px"
    layout="total,sizes,prev,pager,next,jumper"
    :current-page="page.current"
    :page-size.sync="page.size"
    :total="page.total">
  </el-pagination>

  <el-dialog v-model="visible">
    <cl-form :option="myOption" v-model="form"></cl-form>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch, onMounted } from "vue";
import option from "./option";
import beanUtil from "../util/bean-util";
import { ElMessageBox, ElMessage } from "element-plus";

export default {
  name: "ClTable",
  props: {
    option: {
      type: Object,
      default: () => {
      }
    },
    permissions: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption);
      },
      immediate: true,
      deep: true
    },
    permissions: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myPermissions);
      },
      immediate: true,
      deep: true
    }
  },
  emits: ["load", "add", "edit", "del"],
  data() {
    let page = {
      size: 10,
      total: 0,
      current: 1,
      pages: 0
    };
    if (window && window.localStorage) {
      const cachePageSize = window.localStorage.getItem("cl-table-page-size");
      if (cachePageSize) {
        page.size = parseInt(cachePageSize);
      }
    }

    return {
      myOption: JSON.parse(JSON.stringify(option)),
      myPermissions: {
        addBtn: true,
        editBtn: true,
        delBtn: true,
        viewBtn: true
      },
      loading: false,
      visible: false,
      form: {},

      //表格
      tableData: [],
      page: page
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$emit("load", this.page, (res) => {
        this.tableData = res.records;
        this.page = {
          size: res.size,
          current: res.current,
          pages: res.pages,
          total: res.total
        };
        this.loading = false;
      });
    },
    delCallback(row) {
      this.$emit("del", row, () => {
        this.loadData();
        ElMessage.success(this.myOption.delBtn.successMessage);
      });
    },
    handlePageSizeChange(size) {
      this.page.size = size;
      if (window && window.localStorage) {
        window.localStorage.setItem("cl-table-page-size", size);
      }
      this.loadData();
    },
    handlePageCurrentChange(current) {
      this.page.current = current;
      this.loadData();
    },
    filterValue(item, val) {
      const find = item.dicData.find(item => item.value === val);
      if (find) {
        return find.label;
      }
      return "";
    },
    handleDel(row) {
      if (this.myOption.delBtn.confirm) {
        ElMessageBox.confirm(this.myOption.delBtn.message, this.myOption.delBtn.title, {
          confirmButtonText: this.myOption.delBtn.confirmBtnText,
          cancelButtonText: this.myOption.delBtn.cancelBtnText,
          type: "warning"
        }).then(() => {
          this.delCallback(row);
        }).catch(() => {
        });
      } else {
        this.delCallback(row);
      }
    },
    handleEdit(row) {
      this.form = row;
      console.log(this.form);
      this.visible = true;
    }
  }
};
</script>

<style scoped>

</style>