import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginVuedoc, {vueDocFiles} from "vite-plugin-vuedoc";

export default defineConfig({
    plugins: [
        vitePluginVuedoc({}),
        vue({
            include: [...vueDocFiles],
        }),
    ]
});
