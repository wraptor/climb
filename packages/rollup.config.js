import vue from "rollup-plugin-vue";
import {terser} from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";


module.exports = [{
    input: "src/index.js",
    output: [{
        file: "dist/index.js"
    },],
    plugins: [
        vue({
            css: true,
            compileTemplate: true,
        }),
        terser(),
        postcss({
            // 把 css 插入到 style 中
            inject: true,
            // 把 css 放到和js同一目录
            extract: false,
            use: 'sass',
            plugins: [
                require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']}) // 自动添加css前缀
            ]
        }),
    ],
},];