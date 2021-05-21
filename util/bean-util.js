// BeanUtils
const beanUtil = {
  /**
   * @param source source
   * @param target target
   * @returns quota.vue
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
    // 数组的话遍历拷贝
    if (type === "array") {
      obj = [];
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepClone(data[i]));
      }
    }
    // 对象的话遍历属性拷贝
    else if (type === "object") {
      obj = {};
      for (let key in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          obj[key] = this.deepClone(data[key]);
        }
      }
    }
    //其他类型直接返回
    else {
      //不再具有下一层次
      return data;
    }
    return obj;
  },
  isEmpty(obj) {
    return obj == null;
  }
};

export default beanUtil;
