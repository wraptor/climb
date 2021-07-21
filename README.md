# climb-ui
## 文档
###[climb](http://seepine.com/climb)

##快速入门
### npm安装
推荐使用npm的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
```
npm i climb-ui -S
```

### 引入 Climb-UI
```
import Vue from 'vue';
import ClimbUI from 'climb-ui';
import 'climb-ui/lib/climb-ui.css';
import App from './App.vue';

Vue.use(ClimbUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```