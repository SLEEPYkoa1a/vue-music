/*包含n个接口请求函数
* 函数的返回值：promise*/
import ajax from './ajax'

const BASE_URL = 'http://localhost:3200'

export const reqSingerList = (params) => ajax('http://localhost:3000/hot/topic', params, 'GET')


