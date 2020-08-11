<template>
  <transition  name="slide" >
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :originSongs="originSongs"></music-list>
  </transition>
</template>

<script>
  import {mapState,mapGetters,mapMutations} from 'vuex'
  import {getSingerDetail,getSingerDesc} from 'api/singer'
  import {getDiscDetail} from 'api/recommend'
  import {getSongList} from 'api/song'
  import {deepClone} from 'common/js/util.js'
  import MusicList from 'components/music-list/music-list'
  export default {
    data(){
      return {
        songs: [],
        originSongs: []
      }
    },
    computed:{
      ...mapGetters(['singer']),
      title(){
        return this.singer.name
      },
      bgImage(){
        return this.singer.picUrl
      }
    },
    methods:{
      back(){
        this.$router.push('/singer')
      },
      _getDetail(){

        let singer = this.singer
        if(!singer.id){
          this.$router.push('/singer')
        }
        let data = getSingerDetail(singer.id)
        data.then(res=>{
          if(res.status === 200){
//          console.log("歌手详情",res.data)
            let songInfoList = []
//            console.log(res.data.hotSongs)
            res.data.hotSongs.forEach(item=>{
              songInfoList.push({
                id:item.id,
                singer: item.ar,
                name: item.name,
                album: item.al,
                img: item.al.picUrl})
            })
//            console.log(songInfoList)
           return getSongList(songInfoList.slice(0,10))
//            this.setDetail(res.data)
          }
        }).then(res=>{
          this.originSongs = deepClone(res)
          this.songs = res
        })
      },
      _getDesc(){
        let singer = this.singer
        if(!singer.id){
          this.$router.push('/singer')
        }

        let data = getSingerDesc(singer.id)
        data.then(res=>{
          if(res.status === 200){
//          console.log("歌手描述",res.data)
//            this.setDesc(res.data)
          }
        })
      },
      ...mapMutations(['SET_SINGER_DETAIL','SET_SINGER_DESC'])
    },
    components:{
      MusicList
    },
    created() {
      this._getDetail()
      this._getDesc()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  /*.singer-detail
    color: white
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background-color $color-background*/
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
