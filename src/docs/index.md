# climb-ui 快速入门

### npm安装
推荐使用npm的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
#### 1.安装climb-ui
``` shell
npm i climb-ui -S
# element-resize-detector
# element-plus
```

#### 2.安装element-plus
``` shell
npm i element-plus -S
```

#### 3.安装element-resize-detector
解决el-table在flex布局下无法自适应伸缩问题
``` shell
npm i element-resize-detector -S
```


### 引入 Climb-UI
``` js
import {createApp} from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import climbUi from 'climb-ui'

createApp(App).use(ElementPlus).use(climbUi).mount('#app')
```