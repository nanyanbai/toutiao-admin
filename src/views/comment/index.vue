<template>
    <div class="comment-container">
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑路径导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>评论管理</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- /面包屑路径导航 -->
            </div>

            <el-table :data="articles">
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="评论总数" prop="total_comment_count"></el-table-column>
                <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
                <el-table-column label="评论状态">
                    <template slot-scope="scope">
                       <el-tag
                               :type="scope.row.comment_status ? 'success' : 'info' "
                               effect="dark"
                               size="small"
                       >
                           {{ scope.row.comment_status ? '正常': '关闭' }}
                       </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.comment_status"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                :disabled="scope.row.statusDisabled"
                                @change="onStatusChange(scope.row)"
                        />
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    class="pages"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size.sync="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount"
                    background
            />
        </el-card>
    </div>
</template>

<script>
import { getArticleList, updateCommentStatus } from '@/api/article'

export default {
    name: 'CommentIndex',
    data () {
        return {
            articles: [], // 文章数据列表
            page: 1,
            pageSize: 10,
            totalCount: 0
        }
    },
    created() {
        this.loadArticles()
    },
    methods: {
        loadArticles (page=1) {
            getArticleList({
                response_type: 'comment',
                page,
                per_page: this.pageSize
            }).then(res => {
                const { results } = res.data.data
                results.forEach(article => {
                    article.statusDisabled = false
                })
                this.articles = results
                this.totalCount = res.data.data.total_count
            })
        },

        onStatusChange (article) {
            // 禁用开关
            article.statusDisabled = true
            // 请求提交修改
            updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
                // 启用开关
                article.statusDisabled = false
                this.$message({
                    type: 'success',
                    message: article.comment_status ? '开启文章评论状态' : '关闭文章评论状态'
                })
            })
        },

        handleSizeChange () {
            this.loadArticles(1)
        },
        handleCurrentChange (page) {
            // 页码改变，加载指定页码数据
            this.loadArticles(page)
        }
    }
}
</script>

<style scoped lang="scss">
.pages{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
</style>
