# 自定义菜单

:::demo
```html
<template>
    <cl-table   :option="option" 
                :data="data"
                @add="handleAdd"
                @edit="handleEdit"
                @del="handleDel">
        <template slot="menuLeft">
            <el-button type="success" icon="el-icon-download" size="small">导 出</el-button>
        </template>
        <template slot="menuRight">
            <el-button type="primary" icon="el-icon-phone-outline" circle size="small"></el-button>
        </template>
        <template slot-scope="{index,row}" slot="menu">
             <el-button icon="el-icon-check" size="small" type="text" @click="handleCustom(index,row)">备注</el-button>
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
                        dicData:[{label:'男',value:'0'},{label:'女',value:'1'}]
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
        },handleCustom(index,row){
            console.log(index,row)
            this.$message.success(index+','+JSON.stringify(row))
        }
    }
  }
</script>
```
:::


### Table Slot
| name | 说明 |
|------|--------|
| menu | 插入至表格中菜单最后 |
| menuLeft | 插入至表格上方菜单左侧 |
| menuRight | 插入至表格上方菜单右侧 |
