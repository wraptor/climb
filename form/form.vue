<template>
  <el-form
    ref="clForm"
    :inline="defaultOption.inline"
    :label-position="defaultOption.labelPosition"
    :label-width="defaultOption.labelWidth"
    :label-suffix="defaultOption.labelSuffix"
    :hide-required-asterisk="defaultOption.hideRequiredAsterisk"
    :show-message="defaultOption.showMessage"
    :inline-message="defaultOption.inlineMessage"
    :status-icon="defaultOption.statusIcon"
    :validate-on-rule-change="defaultOption.validateOnRuleChange"
    :size="defaultOption.size"
    :disabled="defaultOption.disabled || defaultLoading"
    :model="form"
  >
    <el-row :gutter="defaultOption.gutter">
      <el-col
        v-for="(item, index) in defaultOption.items"
        v-bind:key="index"
        :span="item.span && item.span > 0 ? item.span : 12"
      >
        <el-form-item
          :label="item.label ? item.label + '：' : ''"
          :prop="item.prop"
          :label-width="item.labelWidth"
          :required="item.required"
          :rules="item.rules"
          :error="item.error"
          :show-message="item.showMessage"
          :inline-message="item.inlineMessage"
          :size="item.size"
        >
          <template v-if="item.slotForm === true || item.slot === true">
            <slot :name="item.prop"></slot>
          </template>
          <template v-else-if="inputNumberTypeArray.indexOf(item.type) >= 0">
            <cl-input-number
              @keyup.enter.native="onSubmit"
              v-model="form[item.prop]"
              :option="item"
            ></cl-input-number>
          </template>
          <template v-else-if="radioTypeArray.indexOf(item.type) >= 0">
            <cl-radio v-model="form[item.prop]" :option="item"></cl-radio>
          </template>
          <template v-else-if="checkboxTypeArray.indexOf(item.type) >= 0">
            <cl-check-box
              v-model="form[item.prop]"
              :option="item"
            ></cl-check-box>
          </template>
          <template v-else-if="timePickerTypeArray.indexOf(item.type) >= 0">
            <cl-time-picker
              v-model="form[item.prop]"
              :option="item"
            ></cl-time-picker>
          </template>
          <template v-else-if="datePickerTypeArray.indexOf(item.type) >= 0">
            <cl-date-picker
              v-model="form[item.prop]"
              :option="item"
            ></cl-date-picker>
          </template>
          <template v-else-if="selectTypeArray.indexOf(item.type) >= 0">
            <cl-select v-model="form[item.prop]" :option="item"></cl-select>
          </template>
          <template v-else>
            <cl-input
              @keyup.enter.native="onSubmit"
              v-model="form[item.prop]"
              :option="item"
            ></cl-input>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item class="center" v-if="defaultOption.btn === true">
        <div :style="'margin-left:-' + defaultOption.labelWidth">
          <el-button
            type="primary"
            :icon="
              defaultLoading ? 'el-icon-loading' : defaultOption.submitBtn.icon
            "
            @click="onSubmit"
            :size="defaultOption.submitBtn.size"
            v-if="
              defaultOption.submitBtn !== false &&
                defaultOption.submitBtn.display === true
            "
          >
            {{ defaultOption.submitBtn.text }}
          </el-button>
          <el-button
            type="primary"
            plain
            :icon="
              defaultLoading ? 'el-icon-loading' : defaultOption.resetBtn.icon
            "
            @click="onReset"
            :size="defaultOption.resetBtn.size"
            v-if="
              defaultOption.resetBtn !== false &&
                defaultOption.resetBtn.display === true
            "
          >
            {{ defaultOption.resetBtn.text }}
          </el-button>
          <slot name="btn" />
        </div>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
import deOp from "./option";
import beanUtil from "../util/bean-util";
import {
  inputTypeArray,
  inputNumberTypeArray,
  radioTypeArray,
  checkboxTypeArray,
  selectTypeArray,
  timePickerTypeArray,
  datePickerTypeArray
} from "../util/type";

export default {
  name: "ClForm",
  componentName: "ClForm",
  props: {
    value: {},
    option: { type: Object, default: undefined },
    loading: { type: Boolean, default: false }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log("sdadas", val);
        this.form = val ? val : {};
      }
    },
    form: {
      deep: true,
      handler(val) {
        this.$emit("input", val);
      }
    },
    option: {
      deep: true,
      immediate: true,
      handler(val) {
        this.setOption(val);
      }
    },
    loading(val) {
      this.defaultLoading = val;
    }
  },
  created() {},
  data() {
    return {
      defaultOption: beanUtil.deepClone(deOp),
      form: {},
      formBack: beanUtil.deepClone(this.value),
      defaultLoading: false,
      inputTypeArray: inputTypeArray,
      radioTypeArray: radioTypeArray,
      checkboxTypeArray: checkboxTypeArray,
      selectTypeArray: selectTypeArray,
      inputNumberTypeArray: inputNumberTypeArray,
      datePickerTypeArray: datePickerTypeArray,
      timePickerTypeArray: timePickerTypeArray
    };
  },
  methods: {
    setBackForm() {
      this.formBack = beanUtil.deepClone(this.value);
      console.log("重置了", this.formBack);
    },
    setOption(val) {
      this.defaultOption = beanUtil.copyPropertiesNotEmpty(
        val,
        this.defaultOption
      );
      if (
        this.defaultOption.readonly === true &&
        this.defaultOption.items &&
        this.defaultOption.items.constructor === Array
      ) {
        this.defaultOption.items.forEach(item => (item.readonly = true));
      }
    },
    //对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
    validate(callback) {
      this.$refs.clForm.validate(callback);
    },
    //对部分表单字段进行校验的方法Function(props: array | string, callback: Function(errorMessage: string))
    validateField(props, callback) {
      this.$refs.clForm.validateField(props, callback);
    },
    //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    resetFields() {
      this.$refs.clForm.resetFields();
    },
    //移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
    clearValidate(props) {
      this.$refs.clForm.clearValidate(props);
    },
    onSubmit() {
      if (this.defaultOption.repeat) {
        this.defaultLoading = true;
      }
      this.$refs.clForm.validate(isValidate => {
        if (isValidate) {
          this.$emit("submit", this.form, () => {
            this.defaultLoading = false;
          });
        } else {
          this.defaultLoading = false;
        }
      });
    },
    onReset() {
      this.$emit("input", JSON.parse(JSON.stringify(this.formBack)));
    }
  }
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
