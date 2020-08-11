import * as types from './mutation-types'
import {SET_PLAYLIST} from "./mutation-types";
import {SET_SEQUENCE_LIST} from "./mutation-types";
import {SET_FULL_SCREEN} from "./mutation-types";
import {SET_PLAY_MODE} from "./mutation-types";
import {saveSearch,deleteSearch,clearSearch} from 'common/js/cache'


export function selectPlay({commit, state}, {list, originList,index}){

  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_PLAYLIST,list)
  commit(types.SET_SEQUENCE_LIST, originList)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}){
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

