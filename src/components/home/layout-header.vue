<template>
  <el-row type="flex" class="layout-header" align="middle" judtify="space-between">
    <el-col class="left">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col class="right">
      <el-row type="flex" align="middle" justify="end">
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt />
        <el-dropdown>
          <span class="el-dropdown-link">
            主页
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>Git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/avatar.jpg') // 先把地址转换成变量
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
      font-size: 20px;
    .title {
      color: #2c3e50;
      margin-left: 10px;
    }
  }
  .right {
    img {
        height: 40px;
        width: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
