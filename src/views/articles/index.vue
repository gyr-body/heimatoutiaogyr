<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态：</span>
      </el-col>
      <el-col :span="18">
        <!-- 单选框 -->
        <el-radio-group v-model="formData.status" @change="changeCondition">
          <!-- 5 是默认值，判断是否是5  是5 传null -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>频道列表：</span>
      </el-col>
      <el-col :span="18">
        <el-select placeholder="请选择" v-model="formData.channel_id" @change="changeCondition">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id" ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择：</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
           @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator=" 至 "
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <!-- {{formData.dateRange}} -->
      </el-col>
    </el-row>
    <el-row class="total">
      <span>共找到1999条符合条件的内容</span>
    </el-row>
    <!-- 循环的模板 -->
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <!-- 左侧 -->
      <el-col :span="14">
        <el-row type="flex">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
          <div class="info">
            <span>{{item.title}}</span>
            <!-- //过滤器不仅可以用在插值表达式中，也可以用在v-bind中 -->
            <el-tag :type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
            <span class="date">{{ item.pubdate }}</span>
          </div>
        </el-row>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="6">
        <el-row class="right" type="flex" justify="end">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span>
            <i class="el-icon-delete"></i> 删除
          </span>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 状态
        channel_id: null, // 默认是空
        dateRange: []
      },
      channels: [], // 定义一个channels 接收频道
      list: [],
      defaultImg: require('../../assets/img/default.gif')
    }
  },
  methods: {
    // 获取数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles', // 请求地址
        params
      }).then(result => {
        this.list = result.data.results // 接收文章列表数据
      })
    },
    // 改变条件
    changeCondition () {
      // 组装条件
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status, // 不传为 null
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null, // 起始时间
        end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null // 结束时间
      }
      this.getArticles(params)
    }
  },
  filters: {
    // value 是过滤器前面表达式计算得到的值
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    // value 是过滤器前面表达式计算得到的值
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
    filterType (value) {
      switch (value) {
        case 0:
          return 'success'
        case 1:
          return 'info'
        case 2:
          return 'danger'
        case 3:
          return 'warning'
        default:
          break
      }
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.searchTool {
  height: 50px;
  margin-left: 40px;
  margin-top: 30px;
}
.total {
  margin: 60px 0;
  height: 30px;
  border-bottom: 1px dashed #ccc;
}
.article-item {
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #f2f3f5;
  img {
    width: 180px;
    height: 100px;
    margin-right: 10px;
    border-radius: 4px;
  }
  .info {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tag {
      max-width: 80px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }
  .right {
    span {
      margin-left: 8px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
