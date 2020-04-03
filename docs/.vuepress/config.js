module.exports = ctx => ({
    base: '/cleme/',
    title: 'cleme',
    logo: 'https://www.vuepress.cn/hero.png',
    description: 'cleme-ui',
    themeConfig: {
        smoothScroll: true,//页面滚动
        logo: '/assets/img/logo.png',
        repo: 'seepine/cleme',
        editLinks: true,
        docsDir: 'docs',
        nav: require('./nav/zh'),
        sidebar: {
            '/form/': require('./sidebar/form'),
            '/table/': require('./sidebar/table'),
            '/menu/': require('./sidebar/menu')
        },
        lastUpdated: 'Last Updated'
    }, head: [
        ['script', {src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js'}],
        ['script', {src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js'}],
        ['script', {src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js'}],
        ['script', {src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js'}],
        ['script', {src: 'https://unpkg.com/element-ui/lib/index.js'}],
        ['link', {rel: "stylesheet", href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'}]
    ],
    plugins: ['demo-block', 'vuepress-plugin-nprogress']
})
