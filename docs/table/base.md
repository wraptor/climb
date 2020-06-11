# 基础表格

:::demo
```html
<template>
    <cl-table   :option="option" 
                :data="data"
                @load="handleLoad"
                @add="handleAdd"
                @edit="handleEdit"
                @del="handleDel"/>
</template>
<script>
  export default {
      data() {
        return {
              data:[],
              option:{
                  columns:[
                      {
                          prop:'id',
                          label:'主键',
                          type:'number'
                      },{
                          prop:'name',
                          label:'姓名',
                          type:'text'
                      },{
                          prop:'age',
                          label:'年龄',
                          type:'number'
                      },{
                          prop:'sex',
                          label:'性别',
                          type:'radio',
                          value:'0',
                          dicData:[{label:'男',value:'0'},{label:'女',value:'1'}]
                      },{
                          prop:'phone',
                          label:'电话',
                          type:'text'
                      },{
                          prop:'profession',
                          label:'职业',
                          type:'select',
                          dicData:[{label:'学生',value:'student'},{label:'老师',value:'teacher'},{label:'其他',value:'other'}]
                      }
                  ]
              }           
        }
      },created(){
      },
      methods: {
          handleLoad(page,done){
                this.$message.success(JSON.stringify(page))
                setTimeout(()=>{
                    this.data=[{id:100,name:'zhangsan',age:22,sex:'0',phone:'18888888888',profession:'student'},
                               {id:200,name:'lisi',age:25,sex:'1',phone:'17777777777',profession:'teacher'}]
                    done()
                },2000)
          },
          handleAdd(row,done,index){
              this.$message.success(JSON.stringify(row))
              setTimeout(_=>done(),2000)
          },
          handleEdit (row,done,index) {
              setTimeout(_=>{
                  this.$message.success(JSON.stringify(row))
                  let arr = [...this.data]
                  arr[index] = row
                  this.data = arr
                  done()
              },2000)
          },
          handleDel (row,done) {
              this.$message.success(JSON.stringify(row))
              setTimeout(_=>done(),2000)
          }
      }
    }
</script>
```
:::

## Variables
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| data  | 表格数据    | array   | — | -   |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |

## Columns Attributes<span id="columns"></span>
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type            | 类型,详见[Type Attributes](#type)           | string | text,textarea,password,select...             | text      |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |

## Type Variables<span id="type"></span>
| 参数             | 说明               | 使用组件              |
| -------------   |:------------------:|:-------------:|
| text            | 输入框              |```<cl-input/>```        |
| number          | 计数器              |```<cl-input-number/> ```  |
| radio           | 单选框              |```<cl-radio/>```|
| select          | 下拉框              |```<cl-select/>```|

## Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| add |  新增回调| row,done,index |
| view |  查看回调| row,done,index|
| edit |  编辑回调| row,done,index|
| del |  删除回调|  row,done,index|
