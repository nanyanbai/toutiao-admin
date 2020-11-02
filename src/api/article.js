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

/**
 * 发布（新建）文章
 */
export const addArticle = (data, draft = false ) => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/articles',
        params: {
            draft
        },
        data
    })
}


/**
 * 获取指定文章
 */
export const getArticle = articleId => {
    return request({
        method: 'GET',
        url: `/mp/v1_0/articles/${articleId}`
    })
}

/**
 * 编辑文章
 */
export const updateArticle = (articleId, data, draft = false) => {
    return request({
        method: 'PUT',
        url: `/mp/v1_0/articles/${articleId}`,
        params: {
            draft
        },
        data
    })
}


/**
 * 修改文章评论状态
 */
export const updateCommentStatus = (articleId, allowComment) => {
    return request({
        method: 'PUT',
        url: '/mp/v1_0/comments/status',
        params: {
            // 对象的属性名不受代码规范限制
            article_id: articleId
        },
        data: {
            allow_comment: allowComment
        }
    })
}
