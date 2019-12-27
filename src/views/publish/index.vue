<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form style="margin-left:80px" label-width="100px">
      <el-form-item label="标题">
        <el-input style="width:60%" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :rows="18"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group>
          <el-radio>单图</el-radio>
          <el-radio>三图</el-radio>
          <el-radio>无图</el-radio>
          <el-radio>自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channel" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        channel_id: null
      },
      channel: [] // 定义一个channels 接收频道
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channel = result.data.channels // 获取频道数据
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
  }
}
</script>

<style lang="less" scoped>
.searchTool {
  margin: 30px 0;
  margin-left: 100px;
}
</style>
