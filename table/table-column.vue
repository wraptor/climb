<template>
  <el-table-column
    v-if="item.display !== false"
    :key="item.prop"
    :prop="item.prop"
    :fixed="item.fixed"
    :sortable="item.sortable"
    :show-overflow-tooltip="
      item.showOverflowTooltip
        ? item.showOverflowTooltip
        : option.showOverflowTooltip
    "
    :width="widthFilter(item)"
    :label="item.label"
    :align="item.align"
    :formatter="item.formatter"
  >
    <template #default="scope">
      <slot :name="item.prop" :row="scope.row">
        <template v-if="item.columns && item.columns.length > 0">
          <template v-for="child in item.columns" :key="child.prop">
            <table-column :item="child" :option="option"></table-column>
          </template>
        </template>
        <template
          v-else-if="
            item.type === 'radio' ||
              item.type === 'select' ||
              item.type === 'cascader' ||
              item.type === 'tags'
          "
        >
          {{ filterValue(item, scope.row[item.prop]) }}
        </template>
        <template v-else>
          {{ scope.row[item.prop] }}
        </template>
      </slot>
    </template>
  </el-table-column>
</template>

<script>
import beanUtil from "@/components/climb-ui/util/bean-util";

export default {
  name: "table-column",
  props: {
    item: {},
    option: {}
  },
  methods: {
    widthFilter(item) {
      return item.width > 0 ? item.width + "px" : "auto";
    },
    filterValue(item, val) {
      if (item.type === "tags" && val) {
        return val.toString();
      }
      if (!item.dicData) {
        return val;
      }
      let props = {
        //字典的prop修改
        label: "label",
        value: "value",
        children: "children",
        data: "data"
      };
      beanUtil.copyPropertiesNotEmpty(item.props, props);

      if (val && item.type === "cascader") {
        let dicData = JSON.parse(JSON.stringify(item.dicData));
        let label = "";
        for (let i = 0; i < val.length; i++) {
          const find = dicData.find(item => item[props.value] === val[i]);
          if (find) {
            dicData = find[props.children];
            label += "," + find[props.label];
          }
        }
        return label === "" ? "" : label.substring(1);
      } else {
        return this.findValueByProps(val, item.dicData, props);
      }
    },
    findValueByProps(val, dicData, props) {
      const find = dicData.find(item => item[props.value] === val);
      if (find) {
        return find[props.label];
      }
      return val;
    }
  }
};
</script>

<style scoped></style>
