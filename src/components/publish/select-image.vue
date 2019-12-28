<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="select-img-list">
          <!-- 循环生成选择列表 -->
        <el-card v-for="item in list" :key="item.id" class="img-card">
          <!-- 点击图片调用方法，将图片地址传出去 -->
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
        <el-row type="flex" justify="center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="上传文件" name="upload">上传文件</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [], // 接收素材库数据
      page: {
        currentPage: 1, // 当前页码
        pageSize: 8, // 每页页数
        total: 10
      }
    }
  },
  methods: {
    // 当前页数
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 获取图片文件
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 赋值总数
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.select-img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    width: 120px;
    height: 120px;
    margin: 10px 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
