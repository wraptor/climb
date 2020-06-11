# Select 选择框


##  基础用法
`change`事件会返回选中项的value值，若没有指定value，则会返回label值。
:::demo
```html
<template>
    <cl-select v-model="value" :dicData="dicData" @change="handleChange"></cl-select>
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
        <cl-select v-model="value" disabled :dicData="dicData"></cl-select><br/>
        <cl-select v-model="value2" :option="option" :dicData="dicData2"></cl-select><br/>
        <cl-select v-model="value3" :dicData="dicData3"></cl-select><br/>   
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
        <cl-select v-model="value"  :option="option" @change="handleChange"></cl-select>
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
    <cl-select v-model="value"  :option="option" @change="handleChange"></cl-select>
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
            <cl-select v-model="value"  :option="option" @change="handleChange"></cl-select>
        </el-col>
        <el-col :span="24" style="margin: 10px;">
            <cl-select v-model="value"  :option="option2" @change="handleChange"></cl-select>
        </el-col>
        <el-col :span="24" style="margin: 10px;">
            <cl-select v-model="value2"  :option="option3" @change="handleChange"></cl-select>
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
| disabled | 是否禁用 | boolean | — | false |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |
| dicData | 字典数据           | array  | 详见[DicData Attributes](#dicData) | — |

## Option Attributes<span id="option"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| dicProps  | 字典 | object  | 详见[DicProps Attributes](#dicProps) | — |
| dicData | 字典数据           | array  | 详见[DicData Attributes](#dicData) | — |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| size | 输入框尺寸 | string | medium/small/mini | — |
| clearable | 是否可以清空选项 | boolean | — | false |
| collapseTags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| multipleLimit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | select input 的 name 属性 | string | — | — |
| autocomplete | select input 的 autocomplete 属性 | string | — | off |
| autoComplete | 下个主版本弃用 | string | — | off |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| allowCreate | 是否允许用户创建新条目，需配合 `filterable` 使用 | boolean | — | false |
| filterMethod | 自定义搜索方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remoteMethod | 远程搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loadingText | 远程加载时显示的文字 | string | — | 加载中 |
| noMatchText | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置 | string | — | 无匹配数据 |
| noDataText | 选项为空时显示的文字，也可以使用`slot="empty"`设置 | string | — | 无数据 |
| popperClass | Select 下拉框的类名 | string | — | — |
| reserveKeyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | — | false |
| defaultFirstOption | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用 | boolean | - | false |
| popperAppendToBody | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean | - | true |
| automaticDropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | boolean | - | false |


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

## Slots
|   name  | 说明     |
|---------|---------|
|    —    | Option 组件列表 |
| prefix  | Select 组件头部内容 |
| empty | 无选项时的列表 |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

## Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点，并隐藏下拉框 | - |
