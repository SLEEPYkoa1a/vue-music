<template>
  <div class="disc">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :originSongs="originSongs" :rank="$route.meta.rank"></music-list>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import {getBanners,getDiscDetail} from 'api/recommend'
  import {getSongList} from 'api/song'
  import {deepClone} from 'common/js/util.js'
  import MusicList from 'components/music-list/music-list'
  export default {
    data(){
      return{
        songs: [],
        originSongs: []
      }
    },
    computed: {
      ...mapGetters(['disc']),
      title(){
        return this.disc.name
      },
      bgImage(){
        return this.disc.coverImgUrl
      }
    },
    created(){
      let data = getDiscDetail(this.disc.id)
      data.then(res => {
        let songIdList =[]
        res.data.playlist.trackIds.forEach((item)=>{
          songIdList.push(item)
        })
//          getSongList(songIdList)

//        console.log(songList)
//        console.log(typeof songList)

//        console.log(getSongList(songIdList))
        return getSongList(songIdList)
//        let songs = deepClone(songList)
//        console.log(songList)
//        this.originSongs = songList
      })
        .then(res => {

          this.songs = deepClone(res)
          this.originSongs = res
          console.log(res)
      })
    },
    methods: {
      ...mapMutations(['SET_DISC'])
    },
    components: {
      MusicList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .disc
    position: fixed
    z-index: 0
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
</style>
