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
                <el-form-item prop="xieyi">
                    <el-checkbox v-model="user.xieyi">我已阅读并同意用户协议隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button
                     class="login-btn"
                     type="primary"
                     :loading="loginLoading"
                     :disabled="loginLoading"
                     @click="onLogin"
                    >登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  // 引入极验的gt.js文件
  // 该gt.js内部没有export default导出语句
  // 该文件内部有通过window声明全局变量，可以给当前应用做使用
  import '../../assets/js/gt.js'
  import { login, getCaptchas } from '@/api/user'

export default {
    name: "loginIndex",
    data() {
        // 自定义效验协议
        let xieyiTest = (rule, value, callback) => {
          value ? callback() : callback(new Error('无条件遵守我们的规则'))
        }
        return {
            user: {
                mobile: '13911111111',
                code: '246810',
                xieyi: true // 是否同意协议
            },
            loginLoading: false, // 登录按钮等待、禁用状态
            ctaObj: null, // 极验窗口对象
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
                xieyi: [
                  { validator: xieyiTest}
                ]
            }
        }
    },
    methods: {
      onLogin() {
          // validate 方法是异步的
          this.$refs['login-form'].validate(valid => {
              // 如果表单验证失败，停止请求提交
              if (valid) {
                if (this.ctaObj !== null) {
                  return this.ctaObj.verify() // 显示窗口
                }
                // 登录按钮禁用、等待
                this.loginLoading = true
                getCaptchas(this.user.mobile).then(res => {
                  let { data } = res.data // 对象解构赋值
                  // axios请求成功
                  // 生成极验验证"窗口"
                  // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
                  window.initGeetest({
                    // 以下配置参数来自服务端 SDK
                    gt: data.gt,
                    challenge: data.challenge,
                    offline: !data.success,
                    new_captcha: true,
                    product: 'bind' // 隐藏按钮，通过登录按钮激活
                  },captchaObj => {
                    // 这里可以调用验证实例 captchaObj 的实例方法
                    captchaObj.onReady(() => {
                      // 验证码ready之后才能调用verify方法显示验证码
                      // 生成窗口
                      captchaObj.verify()
                      // 把窗口对象赋予给ctaObj对象
                      this.ctaObj = captchaObj
                      // 登录按钮状态恢复
                      this.loginLoading = false
                    }).onSuccess(() => {
                      // 人的行为正确，登录后台系统
                      // B. axios发送请求进行账号“真实性校验”，登录后台
                      this.loginAct()
                    }).onError(() =>{

                    })
                  })
                }).catch(err => {
                  return this.$message.error('获得人机秘钥信息有错误：' + err)
                })
              }

          })
      },
      // 账号真实校验，登录后台页面
      async loginAct() {
        try {
          const { data:res } = await login(this.user)
          debugger
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$store.commit('setUser', res.data)
          this.$router.push('/')
        } catch (err) {
          this.$message.error('登录失败，手机号或验证码错误')
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
        border-radius: 4px;
        .login-head {
            display: flex;
            justify-content: center;
            height: 55px;
            margin-bottom: 20px;
            .logo {
                width: 200px;
                height: 100%;
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
