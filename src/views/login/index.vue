<template>
  <div class="login">
    <!-- 放置一个卡片组件 -->
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt srcset />
      </div>
      <!-- 表单域 -->
      <el-form ref="myForm" style="margin-top:20px" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input placeholder="请您输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:200px" placeholder="请您输入验证码" v-model="loginForm.code"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="submitLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      // 定义表单数据对象
      loginForm: {
        mobile: ' ',
        code: ' ',
        check: false // 是否勾选
      },
      loginRules: {
        // 验证规则
        // required=>true
        mobile: [
          {
            required: true,
            message: '请输入您的手机号'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入您的验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码不正确'
          }
        ],
        check: [
          {
            validator: function (rule, value, callback) {
              if (value) {
                callback()
              } else {
                callback(new Error('必须要统一协议'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    submitLogin () {
      // 校验整个表单的规则
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          })
            .then(result => {
              window.localStorage.setItem('user-token', result.data.token) // 缓存令牌
              this.$router.push('/home') // 跳转到主页
            })
            .catch(() => {
              // elementUI的方法
              this.$message({
                message: '您的手机号或者验证码不正确',
                type: 'warning'
              })
            })
        }
      })
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
