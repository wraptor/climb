export default {
    dicData: [],
    props: {
        value: "value",
        label: "label",
        children: "children",
        disabled: "disabled"
    },
    menu:true,
    defaultCurrent:false,
    addPrompt:true,
    addPromptText:'请输入',
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