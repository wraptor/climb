## 文件表单

```vue demo
<template>
    <el-alert style="margin-bottom:20px;">当listType指定为picture或picture-card，且没有设置accept时，默认accept会设置为"image/*"</el-alert>
    <el-alert style="margin-bottom:20px;">若通过action自动上传，设置window.axios，可为上传设置请求头，过滤请求结果等</el-alert>
    <cl-form @submit="handleSubmit" :option="option"/>
</template>
<script setup>
import {ElMessage} from "element-plus"

const option = {
    span:24,
    columns:[
        {
            prop:"file1",
            label:"单文件",
            type:"file",
            limit:1,
            autoUpload:false,
        },
        {
            prop:"file2",
            label:"多文件",
            tip:"只能上传 jpg/png 文件，且不超过 500kb",
            autoUpload:false,
            value:[
                {
                    name: 'food.jpeg', 
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, 
                {
                    name: 'food2.jpeg', 
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ],
            type:"file",
        },
        {
            prop:"file3",
            type:"file",
            label:"拖拽上传",
            autoUpload:false,
            drag:true
        },
        {
            prop:"file4",
            type:"file",
            listType:"picture-card",
            label:"PictureCard",
            autoUpload:false,
        },
        {
            prop:"file5",
            type:"file",
            listType:"picture",
            label:"Picture",
            autoUpload:false,
        }
    ]
};
const handleSubmit = (form,done)=>{
    console.log(form);
    ElMessage.success(JSON.stringify(form));
    done();
}
</script>
```