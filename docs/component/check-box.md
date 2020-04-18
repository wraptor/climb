# CheckBox 多选框
推荐使用npm的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
```
import Vue from 'vue';
import { ClCheckBox } from 'cleme-ui';
import App from './App.vue';

Vue.component(ClCheckBox.name, ClCheckBox);
/* 或写为
 * Vue.use(ClCheckBox)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

##  基础用法
`change`事件会返回选中项的value值，若没有指定value，则会返回label值数组。
:::demo
```html
<template>
    <div>
        <cl-check-box v-model="value" :dicData="dicData" @change="handleChange"></cl-check-box>
        <cl-check-box v-model="value2" :option="option" @change="handleChange"></cl-check-box>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: ['备选项1'],
      value2: ['value1'],
      dicData:[{label:'备选项1'},{label:'备选项2',value:'2'}],
      option:{
          min:1,
          max:3,
          dicData:[{label:'备选项1',value:'value1'},{label:'备选项2',value:'value2'},{label:'备选项3',value:'value3'}]
      }
    }
  },methods:{
    handleChange(val){
        console.log(val)
        this.$message.success(val.toString())
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
        <cl-check-box v-model="value" :option="option" :dicData="dicData"></cl-check-box><br/>
        <cl-check-box v-model="value2"  disabled :dicData="dicData2"></cl-check-box><br/>
        <cl-check-box v-model="value3" :dicData="dicData3"></cl-check-box><br/>   
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: ['1'],
      value2: ['1'],
      value3: ['1'],
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
##  按钮样式
:::demo
```html
<template>
<div>
    <cl-check-box v-model="value"  :option="option" @change="handleChange"></cl-check-box><br/>
    <cl-check-box v-model="value"  :option="option2" @change="handleChange"></cl-check-box>
</div>
</template>
<script>
export default {
  data() {
    return {
      value: ['1'],
      option:{
        button:true,
        dicData:[{label:'备选项1',value:'1'},{label:'备选项2',value:'2'},{label:'备选项3',value:'3'}]
      },
      option2:{
        button:true,
        fill:'#67C23A',
        dicData:[{label:'备选项1',value:'1'},{label:'备选项2',value:'2'},{label:'备选项3',value:'3'}]
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
    <cl-check-box v-model="value"  :option="option" @change="handleChange"></cl-check-box>
</template>
<script>
export default {
  data() {
    return {
      value: ['1'],
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

##  扩展用法
:::demo
```html
<template>
    <el-row>
        <el-col :span="24" style="margin: 10px;">
            <cl-check-box v-model="value"  :option="option" @change="handleChange"></cl-check-box>
        </el-col>
        <el-col :span="24" style="margin: 10px;">
            <cl-check-box v-model="value2"  :option="option2" @change="handleChange"></cl-check-box>
        </el-col>
        <el-col :span="24" style="margin: 10px;">
            <cl-check-box v-model="value3"  :option="option3" @change="handleChange"></cl-check-box>
        </el-col>
    </el-row>
</template>
<script>
export default {
  data() {
    return {
      value: ['value:1'],
      value2: ['value:1'],
      value3: ['attribute:1'],
      option:{
        textColor:'#FF4D40',
        fill:'#ffffff',
        dicUrl:'https://raw.githubusercontent.com/seepine/cleme/master/docs/api/radio-dic-data.json'
            /*{
              "code": 200,
              "msg": "ok",
              "data": [{
                  "label": "label:选择1",
                  "value": "value:1"
                },{
                  "label": "label:选择2",
                  "value": "value:2"
                }]
            }*/
      },
      option2:{
        border:true,
        dicProps:{
            data:''
        },
        dicUrl:'https://raw.githubusercontent.com/seepine/cleme/master/docs/api/radio-dic-data-custom-prop.json'
            /*[{
                "label": "label:选择1",
                "value": "value:1"
              },{
                "label": "label:选择2",
                "value": "value:2"
              }]*/
      },
      option3:{
        button:true,
        dicProps:{
            data:'res',
            label:'key',
            value:'attribute'
        },
        dicUrl:'https://raw.githubusercontent.com/seepine/cleme/master/docs/api/radio-dic-data-custom-prop2.json'
            /*{"code": 200,
              "msg": "ok",
              "res": [{
                  "key": "key:选择1",
                  "attribute": "attribute:1"
                },{
                  "key": "key:选择2",
                  "attribute": "attribute:2"
                }]
            }*/
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
| value / v-model | 绑定值           | array  | — | — |
| disabled  | 是否禁用    | boolean   | — | false   |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |
| dicData | 字典数据           | array  | 详见[DicData Attributes](#dicData) | — |

## Option Attributes<span id="option"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用    | boolean   | — | false   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |    
| dicProps  | 字典 | object  | 详见[DicProps Attributes](#dicProps) | — |
| dicData | 字典数据           | array  | 详见[DicData Attributes](#dicData) | — |
| min     | 可被勾选的 checkbox 的最小数量   | number    |       —        |     —    |
| max     | 可被勾选的 checkbox 的最大数量   | number    |       —        |     —    |
| fill  | 仅按钮形式的 Checkbox 激活时的填充色和边框色	 | string  | —  | #ffffff |
| textColor  | 仅按钮形式的 Checkbox 激活时的文本颜色		 | string  | —  | 	#409EFF |
| border  | 是否显示边框 | boolean  |—  | false |
| button  | 是否为按钮多选框，优先级比border高 | boolean  |—  | false |

## DicData Attributes<span id="dicData"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 展示的label   | string / number / boolean    |       —        |      —   |
| value  | 返回的 value    | string / number / boolean   |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制，仅Option.button不为`true`有效    | boolean   |  — | false   |

## DicProps Attributes<span id="dicProps"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | CheckBox 的 label   | string / number / boolean    |       —        |      label   |
| value  | CheckBox 的 value    | string / number / boolean   |       —        |      value   |
| res | 原生 name 属性 | string    |      —         |     data    |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 value或label 值数组  |
