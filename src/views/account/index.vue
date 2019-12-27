<template>
   <el-card>
      <bread-crumb slot='header'>
         <template slot='title'>账户信息</template>
      </bread-crumb>
      <!-- 上传文件组件 -->
      <el-upload  class="head-upload" action="" :show-file-list="false">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
      <!-- 表单组件 -->
      <el-form style="magin-left:100px" label-width="100px">
          <el-form-item v-model="formData.name" label="用户名">
              <el-input style="width:30%"></el-input>
          </el-form-item>
          <el-form-item v-model="formData.intro" label="简介">
              <el-input style="width:30%"></el-input>
          </el-form-item>
          <el-form-item v-model="formData.email" label="邮箱">
              <el-input style="width:30%"></el-input>
          </el-form-item>
          <el-form-item v-model="formData.mobile" label="手机号">
              <el-input style="width:30%"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary"> 保存信息</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 头像
        mobile: '' // 手机号
      },
      defaultImg: require('../../assets/img/admire.png')
    }
  },
  methods: {
    //   获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.head-upload{
    position: absolute;
    right: 300px;
    img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}
</style>
