import ClForm from './form';
import ClInput from './input';
import ClRadio from './radio';
import ClCheckBox from './check-box'

const components = [
    ClForm, ClInput, ClRadio,ClCheckBox
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
    ClForm, ClInput, ClRadio,ClCheckBox
};