import request from '@/utils/request'

export const getSalesData = () =>　{
  return request({
    method: 'GET',
    url: 'http://127.0.0.1:8999/api/json/sales.json'
  })
}
