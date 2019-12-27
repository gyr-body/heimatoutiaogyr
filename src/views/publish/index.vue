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
        <!-- <el-input v-model="formData.content" type="textarea" :rows="18"></el-input> -->
        <quill-editor v-model="formData.content" style="height:400px" type="textarea" :rows="18"></quill-editor>
      </el-form-item>
      <el-form-item prop="type" label="封面" style="margin-top:120px">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        {{formData.cover}}
        <!-- <cover-image :list="formData.cover.images"></cover-image> -->
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
  // 'formData.cover.type': function () {
  //   //  this指向组件实例
  //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
  //     // 无图或者自动模式
  //     this.formData.cover.images = []
  //   } else if (this.formData.cover.type === 1) {
  //     this.formData.cover.images = [''] // 单图模式
  //   } else if (this.formData.cover.type === 3) {
  //     this.formData.cover.images = ['', '', ''] // 单图模式
  //   }
  // },
  watch: {
    // 解决两个路由公用一个组件跳转的时候，组件没有销毁
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        // 有参数  =>修改
        this.getArticleById(to.params.srticleId) // 重新拉取数据
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
    },
    // 监控嵌套对象中的值
    'formData.cover.type': function () {
      // this指向组件实例
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图模式
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 三图模式
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
    // publishArticle (draft) {
    //   this.$refs.publishForm.validate(isOK => {
    //     if (isOK) {
    //       // 可以去进行 发布接口调用
    //       // console.log('校验成功')
    //       // this.$axios({
    //       //   url: '/articles',
    //       //   method: 'post',
    //       //   params: { draft }, // query参数
    //       //   data: this.formData
    //       // }).then(() => {
    //       //   // 新增成功 => 应该去内容列表
    //       //   this.$router.push('/home/articles') // 回到内容列表
    //       // })
    //       let { articleId } = this.$route.params
    //       this.$axios({
    //         method: articleId ? 'put' : 'post',
    //         url: articleId ? `/articles/${articleId}` : `/articles`,
    //         params: { draft },
    //         data: this.formData
    //       }).then(result => {
    //         this.$router.push('/home/articles')
    //       })
    //     }
    //   })
    // },
    // 发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : `/articles`,
            params: { draft }, // query参数
            data: this.formData
          }).then(result => {
            this.$router.push('/home/articles') // 回到内容列表
          })
        }
      })
    },
    // 通过文章id 获取文章详情
    // 获取文章详情通过id
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data数据
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
    // 获取id 判断有无id  有id 就是修改 没id就是发布
    let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
    articleId && this.getArticleById(articleId) // 获取文章数据
  }
}
</script>

<style lang="less" scoped>
.searchTool {
  margin: 30px 0;
  margin-left: 100px;
}
</style>
