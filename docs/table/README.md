# 文档
推荐使用npm的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
```
import Vue from 'vue';
import { ClTable } from 'climb-ui';
import App from './App.vue';

Vue.component(ClTable.name, ClTable);
/* 或写为
 * Vue.use(ClTable)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

## Variables
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | string / number  | — | — |
| data  | 表格数据    | array   | — | -   |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |

## Option Attributes<span id="option"></span>
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。  | string/number | — | — |
| maxHeight | Table 的最大高度。合法的值为数字或者单位为 px 的高度。 | string/number | — | — |
| stripe | 是否为斑马纹 table | boolean | — | false |
| border | 是否带有纵向边框 | boolean | — | false |
| size | Table 的尺寸 | string | medium / small / mini | — |
| fit | 列的宽度是否自撑开 | boolean | — | true |
| showHeader | 是否显示表头 | boolean | — | true |
| highlightCurrent-row | 是否要高亮当前行 | boolean | — | false |
| currentRowKey | 当前行的 key，只写属性 | String,Number | — | — |
| rowClassName | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 | Function({row, rowIndex})/String | — | — |
| rowStyle | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。 | Function({row, rowIndex})/Object | — | — |
| cellClassName | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。 | Function({row, column, rowIndex, columnIndex})/String | — | — |
| cellStyle | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex})/Object | — | — |
| headerRowClassName | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。 | Function({row, rowIndex})/String | — | — |
| headerRowStyle | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。 | Function({row, rowIndex})/Object | — | — |
| headerCellClassName | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。 | Function({row, column, rowIndex, columnIndex})/String | — | — |
| headerCellStyle | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex})/Object | — | — |
| rowKey | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | Function(row)/String | — | — |
| emptyText | 空数据时显示的文本内容，也可以通过 `slot="empty"` 设置 | String | — | 暂无数据 |
| defaultExpandAll | 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 | Boolean | — | false |
| expandRowKeys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。| Array | — | |
| defaultSort | 默认的排序列的 prop 和顺序。它的`prop`属性指定默认的排序的列，`order`指定默认排序的顺序| Object | `order`: ascending, descending | 如果只指定了`prop`, 没有指定`order`, 则默认顺序是ascending |
| tooltipEffect | tooltip `effect` 属性 | String | dark/light | | dark |
| showSummary | 是否在表尾显示合计行 | Boolean | — | false |
| sumText | 合计行第一列的文本 | String | — | 合计 |
| summaryMethod | 自定义的合计计算方法 | Function({ columns, data }) | — | — |
| spanMethod | 合并行或列的计算方法 | Function({ row, column, rowIndex, columnIndex }) | — | — |
| selectOnIndeterminate | 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行 | Boolean | — | true |
| indent      | 展示树形数据时，树节点的缩进 | Number | — | 16 |
| lazy        | 是否懒加载子节点数据 | Boolean | — | — |
| load        | 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 | Function(row, treeNode, resolve) | — | — |
| tree-props  | 渲染嵌套数据的配置选项 | Object | — | { hasChildren: 'hasChildren', children: 'children' } |
| columns | 表格列数据           | array  | 详见[Items Attributes](#columns) | — |




## Columns Attributes<span id="columns"></span>
除了下方参数外，items还可根据类型填入额外参数，如type为`text`时，可查看`<cl-input>`组件可填参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type            | 类型,详见[Type Attributes](#type)           | string | text,textarea,password,select...             | text      |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| display  | 表格是否可见 | boolean | true/false | true |
| addDisabled  | 新增表单是否禁用 | boolean | true/false | false |
| addDisplay  | 新增表单是否可见 | boolean | true/false | true |
| editDisabled  | 编辑表单是否禁用 | boolean | true/false | false |
| editDisplay  | 编辑表单是否可见 | boolean | true/false | true |
| viewDisplay  | 查看表单是否可见 | boolean | true/false | true |
| width | 对应列的宽度 | string | — | — |
| minWidth | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string | — | — |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean | true, left, right | — |
| renderHeader | 列标题 Label 区域渲染使用的 Function | Function(h, { column, $index }) | — | — |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean, string | true, false, 'custom' | false |
| sortMethod | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致 | Function(a, b) | — | — |
| sortBy | 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推 | String/Array/Function(row, index) | — | — |
| sortOrders | 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序 | array | 数组中的元素需为以下三者之一：`ascending` 表示升序，`descending` 表示降序，`null` 表示还原为原始顺序 | ['ascending', 'descending', null] |
| resizable | 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真） | boolean | — | true |
| formatter | 用来格式化内容 | Function(row, column, cellValue, index) | — | — |
| showOverflowTooltip | 当内容过长被隐藏时显示 tooltip | Boolean | — | false |
| align | 对齐方式 | String | left/center/right | left |
| headerAlign | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | String | left/center/right | — |
| className | 列的 className | string | — | — |
| labelClassName | 当前列标题的自定义类名 | string | — | — |
| selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | Function(row, index) | — | — |
| reserveSelection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 `row-key`） | Boolean | — | false |
| filters | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 | Array[{ text, value }] | — | — |
| filterPlacement | 过滤弹出框的定位 | String | 与 Tooltip 的 `placement` 属性相同 | — |
| filterMultiple | 数据过滤的选项是否多选 | Boolean | — | true |
| filterMethod | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 | Function(value, row, column) | — | — |
| filteredValue | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。 | Array | — | — |




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



## Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| add |  新增回调| row,done,index |
| view |  查看回调| row,done,index|
| edit |  编辑回调| row,done,index|
| del |  删除回调|  row,done,index|
| before-open |  增删改查对话框打开|  type,row,done,index|
| before-close |  增删改查对话框打开| type,row,done,index|
| before-open |  对话框打开|  type,row,done,index|
