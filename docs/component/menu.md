# Menu 菜单
推荐使用npm的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
```
import Vue from 'vue';
import { ClMenu } from 'climb-ui';
import App from './App.vue';

Vue.component(ClMenu.name, ClMenu);
/* 或写为
 * Vue.use(ClMenu)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

##  基础用法
`select`事件会返回选中项的index值和indexPath。当未指定item的index值时，默认会按照阶层和序号赋值。
:::demo
```html
<template>
    <cl-menu :option="option" @select="handleSelect"/>
</template>
<script>
export default {
  data() {
    return {
      option:{
        items:[
                {
                  title: '菜单1',
                  items: [
                    {
                      title: '菜单1.1',
                      icon: 'el-icon-c-scale-to-original',
                      items: [
                        {
                          title: '菜单1.1.1',
                          index:'the-index-1.1.1',
                          icon: 'el-icon-date'
                        },
                        {
                          title: '菜单1.1.2',
                          icon: 'el-icon-edit'
                        }
                      ]
                    },
                    {
                      title: '菜单1.2',
                      icon: 'el-icon-edit-outline'
                    }
                  ]
                },
                {
                  title: '菜单2',
                  items: [
                    {
                      title: '菜单2.1'
                    },
                    {
                      title: '菜单2.2'
                    }
                  ]
                }
              ]
      }
    }
  },methods:{
    handleSelect(index, indexPath){
      this.$message.success('index:'+index+',indexPath'+indexPath)
    }
  }
}
</script>
```
:::
##  禁用状态
可以在cl-menu标签上直接使用disabled全局禁用，也可以在option中指定某个item为禁用状态
:::demo
```html
<template>
    <div>
        <cl-menu :option="option" disabled @select="handleSelect"/>
        <el-divider/>
        <cl-menu :option="option" @select="handleSelect"/>
    </div>
</template>
<script>
export default {
  data() {
    return {
      option:{
        items:[
                {
                  title: '菜单1',
                  items: [
                    {
                      title: '菜单1.1',
                      icon: 'el-icon-c-scale-to-original',
                      items: [
                        {
                          title: '菜单1.1.1',
                          icon: 'el-icon-date'
                        },
                        {
                          title: '菜单1.1.2',
                          icon: 'el-icon-edit'
                        }
                      ]
                    },
                    {
                      title: '菜单1.2',
                      icon: 'el-icon-edit-outline'
                    }
                  ]
                },
                {
                  title: '菜单2',
                  items: [
                    {
                      title: '菜单2.1',
                      disabled:true
                    },
                    {
                      title: '菜单2.2'
                    }
                  ]
                }
              ]
      }
    }
  },created(){
    setTimeout(_=>{
        this.$message.warning('设置为disabled')
        let newOption = JSON.parse(JSON.stringify(this.option))
        newOption.items[0].disabled = true
        this.option = newOption
    },5000)
  },methods:{
    handleSelect(index, indexPath){
      this.$message.success('index:'+index+',indexPath'+indexPath)
    }
  }
}
</script>
```
:::
##  自定义颜色
:::demo
```html
<template>
    <cl-menu :option="option" @select="handleSelect"/>
</template>
<script>
export default {
  data() {
    return {
      option:{
        backgroundColor:"#545c64",
        textColor:"#fff",
        activeTextColor:"#ffd04b",
        items:[
                {
                  title: '菜单1',
                  items: [
                    {
                      title: '菜单1.1',
                      icon: 'el-icon-c-scale-to-original',
                      items: [
                        {
                          title: '菜单1.1.1',
                          index:'the-index-1.1.1',
                          icon: 'el-icon-date'
                        },
                        {
                          title: '菜单1.1.2',
                          icon: 'el-icon-edit'
                        }
                      ]
                    },
                    {
                      title: '菜单1.2',
                      icon: 'el-icon-edit-outline'
                    }
                  ]
                },
                {
                  title: '菜单2',
                  items: [
                    {
                      title: '菜单2.1'
                    },
                    {
                      title: '菜单2.2'
                    }
                  ]
                }
              ]
      }
    }
  },methods:{
    handleSelect(index, indexPath){
      this.$message.success('index:'+index+',indexPath'+indexPath)
    }
  }
}
</script>
```
:::
##  扩展用法
`step`可以设置计数器的步长，默认为1，stepStrictly可以设置是否只能输入step的倍数，默认为false
:::demo
```html
<template>
    <div>
        <el-button @click="setCollapse">切换伸缩</el-button>
        <cl-menu :option="option" :collapse="collapse" @select="handleSelect"/>
    </div>
</template>
<script>
export default {
  data() {
    return {
      collapse:false,
      option:{
        items:[
                {
                  title: '菜单1',
                  icon: 'el-icon-location',
                  items: [
                    {
                      type: 'group',
                      title: '分组1',
                      items: [
                        {
                          title: '菜单1.1.1',
                          icon: 'el-icon-date',
                          items: [
                            {
                              title: '菜单1.1.1.1',
                              icon: 'el-icon-menu'
                            },
                            {
                              title: '菜单1.1.1.2',
                              icon: 'el-icon-edit'
                            }
                          ]
                        },
                        {
                          title: '菜单1.1.2',
                          icon: 'el-icon-edit'
                        }
                      ]
                    },
                    {
                      type: 'group',
                      title: '分组2',
                      items: [
                        {
                          title: '菜单1.2.1',
                          icon: 'el-icon-date'
                        },
                        {
                          title: '菜单1.2.2',
                          icon: 'el-icon-edit'
                        }
                      ]
                    }
                  ]
                },
                {
                  title: '菜单2',
                  icon: 'el-icon-menu',
                  items: [
                    {
                      title: '菜单2.1'
                    },
                    {
                      title: '菜单2.2'
                    }
                  ]
                },
                {
                  title: '菜单3',
                  icon: 'el-icon-menu'
                }
              ]
      }
    }
  },methods:{
    handleSelect(index, indexPath){
      this.$message.success('index:'+index+',indexPath'+indexPath)
    },setCollapse(){
      this.collapse=!this.collapse
    }
  }
}
</script>
```
:::

## Variables
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值           | string / number  | — | — |
| disabled  | 是否禁用    | boolean   | — | false   |
| min      | 设置计数器允许的最小值 | number | — | -Infinity |
| max      | 设置计数器允许的最大值 | number | — | Infinity |
| option | 配置选项值           | object  | 详见[Option Attributes](#option) | — |

## Option Attributes<span id="option"></span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| mode     | 模式   | string  |   horizontal / vertical   | vertical |
| collapse  | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）| boolean  |   —   | false |
| backgroundColor  | 菜单的背景色（仅支持 hex 格式） | string |   —   | #ffffff |
| textColor  | 菜单的文字颜色（仅支持 hex 格式） | string |   —   | #303133 |
| activeTextCcolor  | 当前激活菜单的文字颜色（仅支持 hex 格式） | string |   —   | #409EFF |
| defaultActive | 当前激活菜单的 index | string    | — | — |
| defaultOpeneds | 当前打开的 sub-menu 的 index 的数组 | Array    | — | — |
| uniqueOpened  | 是否只保持一个子菜单的展开 | boolean   | — | false   |
| menuTrigger  | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) | string   | hover / click | hover |
| router  | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean   | — | false   |
| collapseTransition  | 是否开启折叠动画 | boolean   | — | true   |


## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| select  | 菜单激活回调 | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path  |
| open  | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path  |
| close  | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path  |

## Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| open  | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close  | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |
