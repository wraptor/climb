# Input 输入框

##  基础用法
:::demo
```html
<template>
     <cl-input v-model="value" :option="option"></cl-input>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      option:{
        type:'text',
        maxlength: 50,                       //原生属性，最大输入长度
        minlength:10,                        //原生属性，最小输入长度
        showWordLimit:true,                  //是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
        placeholder:'请输入',                //输入框占位文本
        clearable:true,                     //是否可清空
        size:'medium',                      //medium/small/mini,输入框尺寸，只在 type!="textarea" 时有效
        prefixIcon:'el-icon-phone-outline', //输入框头部图标
        suffixIcon:'el-icon-star-off',      //输入框尾部图标
      }
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
        <cl-input v-model="value" :option="{disabled:true}"></cl-input>
        <cl-input v-model="value" disabled></cl-input>   
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::
##  密码框
:::demo
```html
<template>
    <cl-input v-model="value" :option="{type:'password'}"></cl-input>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::
##  带 icon 的输入框
:::demo
```html
<template>
    <div>
        <cl-input v-model="value" :option="option" @change="handleChange"></cl-input>
        <cl-input v-model="value" :option="option" @change="handleChange"></cl-input>
    </div>
</template>
<script>
export default {
  data() {
    return {
        value: '',
        option:{
            prefixIcon:'el-icon-phone-outline', //输入框头部图标
            suffixIcon:'el-icon-star-off',      //输入框尾部图标
        }
    }
  },methods:{
    handleChange(value){
      this.$message.success(value)
    }
  }
}
</script>
```
:::

##  文本域
用于输入多行文本信息，通过将 type 属性的值指定为 textarea。文本域高度可通过`rows`属性控制，也可以通过`autosize`控制。
:::demo
```html
<template>
    <el-row :gutter="20">
        <el-col :span="6">限制行数：</el-col>
        <el-col :span="18"><cl-input v-model="value" :option="option"></cl-input></el-col>
        <el-col :span="6">自适应行数：</el-col>
        <el-col :span="18"><cl-input v-model="value2" :option="option2"></cl-input></el-col>
        <el-col :span="6">指定最大最小行数：</el-col>
        <el-col :span="18"><cl-input v-model="value2" :option="option3"></cl-input></el-col>
    </el-row>
</template>
<script>
export default {
  data() {
    return {
        value: '',
        value2: '',
        value3: '',
        option:{
            type:'textarea',
            rows:3
        },
        option2:{
            type:'textarea',
            autosize:true
        },
        option3:{
            type:'textarea',
            autosize:{minRows:2,maxRows:4}
        }
    }
  }
}
</script>
```
:::



##  自定义模版
:::demo
```html
<template>
    <div>
        <cl-input v-model="value">
            <template slot="prepend">Http://</template>
            <template slot="append">.com</template>
        </cl-input>
        <cl-input v-model="value2" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="餐厅名" value="1"></el-option>
                  <el-option label="订单号" value="2"></el-option>
                  <el-option label="用户电话" value="3"></el-option>
            </el-select>
        </cl-input>
    </div>
</template>
<script>
export default {
  data() {
    return {
        value: '',
        value2: '',
        select:''
    }
  }
}
</script>
<style>
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
```
:::

## Variables
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | string / number  | — | — |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |

## Option Attributes<span id="option"></span>
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type     | 输入框类型      | string          |  text,textarea,password  | text |
| maxlength     | 原生属性，最大输入长度      | number          |  —  | — |
| minlength     | 原生属性，最小输入长度      | number          | — | — |
| showWordLimit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | boolean    |  —  | false |
| placeholder   | 输入框占位文本    | string          | — | — |
| clearable     | 是否可清空        | boolean         | — | false |
| showPassword | 是否显示切换密码图标| boolean         | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | — |
| prefixIcon   | 输入框头部图标    | string          | — | — |
| suffixIcon   | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean / object | — |  false   |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| autoComplete | 下个主版本弃用 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| form | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |
| tabindex | 输入框的tabindex | string | - | - |
| validateEvent | 输入时是否触发表单的校验 | boolean | - | true |

## Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容，只对 `type="text"` 有效 |
| suffix | 输入框尾部内容，只对 `type="text"` 有效 |
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append | 输入框后置内容，只对 `type="text"` 有效 |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string \| number) |
| input | 在 Input 值改变时触发 | (value: string \| number) |
| clear | 在点击由 `clearable` 属性生成的清空按钮时触发 | — |

## Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| select | 选中 input 中的文字 | — |
