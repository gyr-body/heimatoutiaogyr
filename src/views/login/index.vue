<template>
  <div class="login">
    <!-- 放置一个卡片组件 -->
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt srcset />
      </div>
      <el-form ref="From" style="margin-top:20px">
          <el-form-item prop="mobile">
              <el-input placeholder="请您输入手机号" v-model="Form.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="code">
              <el-input style="width:200px" placeholder="请您输入验证码" v-model="Form.code"></el-input>
              <el-button style="float:right" plain>发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-from-item>
            <el-button style="width:100%" type="primary">登录</el-button>
          </el-from-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Form: {
        mobile: ' ',
        code: ' ',
        check: ' '
      }

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
    width: 400px;
    height: 350px;
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
