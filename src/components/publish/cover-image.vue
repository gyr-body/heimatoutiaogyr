<template>
<div class='cover-image'>
      <!-- 根据封面的images长度 进行渲染 一个或者3个或者不渲染 -->
      <div @click="openDislog" v-for="(item,index) in list" :key="index" class='cover-item'>
         <img :src="item ? item : defaultImg" alt="">
      </div>
      <!-- visible 控制显示隐藏  -->
      <el-dialog :visible="dialogVisible" @close="closeDislog">
        <!-- 选择素材组件 -->
        <select-image></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性
  data () {
    return {
      dialogVisible: false, // 控制弹层打开或关闭
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    openDislog () {
      this.dialogVisible = true
    },
    closeDislog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
  .cover-image {
    display: flex;
    margin:20px 0;
    // margin-left: 20px;
     .cover-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 10px;
       img {
         height: 100%;
         width:100%;
       }
     }
  }
</style>
