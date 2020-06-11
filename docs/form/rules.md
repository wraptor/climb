# 表单校验

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
      const checkAge = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('年龄不能为空'));
              }
              setTimeout(() => {
                if (!Number.isInteger(value)) {
                  callback(new Error('请输入数字值'));
                } else {
                  if (value < 18) {
                    callback(new Error('必须年满18岁'));
                  } else {
                    callback();
                  }
                }
              }, 1000);
       };
      return {
            form:{username:'admin',password:'123456',age:25},
            loading:false,
            option:{
                disabled:false,
                items:[
                    {
                        prop:'username',
                        label:'用户名',
                        type:'text',
                        rules:[{required: true, message: '请输入用户名', trigger: 'blur'},
                               {min: 3, max: 5, message: '用户名长度在 3 到 5 个字符', trigger: 'blur'}]
                    },{
                        prop:'password',
                        label:'密码',
                        type:'password',
                        rules:[{required: true, message: '请输入密码', trigger: 'blur'}]
                    },{
                        prop:'age',
                        label:'年龄',
                        type:'number',
                        controlsPosition:'right',
                        rules:[{required: true, validator: checkAge, trigger: 'blur' }]
                    }
                ]
            }
      }
    },
    /*created () {
        setInterval(_=>console.log('form:',JSON.stringify(this.form)),2000)
    },*/
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

