<template>
    <el-menu
     class="nav-menu el-menu-vertical-demo"
     :default-active="$route.path"
     background-color="#002033"
     text-color="#fff"
     active-text-color="#ffd04b"
     router
    >
        <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
        </el-menu-item>
       <el-menu-item index="/material">
           <i class="el-icon-picture"></i>
           <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
            <i class="el-icon-position"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
            <i class="iconfont icon-fans"></i>
            <span slot="title">粉丝管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: "AppAside"
};
</script>

<style scoped lang="scss">
.nav-menu {
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}
</style>
