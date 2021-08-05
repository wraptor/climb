import ClForm from "./form/index";
import ClTable from "./table/index";
import ClInput from "./input/index";
import ClInputRange from "./input-range/index";
import ClRadio from "./radio/index";
import ClCheckBox from "./check-box/index";
import ClSelect from "./select/index";
import ClTimePicker from "./time-picker/index";
import ClDatePicker from "./date-picker/index";
import ClMenu from "./menu/index";
import ClTreeSelect from "./tree-select/index";
import ClTagInput from "./tag-input/index";
import ClTree from "./tree/index";
import ClRow from "./row/index";
import ClCol from "./col/index";
import ClList from "./list/index";
import ClBackTop from "./back-top/index";
import ClListSelect from "./list-select/index";
import ClButton from "./button/index";
import ClCascader from "./cascader/index";
import ClDialog from "./dialog/index";
import ClUpload from "./upload/index"

import beanUtil from "./util/bean-util";
import dialogDrag from "./util/directive-dialog-drag";
import throttle from "./util/directive-throttle";
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
    ClDialog,
    ClUpload
];

import './css/flex.scss'

(function() {
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
        components.forEach((component) => {
            Vue.component(component.name, component);
        });
        window.beanUtil = beanUtil;
        window.deepClone = beanUtil.deepClone;
    },
};
