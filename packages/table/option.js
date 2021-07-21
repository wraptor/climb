export default {
  stripe: true, // 是否为斑马纹 table
  index: '序号',
  columns: [],
  rowStyle: {
    height: '50px'
  },
  selectionFixed: true,
  indexFixed: true,
  maxHeight: undefined, // 表格最大高度，指定后会自动出现滚动条

  showOverflowTooltip: true,
  resizable: true, // 是否可调整宽度

  // ext
  params: {}, // load 搜索额外参数

  rowKey: 'id',
  dialogWidth: '50%',
  dialogTop: undefined,
  dialogClass: '',
  fullscreen: false,
  init: true,
  menu: true,
  menuWidth: 150,
  menuLabel: '操作',
  refreshBtn: {
    text: undefined,
    icon: 'el-icon-refresh',
    circle: true,
    display: true // true/false
  },
  searchBtnRight: true,
  searchBtn: {
    text: '搜 索',
    icon: 'el-icon-search',
    display: true // true/false
  },
  searchResetBtn: {
    text: '重 置',
    icon: 'el-icon-delete',
    display: true // true/false
  },
  addBtn: {
    type: 'primary',
    text: '新 增',
    icon: 'el-icon-plus',
    display: true // true/false
  },
  viewBtn: {
    type: 'text',
    text: '详 情',
    icon: 'el-icon-view',
    display: true // true/false
  },
  editBtn: {
    type: 'text',
    text: '编 辑',
    icon: 'el-icon-edit',
    display: true, // true/false
    successMessage: '修改成功'
  },
  delBtn: {
    type: 'text',
    text: '删 除',
    icon: 'el-icon-delete',
    display: true, // true/false
    confirm: true,
    message: `请确认是否删除?`,
    title: '提示',
    confirmBtnText: '确 定',
    cancelBtnText: '取 消',
    successMessage: '删除成功'
  }

  // //element form attributes
  // height: undefined, //Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
  // maxHeight: undefined, //Table 的最大高度。合法的值为数字或者单位为 px 的高度。
  // stripe: false, //是否为斑马纹 table
  // border: true, //是否带有纵向边框
  // size: undefined, //Table 的尺寸
  // fit: true, //列的宽度是否自撑开
  // showHeader: true, //是否显示表头
  // highlightCurrentRow: false, //是否要高亮当前行
  // currentRowKey: undefined, //当前行的 key，只写属性
  // rowClassName: undefined, //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
  // rowStyle: undefined, //行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
  // cellClassName: undefined, //单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
  // cellStyle: undefined, //	单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
  // headerRowClassName: undefined, //表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
  // headerRowStyle: undefined, //表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
  // headerCellClassName: undefined, //表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
  // headerCellStyle: undefined, //表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
  // rowKey: undefined, //行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，
  // // 支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
  // emptyText: "暂无数据", //空数据时显示的文本内容，也可以通过 slot="empty" 设置
  // defaultExpandAll: false, //是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
  // expandRowKeys: undefined, //可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
  // defaultSort: undefined, //默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
  // tooltipEffect: undefined, //tooltip effect 属性
  // showSummary: undefined, //是否在表尾显示合计行
  // sumText: undefined, //合计行第一列的文本
  // summaryMethod: undefined, //自定义的合计计算方法Function({ columns, data })
  // spanMethod: undefined, //合并行或列的计算方法Function({ row, column, rowIndex, columnIndex })
  // selectOnIndeterminate: true, //在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
  // indent: 16, //展示树形数据时，树节点的缩进
  // lazy: undefined, //是否懒加载子节点数据
  // load: undefined, //加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
  // treeProps: { hasChildren: "hasChildren", children: "children" }, //渲染嵌套数据的配置选项
  //
  // //ext
  // repeat: true, //true/false,是否防重提交
  // menu: true, //菜单开关
  // menuWidth: 200, //菜单宽度
  // index: false,
  // indexLabel: "序号",
  // indexWidth: 50,
  // selection: false,
  // selectable: undefined,
  // selectionWidth: undefined,
  //
  // refreshBtn: {
  //   text: "刷新",
  //   icon: "el-icon-refresh",
  //   display: true, //true/false
  //   size: "small" //medium / small / mini
  // },
  // searchBtn: {
  //   text: "搜 索",
  //   icon: "el-icon-search",
  //   display: true, //true/false
  //   size: "small" //medium / small / mini
  // },
  // searchResetBtn: {
  //   text: "重 置",
  //   icon: "el-icon-delete",
  //   display: true, //true/false
  //   size: "small" //medium / small / mini
  // },
  // addBtn: {
  //   type: "primary",
  //   text: "新 增",
  //   icon: "el-icon-plus",
  //   display: true, //true/false
  //   size: "small" //medium / small / mini
  // },
  // viewBtn: {
  //   type: "text",
  //   text: "详 情",
  //   icon: "el-icon-view",
  //   display: true, //true/false
  //   size: "small" //medium / small / mini
  // },
  // editBtn: {
  //   type: "text",
  //   text: "编 辑",
  //   icon: "el-icon-edit",
  //   display: true, //true/false
  //   size: "small" //medium / small / mini
  // },
  // delBtn: {
  //   type: "text",
  //   text: "删 除",
  //   icon: "el-icon-delete",
  //   display: true, //true/false
  //   size: "small", //medium / small / mini
  //   confirm: true,
  //   message: `请确认是否删除?`,
  //   title: "提示",
  //   confirmBtnText: "确 定",
  //   cancelBtnText: "取 消"
  // }
}
