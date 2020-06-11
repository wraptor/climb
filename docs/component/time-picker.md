# TimePicker 时间选择器
推荐使用npm的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
```
import Vue from 'vue';
import { ClRadio } from 'climb-ui';
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
    <el-date-picker v-model="value" @change="handleChange"></el-date-picker>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    }
  },methods:{
    handleChange(val){
      this.$message.success(JSON.stringify(val))
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
    <div>
        <cl-date-picker v-model="value" disabled :dicData="dicData"></cl-date-picker><br/>
        <cl-date-picker v-model="value2" :option="option" :dicData="dicData2"></cl-date-picker><br/>
        <cl-date-picker v-model="value3" :dicData="dicData3"></cl-date-picker><br/>   
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: '1',
      value2: '1',
      value3: '1',
      option:{disabled:true},
      dicData:[{label:'备选项1',value:'1'},{label:'备选项2',value:'2'}],
      dicData2:[{label:'备选项1',value:'1'},{label:'备选项2',value:'2'}],
      dicData3:[{label:'备选项1',value:'1'},{label:'备选项2',value:'2',disabled:true},{label:'备选项3',value:'3'}]
    }
  }
}
</script>
```
:::
##  多选
:::demo
```html
<template>
    <div>
        <cl-date-picker v-model="value"  :option="option" @change="handleChange"></cl-date-picker>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: '1',
      option:{
        multiple:true,
        clearable:true,
        dicData:[{label:'备选项1',value:'1'},{label:'备选项2',value:'2'},{label:'备选项3',value:'3'}]
      }
    }
  },methods:{
    handleChange(val){
      this.$message.success(JSON.stringify(val))
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
    <cl-date-picker v-model="value"  :option="option" @change="handleChange"></cl-date-picker>
</template>
<script>
export default {
  data() {
    return {
      value: '1',
      option:{
        border:true,
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


## Variables
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | string / number  | — | — |
| disabled | 是否禁用 | boolean | — | false |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |

## Option Attributes<span id="option"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| readonly | 完全只读 | boolean | — | false |
| disabled | 禁用 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size          | 输入框尺寸     | string          | medium / small / mini  | — |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| startPlaceholder | 范围选择时开始日期的占位内容 | string | — | — |
| endPlaceholder | 范围选择时开始日期的占位内容 | string | — | — |
| isRange | 是否为时间范围选择，仅对`<el-time-picker>`有效 | boolean | — | false |
| arrowControl | 是否使用箭头进行时间选择，仅对`<el-time-picker>`有效 | boolean | — | false |
| align | 对齐方式 | string | left / center / right | left |
| popperClass | TimePicker 下拉框的类名 | string | — | — |
| pickerOptions | 当前时间日期选择器特有的选项参考下表 | object | — | {} |
| rangeSeparator | 选择范围时的分隔符 | string | - | '-' |
| valueFormat | 可选，仅TimePicker时可用，绑定值的格式。不指定则绑定值为 Date 对象 | string | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi) | — |
| defaultValue | 可选，选择器打开时默认显示的时间 | Date(TimePicker) / string(TimeSelect) | 可被`new Date()`解析(TimePicker) / 可选值(TimeSelect) | — |
| name | 原生属性 | string | — | — |
| prefixIcon | 自定义头部图标的类名 | string | — | el-icon-time |
| clearIcon | 自定义清空图标的类名 | string | — | el-icon-circle-close |


## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 `value-format` 控制 |
| blur | 当 input 失去焦点时触发 | 组件实例 |
| focus | 当 input 获得焦点时触发 | 组件实例 |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
