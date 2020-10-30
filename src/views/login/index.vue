<template>
    <div class="login-container">
        <div class="login-form-wrap">
            <div class="login-head">
                <div class="logo"></div>
            </div>
            <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
                <el-form-item prop="mobile">
                    <el-input v-model="user.mobile">
                        <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="user.code">
                        <i slot="prefix" class="iconfont icon-password"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="agree">
                    <el-checkbox v-model="user.agree">我已阅读并同意用户协议隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button
                     class="login-btn"
                     type="primary"
                     :loading="loginLoading"
                     @click="onLogin"
                    >登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/user'

export default {
    name: "loginIndex",
    data() {
        return {
            user: {
                mobile: '13911111111',
                code: '246810',
                agree: false // 是否同意协议
            },
            loginLoading: false, // 登录的 loading 状态
            // 表单验证规则配置
            formRules: {
                mobile: [
                    // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                    { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
                ],
                agree: [
                    {
                        validator: (rule, value, callback) => {
                            if (value) {
                                // 验证通过
                                callback()
                            } else {
                                // 验证失败
                                callback(new Error('请同意用户协议'))
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        onLogin() {
            // validate 方法是异步的
            this.$refs['login-form'].validate(valid => {
                // 如果表单验证失败，停止请求提交
                if (!valid) return
                this.login()
            })
        },
        async login () {
            this.loginLoading = true
            try {
                const res = await login(this.user)
                this.$message({
                    message: '登录成功',
                    type: 'success'
                })
                this.$store.commit('setUser', res.data.data)
                this.loginLoading = false

                // todo 跳转到首页 home 页面
                this.$router.push({
                    name: 'home'
                })

            } catch (err) {
                this.$message.error('登录失败，手机号或验证码错误')
                // 关闭 loading
                this.loginLoading = false
            }
        }
    }
}
</script>

<style scoped lang="scss">
.login-container{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form-wrap{
        min-width: 300px;
        padding: 30px 50px 10px;
        background-color: #fff;
        .login-head {
            display: flex;
            justify-content: center;
            .logo {
                width: 200px;
                height: 57px;
                background: url('./logo.png') no-repeat;
                background-size: contain;
            }
        }
        .login-form{
            .login-btn{
                width: 100%;
            }
        }
    }
}
</style>
