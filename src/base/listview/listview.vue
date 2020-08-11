<template>
  <div class="list-view">
    <scroll :data="data"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            class="list-content"
            @scroll="updateIndex"
            ref="listContent"
    >
      <ul>
        <li v-for="(group,index) in data" class="list-group"  ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li @click="selectItem(item)" v-for="(item,index) in group.items" class="list-group-item" :key="index" >
              <img class="avatar" v-lazy="item.img1v1Url">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="short-cut" @touchstart.stop.prevent="onShortcutTouchStart"
          @touchmove.stop.prevent="onShortcutTouchMove"
          @touchend.stop
          v-if="indexList.length">
        <li v-for="(item, index) in indexList"
            :data-index="index"
            class="item"
            :class="{current: index === currentIndex}">
          {{item}}</li>
      </ul>
      <h2 class="fixed-title" v-show="fixedTitle" ref="fixedTitle">{{fixedTitle}}</h2>
    </scroll>
  </div>

</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom.js'
  const ITEM_HEIGHT = 16
  export default {
    props: {
      data: {
        type: Array,
        default: [],
      },

    },
    data(){
      return{
        currentIndex : 0,
        scrollY: 0,
        titleDiff: 0
      }
    },
    computed:{
      indexList(){
        let res = this.data.map((group)=>{
          return group.title.substr(0,1)
        })
        return res
      },
      fixedTitle(){
        if(this.scrollY < 0){
          return ''
        }
        if(this.scrollY)
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      },
    },
    created(){
      this.probeType = 3
      this.touch = {}
      this.heightList = []
      this.listenScroll = true
    },
    mounted(){

    },
    methods:{
      onShortcutTouchStart(e){
        let currentIndex = getData(e.target, 'index')

        this.touch.startY =e.touches[0].pageY
        this.touch.startAnchorIndex = currentIndex
        this._scrollTo(parseInt(currentIndex))

      },

      onShortcutTouchMove(e){
        this.touch.endY = e.touches[0].pageY
        let deltaIndex = Math.floor((this.touch.endY - this.touch.startY)/ ITEM_HEIGHT)
        let currentIndex = parseInt(this.touch.startAnchorIndex) + deltaIndex
        this._scrollTo(currentIndex)
      },

      updateIndex(pos){
//        console.log(pos.y)
        let currentHeight = - pos.y
        this.scrollY = -pos.y
        let heightList = this.heightList

        for(var i = 0; i < heightList.length ; i++) {
          if (i === 0) {
            if (heightList[i + 1] > currentHeight) {
              this.titleDiff = heightList[i+1] - currentHeight
              this.currentIndex = i
              break
            }
          } else if (i === heightList.length - 1) {
            if (heightList[i] < currentHeight) {
              this.currentIndex = i
              break
            }
          } else {
            if (heightList[i] <= currentHeight && heightList[i + 1] > currentHeight) {
              this.titleDiff = heightList[i+1] - currentHeight
//              console.log(this.titleDiff)
              this.currentIndex = i
              break
            }
          }
        }


      },

      _calculateHeight(){
        let height = 0
        let list = this.$refs.listGroup
        this.heightList.push(height)
        for(let i = 0; i < list.length - 1; i++){
          height += list[i].clientHeight
          this.heightList.push(height)
        }
      },

      _scrollTo(index){
        if(!index && index !==0){
          return
        }
        if(index < 0){
          index = 0
        }else if (index > this.heightList.length - 1) {
          index = this.heightList.length - 1
        }

        this.currentIndex = index
        this.$refs.listContent.scrollToElement(this.$refs.listGroup[index], 0)
      },

      selectItem(item){
        this.$emit('select', item)
      }
    },
    watch: {
      data(){
        setTimeout(()=>{
          this._calculateHeight()}, 20)
      },
      titleDiff(newVal){

        let fixedTop = (newVal> 0 && newVal < 30)? (newVal - 30): 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixedTitle.style.transform = "translateY("+ (fixedTop)+"px)"

//        if(this.currentIndex < this.data.length -1){
//          if(this.scrollY > this.heightList[this.currentIndex+1] - 30
//            && this.scrollY <= this.heightList[this.currentIndex+1]){
//            return 30-(this.heightList[this.currentIndex+1] - this.scrollY)
//          }
//        }
//
//        return 0

      }

    },
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .list-view
    height 100%
    width 100%
    position relative
    .list-content
      height 100%
      .list-group
        .list-group-title
          height 30px
          display flex
          align-items center
          padding-left  20px
          color $color-text-l
          font-size $font-size-small
          background-color $color-highlight-background
        .list-group-item
          display flex
          align-items: center
          /*height 70px*/
          padding 15px 40px 15px 20px
          /*line-height 70px*/
          .avatar
            height 50px
            border-radius 50%
            margin-right 20px
          .name
            color $color-text-l
            font-size $font-size-medium

      .short-cut
        position absolute
        z-index 30px
        top 47%
        transform translateY(-50%)
        right 15px
        display flex
        flex-direction column
        align-items center
        border-radius 10px
        padding 20px 0
        width 20px
        background $color-background-d
        font-family: Helvetica
        .item
          /*outline 1px solid blue*/
          height 16px
          line-height 16px
          color $color-text-l
          font-size $font-size-small
          /*padding-bottom 2px*/

          &.current
            color $color-theme

      .fixed-title
        position : absolute
        top 0px
        width 100%
        height 30px
        display flex
        align-items center
        padding-left  20px
        color $color-text-l
        font-size $font-size-small
        background-color $color-highlight-background
</style>
