<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">考拉Music</h1>
    <!-- <div class='get' @click="getWangyi">获取热门歌单</div> -->
    <!-- <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import  {getRecommend} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import axios from '../../api/axios'
  export default {
    data(){
      return {
        recommends: []
      }
    },
    created(){
      // this._getRecommend()
    },
    mounted(){
      // this.$store.dispatch('getSingerList')
    },
    methods:{
      // _getRecommend(){
      //   getRecommend().then((res)=>{
      //     if(res.code === ERR_OK){
      //       this.recommends = res.data.slider
      //     }
      //   })
      // },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      // bg-image('logo')
      background-image: url("koala-logo.png")
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>