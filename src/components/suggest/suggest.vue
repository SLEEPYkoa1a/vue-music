<template>
  <scroll ref="suggest" class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="item.keyword"></p>
        </div>
      </li>
      <!--<loading v-show="hasMore" title=""></loading>-->
    </ul>
    <div v-show="!result" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
//  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import {getSearchSuggest} from 'api/search'
//  import {ERR_OK} from 'api/config'
//  import {createSong} from 'common/js/song'
//  import {mapMutations, mapActions} from 'vuex'
//  import Singer from 'common/js/singer'

//  const TYPE_SINGER = 'singer'
//  const perpage = 20

  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
//        page: 1,
//        pullup: true,
//        beforeScroll: true,
//        hasMore: true,
        result: []
      }
    },
    methods: {
//      refresh() {
//        this.$refs.suggest.refresh()
//      },
      search(key) {
//        this.page = 1
//        this.hasMore = true
//        this.$refs.suggest.scrollTo(0, 0)
//        search(this.query, this.page, this.showSinger, perpage).then((res) => {
//          if (res.code === ERR_OK) {
//            this.result = this._genResult(res.data)
//            this._checkMore(res.data)
//          }
//        })
        getSearchSuggest(key).then(res => {
          this.result = res.data.result.allMatch
//          console.log(this.result)
        })
      },
//      searchMore() {
//        if (!this.hasMore) {
//          return
//        }
//        this.page++
//        search(this.query, this.page, this.showSinger, perpage).then((res) => {
//          if (res.code === ERR_OK) {
//            this.result = this.result.concat(this._genResult(res.data))
//            this._checkMore(res.data)
//          }
//        })
//      },
//      listScroll() {
//        this.$emit('listScroll')
//      },
      selectItem(item) {
//        if (item.type === TYPE_SINGER) {
//          const singer = new Singer({
//            id: item.singermid,
//            name: item.singername
//          })
//          this.$router.push({
//            path: `/search/${singer.id}`
//          })
//          this.setSinger(singer)
//        } else {
//          this.insertSong(item)
//        }
        this.$emit('select', item)
      },
//      getDisplayName(item) {
//        if (item.type === TYPE_SINGER) {
//          return item.singername
//        } else {
//          return `${item.name}-${item.singer}`
//        }
//      },
      getIconCls(item) {
        if (item.type === 1) {
          return 'icon-music'
        } else {
          return 'icon-mine'
        }
      },
//      _genResult(data) {
//        let ret = []
//        if (data.zhida && data.zhida.singerid) {
//          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
//        }
//        if (data.song) {
//          ret = ret.concat(this._normalizeSongs(data.song.list))
//        }
//        return ret
//      },
//      _normalizeSongs(list) {
//        let ret = []
//        list.forEach((musicData) => {
//          if (musicData.songid && musicData.albummid) {
//            ret.push(createSong(musicData))
//          }
//        })
//        return ret
//      },
//      _checkMore(data) {
//        const song = data.song
//        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
//          this.hasMore = false
//        }
//      },
//      ...mapMutations({
//        setSinger: 'SET_SINGER'
//      }),
//      ...mapActions([
//        'insertSong'
//      ])
    },
    watch: {
      query(newQuery) {
        if(newQuery){
          this.search(newQuery)
        }
      }
    },
    components: {
      Scroll,
//      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    width 90%
    margin 0 auto
    .suggest-list
      width 90%
      margin 0 auto
      /*padding: 0 30px*/
      background-color $color-highlight-background
      .suggest-item
        display: flex
        align-items: center
        line-height 22px
        /*margin 0 20px*/
        padding: 10px 10px 10px 10px
        border-bottom 1px solid rgba(#f1f1f1, 0.1)
        &:last-child
          border-bottom-color transparent
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      /*outline 1px solid white*/
      position: absolute
      width: 90%
      top: 50%
      transform: translateY(-50%)
</style>
