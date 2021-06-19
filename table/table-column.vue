<template>
  <template v-if="item.columns && item.columns.length > 0">
    <template v-for="child in item.columns" :key="child.prop">
      <el-table-column
        v-if="child.display !== false"
        :key="child.prop"
        :prop="child.prop"
        :fixed="child.fixed"
        :sortable="child.sortable"
        :show-overflow-tooltip="
          child.showOverflowTooltip
            ? child.showOverflowTooltip
            : option.showOverflowTooltip
        "
        :width="widthFilter(child)"
        :label="child.label"
        :align="child.align"
        :formatter="child.formatter"
      >
        <template #default="scope">
          <table-column
            :item="child"
            :option="option"
            :row="scope.row"
          ></table-column>
        </template>
      </el-table-column>
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
    {{ filterValue(item, row[item.prop]) }}
  </template>
  <template v-else>
    {{ row[item.prop] }}
  </template>
</template>

<script>
import beanUtil from "@/components/climb-ui/util/bean-util";

export default {
  name: "table-column",
  props: {
    item: {},
    option: {},
    row: {}
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
