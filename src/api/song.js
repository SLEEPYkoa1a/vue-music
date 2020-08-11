import axios from 'axios'
import {createSong} from '../common/js/song'

export async function getSongList(songInfoList){
  //获取songUrl
  // console.log(songInfoList)
  let url = "http://192.168.0.106:3000/song/url?id="
  let lyricUrl = "http://192.168.0.106:3000/lyric?id="
  let descUrl = "http://192.168.0.106:3000/song/detail?ids="
  let songs = []
  let promises = []
  for(let i = 0; i < songInfoList.length; i++ ){
    let a = i

    let data1 = axios.get(url + songInfoList[a].id)

      // console.log(data1)
      // data1.then(res => {
      //   // console.log(res)
      //  res1 = res
      // })
    promises.push(data1)

    let data2 =  axios.get(lyricUrl + songInfoList[a].id)
      // data2.then(res => {
      //   // console.log(res)
      //   res2 = res
      // })
    promises.push(data2)

    let data3 =  axios.get(descUrl + songInfoList[a].id)
      // data3.then(res => {
      //   // console.log(res)
      //   res3 = res
      // })
    promises.push(data3)
  }

  const res = await Promise.all(promises)

  // p.then(res => {
    for(let j = 0; j < songInfoList.length; j++){
      songInfoList[j].url = res[3*j].data.data[0].url
      songInfoList[j].lyric = res[3*j+1].data.lrc ? res[3*j+1].data.lrc.lyric : ''
      songInfoList[j].singer = res[3*j+2].data.songs[0].ar
      songInfoList[j].name = res[3*j+2].data.songs[0].name
      songInfoList[j].album = res[3*j+2].data.songs[0].al
      songInfoList[j].img = res[3*j+2].data.songs[0].al.picUrl

      let song = createSong(songInfoList[j])
      songs[j] = song
    }
    // console.log(songInfoList[a])

  return songs
}



// for(var item of songInfoList){
//   let promise= []
//   let [res1,res2,res3] = await Promise.all(
//     [
//       axios.get(url + item.id),
//       axios.get(lyricUrl + item.id),
//       axios.get(descUrl + item.id)
//       ])
//     // console.log(res1)
//   item.url = res1.data.data[0].url
//
//   // let res2 = await axios.get(lyricUrl + item.id)
//   // console.log(res2)
//   item.lyric = res2.data.lrc ? res2.data.lrc.lyric : ''
//   // let res3 = await axios.get(descUrl + item.id)
//   //
//   item.singer = res3.data.songs[0].ar
//   item.name = res3.data.songs[0].name
//   item.album = res3.data.songs[0].al
//   item.img = res3.data.songs[0].al.picUrl
//   // // console.log (item)
//   let song = createSong(item)
//   // songs.push(song)
//   songs[songInfoList.indexOf(item)] = song
// }

export async function getSongDes(ids){
  let url = 'http://192.168.0.106:3000/song/detail?ids='
  let songs = []

  for (let id of ids){
    // console.log(id.id)
    let song = await axios.get(url + id.id)
    // data.then(res => {
    //   console.log(res)
    // })
    songs.push({name:song.data.songs[0].name, singer: formatSinger(song.data.songs[0].ar)})
  }
  // console.log(songs)
  return songs
}
function formatSinger(singers){
  let res = ''
  for(let singer of singers){
    res += singer.name+ '/'
  }
  res = res.slice(0,-1)
  return res
}

