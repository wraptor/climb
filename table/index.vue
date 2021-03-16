<template>
  <div v-if="hasSearch">
    <cl-form :option="myOption" type="search" v-model="searchForm" :submit-btn="myOption.searchBtn"
             :btn-right="myOption.searchBtnRight"
             @submit="handleSearch"></cl-form>
  </div>
  <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-between">
    <div>
      <el-button v-if="myPermissions.addBtn && myOption.addBtn!==false && myOption.addBtn.display"
                 :icon="myOption.addBtn.icon" :type="myOption.addBtn.type" @click="handleAdd">
        {{ myOption.addBtn.text }}
      </el-button>
    </div>
    <div>
      <el-button @click="load" v-show="myOption.refreshBtn.display" :circle="myOption.refreshBtn.circle"
                 :icon="myOption.refreshBtn.icon" :type="myOption.refreshBtn.type">
      </el-button>
    </div>
  </div>
  <el-table
    v-loading="loading"
    :index="myOption.index"
    :data="tableData"
    :row-style="myOption.rowStyle"
    :border="myOption.border"
    :empty-text="myOption.emptyText"
    :tooltip-effect="myOption.tooltipEffect"
    :highlight-current-row="myOption.highlightCurrentRow"
    :stripe="myOption.stripe"
    style="width: 100%;margin-top: 10px">
    <!--    =============序号=============    -->
    <el-table-column v-if="myOption.index" :label="myOption.index" type="index" />
    <!--    =============每一列=============    -->
    <template v-for="item in myOption.columns">
      <el-table-column
        v-if="item.display!==false"
        :key="item.prop"
        :prop="item.prop"
        :sortable="item.sortable"
        :show-overflow-tooltip="item.showOverflowTooltip?
      item.showOverflowTooltip:myOption.showOverflowTooltip"
        :width="item.width?item.width:'auto'"
        :label="item.label">
        <template #default="scope">
          <slot :name="item.prop">
            <template v-if="item.type==='radio' || item.type==='select'">
              {{ filterValue(item, scope.row[item.prop]) }}
            </template>
            <template v-else>
              {{ scope.row[item.prop] }}
            </template>
          </slot>
        </template>
      </el-table-column>
    </template>
    <!--    =============操作菜单=============    -->
    <el-table-column
      :width="myOption.menuWidth"
      v-if="myOption.menu"
      :label="myOption.menuLabel">
      <template #default="scope">
        <slot name="menuFront" :row="scope.row" :column="scope.column" :index="scope.$index"></slot>
        <el-button @click="handleEdit(scope.row)"
                   v-if="myPermissions.editBtn && myOption.editBtn.display && myOption.editBtn!==false"
                   :disabled="!!myOption.editBtn.disabled && (myOption.editBtn.disabled===true || myOption.editBtn.disabled(scope.row))"
                   :icon="myOption.editBtn.icon"
                   :type="myOption.editBtn.type">{{ myOption.editBtn.text }}
        </el-button>
        <el-button @click="handleDel(scope.row)"
                   v-if="myPermissions.delBtn && myOption.delBtn.display && myOption.delBtn!==false"
                   :disabled="!!myOption.delBtn.disabled && (myOption.delBtn.disabled===true || myOption.delBtn.disabled(scope.row))"
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

  <el-dialog v-model="visible" destroy-on-close :title="type==='add'?'新增':'编辑'" :model-value="visible">
    <cl-form :option="myOption" :type="type" v-model="form" @submit="handleSubmit">
      <template v-for="item in myOption.columns" v-slot:[item.prop]>
        <slot :name="item.prop+'Form'" :form="form"></slot>
      </template>
    </cl-form>
  </el-dialog>
</template>

<script>
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
        this.setDefaultForm();
        this.setDefaultDicData();
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
  inheritAttrs: false,
  emits: ["load", "add", "edit", "del", "before", "after"],
  computed: {
    hasSearch() {
      let search = false;
      this.myOption.columns.forEach(item => {
        if (item.search) {
          search = true;
        }
      });
      return search;
    }
  },
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
      // 新增表单时的默认数据，由column每个item.value组成
      defaultForm: {},
      // 搜索表单时的默认数据
      searchForm: {},

      // 记录弹窗类型,add/edit
      type: "add",
      //表格
      tableData: [],
      page: page
    };
  },
  created() {
    if (this.myOption.init) {
      this.load();
    }
  },
  methods: {
    setDefaultDicData() {
      this.myOption.columns.forEach(item => {
        if (item.dicUrl && window.axios) {
          window.axios.get(item.dicUrl).then(res => {
            item.dicData = res;
          });
        }
      });
    },
    setDefaultForm() {
      this.defaultForm = {};
      this.searchForm = {};
      this.myOption.columns.forEach(item => {
        if (item.value !== undefined) {
          this.defaultForm[item.prop] = item.value;
        }
        if (item.searchValue !== undefined) {
          this.searchForm[item.prop] = item.searchValue;
        }
      });
    },
    handleSearch(form, done) {
      this.type = "search";
      this.toBefore(form, cusForm => {
        this.loading = true;
        this.$emit("load", Object.assign(this.page, cusForm ? cusForm : form), res => {
          if (res) {
            this.tableData = res.records;
            this.page = {
              size: res.size,
              current: res.current,
              pages: res.pages,
              total: res.total
            };
          }
          setTimeout(() => {
            this.loading = false;
            done();
          }, 500);
        });
      });
    },
    load() {
      this.handleSearch({}, () => {
      });
    },
    toBefore(row, done) {
      if (this.$attrs["before"]) {
        this.$attrs["before"](this.type, row, done);
      } else {
        done();
      }
    },
    toAfter(row, flag) {
      if (this.$attrs["after"]) {
        this.$attrs["after"](this.type, row, flag);
      }
    },
    delCallback(row) {
      this.toBefore(row, () => {
        this.$emit("del", row, (flag = true) => {
          if (flag === true) {
            this.load();
            ElMessage.success(this.myOption.delBtn.successMessage);
          }
          this.toAfter(row, flag);
        });
      });
    },
    handlePageSizeChange(size) {
      this.page.size = size;
      if (window && window.localStorage) {
        window.localStorage.setItem("cl-table-page-size", size);
      }
      this.load();
    },
    handlePageCurrentChange(current) {
      this.page.current = current;
      this.load();
    },
    filterValue(item, val) {
      if (!item.dicData) {
        return val;
      }
      const find = item.dicData.find(item => item.value === val);
      if (find) {
        return find.label;
      }
      return "";
    },
    handleDel(row) {
      this.type = "del";
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
    handleAdd() {
      this.type = "add";
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
      this.toBefore(this.form, (row) => {
        if (row) {
          this.form = row;
        }
        this.visible = true;
      });
    },
    handleEdit(row) {
      this.type = "edit";
      this.form = row;
      this.toBefore(row, () => {
        this.visible = true;
      });
    },
    handleSubmit(form, done) {
      this.$emit(this.type, form, (flag = true) => {
        if (flag === true) {
          // 编辑成功才隐藏弹窗
          this.load();
          this.visible = false;
          ElMessage.success(this.myOption.editBtn.successMessage);
        }
        setTimeout(done, 1000);
        this.toAfter(form, flag);
      });
    }
  }
};
</script>

<style scoped lang="scss">

</style>