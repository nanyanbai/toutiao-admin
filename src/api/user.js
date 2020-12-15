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

export const getCaptchas = params => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/captchas/${params}`
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


export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/mp/v1_0/user/profile',
        data
    })
}

