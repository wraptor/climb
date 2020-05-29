<template>
    <el-scrollbar style="height:100%">
        <el-menu
                class="demo"
                :mode="defaultOption.mode"
                :collapse="defaultOption.collapsable||collapse"
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
            <template v-for="(item,index) in defaultOption.items">
                <el-menu-item-group v-if="item.type==='group'" :key="item.index?item.index:index"
                                    :title="item.title">
                    <cl-menu-item :sub-option="defaultOption"
                                  :items="item.items"
                                  :level="index+'-'"
                                  :disabled="disabled"/>
                </el-menu-item-group>
                <template v-else>
                    <el-menu-item
                            v-if="isEmpty(item.items)"
                            :disabled="disabled||item.disabled"
                            :index="item.index?item.index:index"
                            :key="item.index?item.index:index">
                        <i v-if="item.icon" :class="item.icon"/>
                        <span slot="title">{{ item.title}}</span>
                    </el-menu-item>
                    <el-submenu
                            v-else
                            :disabled="disabled||item.disabled"
                            :index="item.index?item.index:index"
                            :key="item.index?item.index:index">
                        <template slot="title">
                            <i v-if="item.icon" :class="item.icon"/>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <cl-menu-item :sub-option="defaultOption"
                                      :items="item.items"
                                      :level="index+'-'"
                                      :disabled="disabled"/>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import ClMenuItem from './menu-item';
    import beanUtil from "../util/bean-util";
    import deOp from "./option";

    export default {
        name: "ClMenu",
        components: {ClMenuItem},
        props: {
            option: {type: Object, default: undefined},
            disabled: {type: Boolean, default: false},
            collapse: {type: Boolean, default: false}
        }, watch: {
            option: {
                deep: true,
                handler(val) {
                    beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                }
            }
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp)),
            }
        }, created() {
            if (this.option) {
                beanUtil.copyPropertiesNotEmpty(this.option, this.defaultOption)
            }
        },
        methods: {
            handleSelect(index, indexPath) {
                this.$emit('select', index, indexPath)
            }, isEmpty(item) {
                return item === undefined || item === null || item.length === 0;
            }

        }
    }
</script>

<style scoped>
</style>
