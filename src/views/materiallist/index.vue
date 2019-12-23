<template>
  <el-card>
    <bread-crumb slot="header">
        <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all">
          <div class="img-list">
            <el-card v-for="item in list" :key="item.id" class="img-card">
              <img :src="item.url" alt="">
              <el-row class="img-icon" type="flex" justify="space-around" style="font-size:25px" align="middle">
                <i class="el-icon-star-on"></i>
                <i class="el-icon-delete-solid"></i>
              </el-row>
            </el-card>
          </div>
        </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect"></el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中项
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 10
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getAllMaterial()
    },
    getAllMaterial () {
      this.$axios({
        url: 'user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list{
  display: flex;
  flex-wrap: wrap;
  .img-card{
    width: 200px;
    height: 240px;
    margin: 20px 30px;
      position: relative;
    img{
      width: 100%;
      height: 100%;
    };
    .img-icon{
      width: 100%;
      height: 40px;
      position: absolute;
      bottom :0;
      left: 0;
      background-color: #f4f5f6;
    }
  }
}
</style>
