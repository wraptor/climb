<template>
  <el-container style="height: 100%;">
    <el-header>
      <cl-header/>
    </el-header>
    <el-container style="height: calc(100vh - 60px);">
      <el-aside width="200px">
        <cl-menu/>
      </el-aside>
      <el-main style="overflow-y: auto">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import clHeader from "./components/cl-header.vue";
import clMenu from "./components/cl-menu.vue";

export default {
  name: "App",
  components: {clHeader, clMenu}
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  overflow-y: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  height: 100%;
}

.markdownIt-Anchor {
  display: none;
}

header {
  border-bottom: 1px solid #dcdfe6;
  padding: 0 40px !important;
}

//.hljs--one-dark.hljs {
//  color: #383a42 !important;
//  background: #fafafa !important;
//}
.vuedoc {
  margin-bottom: 30px;
}

.el-main {

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 20px;
    background: rgb(222, 223, 225);

    &:hover {
      background: rgb(200, 201, 204);
      cursor: pointer;
    }

    &:active {
      background: rgb(172, 172, 173);
    }
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(100, 100, 100, 0.1);
    background: #fff;
  }
}

th {
  border-bottom: 1px solid #dcdfe6;
  padding: 15px;
  max-width: 250px;
  text-align: left;
  white-space: nowrap;
  color: #909399;
  font-weight: 400;
}

td {
  border-bottom: 1px solid #dcdfe6;
  padding: 15px;
  max-width: 250px;
  color: #606266;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

tr {
  //border-top: 1px solid #dedede;
}
</style>
