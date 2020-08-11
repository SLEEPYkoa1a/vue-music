<template>
  <div class="player" v-show="playList.length">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen" >
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.img" alt="">
        </div>

        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">
            {{currentSong.name}}
          </h1>
          <h2 class="subtitle">
            {{currentSong.singer}}
          </h2>
        </div>

        <div class="middle"  >
          <slider :loop="false" :autoPlay="false" v-if="playList.length">
            <div class="middle-l" >
              <div class="wrapper-wrapper">
                <div class="cd-wrapper">
                  <div class="cd" :class="rotate" ref="cd">
                    <img :src="currentSong.img" alt="" class="image">
                  </div>
                </div>
              </div>
              <div class="playing-lyric-wrapper">
                <div class="playing-lyric">{{currentLyricLine}}</div>
              </div>
            </div>
            <scroll class="middle-r" ref="lyricScroll" :data="currentLyric.lines">
              <div class="lyric-wrapper">
                <p class="text"
                   :class="{'current' : index === currentLyricLineNum}"
                   v-for="(line, index) in currentLyric.lines"
                   :key="index"
                   ref="lyricLine"
                >{{line.txt}}</p>
                <div class="currentLyric">
                </div>
              </div>
            </scroll>
          </slider>

        </div>

        <div class="bottom">
          <div class="progress-wrapper" >
            <span class="time time-l" >{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <!--<progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>-->
              <progressor :percent="percent" @percentChange="onProgressorChangePercent"></progressor>
            </div>
            <span class="time time-r">{{duration?format(duration):'0:00'}}</span>
          </div>

          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="currentMode"></i>
            </div>
            <div class="icon i-left" :class="disable" @click="prev">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disable">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disable" @click="next">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>


    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon" >
          <img width="40" height="40" :class="rotate" :src="currentSong.img" alt="">
        </div>
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <div class="control">
          <i :class="iconMini" @click.stop="togglePlaying"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready"  @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import Progressor from 'base/progressor/progressor'
  import {playMode} from 'common/js/config.js'
  import {shuffle,deepClone} from 'common/js/util'
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/slider/slider'
  export default {
    data(){
      return{
        rotate: '',
        disable: '',
        songReady: false,
        currentTime: 0,
        duration: 0,
        currentLyric: null,
        currentLyricLine: null,
        currentLyricLineNum: 0,
        Slider
      }
    },
    props:{},
    computed: {
      ...mapGetters(['test','fullScreen','playList','currentSong','playing','currentIndex','mode','sequenceList','banners']),
      playIcon(){
        return !this.playing? 'icon-play' : 'icon-pause'
      },
      iconMini(){
        return !this.playing? 'icon-play-mini' : 'icon-pause-mini'
      },
      cdCls(){
        return this.playing ? 'play': 'play pause'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
//      duration(){
//        return this.$refs.audio.duration
//      },
      percent(){
        return this.currentTime/this.duration
      },
      currentMode(){
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop? 'icon-loop':'icon-random'
      }
    },
    methods: {
      back(){
        this.SET_FULL_SCREEN(false)
      },
      open(){
        this.SET_FULL_SCREEN(true)
      },
      togglePlaying(){
        this.SET_PLAYING_STATE(!this.playing)
        this.currentLyric.togglePlay()
      },
      next(){
        if(!this.songReady){
          return
        }
        let current = this.currentIndex +1
        if(current === this.playList.length){
          current = 0
        }
        this.$refs.cd.classList.remove("play", "pause")
        this.SET_CURRENT_INDEX(current)
        if(!this.playing){
          this.togglePlaying()
        }

        this.songReady = false
      },
      prev(){
        if(!this.songReady){
          return
        }
        let current = this.currentIndex -1
        if(current === -1){
          current = this.playList.length - 1
        }

        this.SET_CURRENT_INDEX(current)
        this.songReady = false
      },
      ready(){
        this.$refs.cd.classList.add('play')
        this.songReady = true
      },
      error(){
        this.$refs.cd.classList.add ('play pause')
        this.songReady = true

      },
      updateTime(e){
        this.currentTime = e.target.currentTime
        this.duration = e.target.duration

      },
      format(val){
        val = Math.floor(val)

        let minute = Math.floor(val/60)

        let second = this._pad(Math.floor(val%60), 2)

        return `${minute}:${second}`
      },
      _pad(val, n){
        let len = val.toString().length
        while(len<n){
          val = '0' + val
          len++
        }
        return val
      },
      onProgressorChangePercent(val){
        this.currentTime = this.duration * val
        this.$refs.audio.currentTime = this.currentTime
        if(!this.playing){
          this.togglePlaying()
        }
      },
      changeMode(){
        let mode = (this.mode + 1)%3

        this.SET_PLAY_MODE(mode)
//        console.log(this.mode)
      },
      getLyric(){
          this.currentLyric = new Lyric(this.currentSong.lyric, ({lineNum, txt})=>{
          if(lineNum > 5){
            this.$refs.lyricScroll.scrollToElement(this.$refs.lyricLine[lineNum-5])
          }else{
            this.$refs.lyricScroll.scrollTo(0, 0, 1000)
          }
          this.currentLyricLineNum = lineNum
            this.currentLyricLine = this.currentLyric.lines[lineNum].txt
        })
          if(this.playing){
          this.currentLyric.play()
          }
      },
      ...mapMutations([
        'SET_FULL_SCREEN',
        'SET_PLAYING_STATE',
        'SET_CURRENT_INDEX',
        'SET_PLAY_MODE',
        'SET_PLAYLIST'
      ])
    },
    watch: {
      currentSong(newSong, oldSong){
        if(newSong.id === oldSong.id){
          return
        }
        if(this.currentLyric){
          this.currentLyric.stop()
          this.currentTime = 0
          this.currentLyricLineNum = 0
        }
        this.getLyric()
//        console.log(newSong.lyric)
//        this.currentLyric.play()
//        this.$refs.audio.play()
//        this.SET_PLAYING_STATE(true)
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()

        }, 1000)
      },

      handleLyric({lineNum, txt}){
        console.log(txt)
        this.currentLyricLineNum = lineNum
      },
      playing(newPlaying){
        const audio = this.$refs.audio
        this.$nextTick(() =>{
          newPlaying ? audio.play() : audio.pause()
        })
        this.rotate = newPlaying? 'play': 'play pause'
      },
      songReady(val){
        this.disable = val ? '' : "disable"
      },
      currentTime(val){
        if(val === this.duration){
          if(this.mode === playMode.loop){
            this.currentTime = 0
            this.$refs.audio.play()
          }else{
            this.next()
          }
        }
      },
      mode(val){
        if(val === playMode.random){
          let tmpSong = this.playList.splice(this.currentIndex, 1)
          shuffle(this.playList)
          this.playList.splice(this.currentIndex, 0, tmpSong[0])
          this.SET_PLAYLIST(this.playList)

        }
        else if(val === playMode.sequence){
          let newIndex = this.sequenceList.findIndex((item)=>{
            return item.id === this.currentSong.id
          })
          let tmp = deepClone(this.sequenceList)
          this.SET_PLAYLIST(tmp)
          this.SET_CURRENT_INDEX(newIndex)
        }
      }
    },
    components:{
      Progressor,
      Scroll,
      Slider
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .slider
          height 85%
        .slider-item
          box-sizing: border-box
          overflow: hidden
          text-align: center
        .middle-l
          float left
          /*display: inline-block*/
          vertical-align: top
          position: relative
          /*width: 100%*/
          /*padding-top 80%*/
          /*width 375px*/
          /*height: 0*/
          /*height 80%*/
          /*padding-top: 80%*/
          .wrapper-wrapper
            width 100%
            padding-top 80%
            .cd-wrapper
              position: absolute
              left: 10%
              top: 0px
              width: 80%
              height: 100%
              .cd
                width: 100%
                height: 100%
                box-sizing: border-box
                border: 10px solid rgba(255, 255, 255, 0.1)
                border-radius: 50%
                &.play
                  animation: rotate 20s linear infinite
                &.pause
                  animation-play-state: paused
                .image
                  position: absolute
                  left: 0
                  top: 0
                  width: 100%
                  height: 100%
                  border-radius: 50%
          .playing-lyric-wrapper
            position absolute
            width: 80%
            left 50%
            transform translate3d(-50%,0,0)
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          /*border 1px solid white*/
          float left
          /*display: inline-block*/
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          /*width: 300px*/
          margin: 0px auto
          padding: 10px 0
          .time
            display inline-block
            color: $color-text
            font-size: $font-size-small
            /*flex: 0 0 30px*/
            line-height: 30px
            width: 12%
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            display inline-block
            width 76%
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme

      &.normal-enter-active, &.normal-leave-active
        transition all 0.4s
        .top, .bottom
          transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity 0
        .top
          transform translate3d(0, -100px, 0)
        .bottom
          transform translate3d(0, 100px,0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity 50%
        transform translate3d(0, 100px, 0)
      .icon
        width 40px
        padding 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
