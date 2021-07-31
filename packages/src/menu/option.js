export default {
  // element attributes
  mode: 'vertical', // 模式horizontal / vertical
  collapse: false, // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
  backgroundColor: undefined, // 菜单的背景色（仅支持 hex 格式）
  textColor: undefined, // 菜单的文字颜色（仅支持 hex 格式）
  activeTextColor: undefined, // 当前激活菜单的文字颜色（仅支持 hex 格式）
  defaultActive: undefined, // 当前激活菜单的 index

  defaultOpeneds: undefined, // 当前打开的 sub-menu 的 index 的数组
  uniqueOpened: false, // 是否只保持一个子菜单的展开
  menuTrigger: 'hover', // 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)
  router: false, // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
  collapseTransition: true,
  disabled: true,
  // SubMenu Attribute
  popperClass: undefined, // 弹出菜单的自定义类名
  showTimeout: 300, // 展开 sub-menu 的延时
  hideTimeout: 300, // 收起 sub-menu 的延时
  popperAppendToBody: undefined, // 是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性
  items: []
}
