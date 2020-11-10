<template>
    <div class="fans-container">
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑路径导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- /面包屑路径导航 -->
            </div>

            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="粉丝列表" name="fansList">
                    <div class="fans-item" v-for="item in  fansList" :key="item.id.toString()">
                        <el-avatar :size="80" :src="item.photo"></el-avatar>
                        <!-- 用户名 -->
                        <p>{{item.name}}</p>
                        <!-- 关注按钮 -->
                        <el-button type="primary" plain size="mini">+关注</el-button>
                    </div>
                    <el-pagination
                        class="pages"
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="pageSize"
                        :current-page.sync="page"
                        @current-change="onPageChange"
                    />
                </el-tab-pane>
                <el-tab-pane label="粉丝画像" name="fansPortrait">粉丝画像</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
import { getFollowers } from '@/api/fans'
export default {
  name: 'FansIndex',
  data () {
    return {
      activeName: 'fansList',
      fansList: [],
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.loadFollowersData()
  },
  methods: {
    async loadFollowersData (page=1) {
      const { data: { data } } = await getFollowers({
        page,
        per_page: this.pageSize
      })
      this.fansList = data.results
      this.total= data.total_count
    },

    handleClick (e) {
      console.log(e)
    },
    onPageChange () {

    }
  }
}
</script>

<style lang="scss" scoped>
.fans-container{
    height: 100%;
    .fans-item {
        width: 120px;
        height: 170px;
        border: 1px dashed #ddd;
        text-align: center;
        padding: 10px 0;
        display: inline-block;
        margin-right: 50px;
        margin-bottom: 15px;
        p {
            font-size: 12px;
            padding: 5px 0;
        }
    }
    .pages {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
}
</style>
