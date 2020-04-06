# Radio 单选框
推荐使用npm的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
```
import Vue from 'vue';
import { ClRadio } from 'cleme-ui';
import App from './App.vue';

Vue.component(ClRadio.name, ClRadio);
/* 或写为
 * Vue.use(ClRadio)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

##  基础用法
`change`事件会返回选中项的value值，若没有指定value，则会返回label值。
:::demo
```html
<template>
    <cl-radio v-model="value" :dicData="dicData" @change="handleChange"></cl-radio>
</template>
<script>
export default {
  data() {
    return {
      value: '备选项1',
      dicData:[{label:'备选项1'},{label:'备选项2',value:'2'}]
    }
  },methods:{
    handleChange(val){
      this.$message.success(val)
    }
  }
}
</script>
```
:::
##  禁用状态
:::demo
```html
<template>
    <cl-radio v-model="value" disabled :dicData="dicData"></cl-radio>
</template>
<script>
export default {
  data() {
    return {
      value: '1',
      dicData:[{label:'备选项1',value:'1'},{label:'备选项2',value:'2'}]
    }
  },methods:{
    handleChange(val){
      this.$message.success(val)
    }
  }
}
</script>
```
:::
##  按钮样式
:::demo
```html
<template>
    <cl-radio v-model="value"  :option="option" @change="handleChange"></cl-radio>
</template>
<script>
export default {
  data() {
    return {
      value: '1',
      option:{
        type:'button',
        dicData:[{label:'备选项1',value:'1'},{label:'备选项2',value:'2'}]
      }
    }
  },methods:{
    handleChange(val){
      this.$message.success(val)
    }
  }
}
</script>
```
:::
##  带有边框
:::demo
```html
<template>
    <cl-radio v-model="value"  :option="option" @change="handleChange"></cl-radio>
</template>
<script>
export default {
  data() {
    return {
      value: '1',
      option:{
        type:'border',
        dicData:[{label:'备选项1',value:'1'},{label:'备选项2',value:'2'}]
      },
      
    }
  },methods:{
    handleChange(val){
      this.$message.success(val)
    }
  }
}
</script>
```
:::

##  扩展用法
:::demo
```html
<template>
    <el-row>
        <el-col :span="24" style="margin: 10px;">
            <cl-radio v-model="value"  :option="option" @change="handleChange"></cl-radio>
        </el-col>
        <el-col :span="24" style="margin: 10px;">
            <cl-radio v-model="value"  :option="option2" @change="handleChange"></cl-radio>
        </el-col>
        <el-col :span="24" style="margin: 10px;">
            <cl-radio v-model="value"  :option="option3" @change="handleChange"></cl-radio>
        </el-col>
    </el-row>
</template>
<script>
export default {
  data() {
    return {
      value: '1',
      option:{
        border:true,
        textColor:'#FF4D40',
        fill:'#ffffff',
        dicUrl:'https://raw.githubusercontent.com/seepine/cleme/master/docs/api/radio-dic-data.json'
      },
      option2:{
        border:true,
        dicUrl:'https://raw.githubusercontent.com/seepine/cleme/master/docs/api/radio-dic-data-custom-prop.json'
      },
      option3:{
        border:true,
        dicUrl:'https://raw.githubusercontent.com/seepine/cleme/master/docs/api/radio-dic-data-custom-prop2.json'
      },
    }
  },methods:{
    handleChange(val){
        this.value=val
      this.$message.success(val)
    }
  }
}
</script>
```
:::
## Variables
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | string / number  | — | — |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |
| dicData | 字典数据           | array  | 详见[DicData Attributes](#dicData) | — |

## Option Attributes<span id="option"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 单选框类型，细边框或按钮 | string   | none,border，button | none   |
| disabled  | 是否禁用    | boolean   | — | false   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |
| dicProps  | 字典 | object  | 详见[DicProps Attributes](#dicProps) | — |

## DicData Attributes<span id="dicData"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value   | string / number / boolean    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |
| type  | 单选框类型，细边框或按钮 | string   | none,border，button | none   |

## DicProps Attributes<span id="dicProps"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 label   | string / number / boolean    |       —        |      —   |
| value  | Radio 的 value    | string / number / boolean   |       —        |      —   |
| children  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| res | 原生 name 属性 | string    |      —         |     —    |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |
