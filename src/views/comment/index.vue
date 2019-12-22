<template>
<!-- 卡片组件 -->
  <el-card>
      <!-- 面包屑组件 -->
      <bread-crumb>
      <!-- 具名插槽 -->
        <template slot="title">评论列表</template>
      </bread-crumb>
      <el-table>
          <el-table-column label="标题"></el-table-column>
          <el-table-column label="评论状态"></el-table-column>
          <el-table-column label="总评论数"></el-table-column>
          <el-table-column label="粉丝评论数"></el-table-column>
          <el-table-column label="操作"></el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
