# 典型表单

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
            data:[{id:1,name:'zhangsan',age:25,sex:'0',phone:'18888888888'},
                  {id:2,name:'lisi',age:25,sex:'1',phone:'17777777777'}],
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
                        dicData:[{label:'男',value:'0'},{label:'女',value:'1'}]
                    },{
                        prop:'phone',
                        label:'电话',
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

