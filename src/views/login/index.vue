<template>
  <div class="login">
    <div class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt srcset />
      </div>
      <el-form ref="">
          <el-form-item>
              <el-input placeholder="请您输入手机号"></el-input>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      model: ' ',
      code: ' ',
      check: ' '
    }
  }
}
</script>

<style lang="less">
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover; // 自适应背景图片
  height: 100vh; //当前可视区域的百分之百的高度
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 450px;
    height: 300px;
    background-color: white;
    .title {
        margin-top: 10px;
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
