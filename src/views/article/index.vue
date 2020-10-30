<template>
    <div class="article-container">
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑路径导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- /面包屑路径导航 -->
            </div>

            <!-- 数据筛选表单 -->
            <el-form :inline="true" label-suffix=":">
                <el-form-item label="状态">
                    <el-radio-group v-model="status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                        <el-radio :label="4">已删除</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="channelId" placeholder="请选择频道" size="mini">
                        <el-option label="全部" :value="null"></el-option>
                        <el-option
                         v-for="item in channels"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                     size="mini"
                     v-model="rangeDate"
                     type="datetimerange"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期"
                     :default-time="['12:00:00']"
                     format="yyyy-MM-dd"
                     value-format="yyyy-MM-dd"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="mini" :disabled="loading" @click="loadArticles(1)">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- /数据筛选表单 -->
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                根据筛选条件共查询到 {{total}} 条结果：
            </div>
            <el-table
             :data="articles"
             size="small"
             v-loading="loading"
            >
                <el-table-column label="序号" type="index" width="50"></el-table-column>
                <el-table-column label="封面">
                    <template slot-scope="scope">
                        <el-image class="lazy-img" :src="scope.row.cover.images[0]" fit="cover" lazy>
                            <div slot="placeholder" class="image-slot">
                                加载中<span class="dot">...</span>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-tag :type="articleStatus[scope.row.status].type">
                            {{ articleStatus[scope.row.status].text }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="发布时间" prop="pubdate"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" icon="el-icon-edit" circle></el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" circle @click="onDeleteArticleById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--
            total 用来设定总数据的条数
            它默认按照 10 条每页计算总页码
            page-size 每页显示条目个数，支持 .sync 修饰符，默认每页 10 条
            90 3 90 / 3 = 30
           -->
            <el-pagination
             class="pagination"
             background
             layout="prev, pager, next"
             :page-size="pageSize"
             :current-page.sync="page"
             :total="total"
             :disabled="loading"
             @current-change="onCurrentChange"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { getArticleList, deleteArticle, getArticleChannels } from '@/api/article'

export default {
    name: 'ArticleIndex',
    data () {
        return {
            page: 1, // 当前页码
            pageSize: 10, // 每页大小
            total: 0, // 分页总数据
            articles: [], // 文章数据列表
            loading: false, // 表单数据加载的loading
            articleStatus: [
                { status: 0, text: '草稿', type: 'info' }, // 0
                { status: 1, text: '待审核', type: '' }, // 1
                { status: 2, text: '审核通过', type: 'success' }, // 2
                { status: 3, text: '审核失败', type: 'warning' }, // 3
                { status: 4, text: '已删除', type: 'danger' } // 4
            ],
            status: null, // 查询文章的状态，不传就是全部
            channelId: null, // 查询文章的频道
            channels: [], // 文章频道列表
            rangeDate: null // 筛选的范围日期
        }
    },
    created() {
        this.loadArticles()
        this.loadChannels()
    },
    methods: {
        async loadArticles (page = 1) {
            this.loading = true
            try {
                const { data } = await getArticleList({
                    page,
                    per_page: this.pageSize,
                    status: this.status,
                    channel_id: this.channelId,
                    begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
                    end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止日期
                })
                this.articles = data.data.results
                this.total = data.data.total_count
                this.loading = false
            } catch (err) {
                this.loading = false
                this.$message.error('加载失败')
            }
        },

        async loadChannels () {
            const { data } = await getArticleChannels()
            this.channels = data.data.channels
        },

        /**
         * 根据文章id删除文章数据
         * @param articleId
         */
        async onDeleteArticleById (articleId) {
            const confirmResult = await this.$confirm(
                '确认删除吗？',
                '删除提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            ).catch(err => {
                return err
            })
            if (confirmResult !=='confirm') {
                return this.$message.info('已取消删除')
            }
            await  deleteArticle (articleId.toString())
            this.$message.success('删除成功！')
            this.loadArticles(this.page)
        },

        onCurrentChange (page) {
            this.loadArticles(page)
        }
    }
}
</script>

<style scoped lang="scss">
.filter-card {
    margin-bottom: 30px;
}
.lazy-img {
    width: 50px;
    height: 50px;
}
.pagination {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
</style>
