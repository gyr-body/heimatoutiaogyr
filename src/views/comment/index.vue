<template>
  <!-- 卡片组件 -->
  <el-card>
    <!-- 面包屑组件 -->
    <bread-crumb class="crumb">
      <!-- 具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="openOrClose(obj.row)"
          >{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      page: {
        // 放置分页数据
        total: 700, // 数据总数
        pageSize: 10, // 默认每页10条数据
        currentPage: 1 // 当前页码  默认第一页
      }
    }
  },
  methods: {
    getComment () {
      // this.loading = true // 加载状态
      // 请求列表数据
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        // alert(1)
        this.list = result.data.results// 获取评论列表数据给本身data
        this.page.total = result.data.total_count// 获取文章总条数
        // setTimeout(() => { this.loading = false }, 300) // 关闭加载
      })
    },
    formatterBool (row, column, cellValue, index) {
      // row  当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index  当前下标
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      // $confirm 确定时  进入then 取消时进入catch
      this.$confirm(`您是否确定要${mess}评论吗`).then(() => {
        // 用户确定要调用接口
        // 地址参数/query参数/url参数/路由参数 => 可以在params中写 也可以直接拼接到url地址上
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          // 打开或者关闭评论成功之后
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment() // 重新请求列表
        })
      })
    },
    // 分页
    // 修改当前页码
    changePage (newPage) {
      //  修改当前页码
      this.page.currentPage = newPage
      this.getComment()
    }
  },
  created () {
    // 调用方法
    this.getComment()
  }
}
</script>

<style lang="less" scoped>
.crumb{
  margin-bottom: 20px
}
</style>
