import ClForm from './form';
import ClTable from './table';
import ClInput from './input';
import ClRadio from './radio';
import ClCheckBox from './check-box'
import ClSelect from './select'
import ClInputNumber from './input-number'
import ClTimePicker from './time-picker'
import ClDatePicker from './date-picker'
import ClMenu from './menu'


const components = [
    ClForm, ClTable, ClInput, ClRadio, ClCheckBox, ClSelect, ClInputNumber, ClMenu, ClTimePicker, ClDatePicker
];

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    //挂载
    // Vue.prototype.$message = Message;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    ClForm, ClTable, ClInput, ClRadio, ClCheckBox, ClSelect, ClInputNumber, ClMenu, ClTimePicker, ClDatePicker
};
