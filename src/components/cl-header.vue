<template>
  <div class="header">
    <router-link to="/" class="logo">Climb</router-link>
    <div class="flex-row items-center">
      <router-link class="nav" v-for="item in routerConfig" :to="item.path">
        <p :class="{'active':item.path===baseUrl}">
          {{ item.name }}
        </p>
      </router-link>
      <a target="_blank" class="nav" tar href="https://github.com/wraptor/climb">
        <p>
          <i class="el-icon-link" style="margin-right: 3px"></i>Github
        </p>
      </a>
    </div>
  </div>
</template>
<script setup>
import routerConfig from '../router/config'
import {useRoute} from "vue-router";
import {ref, watch} from "vue";

const route = useRoute();
const fullPath = ref("/")
let baseUrl = ref("");
watch(route, () => {
  baseUrl.value = ""
  routerConfig.forEach(config => {
    if (route.fullPath.indexOf(config.path) >= 0) {
      baseUrl.value = config.path;
    }
  })
});
</script>
<style scoped lang="scss">
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  a {
    text-decoration: none;
    color: var(--el-color-primary);
  }

  .nav {
    padding: 0 14px;
    font-size: 16px;

    &:hover {
      background-color: rgba(240, 240, 240, 0.2);
    }

    p {
      margin: 0;
      line-height: 60px;
      opacity: 0.5;
    }

    .active {
      opacity: 1;
      line-height: 58px;
      border-bottom: 2px solid var(--el-color-primary);
    }
  }
}

.logo {
  font-size: 26px;
  font-weight: bold;
}
</style>
