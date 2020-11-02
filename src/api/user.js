/**
 * 用户相关请求模块
 */

import request from '@/utils/request'

export const login = data => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data
    })
}

/**
 * 获取用户心信息
 */
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile'
    })
}