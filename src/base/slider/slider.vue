<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <div class="dot" v-for="(item, index) in dots" :class="{active: currentBannerIndex === index}"></div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    data(){
      return{
        dots: [],
        currentBannerIndex: 0,
        timer: 0
      }
    },
    props:{
      loop:{
        type: Boolean,
        default: true
      },
      autoPlay:{
        type: Boolean,
        default: true
      },
      interval:{
        type: Number,
        default: 1000
      }
    },


    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initSlider()
        this._initDots()
        if(this.autoPlay){
         this._play()
        }
      },20)
      window.addEventListener('resize',()=>{
        if(!this.bannerScroll){
          return
        }
        this._setSliderWidth(true)
        this.bannerScroll.refresh()
      })
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
//    deactivated() {
//      clearTimeout(this.timer)
//    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children =  this.$refs.sliderGroup.children
        let itemWidth = this.$refs.slider.clientWidth
        let width = 0
        for(let i = 0; i< this.children.length; i++){
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = itemWidth + "px"
          width += itemWidth

        }
        if(this.loop && !isResize){
          width += 2 * itemWidth  //实现无缝切换需要再这里加两倍的item宽度,用于再首尾各放置一个图片
        }
//        console.log("宽度:"+ width)
        this.$refs.sliderGroup.style.width = width + "px"
      },

      _initSlider(){
        this.bannerScroll = new BScroll(this.$refs.slider,{
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap:{
            loop: this.loop,
            threshold: 0.3,
            speed: 4000
          },
          click: false
        })
        this.bannerScroll.on('scrollEnd',()=>{
          let currentPage = this.bannerScroll.getCurrentPage().pageX

//          if(this.loop){ //开启循环,需要给index减1
//            currentPage-=1
//          }
          this.currentBannerIndex = currentPage

          if(this.autoPlay){
            this._play()
          }
        })

        this.bannerScroll.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })

        this.bannerScroll.on('scrollCancel',()=>{
//          clearTimeout(this.timer)
          if(this.autoPlay){
            this._play()
          }
        })
      },
      _initDots(){
        if(this.loop){
          this.dots = new Array(this.children.length-2)
        }else{
          this.dots = new Array(this.children.length)
        }


      },
      _play(){
        let pageIndex = this.currentBannerIndex
        if(pageIndex !== this.children.length-3){
          pageIndex +=1
        }else{
          pageIndex = 0
        }
        this.timer = setTimeout(() => {
            this.bannerScroll.goToPage(pageIndex, 0, 1000)
          },
          this.interval)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .slider
    min-height: 1px

    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      height 100%
      /**/
      /*width 375px !important*/
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
