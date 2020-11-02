<template>
  <div class="public-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
          <!-- 面包屑路径导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- /面包屑路径导航 -->
      </div>

      <el-form :model="article" label-width="80px"  :rules="articleFormRules" size="small">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
<!--          <el-input type="textarea" v-model="article.content" placeholder="请输入文章标题"></el-input>-->
          <el-tiptap v-model="article.content" :extensions="extensions" lang="zh"  height="400px" placeholder="请输入文章内容" />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template>
            fdfdsfdsaf
          </template>

        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择文章频道">
            <el-option
             v-for="item in channels"
             :key="item.id"
             :label="item.name"
             :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">
            {{$route.query.id ? '修改发布' : '新增发布'}}
          </el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  data () {
    return {
       article: {
        title: '',　// 文章标题
        content: '',　// 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0 无图， 1 1张，3 3张
          images: [] // 封面图片地址
        },
        channel_id: null
      },
      channels: [], // 文章频道列表
      // 编辑器的 extensions
      // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            fd.append('image', file)
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then(res => {
              // 这个 return 是返回最后的结果
              return res.data.data.url
            })
          } // 图片的上传方法，返回一个 Promise<url>
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ],
      articleFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
    }
  },
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  methods:　{
    async loadChannels () {
        const { data } = await getArticleChannels()
        this.channels = data.data.channels
    },

    async onPublish (draft = false) {
      const articleId = this.$route.query.id
      if (articleId) {
        // 执行操作修改
        await updateArticle (articleId, this.article, draft)
        this.$message.success('修改成功！')
        this.$router.push('/article')
      } else {
        try {
          await addArticle(this.article, draft)
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.$router.push('/article')
        }catch(err) {
          this.$message({
            message: '发布失败',
            type: 'error'
          })
        }
      }
    },

    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.public-container {
  height: 100%;
}
</style>
