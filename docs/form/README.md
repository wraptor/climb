# 介绍 & 表单
推荐使用npm的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
```
npm i climb-ui -S
```
# 文档
## Variables
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | string / number  | — | — |
| data  | 表格数据    | array   | — | -   |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |

## Option Attributes<span id="option"></span>
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width` | string |  right/left/top            | right |
| label-width | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto`。 | string | — | — |
| label-suffix | 表单域标签的后缀 | string | — | — |
| hide-required-asterisk | 是否显示必填字段的标签旁边的红色星号 | boolean | — | false |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 是否以行内形式展示校验信息 | boolean | — | false |
| status-icon  | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |
| size  | 用于控制该表单内组件的尺寸 | string | medium / small / mini | — |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |
| items | 表单数据           | array  | 详见[Items Attributes](#items) | — |


## Items Variables<span id="items"></span>
除了下方参数外，items还可根据类型填入额外参数，如type为`text`时，可查看`<cl-input>`组件可填参数

| 参数             | 说明           | 类型  |    可选值                                     |    默认值|
| -------------   |:-------------:| -------:| ------------------------------------------- |:--------:|
| type            | 类型,详见[Type Attributes](#type)           | string | text,textarea,password,select...             | text      |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| labelWidth | 表单域标签的的宽度，例如 '50px'。支持 `auto`。 | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| showMessage  | 是否显示校验错误信息 | boolean | — | true |
| inlineMessage  | 以行内形式展示校验信息 | boolean | — | false |
| size  | 用于控制该表单域下组件的尺寸 | string | medium / small / mini | - |

## Type Variables<span id="type"></span>

| 参数             | 说明               | 使用组件              |
| -------------   |:------------------:|:-------------:|
| text            | 输入框              |```<cl-input/>```        |
| textarea        | 文本框              |```<cl-input/>   ```     |
| password        | 密码框              |```<cl-input/>   ```       |
| number          | 计数器              |```<cl-input-number/> ```  |
| radio           | 单选框              |```<cl-radio/>```|
| checkbox        | 多选框              |```<cl-checkbox/>```|
| select          | 下拉框              |```<cl-select/>```|
| switch          | 开关                |```<cl-switch/>```|
| slider          | 滑块                |```<cl-slider/>```|
| time            | 时间选择器          |```<cl-time-select/>```|
| timerange       | 时间范围框          |```<cl-time-select/>```|
| year            | 年份选择器          |```<cl-date-picker/>```|
| month           | 月份选择器          |```<cl-date-picker/>```|
| monthrange      | 月份范围选择器      |```<cl-date-picker/>```|
| date            | 日期选择器          |```<cl-date-picker/>```|
| daterange       | 日期范围选择器      |```<cl-date-picker/>```|
| datetime        | 日期时间选择器      |```<cl-date-picker/>```|
| datetimerange   | 日期时间范围选择器  |```<cl-date-picker/>```|


