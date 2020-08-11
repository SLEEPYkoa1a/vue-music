import * as types from './mutation-types.js'
export default {
  [types.SET_BANNERS](state, banners){
    state.banners = banners
  },
  [types.SET_SINGER](state, singer){
    state.singer = singer
  },
  [types.SET_SINGER_DETAIL](state,singerDetail){
    state.singerDetail = singerDetail
  },
  [types.SET_SINGER_DESC](state,singerDesc){
    state.singerDesc = singerDesc
  },
  [types.SET_SONGS](state,songs){
    state.songs = songs
  },

  [types.SET_DISC](state, disc){
    state.disc = disc
  },
  [types.SET_DISC_SONG_LIST](state, discSongList){
    state.discSongList = discSongList
  }
,
  [types.SET_PLAYING_STATE](state, flag){
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },

}
