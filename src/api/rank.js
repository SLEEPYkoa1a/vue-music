import axios from 'axios'
export function getRankList(){
  let url = "http://192.168.0.106:3000/toplist"
  let data = axios.get(url)
  data.then(res => {

  })

  return data
}
