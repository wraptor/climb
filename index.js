import ClForm from "./form";
import ClTable from "./table";
import ClInput from "./input";
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

const components = [
  ClForm,
  ClTable,
  ClInput,
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
  ClListSelect
];

(function() {
  // Defining patterns
  var dateFormat = function(date, format = "yyyy-MM-dd hh:mm:ss") {
    if (date) {
      if (Object.prototype.toString.call(date) !== "[object Date]") {
        return "";
      }
      const o = {
        "M+": date.getMonth() + 1, // month
        "d+": date.getDate(), // day
        "D+": date.getDate(), // day
        "h+": date.getHours(), // hour
        "H+": date.getHours(), // hour
        "m+": date.getMinutes(), // minute
        "s+": date.getSeconds(), // second
        "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
        S: date.getMilliseconds() // millisecond
      };
      if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (const k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return format;
    }
    return "";
  };

  // Simulates PHP's date function
  Date.prototype.format = function(format = "yyyy-MM-dd hh:mm:ss") {
    return dateFormat(this, format);
  };
}.call(this));

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
