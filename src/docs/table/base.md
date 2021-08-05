## 基础表格

```vue demo
<template>
    <cl-table :option="option" 
        @load="handleLoad" 
        @add="handleAdd"
        @edit="handleEdit" 
        @del="handleDel"/>
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
        }
    ]
};

let pageData = { 
        records:[{
               name:"1",
               age:20
        }],
        total:1,
        pages:1,
        current:1,
        size:10,
    } 

const handleLoad = (params,done)=>{
    console.log("加载分页数据",params);
    done(pageData);
}



const handleAdd = (row,done)=>{
    console.log(row);
    pageData.records.push(row);
    pageData.total++;
    done();
}

const handleEdit = (row,done)=>{
    console.log(row);
    done();
}

const handleDel = (row,done)=>{
    console.log(row);
    done();
}
</script>
```