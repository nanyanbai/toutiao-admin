<template>
    <div class="my-image">
        <div class="img_btn" @click="openDialog">
            <!-- ../assets/default.png 默认图地址 -->
            <img :src="value||defaultImage" alt/>
        </div>

        <!-- 对话框 -->
        <el-dialog
                title="选择图片"
                :visible.sync="dialogVisible"
                :append-to-body="true"
                :close-on-click-modal="false"
        >
            <el-tabs v-model="activeName" :tab-position="tabPosition">
                <el-tab-pane label="素材库" name="image">
                    <!-- 全部与收藏 -->
                    <el-radio-group @change="loadGetImages(1)" v-model="collect" size="small">
                        <el-radio-button :label="false">全部</el-radio-button>
                        <el-radio-button :label="true">收藏</el-radio-button>
                    </el-radio-group>

                    <div class="grid-list" data-columns="4">
                        <div class="grid-box">
                            <div
                                    class="grid-item"
                                    :class="{ selected:selectedImageUrl === item.url }"
                                    v-for="item in images"
                                    :key="item.id"
                            >
                                <img @click="selectedImage(item.url)" :src="item.url" alt/>
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
                </el-tab-pane>
                <el-tab-pane label="上传图片" name="upload">
                    <el-upload
                            class="avatar-uploader"
                            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                            :headers="headers"
                            :show-file-list="false"
                            :on-success="uploadSuccess"
                            name="image"
                    >
                        <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar"/>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-tab-pane>
            </el-tabs>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmImage">确 定</el-button>
                <el-button @click="dialogVisible = false ">取 消</el-button>
            </span>
        </el-dialog>

        <!-- /对话框 -->
    </div>
</template>

<script>
    import {getImages} from '@/api/material'
    import {getItem} from '@/utils/storage'

    export default {
        name: 'my-image',
        props: ['value'],
        data() {
            const user = getItem('toutiao-user')
            return {
                defaultImage: require('./../../assets/imgs/default.png'),
                dialogVisible: false, // 控制对话框显示隐藏,
                activeName: 'image',
                tabPosition: 'left',
                collect: false,
                page: 1,
                pageSize: 8,
                images: [],
                totalCount: 0,
                // 选中的图片地址
                selectedImageUrl: null,
                uploadImageUrl: null, // 上传的图片地址
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        },

        methods: {
            openDialog() {
                this.dialogVisible = true
                this.loadGetImages(1)
                this.selectedImageUrl = null
                // - 清空上次的图片
                this.uploadImageUrl = null
                // - 默认选中tab是  素材库
                this.activeName = 'image'
            },

            async loadGetImages(page = 1) {
                const {data: {data}} = await getImages({
                    collect: this.collect,
                    page,
                    per_page: this.pageSize
                })
                this.images = data.results
                this.totalCount = data.total_count
            },


            selectedImage(url) {
                this.selectedImageUrl = url
            },

            confirmImage() {
                if (this.activeName === 'image') {
                    if (!this.selectedImageUrl) {
                        return this.$message.warning('请选择一张素材图片')
                        this.$emit('input', this.selectedImageUrl)
                    }
                } else {
                    if (!this.uploadImageUrl) return this.$message.warning('请上传一张素材图片')
                    // 把图片提交给父组件
                    this.$emit('input', this.uploadImageUrl)
                }
                this.dialogVisible = false
            },
            uploadSuccess(res) {
                this.uploadImageUrl = res.data.url
            },
            onPageChange(page) {
                this.loadGetImages(page)
            }
        }
    }
</script>

<style scoped lang="scss">
    .my-image {
        display: inline-block;
        margin-right: 20px;

        .img_btn {
            width: 150px;
            height: 150px;
            border: 1px dashed #ddd;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }

    .grid-list[data-columns="4"] > .grid-box {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .grid-list {
        .grid-box {
            padding: 20px 0;

            .grid-item {
                position: relative;
                border: 1px dashed #e5e5e5;
                width: 100%;
                height: 130px;
                box-sizing: border-box;

                img {
                    width: 100%;
                    height: 100%;
                }

                &.selected {
                    &::after {
                        content: "";
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        background: rgba(0, 0, 0, .5) url("./../../assets/imgs/selected.png") no-repeat center / 50px;
                    }
                }
            }
        }
    }

    .pages {
        display: flex;
        justify-content: center;
        margin-left: -100px;
    }


</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
