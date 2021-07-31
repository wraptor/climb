<template>
  <el-menu
      router
      :default-active="route.fullPath"
      class="el-menu-vertical-demo"
  >
    <el-menu-item v-for="item in menus" :key="baseUrl+item.path" :index="baseUrl+item.path">{{item.name}}</el-menu-item>
  </el-menu>
</template>

<script setup>
import {ref, watch} from "vue";
import routerConfig from '../router/config'
import {useRoute} from "vue-router";

let menus = ref([]);
let baseUrl = ref("");

const route = useRoute();
watch(route, () => {
  routerConfig.forEach(config => {
    if (route.fullPath.indexOf(config.path) >= 0) {
      baseUrl.value = config.path;
      menus.value = config.children;
    }
  })
});

</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 100%;
}
</style>
