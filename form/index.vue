<template>
  <el-form :inline="myOption.inline"
           :label-position="myOption.labelPosition"
           :label-width="myOption.labelWidth>0?`${myOption.labelWidth}px`:myOption.labelWidth"
           ref="clFormRef" :model="form" :disabled="loading">
    <el-row :gutter="myOption.gutter">
      <template v-for="item in myOption.columns">
        <el-col
            v-bind:key="item.prop"
            v-if="displayFilter(item)"
            :span="spanFilter(item)"
        >
          <el-form-item
              style="width: 100%;"
              :label="item.label ? item.label + '：' : ''"
              :prop="item.prop"
              :label-width="labelWidthFilter(item)"
              :required="item.required"
              :rules="rulesFilter(item)"
              :error="item.error"
              :show-message="item.showMessage"
              :inline-message="item.inlineMessage"
              :size="item.size"
          >
            <slot :name="item.prop">
              <cl-input v-if="inputTypeArray.findIndex(i=>i===item.type)>=0"
                        :disabled="disabledFilter(item)"
                        v-model="form[item.prop]"
                        :option="item"
              >
                <template #suffix v-if="$slots[item.prop+'Suffix']">
                  <slot :name="item.prop+'Suffix'"></slot>
                </template>
                <template #prefix v-if="$slots[item.prop+'Prefix']">
                  <slot :name="item.prop+'Prefix'"></slot>
                </template>
              </cl-input>
              <cl-radio v-else-if="item.type==='radio'"
                        :disabled="disabledFilter(item)"
                        :option="item" v-model="form[item.prop]"></cl-radio>
              <cl-check-box v-else-if="item.type==='checkbox'" :disabled="disabledFilter(item)"
                            :option="item" v-model="form[item.prop]"></cl-check-box>
              <cl-select v-else-if="item.type==='select'" :disabled="disabledFilter(item)"
                         :option="item" v-model="form[item.prop]"></cl-select>
              <cl-date-picker v-else-if="datePickerTypeArray.findIndex(i=>i===item.type)>=0"
                              :disabled="disabledFilter(item)" :option="item"
                              v-model="form[item.prop]"></cl-date-picker>
              <cl-time-picker v-else-if="timePickerTypeArray.findIndex(i=>i===item.type)>=0"
                              :disabled="disabledFilter(item)"
                              :option="item"
                              v-model="form[item.prop]"></cl-time-picker>
              <cl-tree-select v-else-if="treeSelectArray.findIndex(i=>i===item.type)>=0" :option="item"
                              v-model="form[item.prop]"></cl-tree-select>
              <cl-tag-input v-else-if="tagInputArray.findIndex(i=>i===item.type)>=0" :option="item"
                            v-model="form[item.prop]"></cl-tag-input>

              <template v-else>
                {{ item.type }}
              </template>
            </slot>
          </el-form-item>
        </el-col>
      </template>
      <el-col :span="btnSpanFilter()" v-if="myOption.btn!==false && (myOption.btnRight===true || btnRight===true)">
        <div style="display: flex;justify-content: flex-end;width: 100%">
          <el-button
              type="primary"
              :icon="
              loading ? 'el-icon-loading' : (submitBtn?submitBtn.icon:myOption.submitBtn.icon)
            "
              @click="submit"
              :size="myOption.submitBtn.size"
              v-if="
              myOption.submitBtn !== false &&
                myOption.submitBtn.display === true
            "
          >
            {{ submitBtn ? submitBtn.text : myOption.submitBtn.text }}
          </el-button>
          <el-button
              type="primary"
              plain
              :icon="
              loading ? 'el-icon-loading' : myOption.resetBtn.icon
            "
              @click="onReset"
              :size="myOption.resetBtn.size"
              v-if="
              myOption.resetBtn !== false &&
                myOption.resetBtn.display === true
            "
          >
            {{ myOption.resetBtn.text }}
          </el-button>
          <slot name="btn"/>
        </div>
      </el-col>
    </el-row>


    <el-row justify="center" type="flex" v-if="myOption.btn !== false && myOption.btnRight!==true && btnRight!==true">
      <!--      <el-form-item v-if="myOption.btn !== false">-->
      <div>
        <el-button
            type="primary"
            :icon="
              loading ? 'el-icon-loading' : (submitBtn?submitBtn.icon:myOption.submitBtn.icon)
            "
            @click="submit"
            :size="myOption.submitBtn.size"
            v-if="
              myOption.submitBtn !== false &&
                myOption.submitBtn.display === true
            "
        >
          {{ submitBtn ? submitBtn.text : myOption.submitBtn.text }}
        </el-button>
        <el-button
            type="primary"
            plain
            :icon="
              loading ? 'el-icon-loading' : myOption.resetBtn.icon
            "
            @click="onReset"
            :size="myOption.resetBtn.size"
            v-if="
              myOption.resetBtn !== false &&
                myOption.resetBtn.display === true
            "
        >
          {{ myOption.resetBtn.text }}
        </el-button>
        <slot name="btn"/>
      </div>
      <!--      </el-form-item>-->
    </el-row>
  </el-form>
</template>

<script>
import option from "./option";
import beanUtil from "../util/bean-util";
import {inputTypeArray, datePickerTypeArray, timePickerTypeArray, treeSelectArray, tagInputArray} from "../util/type";
import {debounce} from "../util/util";

export default {
  name: "ClForm",
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      }
    },
    type: {
      type: String
    },
    option: {
      type: [Object, Function],
      default: () => {
        return {};
      }
    },
    disabled: {},
    submitBtn: {},
    btnRight: {},
    resetBtn: {}
  },
  watch: {
    modelValue: {
      handler(val) {
        this.form = val;
      },
      immediate: true,
      deep: true
    },
    form: {
      handler(val) {
        if (val) {
          this.$emit("update:modelValue", val);
        }
      },
      immediate: true,
      deep: true
    },
    resetBtn: {
      handler(val) {
        if (val !== undefined) {
          beanUtil.copyPropertiesNotEmpty({resetBtn: val}, this.myOption);
        }
      },
      immediate: true,
      deep: true
    },
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption);
        console.log(val, this.myOption)
      },
      immediate: true,
      deep: true
    }
  },
  emits: ["submit", "update:modelValue"],
  data() {
    return {
      inputTypeArray,
      datePickerTypeArray,
      timePickerTypeArray,
      treeSelectArray,
      tagInputArray,
      loading: false,
      form: JSON.parse(JSON.stringify(this.modelValue)),
      myOption: JSON.parse(JSON.stringify(option)),
      backForm: JSON.parse(JSON.stringify(this.modelValue))
    };
  },
  methods: {
    labelWidthFilter(item) {
      let globalWidth = this.myOption.labelWidth;
      let itemWidth = item.labelWidth;
      if (this.type) {
        globalWidth = this.myOption[this.type + "LabelWidth"] ? this.myOption[this.type + "LabelWidth"] : globalWidth;
        itemWidth = item[this.type + "LabelWidth"] ? item[this.type + "LabelWidth"] : itemWidth;
      }
      return (itemWidth && itemWidth > 0) ? itemWidth + "px" : globalWidth + "px";
    },
    spanFilter(item = {}) {
      let globalSpan = this.myOption.span;
      let itemSpan = item.span;
      if (this.type) {
        globalSpan = this.myOption[this.type + "Span"] ? this.myOption[this.type + "Span"] : globalSpan;
        itemSpan = item[this.type + "Span"] ? item[this.type + "Span"] : itemSpan;
      }
      return (itemSpan && itemSpan > 0) ? itemSpan : globalSpan;
    },
    btnSpanFilter() {
      let globalSpan = this.myOption.span;
      if (this.type) {
        globalSpan = this.myOption[this.type + "BtnSpan"] ? this.myOption[this.type + "BtnSpan"] : globalSpan;
      }
      return globalSpan;
    },
    displayFilter(item) {
      let display;
      if (!this.type) {
        display = item.display;
      } else if (this.type === "search") {
        return item && item.search;
      } else {
        display = item[this.type + "Display"];
      }
      if (Object.prototype.toString.call(display) === "[object Function]") {
        return display(this.form);
      } else {
        return display !== false;
      }
    },
    disabledFilter(item) {
      if (this.disabled || this.myOption.disabled) {
        return true;
      }
      if (!this.type) {
        return false;
      }
      return item[this.type + "Disabled"] === true;
    },
    rulesFilter(item) {
      if (this.type === "search") {
        return item.searchRules;
      }
      if (!this.type) {
        return item.rules;
      }
      const typeRules = item[this.type + "Rules"];
      return typeRules ? typeRules : item.rules;
    },
    submit: debounce(function () {
      if (this.myOption.repeat) {
        this.loading = true;
      }
      this.$nextTick(() => {
        this.$refs.clFormRef.validate(isValidate => {
          if (isValidate) {
            this.$emit("submit", this.form, () => {
              this.loading = false;
            });
          } else {
            this.loading = false;
          }
        });
      });
    }),
    onReset() {
      this.form = JSON.parse(JSON.stringify(this.backForm));
    }
  }
};
</script>

<style scoped>

</style>