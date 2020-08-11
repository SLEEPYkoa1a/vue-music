export default class Song {
  constructor({id, singer, name, album, img, url, lyric}){
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.img = img
    this.url = url
    this.lyric = lyric
  }
}


export function createSong(musicData){
  return new Song({
    id: musicData.id,
    singer: getSingers(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    img: musicData.img,
    url: musicData.url,
    lyric: musicData.lyric
  })
}

export function getSingers(singers){
  let arr = []
  singers.forEach(item=>{
    arr.push(item.name)
  })
  return arr.join('/')
}
