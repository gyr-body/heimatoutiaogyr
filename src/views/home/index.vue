<template>
  <!-- 外层容器 -->
  <el-container>
    <!-- 侧边栏容器 -->
    <el-aside style="background-color:#353b4e;height:100vh">
      <login-aside></login-aside>
    </el-aside>
    <!-- 上下布局 -->
    <el-container>
      <!-- 顶栏容器 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 主要区域容器 -->
      <el-main>主要区域</el-main>
    </el-container>
  </el-container>
</template>

<script>
import loginAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'login-aside': loginAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>
</style>
