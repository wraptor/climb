## 表单校验

```vue demo
<template>
    <cl-form @submit="handleSubmit" :option="option"/>
</template>
<script setup>
import {ElMessage} from "element-plus"


const passwordValidator = (rule, value, callback) => {
    if (!value) {
        callback(new Error('密码不能为空'));
    }
    console.log(value.length);
    // 模拟异步校验
    setTimeout(() => {
        if (value.length < 6 || value.length > 20) {
            callback(new Error('密码长度为6-20个字符'));
        } else {
            callback();
        }
    }, 1000);
};

const option = {
    span:24,
    columns:[
        {
            prop:"name",
            label:"用户名",
            placeholder:"请输入用户名",
            rules:[{required: true, message: '请输入用户名', trigger: 'blur'},
                  {min: 3, max: 5, message: '用户名长度在 3 到 5 个字符', trigger: 'blur'}]
        },
        {
            prop:"password",
            label:"密码",
            type:"password",
            placeholder:"请输入密码",
            rules:[{required: true, validator: passwordValidator, trigger: 'blur'}]
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