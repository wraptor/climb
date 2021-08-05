## 基础表单

```vue demo
<template>
    <cl-form @submit="handleSubmit" :option="option"/>
</template>
<script setup>
import {ElMessage} from "element-plus"
const option = {
    columns:[
        {
            prop:"name",
            label:"姓名",
            placeholder:"请输入姓名"
        },
        {
            prop:"age",
            type:"number",
            value:20,
            label:"年龄"
        },
        {
            prop:"sex",
            label:"性别",
            type:"radio",
            value:0,
            dicData:[{
                value:0,
                label:"男"
            },{
                value:1,
                label:"女"
            }]
        },
        {
            prop:"hobby",
            label:"爱好",
            type:"select",
            multiple:true,
            value:[0,1,2],
            dicData:[{
                value:0,
                label:"唱"
            },{
                value:1,
                label:"跳"
            },{
                value:2,
                label:"rap"
            }]
        },
        {
            prop:"birthday",
            label:"生日",
            type:"date"
        },
        {
            prop:"dept",
            label:"部门",
            type:"tree",
            defaultExpandAll:true,
            dicData:[{
                value:"1000",
                label:"保障中心",
                children:[{
                    value:"1100",
                    label:"行政部",
                },
                {
                    value:"1200",
                    label:"人事部",
                }]
            },
            {
                value:"2000",
                label:"市场中心",
                children:[{
                    value:"1100",
                    label:"商务部",
                },
                {
                    value:"1200",
                    label:"人力部",
                }]
            }]
        },
        {
            prop:"introduction",
            label:"自我介绍",
            type:"textarea",
            span:24,
            rows:4
        }
    ]
};
const handleSubmit = (form,done)=>{
    console.log(form);
    ElMessage.success(JSON.stringify(form));
    
    // 1500ms后取消loading
    setTimeout(()=>{
        done();
    },1500);
}
</script>
```