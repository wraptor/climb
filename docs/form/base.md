# 典型表单

:::demo
```html
<template>
<cl-form :option="option" v-model="form" @submit="onSubmit">
    <template slot="btn">
        <el-button type="primary" @click="onSubmit">自定义按钮</el-button>
    </template>
</cl-form>
</template>
<script>
  export default {
    data() {
      return {
            form:{username:'admin',password:'123456',sex:'man'},
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
                        prop:'sex',
                        label:'性别',
                        type:'radio',
                        dicData:[{label:'男',value:'man'},{label:'女',value:'woman'}]
                    },
                ]
            }           
      }
    },created(){
        let this_=this
        setInterval(_=>{
        
            console.log(this_.form.username,this_.form.password)
        },1000)
    },
    methods: {
      onSubmit(form,done) {
        this.$message.success('ok')
        console.log(form)
        setTimeout(_=>done(),2000)
      }
    }
  }
</script>
```
:::

