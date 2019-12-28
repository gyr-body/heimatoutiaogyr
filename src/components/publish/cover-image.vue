<template>
  <div class="cover-image">
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
          <!-- <img src="../../assets/img/jie.jpg" alt=""> -->
          <img :src="item?item:defaultImg" alt="">
          <!-- defaultImg为默认图片 -->
      </div>
      <el-dialog :visible="dialogVisible" @close ="closeDialog">
        <!-- 选择素材组件 -->
        <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>

  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性
  data () {
    return {
      dialogVisible: false,
      defaultImg: require('../../assets/img/admire.png'),
      selectIndex: -1
    }
  },
  methods: {
    receiveImg (img) {
      this.$emit('clickOneImg', img, this.selectIndex)
      this.closeDialog()
    },
    openDialog (index) {
      this.selectIndex = index // 记住点击的下标
      this.dialogVisible = true // 打开弹层
    },
    closeDialog () {
      this.dialogVisible = false
    }

  }

}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    margin:20px 0;
    margin-left: 100px;
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
