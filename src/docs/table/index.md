## 表格文档

### Attributes

| 参数        | 说明 | 类型 | 可选值 | 默认值 |
| ----------- | ---- | ---- | ------ | ------ |
| option      | 配置参数 |  Object  |        |        |
| permissions | 权限控制 | Object | true/false   |  {addBtn: true,editBtn: true,delBtn: true}  |
| params      | 请求分页数据额外参数 | Object  |        |        |
| loading     | 控制加载状态 | Boolean |  true/false   |  false  |

### Events

| 事件名称     | 说明 | 回调参数 |
| ----------- | ---- | ---- |
| load      |  加载数据事件，需要将获取的数据回传给done(res)，res的格式为{records:[],total:0,current:1,size:10,pages:0}  |  function(params,done) |
| add       |  添加事件,row为option中column指定的value默认值  |  function(row,done) |
| edit      |  编辑事件    |  function(row,done) |
| del       |  删除事件    |  function(row,done) |