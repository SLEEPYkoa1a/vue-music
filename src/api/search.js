import axios from 'axios'
export function getHotKey(){
  let url = "http://192.168.0.106:3000/search/hot"
  let data = axios.get(url)
  data.then(res => {
    // console.log(res)
  })

  return data
}

export function getSearchSuggest(key){
  let url = "http://192.168.0.106:3000/search/suggest?type=mobile&keywords="
  let data = axios.get(url + key)
  data.then(res => {
    // console.log(res)
  })

  return data
}
