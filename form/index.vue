<template>
  <el-form :inline="myOption.inline"
           :label-width="myOption.labelWidth>0?`${myOption.labelWidth}px`:myOption.labelWidth"
           ref="clFormRef" :model="form" :disabled="loading">
    <el-row :gutter="myOption.gutter">
      <el-col
        v-for="item in myOption.columns"
        v-bind:key="item.prop"
        :span="item.span && item.span > 0 ? item.span : myOption.span"
      >
        <el-form-item
          style="width: 100%;"
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
          <cl-input v-if="inputTypeArray.findIndex(i=>i===item.type)>=0"
                    v-model="form[item.prop]"
                    :option="item"
          ></cl-input>
          <cl-radio v-else-if="item.type==='radio'" :option="item" v-model="form[item.prop]"></cl-radio>
          <cl-check-box v-else-if="item.type==='checkbox'" :option="item" v-model="form[item.prop]"></cl-check-box>
          <cl-select v-else-if="item.type==='select'" :option="item" v-model="form[item.prop]"></cl-select>
          <cl-date-picker v-else-if="datePickerTypeArray.findIndex(i=>i===item.type)>=0" :option="item"
                          v-model="form[item.prop]"></cl-date-picker>
          <cl-time-picker v-else-if="timePickerTypeArray.findIndex(i=>i===item.type)>=0" :option="item"
                          v-model="form[item.prop]"></cl-time-picker>

          <template v-else>
            {{ item.type }}
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="myOption.span" v-if="myOption.btn!==false && myOption.btnRight===true">
        <div style="text-align: center">
          <el-button
            type="primary"
            :icon="
              loading ? 'el-icon-loading' : myOption.submitBtn.icon
            "
            @click="onSubmit"
            :size="myOption.submitBtn.size"
            v-if="
              myOption.submitBtn !== false &&
                myOption.submitBtn.display === true
            "
          >
            {{ myOption.submitBtn.text }}
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
          <slot name="btn" />
        </div>
      </el-col>
    </el-row>


    <el-row justify="center" type="flex" v-if="myOption.btn !== false && myOption.btnRight!==true">
      <!--      <el-form-item v-if="myOption.btn !== false">-->
      <div>
        <el-button
          type="primary"
          :icon="
              loading ? 'el-icon-loading' : myOption.submitBtn.icon
            "
          @click="onSubmit"
          :size="myOption.submitBtn.size"
          v-if="
              myOption.submitBtn !== false &&
                myOption.submitBtn.display === true
            "
        >
          {{ myOption.submitBtn.text }}
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
        <slot name="btn" />
      </div>
      <!--      </el-form-item>-->
    </el-row>
  </el-form>
</template>

<script>
import option from "./option";
import beanUtil from "../util/bean-util";
import { inputTypeArray, datePickerTypeArray, timePickerTypeArray } from "../util/type";
import { debounce } from "../util/util";

export default {
  name: "ClForm",
  props: {
    modelValue: {},
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    modelValue: {
      handler(val) {
        this.form = JSON.parse(JSON.stringify(val));
      },
      immediate: true,
      deep: true
    },
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption);
        console.log(this.myOption);
      },
      immediate: true,
      deep: true
    }
  },
  emits: ["submit"],
  data() {
    return {
      inputTypeArray,
      datePickerTypeArray,
      timePickerTypeArray,
      loading: false,
      form: JSON.parse(JSON.stringify(this.modelValue)),
      myOption: JSON.parse(JSON.stringify(option)),
      backForm: JSON.parse(JSON.stringify(this.modelValue))
    };
  },
  methods: {
    onSubmit: debounce(function() {
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