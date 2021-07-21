<template>
  <div class="cl-list" v-loading="loading">
    <slot name="header" :page="page"></slot>
    <div
      class="cl-list-body"
      :style="row ? { flexDirection: 'row' } : { flexDirection: 'column' }"
      v-infinite-scroll="loadMore"
      :infinite-scroll-delay="delay"
      :infinite-scroll-disabled="!auto || page.current === page.pages"
    >
      <div class="cl-list-item" v-for="(item, index) in data" :key="index">
        <slot :item="item" :index="index">
          {{ item }}
        </slot>
      </div>
      <div v-if="page.total === 0">
        <slot name="empty">
          <el-empty :description="empty"></el-empty>
        </slot>
      </div>
      <div class="flex-row justify-center" v-else-if="page.current === page.pages">
        <el-divider style="width: 80%" v-if="auto"
          ><p class="cl-list-tip">没有更多了</p></el-divider
        >
      </div>
      <div v-else-if="!auto" style="text-align: center">
        <el-button @click="loadMore" type="text" style="width: 100px">加载更多</el-button>
      </div>
      <el-divider v-else><p class="cl-list-tip">加载中...</p></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClList',
  props: {
    delay: {
      type: Number,
      default: 400
    },
    empty: {
      type: String,
      default: '没有数据'
    },
    row: {
      type: Boolean,
      default: false
    },
    // 是否自动加载更多
    auto: {
      type: Boolean,
      default: true
    },
    size: {}
  },
  watch: {
    size: {
      handler(val) {
        if (val) {
          this.page.size = val
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      page: {
        pages: 1,
        current: 0,
        size: 20
      },
      data: [],
      loading: false
    }
  },
  emits: ['load'],
  methods: {
    reload() {
      this.page.current = 0
      this.page.pages = 1
      this.data = []
      this.loadMore()
    },
    loadMore() {
      if (this.page.current < this.page.pages) {
        this.loading = true
        this.page.current = this.page.current + 1
        this.$emit('load', this.page, (res) => {
          if (res) {
            this.page.pages = res.pages
            this.page.total = res.total
            this.data.push(...res.records)
          }
          this.loading = false
        })
      }
    }
  }
}
</script>

<style scoped>
.cl-list-body {
  display: flex;
  /*flex-direction: column;*/
}

.cl-list-item {
  flex: 1;
  display: flex;
  word-wrap: break-word;
}

.cl-list-tip {
  text-align: center;
  font-size: 14px;
  background-color: #fff;
  color: #7e7e7e;
}
</style>
