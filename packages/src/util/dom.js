/* istanbul ignore next */
export const on = function (element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

/* istanbul ignore next */
export const off = function (element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}
