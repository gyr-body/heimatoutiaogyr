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
        <el-radio-group v-model="formData.status">
            <!-- 5 是默认值，判断是否是5  是5 传null -->
          <el-radio label="5">全部</el-radio>
          <el-radio label="0">草稿</el-radio>
          <el-radio label="1">待审核</el-radio>
          <el-radio label="2">审核通过</el-radio>
          <el-radio label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>频道列表：</span>
      </el-col>
      <el-col :span="18">
        <el-select placeholder="请选择" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id"
             :label="item.name"
             :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择：</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker v-model="formData.dateRange" type="daterange" range-separator= " 至 " start-placeholder="开始日期" end-placeholder="结束日期">

        </el-date-picker>
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
      channels: [] // 定义一个channels 接收频道
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
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.searchTool {
  height: 50px;
  margin-left: 40px;
  margin-top: 30px;
}
</style>
