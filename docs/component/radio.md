# Radio 单选框
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
    <div>
        <cl-radio v-model="value" disabled :dicData="dicData"></cl-radio><br/>
        <cl-radio v-model="value2" :option="option" :dicData="dicData2"></cl-radio><br/>
        <cl-radio v-model="value3" :dicData="dicData3"></cl-radio><br/>   
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
##  按钮样式
:::demo
```html
<template>
    <div>
        <cl-radio v-model="value"  :option="option" @change="handleChange"></cl-radio><br/><br/>
        <cl-radio v-model="value"  :option="option2" @change="handleChange"></cl-radio>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: '1',
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
    <cl-radio v-model="value"  :option="option" @change="handleChange"></cl-radio>
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
            <cl-radio v-model="value2"  :option="option3" @change="handleChange"></cl-radio>
        </el-col>
    </el-row>
</template>
<script>
export default {
  data() {
    return {
      value: 'value:1',
      value2: 'attribute:1',
      option:{
        textColor:'#FF4D40',
        fill:'#ffffff',
        dicUrl:'https://raw.githubusercontent.com/seepine/climb/master/docs/api/radio-dic-data.json'
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
        dicUrl:'https://raw.githubusercontent.com/seepine/climb/master/docs/api/radio-dic-data-custom-prop.json'
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
        dicUrl:'https://raw.githubusercontent.com/seepine/climb/master/docs/api/radio-dic-data-custom-prop2.json'
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
| value / v-model | 绑定值           | string / number  | — | — |
| disabled  | 是否禁用    | boolean   | — | false   |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |
| dicData | 字典数据           | array  | 详见[DicData Attributes](#dicData) | — |

## Option Attributes<span id="option"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 单选框类型，细边框或按钮 | string   | none,border，button | none   |
| disabled  | 是否禁用    | boolean   | — | false   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| dicProps  | 字典 | object  | 详见[DicProps Attributes](#dicProps) | — |
| dicData | 字典数据           | array  | 详见[DicData Attributes](#dicData) | — |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色	 | string  | —  | #ffffff |
| textColor  | 按钮形式的 Radio 激活时的文本颜色	 | string  | —  | 	#409EFF |
| border  | 是否显示边框 | boolean  |—  | false |
| button  | 是否为按钮单选框，优先级比border高 | boolean  |—  | false |

## DicData Attributes<span id="dicData"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 label   | string / number / boolean    |       —        |      —   |
| value  | Radio 的 value    | string / number / boolean   |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |

## DicProps Attributes<span id="dicProps"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 label   | string / number / boolean    |       —        |      label   |
| value  | Radio 的 value    | string / number / boolean   |       —        |      value   |
| data | 字典数据prop，如`{code:1,data:[{label:'1',value:'1'}]}`,当为false时，表示接口直接返回字典数据 | string    |      string/false         |     data    |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |
