<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
//  import './common/stylus/index.styl'
import MHeader from './components/m-header/m-header'
import Tab from 'components/tab/tab.vue'
import Player from 'components/player/player'
import recommend from './components/recommend/recommend'
import axios from 'axios'
  export default {
    components: {
      MHeader,
      Tab,
      Player,

    },
    mounted(){

    },

  }

</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
