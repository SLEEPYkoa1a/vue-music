<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>

    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll  ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.first)" class="item" v-for="item in hotKey">
                <span>{{item.first}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest :query="query" @select="saveSearch"></suggest>
    </div>
    <confirm ref="confirm" :text="text" @confirm="clearSearchHistory()"></confirm>
  </div>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  import SearchList from 'base/search-list/search-list'
  import Confirm from 'base/confirm/confirm'
  import Scroll from 'base/scroll/scroll'
  import {getHotKey} from 'api/search'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        hotKey:[],
        query: '',
        text: "确认删除历史记录吗?"
      }
    },
    computed:{
      shortcut() {
        return this.hotKey.concat(this.searchHistory)
      },
      ...mapGetters(['searchHistory'])
    },
    created(){
      this._initHotKey()
    },
    methods:{
      _initHotKey(){
        getHotKey().then(res => {
          this.hotKey = res.data.result.hots
        })
      },
//      addQuery(key){
//        this.$refs.searchBox.setQuery(key)
//      },
      onQueryChange(query){
        this.query = query
      },
      saveSearch(){
        this.saveSearchHistory(this.query)
      },
      showConfirm(){
        this.$refs.confirm.show()
      },
      deleteSearchHistory(item){
        this.deleteSearchHistory((item))
      },
      addQuery(item){
        this.$refs.searchBox.setQuery(item)
      },

      confirmDelete(){
        console.log(1)
      },
      ...mapActions(['saveSearchHistory','deleteSearchHistory','clearSearchHistory'])

    },
    watch:{
      query(newval){
        setTimeout(()=>{
          this.$refs.shortcut.refresh()
        })
      }
    },
    components: {
      SearchBox,
      Suggest,
      SearchList,
      Confirm,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
              font-size: $font-size-medium
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 158px
      bottom: 0
</style>
