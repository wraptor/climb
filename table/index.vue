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
    :stripe="myOption.stripe"
    style="width: 100%;margin-top: 10px">
    <el-table-column v-if="myOption.index" :label="myOption.index" type="index" />
    <el-table-column
      v-for="item in myOption.columns"
      :key="item.prop"
      :prop="item.prop"
      :width="item.width?item.width:'auto'"
      :label="item.label">
      <template v-if="item.type==='radio' || item.type==='select'" #default="scope">
        {{ filterValue(item, scope.row[item.prop]) }}
      </template>
    </el-table-column>
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
    <!--    <cl-form v-model="form"></cl-form>-->
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
  emits: ["load", "add", "edit", "del"],
  setup(props, ctx) {
    let visible = ref(false);
    let loading = ref(true);
    let myPermissions = reactive(beanUtil.deepClone({
      addBtn: true,
      editBtn: true,
      delBtn: true,
      viewBtn: true
    }));
    let myOption = reactive(beanUtil.deepClone(option));
    watch(() => props.option,
      () => beanUtil.copyPropertiesNotEmpty(props.option, myOption),
      { immediate: true }
    );
    watch(() => props.permissions,
      () =>
        beanUtil.copyPropertiesNotEmpty(props.permissions, myPermissions),
      { immediate: true });
    let tableData = reactive([]);
    let page = reactive({
      size: 10,
      total: 0,
      current: 1,
      pages: 0
    });
    if (window && window.localStorage) {
      const cachePageSize = window.localStorage.getItem("cl-table-page-size");
      if (cachePageSize) {
        page.size = parseInt(cachePageSize);
      }
    }
    const loadData = () => {
      loading.value = true;
      ctx.emit("load", page, (res) => {
        tableData.splice(0, tableData.length);
        tableData.push(...res.records);
        page.size = res.size;
        page.current = res.current;
        page.pages = res.pages;
        page.total = res.total;
        loading.value = false;
      });
    };


    const delCallback = (row) => {
      ctx.emit("del", row, () => {
        loadData();
        ElMessage.success(myOption.delBtn.successMessage);
      });
    };

    onMounted(loadData);
    return {
      visible,
      loadData,
      //分页相关
      handlePageSizeChange(size) {
        page.size = size;
        if (window && window.localStorage) {
          window.localStorage.setItem("cl-table-page-size", size);
        }
        loadData();
      },
      handlePageCurrentChange(current) {
        page.current = current;
        loadData();
      },

      loading,
      page,
      myPermissions,
      myOption,
      tableData,
      filterValue(item, val) {
        const find = item.dicData.find(item => item.value === val);
        if (find) {
          return find.label;
        }
        return "";
      },
      handleDel(row) {
        if (myOption.delBtn.confirm) {
          ElMessageBox.confirm(myOption.delBtn.message, myOption.delBtn.title, {
            confirmButtonText: myOption.delBtn.confirmBtnText,
            cancelButtonText: myOption.delBtn.cancelBtnText,
            type: "warning"
          }).then(() => {
            delCallback(row);
          }).catch(() => {
          });
        } else {
          delCallback(row);
        }
      },
      handleEdit(row) {
        visible.value = true;
      }
    };
  }
};
</script>

<style scoped>

</style>