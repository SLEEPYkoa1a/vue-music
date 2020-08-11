<template>
  <div class="singer" ref="singer">
    <list-view class="list-view":data="singerLists" @select="selectSinger" v-if="singerLists" ></list-view>
    <div class="loading-container" v-if="!singerLists.length">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import {getDiscDetail} from 'api/recommend'
  import ListView from 'base/listview/listview'
  import Loading from 'base/loading/loading'
  import {mapMutations,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        singerLists: []
      }
    },
    created(){

      setTimeout(()=>{
        this.reqSingerList()

      },200)
    },
    computed:{
//      ...mapGetters(['playList'])
    },
    watch:{
//      playList(list){
//        if(list.length) {
//          this.$refs.singer.style.bottom = "60px"
//        }
//      }
    },
    methods: {
      reqSingerList(){
        let data = getSingerList()
        data.then(res=>{
          this.singerLists = res
        })

      },

      selectSinger(item){
        this.$router.push({
          path:`/singer/${item.id}`   //路由跳转
        })
        this.setSinger(item)   //更新state.singer
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView,
      Loading,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer
    position: fixed
    width: 100%
    top: 88px
    bottom: 0%
    overflow hidden
    router-view
      left 50px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
