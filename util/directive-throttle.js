import { throttle } from "@/utils/util";

// 节流
export default {
  mounted(el, binding) {
    // 在函数传参与不传参调用的时候，打印出来的binding.value是不同的
    // 打印binding.value可以帮助理解为什么有传参和不传参的区别
    const time = parseInt(binding.arg) | 800;
    const valueType = Object.prototype.toString.call(binding.value);
    if (valueType === "[object Function]") {
      el.addEventListener("click", throttle(binding.value, time));
    } else if (valueType === "[object Array]" && binding.value.length > 0) {
      if (
        Object.prototype.toString.call(binding.value[0]) === "[object Function]"
      ) {
        el.addEventListener(
          "click",
          throttle(() => {
            binding.value[0](...binding.value.slice(1));
          }, time)
        );
      } else {
        console.error(
          "v-click指令传惨错误,数组首个参数必须为function类型",
          binding.value
        );
      }
    } else {
      console.error(
        "v-click指令传惨错误,只支持function或array类型",
        binding.value
      );
    }
  }
};
