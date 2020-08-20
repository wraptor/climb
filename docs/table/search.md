# 搜索

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
              page:{size:10,current:1},
              option:{
                  columns:[
                      {
                          prop:'id',
                          label:'主键',
                          type:'number'
                      },{
                          prop:'name',
                          label:'姓名',
                          type:'text',
                          search:true,
                          searchSpan:12,
                          searchValue:'fg'
                      },{
                          prop:'age',
                          label:'年龄',
                          type:'number'
                      },{
                          prop:'sex',
                          label:'性别',
                          type:'radio',
                          search:true,
                          searchSpan:12,
                          value:'0',
                          dicData:[{label:'男',value:'0'},{label:'女',value:'1'}]
                      },{
                          prop:'test',
                          label:'网络字典1111111111',
                          type:'select',
                          search:true,
                          searchSpan:24,
                          searchLabelWidth:140,
                          dicUrl:'https://raw.githubusercontent.com/seepine/climb/master/docs/api/radio-dic-data.json'
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
                const randomNum =Math.floor(Math.random()*(maxLength-20))
                theData.push({id:i+1,name:str.substring(randomNum,randomNum+20),age:randomNum,sex: randomNum%2===0?'0':'1',test:'value:1'})
            }
            return theData
        }
      },
      methods: {
          handleLoad(page,done,params){
                this.$message.success(JSON.stringify(page)+","+JSON.stringify(params))
                this.pageApi(page,params).then(res=>{
                    console.log(res)
                    this.data = res.records
                    this.page.total = res.total
                    done()
                })
          },
          //模拟后端接口
          pageApi(page,params){
            return new Promise((RES,REJ)=>{
                let search = []
                this.allData.forEach(item=>{
                    //模拟后端数据库条件查找
                    if(!params || item.name.indexOf(params.name)>=0){
                        search.push(item)
                    }
                })
                let records = []
                for(let i=(page.current-1)*page.size;i< search.length && i<page.current*page.size;i++){
                    records.push(search[i])
                }
                setTimeout(()=>RES({records:records,total:search.length}),500)
            })
          }
      }
    }
</script>
```
:::

## Columns Attributes<span id="columns"></span>
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| search            | 是否开启搜索         | boolean | true/false     | false      |
| searchSpan    | 搜索表单栏栅格 | number | - | — |
| searchRules    | 搜索表单规则 | array | - | — |
| searchValue | 搜索表单默认值 | string | — | — |
| searchLabelWidth | 搜索表单label宽度 | number | — | — |

## Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| load |  搜索回调| page,done,params |
