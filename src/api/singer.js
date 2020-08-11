import axios from 'axios'
export async function getSingerList(){
  let letterList = ['-1','a','b','c','d']
    // , 'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  var singerLists = []
  for(let i in letterList){
    let res  = await axios.get('http://192.168.0.106:3000/artist/list?type=-1&limit=10&area=-1&offset=0&initial='+letterList[i])
    // console.log(i)
    if(res.status === 200){
      if(letterList[i] === '-1'){
        singerLists.push({index:letterList[i],title:"热门",items: res.data.artists}

        )
      }else if(letterList[i] === '0' ){
        // hotSinger.push(new singerList(letterList[i],'#', res.data.artists))
      }else{
        singerLists.push( {index:letterList[i],title:letterList[i].toUpperCase(),items: res.data.artists}
          // new singerList(letterList[i],letterList[i].toUpperCase(), res.data.artists)
        )
      }
    }
  }
  return singerLists
}

class singerList{
  constructor(index, title, items){
    this.index = index
    this.title = title
    this.items = items
  }
}

async function getLetterList(url) {
  let data = await axios.get(url)
  return data
}

export function getSingerDetail(singerId){  //获取歌手信息
  let url = "http://192.168.0.106:3000/artists?id="
  let data = axios.get(url + singerId)
  return data
}

export function getSingerDesc(singerId) {  //获取歌手描述
  let url = "http://192.168.0.106:3000/artist/desc?id="
  let data = axios.get(url + singerId)
  return data
}
