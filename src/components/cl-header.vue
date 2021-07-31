<template>
  <div class="header">
    <div>Climb</div>
    <div class="flex-row items-center">
      <router-link v-for="item in routerConfig" :to="item.path">{{item.name}}</router-link>
      <div>
        Github
      </div>
    </div>
  </div>
</template>
<script setup>
import routerConfig from '../router/config'
</script>
<style scoped>
.header{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}
</style>
