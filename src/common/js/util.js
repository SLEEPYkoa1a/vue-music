export function shuffle(arr){
  for(var i = 0; i< arr.length; i++){
    let random = randomIndex(0,i)
    let tmp = arr[random]
    arr[random] = arr[i]
    arr[i] = tmp
  }
}

function randomIndex(min, max){
  return Math.floor(Math.random()*(max - min + 1) + min)
}



export function deepClone(obj) {
  //首先要检测数据类型，见终极方法
  let result, objClass = getObjClass(obj);
  if(objClass === 'Object'){
    result = {};
  }else if(objClass === 'Array'){
    result = [];
  }else {
    return obj; // 如果是其他数据类型不复制，直接将数据返回
  }
  // 遍历目标对象
  for(let key in obj){
    if(getObjClass(obj[key]) === "Object" || 'Array'){  //递归，如果又遇到数组或者对象，再调用自身进行拷贝
      result[key] = deepClone(obj[key]);
    }else {
      result[key] = obj[key];
    }
  }
  return result;
}

function getObjClass (target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}


export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
