# InputNumber 计数器
推荐使用npm的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
```
import Vue from 'vue';
import { ClInputNumber } from 'cleme-ui';
import App from './App.vue';

Vue.component(ClInputNumber.name, ClInputNumber);
/* 或写为
 * Vue.use(ClInputNumber)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

##  基础用法
`change`事件会返回选中项的value值。
:::demo
```html
<template>
    <cl-input-number v-model="value" @change="handleChange"/>
</template>
<script>
export default {
  data() {
    return {
      value: 100,
    }
  },methods:{
    handleChange(val){
      this.$message.success(val+'')
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
        <cl-input-number v-model="value" :option="{disabled:true}"/>
        <cl-input-number v-model="value" disabled/>   
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: 100
    }
  }
}
</script>
```
:::
##  范围限制
:::demo
```html
<template>
    <div>
        <cl-input-number v-model="value1" :min="10" :max="20"/><br/><br/>
        <cl-input-number v-model="value2"  :option="option"/>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 5,
      value2: 10,
      option:{
        min:10,
        max:20
      }
    }
  }
}
</script>
```
:::
##  步长
`step`可以设置计数器的步长，默认为1，stepStrictly可以设置是否只能输入step的倍数，默认为false
:::demo
```html
<template>
    <cl-input-number v-model="value" :option="option"/>
</template>
<script>
export default {
  data() {
    return {
      value: 0,
      option:{
        step: 2,
        stepStrictly: true,
      },
      
    }
  }
}
</script>
```
:::

##  控制器
:::demo
```html
<template>
    <div>
        <cl-input-number v-model="value" :option="option"></cl-input-number>
        <cl-input-number v-model="value" :option="option2"></cl-input-number>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: undefined,
      option:{
        controls:false,
        placeholder:'请输入数字'
      },
      option2:{
        controls:true,
        controlsPosition:'right',
        placeholder:'请输入数字'
      },
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
| disabled  | 是否禁用    | boolean   | — | false   |
| min      | 设置计数器允许的最小值 | number | — | -Infinity |
| max      | 设置计数器允许的最大值 | number | — | Infinity |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |

## Option Attributes<span id="option"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| min      | 设置计数器允许的最小值 | number | — | -Infinity |
| max      | 设置计数器允许的最大值 | number | — | Infinity |
| step     | 计数器步长           | number   | — | 1 |
| stepStrictly | 是否只能输入 step 的倍数 | boolean   | — | false |
| precision| 数值精度             | number   | — | — |
| size     | 计数器尺寸           | string   | large, small | — |
| disabled | 是否禁用计数器        | boolean | — | false |
| controls | 是否使用控制按钮        | boolean | — | true |
| controlsPosition | 控制按钮位置 | string | right | - |
| name | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |
| placeholder | 输入框默认 placeholder | string | - | - |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: number) |
| blur | 在 InputNumber 失去焦点时触发 | (event: Event) |
| focus | 在 InputNumber 获得焦点时触发 | (event: Event) |

## Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 InputNumber 获取焦点 | — |
| select | 选中 InputNumber 中的文字 | — |