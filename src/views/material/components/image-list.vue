<template>
    <div class="image-list">
        <div class="top-header-wrap">
            <el-radio-group v-model="collect" size="small"  @change="loadImages(1)">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button type="primary" size="small"  @click="dialogUploadVisible = true">上传素材</el-button>
        </div>

        <div class="image-content">
            <div class="grid-list" data-columns="6">
                <div class="grid-box">
                    <div class="grid-item" v-for="item in  images" :key="item.id">
                        <div class="body">
                            <el-image class="list-image" :src="item.url" fit="cover"></el-image>
                            <div class="image-action">
                                <el-tooltip class="item" effect="dark" :content="item.is_collected ?'收藏': '未收藏'" placement="top">
                                    <el-button
                                        :type="item.is_collected ? 'warning': 'info'"
                                        circle
                                        :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
                                        size="mini"
                                        :loading="item.loading"
                                        @click="onCollect(item)"
                                    ></el-button>
                                </el-tooltip>
                                <el-button
                                    type="danger"
                                    circle
                                    icon="el-icon-delete"
                                    size="mini"
                                    :loading="item.loading"
                                    @click="onDelete(item)"
                                ></el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <el-pagination
             class="pages"
             background
             layout="prev, pager, next"
             :total="totalCount"
             :page-size="pageSize"
             :current-page.sync="page"
             @current-change="onPageChange"
            />
        </div>

        <el-dialog
         title="上传素材"
         :visible.sync="dialogUploadVisible"
         :append-to-body="true"
         width="400px"
         :close-on-click-modal="false"
        >
            <el-upload
             class="upload-demo"
             drag
             :headers="uploadHeaders"
             action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
             name="image"
             multiple
             :show-file-list="false"
             :on-success="onUploadSuccess"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
import { getImages, deleteImage, collectImage } from '@/api/material'
import { getItem } from '@/utils/storage'

export default {
    name: 'ImageList',
    data () {
        const user = getItem('toutiao-user')
        return {
            collect: false, // 默认查询全部素材列表
            images: [], // 图片素材列表
            totalCount: 0,
            pageSize: 12,
            page: 1,
            uploadHeaders: {
                Authorization: `Bearer ${user.token}`
            },
            dialogUploadVisible: false
        }
    },
    created() {
        this.loadImages()
    },
    methods: {
        async loadImages (page=1) {
            const { data } = await getImages({
                collect: this.collect,
                page,
                per_page: this.pageSize
            })
            const res = data.data.results
            res.forEach( img => {
                // img 对象本来没有 loading 数据
                // 我们这里收到的往里面添加该数据是用来控制每个收藏按钮的 loading 状态
                img.loading = false
            })
            this.images =res
            this.totalCount = data.data.total_count
        },

        onCollect (item) {
            item.loading = true
            collectImage(item.id, !item.is_collected).then(res => {
                // 更新视图状态
                item.is_collected = !item.is_collected
                // 关闭 loading
                item.loading = false
            })
        },

        async onDelete (item) {
            item.loading = true
            const confirmRusult = await this.$confirm('确定删除?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmRusult !== 'confirm') {
                return this.$message.info('已取消删除操作')
            }
            try {
                await deleteImage(item.id)
                this.$message.success('删除成功')
                this.loadImages(this.page)
                item.loading = false
            }catch (err) {
                this.$message.error(err)
                item.loading = false
            }

        },

        onUploadSuccess (response, file, fileList) {
            // 关闭对话框
            this.dialogUploadVisible = false

            // 更新素材列表
            this.loadImages(this.page)

            this.$message({
                type: 'success',
                message: '上传成功'
            })
        },

        onPageChange (page) {
           this.loadImages(page)
        }
    }
}
</script>

<style scoped lang="scss">
.image-list {
    .top-header-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .image-content {
        .grid-list[data-columns="6"] > .grid-box {
            display: grid;
            grid-gap: 20px;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        }
        .grid-list {
            .grid-box {
                .grid-item {
                    .body{
                        position: relative;
                        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                        border-radius: 4px;
                        border: 1px solid #ebeef5;
                        background-color: #fff;
                        overflow: hidden;
                        color: #303133;
                        transition: all 0.4s ease-in;
                        .list-image {
                            width: 100%;
                            height: 280px;
                        }
                        .image-action {
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            height: 40px;
                            background-color: rgba(204, 204, 204, .5);
                            position: absolute;
                            bottom: 0px;
                            left: 0px;
                            right: 0px;
                        }
                    }
                    &:hover{
                        cursor: pointer;
                        box-shadow: 0px 7px 13px 0px rgba(0, 0, 0, 0.13);
                    }
                }
            }
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
