// BeanUtils
const beanUtil = {
    /**
     *
     * @param treeData
     * @returns {[]|*}
     */
    copyProperties(source, target) {
        if (source && typeof source === 'object') {
            for (let key in source) {
                if (source[key] && typeof source[key] === 'object') {
                    target[key] = this.copyProperties(source[key], target[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
                } else {
                    target[key] = source[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
                }
            }
        }
        return target;
    },
    /**
     *
     * @param treeData
     * @returns {[]|*}
     */
    copyPropertiesNotEmpty(source, target) {
        const isObject = source.constructor === Object
        const isArray = source.constructor === Array
        let obj;
        if (isArray) {
            obj = [];
        } else if (isObject) {
            obj = {};
        } else {
            //不再具有下一层次
            return source;
        }
        if (!target) {
            target = obj
        }
        if (isArray) {
            for (let i = 0, len = source.length; i < len; i++) {
                target.push(this.copyPropertiesNotEmpty(source[i]));
            }
        } else if (isObject) {
            for (let key in source) {
                target[key] = this.copyPropertiesNotEmpty(source[key]);
            }
        }
        return target;
    },
    deepClone(data) {
        const isObject = data.constructor === Object
        const isArray = data.constructor === Array
        let obj;
        if (isArray) {
            obj = [];
        } else if (isObject) {
            obj = {};
        } else {
            //不再具有下一层次
            return data;
        }
        if (isArray) {
            for (let i = 0, len = data.length; i < len; i++) {
                obj.push(this.deepClone(data[i]));
            }
        } else if (isObject) {
            for (let key in data) {
                obj[key] = this.deepClone(data[key]);
            }
        }
        return obj;
    }
}

export default beanUtil
