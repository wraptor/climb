<template>
  <div v-loading="loading">
    <!--  搜索区域  -->
    <div v-if="hasSearch">
      <cl-form
        :option="myOption"
        type="search"
        v-model="searchForm"
        :submit-btn="myOption.searchBtn"
        :reset-btn="myOption.searchResetBtn"
        :btn-right="myOption.searchBtnRight"
        @submit="handleSearch"
      ></cl-form>
    </div>
    <!--  顶部操作菜单  -->
    <div
      style="width: 100%;display: flex;flex-direction: row;justify-content: space-between"
    >
      <div>
        <el-button
          v-if="
            myOption.menu !== false &&
              myPermissions.addBtn &&
              myOption.addBtn !== false &&
              myOption.addBtn.display
          "
          :icon="myOption.addBtn.icon"
          :type="myOption.addBtn.type"
          @click="handleAdd"
        >
          {{ myOption.addBtn.text }}
        </el-button>
        <slot name="menuLeft"></slot>
      </div>
      <div>
        <slot name="menuRight"></slot>
        <el-button
          @click="load"
          v-if="
            myOption.refreshBtn !== false &&
              myOption.refreshBtn.display === true
          "
          :circle="myOption.refreshBtn.circle"
          :icon="myOption.refreshBtn.icon"
          :type="myOption.refreshBtn.type"
        >
        </el-button>
      </div>
    </div>
    <slot name="tableTop"></slot>
    <div
      class="flex-1"
      style="position: relative"
      ref="tableBoxRef"
      :style="`height:${tableBoxHeight}px`"
    >
      <el-table
        ref="elTableRef"
        :max-height="myOption.maxHeight"
        style="margin-top: 10px;position: absolute;width: 100%;"
        v-loading="tableLoading"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDblClick"
        @header-contextmenu="handleHeaderContextmenu"
        :index="myOption.index"
        :data="tableData"
        :row-style="myOption.rowStyle"
        :row-key="myOption.rowKey"
        :lazy="myOption.lazy"
        :load="handleLoadTreeData"
        :tree-props="myOption.treeProps"
        :border="myOption.border"
        :empty-text="myOption.emptyText"
        :tooltip-effect="myOption.tooltipEffect"
        :highlight-current-row="myOption.highlightCurrentRow"
        :stripe="myOption.stripe"
        :show-summary="myOption.showSummary"
        :sum-text="myOption.sumText"
        :summary-method="myOption.summaryMethod"
        :span-method="myOption.spanMethod"
      >
        <!--    =============多选=============    -->
        <el-table-column
          v-if="myOption.selection"
          type="selection"
          :fixed="myOption.selectionFixed"
          :selectable="myOption.selectable"
        ></el-table-column>
        <!--    =============序号=============    -->
        <el-table-column
          v-if="myOption.index"
          :label="myOption.index"
          :fixed="myOption.indexFixed"
          type="index"
        />
        <!--    =============每一列=============    -->
        <template v-for="item in myOption.columns" :key="item.prop">
          <table-column :item="item" :option="myOption"></table-column>
        </template>
        <!--    =============操作菜单=============    -->
        <el-table-column
          v-if="myOption.menu"
          :width="myOption.menuWidth"
          :label="myOption.menuLabel"
        >
          <template #default="scope">
            <slot
              name="menuFront"
              :row="scope.row"
              :column="scope.column"
              :index="scope.$index"
            ></slot>
            <el-button
              @click="handleEdit(scope.row)"
              v-if="filterBtnDisplay('editBtn', scope.row)"
              :disabled="
                !!myOption.editBtn.disabled &&
                  (myOption.editBtn.disabled === true ||
                    myOption.editBtn.disabled(scope.row))
              "
              :icon="myOption.editBtn.icon"
              :type="myOption.editBtn.type"
              >{{ myOption.editBtn.text }}
            </el-button>
            <el-button
              @click="handleDel(scope.row)"
              v-if="filterBtnDisplay('delBtn', scope.row)"
              :disabled="
                !!myOption.delBtn.disabled &&
                  (myOption.delBtn.disabled === true ||
                    myOption.delBtn.disabled(scope.row))
              "
              :icon="myOption.delBtn.icon"
              :type="myOption.delBtn.type"
            >
              {{ myOption.delBtn.text }}
            </el-button>
            <slot
              name="menu"
              :row="scope.row"
              :column="scope.column"
              :index="scope.$index"
              :page="page"
            >
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      background
      @size-change="handlePageSizeChange"
      @current-change="handlePageCurrentChange"
      @prev-click="handlePageCurrentChange"
      @next-click="handlePageCurrentChange"
      style="width: 100%;text-align: right;margin-top: 40px"
      layout="total,sizes,prev,pager,next,jumper"
      :current-page="page.current"
      v-model:page-size="page.size"
      :total="page.total"
    >
    </el-pagination>

    <cl-dialog
      v-model="visible"
      destroy-on-close
      :top="myOption.dialogTop"
      :title="type === 'add' ? '新增' : '编辑'"
      :custom-class="myOption.dialogClass"
      :fullscreen="myOption.fullscreen"
      :width="myOption.dialogWidth"
    >
      <cl-form
        :option="myOption"
        :type="type"
        v-model="form"
        @submit="handleSubmit"
      >
        <template v-for="item in myOption.columns" v-slot:[item.prop]>
          <slot :name="item.prop + 'Form'" :form="form"></slot>
        </template>
      </cl-form>
    </cl-dialog>
    <!--        <el-dialog-->
    <!--          v-model="visible"-->
    <!--          destroy-on-close-->
    <!--          :title="type === 'add' ? '新增' : '编辑'"-->
    <!--          :model-value="visible"-->
    <!--          :show-close="false"-->
    <!--          :style="myOption.fullscreen ? 'max-height:100%;' : 'max-height:75%;'"-->
    <!--          :fullscreen="myOption.fullscreen"-->
    <!--          :width="-->
    <!--            myOption.dialogWidth > 0-->
    <!--              ? myOption.dialogWidth + 'px'-->
    <!--              : myOption.dialogWidth-->
    <!--          "-->
    <!--        >-->

    <!--        </el-dialog>-->
  </div>
</template>

<script>
import option from "./option";
import beanUtil from "../util/bean-util";
import { ElMessageBox, ElMessage } from "element-plus";
import elementResizeDetectorMaker from "element-resize-detector";
import tableColumn from "./table-column.vue";
export default {
  name: "ClTable",
  components: { tableColumn },
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    permissions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    },
    loading: {
      type: Boolean,
      default: false
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
    },
    params: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption.params);
      },
      immediate: true,
      deep: true
    }
  },
  inheritAttrs: false,
  emits: [
    "load",
    "add",
    "edit",
    "del",
    "before",
    "after",
    "selection-change",
    "load-tree",
    "row-click",
    "row-dblclick",
    "header-contextmenu"
  ],
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
      pages: -1
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
      tableLoading: false,
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
      page: page,
      tableBoxHeight: 0
    };
  },
  created() {
    if (this.myOption.init) {
      this.load();
    }
  },
  mounted() {
    const erdm = elementResizeDetectorMaker();
    erdm.listenTo(this.$refs.elTableRef.$el, element => {
      this.tableBoxHeight = element.offsetHeight;
    });
  },
  methods: {
    /**
     *
     * @param btnProp eg. editBtn addBtn
     * @param row row
     */
    filterBtnDisplay(btnProp, row) {
      if (
        this.myOption[btnProp] &&
        Object.prototype.toString.call(this.myOption[btnProp].display) ===
          "[object Function]"
      ) {
        return this.myOption[btnProp].display(row);
      }
      return (
        this.myPermissions[btnProp] &&
        this.myOption[btnProp].display &&
        this.myOption[btnProp] !== false
      );
    },
    widthFilter(item) {
      return item.width > 0 ? item.width + "px" : "auto";
    },
    setDefaultDicData() {
      this.myOption.columns.forEach(item => {
        if (item.dicUrl && window.axios && item.type !== "list") {
          window.axios.get(item.dicUrl).then(res => {
            item.dicData = res;
            item.dicUrl = undefined;
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
    handleSearch(form, done, type = "search") {
      this.type = type;
      this.toBefore(form, cusForm => {
        this.tableLoading = true;
        this.$emit(
          "load",
          Object.assign(this.page, cusForm ? cusForm : form),
          res => {
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
              this.tableLoading = false;
              done();
            }, 500);
          }
        );
      });
    },
    load(reload) {
      if (reload === true) {
        this.page.current = 1;
      }
      this.handleSearch(this.myOption.params, () => {}, "load");
    },
    toBefore(row, done) {
      window.clTable = {
        type: this.type,
        row: row
      };
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
    nextPage() {
      if (this.page.pages === 0 || this.page.current === this.page.pages) {
        return;
      }
      this.page.current = this.page.current + 1;
      this.load();
      return true;
    },
    // filterValue(item, val) {
    //   if (item.type === "tags" && val) {
    //     return val.toString();
    //   }
    //   if (!item.dicData) {
    //     return val;
    //   }
    //   let props = {
    //     //字典的prop修改
    //     label: "label",
    //     value: "value",
    //     children: "children",
    //     data: "data"
    //   };
    //   beanUtil.copyPropertiesNotEmpty(item.props, props);
    //
    //   if (val && item.type === "cascader") {
    //     let dicData = JSON.parse(JSON.stringify(item.dicData));
    //     let label = "";
    //     for (let i = 0; i < val.length; i++) {
    //       const find = dicData.find(item => item[props.value] === val[i]);
    //       if (find) {
    //         dicData = find[props.children];
    //         label += "," + find[props.label];
    //       }
    //     }
    //     return label === "" ? "" : label.substring(1);
    //   } else {
    //     return this.findValueByProps(val, item.dicData, props);
    //   }
    // },
    // findValueByProps(val, dicData, props) {
    //   const find = dicData.find(item => item[props.value] === val);
    //   if (find) {
    //     return find[props.label];
    //   }
    //   return val;
    // },
    handleDel(row) {
      this.type = "del";
      if (this.myOption.delBtn.confirm) {
        ElMessageBox.confirm(
          this.myOption.delBtn.message,
          this.myOption.delBtn.title,
          {
            confirmButtonText: this.myOption.delBtn.confirmBtnText,
            cancelButtonText: this.myOption.delBtn.cancelBtnText,
            type: "warning"
          }
        )
          .then(() => {
            this.delCallback(row);
          })
          .catch(() => {});
      } else {
        this.delCallback(row);
      }
    },
    handleAdd() {
      this.type = "add";
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
      this.toBefore(this.form, row => {
        if (row) {
          this.form = row;
        }
        this.visible = true;
      });
    },
    handleEdit(row) {
      this.type = "edit";
      this.form = JSON.parse(JSON.stringify(row));
      this.toBefore(row, () => {
        this.visible = true;
      });
    },
    handleSubmit(form, done) {
      this.$emit(this.type, form, (flag = true) => {
        if (flag === true) {
          // 编辑成功才隐藏弹窗
          this.visible = false;
          ElMessage.success(this.myOption.editBtn.successMessage);
          setTimeout(() => {
            this.load();
          }, 100);
        }
        setTimeout(done, 1000);
        this.toAfter(form, flag);
      });
    },
    handleSelectionChange(selection) {
      this.$emit("selection-change", selection);
    },
    handleLoadTreeData(row, treeNode, resolve) {
      this.tableLoading = true;
      this.$emit("load-tree", row, treeNode, treeData => {
        if (treeData !== undefined) {
          resolve(treeData);
        }
        this.tableLoading = false;
      });
    },
    handleRowClick(row, column, event) {
      this.$emit("row-click", row, column, event);
    },
    handleRowDblClick(row, column, event) {
      this.$emit("row-dblclick", row, column, event);
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTableRef.toggleRowSelection(row, selected);
    },
    handleHeaderContextmenu(column, event) {
      this.$emit("header-contextmenu", column, event);
    }
  }
};
</script>

<style></style>
