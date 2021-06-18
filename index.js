import ClForm from "./form";
import ClTable from "./table";
import ClInput from "./input";
import ClInputRange from "./input-range";
import ClRadio from "./radio";
import ClCheckBox from "./check-box";
import ClSelect from "./select";
import ClTimePicker from "./time-picker";
import ClDatePicker from "./date-picker";
import ClMenu from "./menu";
import ClTreeSelect from "./tree-select";
import ClTagInput from "./tag-input";
import ClTree from "./tree";
import ClRow from "./row";
import ClCol from "./col";
import ClList from "./list";
import ClBackTop from "./back-top";
import ClListSelect from "./list-select";
import ClButton from "./button";
import ClCascader from "./cascader";
import ClDialog from "./dialog";
const components = [
  ClForm,
  ClTable,
  ClInput,
  ClInputRange,
  ClRadio,
  ClCheckBox,
  ClSelect,
  ClMenu,
  ClTimePicker,
  ClDatePicker,
  ClTreeSelect,
  ClTagInput,
  ClTree,
  ClRow,
  ClCol,
  ClList,
  ClBackTop,
  ClListSelect,
  ClButton,
  ClCascader,
  ClDialog
];
import beanUtil from "./util/bean-util";
import dialogDrag from "./util/directive-dialog-drag";
import throttle from "./util/directive-throttle";
(function() {
  // Simulates PHP's date function
  Date.prototype.format = function(format = "yyyy-MM-dd hh:mm:ss") {
    return beanUtil.dateFormat(this, format);
  };
  Date.prototype.lastMonth = function() {
    if (this.getMonth() === 0) {
      this.setFullYear(this.getFullYear() - 1);
      this.setMonth(11);
    } else {
      this.setMonth(this.getMonth() - 1);
    }
    return this;
  };
}.call(this));

export default {
  install(Vue) {
    Vue.directive("click", throttle);
    Vue.directive("dialog-drag", dialogDrag);
    components.forEach(component => {
      Vue.component(component.name, component);
    });
    window.beanUtil = beanUtil;
    window.deepClone = beanUtil.deepClone;
  }
};
