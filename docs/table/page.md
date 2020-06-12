# 分页

:::demo
```html
<template>
    <cl-table   :option="option" 
                :data="data"
                :page="page"
                @load="handleLoad"/>
</template>
<script>
  export default {
      data() {
        return {
              data:[],
              page:{size:20,current:1},
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
                      }
                  ]
              }           
        }
      },created(){
          
      }, computed:{
        //模拟数据库数据
        allData:()=>{
            let theData = []
            const str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            const maxLength = str.length
            for (let i=0;i<48;i++){
                const randomNum =Math.floor(Math.random()*(maxLength-10))
                theData.push({id:i+1,name:str.substring(randomNum,randomNum+10),age:randomNum,sex: randomNum%2===0?'0':'1'})
            }
            return theData
        }
      },
      methods: {
          handleLoad(page,done){
                this.$message.success(JSON.stringify(page))
                this.pageApi(page).then(res=>{
                    console.log(res)
                    this.data = res.records
                    this.page.total = res.total
                    done()
                })
          },
          //模拟后端接口
          pageApi(page){
            return new Promise((RES,REJ)=>{
                let records = []
                for(let i=(page.current-1)*page.size;i<this.allData.length && i<page.current*page.size;i++){
                    records.push(this.allData[i])
                }
                setTimeout(()=>RES({records:records,total:this.allData.length}),500)
            })
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
