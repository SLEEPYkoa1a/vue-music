<template>
  <div class="progressor-wrapper" ref="wrapper" @click.prevent="onProgressClick">
    <div class="left" ref="left"></div>
    <div class="dotBtn" ref="dotBtn"
         @touchstart.prevent="onTouchStart"
         @touchmove.prevent="onTouchMove"
         @touchend.prevent="onTouchEnd"></div>
    <!--<div class="right" ref="right"></div>-->
  </div>
</template>

<script>
  const btnWidth = 16
  export default {
    data(){
      return{
      }
    },
    created(){
      this.touch= {}
    },
    props:{
      percent:{
        type: Number,
        default: 0
      }
    },
    methods:{
      onTouchStart(e){
        this.touch.initTouch = true
        this.touch.startX = e.touches[0].pageX
//        console.log(this.touch.startX)
        this.touch.startLength= this.$refs.left.clientWidth
      },
      onTouchMove(e){
        if(!this.touch.initTouch)
        {
          return
        }
        let touchOffset = e.touches[0].pageX - this.touch.startX
        let currentLength = Math.min((this.$refs.wrapper.clientWidth - btnWidth),Math.max(0, this.touch.startLength + touchOffset))
//        console.log(currentLength)
        this._offset(currentLength)
      },
      onTouchEnd(){
        this.touch.initTouch = false
        let currentPercent = this.$refs.left.clientWidth /(this.$refs.wrapper.clientWidth - btnWidth)
        this.$emit('percentChange',currentPercent)
      },
      onProgressClick(e){
        if(e.target.className === 'dotBtn'){
          return
        }
        this._offset(e.offsetX)
//        console.log(this.$refs.left.style.width)
        this.onTouchEnd()
      },
      _offset(offset){
        this.$refs.left.style.width = `${offset}px`
        this.$refs.dotBtn.style.transform = `translate3d(${offset}px, 0, 0)`
      }
    },
    watch: {
      percent(val){
        if(this.percent >= 0 && !this.touch.initTouch){
          let length = this.$refs.wrapper.clientWidth - btnWidth
          this._offset(val*length)
        }

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progressor-wrapper
    width 100%
    display flex
    height 6px
    position relative
    align-items center
    background-color: $color-background
    border-radius 2.5px 2.5px 2.5px 2.5px
    .left
      display inline-block
      border-radius 2.5px 0 0 2.5px
      height 100%
      background $color-theme
    .dotBtn
      position absolute
      width 6px
      height 6px
      left 0px
      border 5px solid white
      border-radius: 10px
      background $color-theme



</style>
