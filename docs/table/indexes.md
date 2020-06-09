# 索引列

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
            data:[{name:'zhangsan',age:22,sex:'0',phone:'18888888888'},
                  {name:'lisi',age:25,sex:'1',phone:'17777777777'},
                  {name:'wangwu',age:29,sex:'0',phone:'19999999999'}],
            option:{
                index:true,
                indexFixed:true,
                columns:[{
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

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| index        | 是否显示该行的索引 | Boolean | — | false |
| indexLabel        | 索引列名 | String | — | '序号' |
| indexWidth        | 索引列宽度 | string/number | — | 50 |
| indexFixed        | 索引列是否固定在左侧或者右侧，true 表示固定在左侧 | Boolean | — | — |


