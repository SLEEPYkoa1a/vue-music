<template>
  <div class="scroll-container" ref="scrollContainer">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        dafault: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted(){
      setTimeout(() => {
        console.log("init")
        this._initScroll()
      },20)

    },
    methods:{
      _initScroll(){
        console.log('init2')
        if(!this.$refs.scrollContainer){
          return
        }
        this.scroll = new BScroll(this.$refs.scrollContainer, {
          probeType: this.probeType,
          click: this.click,
        })

        if(this.listenScroll){
          let me = this
          this.scroll.on('scroll', ({x,y}) =>{
            me.$emit('scroll', {x,y})
          })
        }

      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      probeY(){
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
    },
    watch:{
      data(){
        setTimeout(() => {
          this.refresh()
        },this.refreshDelay)

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

</style>
