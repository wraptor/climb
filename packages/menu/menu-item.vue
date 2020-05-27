<template>
    <div class="menu-wrapper">
        <template v-for="(item,index) in items">
            <el-menu-item-group v-if="item.type==='group'" :key="item.index?item.index:level+index"
                                :title="item.title">
                <cl-menu-item :items="item.items" :level="level+index+'-'" :disabled="disabled"/>
            </el-menu-item-group>
            <template v-else>
                <el-menu-item
                        v-if="isEmpty(item.items)"
                        :disabled="disabled||item.disabled"
                        :index="item.index?item.index:level+index"
                        :key="item.index?item.index:level+index">
                    <i v-if="item.icon" :class="item.icon"/>
                    <span slot="title">{{ item.title}}</span>
                </el-menu-item>
                <el-submenu
                        v-else
                        :disabled="disabled||item.disabled"
                        :index="item.index?item.index:level+index"
                        :key="item.index?item.index:level+index">
                    <template slot="title">
                        <i v-if="item.icon" :class="item.icon"/>
                        <span slot="title">{{ item.title }}</span>
                    </template>
                    <cl-menu-item :items="item.items" :level="level+index+'-'" :disabled="disabled"/>
                </el-submenu>
            </template>
        </template>
    </div>
</template>

<script>
    import beanUtil from "../util/bean-util";

    export default {
        name: "ClMenuItem",
        props: {
            items: {type: Array},
            level: {type: String, default: ''},
            disabled: {type: Boolean, default: false}
        },watch: {
            items: {
                deep: true,
                immediate: true,
                handler(val) {
                    beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                    console.log('watch', this.defaultOption)
                }
            }
        }, methods: {
            isEmpty(item) {
                return item === undefined || item === null || item.length === 0;
            }
        }
    }
</script>

<style scoped>

</style>
