import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import config from './config'
import index from '../docs/index.md'

const routes = [{
    path: '/',
    name: '快速入门',
    component: index
}]
config.forEach(item => {
    routes.push({
        path: item.path,
        name: item.name,
        redirect: `${item.path}/index`
    });
    item.children.forEach(child => {
        routes.push({
            path: item.path + child.path,
            name: child.name,
            component: () =>
                import (`../docs${item.path}${child.path}.md`)
        });
    })
})


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, form, next) => {
    document.title = (to.name ? `${to.name} - ` : '') + 'Climb-UI';
    next();
})

export default router
