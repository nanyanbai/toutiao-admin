<template>
    <el-container class="layout-container">
        <el-aside class="aside" width="auto">
            <app-aside class="aside-menu" />
        </el-aside>

        <el-container>
            <el-header class="header">
                <div class="left-panel">
                    <i class="el-icon-s-fold"></i>
                </div>
                <div class="right-panel">
                    <el-dropdown>
                        <div class="avatar-wrap">
                            <img class="avatar" :src="user.photo" alt=""/>
                            <span>{{ user.name }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>

            <el-main  class="main-wrap">
                <!--子路由出口 -->
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { mapState } from 'vuex'
import  AppAside from './components/aside'
import { removeItem } from '@/utils/storage'
export default {
    name: 'LayoutIndex',
    components: {
        AppAside
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        onLogout () {
            this.$confirm('确认退出吗？', '退出提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 把用户的登录状态清除
                // window.localStorage.removeItem('user')
                removeItem('toutiao-user')
                // 跳转到登录页面
                this.$router.push('/login')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                })
            })
        }
    }
}
</script>

<style scoped lang="scss">
.layout-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .avatar-wrap {
        display: flex;
        align-items: center;
        cursor: pointer;
        .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
}
.aside {
    background-color: #d3dce6;
    .aside-menu {
        height: 100%;
    }
}
.main-wrap {
    background-color: #e9eef3;
}
</style>
