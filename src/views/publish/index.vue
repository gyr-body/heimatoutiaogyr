<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:80px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:60%" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input v-model="formData.content" type="textarea" :rows="18"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="封面">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channel" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publishArticle()" type="primary">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        title: '',
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型  自动：-1; 无图：0; 1张图：1 ; 3张图：3
          images: [] // 图片地址
        },
        channel_id: null // 频道id
      },
      channel: [], // 定义一个channels 接收频道
      // 表单校验 规则
      publishRules: {
        title: [
          {
            required: true,
            message: '标题内容不能为空'
          },
          {
            min: 3,
            max: 30,
            message: '标题长度必须载3到30 字符之间'
          }
        ],
        content: [
          {
            required: true,
            message: '文章内容不能为空'
          }
        ],
        channel_id: [
          {
            required: true,
            message: '频道不能为空'
          }
        ]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        // 有参数  =>修改
      } else {
        // 没有参数 =>  发布
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          }
        }
      }
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channel = result.data.channels // 获取频道数据
      })
    },
    // 发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          // 可以去进行 发布接口调用
          console.log('校验成功')
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft }, // query参数
            data: this.formData
          }).then(() => {
            // 新增成功 => 应该去内容列表
            this.$router.push('/home/articles') // 回到内容列表
          })
        }
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
  }
}
</script>

<style lang="less" scoped>
.searchTool {
  margin: 30px 0;
  margin-left: 100px;
}
</style>
