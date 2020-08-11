<template>
  <div class="recommend" ref="recommend" >
    <scroll :data="hotLists" class="recommend-content">
      <div class="div1">
        <div v-if="banners.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div class="slider-item" v-for="item in banners">
              <a href="javascript:;">
                <img :src="item.imageUrl" class="needsclick" >
              </a>
            </div>
          </slider>
        </div>
        <div class="loading-container1" v-if="!banners.length">
          <loading></loading>
        </div>

        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectDisc(item)" v-for="(item, index) in hotLists" :key="index" class="item">
              <div class="icon">
                <img width="80" height="80" v-lazy="item.coverImgUrl">
              </div>
              <div class="text">
                <p class="play-count" >|>{{item.playCount}}</p>
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="item.description"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container2" v-if="!hotLists.length">
          <loading></loading>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>

</template>
<script>
import {getBanners,getHotList,getSingers,getDiscDetail} from '../../api/recommend'
import Slider from '../../base/slider/slider.vue'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {mapMutations} from 'vuex'
export default {
  data(){
    return{
      banners: [],
      hotLists: [],
    }
  },
  computed:{

  },
  created(){
    setTimeout(()=>{
      this.reqBanners()
    },0)
//    this.reqBanners()
    setTimeout(() => {
      this.reqHotList()
    }, 0)

    },
  methods:{
    reqBanners(){
      let data = getBanners()
      data.then(res=>{
        if(res.data.code === 200){
          this.banners = res.data.banners
          this.SET_BANNERS(this.banners)
//          console.log("得到banner数据:" , res.data)
        }
      })
    },
    reqHotList(){
      let data = getHotList()
      data.then(res=>{
        if(res.data.code === 200){
          this.hotLists = res.data.playlists
//          console.log('得到的hotlist数据:' ,res.data.playlists)
        }
      })
    },
    selectDisc(item){
//      console.log(item)
      this.SET_DISC(item)
      this.$router.push('/recommend/'+ item.id)
    },
    ...mapMutations(['SET_BANNERS','SET_DISC','SET_DISC_SONG_LIST'])

  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .div1
        /*display flex*/
        .slider-wrapper
          position: relative
          width: 100%
          height 138px
          overflow: hidden
          .slider-item
            float left
            box-sizing: border-box
            overflow: hidden
            text-align: center
            a
              display: block
              width: 100%
              overflow: hidden
              text-decoration: none
            img
              display: block
              width: 100%

        .loading-container1
          /*position: relative*/
          height 138px
          width: 100%
          display flex
          align-items center
        .recommend-list
          .list-title
            height: 65px
            line-height: 65px
            text-align: center
            font-size: $font-size-medium
            color: $color-theme
          .item
            display: flex
            box-sizing: border-box
            align-items: center
            padding: 0 20px 20px 20px
            .icon
              /*flex: 0 0 80px*/
              width: 80px
              padding-right: 20px
            .text
              display: flex
              flex-direction: column
              justify-content: center
              /*flex: 1*/
              line-height: 20px
              overflow: hidden
              font-size: $font-size-medium
              .play-count
                color $color-dialog-background
                font-size $font-size-small-s
              .name
                margin-bottom: 10px
                color: $color-text
              .desc
                color: $color-text-d
                text-overflow: ellipsis
                white-space nowrap
                overflow hidden
        .loading-container2
          height 300px
          width: 100%
          display flex
          align-items center


</style>
