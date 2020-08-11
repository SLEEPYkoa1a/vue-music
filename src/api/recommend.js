//引入
import jsonp from '../common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'
//export方法
export async function getRecommend() {
  const url = ""
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
//将公共参数assign给一个 对象


export function getBanners() {
  const url = "http://192.168.0.106:3000/banner"

  let data = axios.get(url)
  return data
}

export function getHotList(){
  const url = "http://192.168.0.106:3000/top/playlist"
  let data = axios.get(url)
  data.then(res=>{
    // console.log(res)
  })
  return data
}

export function getDiscDetail(discId) {
  const url = "http://192.168.0.106:3000/playlist/detail?id="
  let data = axios.get(url+discId)

  // const url = "http://192.168.0.106:3000/banner"
  // let data = axios.get(url)
  // console.log('歌单数据'+data)
  // data.then(res => {
  //   // console.log(typeof res)
  //   console.log('歌单数据'+ res)
  // })
  return data
}

