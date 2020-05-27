<template>
    <el-scrollbar style="height:100%">
        <el-menu
                :mode="defaultOption.mode"
                :collapse="defaultOption.collapsable"
                :background-color="defaultOption.backgroundColor"
                :text-color="defaultOption.textColor"
                :active-text-color="defaultOption.activeTextColor"
                :default-active="defaultOption.defaultActive"
                :default-openeds="defaultOption.defaultOpeneds"
                :unique-opened="defaultOption.uniqueOpened"
                :menu-trigger="defaultOption.menuTrigger"
                :router="defaultOption.router"
                :collapse-transition="defaultOption.collapseTransition"
                @select="handleSelect"
        >
            <menu-item :items="defaultOption.items" :disabled="disabled"/>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import menuItem from './menu-item';
    import beanUtil from "../util/bean-util";
    import deOp from "./option";

    export default {
        name: "ClMenu",
        components: {menuItem},
        props: {
            option: {type: Object, default: undefined},
            disabled: {type: Boolean, default: false}
        }, watch: {
            option: {
                deep: true,
                immediate: true,
                handler(val) {
                    beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                    console.log('watch', this.defaultOption)
                }
            }
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp))
            }
        },
        methods: {
            handleSelect(index, indexPath) {
                console.log(index, indexPath)
                this.$emit('select', index, indexPath)
            }

        }
    }
</script>

<style scoped>

</style>
