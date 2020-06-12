# 自定义表单

:::demo
```html
<template>
    <cl-table   :option="option" 
                :data="data"
                @add="handleAdd"
                @edit="handleEdit"
                @del="handleDel">
        <template slot="sexForm">
            <cl-select v-model="value" :dicData="dicData" @change="handleChange"></cl-select>
        </template>
    <cl-table>
</template>
<script>
  export default {
    data() {
      return {
            value:'',
            dicData:[{label:'男',value:'0'},{label:'女',value:'1'}],
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
                        slotForm:true
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
        },handleChange(value){
            this.$message.success(value)
        }
    }
  }
</script>
```
:::

### Columns Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| slotForm | 是否开启表单插槽 | Boolean | true/false | false |

### Table Slot
| name | 说明 |
|------|--------|
| ${prop}Form | prop的列插槽 |
