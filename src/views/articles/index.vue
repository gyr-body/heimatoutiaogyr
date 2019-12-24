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
        <el-radio-group>
          <el-radio label>全部</el-radio>
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
        <el-select placeholder="请选择">
          <!-- <el-option></el-option> -->
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择：</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker type="daterange" range-separator= " 至 " start-placeholder="开始日期" end-placeholder="结束日期">

        </el-date-picker>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {}
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
