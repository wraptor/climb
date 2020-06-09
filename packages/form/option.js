export default {
    //element form attributes
    inline: false,                    //true/false,行内表单模式
    labelPosition: 'right',             //right/left/top,表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
    labelWidth: '100px',                     //表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
    labelSuffix: '',                    //表单域标签的后缀
    hideRequiredAsterisk: false,      //true/false,是否显示必填字段的标签旁边的红色星号
    showMessage: true,                //true/false,是否显示校验错误信息
    inlineMessage: false,             //true/false,是否以行内形式展示校验信息
    statusIcon: false,                //true/false,是否在输入框中显示校验结果反馈图标
    validateOnRuleChange: true,       //true/false,是否在 rules 属性改变后立即触发一次验证
    size: undefined,                    //large/medium/small/mini,用于控制该表单内组件的尺寸
    disabled: false,                  //true/false,是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效

    //ext
    repeat: true,                      //true/false,是否防重提交
    readonly: false,
    btn: true,
    gutter: 20,

    submitBtn: {
        text: '提 交',
        icon: 'el-icon-check',
        display: true,//true/false
        size: ''     //medium / small / mini
    }, resetBtn: {
        text: '重 置',
        icon: 'el-icon-delete',
        display: true,//true/false
        size: ''     //medium / small / mini
    },
    btnSize: '',    //medium / small / mini
    items: [],
    groupItems: []
}
