/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getArticleList = params => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        params
    })
}

/**
 * 获取文章频道
 */
export const getArticleChannels = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels'
    })
}

/**
 * 根据文章id删除文章接口
 * @param articleId
 */
export const deleteArticle = articleId => {
    return request({
        method: 'DELETE',
        // 接口文档中的写的路径参数需要在 url 中传递
        // 凡是看见接口路径中有的 :xxx 格式的字段，则需要传递路径参数
        url: `/mp/v1_0/articles/${articleId}`
    })
}
