<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type="flex" justify="end">
      <el-upload action :http-request="uploadImg" :show-file-list="false">
        <el-button size="small" type="primary">上传文件</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
            <el-row
              class="img-icon"
              type="flex"
              justify="space-around"
              style="font-size:25px"
              align="middle"
            >
              <i
                @click="collectOrCancel(item)"
                :style="{color: item.is_collected ? 'red' : ''}"
                class="el-icon-star-on"
              ></i>
              <i class="el-icon-delete-solid" @click="delMaterial(item.id)"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane class="collect" label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
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
    // 当前页数
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getAllMaterial()
    },
    // 获取数据
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
    },
    // 上传文件
    uploadImg (params) {
      this.loading = true // 打开进度条
      let form = new FormData()
      form.append('image', params.file) // 添加文件到formData
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: form // formData数据
      }).then(result => {
        this.loading = false // 关闭进度条
        this.getAllMaterial()
      })
    },
    // 删除素材
    delMaterial (id) {
      this.$confirm('您确定要删除该素材吗？').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getAllMaterial()
        })
      })
    },
    collectOrCancel (row) {
      // 调用 收藏或者取消收藏接口
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected // 状态取反 收藏 => 取消 取消 => 收藏
        }
      }).then(() => {
        // 成功一定进入到then
        this.getAllMaterial() // 重新加载数据
      })
    }
  },
  created () {
    this.getAllMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 240px;
    margin: 20px 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .img-icon {
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #f4f5f6;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
