<template>
  <el-form :model="userInfoForm" :rules="userInfoRules"  label-width="80px"  ref="userInfoRef"  size="small">
    <el-form-item label="编号">
      <el-input v-model="userInfoForm.id" disabled></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="userInfoForm.mobile" disabled></el-input>
    </el-form-item>
    <el-form-item label="媒体名称"  prop="name">
      <el-input v-model="userInfoForm.name"></el-input>
    </el-form-item>
    <el-form-item label="媒体介绍" prop="intro">
      <el-input type="textarea" v-model="userInfoForm.intro"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userInfoForm.email"></el-input>
    </el-form-item>
    <el-form-item class="footer-wrap">
      <el-button type="primary"  @click="onSaveUserInfo">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
    data () {
      return {
        userInfoForm: this.userProfileInfo,
        userInfoRules : {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
        onSaveUserInfo () {
            this.$refs['userInfoRef'].validate(valid => {
                if ( !valid ) return
            })
        }
    }

  }
</script>

<style  scoped lang="scss">
.footer-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
