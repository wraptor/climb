// BeanUtils
const beanUtil = {
  /**
   * @param source source
   * @param target target
   * @returns quota.vue
   */
  copyPropertiesNotEmpty(source, target) {
    if (!source) {
      return source
    }
    const isObject = source.constructor === Object
    const isArray = source.constructor === Array
    if (isArray) {
      target = []
      for (let i = 0, len = source.length; i < len; i++) {
        target.push(this.copyPropertiesNotEmpty(source[i], target[i]))
      }
    } else if (isObject) {
      if (!target) {
        target = {}
      }
      for (const key in source) {
        // eslint-disable-next-line no-prototype-builtins
        if (source.hasOwnProperty(key)) {
          target[key] = this.copyPropertiesNotEmpty(source[key], target[key])
        }
      }
    } else {
      target = source
    }
    return target
  },
  deepClone(data) {
    const type = Object.prototype.toString.call(data)
    let obj
    // 数组的话遍历拷贝
    if (type === '[object Array]') {
      obj = []
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepClone(data[i]))
      }
    }
    // 对象的话遍历属性拷贝
    else if (type === '[object Object]') {
      obj = {}
      for (const key in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          obj[key] = this.deepClone(data[key])
        }
      }
    }
    // 其他类型直接返回
    else {
      // 不再具有下一层次
      return data
    }
    return obj
  },
  isEmpty(obj) {
    return obj == null
  },
  // Defining patterns
  dateFormat(date, format = 'yyyy-MM-dd hh:mm:ss') {
    if (date) {
      if (Object.prototype.toString.call(date) !== '[object Date]') {
        return ''
      }
      const o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(), // day
        'D+': date.getDate(), // day
        'h+': date.getHours(), // hour
        'H+': date.getHours(), // hour
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        S: date.getMilliseconds() // millisecond
      }
      if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
          )
        }
      }
      return format
    }
    return ''
  }
}

export default beanUtil
