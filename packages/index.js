import ClForm from './form';
import ClInput from './input';
import ClRadio from './radio';
import ClCheckBox from './check-box'
import ClInputNumber from './input-number'
import ClMenu from './menu'


const components = [
    ClForm, ClInput, ClRadio, ClCheckBox, ClInputNumber, ClMenu
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
    ClForm, ClInput, ClRadio, ClCheckBox, ClInputNumber, ClMenu
};
