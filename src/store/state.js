import {playMode} from '../common/js/config'
import {loadSearch}  from '../common/js/cache'
const state = {
  banners: [],
  singer: {},
  singerDetail: {},
  singerDesc: {},
  disc: {},
  discSongList: [],

  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: 0,
  test: {
    num: 0
  },
  searchHistory: loadSearch()
}

export default state
