/*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
export function sliceArray (array, size) {
  var result = []
  for (var x = 0; x < Math.ceil(array.length / size); x++) {
    var start = x * size
    var end = start + size
    result.push(array.slice(start, end))
  }
  return result
}

// 将时间戳转化为日期格式：

export function timestampToTime (timestamp) {
  let date = new Date(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return year + '-' + month + '-' + day
}

/* 深拷贝 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

// 判断参数是否为空
export function isEmpty (v) {
  switch (typeof v) {
    case 'undefined':
      return true
    case 'string':
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true
      break
    case 'boolean':
      if (!v) return true
      break
    case 'number':
      if (v === 0 || isNaN(v)) return true
      break
    case 'object':
      if (v === null || v.length === 0) return true
      for (var i in v) {
        return false
      }
      return true
  }
  return false
}

// flat兼容实现
export function flat (arr) {
  let res = []
  let flatMap = (arr) => {
    arr.map((element, index, array) => {
      if (Object.prototype.toString.call(element).slice(8, -1) === 'Array') {
        flatMap(element)
      } else {
        res.push(element)
      }
    })
  }
  flatMap(arr)
  return res
};
