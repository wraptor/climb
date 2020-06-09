# 多选

:::demo
```html
<template>
    <cl-table   :option="option" 
                :data="data"
                @selection-change="handleSelectionChange"/>
</template>
<script>
export default {
    data() {
      return {
            data:[{name:'zhangsan',age:22,sex:'0',phone:'18888888888'},
                  {name:'lisi',age:25,sex:'1',phone:'17777777777'},
                  {name:'wangwu',age:29,sex:'0',phone:'19999999999'}],
            option:{
                selection:true,
                selectable:(row,index)=>{
                  return index!==1;
                },
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
        handleSelectionChange(selection){
            this.$message.success(JSON.stringify(selection))
        }
    }
  }
  
</script>
```
:::

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| selection        | 是否显示多选列 | Boolean | — | false |
| selectable        | 类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | Function(row, index) | — | — |
| selectionWidth        | 多选列宽度 | string/number | — | 50 |

### Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| selection-change|当选择项发生变化时会触发该事件|selection
