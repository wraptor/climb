# 典型表单

:::demo
```html
<template>
<cl-form :option="option" :loading="loading" v-model="form" @submit="onSubmit">
    <template slot="btn">
        <el-button type="primary" @click="onCustom">自定义按钮</el-button>
    </template>
</cl-form>
</template>
<script>
  export default {
    data() {
      return {
            form:{username:'admin',password:'123456',age:25,sex:'man'},
            loading:false,
            option:{
                items:[
                    {
                        prop:'username',
                        label:'用户名',
                        type:'text'
                    },{
                        prop:'password',
                        label:'密码',
                        type:'password'
                    },{
                        prop:'age',
                        label:'年龄',
                        type:'number',
                        min:0,
                        max:500
                    },{
                        prop:'sex',
                        label:'性别',
                        type:'radio',
                        border:true,
                        dicData:[{label:'男',value:'man'},{label:'女',value:'woman'}]
                    },{
                        prop:'hobby',
                        label:'爱好',
                        type:'checkbox',
                        button:true,
                        dicData:[{label:'打篮球',value:'basketball'},{label:'踢足球',value:'football'},{label:'游泳',value:'swimming'}]
                    }
                ]
            }           
      }
    },
    methods: {
      onSubmit(form,done) {
        this.$message.success(JSON.stringify(form))
        console.log(form)
        //doSomething
        setTimeout(_=>done(),2000)
      },
      onCustom(){
        this.loading=true
        this.$message.success('onCustom to do something')
        //doSomething
        setTimeout(_=>this.loading=false,2000)
      }
    }
  }
</script>
```
:::

