<template>
  <div class="rank" ref="rank">
    <scroll  class="toplist" ref="toplist">
      <ul>
        <li class="item" v-for="item in topLists" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.coverImgUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.topThreeSong" :key="index" >
              <span>{{(index+1)+". "+song.name}}</span>
              <span>{{" - " + song.singer}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view ></router-view>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getRankList} from "api/rank"
  import {getDiscDetail} from 'api/recommend'
  import {getSongDes} from 'api/song'
  import {mapMutations} from 'vuex'
  export default {
    data(){
      return {
        topLists: []
      }
    },
    created(){
      this._initRank()
    },
    methods:{
      _initRank(){
        let data = getRankList()
        data.then(res=> {
          this.topLists = res.data.list
        })
      },
      selectItem(item){
        this.SET_DISC(item)
        this.$router.push('/rank/'+ item.id)
      },
      ...mapMutations(['SET_DISC'])
    },
    watch:{
      topLists(val){
        for(let item of val){
          let data =  getDiscDetail(item.id)
          data.then(res =>{
//            item.songList = res
//            console.log(res)
            return new Promise((resolve,reject) => {
              resolve(res.data.playlist.trackIds)
            })
          }).then(res=>{
            let topThreeIds = res.slice(0,3)
            let topThreeSong = getSongDes(topThreeIds)
            return Promise.resolve(topThreeSong)
          }).then(res => {
//            console.log(res)
            item.topThreeSong = res
          })
        }
      }
    }
    ,
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
