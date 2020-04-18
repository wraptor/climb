---
home: true
heroImage: https://www.vuepress.cn/hero.png
actionText: 快速上手 →
actionLink: /form/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue 驱动
  details: 享受 Vue + webpack 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2020 seepine 
---

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i cleme-ui -S
```

### CDN

目前可以通过 [unpkg.com/cleme-ui](https://unpkg.com/cleme-ui/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/cleme-ui/lib/cleme-ui.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/cleme-ui/lib/cleme-ui.common.js"></script>
```

:::tip
我们建议使用 CDN 引入 Cleme 的用户在链接地址上锁定版本，以免将来 Cleme 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::

::: warning 注意
请确保你的 Node.js 版本 >= 8.6。
:::
