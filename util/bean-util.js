// BeanUtils
const beanUtil = {
  /**
   * @param source source
   * @param target target
   * @returns target
   */
  copyPropertiesNotEmpty(source, target) {
    if (!source) {
      return source;
    }
    const isObject = source.constructor === Object;
    const isArray = source.constructor === Array;
    if (isArray) {
      target = [];
      for (let i = 0, len = source.length; i < len; i++) {
        target.push(this.copyPropertiesNotEmpty(source[i], target[i]));
      }
    } else if (isObject) {
      if (!target) {
        target = {};
      }
      for (let key in source) {
        // eslint-disable-next-line no-prototype-builtins
        if (source.hasOwnProperty(key)) {
          target[key] = this.copyPropertiesNotEmpty(source[key], target[key]);
        }
      }
    } else {
      target = source;
    }
    return target;
  },
  deepClone(data) {
    const type = typeof data;
    let obj;
    if (type === "array") {
      obj = [];
    } else if (type === "object") {
      obj = {};
    } else {
      //不再具有下一层次
      return data;
    }
    if (type === "array") {
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepClone(data[i]));
      }
    } else if (type === "object") {
      for (let key in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          obj[key] = this.deepClone(data[key]);
        }
      }
    }
    return obj;
  },
  isEmpty(obj) {
    return obj == null;
  }
};

export default beanUtil;
