import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',
      redirect: '/singer'
    },
    {
      path:'/recommend',
      component: Recommend,
      children:[
        {
          path:':id',
          component: Disc,
          meta:{
            rank: false
          },
        }
      ]
    },{
      path:'/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },{
      path:'/search',
      component: Search
    },{
      path:'/rank',
      component: Rank,
      children:[
        {
          path:':id',
          component: Disc,
          meta:{
            rank: true
          },
        }
      ]
    },

  ]
})
