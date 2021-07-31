/**
 * 节流
 * 比如有一个按钮执行需要打印"hello world"，使用节流后，按钮每次点击都在wait内，只触发一次
 * @param func 执行函数
 * @param wait 间隔时常
 * @param immediate 是否立即执行
 * @returns {function(): void}
 */
export function debounce(func, wait = 500, immediate = true) {
  let timeout
  return function () {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      if (!timeout) {
        func.apply(this, arguments)
      }
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
    } else {
      timeout = setTimeout(() => {
        func.apply(this, arguments)
      }, wait)
    }
  }
}

/**
 * 防抖
 * 比如有一个按钮执行需要打印"hello world"，使用防抖后，按钮连续点击在wait间隔连续触发
 * @param func 执行函数
 * @param wait 间隔时常
 * @returns {function(): void}
 */
export function throttle(func, wait = 500) {
  let valid = true
  return function () {
    if (!valid) {
      return false
    }
    valid = false
    func.apply(this, arguments)
    setTimeout(() => {
      valid = true
    }, wait)
  }
}
