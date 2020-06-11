# 自定义列

:::demo
```html
<template>
    <cl-table   :option="option" 
                :data="data"
                @add="handleAdd"
                @edit="handleEdit"
                @del="handleDel">
        <template slot="sex" slot-scope="{index,row}">
            <el-tag v-if="row.sex==='0'">男</el-tag>
            <el-tag v-else type="warning">女</el-tag>
        </template>
    <cl-table>
</template>
<script>
  export default {
    data() {
      return {
            data:[{id:1,name:'zhangsan',age:25,sex:'0'},
                  {id:2,name:'lisi',age:25,sex:'1'}],
            option:{
                menuWidth:260,
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
                        dicData:[{label:'男',value:'0'},{label:'女',value:'1'}],
                        slot:true
                    }
                ]
            }
      }
    },
    methods: {
        handleAdd(row,done,index){
            this.$message.success(JSON.stringify(row))
            setTimeout(_=>done(),2000)
        },
        handleEdit (row,done,index){
            this.$message.success(JSON.stringify(row))
            setTimeout(_=>done(),2000)
        },
        handleDel (row,done){
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
| slot | 是否开启插槽 | Boolean | true/false | false |

### Table Slot
| name | 说明 |
|------|--------|
| ${prop} | prop的列插槽 |
