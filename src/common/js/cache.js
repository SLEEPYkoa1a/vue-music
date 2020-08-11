import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

function insertArray(arr, val, compare, maxLen){
  const index = arr.findIndex(compare)
  if(index===0){
    return
  }
  if(index > 0){
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if(maxLen && arr.length > maxLen){
    arr.pop()
  }
}

function deleteArray(arr,compare){
  const index = arr.findIndex((item) =>{
    return item === compare
  })
  if (index > -1) {
    arr.splice(index, 1)
  }
}
export function saveSearch(query){
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch(query){
  let searches = storage.get(SEARCH_KEY, [])
  deleteArray(searches, query)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch(){
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}


