export default {
    dicData: [],
    props: {
        value: "value",
        label: "label",
        children: "children",
        disabled: "disabled"
    },
    menu:true,
    empty:"暂无数据",
    defaultCurrent:false,
    addPrompt:true,
    addPromptText:'请输入',
    addPromptPattern:undefined,
    addPromptError:'错误',
    addBtn: {
        icon: 'el-icon-plus',
        text: '添加',
    },
    editBtn: {
        icon: 'el-icon-edit',
        text: '编辑',
    },
    delBtn: {
        icon: 'el-icon-delete',
        text: '删除',
    }
};