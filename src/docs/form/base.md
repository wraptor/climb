## 表单文档
sfgasgsdgs
## gsdgsdg
jgfjdfgjdfg

```java
class User{
    Long id;
    String name;
}
```


```vue demo
<template>
    <cl-button @click="onClick">按钮</cl-button>
</template>
<script setup>
const onClick = (done)=>{
    console.log("点击了");
    done();
}
</script>
``````
sdgsdgds
```vue demo
<template>
    <cl-table @load="handleLoad" :option="option"/>
</template>
<script setup>
const option = {
    columns:[
        {
            prop:"id",
            label:"主键"
        }
    ]
};
const handleLoad = (params,done)=>{
    done({
        records:[{
            id:"0"
        }],
        current:1,
        size:10,
        total:1,
        pages:1
    })
}
</script>
```




```vue demo
<template>
    <el-button @click="visible=true">打开</el-button>
    <cl-dialog v-model="visible" fullscreen title="biaoti">
        页面
    </cl-dialog>
</template>
<script setup>
import {ref} from "vue"
let visible = ref(false);
</script>
```
