export default {
  // //element Radio Attributes
  // disabled: false, //是否禁用
  // border: false, //是否显示边框
  // size: undefined, //medium / small / mini,Radio 的尺寸，仅在 border 为真时有效
  // name: undefined, //原生 name 属性
  // //check-box-group Attributes
  // textColor: undefined, //按钮形式的 Radio 激活时的文本颜色
  // fill: undefined, //按钮形式的 Radio 激活时的填充色和边框色
  // min: undefined,
  // max: undefined,
  // //ext
  // button: false,
  // dicData: [], //字典数据
  // dicUrl: undefined, //字典数据Url，优先级比dicData高，当url获取数据失败时，默认展示dicData
  // props: {
  //   //字典的prop修改
  //   label: "label",
  //   value: "value",
  //   children: "children",
  //   data: "data"
  // }

  // ext
  dicData: [], // 字典数据
  props: {
    // 字典的prop修改
    label: 'label',
    value: 'value',
    children: 'children',
    data: 'data'
  }
}
