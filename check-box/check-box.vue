<template>
  <el-checkbox-group
    v-model:value="myValue"
    :size="defaultOption.size"
    :disabled="disabled || defaultOption.disabled"
    :text-color="defaultOption.textColor"
    :fill="defaultOption.fill"
    :min="defaultOption.min"
    :max="defaultOption.max"
    @change="handleChange"
  >
    <template v-if="defaultOption.button">
      <el-checkbox-button label="dasdsas">fas</el-checkbox-button>
<!--      <el-checkbox-button-->
<!--        v-for="(item, index) in myDicData"-->
<!--        :key="index"-->
<!--        :disabled="item.disabled"-->
<!--        :name="item.name"-->
<!--        :label="item[defaultOption.dicProps.value]? item[defaultOption.dicProps.value]: item[defaultOption.dicProps.label]"-->
<!--      >-->
<!--        {{ item[defaultOption.dicProps.label] }}-->
<!--      </el-checkbox-button>-->
    </template>
    <template v-else>
      <el-checkbox
        v-for="(item, index) in myDicData"
        v-bind:key="index"
        :disabled="item.disabled"
        :name="item.name"
        :indeterminate="item.indeterminate"
        :label="
          item[defaultOption.dicProps.value]
            ? item[defaultOption.dicProps.value]
            : item[defaultOption.dicProps.label]
        "
        :border="defaultOption.border"
      >
        {{ item[defaultOption.dicProps.label] }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
import beanUtil from "../util/bean-util";
import deOp from "./option";
import Axios from "axios";
import dicUtil from "../util/dic-util";

export default {
  name: "ClCheckBox",
  props: {
    value: { default: [] },
    option: { type: Object, default: undefined },
    dicData: { type: Array, default: undefined },
    disabled: { type: Boolean, default: false }
  },
  watch: {
    option: {
      deep: true,
      handler(val) {
        this.initData("clCheckBoxInit", val);
      }
    },
    dicData: {
      deep: true,
      handler(val) {
        this.setDicData(val);
      }
    },
    value(val) {
      this.myValue = val;
    },
    myValue(val) {
      this.$emit("input", val);
    }
  },
  created() {
    this.initData("clCheckBoxInit", this.option);
  },
  data() {
    return {
      defaultOption: JSON.parse(JSON.stringify(deOp)),
      myDicData: [],
      myValue: this.value,
      myAxios: this.axios ? this.axios : Axios
    };
  },
  methods: {
    initData(key, val) {
      console.log("这边初始化", val);
      if (key && key === "clCheckBoxInit" && val) {
        //赋值option
        beanUtil.copyPropertiesNotEmpty(val, this.defaultOption);
        //初始化字典数据
        if (this.defaultOption.dicUrl) {
          dicUtil.getData(
            this.myAxios,
            this.defaultOption.dicUrl,
            this.defaultOption.dicProps,
            data => {
              this.setDicData(data ? data : this.defaultOption.dicData);
            }
          );
        } else {
          this.setDicData(this.defaultOption.dicData);
        }
      }
    },
    setDicData(dicData) {
      if (dicData && dicData.constructor === Array) {
        // this.myDicData = beanUtil.deepClone(dicData);
      } else {
        console.error(dicData, "dicData must be Array");
      }
    },
    handleChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

<style scoped></style>
