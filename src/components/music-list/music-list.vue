<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back" @click="back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>

    <div class="bg-image" ref="bgImage" :style="bgStyle" >
      <div class="opcity-layer" ref="opcity"></div>
      <div class="play-wrapper">
        <div ref="playBtn" @click="randomPlay" v-show="songs.length>0" class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>

    <div class="bg-layer" ref="layer">
    </div>
    <!--<scroll class="list2"></scroll>-->
    <scroll class="list"
            @scroll="scroll"
            :listen-scroll="listenScroll"
            ref="list" :probe-type="probeType"
            :data="originSongs"
    >

      <div class="song-list-wrapper" >
        <song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import SongList from 'base/song-list/song-list'
  import {prefixStyle} from 'common/js/dom'
  import {mapActions,mapMutations,mapGetters} from 'vuex'
  import {deepClone} from 'common/js/util'
  import {shuffle} from 'common/js/util'
  import {playMode} from 'common/js/config'
  const RESERVED_HEIGHT = 40

  export default {
    data() {
      return {
        scrollY: 0
      }
    },
    props:{
      bgImage: {
        type: String,
        default: ''
      },
      songs:{
        type: Array,
        default: []
      },
      originSongs:{
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      bgStyle(){
        return `background-image: url(${this.bgImage})`
      },
      ...mapGetters(['currentIndex'])
    },
    watch: {
      scrollY(newY){
        let translateY = Math.max(this.minTranslateY, newY)
        let zIndex = 0
        let scale = 1
        this.$refs.layer.style.transform = `translate3d(0,${translateY}px,0)`
        const percent = Math.abs(newY/this.imageHeight)
        let opcityPercent = Math.abs(translateY/this.minTranslateY * 60) //设置透明度模拟高斯模糊
        if(newY > 0){
          opcityPercent = 0
          scale = 1 + percent
//          zIndex = 10
        }
        if (newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImage.style.transform = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.opcity.style.opacity = `${opcityPercent}%`
      }
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      },
      back(){
        this.$router.back()
      },
      selectItem(item, index){
        this.selectPlay({
          list:this.songs,
          originList: this.originSongs,
          index: index
        })
      },
      randomPlay(){

//        let tmpSong = this.songs.splice(0, 1)
        shuffle(this.songs)
//        this.songs.splice(0, 0, tmpSong[0])

        this.selectPlay({
          list: this.songs,
          originList: this.originSongs,
          index: 0
        })
        this.SET_PLAY_MODE(playMode.random)
      },
      ...mapActions([
        'selectPlay',
      ]),
      ...mapMutations(['SET_PLAY_MODE'])
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted(){
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    components:{
      Scroll,
      SongList,
    }


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 0
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .opcity-layer
        position absolute
        width 100%
        height 100%
        background-color black
        top 0px
        opacity 0
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background

    .list
      position: fixed
      top: 0px
      bottom: 0px
      width: 100%
      background: $color-background
      background transparent
      /*background lightblue*/
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
