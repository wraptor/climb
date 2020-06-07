# 列显隐

:::demo
```html
<template>
    <cl-table   :option="option" 
                :data="data"
                @add="handleAdd"
                @edit="handleEdit"
                @del="handleDel"/>
</template>
<script>
  export default {
    data() {
      return {
            data:[{id:1,name:'zhangsan',age:25,sex:'0',phone:'18888888888',time:'2020-06-05 17:05'},
                  {id:2,name:'lisi',age:25,sex:'1',phone:'17777777777',time:'2020-05-27 09:38'}],
            option:{
                columns:[
                    {
                        prop:'id',
                        label:'主键',
                        addDisplay:false,           //新增表单中不可见
                        editDisabled:true,          //编辑表单中禁用
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
                        viewDisplay:false,          //编辑表单中不可见
                        type:'radio',
                        dicData:[{label:'男',value:'0'},{label:'女',value:'1'}]
                    },{
                        prop:'phone',
                        label:'电话',
                        type:'text'
                    },{
                        prop:'time',
                        display:false,              //表格中不可见
                        label:'发布时间',
                        type:'text'
                    }
                ]
            }
      }
    },created(){
    },
    methods: {
        handleAdd(row,done,index){
            this.$message.success(JSON.stringify(row))
            setTimeout(_=>done(),2000)
        },
        handleEdit (row,done,index) {
            this.$message.success(JSON.stringify(row))
            setTimeout(_=>done(),2000)
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


### Columns Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| display  | 表格是否可见 | boolean | true/false | true |
| addDisabled  | 新增表单是否禁用 | boolean | true/false | false |
| addDisplay  | 新增表单是否可见 | boolean | true/false | true |
| editDisabled  | 编辑表单是否禁用 | boolean | true/false | false |
| editDisplay  | 编辑表单是否可见 | boolean | true/false | true |
| viewDisplay  | 查看表单是否可见 | boolean | true/false | true |
