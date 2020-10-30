/**
 * 封装axios请求模块
 * */
import axios  from  'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'

const request = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/",   //基础路径
    transformResponse: [function (data) {
        // 后端返回的数据可能不是 JSON 格式字符串
        // 如果不是的话，那么 JSONbig.parse 调用就会报错
        // 所以我们使用 try-catch 来捕获异常，处理异常的发生
        try {
            // 如果转换成功，则直接把结果返回
            return JSONbig.parse(data)
        } catch (err) {
            // console.log('转换失败', err)
            // 如果转换失败了，则进入这里
            // 我们在这里把数据原封不动的直接返回给请求使用
            return data
        }

        // axios 默认在内部使用 JSON.parse 来转换处理原始数据
        // return JSON.parse(data)
    }]
})


// 请求拦截器
request.interceptors.request.use(function (config) {
    const { user } = store.state // 数据结构
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, function (err) {
    return Promise.reject(err)
})

// 响应拦截器
request.interceptors.response.use()

//导出请求方法
export  default  request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
