
// import originJsonp from 'jsonp'

// export default jsonp = function (url, data, option){
//   //拼接url
//   url += (url.indexOf('?')<0 ? '?': '&') + params(data)
 

//   //获取数据 ,返回promise

//   return new Promise((resolve,reject) => {
//     originJsonp(url,option, (err, data) =>{
//       if(!err){
//         resolve(data)  //data就是服务端返回的数据
//       } else{
//         reject(err)
//       }
//     } )
//   })
// }

// //定义拼接url方法

// export function param(data){
//   let res = ''
//   for(var i in data){
//     let value = data[i] !== undefined ? data[i] : ''
//     res += '&' + i + '=' + encodeURIComponent(data[i])
//   }
//   return url ? url.substring(1) : ''  //去掉最前面的&
// }

// import originJsonp from "jsonp"

// export default function jsonp(url, data, option) {
//   url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

//   return new Promise((resolve, reject) => {
//     originJsonp(url, option, (err, data) => {
//       if (!err) {
//         resolve(data)
//       } else {
//         reject(err)
//       }
//     })
//   })
// }

// export function param(data) {
//   let url = ''
//   for (var k in data) {
//     let value = data[k] !== undefined ? data[k] : ''
//     url += '&' + k + '=' + encodeURIComponent(value)
//   }
//   return url ? url.substring(1) : ''
// }
