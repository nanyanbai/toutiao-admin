<template>
    <div class="userinfo-container">
        <div class="user-avatar-wrap">
            <el-avatar
                    shape="square"
                    :size="200"
                    fit="cover"
                    :src="userInfoForm.photo"
            ></el-avatar>
            <p>点击修改头像</p>
        </div>
        <div class="user-info-wrap">
            <el-form :model="userInfoForm" :rules="userInfoRules" label-width="80px" ref="userInfoRef" size="small">
                <el-form-item label="编号">
                    <el-input v-model="userInfoForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="userInfoForm.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item label="媒体名称" prop="name">
                    <el-input v-model="userInfoForm.name"></el-input>
                </el-form-item>
                <el-form-item label="媒体介绍" prop="intro">
                    <el-input type="textarea" v-model="userInfoForm.intro"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userInfoForm.email"></el-input>
                </el-form-item>
                <el-form-item class="footer-wrap">
                    <el-button
                            type="primary"
                            :loading="updateProfileLoading"
                            @click="onSaveUserInfo"
                    >保存设置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
    name: 'UserInfo',
    props: {
        userProfileInfo: {
            type: Object,
            default: () => {
                return
            }
        }
    },
    data() {
        return {
            userInfoForm: this.userProfileInfo,
            updateProfileLoading: false, // 更新基本信息的 loading 状态
            userInfoRules: {
                name: [
                    {required: true, message: '请输入媒体名称', trigger: 'blur'}
                ],
                intro: [
                    {required: true, message: '请输入媒体介绍', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        onSaveUserInfo() {
            this.$refs['userInfoRef'].validate(valid => {
                if (!valid) return
                this.updateProfileLoading = true
                const { name, intro, email} = this.userProfileInfo
                updateUserProfile({
                    name: name,
                    intro: intro,
                    email: email
                }).then(res => {
                    this.$message.success('修改成功')
                    this.$emit('closeUserProfileDialog')
                    // this.$store.commit('setUser', res.data.data)
                })
            })
        }
    }

}
</script>

<style scoped lang="scss">
    .userinfo-container {
        display: flex;
        justify-content: space-between;

        .user-info-wrap {
            flex: 1;
        }

        .user-avatar-wrap {
            width: 200px;
            height: 200px;
            margin-right: 80px;
            text-align: center;

            .el-avatar {
                cursor: pointer;

                /deep/ img {
                    width: 100%;
                }
            }
        }
    }

    .footer-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
</style>
