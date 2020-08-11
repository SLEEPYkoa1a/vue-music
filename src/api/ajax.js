/*ajax请求模块
* 返回promise对象（异步返回的是response.data）*/

import axios from 'axios'
export default function ajax (url, data={}, type='GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise

    if (type === 'GET') {
      //准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }

      //发送get请求
      // if(url === '/search_shops'){
      //   promise = axios.get(url,{
      //     params:{
      //       keyword: data.keyword
      //     }
      //   })
      // }else{
        promise = axios.get(url)
      // }

    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()

      resolve(response.data)

    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

//还有以下写法
// this.$axios({
//   method:"get",
//   url:"/news/index",
//   data:{
//     product_type:'product'
//   }
// }).then((res)=>{
// //请求成功返回的数据
//   console.log(res);
//   this.newsListShow = res.data.data.datalist;
//   this.product_type=res.data.data.product_type;
// })
