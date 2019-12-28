<template>
 <el-tabs v-model="activeName" >
    <el-tab-pane label="素材库" name="material">
        <div class="select-img-list">
            <el-card class="img-card" v-for="item in list" :key="item.id">
                <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
        </div>

        <el-row type="flex" justify="center">
            <el-pagination background layout="prev, pager, next"
         :total="page.total"
         :current-page="page.currenPage"
         :page-size="page.pageSize"
         @current-change="changePage"
         ></el-pagination>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
       <!-- 放一个上传组件 -->
       <el-upload class='upload' :http-request="uploadImg" action="" :show-file-list="false">
            <i class='el-icon-plus'></i>
        </el-upload>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选择素材库
      list: [], // 接收素材库数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.$emit('selectOneImg', result.data.url)
      })
    },
    clickImg (url) {
      // 需要将url地址传出去 $emit自定义事件=>携带参数
      this.$emit('selectOneImg', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 获取全部数据
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
    this.getAllImg()
  }

}
</script>

<style lang="less" scoped>
.select-img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card{
        width: 120px;
        height: 120px;
        margin: 10px 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.upload {
    display: flex;
   justify-content: center;
    i {
        font-size: 50px;
        display: block;
        margin: 20px auto;
        padding: 60px;
        border: 1px dashed #ccc;
        border-radius: 4px;
    }

}

</style>
