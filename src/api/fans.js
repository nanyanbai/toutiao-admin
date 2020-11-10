/**
 * 粉丝管理相关请求
 */

import request from '@/utils/request'

export const getFollowers = data =>{
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    data
  })
}
