export default {
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/')
        },
        {
            path: '/',
            // 命名路由 layout 有一个默认子路由，这个名字没有意义，所以警告
            // 正确的做法是：如果有默认子路由，就不要给父路由起名字了
            // name: 'layout',
            component: () => import('@/views/layout/'),
            children: [
                {
                    // 我们通常会把根路径 / 设置为网站的首页
                    // 为啥呢？因为我们在手动输入网址访问网站的时候，可以省略 /
                    // 如果你是别的名称，则必须加上
                    path: '', // path 为空，会作为默认子路由渲染
                    // 路由的名字是干啥的？
                    // 参考：https://gitee.com/lipengzhou/toutiao-publish-admin/issues/I1F1BA
                    name: 'home',
                    component: () => import('@/views/home/')
                },
                {
                    path: '/article',
                    name: 'article',
                    component: () => import('@/views/article/')
                },
                {
                    path: '/material',
                    name: 'material',
                    component: () => import('@/views/material/')
                },
                {
                    path: '/publish',
                    name: 'publish',
                    component: () => import('@/views/publish/')
                },
                {
                    path: '/comment',
                    name: 'comment',
                    component: () => import('@/views/comment/')
                }
            ]
        }
    ],
    base: process.env.BASE_URL,
    mode: 'history'
}
